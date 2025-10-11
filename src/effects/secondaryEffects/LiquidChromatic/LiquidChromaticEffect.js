import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';

/**
 * LiquidChromatic Effect - "Liquid Dreams in Digital Streams"
 * 
 * A mesmerizing post-processing effect that transforms layers into flowing liquid with
 * chromatic aberration trails, creating hypnotic fluid dynamics with iridescent color shifts.
 * Think oil on water meets digital glitch art.
 * 
 * Features:
 * - Multi-frequency wave-based displacement for organic liquid motion
 * - Chromatic aberration with flow-following RGB separation
 * - Iridescent color shifting based on flow angle
 * - Surface tension, refraction, and specular highlights
 * - Perfect loop animations using sine waves
 * - Deterministic noise for reproducible results
 * - Pure function - same config + frame = same output
 */
export class LiquidChromaticEffect extends LayerEffect {
  static _name_ = 'liquid-chromatic';
  static _displayName_ = 'Liquid Chromatic';
  static _description_ = 'Flowing liquid with chromatic trails and iridescent shimmer. Perfect loop.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'secondary', 'liquid', 'chromatic', 'iridescent', 'flow', 'animated'];

  constructor({ name = LiquidChromaticEffect._name_, config, settings } = {}) {
    super({ name, config });
    this.#generate(settings);
  }

  /**
   * Precompute deterministic data structures
   * No randomness in invoke - all data derived from config
   */
  #generate(settings) {
    // Convert angles to radians
    const flowAngleRad = this.config.flowAngle * Math.PI / 180;
    const chromaticAngleRad = this.config.chromaticAngle * Math.PI / 180;
    
    // Precompute noise field based on seed
    this.noiseCache = this.#generateNoiseField(this.config.seed);
    
    this.data = {
      width: settings?.width,
      height: settings?.height,
      
      // Flow
      flowSpeed: this.config.flowSpeed,
      flowAngleRad,
      turbulence: this.config.turbulence,
      viscosity: this.config.viscosity,
      
      // Waves
      waveFrequency1: this.config.waveFrequency1,
      waveFrequency2: this.config.waveFrequency2,
      waveFrequency3: this.config.waveFrequency3,
      waveAmplitude: this.config.waveAmplitude,
      wavePhaseOffset: this.config.wavePhaseOffset * Math.PI * 2,
      
      // Chromatic
      chromaticSeparation: this.config.chromaticSeparation,
      chromaticAngleRad,
      chromaticFlow: this.config.chromaticFlow,
      trailLength: this.config.trailLength,
      
      // Iridescence
      iridescenceIntensity: this.config.iridescenceIntensity,
      primaryHue: this.config.primaryHue,
      hueShiftRange: this.config.hueShiftRange,
      saturationBoost: this.config.saturationBoost,
      brightnessModulation: this.config.brightnessModulation,
      
      // Surface
      surfaceTension: this.config.surfaceTension,
      refractionStrength: this.config.refractionStrength,
      specularHighlights: this.config.specularHighlights,
      depthGradient: this.config.depthGradient,
      
      // Blend
      effectIntensity: this.config.effectIntensity,
      edgePreservation: this.config.edgePreservation,
      glowRadius: this.config.glowRadius,
      contrastBoost: this.config.contrastBoost,
      
      // Animation
      rotationSpeed: this.config.rotationSpeed,
      pulseFrequency: this.config.pulseFrequency,
      shimmerSpeed: this.config.shimmerSpeed,
      
      // General
      seed: this.config.seed,
      layerOpacity: this.config.layerOpacity
    };
  }

  /**
   * Generate deterministic noise field from seed
   */
  #generateNoiseField(seed) {
    const size = 256;
    const field = new Array(size);
    
    for (let i = 0; i < size; i++) {
      field[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        // Simple deterministic noise using seed
        const hash = ((i * 73856093) ^ (j * 19349663) ^ (seed * 83492791)) >>> 0;
        field[i][j] = (hash % 1000) / 1000;
      }
    }
    
    return field;
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
    const { data: src } = await sharp(inputBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Normalized time [0..1] for perfect loop
    const t = frameNumber / totalFrames;

    // Create output buffer
    const output = globalBufferPool.getBuffer(width, height, 4);
    
    // Create edge detection buffer for surface tension
    const edges = this.data.surfaceTension > 0 
      ? this.#detectEdges(src, width, height)
      : null;

    // Process each pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        // Calculate liquid displacement
        const displacement = this.#calculateLiquidDisplacement(x, y, width, height, t);
        
        // Sample with chromatic aberration
        const color = this.#sampleWithChromatic(
          src, width, height, 
          x + displacement.x, 
          y + displacement.y, 
          displacement.angle,
          t
        );
        
        // Apply iridescence
        if (this.data.iridescenceIntensity > 0) {
          this.#applyIridescence(color, displacement.angle, t);
        }
        
        // Apply surface effects
        if (edges) {
          this.#applySurfaceEffects(color, edges, x, y, width, height, displacement, t);
        }
        
        // Blend with original
        const origIdx = idx;
        const blendFactor = this.data.effectIntensity;
        
        output[idx] = color.r * blendFactor + src[origIdx] * (1 - blendFactor);
        output[idx + 1] = color.g * blendFactor + src[origIdx + 1] * (1 - blendFactor);
        output[idx + 2] = color.b * blendFactor + src[origIdx + 2] * (1 - blendFactor);
        output[idx + 3] = color.a * blendFactor + src[origIdx + 3] * (1 - blendFactor);
      }
    }

    // Apply glow if configured
    if (this.data.glowRadius > 0) {
      this.#applyGlow(output, width, height);
    }

    // Apply contrast boost
    if (this.data.contrastBoost > 0) {
      this.#applyContrast(output, width, height);
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
   * Calculate liquid displacement using multi-frequency waves
   * Returns { x, y, angle } displacement vector and flow angle
   */
  #calculateLiquidDisplacement(x, y, width, height, t) {
    const cx = width / 2;
    const cy = height / 2;
    
    // Normalized coordinates
    const nx = (x - cx) / width;
    const ny = (y - cy) / height;
    
    // Sample noise field
    const noiseX = this.#sampleNoise(x * 0.01, y * 0.01);
    const noiseY = this.#sampleNoise(x * 0.01 + 100, y * 0.01 + 100);
    
    // Calculate animated flow angle
    const rotationPhase = t * Math.PI * 2 * this.data.rotationSpeed;
    const currentFlowAngle = this.data.flowAngleRad + Math.sin(rotationPhase) * Math.PI * 0.5;
    
    // Multi-frequency wave displacement
    const phase1 = t * Math.PI * 2 * this.data.waveFrequency1 + this.data.wavePhaseOffset;
    const phase2 = t * Math.PI * 2 * this.data.waveFrequency2 + this.data.wavePhaseOffset;
    const phase3 = t * Math.PI * 2 * this.data.waveFrequency3 + this.data.wavePhaseOffset;
    
    // Wave contributions
    const wave1 = Math.sin(phase1 + nx * 10 + noiseX * 5) * 0.5;
    const wave2 = Math.sin(phase2 + ny * 15 + noiseY * 5) * 0.3;
    const wave3 = Math.sin(phase3 + (nx + ny) * 8) * 0.2;
    
    const waveSum = wave1 + wave2 + wave3;
    
    // Pulse modulation
    const pulse = 1 + Math.sin(t * Math.PI * 2 * this.data.pulseFrequency) * 0.2;
    
    // Turbulence
    const turbulenceX = (noiseX - 0.5) * this.data.turbulence;
    const turbulenceY = (noiseY - 0.5) * this.data.turbulence;
    
    // Viscosity affects displacement strength
    const viscosityFactor = 1 - this.data.viscosity * 0.5;
    
    // Calculate final displacement
    const amplitude = this.data.waveAmplitude * this.data.flowSpeed * viscosityFactor * pulse;
    
    const dx = (Math.cos(currentFlowAngle) * waveSum + turbulenceX) * amplitude;
    const dy = (Math.sin(currentFlowAngle) * waveSum + turbulenceY) * amplitude;
    
    // Calculate flow angle for this pixel (for iridescence)
    const flowAngle = Math.atan2(dy, dx);
    
    return { x: dx, y: dy, angle: flowAngle };
  }

  /**
   * Sample pixel with chromatic aberration
   * RGB channels are separated based on flow direction
   */
  #sampleWithChromatic(src, width, height, x, y, flowAngle, t) {
    const separation = this.data.chromaticSeparation;
    
    if (separation === 0) {
      return this.#samplePixel(src, width, height, x, y);
    }
    
    // Calculate chromatic angle (blend between fixed angle and flow angle)
    const fixedWeight = 1 - this.data.chromaticFlow * 0.5;
    const flowWeight = this.data.chromaticFlow * 0.5;
    const chromaticAngle = this.data.chromaticAngleRad * fixedWeight + flowAngle * flowWeight;
    
    // Animate chromatic separation
    const chromaPhase = t * Math.PI * 2;
    const chromaMod = Math.sin(chromaPhase) * this.data.trailLength;
    const effectiveSeparation = separation * (1 + chromaMod);
    
    // Sample each channel with offset
    const rAngle = chromaticAngle;
    const gAngle = chromaticAngle + Math.PI * 2 / 3;
    const bAngle = chromaticAngle + Math.PI * 4 / 3;
    
    const rOffset = { 
      x: Math.cos(rAngle) * effectiveSeparation, 
      y: Math.sin(rAngle) * effectiveSeparation 
    };
    const gOffset = { 
      x: Math.cos(gAngle) * effectiveSeparation * 0.8, 
      y: Math.sin(gAngle) * effectiveSeparation * 0.8 
    };
    const bOffset = { 
      x: Math.cos(bAngle) * effectiveSeparation * 0.6, 
      y: Math.sin(bAngle) * effectiveSeparation * 0.6 
    };
    
    const rSample = this.#samplePixel(src, width, height, x + rOffset.x, y + rOffset.y);
    const gSample = this.#samplePixel(src, width, height, x + gOffset.x, y + gOffset.y);
    const bSample = this.#samplePixel(src, width, height, x + bOffset.x, y + bOffset.y);
    
    return {
      r: rSample.r,
      g: gSample.g,
      b: bSample.b,
      a: (rSample.a + gSample.a + bSample.a) / 3
    };
  }

  /**
   * Apply iridescent color shifting based on flow angle
   */
  #applyIridescence(color, flowAngle, t) {
    // Convert RGB to HSL
    const hsl = this.#rgbToHsl(color.r, color.g, color.b);
    
    // Calculate hue shift based on flow angle and time
    const angleNormalized = (flowAngle + Math.PI) / (Math.PI * 2); // 0-1
    const shimmerPhase = t * Math.PI * 2 * this.data.shimmerSpeed;
    const shimmer = Math.sin(shimmerPhase + angleNormalized * Math.PI * 4) * 0.5 + 0.5;
    
    const hueShift = shimmer * this.data.hueShiftRange;
    const newHue = (this.data.primaryHue + hueShift) % 360;
    
    // Blend with original hue
    const intensity = this.data.iridescenceIntensity;
    hsl.h = hsl.h * (1 - intensity) + newHue * intensity;
    
    // Boost saturation
    hsl.s = Math.min(1, hsl.s + this.data.saturationBoost * intensity);
    
    // Modulate brightness
    const brightnessMod = Math.sin(shimmerPhase * 1.5) * this.data.brightnessModulation;
    hsl.l = Math.max(0, Math.min(1, hsl.l + brightnessMod * intensity));
    
    // Convert back to RGB
    const rgb = this.#hslToRgb(hsl.h, hsl.s, hsl.l);
    color.r = rgb.r;
    color.g = rgb.g;
    color.b = rgb.b;
  }

  /**
   * Apply surface effects (tension, refraction, specular)
   */
  #applySurfaceEffects(color, edges, x, y, width, height, displacement, t) {
    const edgeIdx = y * width + x;
    const edgeStrength = edges[edgeIdx];
    
    // Surface tension creates bubble-like boundaries
    if (this.data.surfaceTension > 0 && edgeStrength > 0.5) {
      const tension = this.data.surfaceTension * (edgeStrength - 0.5) * 2;
      const brightBoost = 1 + tension * 0.5;
      color.r = Math.min(255, color.r * brightBoost);
      color.g = Math.min(255, color.g * brightBoost);
      color.b = Math.min(255, color.b * brightBoost);
    }
    
    // Specular highlights on flow peaks
    if (this.data.specularHighlights > 0) {
      const flowMagnitude = Math.sqrt(displacement.x * displacement.x + displacement.y * displacement.y);
      const normalizedFlow = flowMagnitude / this.data.waveAmplitude;
      
      if (normalizedFlow > 0.7) {
        const specular = (normalizedFlow - 0.7) / 0.3 * this.data.specularHighlights * 255;
        color.r = Math.min(255, color.r + specular);
        color.g = Math.min(255, color.g + specular);
        color.b = Math.min(255, color.b + specular);
      }
    }
    
    // Depth gradient (darker in "deeper" areas)
    if (this.data.depthGradient > 0) {
      const depth = Math.sin(t * Math.PI * 2 + x * 0.01 + y * 0.01) * 0.5 + 0.5;
      const darkening = 1 - depth * this.data.depthGradient * 0.3;
      color.r *= darkening;
      color.g *= darkening;
      color.b *= darkening;
    }
  }

  /**
   * Detect edges using Sobel operator
   */
  #detectEdges(src, width, height) {
    const edges = new Float32Array(width * height);
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        // Sobel kernels
        const gx = 
          -this.#getGrayscale(src, x - 1, y - 1, width) + this.#getGrayscale(src, x + 1, y - 1, width) +
          -2 * this.#getGrayscale(src, x - 1, y, width) + 2 * this.#getGrayscale(src, x + 1, y, width) +
          -this.#getGrayscale(src, x - 1, y + 1, width) + this.#getGrayscale(src, x + 1, y + 1, width);
        
        const gy = 
          -this.#getGrayscale(src, x - 1, y - 1, width) - 2 * this.#getGrayscale(src, x, y - 1, width) - this.#getGrayscale(src, x + 1, y - 1, width) +
          this.#getGrayscale(src, x - 1, y + 1, width) + 2 * this.#getGrayscale(src, x, y + 1, width) + this.#getGrayscale(src, x + 1, y + 1, width);
        
        const magnitude = Math.sqrt(gx * gx + gy * gy) / 255;
        edges[y * width + x] = Math.min(1, magnitude);
      }
    }
    
    return edges;
  }

  /**
   * Get grayscale value of pixel
   */
  #getGrayscale(src, x, y, width) {
    const idx = (y * width + x) * 4;
    return (src[idx] + src[idx + 1] + src[idx + 2]) / 3;
  }

  /**
   * Apply glow effect
   */
  #applyGlow(buffer, width, height) {
    const radius = Math.floor(this.data.glowRadius);
    if (radius === 0) return;
    
    // Simple box blur for glow
    const temp = new Uint8ClampedArray(buffer.length);
    temp.set(buffer);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0, count = 0;
        
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const sx = x + dx;
            const sy = y + dy;
            
            if (sx >= 0 && sx < width && sy >= 0 && sy < height) {
              const idx = (sy * width + sx) * 4;
              r += temp[idx];
              g += temp[idx + 1];
              b += temp[idx + 2];
              count++;
            }
          }
        }
        
        const idx = (y * width + x) * 4;
        const glowStrength = 0.3;
        buffer[idx] = buffer[idx] * (1 - glowStrength) + (r / count) * glowStrength;
        buffer[idx + 1] = buffer[idx + 1] * (1 - glowStrength) + (g / count) * glowStrength;
        buffer[idx + 2] = buffer[idx + 2] * (1 - glowStrength) + (b / count) * glowStrength;
      }
    }
  }

  /**
   * Apply contrast boost
   */
  #applyContrast(buffer, width, height) {
    const factor = 1 + this.data.contrastBoost;
    const intercept = 128 * (1 - factor);
    
    for (let i = 0; i < buffer.length; i += 4) {
      buffer[i] = Math.max(0, Math.min(255, buffer[i] * factor + intercept));
      buffer[i + 1] = Math.max(0, Math.min(255, buffer[i + 1] * factor + intercept));
      buffer[i + 2] = Math.max(0, Math.min(255, buffer[i + 2] * factor + intercept));
    }
  }

  /**
   * Sample pixel with bilinear interpolation and wrapping
   */
  #samplePixel(src, width, height, x, y) {
    // Wrap coordinates
    x = ((x % width) + width) % width;
    y = ((y % height) + height) % height;
    
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = (x0 + 1) % width;
    const y1 = (y0 + 1) % height;
    
    const fx = x - x0;
    const fy = y - y0;
    
    const idx00 = (y0 * width + x0) * 4;
    const idx10 = (y0 * width + x1) * 4;
    const idx01 = (y1 * width + x0) * 4;
    const idx11 = (y1 * width + x1) * 4;
    
    const r = 
      src[idx00] * (1 - fx) * (1 - fy) +
      src[idx10] * fx * (1 - fy) +
      src[idx01] * (1 - fx) * fy +
      src[idx11] * fx * fy;
    
    const g = 
      src[idx00 + 1] * (1 - fx) * (1 - fy) +
      src[idx10 + 1] * fx * (1 - fy) +
      src[idx01 + 1] * (1 - fx) * fy +
      src[idx11 + 1] * fx * fy;
    
    const b = 
      src[idx00 + 2] * (1 - fx) * (1 - fy) +
      src[idx10 + 2] * fx * (1 - fy) +
      src[idx01 + 2] * (1 - fx) * fy +
      src[idx11 + 2] * fx * fy;
    
    const a = 
      src[idx00 + 3] * (1 - fx) * (1 - fy) +
      src[idx10 + 3] * fx * (1 - fy) +
      src[idx01 + 3] * (1 - fx) * fy +
      src[idx11 + 3] * fx * fy;
    
    return { r, g, b, a };
  }

  /**
   * Sample noise field
   */
  #sampleNoise(x, y) {
    const size = this.noiseCache.length;
    const ix = Math.floor(Math.abs(x * 10) % size);
    const iy = Math.floor(Math.abs(y * 10) % size);
    return this.noiseCache[ix][iy];
  }

  /**
   * RGB to HSL conversion
   */
  #rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    
    if (max === min) {
      return { h: 0, s: 0, l };
    }
    
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    let h;
    if (max === r) {
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    } else if (max === g) {
      h = ((b - r) / d + 2) / 6;
    } else {
      h = ((r - g) / d + 4) / 6;
    }
    
    return { h: h * 360, s, l };
  }

  /**
   * HSL to RGB conversion
   */
  #hslToRgb(h, s, l) {
    h = h / 360;
    
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    if (s === 0) {
      const gray = l * 255;
      return { r: gray, g: gray, b: gray };
    }
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    return {
      r: hue2rgb(p, q, h + 1/3) * 255,
      g: hue2rgb(p, q, h) * 255,
      b: hue2rgb(p, q, h - 1/3) * 255
    };
  }
}