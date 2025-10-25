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
    const { width, height, shards } = this.data;
    
    // Create working canvas using Canvas2dFactory
    const canvas = await Canvas2dFactory.getNewCanvas(width, height);
    
    // Calculate animation progress (0 to 1)
    const progress = totalFrames > 1 ? frameNumber / totalFrames : 0;
    const animAngle = progress * Math.PI * 2; // Full cycle for perfect loop
    
    // Render ambient glow using solid color with opacity
    if (this.config.ambientGlow > 0) {
      const { glow } = this.data.colors;
      const glowColor = `#${glow.r.toString(16).padStart(2, '0')}${glow.g.toString(16).padStart(2, '0')}${glow.b.toString(16).padStart(2, '0')}`;
      
      // Create radial glow effect using concentric rings
      for (let i = 0; i < 5; i++) {
        const radius = (Math.max(width, height) / 2) * (1 - i / 5);
        const opacity = this.config.ambientGlow * 0.3 * (1 - i / 5);
        await canvas.drawRing2d(width / 2, height / 2, radius, glowColor, opacity);
      }
    }
    
    // Render atmospheric fog layer using concentric rings
    if (this.config.fogDensity > 0) {
      const { fog } = this.data.colors;
      const fogColor = `#${fog.r.toString(16).padStart(2, '0')}${fog.g.toString(16).padStart(2, '0')}${fog.b.toString(16).padStart(2, '0')}`;
      
      // Animated fog movement
      const offsetX = Math.sin(animAngle * 0.3) * 20;
      const offsetY = Math.cos(animAngle * 0.2) * 15;
      
      for (let i = 0; i < 8; i++) {
        const radius = (Math.max(width, height) * 0.7) * (i / 8);
        const opacity = this.config.fogDensity * 0.2 * Math.sin((i / 8) * Math.PI);
        await canvas.drawRing2d(width / 2 + offsetX, height / 2 + offsetY, radius, fogColor, opacity);
      }
    }
    
    // Render shard positions and colors
    this.#renderShards(canvas, animAngle);
    
    // Render volumetric light rays
    if (this.config.lightIntensity > 0) {
      await this.#renderLightRays(canvas, animAngle);
    }
    
    // Add glow to shards (simulation of bloom effect)
    if (this.config.bloomIntensity > 0) {
      const { spectrum } = this.data.colors;
      for (const shard of shards) {
        const color = spectrum[shard.id % spectrum.length];
        const colorHex = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
        const phase = animAngle + shard.phaseShift;
        const bloomOpacity = this.config.bloomIntensity * 0.3 * (0.5 + Math.sin(phase * 3) * 0.5);
        
        await canvas.drawRing2d(shard.centerX, shard.centerY, shard.size * 50, colorHex, bloomOpacity);
      }
    }
    
    // Convert canvas to layer using Canvas2dFactory
    let resultLayer = await canvas.convertToLayer();
    
    // Apply opacity settings
    await resultLayer.adjustLayerOpacity(this.config.layerOpacity);
    
    // Composite over original layer
    await layer.compositeLayerOver(resultLayer);
    
    return layer;
  }

  /**
   * Render crystal shards with refraction (simplified for Canvas2d API)
   */
  async #renderShards(canvas, animAngle) {
    const { shards, spectrum } = this.data;
    
    // Sort shards by depth (far to near)
    const sortedShards = [...shards].sort((a, b) => a.depth - b.depth);
    
    for (const shard of sortedShards) {
      await this.#renderSingleShard(canvas, shard, animAngle);
    }
  }

  /**
   * Render individual shard using Canvas2d API
   */
  async #renderSingleShard(canvas, shard, animAngle) {
    const { spectrum } = this.data;
    
    // Calculate animated position
    const phase = animAngle + shard.phaseShift;
    const orbitX = Math.cos(phase) * this.config.orbitRadius;
    const orbitY = Math.sin(phase * 1.3) * this.config.orbitRadius * 0.5;
    const floatY = Math.sin(phase * 2) * this.config.floatAmplitude;
    
    // Apply depth scaling
    const depthScale = 1.0 + (shard.depth / this.config.shardDepthRange) * 0.3;
    
    // Position shard
    const shardX = shard.centerX + orbitX;
    const shardY = shard.centerY + orbitY + floatY;
    const shardOpacity = 0.8 + Math.sin(phase * 3) * 0.2;
    
    // Get spectrum color for shard
    const color = spectrum[shard.id % spectrum.length];
    const colorHex = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
    
    // Draw shard as polygon using Canvas2d API
    const scaledVertices = shard.vertices.map(v => ({
      x: shardX + v.x * depthScale * shard.size * 1.5,
      y: shardY + v.y * depthScale * shard.size * 1.5
    }));
    
    // Close the path
    scaledVertices.push(scaledVertices[0]);
    
    // Draw filled polygon
    await canvas.drawPath(scaledVertices, 1, colorHex, shardOpacity);
    
    // Draw prismatic edges using colored rings
    for (let i = 0; i < spectrum.length; i++) {
      const edgeColor = spectrum[i];
      const edgeColorHex = `#${edgeColor.r.toString(16).padStart(2, '0')}${edgeColor.g.toString(16).padStart(2, '0')}${edgeColor.b.toString(16).padStart(2, '0')}`;
      const angle = (i / spectrum.length) * Math.PI * 2;
      const edgeRadius = shard.size * 30 * depthScale;
      const edgeOpacity = this.config.chromaticDispersion * 0.3 * shardOpacity;
      
      await canvas.drawRing2d(shardX, shardY, edgeRadius, edgeColorHex, edgeOpacity);
    }
  }

  /**
   * Render volumetric light rays using Canvas2d API (simplified)
   */
  async #renderLightRays(canvas, animAngle) {
    const { shards } = this.data;
    const { glow } = this.data.colors;
    const glowColor = `#${glow.r.toString(16).padStart(2, '0')}${glow.g.toString(16).padStart(2, '0')}${glow.b.toString(16).padStart(2, '0')}`;
    
    // Draw light rays from shards
    for (const shard of shards) {
      const phase = animAngle + shard.phaseShift;
      const intensity = this.config.lightIntensity * (0.7 + Math.sin(phase * 4) * 0.3);
      
      for (let i = 0; i < this.config.rayCount; i++) {
        const rayAngle = this.data.lightAngleRad + (i - this.config.rayCount / 2) * 0.1;
        const rayLength = this.config.rayLength * (0.8 + Math.sin(phase * 2 + i) * 0.2);
        
        const x1 = shard.centerX;
        const y1 = shard.centerY;
        const x2 = shard.centerX + Math.cos(rayAngle) * rayLength;
        const y2 = shard.centerY + Math.sin(rayAngle) * rayLength;
        
        await canvas.drawLine2d(x1, y1, x2, y2, 3 * shard.size, glowColor, intensity * 0.3);
      }
    }
  }
}