import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import { findValue } from 'my-nft-gen';
import { getRandomFromArray, randomNumber } from 'my-nft-gen/src/core/math/random.js';
import sharp from 'sharp';
import { globalBufferPool } from 'my-nft-gen/src/core/pool/BufferPool.js';
import { LayerFactory } from 'my-nft-gen/src/core/factory/layer/LayerFactory.js';
import { HolographicPrismConfig } from './HolographicPrismConfig.js';

export class HolographicPrismEffect extends LayerEffect {
  static _name_ = 'holographic-prism';
  static _displayName_ = 'Holographic Prism';
  static _description_ = 'Transforms layers into holographic displays with chromatic dispersion, light refraction, and iridescent shimmer';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'secondary', 'holographic', 'prism', 'chromatic', 'iridescent'];

  constructor({
    name = HolographicPrismEffect._name_,
    config = new HolographicPrismConfig({}),
    settings
  }) {
    super({
      name,
      config
    });
    this.time = 0;
    this.#generate(settings);
  }

  /**
   * Generates deterministic data from configuration to ensure invoke is pure
   */
  #generate(settings) {
    this.data = {
      // Pre-select algorithms for each parameter to avoid random selection in invoke
      animationMode: Array.isArray(this.config.animationMode)
        ? getRandomFromArray(this.config.animationMode)
        : this.config.animationMode,

      chromaticAlgorithm: Array.isArray(this.config.chromaticAlgorithm)
        ? getRandomFromArray(this.config.chromaticAlgorithm)
        : this.config.chromaticAlgorithm,

      dispersionAlgorithm: Array.isArray(this.config.dispersionAlgorithm)
        ? getRandomFromArray(this.config.dispersionAlgorithm)
        : this.config.dispersionAlgorithm,

      shimmerAlgorithm: Array.isArray(this.config.shimmerAlgorithm)
        ? getRandomFromArray(this.config.shimmerAlgorithm)
        : this.config.shimmerAlgorithm,

      parallaxAlgorithm: Array.isArray(this.config.parallaxAlgorithm)
        ? getRandomFromArray(this.config.parallaxAlgorithm)
        : this.config.parallaxAlgorithm,

      // Pre-calculate integer values for perfect loop
      parallaxLayers: Math.floor(randomNumber(
        this.config.parallaxLayers.lower,
        this.config.parallaxLayers.upper
      )),

      // Pre-select spectrum start for consistency
      spectrumHueStart: randomNumber(
        this.config.spectrumHueStart.lower,
        this.config.spectrumHueStart.upper
      ),

      // Store configuration
      edgeBehavior: this.config.edgeBehavior,
      layerOpacity: this.config.layerOpacity,
      layerBlendMode: this.config.layerBlendMode,
      perfectLoop: this.config.perfectLoop,

      // Store dimensions from settings if available
      width: settings?.width,
      height: settings?.height
    };
  }

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

    // Create buffers for processing
    const workingPixels = globalBufferPool.getBuffer(width, height, 4);
    const outputPixels = globalBufferPool.getBuffer(width, height, 4);

    // Copy original pixels to working buffer
    workingPixels.set(originalPixels);

    // Calculate time for perfect loop animation
    const progress = frameNumber / totalFrames;
    this.time = (this.config.perfectLoop !== false)
      ? progress * Math.PI * 2
      : frameNumber * 0.01;

    // Get animated parameters using findValue
    const chromaticStrength = findValue(
      this.config.chromaticStrength.lower,
      this.config.chromaticStrength.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.chromaticAlgorithm
    );

    const chromaticAngle = findValue(
      this.config.chromaticAngle.lower,
      this.config.chromaticAngle.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.chromaticAlgorithm
    );

    const dispersionIntensity = findValue(
      this.config.dispersionIntensity.lower,
      this.config.dispersionIntensity.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.dispersionAlgorithm
    );

    const dispersionAngle = findValue(
      this.config.dispersionAngle.lower,
      this.config.dispersionAngle.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.dispersionAlgorithm
    );

    const wavelengthSeparation = findValue(
      this.config.wavelengthSeparation.lower,
      this.config.wavelengthSeparation.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.dispersionAlgorithm
    );

    const shimmerIntensity = findValue(
      this.config.shimmerIntensity.lower,
      this.config.shimmerIntensity.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.shimmerAlgorithm
    );

    const shimmerSpeed = findValue(
      this.config.shimmerSpeed.lower,
      this.config.shimmerSpeed.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.shimmerAlgorithm
    );

    const shimmerScale = findValue(
      this.config.shimmerScale.lower,
      this.config.shimmerScale.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.shimmerAlgorithm
    );

    const parallaxStrength = findValue(
      this.config.parallaxStrength.lower,
      this.config.parallaxStrength.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.parallaxAlgorithm
    );

    const parallaxAngle = findValue(
      this.config.parallaxAngle.lower,
      this.config.parallaxAngle.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.parallaxAlgorithm
    );

    const glowIntensity = findValue(
      this.config.glowIntensity.lower,
      this.config.glowIntensity.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.shimmerAlgorithm
    );

    const glowRadius = findValue(
      this.config.glowRadius.lower,
      this.config.glowRadius.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.shimmerAlgorithm
    );

    const glowSaturation = findValue(
      this.config.glowSaturation.lower,
      this.config.glowSaturation.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.shimmerAlgorithm
    );

    const refractionStrength = findValue(
      this.config.refractionStrength.lower,
      this.config.refractionStrength.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.dispersionAlgorithm
    );

    const refractionComplexity = findValue(
      this.config.refractionComplexity.lower,
      this.config.refractionComplexity.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.dispersionAlgorithm
    );

    const spectrumHueRange = findValue(
      this.config.spectrumHueRange.lower,
      this.config.spectrumHueRange.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.shimmerAlgorithm
    );

    const spectrumSaturation = findValue(
      this.config.spectrumSaturation.lower,
      this.config.spectrumSaturation.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.shimmerAlgorithm
    );

    const spectrumBrightness = findValue(
      this.config.spectrumBrightness.lower,
      this.config.spectrumBrightness.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.shimmerAlgorithm
    );

    const effectStrength = findValue(
      this.config.effectStrength.lower,
      this.config.effectStrength.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.chromaticAlgorithm
    );

    const preserveOriginal = findValue(
      this.config.preserveOriginal.lower,
      this.config.preserveOriginal.upper,
      1,
      totalFrames,
      frameNumber,
      this.data.chromaticAlgorithm
    );

    // Apply holographic prism effect based on animation mode
    this.#applyHolographicPrism(
      originalPixels,
      workingPixels,
      outputPixels,
      width,
      height,
      {
        chromaticStrength,
        chromaticAngle,
        dispersionIntensity,
        dispersionAngle,
        wavelengthSeparation,
        shimmerIntensity,
        shimmerSpeed,
        shimmerScale,
        parallaxStrength,
        parallaxAngle,
        glowIntensity,
        glowRadius,
        glowSaturation,
        refractionStrength,
        refractionComplexity,
        spectrumHueRange,
        spectrumSaturation,
        spectrumBrightness,
        effectStrength,
        preserveOriginal
      }
    );

    // Convert processed pixels back to a layer
    const processedBuffer = await sharp(outputPixels, {
      raw: {
        width,
        height,
        channels: 4
      }
    })
      .png()
      .toBuffer();

    // Release buffers back to pool
    globalBufferPool.releaseBuffer(workingPixels);
    globalBufferPool.releaseBuffer(outputPixels);

    // Create and return new layer
    return LayerFactory.createFromBuffer(processedBuffer, {
      opacity: this.data.layerOpacity,
      blendMode: this.data.layerBlendMode
    });
  }

  /**
   * Apply holographic prism effect to pixels
   */
  #applyHolographicPrism(originalPixels, workingPixels, outputPixels, width, height, params) {
    const centerX = width / 2;
    const centerY = height / 2;

    // Process each pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;

        // Get original pixel
        const origR = originalPixels[idx];
        const origG = originalPixels[idx + 1];
        const origB = originalPixels[idx + 2];
        const origA = originalPixels[idx + 3];

        // Skip fully transparent pixels
        if (origA === 0) {
          outputPixels[idx] = 0;
          outputPixels[idx + 1] = 0;
          outputPixels[idx + 2] = 0;
          outputPixels[idx + 3] = 0;
          continue;
        }

        // Apply effects based on animation mode
        let finalColor = { r: origR, g: origG, b: origB, a: origA };

        // 1. Apply chromatic aberration
        finalColor = this.#applyChromaticAberration(
          originalPixels,
          x,
          y,
          width,
          height,
          params.chromaticStrength,
          params.chromaticAngle
        );

        // 2. Apply prismatic dispersion
        finalColor = this.#applyPrismaticDispersion(
          workingPixels,
          x,
          y,
          width,
          height,
          finalColor,
          params.dispersionIntensity,
          params.dispersionAngle,
          params.wavelengthSeparation
        );

        // 3. Apply depth parallax
        finalColor = this.#applyDepthParallax(
          workingPixels,
          x,
          y,
          width,
          height,
          finalColor,
          params.parallaxStrength,
          params.parallaxAngle,
          origA
        );

        // 4. Apply holographic shimmer
        finalColor = this.#applyHolographicShimmer(
          x,
          y,
          width,
          height,
          finalColor,
          params.shimmerIntensity,
          params.shimmerSpeed,
          params.shimmerScale,
          params.spectrumHueRange,
          params.spectrumSaturation,
          params.spectrumBrightness
        );

        // 5. Apply spectral glow (edge detection)
        finalColor = this.#applySpectralGlow(
          originalPixels,
          x,
          y,
          width,
          height,
          finalColor,
          params.glowIntensity,
          params.glowRadius,
          params.glowSaturation,
          centerX,
          centerY
        );

        // 6. Blend with original
        const blendAmount = params.preserveOriginal;
        finalColor.r = Math.round(origR * blendAmount + finalColor.r * (1 - blendAmount));
        finalColor.g = Math.round(origG * blendAmount + finalColor.g * (1 - blendAmount));
        finalColor.b = Math.round(origB * blendAmount + finalColor.b * (1 - blendAmount));

        // Apply effect strength
        finalColor.r = Math.round(origR * (1 - params.effectStrength) + finalColor.r * params.effectStrength);
        finalColor.g = Math.round(origG * (1 - params.effectStrength) + finalColor.g * params.effectStrength);
        finalColor.b = Math.round(origB * (1 - params.effectStrength) + finalColor.b * params.effectStrength);

        // Write to output (preserve original alpha)
        outputPixels[idx] = Math.max(0, Math.min(255, finalColor.r));
        outputPixels[idx + 1] = Math.max(0, Math.min(255, finalColor.g));
        outputPixels[idx + 2] = Math.max(0, Math.min(255, finalColor.b));
        outputPixels[idx + 3] = origA; // Preserve original alpha
      }
    }
  }

  /**
   * Apply chromatic aberration (RGB channel separation)
   */
  #applyChromaticAberration(pixels, x, y, width, height, strength, angle) {
    const angleRad = (angle * Math.PI) / 180;
    
    // Add animation based on mode
    let animatedAngle = angleRad;
    if (this.data.animationMode === 'rotation' || this.data.animationMode === 'combined') {
      animatedAngle += this.time;
    }

    const offsetX = Math.cos(animatedAngle) * strength;
    const offsetY = Math.sin(animatedAngle) * strength;

    // Sample R channel from offset position
    const rColor = this.#samplePixel(pixels, x + offsetX, y + offsetY, width, height);
    
    // Sample G channel from center
    const gColor = this.#samplePixel(pixels, x, y, width, height);
    
    // Sample B channel from opposite offset
    const bColor = this.#samplePixel(pixels, x - offsetX, y - offsetY, width, height);

    return {
      r: rColor.r,
      g: gColor.g,
      b: bColor.b,
      a: gColor.a
    };
  }

  /**
   * Apply prismatic dispersion (wavelength-based displacement)
   */
  #applyPrismaticDispersion(pixels, x, y, width, height, color, intensity, angle, separation) {
    const angleRad = (angle * Math.PI) / 180;
    
    // Add animation based on mode
    let animatedAngle = angleRad;
    if (this.data.animationMode === 'pulse' || this.data.animationMode === 'combined') {
      const pulse = 0.5 + 0.5 * Math.sin(this.time * 2);
      intensity *= pulse;
    }

    // Calculate wavelength from pixel brightness
    const brightness = (color.r + color.g + color.b) / 3;
    const wavelength = brightness / 255;

    // Displace based on wavelength (red shifts more than blue)
    const displacement = wavelength * separation * intensity;
    const offsetX = Math.cos(animatedAngle) * displacement;
    const offsetY = Math.sin(animatedAngle) * displacement;

    // Sample from displaced position
    return this.#samplePixel(pixels, x + offsetX, y + offsetY, width, height);
  }

  /**
   * Apply depth parallax (multi-layer displacement)
   */
  #applyDepthParallax(pixels, x, y, width, height, color, strength, angle, alpha) {
    const angleRad = (angle * Math.PI) / 180;
    
    // Add animation based on mode
    let animatedStrength = strength;
    if (this.data.animationMode === 'depth' || this.data.animationMode === 'combined') {
      animatedStrength *= Math.sin(this.time);
    }

    // Use alpha as depth indicator (more opaque = closer)
    const depth = alpha / 255;
    const layer = Math.floor(depth * this.data.parallaxLayers);
    const layerDepth = layer / this.data.parallaxLayers;

    // Calculate displacement for this layer
    const displacement = layerDepth * animatedStrength;
    const offsetX = Math.cos(angleRad) * displacement;
    const offsetY = Math.sin(angleRad) * displacement;

    // Sample from displaced position
    return this.#samplePixel(pixels, x + offsetX, y + offsetY, width, height);
  }

  /**
   * Apply holographic shimmer (iridescent overlay)
   */
  #applyHolographicShimmer(x, y, width, height, color, intensity, speed, scale, hueRange, saturation, brightness) {
    // Add animation based on mode
    let animatedTime = this.time * speed;
    if (this.data.animationMode === 'wave' || this.data.animationMode === 'combined') {
      const wavePhase = (x / width) * Math.PI * 2;
      animatedTime += Math.sin(wavePhase + this.time) * Math.PI;
    }

    // Calculate shimmer phase from position and time
    const phase = (x + y) * scale + animatedTime;

    // Generate rainbow hue
    const hue = (this.data.spectrumHueStart + Math.sin(phase) * hueRange) % 360;

    // Convert HSL to RGB
    const shimmerColor = this.#hslToRgb(hue / 360, saturation, brightness);

    // Blend with original color
    return {
      r: Math.round(color.r * (1 - intensity) + shimmerColor.r * intensity),
      g: Math.round(color.g * (1 - intensity) + shimmerColor.g * intensity),
      b: Math.round(color.b * (1 - intensity) + shimmerColor.b * intensity),
      a: color.a
    };
  }

  /**
   * Apply spectral glow (rainbow edge glow)
   */
  #applySpectralGlow(pixels, x, y, width, height, color, intensity, radius, saturation, centerX, centerY) {
    // Detect if this is an edge pixel by checking alpha gradient
    const isEdge = this.#isEdgePixel(pixels, x, y, width, height);

    if (!isEdge || intensity <= 0) {
      return color;
    }

    // Calculate glow color based on position relative to center
    const angle = Math.atan2(y - centerY, x - centerX);
    const hue = ((angle / (2 * Math.PI)) * 360 + this.time * 60) % 360;

    // Create glow color
    const glowColor = this.#hslToRgb(hue / 360, saturation, 0.5);

    // Apply glow
    return {
      r: Math.round(color.r * (1 - intensity) + glowColor.r * intensity),
      g: Math.round(color.g * (1 - intensity) + glowColor.g * intensity),
      b: Math.round(color.b * (1 - intensity) + glowColor.b * intensity),
      a: color.a
    };
  }

  /**
   * Detect if pixel is on an edge (alpha gradient)
   */
  #isEdgePixel(pixels, x, y, width, height) {
    const idx = (y * width + x) * 4;
    const alpha = pixels[idx + 3];

    if (alpha === 0) return false;

    // Check neighbors for alpha difference
    const neighbors = [
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 }
    ];

    for (const { dx, dy } of neighbors) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
        return true; // Edge of image
      }

      const nIdx = (ny * width + nx) * 4;
      const nAlpha = pixels[nIdx + 3];

      if (Math.abs(alpha - nAlpha) > 50) {
        return true; // Significant alpha difference
      }
    }

    return false;
  }

  /**
   * Sample pixel with bilinear interpolation
   */
  #samplePixel(pixels, x, y, width, height) {
    // Handle edge behavior
    if (this.data.edgeBehavior === 'clamp') {
      x = Math.max(0, Math.min(width - 1, x));
      y = Math.max(0, Math.min(height - 1, y));
    } else {
      // Wrap
      x = ((x % width) + width) % width;
      y = ((y % height) + height) % height;
    }

    // Get integer and fractional parts
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = Math.min(x0 + 1, width - 1);
    const y1 = Math.min(y0 + 1, height - 1);
    const fx = x - x0;
    const fy = y - y0;

    // Sample 4 neighboring pixels
    const idx00 = (y0 * width + x0) * 4;
    const idx10 = (y0 * width + x1) * 4;
    const idx01 = (y1 * width + x0) * 4;
    const idx11 = (y1 * width + x1) * 4;

    // Bilinear interpolation
    const r = (1 - fx) * (1 - fy) * pixels[idx00] +
              fx * (1 - fy) * pixels[idx10] +
              (1 - fx) * fy * pixels[idx01] +
              fx * fy * pixels[idx11];

    const g = (1 - fx) * (1 - fy) * pixels[idx00 + 1] +
              fx * (1 - fy) * pixels[idx10 + 1] +
              (1 - fx) * fy * pixels[idx01 + 1] +
              fx * fy * pixels[idx11 + 1];

    const b = (1 - fx) * (1 - fy) * pixels[idx00 + 2] +
              fx * (1 - fy) * pixels[idx10 + 2] +
              (1 - fx) * fy * pixels[idx01 + 2] +
              fx * fy * pixels[idx11 + 2];

    const a = (1 - fx) * (1 - fy) * pixels[idx00 + 3] +
              fx * (1 - fy) * pixels[idx10 + 3] +
              (1 - fx) * fy * pixels[idx01 + 3] +
              fx * fy * pixels[idx11 + 3];

    return {
      r: Math.round(r),
      g: Math.round(g),
      b: Math.round(b),
      a: Math.round(a)
    };
  }

  /**
   * Convert HSL to RGB
   */
  #hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }
}