/**
 * Preset Definitions for All Effects
 * 
 * This file contains preset configurations for all effects in the plugin.
 * Each effect has at least 3 meaningful presets that showcase different aspects
 * of the effect's capabilities.
 * 
 * Note: Presets use partial configurations - unspecified parameters will use
 * the default values from their respective Config classes.
 */

import { QuantumFieldConfig } from './primaryEffects/QuantumField/QuantumFieldConfig.js';
import { CircuitStreamConfig } from './primaryEffects/CircuitStream/CircuitStreamConfig.js';
import { MetatronCubeConfig } from './primaryEffects/MetatronCube/MetatronCubeConfig.js';
import { CymaticsResonanceConfig } from './primaryEffects/CymaticsResonance/CymaticsResonanceConfig.js';
import { AuroraKaleidoConfig } from './primaryEffects/AuroraKaleido/AuroraKaleidoConfig.js';
import { FlowFieldConfig } from './secondaryEffects/FlowField/FlowFieldConfig.js';
import { LiquidChromaticConfig } from './secondaryEffects/LiquidChromatic/LiquidChromaticConfig.js';
import { HolographicPrismConfig } from './secondaryEffects/HolographicPrism/HolographicPrismConfig.js';
import { ChronoLenticularFoilConfig } from './secondaryEffects/ChronoLenticularFoil/ChronoLenticularFoilConfig.js';
import { ChromaticAberrationConfig as ChromaticAberrationSecondaryConfig } from './secondaryEffects/ChromaticAberration/ChromaticAberrationConfig.js';
import { OrbitBloomConfig } from './finalImageEffects/OrbitBloom/OrbitBloomConfig.js';
import { VoidEchoConfig } from './finalImageEffects/VoidEcho/VoidEchoConfig.js';
import { FluxWeaveConfig } from './finalImageEffects/FluxWeave/FluxWeaveConfig.js';
import { ChromaticAberrationConfig } from './finalImageEffects/ChromaticAberration/ChromaticAberrationConfig.js';
import { PrismaticShatterConfig } from './finalImageEffects/PrismaticShatter/PrismaticShatterConfig.js';
import { HoloFoilConfig } from './finalImageEffects/HoloFoil/HoloFoilConfig.js';
import { SpectralOverwatchConfig } from './keyframeEffects/SpectralOverwatch/SpectralOverwatchEffect.js';
import { TacticalPulseGridConfig } from './keyframeEffects/TacticalPulseGrid/TacticalPulseGridEffect.js';
import { AuroraCascadeConfig } from './keyframeEffects/AuroraCascade/AuroraCascadeEffect.js';

// ============================================================================
// PRIMARY EFFECTS PRESETS
// ============================================================================

/**
 * QuantumField Presets
 */
export const QUANTUM_FIELD_PRESETS = [
  {
    name: 'subtle-quantum',
    effect: 'quantum-field',
    displayName: 'Subtle Quantum',
    description: 'Gentle quantum field with minimal particles and soft connections',
    percentChance: 100,
    currentEffectConfig: new QuantumFieldConfig({
      particleCount: 15,
      particleSize: { lower: 2, upper: 4 },
      connectionDistance: { lower: 80, upper: 120 },
      particleSpeed: { lower: 1, upper: 3 },
      connectionOpacity: { lower: 0.2, upper: 0.4 },
      glowIntensity: { lower: 3, upper: 8 },
      renderMode: ['quantum']
    })
  },
  {
    name: 'intense-field',
    effect: 'quantum-field',
    displayName: 'Intense Field',
    description: 'Dense quantum field with many particles and strong connections',
    percentChance: 100,
    currentEffectConfig: new QuantumFieldConfig({
      particleCount: 40,
      particleSize: { lower: 4, upper: 10 },
      connectionDistance: { lower: 120, upper: 250 },
      particleSpeed: { lower: 4, upper: 10 },
      connectionOpacity: { lower: 0.4, upper: 0.8 },
      glowIntensity: { lower: 10, upper: 20 },
      renderMode: ['field']
    })
  },
  {
    name: 'wave-particle',
    effect: 'quantum-field',
    displayName: 'Wave-Particle Duality',
    description: 'Balanced quantum effect showcasing wave-particle duality',
    percentChance: 100,
    currentEffectConfig: new QuantumFieldConfig({
      particleCount: 25,
      particleSize: { lower: 3, upper: 7 },
      connectionDistance: { lower: 100, upper: 180 },
      particleSpeed: { lower: 2, upper: 6 },
      quantumTunneling: true,
      tunnelingProbability: 0.15,
      renderMode: ['wave', 'particle']
    })
  }
];

/**
 * CircuitStream Presets
 */
export const CIRCUIT_STREAM_PRESETS = [
  {
    name: 'minimal-circuit',
    effect: 'circuit-stream',
    displayName: 'Minimal Circuit',
    description: 'Clean, minimal circuit board with sparse components',
    percentChance: 100,
    currentEffectConfig: new CircuitStreamConfig({
      nodeCount: 10,
      packetCount: 15,
      signalWaveCount: 5,
      traceDensity: 0.4,
      traceOpacityMin: 0.3,
      traceOpacityMax: 0.5,
      glowIntensityMin: 5,
      glowIntensityMax: 15
    })
  },
  {
    name: 'dense-pcb',
    effect: 'circuit-stream',
    displayName: 'Dense PCB',
    description: 'Complex circuit board with high component density',
    percentChance: 100,
    currentEffectConfig: new CircuitStreamConfig({
      nodeCount: 30,
      packetCount: 40,
      signalWaveCount: 12,
      traceDensity: 0.8,
      traceOpacityMin: 0.5,
      traceOpacityMax: 0.8,
      glowIntensityMin: 15,
      glowIntensityMax: 35,
      usePCBStyle: true
    })
  },
  {
    name: 'data-highway',
    effect: 'circuit-stream',
    displayName: 'Data Highway',
    description: 'Fast-flowing data streams with animated pulses',
    percentChance: 100,
    currentEffectConfig: new CircuitStreamConfig({
      nodeCount: 20,
      packetCount: 35,
      packetSpeedMin: 2.0,
      packetSpeedMax: 3.5,
      signalWaveCount: 10,
      signalWaveSpeedMin: 1.5,
      signalWaveSpeedMax: 2.5,
      energyFlowSpeedMin: 1.0,
      energyFlowSpeedMax: 2.0
    })
  }
];

/**
 * MetatronCube Presets
 */
export const METATRON_CUBE_PRESETS = [
  {
    name: 'sacred-minimal',
    effect: 'metatron-cube',
    displayName: 'Sacred Minimal',
    description: 'Clean sacred geometry with subtle mystical elements',
    percentChance: 100,
    currentEffectConfig: new MetatronCubeConfig({
      cubeScale: 0.6,
      particleCount: 80,
      outerRuneCount: 8,
      showPlatonicSolids: true,
      showFlowerOfLife: true,
      glowIntensityMin: 10,
      glowIntensityMax: 20,
      cubeRotationSpeed: 0.1
    })
  },
  {
    name: 'mystical-overload',
    effect: 'metatron-cube',
    displayName: 'Mystical Overload',
    description: 'Maximum mystical detail with overwhelming sacred geometry',
    percentChance: 100,
    currentEffectConfig: new MetatronCubeConfig({
      cubeScale: 0.8,
      particleCount: 200,
      outerRuneCount: 16,
      innerGlyphCount: 12,
      showPlatonicSolids: true,
      showFlowerOfLife: true,
      showCentralMandala: true,
      glowIntensityMin: 25,
      glowIntensityMax: 40,
      cubeRotationSpeed: 0.3,
      energyPulseCount: 36
    })
  },
  {
    name: 'platonic-solids',
    effect: 'metatron-cube',
    displayName: 'Platonic Solids',
    description: 'Emphasis on Platonic solids with balanced geometry',
    percentChance: 100,
    currentEffectConfig: new MetatronCubeConfig({
      cubeScale: 0.7,
      particleCount: 120,
      showPlatonicSolids: true,
      solidScale: 0.5,
      solidRotationSpeedMin: 0.3,
      solidRotationSpeedMax: 1.0,
      solidEdgeGlowMin: 15,
      solidEdgeGlowMax: 25,
      glowIntensityMin: 15,
      glowIntensityMax: 25
    })
  }
];

/**
 * CymaticsResonance Presets
 */
export const CYMATICS_RESONANCE_PRESETS = [
  {
    name: 'gentle-waves',
    effect: 'cymatics-resonance',
    displayName: 'Gentle Waves',
    description: 'Soft, flowing wave patterns with low frequency',
    percentChance: 100,
    currentEffectConfig: new CymaticsResonanceConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'harmonic-resonance',
    effect: 'cymatics-resonance',
    displayName: 'Harmonic Resonance',
    description: 'Complex harmonic interference patterns',
    percentChance: 100,
    currentEffectConfig: new CymaticsResonanceConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'standing-waves',
    effect: 'cymatics-resonance',
    displayName: 'Standing Waves',
    description: 'High-frequency standing wave patterns',
    percentChance: 100,
    currentEffectConfig: new CymaticsResonanceConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * AuroraKaleido Presets
 */
export const AURORA_KALEIDO_PRESETS = [
  {
    name: 'soft-aurora',
    effect: 'aurora-kaleido',
    displayName: 'Soft Aurora',
    description: 'Gentle aurora ribbons with subtle kaleidoscope effect',
    percentChance: 100,
    currentEffectConfig: new AuroraKaleidoConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'vivid-kaleidoscope',
    effect: 'aurora-kaleido',
    displayName: 'Vivid Kaleidoscope',
    description: 'Vibrant aurora with complex kaleidoscope patterns',
    percentChance: 100,
    currentEffectConfig: new AuroraKaleidoConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'northern-lights',
    effect: 'aurora-kaleido',
    displayName: 'Northern Lights',
    description: 'Natural aurora borealis effect with flowing ribbons',
    percentChance: 100,
    currentEffectConfig: new AuroraKaleidoConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

// ============================================================================
// SECONDARY EFFECTS PRESETS
// ============================================================================

/**
 * FlowField Presets
 */
export const FLOW_FIELD_PRESETS = [
  {
    name: 'subtle-flow',
    effect: 'flow-field',
    displayName: 'Subtle Flow',
    description: 'Gentle flow field distortion with minimal displacement',
    percentChance: 100,
    currentEffectConfig: new FlowFieldConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'organic-distortion',
    effect: 'flow-field',
    displayName: 'Organic Distortion',
    description: 'Natural, organic flow patterns with medium intensity',
    percentChance: 100,
    currentEffectConfig: new FlowFieldConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'chaotic-flow',
    effect: 'flow-field',
    displayName: 'Chaotic Flow',
    description: 'Intense flow field with high turbulence and displacement',
    percentChance: 100,
    currentEffectConfig: new FlowFieldConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * LiquidChromatic Presets
 */
export const LIQUID_CHROMATIC_PRESETS = [
  {
    name: 'gentle-liquid',
    effect: 'liquid-chromatic',
    displayName: 'Gentle Liquid',
    description: 'Soft liquid flow with subtle chromatic trails',
    percentChance: 100,
    currentEffectConfig: new LiquidChromaticConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'iridescent-flow',
    effect: 'liquid-chromatic',
    displayName: 'Iridescent Flow',
    description: 'Vibrant iridescent liquid with strong chromatic effects',
    percentChance: 100,
    currentEffectConfig: new LiquidChromaticConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'oil-slick',
    effect: 'liquid-chromatic',
    displayName: 'Oil Slick',
    description: 'Thick, viscous liquid with oil-slick rainbow effect',
    percentChance: 100,
    currentEffectConfig: new LiquidChromaticConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * HolographicPrism Presets
 */
export const HOLOGRAPHIC_PRISM_PRESETS = [
  {
    name: 'subtle-hologram',
    effect: 'holographic-prism',
    displayName: 'Subtle Hologram',
    description: 'Gentle holographic effect with minimal chromatic dispersion',
    percentChance: 100,
    currentEffectConfig: new HolographicPrismConfig({
      chromaticStrength: { lower: 3, upper: 8 },
      dispersionIntensity: { lower: 0.3, upper: 0.5 },
      shimmerIntensity: { lower: 0.3, upper: 0.5 },
      glowIntensity: { lower: 0.2, upper: 0.4 },
      effectStrength: { lower: 0.4, upper: 0.6 }
    })
  },
  {
    name: 'prismatic-display',
    effect: 'holographic-prism',
    displayName: 'Prismatic Display',
    description: 'Strong prismatic refraction with rainbow dispersion',
    percentChance: 100,
    currentEffectConfig: new HolographicPrismConfig({
      chromaticStrength: { lower: 12, upper: 20 },
      dispersionIntensity: { lower: 0.7, upper: 0.9 },
      shimmerIntensity: { lower: 0.7, upper: 0.9 },
      glowIntensity: { lower: 0.6, upper: 0.8 },
      effectStrength: { lower: 0.7, upper: 0.9 }
    })
  },
  {
    name: 'holographic-card',
    effect: 'holographic-prism',
    displayName: 'Holographic Card',
    description: 'Trading card style holographic effect with shimmer',
    percentChance: 100,
    currentEffectConfig: new HolographicPrismConfig({
      chromaticStrength: { lower: 8, upper: 15 },
      dispersionIntensity: { lower: 0.5, upper: 0.7 },
      shimmerIntensity: { lower: 0.6, upper: 0.8 },
      glowIntensity: { lower: 0.4, upper: 0.6 },
      effectStrength: { lower: 0.6, upper: 0.8 }
    })
  }
];

/**
 * ChronoLenticularFoil Presets
 */
export const CHRONO_LENTICULAR_FOIL_PRESETS = [
  {
    name: 'subtle-foil',
    effect: 'chrono-lenticular-foil',
    displayName: 'Subtle Foil',
    description: 'Gentle lenticular foil effect with soft shimmer',
    percentChance: 100,
    currentEffectConfig: new ChronoLenticularFoilConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'premium-foil',
    effect: 'chrono-lenticular-foil',
    displayName: 'Premium Foil',
    description: 'High-quality foil effect with strong iridescence',
    percentChance: 100,
    currentEffectConfig: new ChronoLenticularFoilConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'micro-groove',
    effect: 'chrono-lenticular-foil',
    displayName: 'Micro Groove',
    description: 'Fine micro-groove pattern with balanced shimmer',
    percentChance: 100,
    currentEffectConfig: new ChronoLenticularFoilConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * ChromaticAberration (Secondary) Presets
 */
export const CHROMATIC_ABERRATION_SECONDARY_PRESETS = [
  {
    name: 'subtle-aberration',
    effect: 'chromatic-aberration-secondary',
    displayName: 'Subtle Aberration',
    description: 'Gentle RGB channel separation for dreamy effect',
    percentChance: 100,
    currentEffectConfig: new ChromaticAberrationSecondaryConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'glitch-aberration',
    effect: 'chromatic-aberration-secondary',
    displayName: 'Glitch Aberration',
    description: 'Strong glitchy chromatic aberration effect',
    percentChance: 100,
    currentEffectConfig: new ChromaticAberrationSecondaryConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'lens-distortion',
    effect: 'chromatic-aberration-secondary',
    displayName: 'Lens Distortion',
    description: 'Optical lens-style chromatic aberration',
    percentChance: 100,
    currentEffectConfig: new ChromaticAberrationSecondaryConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

// ============================================================================
// FINAL IMAGE EFFECTS PRESETS
// ============================================================================

/**
 * OrbitBloom Presets
 */
export const ORBIT_BLOOM_PRESETS = [
  {
    name: 'soft-bloom',
    effect: 'orbit-bloom',
    displayName: 'Soft Bloom',
    description: 'Gentle bloom with subtle chromatic orbit',
    percentChance: 100,
    currentEffectConfig: new OrbitBloomConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'intense-bloom',
    effect: 'orbit-bloom',
    displayName: 'Intense Bloom',
    description: 'Strong bloom effect with vibrant chromatic orbit',
    percentChance: 100,
    currentEffectConfig: new OrbitBloomConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'ethereal-glow',
    effect: 'orbit-bloom',
    displayName: 'Ethereal Glow',
    description: 'Balanced bloom with ethereal chromatic effects',
    percentChance: 100,
    currentEffectConfig: new OrbitBloomConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * VoidEcho Presets
 */
export const VOID_ECHO_PRESETS = [
  {
    name: 'minimal-echo',
    effect: 'void-echo',
    displayName: 'Minimal Echo',
    description: 'Subtle recursive echoes with minimal distortion',
    percentChance: 100,
    currentEffectConfig: new VoidEchoConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'psychedelic-portal',
    effect: 'void-echo',
    displayName: 'Psychedelic Portal',
    description: 'Deep recursive reality distortion with intense chromatic echoes',
    percentChance: 100,
    currentEffectConfig: new VoidEchoConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'dimensional-rift',
    effect: 'void-echo',
    displayName: 'Dimensional Rift',
    description: 'Balanced recursive effect with dimensional layers',
    percentChance: 100,
    currentEffectConfig: new VoidEchoConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * FluxWeave Presets (using existing presets from demo.js)
 */
export const FLUX_WEAVE_PRESETS = [
  {
    name: 'silk-curtain',
    effect: 'flux-weave',
    displayName: 'Silk Curtain',
    description: 'Subtle horizontal waves - perfect for gentle enhancement',
    percentChance: 100,
    currentEffectConfig: new FluxWeaveConfig({
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
    })
  },
  {
    name: 'cosmic-loom',
    effect: 'flux-weave',
    displayName: 'Cosmic Loom',
    description: 'Radial braiding with moderate color separation',
    percentChance: 100,
    currentEffectConfig: new FluxWeaveConfig({
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
    })
  },
  {
    name: 'prismatic-storm',
    effect: 'flux-weave',
    displayName: 'Prismatic Storm',
    description: 'Maximum displacement and color chaos',
    percentChance: 100,
    currentEffectConfig: new FluxWeaveConfig({
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
    })
  }
];

/**
 * ChromaticAberration (Final) Presets
 */
export const CHROMATIC_ABERRATION_FINAL_PRESETS = [
  {
    name: 'subtle-separation',
    effect: 'chromatic-aberration-final',
    displayName: 'Subtle Separation',
    description: 'Gentle RGB channel separation for final polish',
    percentChance: 100,
    currentEffectConfig: new ChromaticAberrationConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'cyberpunk-glitch',
    effect: 'chromatic-aberration-final',
    displayName: 'Cyberpunk Glitch',
    description: 'Strong glitch effect with digital noise',
    percentChance: 100,
    currentEffectConfig: new ChromaticAberrationConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'operator-noise',
    effect: 'chromatic-aberration-final',
    displayName: 'Operator in the Noise',
    description: 'Balanced aberration with mysterious digital artifacts',
    percentChance: 100,
    currentEffectConfig: new ChromaticAberrationConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * PrismaticShatter Presets
 */
export const PRISMATIC_SHATTER_PRESETS = [
  {
    name: 'gentle-fracture',
    effect: 'prismatic-shatter',
    displayName: 'Gentle Fracture',
    description: 'Subtle crystal fractures with soft prismatic light',
    percentChance: 100,
    currentEffectConfig: new PrismaticShatterConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'crystal-explosion',
    effect: 'prismatic-shatter',
    displayName: 'Crystal Explosion',
    description: 'Dramatic crystal shatter with intense prismatic refraction',
    percentChance: 100,
    currentEffectConfig: new PrismaticShatterConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'kaleidoscope-shards',
    effect: 'prismatic-shatter',
    displayName: 'Kaleidoscope Shards',
    description: 'Balanced shatter with kaleidoscopic prismatic effects',
    percentChance: 100,
    currentEffectConfig: new PrismaticShatterConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * HoloFoil Presets
 */
export const HOLO_FOIL_PRESETS = [
  {
    name: 'subtle-holo',
    effect: 'holo-foil',
    displayName: 'Subtle Holo',
    description: 'Gentle holographic foil with soft shimmer',
    percentChance: 100,
    currentEffectConfig: new HoloFoilConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'premium-holo',
    effect: 'holo-foil',
    displayName: 'Premium Holo',
    description: 'High-quality holographic foil with strong iridescence',
    percentChance: 100,
    currentEffectConfig: new HoloFoilConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'rainbow-foil',
    effect: 'holo-foil',
    displayName: 'Rainbow Foil',
    description: 'Vibrant rainbow holographic effect',
    percentChance: 100,
    currentEffectConfig: new HoloFoilConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

// ============================================================================
// KEYFRAME EFFECTS PRESETS
// ============================================================================

/**
 * SpectralOverwatch Presets
 */
export const SPECTRAL_OVERWATCH_PRESETS = [
  {
    name: 'gentle-sweep',
    effect: 'spectral-overwatch',
    displayName: 'Gentle Sweep',
    description: 'Soft spectral sweep with subtle caustics',
    percentChance: 100,
    currentEffectConfig: new SpectralOverwatchConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'intense-caustics',
    effect: 'spectral-overwatch',
    displayName: 'Intense Caustics',
    description: 'Strong spectral sweep with dramatic prismatic caustics',
    percentChance: 100,
    currentEffectConfig: new SpectralOverwatchConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'rainbow-scan',
    effect: 'spectral-overwatch',
    displayName: 'Rainbow Scan',
    description: 'Balanced spectral sweep with rainbow caustics',
    percentChance: 100,
    currentEffectConfig: new SpectralOverwatchConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * TacticalPulseGrid Presets
 */
export const TACTICAL_PULSE_GRID_PRESETS = [
  {
    name: 'minimal-hud',
    effect: 'tactical-pulse-grid',
    displayName: 'Minimal HUD',
    description: 'Clean tactical HUD with minimal interference',
    percentChance: 100,
    currentEffectConfig: new TacticalPulseGridConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'combat-mode',
    effect: 'tactical-pulse-grid',
    displayName: 'Combat Mode',
    description: 'Intense tactical overlay with heavy interference',
    percentChance: 100,
    currentEffectConfig: new TacticalPulseGridConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'tactical-scan',
    effect: 'tactical-pulse-grid',
    displayName: 'Tactical Scan',
    description: 'Balanced tactical HUD with scanning pulses',
    percentChance: 100,
    currentEffectConfig: new TacticalPulseGridConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

/**
 * AuroraCascade Presets
 */
export const AURORA_CASCADE_PRESETS = [
  {
    name: 'gentle-aurora',
    effect: 'aurora-cascade',
    displayName: 'Gentle Aurora',
    description: 'Soft aurora ribbons with gentle particle flow',
    percentChance: 100,
    currentEffectConfig: new AuroraCascadeConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'northern-lights',
    effect: 'aurora-cascade',
    displayName: 'Northern Lights',
    description: 'Vibrant aurora borealis with flowing ribbons',
    percentChance: 100,
    currentEffectConfig: new AuroraCascadeConfig({
      // Using default parameters - effect will use its own defaults
    })
  },
  {
    name: 'celestial-cascade',
    effect: 'aurora-cascade',
    displayName: 'Celestial Cascade',
    description: 'Balanced aurora with cascading light particles',
    percentChance: 100,
    currentEffectConfig: new AuroraCascadeConfig({
      // Using default parameters - effect will use its own defaults
    })
  }
];

// ============================================================================
// EXPORT ALL PRESETS
// ============================================================================

export const ALL_PRESETS = {
  'quantum-field': QUANTUM_FIELD_PRESETS,
  'circuit-stream': CIRCUIT_STREAM_PRESETS,
  'metatron-cube': METATRON_CUBE_PRESETS,
  'cymatics-resonance': CYMATICS_RESONANCE_PRESETS,
  'aurora-kaleido': AURORA_KALEIDO_PRESETS,
  'flow-field': FLOW_FIELD_PRESETS,
  'liquid-chromatic': LIQUID_CHROMATIC_PRESETS,
  'holographic-prism': HOLOGRAPHIC_PRISM_PRESETS,
  'chrono-lenticular-foil': CHRONO_LENTICULAR_FOIL_PRESETS,
  'chromatic-aberration-secondary': CHROMATIC_ABERRATION_SECONDARY_PRESETS,
  'orbit-bloom': ORBIT_BLOOM_PRESETS,
  'void-echo': VOID_ECHO_PRESETS,
  'flux-weave': FLUX_WEAVE_PRESETS,
  'chromatic-aberration-final': CHROMATIC_ABERRATION_FINAL_PRESETS,
  'prismatic-shatter': PRISMATIC_SHATTER_PRESETS,
  'holo-foil': HOLO_FOIL_PRESETS,
  'spectral-overwatch': SPECTRAL_OVERWATCH_PRESETS,
  'tactical-pulse-grid': TACTICAL_PULSE_GRID_PRESETS,
  'aurora-cascade': AURORA_CASCADE_PRESETS
};