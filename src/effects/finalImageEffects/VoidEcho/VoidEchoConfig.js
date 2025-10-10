import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';

/**
 * VoidEcho Configuration
 * 
 * Recursive reality distortion effect that creates echoes through dimensional layers.
 * Each echo is displaced, chromatically separated, and blended to create hypnotic depth.
 * 
 * All parameters are flat and JSON-serializable for perfect determinism.
 */
export class VoidEchoConfig extends EffectConfig {
  constructor({
    // Echo System - Controls the recursive layer generation
    echoCount = 5,                    // Number of recursive echoes (2-12)
    echoSpacing = 0.15,               // Time spacing between echoes (0.05-0.5)
    echoDecay = 0.7,                  // Opacity decay per echo (0.3-0.95)
    
    // Displacement - Radial movement of echoes
    displacementRadius = 80,          // Max radial displacement in pixels (20-200)
    displacementSpeed = 1.0,          // Animation speed multiplier (0.1-3.0)
    displacementAngle = 0,            // Base rotation angle in degrees (0-360)
    
    // Chromatic Aberration - RGB channel separation
    chromaticStrength = 8,            // RGB separation strength in pixels (0-30)
    chromaticRotation = 120,          // Degrees between R/G/B channels (0-180)
    
    // Blend & Composition - How echoes combine
    blendMode = 'screen',             // 'screen', 'add', 'overlay', 'normal'
    feedbackStrength = 0.6,           // How much echo affects next (0.0-1.0)
    
    // Colors - Tinting and vignette
    tintColor = '#00ffff',            // Primary tint color (hex)
    tintStrength = 0.3,               // Tint intensity (0.0-1.0)
    vignetteColor = '#000000',        // Vignette edge color (hex)
    vignetteStrength = 0.4,           // Vignette intensity (0.0-1.0)
    
    // Animation - Temporal effects
    pulseIntensity = 0.5,             // Breathing pulse strength (0.0-1.0)
    rotationSpeed = 0.3,              // Echo rotation speed (0.0-2.0)
    
    // Quality
    smoothing = true,                 // Enable antialiasing/interpolation
    
    // General
    layerOpacity = 1.0,               // Final opacity adjustment
    perfectLoop = true                // Ensure perfect loop (always true)
  } = {}) {
    super();
    
    // Echo System
    this.echoCount = Math.max(2, Math.min(12, echoCount));
    this.echoSpacing = Math.max(0.05, Math.min(0.5, echoSpacing));
    this.echoDecay = Math.max(0.3, Math.min(0.95, echoDecay));
    
    // Displacement
    this.displacementRadius = Math.max(0, Math.min(200, displacementRadius));
    this.displacementSpeed = Math.max(0.1, Math.min(3.0, displacementSpeed));
    this.displacementAngle = displacementAngle % 360;
    
    // Chromatic Aberration
    this.chromaticStrength = Math.max(0, Math.min(30, chromaticStrength));
    this.chromaticRotation = Math.max(0, Math.min(180, chromaticRotation));
    
    // Blend & Composition
    this.blendMode = ['screen', 'add', 'overlay', 'normal'].includes(blendMode) ? blendMode : 'screen';
    this.feedbackStrength = Math.max(0, Math.min(1, feedbackStrength));
    
    // Colors
    this.tintColor = tintColor;
    this.tintStrength = Math.max(0, Math.min(1, tintStrength));
    this.vignetteColor = vignetteColor;
    this.vignetteStrength = Math.max(0, Math.min(1, vignetteStrength));
    
    // Animation
    this.pulseIntensity = Math.max(0, Math.min(1, pulseIntensity));
    this.rotationSpeed = Math.max(0, Math.min(2, rotationSpeed));
    
    // Quality
    this.smoothing = smoothing;
    
    // General
    this.layerOpacity = Math.max(0, Math.min(1, layerOpacity));
    this.perfectLoop = true; // Always true for this effect
  }
  
  /**
   * Serialize configuration to JSON
   */
  toJSON() {
    return {
      echoCount: this.echoCount,
      echoSpacing: this.echoSpacing,
      echoDecay: this.echoDecay,
      displacementRadius: this.displacementRadius,
      displacementSpeed: this.displacementSpeed,
      displacementAngle: this.displacementAngle,
      chromaticStrength: this.chromaticStrength,
      chromaticRotation: this.chromaticRotation,
      blendMode: this.blendMode,
      feedbackStrength: this.feedbackStrength,
      tintColor: this.tintColor,
      tintStrength: this.tintStrength,
      vignetteColor: this.vignetteColor,
      vignetteStrength: this.vignetteStrength,
      pulseIntensity: this.pulseIntensity,
      rotationSpeed: this.rotationSpeed,
      smoothing: this.smoothing,
      layerOpacity: this.layerOpacity,
      perfectLoop: this.perfectLoop
    };
  }
  
  /**
   * Deserialize configuration from JSON
   */
  static fromJSON(json) {
    return new VoidEchoConfig(json);
  }
}