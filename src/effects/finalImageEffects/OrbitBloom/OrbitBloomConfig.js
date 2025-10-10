import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { getAllFindValueAlgorithms } from 'my-nft-gen';

// Flat, JSON-serializable configuration for Orbit Bloom final effect
export class OrbitBloomConfig extends EffectConfig {
  constructor({
    // Chromatic orbit (per-channel rotation offsets)
    orbit = {
      enabled: true,
      radius: 4,                 // pixel radius for channel offsets
      rpm: 0.25,                 // rotations per loop (perfect loop if integer or rational that totals 1 cycle)
      phaseR: 0.0,               // phase offsets [0..1]
      phaseG: 0.33,
      phaseB: 0.66
    },

    // Polar ripple displacement
    ripple = {
      enabled: true,
      amplitude: 2.0,            // max pixel offset
      frequency: 8,              // cycles around the circle
      radialCycles: 1,           // cycles from center to edge
      mix: 0.85                  // blend between original and displaced
    },

    // Luma-threshold bloom with soft blur and pulsing
    bloom = {
      enabled: true,
      threshold: 0.7,            // luma threshold [0..1]
      intensity: 0.9,            // added brightness
      blurRadius: 2,             // small separable blur radius (integer)
      pulse: {
        enabled: true,
        amplitude: 0.15,         // additional intensity modulated over time
        cyclesPerLoop: 2         // integer => perfect loop
      }
    },

    // Vignette
    vignette = {
      enabled: true,
      strength: 0.35,            // darkening toward edges [0..1]
      roundness: 0.75            // 0 = rectangular, 1 = circular
    },

    // Optional subtle looping grain
    grain = {
      enabled: false,
      amount: 0.03,              // 0..1 scalar added noise
      cyclesPerLoop: 1           // integer => perfect loop
    },

    // General
    layerOpacity = 1.0,          // final opacity adjustment
    perfectLoop = true,

    // Algorithms for time-evolving findValue if needed later
    timeAlgorithm = getAllFindValueAlgorithms()
  } = {}) {
    super();

    this.orbit = orbit;
    this.ripple = ripple;
    this.bloom = bloom;
    this.vignette = vignette;
    this.grain = grain;

    this.layerOpacity = layerOpacity;
    this.perfectLoop = perfectLoop;
    this.timeAlgorithm = timeAlgorithm;
  }
}