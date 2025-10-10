import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';

/**
 * VoidEcho Effect - Recursive Reality Distortion
 * 
 * Creates mesmerizing recursive feedback loops where the composite image echoes through
 * multiple dimensional layers. Each echo is displaced, chromatically separated, and blended
 * to create hypnotic depth and temporal distortion.
 * 
 * Features:
 * - Recursive echo layers with configurable count and decay
 * - Radial displacement with perfect loop animation
 * - Per-channel chromatic aberration
 * - Multiple blend modes (screen, add, overlay, normal)
 * - Configurable tinting and vignette
 * - Pure function - deterministic output based on config and frame
 * - Perfect loop - all animations return to origin
 */
export class VoidEchoEffect extends LayerEffect {
  static _name_ = 'void-echo';
  static _displayName_ = 'Void Echo';
  static _description_ = 'Recursive reality distortion with chromatic echoes through dimensional layers. Perfect loop.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'final', 'post', 'recursive', 'chromatic', 'psychedelic', 'animated'];

  constructor({ name = VoidEchoEffect._name_, config, settings } = {}) {
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
    const vignetteRGB = this.#hexToRgb(this.config.vignetteColor);
    
    this.data = {
      width: settings?.width,
      height: settings?.height,
      
      // Echo configuration
      echoCount: this.config.echoCount,
      echoSpacing: this.config.echoSpacing,
      echoDecay: this.config.echoDecay,
      
      // Displacement
      displacementRadius: this.config.displacementRadius,
      displacementSpeed: this.config.displacementSpeed,
      displacementAngle: this.config.displacementAngle * Math.PI / 180, // Convert to radians
      
      // Chromatic
      chromaticStrength: this.config.chromaticStrength,
      chromaticRotation: this.config.chromaticRotation * Math.PI / 180, // Convert to radians
      
      // Blend
      blendMode: this.config.blendMode,
      feedbackStrength: this.config.feedbackStrength,
      
      // Colors
      tintRGB,
      tintStrength: this.config.tintStrength,
      vignetteRGB,
      vignetteStrength: this.config.vignetteStrength,
      
      // Animation
      pulseIntensity: this.config.pulseIntensity,
      rotationSpeed: this.config.rotationSpeed,
      
      // Quality
      smoothing: this.config.smoothing,
      
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

    // Create output buffer - start with black
    const output = globalBufferPool.getBuffer(width, height, 4);
    output.fill(0);
    
    // Create feedback buffer for accumulation
    const feedback = globalBufferPool.getBuffer(width, height, 4);
    feedback.fill(0);

    // Generate each echo layer
    for (let echoIndex = 0; echoIndex < this.data.echoCount; echoIndex++) {
      // Calculate echo phase with temporal offset
      const echoPhase = (t - (echoIndex * this.data.echoSpacing)) % 1.0;
      
      // Calculate echo opacity with decay and pulse
      const baseOpacity = Math.pow(this.data.echoDecay, echoIndex);
      const pulseMod = 1.0 + (Math.sin(echoPhase * Math.PI * 2) * this.data.pulseIntensity);
      const echoOpacity = baseOpacity * pulseMod;
      
      // Calculate displacement for this echo
      const displacement = this.#calculateDisplacement(echoPhase);
      
      // Render echo with chromatic aberration
      const echo = this.#renderEcho(
        src,
        width,
        height,
        displacement,
        echoOpacity,
        echoPhase
      );
      
      // Blend echo into output
      this.#blendEcho(output, echo, feedback, width, height, echoOpacity);
      
      // Return echo buffer
      globalBufferPool.returnBuffer(echo, width, height, 4);
    }

    // Apply tinting
    if (this.data.tintStrength > 0) {
      this.#applyTint(output, width, height);
    }

    // Apply vignette
    if (this.data.vignetteStrength > 0) {
      this.#applyVignette(output, width, height);
    }

    // Convert back to PNG buffer
    const outBuffer = await sharp(output, { raw: { width, height, channels: 4 } })
      .png()
      .toBuffer();

    // Cleanup
    globalBufferPool.returnBuffer(output, width, height, 4);
    globalBufferPool.returnBuffer(feedback, width, height, 4);

    // Update layer
    await layer.fromBuffer(outBuffer);
    await layer.adjustLayerOpacity(this.data.layerOpacity);
    
    return layer;
  }

  /**
   * Calculate displacement vector for given phase
   * Returns { offsetX, offsetY, rotation }
   */
  #calculateDisplacement(phase) {
    // Perfect loop using sine/cosine
    const angle = (phase * Math.PI * 2 * this.data.displacementSpeed) + this.data.displacementAngle;
    
    return {
      offsetX: Math.sin(angle) * this.data.displacementRadius,
      offsetY: Math.cos(angle) * this.data.displacementRadius,
      rotation: phase * this.data.rotationSpeed * Math.PI * 2
    };
  }

  /**
   * Render a single echo with chromatic aberration
   */
  #renderEcho(src, width, height, displacement, opacity, phase) {
    const echo = globalBufferPool.getBuffer(width, height, 4);
    const cx = width / 2;
    const cy = height / 2;
    
    // Calculate chromatic offsets for R, G, B channels
    const chromaR = 0;
    const chromaG = this.data.chromaticRotation;
    const chromaB = this.data.chromaticRotation * 2;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        // Calculate angle from center for chromatic rotation
        const dx = x - cx;
        const dy = y - cy;
        const pixelAngle = Math.atan2(dy, dx);
        
        // Sample each channel with chromatic offset
        const rAngle = pixelAngle + chromaR + displacement.rotation;
        const gAngle = pixelAngle + chromaG + displacement.rotation;
        const bAngle = pixelAngle + chromaB + displacement.rotation;
        
        const rOffset = this.data.chromaticStrength;
        const gOffset = this.data.chromaticStrength;
        const bOffset = this.data.chromaticStrength;
        
        // Sample positions with displacement and chromatic aberration
        const rx = x + displacement.offsetX + Math.cos(rAngle) * rOffset;
        const ry = y + displacement.offsetY + Math.sin(rAngle) * rOffset;
        const gx = x + displacement.offsetX + Math.cos(gAngle) * gOffset;
        const gy = y + displacement.offsetY + Math.sin(gAngle) * gOffset;
        const bx = x + displacement.offsetX + Math.cos(bAngle) * bOffset;
        const by = y + displacement.offsetY + Math.sin(bAngle) * bOffset;
        
        // Sample with interpolation if smoothing enabled
        echo[idx] = this.#sampleChannel(src, width, height, rx, ry, 0);
        echo[idx + 1] = this.#sampleChannel(src, width, height, gx, gy, 1);
        echo[idx + 2] = this.#sampleChannel(src, width, height, bx, by, 2);
        echo[idx + 3] = this.#sampleChannel(src, width, height, x + displacement.offsetX, y + displacement.offsetY, 3);
      }
    }
    
    return echo;
  }

  /**
   * Sample a channel from source with optional interpolation
   */
  #sampleChannel(src, width, height, x, y, channel) {
    if (this.data.smoothing) {
      // Bilinear interpolation
      const x0 = Math.floor(x);
      const y0 = Math.floor(y);
      const x1 = x0 + 1;
      const y1 = y0 + 1;
      
      // Check bounds
      if (x0 < 0 || x1 >= width || y0 < 0 || y1 >= height) {
        return 0;
      }
      
      const fx = x - x0;
      const fy = y - y0;
      
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
    } else {
      // Nearest neighbor
      const xi = Math.round(x);
      const yi = Math.round(y);
      
      if (xi < 0 || xi >= width || yi < 0 || yi >= height) {
        return 0;
      }
      
      return src[(yi * width + xi) * 4 + channel];
    }
  }

  /**
   * Blend echo into output using configured blend mode
   */
  #blendEcho(output, echo, feedback, width, height, opacity) {
    const blendFunc = this.#getBlendFunction();
    
    for (let i = 0; i < output.length; i += 4) {
      // Apply feedback from previous echoes
      const feedbackR = feedback[i] * this.data.feedbackStrength;
      const feedbackG = feedback[i + 1] * this.data.feedbackStrength;
      const feedbackB = feedback[i + 2] * this.data.feedbackStrength;
      
      // Blend echo with feedback
      const echoR = Math.min(255, echo[i] + feedbackR);
      const echoG = Math.min(255, echo[i + 1] + feedbackG);
      const echoB = Math.min(255, echo[i + 2] + feedbackB);
      
      // Blend into output
      output[i] = blendFunc(output[i], echoR, opacity);
      output[i + 1] = blendFunc(output[i + 1], echoG, opacity);
      output[i + 2] = blendFunc(output[i + 2], echoB, opacity);
      output[i + 3] = Math.max(output[i + 3], echo[i + 3] * opacity);
      
      // Update feedback for next echo
      feedback[i] = output[i];
      feedback[i + 1] = output[i + 1];
      feedback[i + 2] = output[i + 2];
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
   * Apply radial vignette
   */
  #applyVignette(pixels, width, height) {
    const cx = width / 2;
    const cy = height / 2;
    const maxR = Math.hypot(cx, cy);
    const { r, g, b } = this.data.vignetteRGB;
    const strength = this.data.vignetteStrength;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.hypot(dx, dy) / maxR;
        
        // Smooth falloff
        const falloff = 1 - Math.pow(dist, 2) * strength;
        
        pixels[idx] = pixels[idx] * falloff + r * (1 - falloff);
        pixels[idx + 1] = pixels[idx + 1] * falloff + g * (1 - falloff);
        pixels[idx + 2] = pixels[idx + 2] * falloff + b * (1 - falloff);
      }
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
    } : { r: 0, g: 0, b: 0 };
  }
}