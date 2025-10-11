import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';

/**
 * LiquidChromatic Configuration
 * 
 * "Liquid Dreams in Digital Streams" - A mesmerizing post-processing effect that transforms
 * layers into flowing liquid with chromatic aberration trails, creating hypnotic fluid dynamics
 * with iridescent color shifts. Think oil on water meets digital glitch art.
 * 
 * All parameters are flat primitives for perfect serialization and determinism.
 */
export class LiquidChromaticConfig extends EffectConfig {
  constructor({
    // Flow Dynamics - Liquid motion behavior
    flowSpeed = 1.0,                    // Overall liquid motion speed (0-3)
    flowAngle = 45,                     // Primary flow direction in degrees (0-360)
    turbulence = 0.5,                   // Chaos/smoothness of flow (0-1)
    viscosity = 0.5,                    // Thickness of liquid, affects displacement (0-1)
    
    // Wave System - Multi-frequency displacement
    waveFrequency1 = 2.0,               // Primary wave frequency (0.5-5)
    waveFrequency2 = 3.0,               // Secondary wave frequency (0.5-5)
    waveFrequency3 = 1.5,               // Tertiary wave frequency (0.5-5)
    waveAmplitude = 20,                 // Displacement strength in pixels (5-50)
    wavePhaseOffset = 0,                // Starting phase for variation (0-1)
    
    // Chromatic Aberration - RGB channel separation
    chromaticSeparation = 10,           // RGB channel offset distance (0-30)
    chromaticAngle = 0,                 // Direction of color separation (0-360)
    chromaticFlow = 1.0,                // How much channels follow flow vs fixed angle (0-2)
    trailLength = 0.3,                  // Motion blur/trail intensity (0-1)
    
    // Iridescent Colors - Dynamic color shifting
    iridescenceIntensity = 0.5,         // Strength of color shift effect (0-1)
    primaryHue = 180,                   // Starting hue for gradient (0-360)
    hueShiftRange = 60,                 // How far hues shift (0-180)
    saturationBoost = 0.3,              // Color saturation multiplier (0-1)
    brightnessModulation = 0.2,         // Brightness wave amplitude (0-1)
    
    // Surface Effects - Liquid surface properties
    surfaceTension = 0.3,               // Edge bubble/boundary strength (0-1)
    refractionStrength = 0.4,           // Light bending simulation (0-1)
    specularHighlights = 0.5,           // Shiny spot intensity (0-1)
    depthGradient = 0.2,                // Depth-based darkening (0-1)
    
    // Blend & Composition - Final output control
    effectIntensity = 0.8,              // Overall effect strength, blend with original (0-1)
    edgePreservation = 0.3,             // How much to preserve sharp edges (0-1)
    glowRadius = 5,                     // Soft glow around bright areas (0-20)
    contrastBoost = 0.2,                // Final contrast adjustment (0-1)
    
    // Animation - Temporal behavior
    rotationSpeed = 0.5,                // Speed of flow angle rotation (0-2)
    pulseFrequency = 1.0,               // Breathing/pulsing speed (0-5)
    shimmerSpeed = 1.5,                 // Iridescence animation speed (0-3)
    
    // Determinism - Reproducibility
    seed = 42,                          // Seed for deterministic noise generation
    
    // General
    layerOpacity = 1.0,                 // Final opacity adjustment (0-1)
    perfectLoop = true                  // Ensure perfect loop (always true)
  } = {}) {
    super();
    
    // Flow Dynamics
    this.flowSpeed = Math.max(0, Math.min(3, flowSpeed));
    this.flowAngle = flowAngle % 360;
    this.turbulence = Math.max(0, Math.min(1, turbulence));
    this.viscosity = Math.max(0, Math.min(1, viscosity));
    
    // Wave System
    this.waveFrequency1 = Math.max(0.5, Math.min(5, waveFrequency1));
    this.waveFrequency2 = Math.max(0.5, Math.min(5, waveFrequency2));
    this.waveFrequency3 = Math.max(0.5, Math.min(5, waveFrequency3));
    this.waveAmplitude = Math.max(5, Math.min(50, waveAmplitude));
    this.wavePhaseOffset = Math.max(0, Math.min(1, wavePhaseOffset));
    
    // Chromatic Aberration
    this.chromaticSeparation = Math.max(0, Math.min(30, chromaticSeparation));
    this.chromaticAngle = chromaticAngle % 360;
    this.chromaticFlow = Math.max(0, Math.min(2, chromaticFlow));
    this.trailLength = Math.max(0, Math.min(1, trailLength));
    
    // Iridescent Colors
    this.iridescenceIntensity = Math.max(0, Math.min(1, iridescenceIntensity));
    this.primaryHue = primaryHue % 360;
    this.hueShiftRange = Math.max(0, Math.min(180, hueShiftRange));
    this.saturationBoost = Math.max(0, Math.min(1, saturationBoost));
    this.brightnessModulation = Math.max(0, Math.min(1, brightnessModulation));
    
    // Surface Effects
    this.surfaceTension = Math.max(0, Math.min(1, surfaceTension));
    this.refractionStrength = Math.max(0, Math.min(1, refractionStrength));
    this.specularHighlights = Math.max(0, Math.min(1, specularHighlights));
    this.depthGradient = Math.max(0, Math.min(1, depthGradient));
    
    // Blend & Composition
    this.effectIntensity = Math.max(0, Math.min(1, effectIntensity));
    this.edgePreservation = Math.max(0, Math.min(1, edgePreservation));
    this.glowRadius = Math.max(0, Math.min(20, glowRadius));
    this.contrastBoost = Math.max(0, Math.min(1, contrastBoost));
    
    // Animation
    this.rotationSpeed = Math.max(0, Math.min(2, rotationSpeed));
    this.pulseFrequency = Math.max(0, Math.min(5, pulseFrequency));
    this.shimmerSpeed = Math.max(0, Math.min(3, shimmerSpeed));
    
    // Determinism
    this.seed = seed;
    
    // General
    this.layerOpacity = Math.max(0, Math.min(1, layerOpacity));
    this.perfectLoop = true; // Always true for this effect
  }
  
  /**
   * Serialize configuration to JSON
   */
  toJSON() {
    return {
      flowSpeed: this.flowSpeed,
      flowAngle: this.flowAngle,
      turbulence: this.turbulence,
      viscosity: this.viscosity,
      waveFrequency1: this.waveFrequency1,
      waveFrequency2: this.waveFrequency2,
      waveFrequency3: this.waveFrequency3,
      waveAmplitude: this.waveAmplitude,
      wavePhaseOffset: this.wavePhaseOffset,
      chromaticSeparation: this.chromaticSeparation,
      chromaticAngle: this.chromaticAngle,
      chromaticFlow: this.chromaticFlow,
      trailLength: this.trailLength,
      iridescenceIntensity: this.iridescenceIntensity,
      primaryHue: this.primaryHue,
      hueShiftRange: this.hueShiftRange,
      saturationBoost: this.saturationBoost,
      brightnessModulation: this.brightnessModulation,
      surfaceTension: this.surfaceTension,
      refractionStrength: this.refractionStrength,
      specularHighlights: this.specularHighlights,
      depthGradient: this.depthGradient,
      effectIntensity: this.effectIntensity,
      edgePreservation: this.edgePreservation,
      glowRadius: this.glowRadius,
      contrastBoost: this.contrastBoost,
      rotationSpeed: this.rotationSpeed,
      pulseFrequency: this.pulseFrequency,
      shimmerSpeed: this.shimmerSpeed,
      seed: this.seed,
      layerOpacity: this.layerOpacity,
      perfectLoop: this.perfectLoop
    };
  }
  
  /**
   * Deserialize configuration from JSON
   */
  static fromJSON(json) {
    return new LiquidChromaticConfig(json);
  }
}