import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { getAllFindValueAlgorithms } from 'my-nft-gen';

// Flat, JSON-serializable configuration for Orbit Bloom final effect
export class OrbitBloomConfig extends EffectConfig {
  constructor({
    // Chromatic orbit (per-channel rotation offsets)
    orbit_enabled = true,
    orbit_radius = 4,                 // pixel radius for channel offsets
    orbit_rpm = 0.25,                 // rotations per loop (perfect loop if integer or rational that totals 1 cycle)
    orbit_phaseR = 0.0,               // phase offsets [0..1]
    orbit_phaseG = 0.33,
    orbit_phaseB = 0.66,

    // Polar ripple displacement
    ripple_enabled = true,
    ripple_amplitude = 2.0,           // max pixel offset
    ripple_frequency = 8,             // cycles around the circle
    ripple_radialCycles = 1,          // cycles from center to edge
    ripple_mix = 0.85,                // blend between original and displaced

    // Luma-threshold bloom with soft blur and pulsing
    bloom_enabled = true,
    bloom_threshold = 0.7,            // luma threshold [0..1]
    bloom_intensity = 0.9,            // added brightness
    bloom_blurRadius = 2,             // small separable blur radius (integer)
    bloom_pulse_enabled = true,
    bloom_pulse_amplitude = 0.15,     // additional intensity modulated over time
    bloom_pulse_cyclesPerLoop = 2,    // integer => perfect loop

    // Vignette
    vignette_enabled = true,
    vignette_strength = 0.35,         // darkening toward edges [0..1]
    vignette_roundness = 0.75,        // 0 = rectangular, 1 = circular

    // Optional subtle looping grain
    grain_enabled = false,
    grain_amount = 0.03,              // 0..1 scalar added noise
    grain_cyclesPerLoop = 1,          // integer => perfect loop

    // General
    layerOpacity = 1.0,               // final opacity adjustment
    perfectLoop = true,

    // Algorithms for time-evolving findValue if needed later
    timeAlgorithm = getAllFindValueAlgorithms()
  } = {}) {
    super();

    // Assign all flat properties
    this.orbit_enabled = orbit_enabled;
    this.orbit_radius = orbit_radius;
    this.orbit_rpm = orbit_rpm;
    this.orbit_phaseR = orbit_phaseR;
    this.orbit_phaseG = orbit_phaseG;
    this.orbit_phaseB = orbit_phaseB;

    this.ripple_enabled = ripple_enabled;
    this.ripple_amplitude = ripple_amplitude;
    this.ripple_frequency = ripple_frequency;
    this.ripple_radialCycles = ripple_radialCycles;
    this.ripple_mix = ripple_mix;

    this.bloom_enabled = bloom_enabled;
    this.bloom_threshold = bloom_threshold;
    this.bloom_intensity = bloom_intensity;
    this.bloom_blurRadius = bloom_blurRadius;
    this.bloom_pulse_enabled = bloom_pulse_enabled;
    this.bloom_pulse_amplitude = bloom_pulse_amplitude;
    this.bloom_pulse_cyclesPerLoop = bloom_pulse_cyclesPerLoop;

    this.vignette_enabled = vignette_enabled;
    this.vignette_strength = vignette_strength;
    this.vignette_roundness = vignette_roundness;

    this.grain_enabled = grain_enabled;
    this.grain_amount = grain_amount;
    this.grain_cyclesPerLoop = grain_cyclesPerLoop;

    this.layerOpacity = layerOpacity;
    this.perfectLoop = perfectLoop;
    this.timeAlgorithm = timeAlgorithm;
  }

  // Produce the runtime nested structure expected by the effect
  toRuntime() {
    return {
      orbit: {
        enabled: this.orbit_enabled,
        radius: this.orbit_radius,
        rpm: this.orbit_rpm,
        phaseR: this.orbit_phaseR,
        phaseG: this.orbit_phaseG,
        phaseB: this.orbit_phaseB
      },
      ripple: {
        enabled: this.ripple_enabled,
        amplitude: this.ripple_amplitude,
        frequency: this.ripple_frequency,
        radialCycles: this.ripple_radialCycles,
        mix: this.ripple_mix
      },
      bloom: {
        enabled: this.bloom_enabled,
        threshold: this.bloom_threshold,
        intensity: this.bloom_intensity,
        blurRadius: this.bloom_blurRadius,
        pulse: {
          enabled: this.bloom_pulse_enabled,
          amplitude: this.bloom_pulse_amplitude,
          cyclesPerLoop: this.bloom_pulse_cyclesPerLoop
        }
      },
      vignette: {
        enabled: this.vignette_enabled,
        strength: this.vignette_strength,
        roundness: this.vignette_roundness
      },
      grain: {
        enabled: this.grain_enabled,
        amount: this.grain_amount,
        cyclesPerLoop: this.grain_cyclesPerLoop
      },
      layerOpacity: this.layerOpacity,
      perfectLoop: this.perfectLoop,
      timeAlgorithm: this.timeAlgorithm
    };
  }
}