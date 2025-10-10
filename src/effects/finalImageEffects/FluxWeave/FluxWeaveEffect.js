import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';

/**
 * FluxWeave Effect - Temporal Fabric Manipulation
 * 
 * Transforms images into living tapestries where reality's threads unravel and reweave
 * themselves in hypnotic patterns. Creates the illusion of flowing energy threads that
 * undulate, braid, and phase-shift through color spectrums.
 * 
 * Features:
 * - Multi-frequency wave interference patterns
 * - Directional flow (horizontal, vertical, radial, diagonal)
 * - Braiding algorithm for thread interweaving
 * - Chromatic phase shifting
 * - Perfect loop animation
 * - Multiple blend modes
 * - Pure deterministic function
 */
export class FluxWeaveEffect extends LayerEffect {
  static _name_ = 'flux-weave';
  static _displayName_ = 'Flux Weave';
  static _description_ = 'Temporal fabric manipulation with flowing energy threads. Perfect loop.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'final', 'post', 'wave', 'flow', 'fabric', 'animated'];

  constructor({ name = FluxWeaveEffect._name_, config, settings } = {}) {
    super({ name, config });
    this.#generate(settings);
  }

  /**
   * Precompute deterministic data structures
   * No randomness - all data derived from config
   */
  #generate(settings) {
    // Parse tint color to RGB
    const tintRGB = this.#hexToRgb(this.config.tintColor);
    
    // Convert angles to radians
    const flowAngleRad = this.config.flowAngle * Math.PI / 180;
    const hueRotationRad = this.config.hueRotation * Math.PI / 180;
    
    this.data = {
      width: settings?.width,
      height: settings?.height,
      
      // Wave configuration
      waveFrequency1: this.config.waveFrequency1,
      waveFrequency2: this.config.waveFrequency2,
      waveSpeed1: this.config.waveSpeed1,
      waveSpeed2: this.config.waveSpeed2,
      waveAmplitude: this.config.waveAmplitude,
      waveDirection: this.config.waveDirection,
      
      // Flow configuration
      flowAngleRad,
      flowTurbulence: this.config.flowTurbulence,
      braidCount: this.config.braidCount,
      braidTightness: this.config.braidTightness,
      
      // Color configuration
      phaseShiftStrength: this.config.phaseShiftStrength,
      hueRotationRad,
      tintRGB,
      tintStrength: this.config.tintStrength,
      
      // Animation configuration
      pulseIntensity: this.config.pulseIntensity,
      pulseFrequency: this.config.pulseFrequency,
      shimmerSpeed: this.config.shimmerSpeed,
      
      // Rendering configuration
      blendMode: this.config.blendMode,
      
      // General
      layerOpacity: this.config.layerOpacity
    };
  }

  /**
   * Main effect invocation - pure function of inputs
   */
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

    // Normalized time [0..1] for perfect loop
    const t = frameNumber / totalFrames;
    const phase = t * Math.PI * 2;

    // Create output buffer
    const output = globalBufferPool.getBuffer(width, height, 4);
    
    // Calculate pulse modulation for breathing effect
    const pulseMod = 1.0 + (Math.sin(phase * this.data.pulseFrequency) * this.data.pulseIntensity);
    const currentAmplitude = this.data.waveAmplitude * pulseMod;

    // Generate displacement map and apply effect
    this.#applyFluxWeave(src, output, width, height, phase, currentAmplitude);

    // Apply tinting if configured
    if (this.data.tintStrength > 0) {
      this.#applyTint(output, width, height);
    }

    // Convert back to PNG buffer
    const outBuffer = await sharp(output, { raw: { width, height, channels: 4 } })
      .png()
      .toBuffer();

    // Cleanup
    globalBufferPool.returnBuffer(output, width, height, 4);

    // Update layer
    await layer.fromBuffer(outBuffer);
    await layer.adjustLayerOpacity(this.data.layerOpacity);
    
    return layer;
  }

  /**
   * Apply the flux weave effect to the image
   */
  #applyFluxWeave(src, output, width, height, phase, amplitude) {
    const cx = width / 2;
    const cy = height / 2;
    const blendFunc = this.#getBlendFunction();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;

        // Calculate wave displacement for this pixel
        const displacement = this.#calculateWaveDisplacement(x, y, width, height, phase, amplitude);

        // Calculate chromatic phase shift offsets
        const phaseShift = this.#calculatePhaseShift(displacement, phase);

        // Sample RGB channels with phase shift
        const r = this.#sampleWithDisplacement(src, width, height, x, y, displacement, phaseShift.r, 0);
        const g = this.#sampleWithDisplacement(src, width, height, x, y, displacement, phaseShift.g, 1);
        const b = this.#sampleWithDisplacement(src, width, height, x, y, displacement, phaseShift.b, 2);
        const a = this.#sampleWithDisplacement(src, width, height, x, y, displacement, 0, 3);

        // Apply hue rotation
        const rotated = this.#applyHueRotation({ r, g, b }, phase);

        // Get original pixel for blending
        const origR = src[idx];
        const origG = src[idx + 1];
        const origB = src[idx + 2];

        // Blend displaced pixel with original
        output[idx] = blendFunc(origR, rotated.r, 0.7);
        output[idx + 1] = blendFunc(origG, rotated.g, 0.7);
        output[idx + 2] = blendFunc(origB, rotated.b, 0.7);
        output[idx + 3] = a;
      }
    }
  }

  /**
   * Calculate wave displacement for a pixel using multi-frequency interference
   */
  #calculateWaveDisplacement(x, y, width, height, phase, amplitude) {
    const cx = width / 2;
    const cy = height / 2;
    const dx = x - cx;
    const dy = y - cy;

    let offsetX = 0;
    let offsetY = 0;

    switch (this.data.waveDirection) {
      case 'horizontal': {
        // Horizontal waves with vertical displacement
        const wave1 = Math.sin(x * this.data.waveFrequency1 + phase * this.data.waveSpeed1);
        const wave2 = Math.cos(y * this.data.waveFrequency2 + phase * this.data.waveSpeed2);
        const braid = Math.sin(y * this.data.braidCount * Math.PI / height) * this.data.braidTightness;
        
        offsetX = (wave1 + braid) * amplitude * 0.3;
        offsetY = (wave2 + wave1 * 0.5) * amplitude;
        break;
      }

      case 'vertical': {
        // Vertical waves with horizontal displacement
        const wave1 = Math.sin(y * this.data.waveFrequency1 + phase * this.data.waveSpeed1);
        const wave2 = Math.cos(x * this.data.waveFrequency2 + phase * this.data.waveSpeed2);
        const braid = Math.sin(x * this.data.braidCount * Math.PI / width) * this.data.braidTightness;
        
        offsetX = (wave2 + wave1 * 0.5) * amplitude;
        offsetY = (wave1 + braid) * amplitude * 0.3;
        break;
      }

      case 'radial': {
        // Radial waves emanating from center
        const distance = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);
        const wave1 = Math.sin(distance * this.data.waveFrequency1 + phase * this.data.waveSpeed1);
        const wave2 = Math.cos(angle * this.data.braidCount + phase * this.data.waveSpeed2);
        const radialWave = wave1 * wave2;
        
        offsetX = Math.cos(angle) * radialWave * amplitude;
        offsetY = Math.sin(angle) * radialWave * amplitude;
        break;
      }

      case 'diagonal': {
        // Diagonal waves at 45 degrees
        const diag = (x + y) * 0.707; // Normalize diagonal distance
        const wave1 = Math.sin(diag * this.data.waveFrequency1 + phase * this.data.waveSpeed1);
        const wave2 = Math.cos(diag * this.data.waveFrequency2 - phase * this.data.waveSpeed2);
        const braid = Math.sin(diag * this.data.braidCount * Math.PI / (width + height)) * this.data.braidTightness;
        
        const combined = (wave1 + wave2 + braid) * amplitude;
        offsetX = combined * 0.707;
        offsetY = combined * 0.707;
        break;
      }
    }

    // Add turbulence using deterministic noise
    if (this.data.flowTurbulence > 0) {
      const turbX = this.#simpleNoise(x * 0.01, y * 0.01, phase) * this.data.flowTurbulence * amplitude;
      const turbY = this.#simpleNoise(x * 0.01 + 100, y * 0.01 + 100, phase) * this.data.flowTurbulence * amplitude;
      
      offsetX += turbX;
      offsetY += turbY;
    }

    // Apply flow angle rotation
    if (this.data.flowAngleRad !== 0) {
      const cos = Math.cos(this.data.flowAngleRad);
      const sin = Math.sin(this.data.flowAngleRad);
      const rotX = offsetX * cos - offsetY * sin;
      const rotY = offsetX * sin + offsetY * cos;
      offsetX = rotX;
      offsetY = rotY;
    }

    return { offsetX, offsetY };
  }

  /**
   * Calculate chromatic phase shift offsets for RGB channels
   */
  #calculatePhaseShift(displacement, phase) {
    const strength = this.data.phaseShiftStrength;
    const shimmer = Math.sin(phase * this.data.shimmerSpeed) * 0.5 + 0.5;
    
    return {
      r: strength * (1 + shimmer * 0.3),
      g: strength * 0.5,
      b: -strength * (1 + shimmer * 0.3)
    };
  }

  /**
   * Sample pixel with displacement and phase shift
   */
  #sampleWithDisplacement(src, width, height, x, y, displacement, phaseOffset, channel) {
    const sampleX = x + displacement.offsetX + phaseOffset;
    const sampleY = y + displacement.offsetY;

    // Bilinear interpolation for smooth sampling
    const x0 = Math.floor(sampleX);
    const y0 = Math.floor(sampleY);
    const x1 = x0 + 1;
    const y1 = y0 + 1;

    // Check bounds
    if (x0 < 0 || x1 >= width || y0 < 0 || y1 >= height) {
      return 0;
    }

    const fx = sampleX - x0;
    const fy = sampleY - y0;

    const idx00 = (y0 * width + x0) * 4 + channel;
    const idx10 = (y0 * width + x1) * 4 + channel;
    const idx01 = (y1 * width + x0) * 4 + channel;
    const idx11 = (y1 * width + x1) * 4 + channel;

    const v00 = src[idx00] || 0;
    const v10 = src[idx10] || 0;
    const v01 = src[idx01] || 0;
    const v11 = src[idx11] || 0;

    const v0 = v00 * (1 - fx) + v10 * fx;
    const v1 = v01 * (1 - fx) + v11 * fx;

    return v0 * (1 - fy) + v1 * fy;
  }

  /**
   * Apply hue rotation with shimmer
   */
  #applyHueRotation({ r, g, b }, phase) {
    if (this.data.hueRotationRad === 0) {
      return { r, g, b };
    }

    // Convert to HSL
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) {
      return { r, g, b }; // Grayscale, no hue to rotate
    }

    const d = max - min;
    const s = l > 127.5 ? d / (510 - max - min) : d / (max + min);

    let h = 0;
    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / d + 2) / 6;
    } else {
      h = ((r - g) / d + 4) / 6;
    }

    // Apply rotation with shimmer
    const shimmer = Math.sin(phase * this.data.shimmerSpeed) * 0.1;
    h = (h + this.data.hueRotationRad / (Math.PI * 2) + shimmer) % 1;

    // Convert back to RGB
    return this.#hslToRgb(h, s, l / 255);
  }

  /**
   * Convert HSL to RGB
   */
  #hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l * 255;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3) * 255;
      g = hue2rgb(p, q, h) * 255;
      b = hue2rgb(p, q, h - 1/3) * 255;
    }

    return { r, g, b };
  }

  /**
   * Simple deterministic noise function
   */
  #simpleNoise(x, y, t) {
    // Simple sine-based noise for determinism
    const n = Math.sin(x * 12.9898 + y * 78.233 + t * 43.758) * 43758.5453;
    return (n - Math.floor(n)) * 2 - 1; // Range [-1, 1]
  }

  /**
   * Apply color tint to output
   */
  #applyTint(pixels, width, height) {
    const { r, g, b } = this.data.tintRGB;
    const strength = this.data.tintStrength;

    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = pixels[i] * (1 - strength) + r * strength;
      pixels[i + 1] = pixels[i + 1] * (1 - strength) + g * strength;
      pixels[i + 2] = pixels[i + 2] * (1 - strength) + b * strength;
    }
  }

  /**
   * Get blend function based on mode
   */
  #getBlendFunction() {
    switch (this.data.blendMode) {
      case 'screen':
        return (base, blend, alpha) => {
          const result = 255 - (((255 - base) * (255 - blend)) / 255);
          return base + (result - base) * alpha;
        };

      case 'add':
        return (base, blend, alpha) => {
          return Math.min(255, base + blend * alpha);
        };

      case 'overlay':
        return (base, blend, alpha) => {
          const result = base < 128
            ? (2 * base * blend) / 255
            : 255 - (2 * (255 - base) * (255 - blend)) / 255;
          return base + (result - base) * alpha;
        };

      case 'normal':
      default:
        return (base, blend, alpha) => {
          return base * (1 - alpha) + blend * alpha;
        };
    }
  }

  /**
   * Convert hex color to RGB object
   */
  #hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  }
}