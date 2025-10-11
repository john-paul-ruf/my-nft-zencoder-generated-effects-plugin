import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';

/**
 * ChromaticAberration Effect
 * 
 * Simulates optical lens distortion by separating RGB color channels and displacing them
 * radially from a configurable focal point. Creates dreamy, glitchy aesthetics with
 * perfect looping animations.
 */
export class ChromaticAberrationEffect extends LayerEffect {
  static _name_ = 'chromatic-aberration';

  constructor({
    name = ChromaticAberrationEffect._name_,
    config,
    settings
  }) {
    super({
      name,
      config
    });
    this.#generate(settings);
  }

  /**
   * Generates deterministic data from configuration to ensure invoke is pure
   */
  #generate(settings) {
    this.data = {
      // Parse tint colors to RGB
      redTint: this.#parseColor(this.config.redTint),
      greenTint: this.#parseColor(this.config.greenTint),
      blueTint: this.#parseColor(this.config.blueTint),
      
      // Store dimensions from settings if available
      width: settings?.width,
      height: settings?.height,
      
      // Pre-calculate any deterministic values
      seed: this.config.seed
    };
  }

  /**
   * Main effect invocation - processes a layer for a specific frame
   */
  async invoke(layer, frameNumber, totalFrames) {
    // Get layer info for dimensions
    const layerInfo = await layer.getInfo();
    const width = this.data.width || layerInfo.width;
    const height = this.data.height || layerInfo.height;

    // Get the original layer as a buffer and convert to raw pixel data
    const layerBuffer = await layer.toBuffer();
    const { data: originalPixels, info } = await sharp(layerBuffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Create a buffer for the processed image
    const processedPixels = globalBufferPool.getBuffer(width, height, 4);
    
    // Initialize with transparent black
    processedPixels.fill(0);

    // Calculate animation progress for perfect loop
    const progress = frameNumber / totalFrames;

    // Calculate displacement intensity based on animation mode
    const displacementIntensity = this.#calculateDisplacementIntensity(progress);

    // Calculate focal point in pixel coordinates
    const focalX = this.config.focalPointX * width;
    const focalY = this.config.focalPointY * height;

    // Process each pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        // Get original alpha to check if pixel is transparent
        const originalAlpha = originalPixels[idx + 3];
        
        // Skip fully transparent pixels for performance
        if (originalAlpha === 0) {
          processedPixels[idx + 3] = 0;
          continue;
        }

        // Calculate displacement vector for this pixel
        const displacement = this.#calculateDisplacement(
          x, y, focalX, focalY, width, height, progress, displacementIntensity
        );

        // Sample each channel with its offset
        const red = this.#sampleChannel(
          originalPixels, x, y, width, height,
          displacement.x * this.config.redOffset,
          displacement.y * this.config.redOffset,
          0 // red channel
        );

        const green = this.#sampleChannel(
          originalPixels, x, y, width, height,
          displacement.x * this.config.greenOffset,
          displacement.y * this.config.greenOffset,
          1 // green channel
        );

        const blue = this.#sampleChannel(
          originalPixels, x, y, width, height,
          displacement.x * this.config.blueOffset,
          displacement.y * this.config.blueOffset,
          2 // blue channel
        );

        // Apply color tinting if enabled
        let finalRed = red;
        let finalGreen = green;
        let finalBlue = blue;

        if (this.config.tintStrength > 0) {
          finalRed = this.#applyTint(red, this.data.redTint.r, this.config.tintStrength);
          finalGreen = this.#applyTint(green, this.data.greenTint.g, this.config.tintStrength);
          finalBlue = this.#applyTint(blue, this.data.blueTint.b, this.config.tintStrength);
        }

        // Write processed pixel
        processedPixels[idx] = Math.round(finalRed);
        processedPixels[idx + 1] = Math.round(finalGreen);
        processedPixels[idx + 2] = Math.round(finalBlue);
        
        // Preserve alpha if configured
        if (this.config.preserveAlpha) {
          processedPixels[idx + 3] = originalAlpha;
        } else {
          // Average alpha from all three channel samples
          const alphaR = this.#sampleChannel(originalPixels, x, y, width, height,
            displacement.x * this.config.redOffset,
            displacement.y * this.config.redOffset, 3);
          const alphaG = this.#sampleChannel(originalPixels, x, y, width, height,
            displacement.x * this.config.greenOffset,
            displacement.y * this.config.greenOffset, 3);
          const alphaB = this.#sampleChannel(originalPixels, x, y, width, height,
            displacement.x * this.config.blueOffset,
            displacement.y * this.config.blueOffset, 3);
          processedPixels[idx + 3] = Math.round((alphaR + alphaG + alphaB) / 3);
        }
      }
    }

    // Convert processed pixels back to PNG buffer
    const processedBuffer = await sharp(processedPixels, {
      raw: {
        width: width,
        height: height,
        channels: 4
      }
    })
      .png()
      .toBuffer();

    // Return buffer to pool
    globalBufferPool.returnBuffer(processedPixels, width, height, 4);

    // Update layer with processed buffer
    await layer.fromBuffer(processedBuffer);

    // Apply opacity adjustment
    await layer.adjustLayerOpacity(this.config.layerOpacity);

    return layer;
  }

  /**
   * Calculate displacement intensity based on animation mode
   * Returns a value between 0 and 1 that modulates the displacement
   */
  #calculateDisplacementIntensity(progress) {
    const speed = this.config.pulseSpeed;
    
    switch (this.config.animationMode) {
      case 'pulse':
        // Sine wave: 0 → 1 → 0 over full cycle (perfect loop)
        return Math.abs(Math.sin(progress * Math.PI * 2 * speed)) * 0.5 + 0.5;
      
      case 'wave':
        // Multiple waves passing through
        return Math.abs(Math.sin(progress * Math.PI * 2 * this.config.waveCount * speed));
      
      case 'rotate':
        // Constant intensity for rotation (angle changes, not intensity)
        return 1.0;
      
      case 'static':
        // No animation
        return 1.0;
      
      default:
        return 1.0;
    }
  }

  /**
   * Calculate displacement vector for a pixel based on displacement curve
   */
  #calculateDisplacement(x, y, focalX, focalY, width, height, progress, intensity) {
    const dx = x - focalX;
    const dy = y - focalY;
    
    // Calculate distance from focal point (normalized)
    const maxDist = Math.sqrt(width * width + height * height) / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const normalizedDist = distance / maxDist;
    
    // Apply edge falloff (effect is stronger at edges, weaker at center)
    const falloff = Math.pow(normalizedDist, 1 - this.config.edgeFalloff);
    
    // Base displacement magnitude
    const magnitude = this.config.maxDisplacement * intensity * falloff;
    
    let offsetX = 0;
    let offsetY = 0;
    
    switch (this.config.displacementCurve) {
      case 'radial':
        // Displace outward from focal point
        if (distance > 0) {
          offsetX = (dx / distance) * magnitude;
          offsetY = (dy / distance) * magnitude;
        }
        
        // Apply rotation if in rotate mode
        if (this.config.animationMode === 'rotate') {
          const angle = progress * Math.PI * 2 * this.config.rotationDirection * this.config.pulseSpeed;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const rotatedX = offsetX * cos - offsetY * sin;
          const rotatedY = offsetX * sin + offsetY * cos;
          offsetX = rotatedX;
          offsetY = rotatedY;
        }
        break;
      
      case 'horizontal':
        // Displace horizontally based on distance from focal point
        offsetX = (x < focalX ? -1 : 1) * magnitude;
        offsetY = 0;
        break;
      
      case 'vertical':
        // Displace vertically based on distance from focal point
        offsetX = 0;
        offsetY = (y < focalY ? -1 : 1) * magnitude;
        break;
      
      case 'diagonal':
        // Displace diagonally
        const diagonalSign = ((x < focalX) === (y < focalY)) ? 1 : -1;
        offsetX = diagonalSign * magnitude * 0.707; // cos(45°)
        offsetY = diagonalSign * magnitude * 0.707; // sin(45°)
        break;
    }
    
    return { x: offsetX, y: offsetY };
  }

  /**
   * Sample a specific channel from the source image with displacement
   * Uses bilinear or nearest neighbor interpolation
   */
  #sampleChannel(pixels, x, y, width, height, offsetX, offsetY, channel) {
    const sourceX = x + offsetX;
    const sourceY = y + offsetY;
    
    // Clamp to image bounds
    const clampedX = Math.max(0, Math.min(width - 1, sourceX));
    const clampedY = Math.max(0, Math.min(height - 1, sourceY));
    
    if (this.config.interpolation === 'nearest') {
      // Nearest neighbor - fast but blocky
      const nearestX = Math.round(clampedX);
      const nearestY = Math.round(clampedY);
      const idx = (nearestY * width + nearestX) * 4 + channel;
      return pixels[idx];
    } else {
      // Bilinear interpolation - smooth but slower
      const x0 = Math.floor(clampedX);
      const y0 = Math.floor(clampedY);
      const x1 = Math.min(x0 + 1, width - 1);
      const y1 = Math.min(y0 + 1, height - 1);
      
      const fx = clampedX - x0;
      const fy = clampedY - y0;
      
      const idx00 = (y0 * width + x0) * 4 + channel;
      const idx10 = (y0 * width + x1) * 4 + channel;
      const idx01 = (y1 * width + x0) * 4 + channel;
      const idx11 = (y1 * width + x1) * 4 + channel;
      
      const val00 = pixels[idx00];
      const val10 = pixels[idx10];
      const val01 = pixels[idx01];
      const val11 = pixels[idx11];
      
      // Bilinear blend
      const val0 = val00 * (1 - fx) + val10 * fx;
      const val1 = val01 * (1 - fx) + val11 * fx;
      return val0 * (1 - fy) + val1 * fy;
    }
  }

  /**
   * Apply color tint to a channel value
   */
  #applyTint(channelValue, tintValue, strength) {
    return channelValue * (1 - strength) + tintValue * strength;
  }

  /**
   * Parse hex color to RGB object with robust validation and fallback
   * Supports: '#RRGGBB', 'RRGGBB', '#RGB', 'RGB'
   */
  #parseColor(hex, fallback = '#FFFFFF') {
    // Validate input; use fallback if missing/invalid type
    if (typeof hex !== 'string' || !hex) {
      hex = fallback;
    }

    // Normalize and strip prefixes
    hex = String(hex).trim();
    if (hex.startsWith('0x')) hex = hex.slice(2);
    if (hex.startsWith('#')) hex = hex.slice(1);

    // Expand 3-digit hex to 6-digit
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }

    // If invalid, fall back
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