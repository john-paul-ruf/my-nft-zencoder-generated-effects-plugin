import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';

// Orbit Bloom: final post-processing effect
// - Pure invoke: no randomness inside invoke
// - Perfect loop: time t = frame/totalFrames drives periodic phases
export class OrbitBloomEffect extends LayerEffect {
  static _name_ = 'orbit-bloom';
  static _displayName_ = 'Orbit Bloom';
  static _description_ = 'Iridescent chromatic orbit + ripple displacement + pulsing bloom + vignette. Perfect loop.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'final', 'post', 'bloom', 'chromatic', 'animated'];

  constructor({ name = OrbitBloomEffect._name_, config, settings } = {}) {
    super({ name, config });
    this.#generate(settings);
  }

  // Precompute deterministic data; no RNG in invoke
  #generate(settings) {
    // Normalize config: support flat config with toRuntime() mapping
    const cfg = (this.config && typeof this.config.toRuntime === 'function')
      ? this.config.toRuntime()
      : this.config || {};

    this.data = {
      // Store dimensions if provided; we fallback to layer dimensions in invoke
      width: settings?.width,
      height: settings?.height,
      // Copy config scalars used every frame to avoid shape changes
      orbit: cfg.orbit,
      ripple: cfg.ripple,
      bloom: cfg.bloom,
      vignette: cfg.vignette,
      grain: cfg.grain,
      layerOpacity: cfg.layerOpacity ?? this.config?.layerOpacity ?? 1.0,
      perfectLoop: (cfg.perfectLoop ?? this.config?.perfectLoop) === true
    };
  }

  async invoke(layer, frameNumber, totalFrames) {
    const info = await layer.getInfo();
    const width = this.data.width || info.width;
    const height = this.data.height || info.height;

    // Get original pixels
    const inputBuffer = await layer.toBuffer();
    const { data: src, info: sharpInfo } = await sharp(inputBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixels = globalBufferPool.getBuffer(width, height, 4);
    pixels.set(src); // Start from original

    const t = frameNumber / totalFrames; // [0..1]

    // 1) Chromatic orbit: per-channel sample offset in circular motion
    if (this.data.orbit?.enabled) {
      this.applyChromaticOrbit(pixels, width, height, t, this.data.orbit);
    }

    // 2) Polar ripple displacement
    if (this.data.ripple?.enabled) {
      this.applyPolarRipple(pixels, width, height, t, this.data.ripple);
    }

    // 3) Luma-threshold bloom with separable blur and optional pulse
    if (this.data.bloom?.enabled) {
      this.applyBloom(pixels, width, height, t, this.data.bloom);
    }

    // 4) Vignette
    if (this.data.vignette?.enabled) {
      this.applyVignette(pixels, width, height, this.data.vignette);
    }

    // 5) Optional subtle looping grain (deterministic hash-noise)
    if (this.data.grain?.enabled) {
      this.applyLoopingGrain(pixels, width, height, t, this.data.grain);
    }

    // Convert back to PNG buffer
    const out = await sharp(pixels, { raw: { width, height, channels: 4 } })
      .png()
      .toBuffer();

    globalBufferPool.returnBuffer(pixels, width, height, 4);

    await layer.fromBuffer(out);
    await layer.adjustLayerOpacity(this.data.layerOpacity);
    return layer;
  }

  // =============== Stage Implementations ===============

  applyChromaticOrbit(pixels, width, height, t, cfg) {
    const radius = cfg.radius || 0;
    const cycles = cfg.rpm || 0; // rotations per loop
    const phaseR = cfg.phaseR || 0;
    const phaseG = cfg.phaseG || 0;
    const phaseB = cfg.phaseB || 0;

    const cx = width / 2;
    const cy = height / 2;

    const copy = new Uint8ClampedArray(pixels); // read-from copy

    const sample = (x, y, ch) => {
      const xi = Math.max(0, Math.min(width - 1, Math.round(x)));
      const yi = Math.max(0, Math.min(height - 1, Math.round(y)));
      return copy[(yi * width + xi) * 4 + ch];
    };

    const angle = (tau) => tau * Math.PI * 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const dx = x - cx;
        const dy = y - cy;
        const baseAngle = Math.atan2(dy, dx);

        const rAngle = baseAngle + angle(t * cycles + phaseR);
        const gAngle = baseAngle + angle(t * cycles + phaseG);
        const bAngle = baseAngle + angle(t * cycles + phaseB);

        const rx = x + Math.cos(rAngle) * radius;
        const ry = y + Math.sin(rAngle) * radius;
        const gx = x + Math.cos(gAngle) * radius;
        const gy = y + Math.sin(gAngle) * radius;
        const bx = x + Math.cos(bAngle) * radius;
        const by = y + Math.sin(bAngle) * radius;

        pixels[idx] = sample(rx, ry, 0);
        pixels[idx + 1] = sample(gx, gy, 1);
        pixels[idx + 2] = sample(bx, by, 2);
        // Preserve alpha
      }
    }
  }

  applyPolarRipple(pixels, width, height, t, cfg) {
    const { amplitude = 0, frequency = 0, radialCycles = 1, mix = 1 } = cfg;
    if (amplitude === 0 || mix === 0) return;

    const cx = width / 2;
    const cy = height / 2;
    const copy = new Uint8ClampedArray(pixels);

    const sample = (x, y, ch) => {
      const xi = Math.max(0, Math.min(width - 1, Math.round(x)));
      const yi = Math.max(0, Math.min(height - 1, Math.round(y)));
      return copy[(yi * width + xi) * 4 + ch];
    };

    const maxR = Math.hypot(cx, cy);
    const twoPi = Math.PI * 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const dx = x - cx;
        const dy = y - cy;
        const r = Math.hypot(dx, dy) / maxR; // [0..1]
        const theta = Math.atan2(dy, dx);

        // Ripple phase: angular frequency + radial frequency, time phase for perfect loop
        // radialCycles affects spatial frequency, not the time-based loop phase
        const phi = theta * frequency + r * radialCycles * twoPi + t * twoPi;
        const off = Math.sin(phi) * amplitude;

        const sx = x + Math.cos(theta) * off;
        const sy = y + Math.sin(theta) * off;

        // Blend displaced with original
        pixels[idx] = sample(sx, sy, 0) * mix + copy[idx] * (1 - mix);
        pixels[idx + 1] = sample(sx, sy, 1) * mix + copy[idx + 1] * (1 - mix);
        pixels[idx + 2] = sample(sx, sy, 2) * mix + copy[idx + 2] * (1 - mix);
      }
    }
  }

  applyBloom(pixels, width, height, t, cfg) {
    const { threshold = 0.7, intensity = 0.8, blurRadius = 1, pulse } = cfg;
    const copy = new Uint8ClampedArray(pixels);

    // Pulse modulation for perfect loop
    const extra = pulse?.enabled ? (1 + Math.sin(t * Math.PI * 2 * (pulse.cyclesPerLoop || 1)) * (pulse.amplitude || 0)) : 1;

    // Extract bright areas to temp buffer
    const bright = globalBufferPool.getBuffer(width, height, 4);
    for (let i = 0; i < bright.length; i += 4) {
      const r = copy[i] / 255;
      const g = copy[i + 1] / 255;
      const b = copy[i + 2] / 255;
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const m = luma > threshold ? 1 : 0;
      bright[i] = copy[i] * m;
      bright[i + 1] = copy[i + 1] * m;
      bright[i + 2] = copy[i + 2] * m;
      bright[i + 3] = 255;
    }

    // Simple separable box blur (small radius)
    this.boxBlur(bright, width, height, blurRadius);

    // Add bloom back to pixels
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = Math.min(255, pixels[i] + bright[i] * intensity * extra);
      pixels[i + 1] = Math.min(255, pixels[i + 1] + bright[i + 1] * intensity * extra);
      pixels[i + 2] = Math.min(255, pixels[i + 2] + bright[i + 2] * intensity * extra);
      // alpha preserved
    }

    globalBufferPool.returnBuffer(bright, width, height, 4);
  }

  applyVignette(pixels, width, height, cfg) {
    const { strength = 0.3, roundness = 1.0 } = cfg;
    if (strength <= 0) return;

    const cx = width / 2;
    const cy = height / 2;
    const maxR = Math.hypot(cx, cy);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const dx = Math.abs((x - cx) / cx);
        const dy = Math.abs((y - cy) / cy);
        // Interpolate between circular and rectangular falloff
        const rNorm = Math.hypot(dx, dy) * roundness + Math.max(dx, dy) * (1 - roundness);
        const v = Math.min(1, 1 - strength * rNorm);
        pixels[idx] *= v;
        pixels[idx + 1] *= v;
        pixels[idx + 2] *= v;
      }
    }
  }

  applyLoopingGrain(pixels, width, height, t, cfg) {
    const amount = cfg.amount || 0;
    if (amount <= 0) return;

    const cycles = cfg.cyclesPerLoop || 1;

    // Deterministic hash-based pseudo-noise that loops with t
    const hash = (x, y, k) => {
      const h = (x * 374761393 + y * 668265263 + k * 1274126177) >>> 0;
      return ((h ^ (h >>> 13)) * 1274126177) >>> 0;
    };

    // Discrete looping phase: cycles determines how many grain cycles per animation loop
    // Use modulo on the total range to ensure perfect wrap at t=1
    const numSteps = 1024;
    const totalSteps = numSteps * cycles;
    const phase = Math.floor(t * totalSteps) % totalSteps;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const n = (hash(x, y, phase) & 0xFF); // 0..255
        const delta = (n / 255 - 0.5) * 2 * amount * 255;
        pixels[idx] = Math.max(0, Math.min(255, pixels[idx] + delta));
        pixels[idx + 1] = Math.max(0, Math.min(255, pixels[idx + 1] + delta));
        pixels[idx + 2] = Math.max(0, Math.min(255, pixels[idx + 2] + delta));
      }
    }
  }

  // --- Utilities ---
  boxBlur(pixels, width, height, radius) {
    if (!radius || radius <= 0) return;
    // Horizontal pass
    const temp = new Uint8ClampedArray(pixels.length);
    const kernel = 2 * radius + 1;

    for (let y = 0; y < height; y++) {
      let sumR = 0, sumG = 0, sumB = 0, sumA = 0;
      const row = y * width;

      // Initialize window
      for (let i = -radius; i <= radius; i++) {
        const x = Math.max(0, Math.min(width - 1, i));
        const idx = (row + x) * 4;
        sumR += pixels[idx];
        sumG += pixels[idx + 1];
        sumB += pixels[idx + 2];
        sumA += pixels[idx + 3];
      }

      for (let x = 0; x < width; x++) {
        const outIdx = (row + x) * 4;
        temp[outIdx] = Math.round(sumR / kernel);
        temp[outIdx + 1] = Math.round(sumG / kernel);
        temp[outIdx + 2] = Math.round(sumB / kernel);
        temp[outIdx + 3] = Math.round(sumA / kernel);

        // Slide window
        const xOut = Math.max(0, Math.min(width - 1, x - radius));
        const xIn = Math.max(0, Math.min(width - 1, x + radius + 1));
        const idxOut = (row + xOut) * 4;
        const idxIn = (row + xIn) * 4;
        sumR += pixels[idxIn] - pixels[idxOut];
        sumG += pixels[idxIn + 1] - pixels[idxOut + 1];
        sumB += pixels[idxIn + 2] - pixels[idxOut + 2];
        sumA += pixels[idxIn + 3] - pixels[idxOut + 3];
      }
    }

    // Vertical pass back into pixels
    const kernelV = kernel;
    for (let x = 0; x < width; x++) {
      let sumR = 0, sumG = 0, sumB = 0, sumA = 0;

      // Initialize
      for (let i = -radius; i <= radius; i++) {
        const y = Math.max(0, Math.min(height - 1, i));
        const idx = (y * width + x) * 4;
        sumR += temp[idx];
        sumG += temp[idx + 1];
        sumB += temp[idx + 2];
        sumA += temp[idx + 3];
      }

      for (let y = 0; y < height; y++) {
        const outIdx = (y * width + x) * 4;
        pixels[outIdx] = Math.round(sumR / kernelV);
        pixels[outIdx + 1] = Math.round(sumG / kernelV);
        pixels[outIdx + 2] = Math.round(sumB / kernelV);
        pixels[outIdx + 3] = Math.round(sumA / kernelV);

        // Slide window
        const yOut = Math.max(0, Math.min(height - 1, y - radius));
        const yIn = Math.max(0, Math.min(height - 1, y + radius + 1));
        const idxOut = (yOut * width + x) * 4;
        const idxIn = (yIn * width + x) * 4;
        sumR += temp[idxIn] - temp[idxOut];
        sumG += temp[idxIn + 1] - temp[idxOut + 1];
        sumB += temp[idxIn + 2] - temp[idxOut + 2];
        sumA += temp[idxIn + 3] - temp[idxOut + 3];
      }
    }
  }
}