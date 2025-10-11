import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';

// ChronoLenticularFoil: holographic lenticular shimmer with interference grooves
export class ChronoLenticularFoilEffect extends LayerEffect {
  static _name_ = 'chrono-lenticular-foil';
  static _displayName_ = 'Chrono Lenticular Foil';
  static _description_ = 'Iridescent micro-groove interference shimmer with spectral dispersion and perfect loop.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect','secondary','foil','holographic','iridescent','interference','animated'];

  constructor({ name = ChronoLenticularFoilEffect._name_, config, settings } = {}){
    super({ name, config });
    this.#generate(settings);
  }

  // Precompute deterministic parameters so invoke is pure
  #generate(settings){
    this.data = {
      width: settings?.width,
      height: settings?.height,
      seed: this.config.seed,
      // angles to radians
      A1: deg2rad(this.config.grooveAngleDeg),
      A2: deg2rad(this.config.grooveAngle2Deg),
      // colors parsed once
      base: hexToRgb(this.config.colorBase),
      hi: hexToRgb(this.config.colorHighlight),
      sh: hexToRgb(this.config.colorShadow),
    };
  }

  // Main: post-process a single layer; preserves transparent pixels; perfect loop
  async invoke(layer, frame, totalFrames){
    const info = await layer.getInfo();
    const width = this.data.width || info.width;
    const height = this.data.height || info.height;

    const inputPng = await layer.toBuffer();
    const { data: src } = await sharp(inputPng).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    const out = globalBufferPool.getBuffer(width, height, 4);

    // Loop phases
    const u = (frame % totalFrames) / totalFrames;
    const phi1 = TAU * this.config.phaseK1 * u * this.config.shimmerSpeed;
    const phi2 = TAU * this.config.phaseK2 * u * this.config.shimmerSpeed;

    // Frequencies per pixel based on canvas diagonal to stay scale-independent
    const diag = Math.hypot(width, height);
    const f1 = (this.config.grooveCount / 100) * (1000 / Math.max(256, diag));
    const f2 = (this.config.grooveCount2 / 100) * (1000 / Math.max(256, diag));

    const cosA1 = Math.cos(this.data.A1), sinA1 = Math.sin(this.data.A1);
    const cosA2 = Math.cos(this.data.A2), sinA2 = Math.sin(this.data.A2);

    // Pixel loop
    for(let y=0; y<height; y++){
      for(let x=0; x<width; x++){
        const idx = (y*width + x)*4;
        const a = src[idx+3];
        if(a === 0){ out[idx]=0; out[idx+1]=0; out[idx+2]=0; out[idx+3]=0; continue; }

        // Interference field I in [-1,1]
        const s1 = 2*Math.PI * f1 * (x*cosA1 + y*sinA1) + phi1;
        const s2 = 2*Math.PI * f2 * (x*cosA2 + y*sinA2) + phi2;
        const g1 = Math.cos(s1);
        const g2 = Math.cos(s2);
        const I = 0.5*(g1 + g2);

        // Gradient via central differences (small epsilon=1)
        const s1x = 2*Math.PI * f1 * cosA1; const s1y = 2*Math.PI * f1 * sinA1;
        const s2x = 2*Math.PI * f2 * cosA2; const s2y = 2*Math.PI * f2 * sinA2;
        const gx = -Math.sin(s1)*s1x - Math.sin(s2)*s2x;
        const gy = -Math.sin(s1)*s1y - Math.sin(s2)*s2y;
        const mag = Math.hypot(gx, gy) + 1e-6;
        const nx = gx/mag, ny = gy/mag;

        // Micro displacement along gradient normal
        const dx = nx * this.config.displacementPx * this.config.intensity;
        const dy = ny * this.config.displacementPx * this.config.intensity;
        const base = sampleBilinear(src, width, height, x+dx, y+dy);

        // Spectral dispersion: channel-wise phase modulation
        const disp = this.config.dispersion;
        const Ir = I * Math.cos(phi1 + 0.00 * TAU * disp);
        const Ig = I * Math.cos(phi1 + 0.33 * TAU * disp);
        const Ib = I * Math.cos(phi1 + 0.66 * TAU * disp);

        // Hue oscillation based on I
        const hueDelta = this.config.hueShiftDeg * I;
        let col = { r: base.r, g: base.g, b: base.b };
        col = hueOscillate(col, hueDelta);

        // Apply dispersion as subtle per-channel scaling
        col.r = clamp255(col.r * (1 + 0.25*Ir));
        col.g = clamp255(col.g * (1 + 0.25*Ig));
        col.b = clamp255(col.b * (1 + 0.25*Ib));

        // Edge highlight from gradient magnitude
        const E = clamp01(this.config.edgeBoost * (mag * 0.5));
        col = lerpRgb(col, this.data.hi, E * this.config.intensity);

        // Blend modes over original, preserving alpha
        const orig = { r: src[idx], g: src[idx+1], b: src[idx+2] };
        let blended;
        switch(this.config.mode){
          case 'screen': blended = blendScreen(orig, col, this.config.intensity); break;
          case 'add': blended = blendAdd(orig, col, this.config.intensity); break;
          default: blended = blendOverlay(orig, col, this.config.intensity); break;
        }

        // Gamma
        out[idx]   = gammaCorrect(blended.r, this.config.gamma);
        out[idx+1] = gammaCorrect(blended.g, this.config.gamma);
        out[idx+2] = gammaCorrect(blended.b, this.config.gamma);
        out[idx+3] = a; // preserve alpha exactly
      }
    }

    // Write back
    const rendered = await sharp(out, { raw: { width, height, channels: 4 } }).png().toBuffer();
    globalBufferPool.returnBuffer(out, width, height, 4);

    await layer.fromBuffer(rendered);
    await layer.adjustLayerOpacity(this.config.layerOpacity);
    return layer;
  }
}

// ---------- helpers ----------
const TAU = Math.PI*2;

function deg2rad(d){ return d * Math.PI / 180; }

function hexToRgb(hex){
  const m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  if(!m) return { r:255, g:255, b:255 };
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
}

function clamp01(v){ return Math.max(0, Math.min(1, v)); }
function clamp255(v){ return Math.max(0, Math.min(255, v|0)); }

function sampleBilinear(pix, w, h, x, y){
  const x0 = Math.max(0, Math.min(w-1, Math.floor(x)));
  const y0 = Math.max(0, Math.min(h-1, Math.floor(y)));
  const x1 = Math.min(w-1, x0+1);
  const y1 = Math.min(h-1, y0+1);
  const fx = Math.min(1, Math.max(0, x - x0));
  const fy = Math.min(1, Math.max(0, y - y0));
  const i00 = (y0*w + x0)*4, i10 = (y0*w + x1)*4, i01 = (y1*w + x0)*4, i11 = (y1*w + x1)*4;
  const r = lerp( lerp(pix[i00], pix[i10], fx), lerp(pix[i01], pix[i11], fx), fy );
  const g = lerp( lerp(pix[i00+1], pix[i10+1], fx), lerp(pix[i01+1], pix[i11+1], fx), fy );
  const b = lerp( lerp(pix[i00+2], pix[i10+2], fx), lerp(pix[i01+2], pix[i11+2], fx), fy );
  const a = lerp( lerp(pix[i00+3], pix[i10+3], fx), lerp(pix[i01+3], pix[i11+3], fx), fy );
  return { r, g, b, a };
}

function lerp(a,b,t){ return a*(1-t) + b*t; }
function lerpRgb(a,b,t){
  return { r: clamp255(lerp(a.r,b.r,t)), g: clamp255(lerp(a.g,b.g,t)), b: clamp255(lerp(a.b,b.b,t)) };
}

function rgbToHsl(r,g,b){
  r/=255; g/=255; b/=255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){ h=s=0; }
  else {
    const d = max-min; s = l>0.5 ? d/(2-max-min) : d/(max+min);
    switch(max){
      case r: h = (g-b)/d + (g<b?6:0); break;
      case g: h = (b-r)/d + 2; break;
      default: h = (r-g)/d + 4; break;
    }
    h/=6;
  }
  return { h:h*360, s, l };
}

function hslToRgb(h,s,l){
  h=(h%360+360)%360; h/=360;
  if(s===0){ const v=l*255; return { r:v, g:v, b:v }; }
  const q = l<0.5 ? l*(1+s) : l + s - l*s;
  const p = 2*l - q;
  const r = hue2rgb(p,q,h+1/3);
  const g = hue2rgb(p,q,h);
  const b = hue2rgb(p,q,h-1/3);
  return { r: r*255, g: g*255, b: b*255 };
}
function hue2rgb(p,q,t){ if(t<0) t+=1; if(t>1) t-=1; if(t<1/6) return p+(q-p)*6*t; if(t<1/2) return q; if(t<2/3) return p+(q-p)*(2/3 - t)*6; return p; }

function hueOscillate({r,g,b}, hueDeltaDeg){
  const hsl = rgbToHsl(r,g,b);
  const rgb = hslToRgb(hsl.h + hueDeltaDeg, hsl.s, hsl.l);
  return { r: clamp255(rgb.r), g: clamp255(rgb.g), b: clamp255(rgb.b) };
}

function blendOverlay(base, top, t){
  // Standard overlay then lerp by t
  const o = (cb,ct)=> (cb<128) ? (2*cb*ct/255) : (255 - 2*(255-cb)*(255-ct)/255);
  const r = lerp(base.r, o(base.r, top.r), t);
  const g = lerp(base.g, o(base.g, top.g), t);
  const b = lerp(base.b, o(base.b, top.b), t);
  return { r, g, b };
}
function blendScreen(base, top, t){
  const s = (cb,ct)=> 255 - ((255-cb)*(255-ct))/255;
  const r = lerp(base.r, s(base.r, top.r), t);
  const g = lerp(base.g, s(base.g, top.g), t);
  const b = lerp(base.b, s(base.b, top.b), t);
  return { r, g, b };
}
function blendAdd(base, top, t){
  return { r: clamp255(base.r + top.r*t), g: clamp255(base.g + top.g*t), b: clamp255(base.b + top.b*t) };
}

function gammaCorrect(v, gamma){
  if(gamma === 1 || gamma === 1.0) return clamp255(v);
  const n = Math.max(0, Math.min(255, v));
  const p = Math.pow(n/255, 1/gamma);
  return clamp255(p*255);
}