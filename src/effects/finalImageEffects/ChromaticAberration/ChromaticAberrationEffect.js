import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';

/**
 * ChromaticAberration Effect - "The Operator in the Noise"
 * 
 * A glitch-art inspired effect that separates RGB color channels with dynamic displacement,
 * creating cyberpunk aesthetics where reality fragments and reassembles. Simulates signal
 * interference, VHS tracking errors, and quantum superposition.
 * 
 * Features:
 * - Five displacement modes: wave, radial, orbital, pulse, scanline
 * - Perfect loop animations with configurable frequency
 * - Independent RGB channel control with phase shifting
 * - Multiple blend modes for channel recombination
 * - Deterministic noise for controlled chaos
 * - Edge handling: wrap, clamp, or transparent
 * - Pure function - deterministic output based on config and frame
 * - Perfect loop - all animations return to origin
 */
export class ChromaticAberrationEffect extends LayerEffect {
  static _name_ = 'chromatic-aberration-final-image-effect';
  static _displayName_ = 'Chromatic Aberration';
  static _description_ = 'RGB channel separation with dynamic displacement. The operator in the noise. Perfect loop.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'final', 'post', 'glitch', 'chromatic', 'cyberpunk', 'animated'];

  constructor({ name = ChromaticAberrationEffect._name_, config, settings } = {}) {
    super({ name, config });
    this.#generate(settings);
  }

  /**
   * Precompute deterministic data structures
   * No randomness - all data derived from config
   */
  #generate(settings) {
    // Convert angles to radians
    const displacementAngleRad = this.config.displacementAngle * Math.PI / 180;
    const wavePhaseShiftRad = this.config.wavePhaseShift * Math.PI / 180;
    const angleVariationRad = this.config.angleVariation * Math.PI / 180;
    const rotationSpeedRad = this.config.rotationSpeed * Math.PI / 180;
    
    // Precompute channel angles (R, G, B with phase shifts)
    const channelAngles = [
      displacementAngleRad,                           // Red: base angle
      displacementAngleRad + angleVariationRad,       // Green: base + variation
      displacementAngleRad + angleVariationRad * 2    // Blue: base + 2*variation
    ];
    
    this.data = {
      width: settings?.width,
      height: settings?.height,
      
      // Displacement
      maxDisplacement: this.config.maxDisplacement,
      displacementMode: this.config.displacementMode,
      
      // Animation
      waveFrequency: this.config.waveFrequency,
      wavePhaseShiftRad,
      rotationSpeedRad,
      pulseIntensity: this.config.pulseIntensity,
      
      // Direction
      channelAngles,
      
      // Scanline
      scanlineFrequency: this.config.scanlineFrequency,
      scanlineIntensity: this.config.scanlineIntensity,
      
      // Color
      channelOpacities: [
        this.config.redChannelOpacity,
        this.config.greenChannelOpacity,
        this.config.blueChannelOpacity
      ],
      blendMode: this.config.blendMode,
      
      // Edge
      edgeMode: this.config.edgeMode,
      
      // Noise
      noiseAmount: this.config.noiseAmount,
      noiseSeed: this.config.noiseSeed,
      
      // Performance
      quality: this.config.quality,
      
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

    // Create output buffer
    const output = globalBufferPool.getBuffer(width, height, 4);
    output.fill(0);
    
    // Create separate channel buffers
    const channelBuffers = [
      globalBufferPool.getBuffer(width, height, 4), // Red
      globalBufferPool.getBuffer(width, height, 4), // Green
      globalBufferPool.getBuffer(width, height, 4)  // Blue
    ];

    // Render each channel with its own displacement
    for (let channelIdx = 0; channelIdx < 3; channelIdx++) {
      this.#renderChannel(
        src,
        channelBuffers[channelIdx],
        width,
        height,
        channelIdx,
        t
      );
    }

    // Blend channels together
    this.#blendChannels(output, channelBuffers, width, height);

    // Cleanup channel buffers
    channelBuffers.forEach(buf => globalBufferPool.returnBuffer(buf, width, height, 4));

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
   * Render a single color channel with displacement
   */
  #renderChannel(src, dst, width, height, channelIdx, t) {
    const cx = width / 2;
    const cy = height / 2;
    const maxDist = Math.hypot(cx, cy);
    
    // Calculate phase for this channel (with phase shift)
    const channelPhase = t + (channelIdx * this.data.wavePhaseShiftRad / (Math.PI * 2));
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        // Calculate displacement for this pixel
        const displacement = this.#calculateDisplacement(
          x, y, cx, cy, maxDist, channelIdx, channelPhase
        );
        
        // Sample source pixel with displacement
        const srcX = x + displacement.x;
        const srcY = y + displacement.y;
        
        // Sample with edge handling
        const sampledValue = this.#samplePixel(src, width, height, srcX, srcY, channelIdx);
        
        // Write to channel buffer (only the specific channel)
        dst[idx + channelIdx] = sampledValue;
        dst[idx + 3] = 255; // Full alpha for now
      }
    }
  }

  /**
   * Calculate displacement vector for a pixel
   * Pure function - returns { x, y } offset
   */
  #calculateDisplacement(x, y, cx, cy, maxDist, channelIdx, t) {
    const mode = this.data.displacementMode;
    const maxDisp = this.data.maxDisplacement;
    const angle = this.data.channelAngles[channelIdx];
    
    // Add deterministic noise if configured
    let noiseX = 0;
    let noiseY = 0;
    if (this.data.noiseAmount > 0) {
      const noise = this.#seededNoise(x, y, channelIdx, this.data.noiseSeed);
      noiseX = noise.x * this.data.noiseAmount * maxDisp;
      noiseY = noise.y * this.data.noiseAmount * maxDisp;
    }
    
    switch (mode) {
      case 'wave':
        return this.#waveDisplacement(t, angle, maxDisp, noiseX, noiseY);
      
      case 'radial':
        return this.#radialDisplacement(x, y, cx, cy, maxDist, t, angle, maxDisp, noiseX, noiseY);
      
      case 'orbital':
        return this.#orbitalDisplacement(x, y, cx, cy, t, maxDisp, noiseX, noiseY);
      
      case 'pulse':
        return this.#pulseDisplacement(t, angle, maxDisp, noiseX, noiseY);
      
      case 'scanline':
        return this.#scanlineDisplacement(y, t, angle, maxDisp, noiseX, noiseY);
      
      default:
        return { x: noiseX, y: noiseY };
    }
  }

  /**
   * Wave Mode: Sinusoidal displacement
   * Channels shift in wave patterns with perfect loops
   */
  #waveDisplacement(t, angle, maxDisp, noiseX, noiseY) {
    // Perfect loop: sin(2π * freq * t) returns to 0 at t=1
    const phase = t * 2 * Math.PI * this.data.waveFrequency;
    const amplitude = Math.sin(phase);
    
    return {
      x: Math.cos(angle) * amplitude * maxDisp + noiseX,
      y: Math.sin(angle) * amplitude * maxDisp + noiseY
    };
  }

  /**
   * Radial Mode: Displacement based on distance from center
   * Channels explode outward and return
   */
  #radialDisplacement(x, y, cx, cy, maxDist, t, angle, maxDisp, noiseX, noiseY) {
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.hypot(dx, dy);
    const normalizedDist = dist / maxDist;
    
    // Perfect loop burst
    const phase = t * 2 * Math.PI * this.data.waveFrequency;
    const burstAmount = Math.sin(phase) * normalizedDist;
    
    // Direction from center
    const pixelAngle = Math.atan2(dy, dx);
    
    return {
      x: Math.cos(pixelAngle + angle) * burstAmount * maxDisp + noiseX,
      y: Math.sin(pixelAngle + angle) * burstAmount * maxDisp + noiseY
    };
  }

  /**
   * Orbital Mode: Channels rotate around center at different speeds
   */
  #orbitalDisplacement(x, y, cx, cy, t, maxDisp, noiseX, noiseY) {
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.hypot(dx, dy);
    const normalizedDist = Math.min(1, dist / Math.max(cx, cy));
    
    // Perfect loop rotation
    const rotationAngle = t * this.data.rotationSpeedRad;
    
    // Displacement perpendicular to radius (tangential)
    const pixelAngle = Math.atan2(dy, dx);
    const tangentAngle = pixelAngle + Math.PI / 2 + rotationAngle;
    
    return {
      x: Math.cos(tangentAngle) * normalizedDist * maxDisp + noiseX,
      y: Math.sin(tangentAngle) * normalizedDist * maxDisp + noiseY
    };
  }

  /**
   * Pulse Mode: Rhythmic separation and convergence
   */
  #pulseDisplacement(t, angle, maxDisp, noiseX, noiseY) {
    // Perfect loop pulse with intensity control
    const phase = t * 2 * Math.PI * this.data.waveFrequency;
    const pulse = Math.sin(phase);
    const intensity = this.data.pulseIntensity;
    
    // Exponential pulse for more dramatic effect
    const amount = Math.sign(pulse) * Math.pow(Math.abs(pulse), 1 / intensity);
    
    return {
      x: Math.cos(angle) * amount * maxDisp + noiseX,
      y: Math.sin(angle) * amount * maxDisp + noiseY
    };
  }

  /**
   * Scanline Mode: Horizontal displacement varies by Y position
   * Simulates VHS tracking errors
   */
  #scanlineDisplacement(y, t, angle, maxDisp, noiseX, noiseY) {
    // Scanline pattern based on Y position
    const scanlinePhase = y * this.data.scanlineFrequency * 0.1;
    
    // Temporal animation
    const timePhase = t * 2 * Math.PI * this.data.waveFrequency;
    
    // Combined phase for scanline glitch
    const combinedPhase = scanlinePhase + timePhase;
    const amount = Math.sin(combinedPhase) * this.data.scanlineIntensity;
    
    return {
      x: Math.cos(angle) * amount * maxDisp + noiseX,
      y: Math.sin(angle) * amount * maxDisp * 0.2 + noiseY // Less vertical displacement
    };
  }

  /**
   * Sample pixel from source with edge handling
   */
  #samplePixel(src, width, height, x, y, channel) {
    const quality = this.data.quality;
    
    if (quality === 'high') {
      return this.#bilinearSample(src, width, height, x, y, channel);
    } else if (quality === 'medium') {
      return this.#nearestSample(src, width, height, Math.round(x), Math.round(y), channel);
    } else {
      // Low quality: nearest neighbor, no rounding
      return this.#nearestSample(src, width, height, Math.floor(x), Math.floor(y), channel);
    }
  }

  /**
   * Bilinear interpolation sampling
   */
  #bilinearSample(src, width, height, x, y, channel) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;
    
    const fx = x - x0;
    const fy = y - y0;
    
    const v00 = this.#getPixelValue(src, width, height, x0, y0, channel);
    const v10 = this.#getPixelValue(src, width, height, x1, y0, channel);
    const v01 = this.#getPixelValue(src, width, height, x0, y1, channel);
    const v11 = this.#getPixelValue(src, width, height, x1, y1, channel);
    
    const v0 = v00 * (1 - fx) + v10 * fx;
    const v1 = v01 * (1 - fx) + v11 * fx;
    
    return v0 * (1 - fy) + v1 * fy;
  }

  /**
   * Nearest neighbor sampling
   */
  #nearestSample(src, width, height, x, y, channel) {
    return this.#getPixelValue(src, width, height, x, y, channel);
  }

  /**
   * Get pixel value with edge handling
   */
  #getPixelValue(src, width, height, x, y, channel) {
    const edgeMode = this.data.edgeMode;
    
    let finalX = x;
    let finalY = y;
    
    if (edgeMode === 'wrap') {
      // Wrap around edges
      finalX = ((x % width) + width) % width;
      finalY = ((y % height) + height) % height;
    } else if (edgeMode === 'clamp') {
      // Clamp to edges
      finalX = Math.max(0, Math.min(width - 1, x));
      finalY = Math.max(0, Math.min(height - 1, y));
    } else {
      // Transparent - return 0 if out of bounds
      if (x < 0 || x >= width || y < 0 || y >= height) {
        return 0;
      }
    }
    
    const idx = (Math.floor(finalY) * width + Math.floor(finalX)) * 4 + channel;
    return src[idx] || 0;
  }

  /**
   * Blend RGB channels together using configured blend mode
   */
  #blendChannels(output, channelBuffers, width, height) {
    const blendFunc = this.#getBlendFunction();
    const opacities = this.data.channelOpacities;
    
    for (let i = 0; i < output.length; i += 4) {
      // Extract channel values
      const r = channelBuffers[0][i];
      const g = channelBuffers[1][i + 1];
      const b = channelBuffers[2][i + 2];
      
      // Apply channel opacities
      const rWeighted = r * opacities[0];
      const gWeighted = g * opacities[1];
      const bWeighted = b * opacities[2];
      
      // Blend channels
      output[i] = blendFunc(0, rWeighted);
      output[i + 1] = blendFunc(output[i + 1], gWeighted);
      output[i + 2] = blendFunc(output[i + 2], bWeighted);
      
      // Alpha: max of all channels
      output[i + 3] = Math.max(
        channelBuffers[0][i + 3],
        channelBuffers[1][i + 3],
        channelBuffers[2][i + 3]
      );
    }
  }

  /**
   * Get blend function based on mode
   */
  #getBlendFunction() {
    switch (this.data.blendMode) {
      case 'screen':
        return (base, blend) => {
          return 255 - (((255 - base) * (255 - blend)) / 255);
        };
      
      case 'additive':
        return (base, blend) => {
          return Math.min(255, base + blend);
        };
      
      case 'normal':
      default:
        return (base, blend) => {
          return blend > 0 ? blend : base;
        };
    }
  }

  /**
   * Seeded noise generator for deterministic randomness
   * Returns { x, y } in range [-1, 1]
   */
  #seededNoise(x, y, channel, seed) {
    // Simple hash-based noise
    const hash = (n) => {
      n = ((n << 13) ^ n);
      return (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff;
    };
    
    const n = hash(x + hash(y + hash(channel + seed)));
    const n2 = hash(n + 1);
    
    return {
      x: (n / 0x7fffffff) * 2 - 1,
      y: (n2 / 0x7fffffff) * 2 - 1
    };
  }
}