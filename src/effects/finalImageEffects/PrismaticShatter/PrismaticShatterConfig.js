import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

/**
 * PrismaticShatter Configuration
 * 
 * Fractures the image into crystalline shards that refract light into prismatic spectrums.
 * Each shard floats and rotates in 3D space, creating dynamic light patterns and chromatic
 * aberrations that pulse through the animation loop.
 * 
 * All parameters are flat and JSON-serializable for perfect determinism.
 */
export class PrismaticShatterConfig extends EffectConfig {
  constructor({
    // Shard System - Controls crystalline fragmentation
    shardCount = 12,                    // Number of crystal shards (5-50)
    shardSizeVariance = 0.5,           // Size variation (0.0-1.0)
    shardDepthRange = 100,              // Z-depth range in pixels (50-300)
    tessellationSeed = 42,              // Deterministic seed for pattern
    
    // Prismatic Refraction - Light physics simulation
    refractionIndex = 1.52,             // Glass=1.5, Diamond=2.4 (1.3-2.4)
    chromaticDispersion = 0.7,          // RGB separation strength (0.0-1.0)
    spectralWidth = 20,                 // Rainbow spread in pixels (5-50)
    criticalAngle = 42,                 // Total internal reflection angle (30-60)
    
    // Motion & Animation - 3D movement patterns
    rotationSpeedX = 0.3,               // X-axis rotation speed (0.0-2.0)
    rotationSpeedY = 0.5,               // Y-axis rotation speed (0.0-2.0)
    rotationSpeedZ = 0.2,               // Z-axis rotation speed (0.0-2.0)
    orbitRadius = 50,                   // Orbital motion radius (0-150)
    floatAmplitude = 10,                // Vertical float range (0-30)
    phaseOffset = 0.15,                 // Phase shift between shards (0.0-1.0)
    
    // Light Rays - Volumetric lighting
    lightAngle = 45,                    // Primary light source angle (0-360)
    lightIntensity = 0.8,               // Ray brightness (0.0-1.0)
    rayCount = 3,                       // Rays per shard edge (1-5)
    rayLength = 150,                    // Maximum ray length (50-300)
    rayFalloff = 0.7,                   // Ray opacity decay (0.3-1.0)
    
    // Colors - All configurable spectrum colors
    primarySpectrumColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),   // Red spectrum start
    secondarySpectrumColor = new ColorPicker(ColorPicker.SelectionType.colorBucket), // Blue spectrum end
    glowColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),              // Edge glow color
    fogColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),               // Atmospheric fog tint
    flareColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),             // Lens flare color
    
    // Atmospheric Effects - Post-processing
    bloomIntensity = 0.6,               // Edge bloom strength (0.0-1.0)
    fogDensity = 0.3,                   // Atmospheric fog (0.0-1.0)
    depthBlur = 0.4,                    // DOF blur amount (0.0-1.0)
    flareThreshold = 0.8,               // Brightness for flares (0.5-1.0)
    ambientGlow = 0.2,                  // Overall glow level (0.0-1.0)
    
    // Blend Modes - Composition settings
    shardBlendMode = 'screen',          // 'normal', 'screen', 'overlay', 'add'
    rayBlendMode = 'add',               // 'add', 'screen', 'linear-dodge'
    
    // Quality & Performance
    antialiasing = true,                // Smooth shard edges
    highQualityRefraction = true,       // Accurate light physics
    
    // General
    effectIntensity = 1.0,              // Overall effect strength (0.0-1.0)
    layerOpacity = 1.0                  // Final layer opacity (0.0-1.0)
  } = {}) {
    super();
    
    // Shard System
    this.shardCount = Math.max(5, Math.min(50, Math.floor(shardCount)));
    this.shardSizeVariance = Math.max(0, Math.min(1, shardSizeVariance));
    this.shardDepthRange = Math.max(50, Math.min(300, shardDepthRange));
    this.tessellationSeed = Math.floor(tessellationSeed);
    
    // Prismatic Refraction
    this.refractionIndex = Math.max(1.3, Math.min(2.4, refractionIndex));
    this.chromaticDispersion = Math.max(0, Math.min(1, chromaticDispersion));
    this.spectralWidth = Math.max(5, Math.min(50, spectralWidth));
    this.criticalAngle = Math.max(30, Math.min(60, criticalAngle));
    
    // Motion & Animation
    this.rotationSpeedX = Math.max(0, Math.min(2, rotationSpeedX));
    this.rotationSpeedY = Math.max(0, Math.min(2, rotationSpeedY));
    this.rotationSpeedZ = Math.max(0, Math.min(2, rotationSpeedZ));
    this.orbitRadius = Math.max(0, Math.min(150, orbitRadius));
    this.floatAmplitude = Math.max(0, Math.min(30, floatAmplitude));
    this.phaseOffset = Math.max(0, Math.min(1, phaseOffset));
    
    // Light Rays
    this.lightAngle = lightAngle % 360;
    this.lightIntensity = Math.max(0, Math.min(1, lightIntensity));
    this.rayCount = Math.max(1, Math.min(5, Math.floor(rayCount)));
    this.rayLength = Math.max(50, Math.min(300, rayLength));
    this.rayFalloff = Math.max(0.3, Math.min(1, rayFalloff));
    
    // Colors
    this.primarySpectrumColor = primarySpectrumColor;
    this.secondarySpectrumColor = secondarySpectrumColor;
    this.glowColor = glowColor;
    this.fogColor = fogColor;
    this.flareColor = flareColor;
    
    // Atmospheric Effects
    this.bloomIntensity = Math.max(0, Math.min(1, bloomIntensity));
    this.fogDensity = Math.max(0, Math.min(1, fogDensity));
    this.depthBlur = Math.max(0, Math.min(1, depthBlur));
    this.flareThreshold = Math.max(0.5, Math.min(1, flareThreshold));
    this.ambientGlow = Math.max(0, Math.min(1, ambientGlow));
    
    // Blend Modes
    const validShardBlends = ['normal', 'screen', 'overlay', 'add'];
    const validRayBlends = ['add', 'screen', 'linear-dodge'];
    this.shardBlendMode = validShardBlends.includes(shardBlendMode) ? shardBlendMode : 'screen';
    this.rayBlendMode = validRayBlends.includes(rayBlendMode) ? rayBlendMode : 'add';
    
    // Quality
    this.antialiasing = antialiasing;
    this.highQualityRefraction = highQualityRefraction;
    
    // General
    this.effectIntensity = Math.max(0, Math.min(1, effectIntensity));
    this.layerOpacity = Math.max(0, Math.min(1, layerOpacity));
  }
  
  /**
   * Serialize configuration to JSON
   */
  toJSON() {
    return {
      shardCount: this.shardCount,
      shardSizeVariance: this.shardSizeVariance,
      shardDepthRange: this.shardDepthRange,
      tessellationSeed: this.tessellationSeed,
      refractionIndex: this.refractionIndex,
      chromaticDispersion: this.chromaticDispersion,
      spectralWidth: this.spectralWidth,
      criticalAngle: this.criticalAngle,
      rotationSpeedX: this.rotationSpeedX,
      rotationSpeedY: this.rotationSpeedY,
      rotationSpeedZ: this.rotationSpeedZ,
      orbitRadius: this.orbitRadius,
      floatAmplitude: this.floatAmplitude,
      phaseOffset: this.phaseOffset,
      lightAngle: this.lightAngle,
      lightIntensity: this.lightIntensity,
      rayCount: this.rayCount,
      rayLength: this.rayLength,
      rayFalloff: this.rayFalloff,
      primarySpectrumColor: this.primarySpectrumColor,
      secondarySpectrumColor: this.secondarySpectrumColor,
      glowColor: this.glowColor,
      fogColor: this.fogColor,
      flareColor: this.flareColor,
      bloomIntensity: this.bloomIntensity,
      fogDensity: this.fogDensity,
      depthBlur: this.depthBlur,
      flareThreshold: this.flareThreshold,
      ambientGlow: this.ambientGlow,
      shardBlendMode: this.shardBlendMode,
      rayBlendMode: this.rayBlendMode,
      antialiasing: this.antialiasing,
      highQualityRefraction: this.highQualityRefraction,
      effectIntensity: this.effectIntensity,
      layerOpacity: this.layerOpacity
    };
  }
  
  /**
   * Deserialize configuration from JSON
   */
  static fromJSON(json) {
    return new PrismaticShatterConfig(json);
  }
}