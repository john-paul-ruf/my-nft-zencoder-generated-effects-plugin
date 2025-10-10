/**
 * FluxWeave Effect - Demo & Presets
 * 
 * Demonstrates the FluxWeave effect with 8 ready-to-use preset configurations.
 * Each preset showcases different aspects of the temporal fabric manipulation.
 */

import { FluxWeaveEffect, FluxWeaveConfig } from './index.js';

/**
 * Preset Configurations
 */
export const PRESETS = {
  /**
   * 1. Silk Curtain - Subtle horizontal waves
   * Perfect for: Gentle enhancement, elegant animations
   */
  silkCurtain: new FluxWeaveConfig({
    waveAmplitude: 15,
    waveDirection: 'horizontal',
    waveFrequency1: 0.015,
    waveFrequency2: 0.01,
    waveSpeed1: 0.8,
    waveSpeed2: 1.2,
    phaseShiftStrength: 5,
    braidCount: 2,
    braidTightness: 0.3,
    pulseIntensity: 0.2,
    tintStrength: 0.1,
    blendMode: 'overlay'
  }),

  /**
   * 2. Cosmic Loom - Radial braiding with moderate color separation
   * Perfect for: Psychedelic art, portal effects
   */
  cosmicLoom: new FluxWeaveConfig({
    waveDirection: 'radial',
    waveAmplitude: 40,
    waveFrequency1: 0.025,
    waveFrequency2: 0.02,
    waveSpeed1: 1.0,
    waveSpeed2: 1.5,
    braidCount: 4,
    braidTightness: 0.6,
    phaseShiftStrength: 25,
    pulseIntensity: 0.4,
    shimmerSpeed: 1.5,
    tintColor: '#9966ff',
    tintStrength: 0.15,
    blendMode: 'screen'
  }),

  /**
   * 3. Prismatic Storm - Maximum displacement and color chaos
   * Perfect for: Intense visual effects, glitch art
   */
  prismaticStorm: new FluxWeaveConfig({
    waveAmplitude: 80,
    waveFrequency1: 0.03,
    waveFrequency2: 0.025,
    waveSpeed1: 2.5,
    waveSpeed2: 3.0,
    flowTurbulence: 0.8,
    phaseShiftStrength: 60,
    braidCount: 6,
    braidTightness: 0.7,
    pulseIntensity: 0.6,
    shimmerSpeed: 2.5,
    hueRotation: 180,
    tintStrength: 0.3,
    blendMode: 'add'
  }),

  /**
   * 4. DNA Helix - Tight diagonal braiding with pulsing
   * Perfect for: Sci-fi aesthetics, organic patterns
   */
  dnaHelix: new FluxWeaveConfig({
    waveDirection: 'diagonal',
    waveAmplitude: 35,
    waveFrequency1: 0.02,
    waveFrequency2: 0.02,
    waveSpeed1: 1.0,
    waveSpeed2: -1.0, // Counter-rotating
    braidCount: 2,
    braidTightness: 0.9,
    phaseShiftStrength: 15,
    pulseIntensity: 0.6,
    pulseFrequency: 2.0,
    flowTurbulence: 0.2,
    tintColor: '#00ff88',
    tintStrength: 0.2,
    blendMode: 'overlay'
  }),

  /**
   * 5. Aurora Flow - Vertical waves with cyan/magenta shift
   * Perfect for: Northern lights effect, ethereal visuals
   */
  auroraFlow: new FluxWeaveConfig({
    waveDirection: 'vertical',
    waveAmplitude: 45,
    waveFrequency1: 0.018,
    waveFrequency2: 0.012,
    waveSpeed1: 0.7,
    waveSpeed2: 1.3,
    phaseShiftStrength: 40,
    braidCount: 3,
    braidTightness: 0.4,
    pulseIntensity: 0.3,
    shimmerSpeed: 1.2,
    tintColor: '#00ffff',
    tintStrength: 0.25,
    blendMode: 'screen'
  }),

  /**
   * 6. Quantum Fabric - High-frequency interference patterns
   * Perfect for: Technical aesthetics, energy fields
   */
  quantumFabric: new FluxWeaveConfig({
    waveFrequency1: 0.05,
    waveFrequency2: 0.07,
    waveAmplitude: 25,
    waveSpeed1: 3.0,
    waveSpeed2: 2.5,
    waveDirection: 'horizontal',
    braidCount: 8,
    braidTightness: 0.5,
    phaseShiftStrength: 30,
    flowTurbulence: 0.4,
    pulseIntensity: 0.5,
    shimmerSpeed: 3.0,
    tintColor: '#ff00ff',
    tintStrength: 0.2,
    blendMode: 'overlay'
  }),

  /**
   * 7. Meditation Weave - Hypnotic slow breathing with warm tint
   * Perfect for: Calm visuals, meditation apps, relaxation
   */
  meditationWeave: new FluxWeaveConfig({
    waveAmplitude: 20,
    waveFrequency1: 0.01,
    waveFrequency2: 0.008,
    waveSpeed1: 0.3,
    waveSpeed2: 0.5,
    waveDirection: 'radial',
    braidCount: 3,
    braidTightness: 0.3,
    phaseShiftStrength: 10,
    pulseIntensity: 0.5,
    pulseFrequency: 0.5,
    shimmerSpeed: 0.5,
    flowTurbulence: 0.1,
    tintColor: '#ff9966',
    tintStrength: 0.3,
    blendMode: 'overlay'
  }),

  /**
   * 8. Glitch Fabric - Digital aesthetic with hard edges
   * Perfect for: Cyberpunk, digital art, VJ loops
   */
  glitchFabric: new FluxWeaveConfig({
    waveAmplitude: 50,
    waveFrequency1: 0.04,
    waveFrequency2: 0.035,
    waveSpeed1: 2.0,
    waveSpeed2: 2.8,
    waveDirection: 'horizontal',
    flowTurbulence: 0.9,
    braidCount: 6,
    braidTightness: 0.8,
    phaseShiftStrength: 45,
    pulseIntensity: 0.4,
    shimmerSpeed: 3.0,
    hueRotation: 90,
    flowAngle: 15,
    tintColor: '#00ffaa',
    tintStrength: 0.2,
    blendMode: 'add'
  })
};

/**
 * Demo usage examples
 */
export async function demoFluxWeave() {
  console.log('🌊 FluxWeave Effect - Demo\n');

  // Example 1: Using a preset
  console.log('Example 1: Cosmic Loom Preset');
  const effect1 = new FluxWeaveEffect({ 
    config: PRESETS.cosmicLoom,
    settings: { width: 1920, height: 1080 }
  });
  console.log('✓ Effect created with Cosmic Loom preset\n');

  // Example 2: Custom configuration
  console.log('Example 2: Custom Configuration');
  const customConfig = new FluxWeaveConfig({
    waveDirection: 'radial',
    waveAmplitude: 60,
    phaseShiftStrength: 35,
    braidCount: 5,
    tintColor: '#ff6600',
    blendMode: 'screen'
  });
  const effect2 = new FluxWeaveEffect({ 
    config: customConfig,
    settings: { width: 1920, height: 1080 }
  });
  console.log('✓ Effect created with custom config\n');

  // Example 3: Serialization
  console.log('Example 3: Serialization');
  const serialized = PRESETS.dnaHelix.toJSON();
  console.log('Serialized config:', JSON.stringify(serialized, null, 2));
  const deserialized = FluxWeaveConfig.fromJSON(serialized);
  console.log('✓ Config serialized and deserialized\n');

  // Example 4: All presets
  console.log('Example 4: All Available Presets');
  Object.keys(PRESETS).forEach((key, index) => {
    console.log(`  ${index + 1}. ${key}`);
  });
  console.log('\n✓ 8 presets available\n');

  console.log('🌊 Demo complete! The fabric flows eternal.\n');
}

/**
 * Quick start example
 */
export function quickStart() {
  return `
╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║                    🌊 FluxWeave Quick Start 🌊                    ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝

// 1. Import
import { FluxWeaveEffect, FluxWeaveConfig } from './FluxWeave/index.js';

// 2. Configure (use preset or custom)
const config = new FluxWeaveConfig({
  waveDirection: 'radial',
  waveAmplitude: 40,
  phaseShiftStrength: 25,
  braidCount: 4,
  tintColor: '#9966ff',
  blendMode: 'screen'
});

// 3. Create effect
const effect = new FluxWeaveEffect({ 
  config,
  settings: { width: 1920, height: 1080 }
});

// 4. Apply to layer
await effect.invoke(layer, frameNumber, totalFrames);

// Done! Your image is now woven with flowing energy threads. 🌊

═══════════════════════════════════════════════════════════════════

Available Presets:
  1. silkCurtain      - Subtle horizontal waves
  2. cosmicLoom       - Radial braiding with color separation
  3. prismaticStorm   - Maximum intensity and chaos
  4. dnaHelix         - Diagonal braiding with pulsing
  5. auroraFlow       - Vertical waves with cyan/magenta
  6. quantumFabric    - High-frequency interference
  7. meditationWeave  - Slow hypnotic breathing
  8. glitchFabric     - Digital aesthetic with turbulence

═══════════════════════════════════════════════════════════════════
  `;
}

// Run demo if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  demoFluxWeave();
}