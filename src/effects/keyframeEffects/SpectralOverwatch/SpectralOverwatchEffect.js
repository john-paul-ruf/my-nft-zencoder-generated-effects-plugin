// File: src/effects/finalImageEffects/SpectralOverwatch/SpectralOverwatchEffect.js
// Final-image keyframe effect with perfect per-window loop and transparent-background respect

import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';

// CONFIG — flat, compliant with keyFrames and glitchFrameCount
export class SpectralOverwatchConfig extends EffectConfig {
  static _name_ = 'spectral-overwatch-config';
  static _displayName_ = 'Spectral Overwatch Config';
  static _version_ = '1.0.1';

  constructor({
    // identity
    seed = 1337,

    // REQUIRED scheduling
    keyFrames = [0, 120, 360, 900],       // frame indices where runs start
    glitchFrameCount = [15, 30],          // inclusive [min, max] run length in frames

    // color
    colorMode = 'prismatic',              // 'mono' | 'tinted' | 'prismatic'
    baseHue = 210,
    saturation = 0.9,
    value = 1.0,
    tintRed = '#FF6666',
    tintGreen = '#66FF66',
    tintBlue = '#6666FF',

    // sweep/anim (cycles per run; rounded for perfect loop)
    sweepAngleDeg = 25,
    sweepWidth = 0.35,
    rotationSpeed = 1.0,                  // cycles per run (rounded)
    rippleFrequency = 2.0,                // combined with rippleSpeed
    rippleSpeed = 1.0,
    shimmerSpeed = 3.0,
    highlightBoost = 1.25,

    // shaping
    vignetteStrength = 0.2,
    causticStrength = 1.0,
    grainStrength = 0.05,
    preserveAlpha = true,
    layerOpacity = 1.0,
    interpolation = 'nearest',
  } = {}) {
    super();
    this.seed = Math.floor(Number.isFinite(seed) ? seed : 1337);

    // scheduling (flat)
    this.keyFrames = Array.isArray(keyFrames) ? keyFrames.map(n => Math.max(0, Math.floor(n))) : [];
    this.glitchFrameCount = Array.isArray(glitchFrameCount) && glitchFrameCount.length === 2
      ? [Math.max(1, Math.floor(glitchFrameCount[0])), Math.max(1, Math.floor(glitchFrameCount[1]))]
      : [15, 30];

    // color
    this.colorMode = ['mono', 'tinted', 'prismatic'].includes(colorMode) ? colorMode : 'prismatic';
    this.baseHue = wrapDeg(baseHue);
    this.saturation = clamp01(saturation);
    this.value = clamp01(value);
    this.tintRed = String(tintRed || '#FFFFFF');
    this.tintGreen = String(tintGreen || '#FFFFFF');
    this.tintBlue = String(tintBlue || '#FFFFFF');

    // anim
    this.sweepAngleDeg = wrapDeg(sweepAngleDeg);
    this.sweepWidth = clamp01(sweepWidth);
    this.rotationSpeed = Number.isFinite(rotationSpeed) ? rotationSpeed : 1.0;
    this.rippleFrequency = Math.max(0, Number.isFinite(rippleFrequency) ? rippleFrequency : 2.0);
    this.rippleSpeed = Number.isFinite(rippleSpeed) ? rippleSpeed : 1.0;
    this.shimmerSpeed = Math.max(0, Number.isFinite(shimmerSpeed) ? shimmerSpeed : 3.0);
    this.highlightBoost = clamp01(highlightBoost);

    // shaping
    this.vignetteStrength = clamp01(vignetteStrength);
    this.causticStrength = Math.max(0, Number.isFinite(causticStrength) ? causticStrength : 1.0);
    this.grainStrength = clamp01(grainStrength);
    this.preserveAlpha = !!preserveAlpha;
    this.layerOpacity = clamp01(layerOpacity);
    this.interpolation = ['nearest', 'bilinear'].includes(interpolation) ? interpolation : 'nearest';
  }

  toJSON(){
    return {
      seed: this.seed,
      keyFrames: this.keyFrames,
      glitchFrameCount: this.glitchFrameCount,
      colorMode: this.colorMode,
      baseHue: this.baseHue,
      saturation: this.saturation,
      value: this.value,
      tintRed: this.tintRed,
      tintGreen: this.tintGreen,
      tintBlue: this.tintBlue,
      sweepAngleDeg: this.sweepAngleDeg,
      sweepWidth: this.sweepWidth,
      rotationSpeed: this.rotationSpeed,
      rippleFrequency: this.rippleFrequency,
      rippleSpeed: this.rippleSpeed,
      shimmerSpeed: this.shimmerSpeed,
      highlightBoost: this.highlightBoost,
      vignetteStrength: this.vignetteStrength,
      causticStrength: this.causticStrength,
      grainStrength: this.grainStrength,
      preserveAlpha: this.preserveAlpha,
      layerOpacity: this.layerOpacity,
      interpolation: this.interpolation,
    };
  }

  static fromJSON(json){
    return new SpectralOverwatchConfig(json);
  }
}

export class SpectralOverwatchEffect extends LayerEffect {
  static _name_ = 'spectral-overwatch';
  static _displayName_ = 'Spectral Overwatch';
  static _description_ = 'Keyframe spectral sweep with prismatic caustics and perfect per-window looping.';
  static _version_ = '1.0.1';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'final', 'post', 'spectral', 'caustic', 'loop', 'animated'];

  constructor({ name = SpectralOverwatchEffect._name_, config, settings } = {}) {
    super({ name, config });
    this.#generate(settings);
  }

  #generate(settings) {
    const width = settings?.width;
    const height = settings?.height;

    // Validate schedule
    const keyFrames = Array.isArray(this.config.keyFrames) ? this.config.keyFrames.slice().sort((a,b)=>a-b) : [];
    const [minLen, maxLen] = Array.isArray(this.config.glitchFrameCount) && this.config.glitchFrameCount.length === 2
      ? this.config.glitchFrameCount
      : [15, 30];
    const minFrames = Math.max(1, Math.floor(minLen));
    const maxFrames = Math.max(minFrames, Math.floor(maxLen));

    // Deterministic duration per keyframe using seed
    const schedule = keyFrames.map((start, i) => {
      const u = hash2(this.config.seed, i); // 0..1 stable
      const dur = minFrames + Math.floor(u * (maxFrames - minFrames + 1)); // inclusive
      return { start, duration: dur };
    });

    // Tints
    const tintR = this.#parseColor(this.config.tintRed);
    const tintG = this.#parseColor(this.config.tintGreen);
    const tintB = this.#parseColor(this.config.tintBlue);

    // Perfect-loop cycle rounding
    const rotCycles = this.config.rotationSpeed > 0 ? Math.max(1, Math.round(this.config.rotationSpeed)) : 0;
    const shimmerCycles = this.config.shimmerSpeed > 0 ? Math.max(1, Math.round(this.config.shimmerSpeed)) : 0;
    const rippleProd = this.config.rippleFrequency * this.config.rippleSpeed;
    const rippleCycles = rippleProd > 0 ? Math.max(1, Math.round(rippleProd)) : 0;

    const baseAngle = deg2rad(this.config.sweepAngleDeg);

    this.data = {
      // dims
      width, height,
      // schedule
      schedule,
      // color
      colorMode: this.config.colorMode,
      baseHue: this.config.baseHue,
      saturation: this.config.saturation,
      value: this.config.value,
      tintR, tintG, tintB,
      // animation cycles
      rotCycles, shimmerCycles, rippleCycles,
      // sweep/shaping
      baseAngle,
      sweepWidth: this.config.sweepWidth,
      highlightBoost: this.config.highlightBoost,
      vignetteStrength: this.config.vignetteStrength,
      causticStrength: this.config.causticStrength,
      grainStrength: this.config.grainStrength,
      // misc
      seed: this.config.seed,
      preserveAlpha: this.config.preserveAlpha,
      layerOpacity: this.config.layerOpacity,
      interpolation: this.config.interpolation
    };
  }

  async invoke(layer, frameNumber) {
    const info = await layer.getInfo();
    const width = this.data.width || info.width;
    const height = this.data.height || info.height;

    // Map to active window (if any)
    const time = this.#timeInActiveWindow(frameNumber);

    const inputBuffer = await layer.toBuffer();
    const { data: src } = await sharp(inputBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const dst = globalBufferPool.getBuffer(width, height, 4);
    dst.fill(0);

    // If not in any keyframe window, pass-through
    if (!time.active) {
      for (let i = 0; i < src.length; i++) dst[i] = src[i];
      const outBuffer = await sharp(dst, { raw: { width, height, channels: 4 } }).png().toBuffer();
      globalBufferPool.returnBuffer(dst, width, height, 4);
      await layer.fromBuffer(outBuffer);
      await layer.adjustLayerOpacity(this.data.layerOpacity);
      return layer;
    }

    // Resolve per-window perfect-loop phases
    const anim = this.#anim(time.t);

    const invW = 1 / Math.max(1, width - 1);
    const invH = 1 / Math.max(1, height - 1);

    for (let y = 0; y < height; y++) {
      const v = (y * invH) * 2 - 1;
      for (let x = 0; x < width; x++) {
        const u = (x * invW) * 2 - 1;
        const idx = (y * width + x) * 4;

        const r = src[idx];
        const g = src[idx + 1];
        const b = src[idx + 2];
        const a = src[idx + 3];

        // Sweep vector (rotating over time t)
        const sx = Math.cos(this.data.baseAngle + anim.rotAngle);
        const sy = Math.sin(this.data.baseAngle + anim.rotAngle);

        // Band mask: soft highlight around sweep center
        const proj = u * sx + v * sy;
        const band = 1 - smoothstep(this.data.sweepWidth, 0.0, Math.abs(proj)); // 0..1

        // Ripple + shimmer phases (perfect loop)
        const radius = Math.hypot(u, v);
        const ripplePhase = anim.ripplePhase * radius;
        const shimmerPhase = anim.shimmerPhase;

        // Caustic response
        let response = band;
        response *= (1 + this.data.causticStrength * Math.cos(ripplePhase + shimmerPhase));
        response = clamp01(response);

        // Colorize
        const color = this.#spectralColor(response);

        // Vignette
        const rad2 = u * u + v * v;
        const vignette = 1 - this.data.vignetteStrength * Math.min(1, rad2);

        // Screen-like blend, respect transparency
        const outR = 1 - (1 - r / 255) * (1 - color.r);
        const outG = 1 - (1 - g / 255) * (1 - color.g);
        const outB = 1 - (1 - b / 255) * (1 - color.b);

        dst[idx] = Math.round(clamp01(outR * vignette) * 255);
        dst[idx + 1] = Math.round(clamp01(outG * vignette) * 255);
        dst[idx + 2] = Math.round(clamp01(outB * vignette) * 255);
        dst[idx + 3] = this.data.preserveAlpha ? a : 255;
      }
    }

    const outBuffer = await sharp(dst, { raw: { width, height, channels: 4 } }).png().toBuffer();
    globalBufferPool.returnBuffer(dst, width, height, 4);

    await layer.fromBuffer(outBuffer);
    await layer.adjustLayerOpacity(this.data.layerOpacity);
    return layer;
  }

  // Active window selector with normalized t in [0,1)
  #timeInActiveWindow(frameNumber) {
    const sched = this.data.schedule;
    for (let i = 0; i < sched.length; i++) {
      const { start, duration } = sched[i];
      if (frameNumber >= start && frameNumber < start + duration) {
        const t = (frameNumber - start) / duration; // 0..1
        return { active: true, t, windowIndex: i, duration };
        }
    }
    return { active: false, t: -1 };
  }

  // Perfect-loop phases per window (t in [0,1])
  #anim(t) {
    const twoPi = 6.28318530718;
    const rotAngle = twoPi * this.data.rotCycles * t;
    const shimmerPhase = twoPi * this.data.shimmerCycles * t;
    const ripplePhase = twoPi * this.data.rippleCycles * t;
    return { rotAngle, shimmerPhase, ripplePhase };
  }

  // Color modes -> normalized [0,1]
  #spectralColor(s) {
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
    const hue = (this.data.baseHue + 360 * s) % 360;
    const rgb = hsvToRgb(hue, this.data.saturation, this.data.value);
    return { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 };
  }

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

// Utils (local)
function clamp01(x){ return Math.max(0, Math.min(1, x)); }
function wrapDeg(d){
  let n = Number.isFinite(d) ? d : 0;
  n = n % 360;
  return n < 0 ? n + 360 : n;
}
function lerp(a,b,t){ return a + (b - a) * t; }
function smoothstep(e0,e1,x){
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}
function deg2rad(d){ return d * Math.PI / 180; }
function hsvToRgb(h, s, v){
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
function hash2(a, b){
  let n = (a * 73856093) ^ (b * 19349663);
  n = (n << 13) ^ n;
  return ((n * (n * n * 15731 + 789221) + 1376312589) >>> 0) / 4294967295;
}