import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';

/**
 * ChromaticAberration Configuration
 * 
 * "Optical Imperfection as Digital Art" - A post-processing effect that simulates lens chromatic
 * aberration by separating and displacing RGB color channels. Creates dreamy, glitchy, retro-futuristic
 * aesthetics reminiscent of vintage cameras, VHS artifacts, or psychedelic visuals.
 * 
 * All parameters are flat primitives for perfect serialization and determinism.
 */
export class ChromaticAberrationConfig extends EffectConfig {
  constructor({
    // Displacement Controls - How far channels separate
    maxDisplacement = 20,                // Maximum pixel offset for channels (0-100)
    displacementCurve = 'radial',        // 'radial', 'horizontal', 'vertical', 'diagonal'
    
    // Animation Behavior - How the effect moves over time
    animationMode = 'pulse',             // 'pulse', 'rotate', 'wave', 'static'
    pulseSpeed = 1.0,                    // Animation speed multiplier (0-3)
    
    // Channel Configuration - Individual RGB offsets
    redOffset = 1.0,                     // Red channel displacement multiplier (-2 to 2)
    greenOffset = 0.0,                   // Green channel displacement multiplier (-2 to 2)
    blueOffset = -1.0,                   // Blue channel displacement multiplier (-2 to 2)
    
    // Focal Point - Center of displacement (0-1 normalized)
    focalPointX = 0.5,                   // Horizontal focal point (0-1)
    focalPointY = 0.5,                   // Vertical focal point (0-1)
    
    // Edge Behavior - How effect diminishes
    edgeFalloff = 0.3,                   // Effect strength toward center (0-1)
    preserveAlpha = true,                // Maintain original transparency
    
    // Color Tinting - Optional color enhancement
    redTint = '#FF0000',                 // Red channel tint color
    greenTint = '#00FF00',               // Green channel tint color
    blueTint = '#0000FF',                // Blue channel tint color
    tintStrength = 0.0,                  // Tint intensity (0-1, 0=no tint)
    
    // Wave Mode Parameters - For wave animation
    waveCount = 2,                       // Number of waves (1-5)
    waveFrequency = 1.0,                 // Wave oscillation frequency (0.5-3)
    
    // Rotate Mode Parameters - For rotation animation
    rotationDirection = 1,               // 1 for clockwise, -1 for counter-clockwise
    
    // Quality & Performance
    interpolation = 'bilinear',          // 'nearest', 'bilinear' (bilinear is smoother)
    
    // General
    layerOpacity = 1.0,                  // Final opacity adjustment (0-1)
    perfectLoop = true,                  // Ensure perfect loop (always true)
    seed = 42                            // Seed for deterministic behavior
  } = {}) {
    super();
    
    // Displacement Controls
    this.maxDisplacement = Math.max(0, Math.min(100, maxDisplacement));
    this.displacementCurve = ['radial', 'horizontal', 'vertical', 'diagonal'].includes(displacementCurve) 
      ? displacementCurve 
      : 'radial';
    
    // Animation Behavior
    this.animationMode = ['pulse', 'rotate', 'wave', 'static'].includes(animationMode)
      ? animationMode
      : 'pulse';
    this.pulseSpeed = Math.max(0, Math.min(3, pulseSpeed));
    
    // Channel Configuration
    this.redOffset = Math.max(-2, Math.min(2, redOffset));
    this.greenOffset = Math.max(-2, Math.min(2, greenOffset));
    this.blueOffset = Math.max(-2, Math.min(2, blueOffset));
    
    // Focal Point
    this.focalPointX = Math.max(0, Math.min(1, focalPointX));
    this.focalPointY = Math.max(0, Math.min(1, focalPointY));
    
    // Edge Behavior
    this.edgeFalloff = Math.max(0, Math.min(1, edgeFalloff));
    this.preserveAlpha = preserveAlpha;
    
    // Color Tinting
    this.redTint = redTint;
    this.greenTint = greenTint;
    this.blueTint = blueTint;
    this.tintStrength = Math.max(0, Math.min(1, tintStrength));
    
    // Wave Mode Parameters
    this.waveCount = Math.max(1, Math.min(5, Math.round(waveCount)));
    this.waveFrequency = Math.max(0.5, Math.min(3, waveFrequency));
    
    // Rotate Mode Parameters
    this.rotationDirection = rotationDirection >= 0 ? 1 : -1;
    
    // Quality & Performance
    this.interpolation = ['nearest', 'bilinear'].includes(interpolation)
      ? interpolation
      : 'bilinear';
    
    // General
    this.layerOpacity = Math.max(0, Math.min(1, layerOpacity));
    this.perfectLoop = true; // Always true for this effect
    this.seed = seed;
  }
  
  /**
   * Serialize configuration to JSON
   */
  toJSON() {
    return {
      maxDisplacement: this.maxDisplacement,
      displacementCurve: this.displacementCurve,
      animationMode: this.animationMode,
      pulseSpeed: this.pulseSpeed,
      redOffset: this.redOffset,
      greenOffset: this.greenOffset,
      blueOffset: this.blueOffset,
      focalPointX: this.focalPointX,
      focalPointY: this.focalPointY,
      edgeFalloff: this.edgeFalloff,
      preserveAlpha: this.preserveAlpha,
      redTint: this.redTint,
      greenTint: this.greenTint,
      blueTint: this.blueTint,
      tintStrength: this.tintStrength,
      waveCount: this.waveCount,
      waveFrequency: this.waveFrequency,
      rotationDirection: this.rotationDirection,
      interpolation: this.interpolation,
      layerOpacity: this.layerOpacity,
      perfectLoop: this.perfectLoop,
      seed: this.seed
    };
  }
  
  /**
   * Deserialize configuration from JSON
   */
  static fromJSON(json) {
    return new ChromaticAberrationConfig(json);
  }
}