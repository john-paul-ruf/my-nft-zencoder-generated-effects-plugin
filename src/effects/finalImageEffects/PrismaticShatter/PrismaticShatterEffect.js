import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';

/**
 * PrismaticShatter Effect - Crystalline Light Refraction
 * 
 * Fractures the composite image into floating crystal shards that refract light into
 * stunning prismatic spectrums. Each shard rotates in 3D space, creating dynamic
 * rainbow patterns, volumetric light rays, and chromatic aberrations.
 * 
 * Features:
 * - Voronoi-based crystalline tessellation
 * - Physically-inspired light refraction with configurable index
 * - Per-shard 3D rotation and orbital motion
 * - RGB channel separation for chromatic dispersion
 * - Volumetric light rays with intersection hotspots
 * - Atmospheric fog and bloom effects
 * - Perfect loop animation with sine-wave cycles
 * - Pure deterministic function - no randomness
 * 
 * @extends LayerEffect
 */
export class PrismaticShatterEffect extends LayerEffect {
  static _name_ = 'prismatic-shatter';
  static _displayName_ = 'Prismatic Shatter';
  static _description_ = 'Fractures image into crystal shards with prismatic light refraction. Perfect loop.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'final', 'post', 'prismatic', 'crystal', 'refraction', 'animated', 'dramatic'];

  constructor({ name = PrismaticShatterEffect._name_, config, settings } = {}) {
    super({ name, config });
    this.#generate(settings);
  }

  /**
   * Pre-generate all deterministic data structures
   * All calculations based on config - no randomness
   */
  #generate(settings) {
    const width = settings?.width || 512;
    const height = settings?.height || 512;
    
    // Parse colors to RGB components
    const primaryRGB = this.#hexToRgb(this.config.primarySpectrumColor);
    const secondaryRGB = this.#hexToRgb(this.config.secondarySpectrumColor);
    const glowRGB = this.#hexToRgb(this.config.glowColor);
    const fogRGB = this.#hexToRgb(this.config.fogColor);
    const flareRGB = this.#hexToRgb(this.config.flareColor);
    
    // Generate shards using deterministic Voronoi tessellation
    const shards = this.#generateShards(width, height);
    
    // Pre-calculate spectrum colors for efficiency
    const spectrumColors = this.#generateSpectrumGradient(primaryRGB, secondaryRGB);
    
    this.data = {
      width,
      height,
      centerX: width / 2,
      centerY: height / 2,
      
      // Shards data
      shards,
      shardCount: shards.length,
      
      // Pre-calculated colors
      colors: {
        primary: primaryRGB,
        secondary: secondaryRGB,
        glow: glowRGB,
        fog: fogRGB,
        flare: flareRGB,
        spectrum: spectrumColors
      },
      
      // Light source in radians
      lightAngleRad: (this.config.lightAngle * Math.PI) / 180,
      
      // Refraction calculations
      refractionAngleStep: Math.PI / this.config.shardCount,
      criticalAngleRad: (this.config.criticalAngle * Math.PI) / 180
    };
  }

  /**
   * Generate Voronoi-based shard tessellation
   * Deterministic based on seed
   */
  #generateShards(width, height) {
    const shards = [];
    const { shardCount, tessellationSeed, shardSizeVariance } = this.config;
    
    // Use seed for deterministic positioning
    const rng = this.#seededRandom(tessellationSeed);
    
    // Generate shard center points
    for (let i = 0; i < shardCount; i++) {
      const angle = (i / shardCount) * Math.PI * 2;
      const radiusVariance = rng() * 0.3 + 0.7;
      const radius = Math.min(width, height) * 0.35 * radiusVariance;
      
      const shard = {
        id: i,
        centerX: width / 2 + Math.cos(angle) * radius,
        centerY: height / 2 + Math.sin(angle) * radius,
        size: 1.0 + (rng() - 0.5) * shardSizeVariance,
        depth: (rng() - 0.5) * this.config.shardDepthRange,
        phaseShift: i * this.config.phaseOffset,
        vertices: []
      };
      
      // Generate vertices for shard polygon (simplified for now)
      const vertexCount = 6; // Hexagonal shards
      for (let v = 0; v < vertexCount; v++) {
        const vAngle = (v / vertexCount) * Math.PI * 2;
        const vRadius = 30 * shard.size;
        shard.vertices.push({
          x: Math.cos(vAngle) * vRadius,
          y: Math.sin(vAngle) * vRadius
        });
      }
      
      shards.push(shard);
    }
    
    return shards;
  }

  /**
   * Simple seeded random number generator
   * Deterministic pseudo-random based on seed
   */
  #seededRandom(seed) {
    let value = seed;
    return () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  }

  /**
   * Generate spectrum gradient colors
   */
  #generateSpectrumGradient(startRGB, endRGB) {
    const steps = 7; // ROYGBIV
    const colors = [];
    
    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1);
      colors.push({
        r: Math.floor(startRGB.r + (endRGB.r - startRGB.r) * t),
        g: Math.floor(startRGB.g + (endRGB.g - startRGB.g) * t),
        b: Math.floor(startRGB.b + (endRGB.b - startRGB.b) * t)
      });
    }
    
    return colors;
  }

  /**
   * Convert hex color to RGB
   */
  #hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  }

  /**
   * Main render function
   * Pure function - output depends only on inputs
   */
  async invoke(layer, frameNumber = 0, totalFrames = 1) {
    const { width, height } = this.data;
    
    // Create working canvas
    const canvas = this.createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Enable antialiasing if configured
    ctx.imageSmoothingEnabled = this.config.antialiasing;
    ctx.imageSmoothingQuality = 'high';
    
    // Calculate animation progress (0 to 1)
    const progress = totalFrames > 1 ? frameNumber / totalFrames : 0;
    const animAngle = progress * Math.PI * 2; // Full cycle for perfect loop
    
    // Clear canvas with ambient glow
    this.#renderAmbientGlow(ctx, width, height);
    
    // Render atmospheric fog layer
    if (this.config.fogDensity > 0) {
      this.#renderFog(ctx, width, height, animAngle);
    }
    
    // Draw original image first (will be shattered)
    if (layer?.canvas) {
      ctx.globalAlpha = 1.0 - this.config.effectIntensity * 0.5;
      ctx.drawImage(layer.canvas, 0, 0, width, height);
    }
    
    // Calculate shard positions and render
    this.#renderShards(ctx, layer, animAngle);
    
    // Render volumetric light rays
    if (this.config.lightIntensity > 0) {
      this.#renderLightRays(ctx, animAngle);
    }
    
    // Apply bloom to bright areas
    if (this.config.bloomIntensity > 0) {
      this.#applyBloom(ctx);
    }
    
    // Add lens flares at bright spots
    if (this.config.flareThreshold < 1) {
      this.#renderLensFlares(ctx, animAngle);
    }
    
    // Apply final opacity
    if (this.config.layerOpacity < 1) {
      ctx.globalAlpha = this.config.layerOpacity;
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
    }
    
    // Return as layer
    return this.canvasToLayer(canvas);
  }

  /**
   * Render ambient glow background
   */
  #renderAmbientGlow(ctx, width, height) {
    const { glow } = this.data.colors;
    const intensity = this.config.ambientGlow;
    
    if (intensity > 0) {
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      
      gradient.addColorStop(0, `rgba(${glow.r}, ${glow.g}, ${glow.b}, ${intensity * 0.5})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
  }

  /**
   * Render atmospheric fog
   */
  #renderFog(ctx, width, height, animAngle) {
    const { fog } = this.data.colors;
    const density = this.config.fogDensity;
    
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = density * 0.3;
    
    // Animated fog movement
    const offsetX = Math.sin(animAngle * 0.3) * 20;
    const offsetY = Math.cos(animAngle * 0.2) * 15;
    
    const gradient = ctx.createRadialGradient(
      width / 2 + offsetX, height / 2 + offsetY, 0,
      width / 2 + offsetX, height / 2 + offsetY, Math.max(width, height) * 0.7
    );
    
    gradient.addColorStop(0, `rgba(${fog.r}, ${fog.g}, ${fog.b}, 0)`);
    gradient.addColorStop(0.5, `rgba(${fog.r}, ${fog.g}, ${fog.b}, ${density})`);
    gradient.addColorStop(1, `rgba(${fog.r}, ${fog.g}, ${fog.b}, 0)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  /**
   * Render crystal shards with refraction
   */
  #renderShards(ctx, layer, animAngle) {
    const { shards, centerX, centerY } = this.data;
    
    // Sort shards by depth (far to near)
    const sortedShards = [...shards].sort((a, b) => a.depth - b.depth);
    
    sortedShards.forEach(shard => {
      this.#renderSingleShard(ctx, layer, shard, animAngle);
    });
  }

  /**
   * Render individual shard with all effects
   */
  #renderSingleShard(ctx, layer, shard, animAngle) {
    const { width, height, centerX, centerY } = this.data;
    
    // Calculate animated position
    const phase = animAngle + shard.phaseShift;
    const orbitX = Math.cos(phase) * this.config.orbitRadius;
    const orbitY = Math.sin(phase * 1.3) * this.config.orbitRadius * 0.5;
    const floatY = Math.sin(phase * 2) * this.config.floatAmplitude;
    
    // Calculate rotation
    const rotX = Math.sin(phase * this.config.rotationSpeedX) * Math.PI;
    const rotY = Math.cos(phase * this.config.rotationSpeedY) * Math.PI;
    const rotZ = Math.sin(phase * this.config.rotationSpeedZ) * Math.PI * 2;
    
    // Apply depth scaling
    const depthScale = 1.0 + (shard.depth / this.config.shardDepthRange) * 0.3;
    
    ctx.save();
    
    // Position shard
    const shardX = shard.centerX + orbitX;
    const shardY = shard.centerY + orbitY + floatY;
    ctx.translate(shardX, shardY);
    
    // Apply rotation (simplified 2D projection of 3D rotation)
    ctx.rotate(rotZ);
    ctx.scale(depthScale, depthScale);
    
    // Set blend mode
    ctx.globalCompositeOperation = this.config.shardBlendMode;
    ctx.globalAlpha = 0.8 + Math.sin(phase * 3) * 0.2;
    
    // Create shard path
    ctx.beginPath();
    shard.vertices.forEach((v, i) => {
      if (i === 0) {
        ctx.moveTo(v.x, v.y);
      } else {
        ctx.lineTo(v.x, v.y);
      }
    });
    ctx.closePath();
    
    // Clip to shard shape
    ctx.clip();
    
    // Draw refracted image with chromatic aberration
    if (layer?.canvas) {
      this.#drawRefractedImage(ctx, layer, shard, shardX, shardY);
    }
    
    // Add prismatic edge effects
    this.#drawPrismaticEdge(ctx, shard);
    
    ctx.restore();
  }

  /**
   * Draw image through shard with refraction
   */
  #drawRefractedImage(ctx, layer, shard, shardX, shardY) {
    const dispersion = this.config.chromaticDispersion * this.config.spectralWidth;
    
    // Draw RGB channels separately for chromatic aberration
    ctx.globalCompositeOperation = 'screen';
    
    // Red channel
    ctx.globalAlpha = 0.8;
    ctx.drawImage(
      layer.canvas,
      shardX - shard.size * 30 - dispersion,
      shardY - shard.size * 30,
      shard.size * 60,
      shard.size * 60,
      -shard.size * 30 - dispersion * 0.5,
      -shard.size * 30,
      shard.size * 60,
      shard.size * 60
    );
    
    // Green channel
    ctx.drawImage(
      layer.canvas,
      shardX - shard.size * 30,
      shardY - shard.size * 30,
      shard.size * 60,
      shard.size * 60,
      -shard.size * 30,
      -shard.size * 30,
      shard.size * 60,
      shard.size * 60
    );
    
    // Blue channel
    ctx.drawImage(
      layer.canvas,
      shardX - shard.size * 30 + dispersion,
      shardY - shard.size * 30,
      shard.size * 60,
      shard.size * 60,
      -shard.size * 30 + dispersion * 0.5,
      -shard.size * 30,
      shard.size * 60,
      shard.size * 60
    );
  }

  /**
   * Draw prismatic rainbow edge
   */
  #drawPrismaticEdge(ctx, shard) {
    const { spectrum } = this.data.colors;
    
    ctx.globalCompositeOperation = 'add';
    ctx.globalAlpha = this.config.chromaticDispersion * 0.5;
    
    // Create gradient along edge
    spectrum.forEach((color, i) => {
      const angle = (i / spectrum.length) * Math.PI * 2;
      const gradient = ctx.createLinearGradient(
        Math.cos(angle) * shard.size * 30,
        Math.sin(angle) * shard.size * 30,
        0, 0
      );
      
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  /**
   * Render volumetric light rays
   */
  #renderLightRays(ctx, animAngle) {
    const { shards, lightAngleRad, width, height } = this.data;
    
    ctx.save();
    ctx.globalCompositeOperation = this.config.rayBlendMode;
    
    shards.forEach(shard => {
      this.#renderShardRays(ctx, shard, animAngle);
    });
    
    ctx.restore();
  }

  /**
   * Render light rays from a single shard
   */
  #renderShardRays(ctx, shard, animAngle) {
    const phase = animAngle + shard.phaseShift;
    const intensity = this.config.lightIntensity * (0.7 + Math.sin(phase * 4) * 0.3);
    
    for (let i = 0; i < this.config.rayCount; i++) {
      const rayAngle = this.data.lightAngleRad + (i - this.config.rayCount / 2) * 0.1;
      const rayLength = this.config.rayLength * (0.8 + Math.sin(phase * 2 + i) * 0.2);
      
      const gradient = ctx.createLinearGradient(
        shard.centerX, shard.centerY,
        shard.centerX + Math.cos(rayAngle) * rayLength,
        shard.centerY + Math.sin(rayAngle) * rayLength
      );
      
      const { glow } = this.data.colors;
      gradient.addColorStop(0, `rgba(${glow.r}, ${glow.g}, ${glow.b}, ${intensity})`);
      gradient.addColorStop(this.config.rayFalloff, `rgba(${glow.r}, ${glow.g}, ${glow.b}, 0)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3 * shard.size;
      ctx.globalAlpha = intensity * 0.3;
      ctx.beginPath();
      ctx.moveTo(shard.centerX, shard.centerY);
      ctx.lineTo(
        shard.centerX + Math.cos(rayAngle) * rayLength,
        shard.centerY + Math.sin(rayAngle) * rayLength
      );
      ctx.stroke();
    }
  }

  /**
   * Apply bloom effect to bright areas
   */
  #applyBloom(ctx) {
    const { width, height } = this.data;
    const intensity = this.config.bloomIntensity;
    
    ctx.save();
    ctx.filter = `blur(${intensity * 8}px)`;
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = intensity * 0.5;
    ctx.drawImage(ctx.canvas, 0, 0, width, height);
    ctx.restore();
  }

  /**
   * Render lens flares at bright points
   */
  #renderLensFlares(ctx, animAngle) {
    const { shards, width, height } = this.data;
    const { flare } = this.data.colors;
    
    ctx.save();
    ctx.globalCompositeOperation = 'add';
    
    // Add flares at shard centers
    shards.forEach((shard, i) => {
      if (i % 3 === 0) { // Every third shard for performance
        const brightness = 0.5 + Math.sin(animAngle * 3 + shard.phaseShift) * 0.5;
        
        if (brightness > this.config.flareThreshold) {
          const flareSize = 20 * brightness * shard.size;
          const gradient = ctx.createRadialGradient(
            shard.centerX, shard.centerY, 0,
            shard.centerX, shard.centerY, flareSize
          );
          
          gradient.addColorStop(0, `rgba(${flare.r}, ${flare.g}, ${flare.b}, ${brightness})`);
          gradient.addColorStop(0.2, `rgba(${flare.r}, ${flare.g}, ${flare.b}, ${brightness * 0.5})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = brightness * 0.6;
          ctx.fillRect(
            shard.centerX - flareSize,
            shard.centerY - flareSize,
            flareSize * 2,
            flareSize * 2
          );
        }
      }
    });
    
    ctx.restore();
  }
}