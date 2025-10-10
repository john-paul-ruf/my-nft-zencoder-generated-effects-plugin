/**
 * VoidEcho Effect Demo
 * 
 * Demonstrates various configurations of the VoidEcho effect
 */

import { VoidEchoEffect } from './VoidEchoEffect.js';
import { VoidEchoConfig } from './VoidEchoConfig.js';

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================

/**
 * Minimal - Subtle echo effect
 */
export const minimalPreset = new VoidEchoConfig({
  echoCount: 3,
  echoSpacing: 0.2,
  echoDecay: 0.6,
  displacementRadius: 30,
  displacementSpeed: 0.5,
  chromaticStrength: 4,
  chromaticRotation: 120,
  blendMode: 'overlay',
  feedbackStrength: 0.3,
  tintColor: '#ffffff',
  tintStrength: 0.1,
  vignetteStrength: 0.2,
  pulseIntensity: 0.3,
  rotationSpeed: 0.2,
  smoothing: true
});

/**
 * Psychedelic Portal - Maximum visual intensity
 */
export const psychedelicPortalPreset = new VoidEchoConfig({
  echoCount: 8,
  echoSpacing: 0.1,
  echoDecay: 0.8,
  displacementRadius: 120,
  displacementSpeed: 1.5,
  displacementAngle: 0,
  chromaticStrength: 15,
  chromaticRotation: 120,
  blendMode: 'screen',
  feedbackStrength: 0.7,
  tintColor: '#ff00ff',
  tintStrength: 0.4,
  vignetteColor: '#000033',
  vignetteStrength: 0.5,
  pulseIntensity: 0.7,
  rotationSpeed: 0.5,
  smoothing: true
});

/**
 * Dimensional Rift - Extreme displacement and feedback
 */
export const dimensionalRiftPreset = new VoidEchoConfig({
  echoCount: 10,
  echoSpacing: 0.08,
  echoDecay: 0.85,
  displacementRadius: 150,
  displacementSpeed: 2.0,
  displacementAngle: 45,
  chromaticStrength: 20,
  chromaticRotation: 90,
  blendMode: 'add',
  feedbackStrength: 0.8,
  tintColor: '#00ffff',
  tintStrength: 0.5,
  vignetteColor: '#000000',
  vignetteStrength: 0.6,
  pulseIntensity: 0.8,
  rotationSpeed: 1.0,
  smoothing: true
});

/**
 * Glitch Art - Sharp, digital aesthetic
 */
export const glitchArtPreset = new VoidEchoConfig({
  echoCount: 4,
  echoSpacing: 0.25,
  echoDecay: 0.5,
  displacementRadius: 60,
  displacementSpeed: 0.8,
  displacementAngle: 90,
  chromaticStrength: 12,
  chromaticRotation: 180,
  blendMode: 'overlay',
  feedbackStrength: 0.4,
  tintColor: '#ff0080',
  tintStrength: 0.3,
  vignetteStrength: 0.3,
  pulseIntensity: 0.4,
  rotationSpeed: 0.3,
  smoothing: false  // Sharp edges for glitch aesthetic
});

/**
 * Meditation Visual - Slow, breathing, hypnotic
 */
export const meditationPreset = new VoidEchoConfig({
  echoCount: 6,
  echoSpacing: 0.12,
  echoDecay: 0.75,
  displacementRadius: 40,
  displacementSpeed: 0.3,
  displacementAngle: 0,
  chromaticStrength: 6,
  chromaticRotation: 120,
  blendMode: 'screen',
  feedbackStrength: 0.5,
  tintColor: '#8800ff',
  tintStrength: 0.2,
  vignetteColor: '#000000',
  vignetteStrength: 0.4,
  pulseIntensity: 0.6,
  rotationSpeed: 0.15,
  smoothing: true
});

/**
 * Sci-Fi HUD - Technical, precise, futuristic
 */
export const sciFiHudPreset = new VoidEchoConfig({
  echoCount: 5,
  echoSpacing: 0.18,
  echoDecay: 0.65,
  displacementRadius: 50,
  displacementSpeed: 1.0,
  displacementAngle: 0,
  chromaticStrength: 8,
  chromaticRotation: 120,
  blendMode: 'add',
  feedbackStrength: 0.4,
  tintColor: '#00ff88',
  tintStrength: 0.35,
  vignetteColor: '#001100',
  vignetteStrength: 0.45,
  pulseIntensity: 0.5,
  rotationSpeed: 0.4,
  smoothing: true
});

/**
 * Retro VHS - Analog distortion aesthetic
 */
export const retroVhsPreset = new VoidEchoConfig({
  echoCount: 4,
  echoSpacing: 0.22,
  echoDecay: 0.6,
  displacementRadius: 35,
  displacementSpeed: 0.6,
  displacementAngle: 180,
  chromaticStrength: 10,
  chromaticRotation: 120,
  blendMode: 'overlay',
  feedbackStrength: 0.6,
  tintColor: '#ff8800',
  tintStrength: 0.25,
  vignetteColor: '#000000',
  vignetteStrength: 0.5,
  pulseIntensity: 0.4,
  rotationSpeed: 0.25,
  smoothing: true
});

/**
 * Cosmic Void - Deep space, infinite depth
 */
export const cosmicVoidPreset = new VoidEchoConfig({
  echoCount: 12,
  echoSpacing: 0.06,
  echoDecay: 0.9,
  displacementRadius: 100,
  displacementSpeed: 1.2,
  displacementAngle: 0,
  chromaticStrength: 18,
  chromaticRotation: 120,
  blendMode: 'screen',
  feedbackStrength: 0.75,
  tintColor: '#4400ff',
  tintStrength: 0.3,
  vignetteColor: '#000000',
  vignetteStrength: 0.7,
  pulseIntensity: 0.65,
  rotationSpeed: 0.6,
  smoothing: true
});

// ============================================================================
// PRESET COLLECTION
// ============================================================================

export const presets = {
  minimal: minimalPreset,
  psychedelicPortal: psychedelicPortalPreset,
  dimensionalRift: dimensionalRiftPreset,
  glitchArt: glitchArtPreset,
  meditation: meditationPreset,
  sciFiHud: sciFiHudPreset,
  retroVhs: retroVhsPreset,
  cosmicVoid: cosmicVoidPreset
};

// ============================================================================
// DEMO FUNCTIONS
// ============================================================================

/**
 * Create effect with preset
 */
export function createEffectWithPreset(presetName) {
  const config = presets[presetName];
  if (!config) {
    throw new Error(`Unknown preset: ${presetName}. Available: ${Object.keys(presets).join(', ')}`);
  }
  return new VoidEchoEffect({ config });
}

/**
 * Test serialization roundtrip
 */
export function testSerialization(presetName = 'psychedelicPortal') {
  const original = presets[presetName];
  const json = original.toJSON();
  const restored = VoidEchoConfig.fromJSON(json);
  
  console.log('Original config:', original);
  console.log('JSON:', JSON.stringify(json, null, 2));
  console.log('Restored config:', restored);
  
  // Verify all properties match
  const originalJson = original.toJSON();
  const restoredJson = restored.toJSON();
  const matches = JSON.stringify(originalJson) === JSON.stringify(restoredJson);
  
  console.log('Serialization roundtrip:', matches ? '✅ PASS' : '❌ FAIL');
  return matches;
}

/**
 * Print all presets
 */
export function printPresets() {
  console.log('\n🌀 VoidEcho Effect Presets:\n');
  
  for (const [name, config] of Object.entries(presets)) {
    console.log(`\n📦 ${name}:`);
    console.log(`   Echoes: ${config.echoCount}`);
    console.log(`   Displacement: ${config.displacementRadius}px @ ${config.displacementSpeed}x speed`);
    console.log(`   Chromatic: ${config.chromaticStrength}px separation`);
    console.log(`   Blend: ${config.blendMode}`);
    console.log(`   Tint: ${config.tintColor} (${config.tintStrength * 100}%)`);
    console.log(`   Pulse: ${config.pulseIntensity * 100}%`);
  }
  
  console.log('\n');
}

/**
 * Demo usage
 */
export async function demo(layer, frameNumber, totalFrames, presetName = 'psychedelicPortal') {
  console.log(`\n🌀 VoidEcho Demo - Preset: ${presetName}\n`);
  
  const effect = createEffectWithPreset(presetName);
  const startTime = Date.now();
  
  const result = await effect.invoke(layer, frameNumber, totalFrames);
  
  const elapsed = Date.now() - startTime;
  console.log(`✅ Effect applied in ${elapsed}ms`);
  
  return result;
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  VoidEchoEffect,
  VoidEchoConfig,
  presets,
  createEffectWithPreset,
  testSerialization,
  printPresets,
  demo
};