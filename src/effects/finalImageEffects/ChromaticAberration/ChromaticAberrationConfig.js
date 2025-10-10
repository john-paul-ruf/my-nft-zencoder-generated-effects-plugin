import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';

/**
 * ChromaticAberration Configuration
 * 
 * "The Operator in the Noise" - A glitch-art inspired chromatic aberration effect
 * that simulates RGB channel separation with dynamic displacement. Creates cyberpunk
 * aesthetics where reality fragments and reassembles in perfect loops.
 * 
 * All parameters are flat and JSON-serializable for perfect determinism.
 */
export class ChromaticAberrationConfig extends EffectConfig {
  constructor({
    // Displacement Control - How far channels separate
    maxDisplacement = 20,              // Maximum pixel offset (0-100)
    displacementMode = 'wave',         // 'wave'|'radial'|'orbital'|'pulse'|'scanline'
    
    // Animation Parameters - Temporal behavior
    waveFrequency = 2,                 // Oscillation cycles per loop (0-10)
    wavePhaseShift = 120,              // Degrees between R/G/B waves (0-360)
    rotationSpeed = 360,               // Degrees per loop for orbital mode (-720 to 720)
    pulseIntensity = 1.0,              // Pulse strength multiplier (0-2)
    
    // Direction & Angle - Spatial orientation
    displacementAngle = 0,             // Base angle for displacement (0-360)
    angleVariation = 45,               // Random angle variation per channel (0-180)
    
    // Scanline Parameters - For scanline mode
    scanlineFrequency = 10,            // Lines per image height (1-50)
    scanlineIntensity = 0.5,           // Scanline effect strength (0-1)
    
    // Color Blending - Channel mixing
    redChannelOpacity = 1.0,           // R channel opacity (0-1)
    greenChannelOpacity = 1.0,         // G channel opacity (0-1)
    blueChannelOpacity = 1.0,          // B channel opacity (0-1)
    blendMode = 'screen',              // 'screen'|'additive'|'normal'
    
    // Edge Behavior - How to handle out-of-bounds sampling
    edgeMode = 'wrap',                 // 'wrap'|'clamp'|'transparent'
    
    // Noise & Chaos - Deterministic randomness
    noiseAmount = 0.0,                 // Random displacement noise (0-1)
    noiseSeed = 12345,                 // Seed for deterministic noise
    
    // Performance - Quality vs speed
    quality = 'high',                  // 'low'|'medium'|'high' (affects sampling)
    
    // General
    layerOpacity = 1.0,                // Final opacity adjustment (0-1)
    perfectLoop = true                 // Ensure perfect loop (always true)
  } = {}) {
    super();
    
    // Displacement Control
    this.maxDisplacement = Math.max(0, Math.min(100, maxDisplacement));
    this.displacementMode = ['wave', 'radial', 'orbital', 'pulse', 'scanline'].includes(displacementMode) 
      ? displacementMode 
      : 'wave';
    
    // Animation Parameters
    this.waveFrequency = Math.max(0, Math.min(10, waveFrequency));
    this.wavePhaseShift = wavePhaseShift % 360;
    this.rotationSpeed = Math.max(-720, Math.min(720, rotationSpeed));
    this.pulseIntensity = Math.max(0, Math.min(2, pulseIntensity));
    
    // Direction & Angle
    this.displacementAngle = displacementAngle % 360;
    this.angleVariation = Math.max(0, Math.min(180, angleVariation));
    
    // Scanline Parameters
    this.scanlineFrequency = Math.max(1, Math.min(50, scanlineFrequency));
    this.scanlineIntensity = Math.max(0, Math.min(1, scanlineIntensity));
    
    // Color Blending
    this.redChannelOpacity = Math.max(0, Math.min(1, redChannelOpacity));
    this.greenChannelOpacity = Math.max(0, Math.min(1, greenChannelOpacity));
    this.blueChannelOpacity = Math.max(0, Math.min(1, blueChannelOpacity));
    this.blendMode = ['screen', 'additive', 'normal'].includes(blendMode) 
      ? blendMode 
      : 'screen';
    
    // Edge Behavior
    this.edgeMode = ['wrap', 'clamp', 'transparent'].includes(edgeMode) 
      ? edgeMode 
      : 'wrap';
    
    // Noise & Chaos
    this.noiseAmount = Math.max(0, Math.min(1, noiseAmount));
    this.noiseSeed = noiseSeed;
    
    // Performance
    this.quality = ['low', 'medium', 'high'].includes(quality) 
      ? quality 
      : 'high';
    
    // General
    this.layerOpacity = Math.max(0, Math.min(1, layerOpacity));
    this.perfectLoop = true; // Always true for this effect
  }
  
  /**
   * Serialize configuration to JSON
   */
  toJSON() {
    return {
      maxDisplacement: this.maxDisplacement,
      displacementMode: this.displacementMode,
      waveFrequency: this.waveFrequency,
      wavePhaseShift: this.wavePhaseShift,
      rotationSpeed: this.rotationSpeed,
      pulseIntensity: this.pulseIntensity,
      displacementAngle: this.displacementAngle,
      angleVariation: this.angleVariation,
      scanlineFrequency: this.scanlineFrequency,
      scanlineIntensity: this.scanlineIntensity,
      redChannelOpacity: this.redChannelOpacity,
      greenChannelOpacity: this.greenChannelOpacity,
      blueChannelOpacity: this.blueChannelOpacity,
      blendMode: this.blendMode,
      edgeMode: this.edgeMode,
      noiseAmount: this.noiseAmount,
      noiseSeed: this.noiseSeed,
      quality: this.quality,
      layerOpacity: this.layerOpacity,
      perfectLoop: this.perfectLoop
    };
  }
  
  /**
   * Deserialize configuration from JSON
   */
  static fromJSON(json) {
    return new ChromaticAberrationConfig(json);
  }
}