import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';

/**
 * HoloFoil Effect - Prismatic holographic foil simulation
 * Final Image Effect: operates as a post-process over the composed image.
 * 
 * Deterministic, perfectly looping animations. Pure per frame based on
 * config + precomputed data generated in constructor.
 */
export class HoloFoilEffect extends LayerEffect {
  static _name_ = 'holofoil';
  static _displayName_ = 'Holo Foil';
  static _description_ = 'Iridescent holographic foil with prismatic diffraction and shimmer. Perfect loop.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'final', 'post', 'holographic', 'foil', 'prismatic', 'animated'];

  // High-precision constant for perfect loop calculations
  static #TWO_PI = 6.28318530718;

  constructor({ name = HoloFoilEffect._name_, config, settings } = {}) {
    super({ name, config });
    this.#generate(settings);
  }

  // Precompute deterministic data from config
  #generate(settings) {
    const width = settings?.width;
    const height = settings?.height;

    // Parse tints
    const tintR = this.#parseColor(this.config.tintRed);
    const tintG = this.#parseColor(this.config.tintGreen);
    const tintB = this.#parseColor(this.config.tintBlue);

    // Seeded deterministic angles for multiple grating orders
    const baseAngle = deg2rad(this.config.gratingAngleDeg);
    const orderCount = this.config.gratingOrderCount;
    const seed = this.config.seed;

    // Simple deterministic hash for slight per-order rotation offsets
    const gratingAngles = Array.from({ length: orderCount }, (_, i) => {
      const jitter = (hash2(seed, i) - 0.5) * 0.35; // ~ ±0.175 rad
      return baseAngle + jitter * (i + 1) / orderCount;
    });

    const gratingVectors = gratingAngles.map(a => ({ x: Math.cos(a), y: Math.sin(a) }));

    // Spectrum LUT (0..1 -> RGB). We'll compute HSV->RGB on the fly with baseHue.
    // Keep LUT minimal to remain serializable and small. 256 entries.
    const spectrumLUT = Array.from({ length: 256 }, (_, i) => i / 255);

    // Scratch parameters
    const scratchAngle = deg2rad(this.config.scratchAngleDeg);
    const scratchDir = { x: Math.cos(scratchAngle), y: Math.sin(scratchAngle) };
    const scratchSpacing = 0.5 + (1 - this.config.scratchDensity) * 8.0; // larger spacing when density low

    this.data = {
      width,
      height,
      spectrumLUT,
      gratingVectors,
      scratchDir,
      scratchSpacing,
      seed,
      // Copy commonly used scalars
      baseHue: this.config.baseHue,
      saturation: this.config.saturation,
      value: this.config.value,
      rainbowStrength: this.config.rainbowStrength,
      gratingScale: this.config.gratingScale,
      animationMode: this.config.animationMode,
      rotationSpeed: this.config.rotationSpeed,
      tiltStrength: this.config.tiltStrength,
      rippleStrength: this.config.rippleStrength,
      rippleFrequency: this.config.rippleFrequency,
      rippleSpeed: this.config.rippleSpeed,
      shimmerStrength: this.config.shimmerStrength,
      shimmerSpeed: this.config.shimmerSpeed,
      colorMode: this.config.colorMode,
      tintR, tintG, tintB,
      highlightBoost: this.config.highlightBoost,
      vignetteStrength: this.config.vignetteStrength,
      scratchContrast: this.config.scratchContrast,
      grainStrength: this.config.grainStrength,
      preserveAlpha: this.config.preserveAlpha,
      interpolation: this.config.interpolation,
      layerOpacity: this.config.layerOpacity
    };
  }

  // Main invoke: pure function of prepared data + frame
  async invoke(layer, frameNumber, totalFrames) {
    const info = await layer.getInfo();
    const width = this.data.width || info.width;
    const height = this.data.height || info.height;

    const inputBuffer = await layer.toBuffer();
    const { data: src, info: sharpInfo } = await sharp(inputBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const dst = globalBufferPool.getBuffer(width, height, 4);
    dst.fill(0);

    // Perfect loop: pass frameNumber and totalFrames directly to resolveAnimation
    // This allows for more precise control over the animation timing
    const anim = this.#resolveAnimation(frameNumber, totalFrames);

    const cx = width * 0.5;
    const cy = height * 0.5;
    const invW = 1 / Math.max(1, width - 1);
    const invH = 1 / Math.max(1, height - 1);

    for (let y = 0; y < height; y++) {
      // normalized coords [-1,1]
      const v = (y * invH) * 2 - 1;
      for (let x = 0; x < width; x++) {
        const u = (x * invW) * 2 - 1;
        const idx = (y * width + x) * 4;

        // Luminance of source (for highlight shaping)
        const r = src[idx];
        const g = src[idx + 1];
        const b = src[idx + 2];
        const a = src[idx + 3];
        const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

        // Vignette shaping
        const rad2 = u * u + v * v;
        const vignette = 1 - this.data.vignetteStrength * Math.min(1, rad2);

        // Diffraction grating response (weighted sum of cosines along vectors)
        let response = 0;
        const scale = this.data.gratingScale;
        for (let i = 0; i < this.data.gratingVectors.length; i++) {
          const gv = this.data.gratingVectors[i];
          // rotate grating basis by animation (rotate mode)
          const rx = gv.x * anim.rotCos - gv.y * anim.rotSin;
          const ry = gv.x * anim.rotSin + gv.y * anim.rotCos;
          // spatial phase; add ripple phase radially (rippleStrength controls amplitude)
          const phase = (u * rx + v * ry) * (HoloFoilEffect.#TWO_PI * scale) + anim.ripplePhase * this.data.rippleStrength * Math.hypot(u, v);
          response += Math.cos(phase + anim.shimmerPhase);
        }
        response = response / this.data.gratingVectors.length; // [-1,1]
        response = (response + 1) * 0.5; // [0,1]

        // Pulse/tilt influence
        const shaped = clamp01(response * anim.pulseGain * (1 + this.data.tiltStrength * anim.tiltGain));

        // Spectral color based on mode
        const foil = this.#foilColor(shaped);

        // Micro-scratches: periodic lines along scratchDir
        const sCoord = u * this.data.scratchDir.x + v * this.data.scratchDir.y;
        const f = fract(sCoord * this.data.scratchSpacing + 0.5); // [0,1]
        const distanceToLine = Math.abs(f - 0.5) * 2; // 0 at line, 1 at mid
        const scratch = Math.pow(1 - distanceToLine, 4) * this.data.scratchContrast; // sharpened line

        // Grain (deterministic hash noise)
        const gn = (hash3(this.data.seed, x, y) - 0.5) * 2 * this.data.grainStrength;

        // Combine shaping
        const intensity = clamp01(shaped * vignette * (1 + scratch) + gn);

        // Screen-like blend: out = 1 - (1 - src) * (1 - foil*intensity)
        const foilR = foil.r * intensity;
        const foilG = foil.g * intensity;
        const foilB = foil.b * intensity;

        const outR = 1 - (1 - r / 255) * (1 - foilR);
        const outG = 1 - (1 - g / 255) * (1 - foilG);
        const outB = 1 - (1 - b / 255) * (1 - foilB);

        dst[idx] = Math.round(clamp01(outR) * 255);
        dst[idx + 1] = Math.round(clamp01(outG) * 255);
        dst[idx + 2] = Math.round(clamp01(outB) * 255);
        dst[idx + 3] = this.data.preserveAlpha ? a : 255;
      }
    }

    const outBuffer = await sharp(dst, { raw: { width, height, channels: 4 } })
      .png()
      .toBuffer();

    globalBufferPool.returnBuffer(dst, width, height, 4);

    await layer.fromBuffer(outBuffer);
    await layer.adjustLayerOpacity(this.data.layerOpacity);
    return layer;
  }

  // Resolve time-based animation params for perfect loop
  #resolveAnimation(frameNumber, totalFrames) {
    const twoPi = HoloFoilEffect.#TWO_PI;

    // Perfect loop solution: For seamless looping in discrete frame systems,
    // we need each animation component to complete an INTEGER number of cycles
    // over the total frame count. This ensures frame 0 and frame totalFrames
    // produce identical results.
    
    const rawRotationCycles = this.data.rotationSpeed || 0;
    const rawShimmerCycles = this.data.shimmerSpeed || 0;
    const rawRippleCycles = (this.data.rippleFrequency || 0) * (this.data.rippleSpeed || 0);

    // Convert to integer cycles for perfect looping
    function findPerfectCycles(originalCycles) {
      if (originalCycles === 0) return 0;
      
      // Find the closest integer that preserves the visual intent
      const candidates = [];
      const baseInt = Math.floor(originalCycles);
      
      for (let n = Math.max(0, baseInt - 1); n <= baseInt + 2; n++) {
        if (n === 0 && originalCycles > 0) continue; // Don't use 0 if original was > 0
        const diff = Math.abs(n - originalCycles);
        candidates.push({ cycles: n, diff });
      }
      
      // Sort by difference and return the closest
      candidates.sort((a, b) => a.diff - b.diff);
      return candidates[0].cycles;
    }

    const rotationCycles = findPerfectCycles(rawRotationCycles);
    const shimmerCycles = findPerfectCycles(rawShimmerCycles);
    const rippleCycles = findPerfectCycles(rawRippleCycles);

    // Calculate phases directly from frame numbers to ensure perfect periodicity
    // For VIDEO LOOPS: Use totalFrames as denominator to create N unique frames
    // where the transition from frame (N-1) → frame 0 is smooth and uniform.
    //
    // Example with 50 frames (0-49):
    //   Frame 0:  phase = 2π × 1 × 0/50 = 0.000 rad
    //   Frame 49: phase = 2π × 1 × 49/50 = 6.158 rad
    //   Loop transition (49→0): 0.126 rad (7.20°) - same as all other transitions
    //
    // This ensures:
    //   1. All 50 frames are UNIQUE (no duplicate at loop point)
    //   2. All frame transitions are UNIFORM (7.20° per frame)
    //   3. Smooth, seamless looping for video playback
    //
    // Note: Using (totalFrames - 1) would make frame 0 = frame 49, causing
    // a duplicate frame stutter when the video loops.
    
    const rotAngle = (twoPi * rotationCycles * frameNumber / totalFrames) % twoPi;
    const rotCos = Math.cos(rotAngle);
    const rotSin = Math.sin(rotAngle);

    const shimmerPhase = (twoPi * shimmerCycles * frameNumber / totalFrames) % twoPi;
    const ripplePhase = (twoPi * rippleCycles * frameNumber / totalFrames) % twoPi;

    // pulse (global intensity) - Use frame-based calculation for consistency
    let pulseGain = 1.0;
    if (this.data.animationMode === 'pulse') {
      const pulseCycles = shimmerCycles || 1;
      const pulsePhase = (twoPi * pulseCycles * frameNumber / totalFrames) % twoPi;
      pulseGain = 0.5 + 0.5 * Math.sin(pulsePhase);
      pulseGain = 0.7 + 0.6 * pulseGain; // keep >0
    }

    // tilt modulation (just a smooth oscillation) - use frame-based calculation
    let tiltGain = 0.0;
    if (this.data.animationMode === 'tilt') {
      const tiltPhase = (twoPi * frameNumber / totalFrames) % twoPi;
      tiltGain = Math.sin(tiltPhase);
    }

    return { rotCos, rotSin, shimmerPhase, ripplePhase, pulseGain, tiltGain };
  }

  // Compute foil RGB according to color mode
  #foilColor(s) {
    const mode = this.data.colorMode;
    if (mode === 'mono') {
      const v = clamp01(s * this.data.value);
      return { r: v, g: v, b: v };
    }

    if (mode === 'tinted') {
      return {
        r: clamp01(lerp(0, this.data.tintR.r / 255, s)),
        g: clamp01(lerp(0, this.data.tintG.g / 255, s)),
        b: clamp01(lerp(0, this.data.tintB.b / 255, s))
      };
    }

    // prismatic: hue shift around base
    const hue = (this.data.baseHue + 360 * this.data.rainbowStrength * s) % 360;
    const rgb = hsvToRgb(hue, this.data.saturation, this.data.value);
    return { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 };
  }

  // Hex color parsing (robust, similar to other effects)
  #parseColor(hex, fallback = '#FFFFFF') {
    if (typeof hex !== 'string' || !hex) hex = fallback;
    hex = String(hex).trim();
    if (hex.startsWith('0x')) hex = hex.slice(2);
    if (hex.startsWith('#')) hex = hex.slice(1);
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const isValid = /^[0-9a-fA-F]{6}$/.test(hex);
    if (!isValid) {
      let fb = String(fallback).replace(/^#/, '');
      if (fb.length === 3) fb = fb.split('').map(c => c + c).join('');
      if (!/^[0-9a-fA-F]{6}$/.test(fb)) fb = 'FFFFFF';
      hex = fb;
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  }
}

// Utils
function clamp01(x){ return Math.max(0, Math.min(1, x)); }
function lerp(a,b,t){ return a + (b - a) * t; }
function fract(x){ return x - Math.floor(x); }
function deg2rad(d){ return d * Math.PI / 180; }

function hsvToRgb(h, s, v){
  // h: 0..360, s:0..1, v:0..1
  const c = v * s;
  const hh = (h / 60) % 6;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r=0,g=0,b=0;
  if (0 <= hh && hh < 1) { r=c; g=x; b=0; }
  else if (1 <= hh && hh < 2) { r=x; g=c; b=0; }
  else if (2 <= hh && hh < 3) { r=0; g=c; b=x; }
  else if (3 <= hh && hh < 4) { r=0; g=x; b=c; }
  else if (4 <= hh && hh < 5) { r=x; g=0; b=c; }
  else { r=c; g=0; b=x; }
  const m = v - c;
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

// simple deterministic hashes (no external deps)
function hash2(a, b){
  let n = (a * 73856093) ^ (b * 19349663);
  n = (n << 13) ^ n;
  return ((n * (n * n * 15731 + 789221) + 1376312589) >>> 0) / 4294967295;
}
function hash3(a, b, c){
  let n = (a * 374761393) ^ (b * 668265263) ^ (c * 362437);
  n = (n << 13) ^ n;
  return ((n * (n * n * 15731 + 789221) + 1376312589) >>> 0) / 4294967295;
}