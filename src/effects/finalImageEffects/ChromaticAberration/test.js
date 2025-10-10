#!/usr/bin/env node

/**
 * Comprehensive Test Suite for ChromaticAberration Effect
 * 
 * Tests all requirements and validates SOLID principles
 */

import { ChromaticAberrationConfig } from './ChromaticAberrationConfig.js';
import { ChromaticAberrationEffect } from './ChromaticAberrationEffect.js';

// ANSI color codes for pretty output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function assert(condition, message) {
  if (condition) {
    log(`  ✓ ${message}`, 'green');
    return true;
  } else {
    log(`  ✗ ${message}`, 'red');
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runTests() {
  log('\n' + '='.repeat(60), 'cyan');
  log('ChromaticAberration Effect - Comprehensive Test Suite', 'bold');
  log('='.repeat(60) + '\n', 'cyan');

  let passed = 0;
  let failed = 0;

  // Test 1: Configuration Creation
  log('Test 1: Configuration Creation', 'blue');
  try {
    const config = new ChromaticAberrationConfig();
    assert(config !== null, 'Config instance created');
    assert(config.maxDisplacement === 20, 'Default maxDisplacement is 20');
    assert(config.displacementMode === 'wave', 'Default mode is wave');
    assert(config.perfectLoop === true, 'Perfect loop is always true');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 2: Configuration Validation
  log('\nTest 2: Configuration Validation', 'blue');
  try {
    const config = new ChromaticAberrationConfig({
      maxDisplacement: 150, // Should clamp to 100
      waveFrequency: -5,    // Should clamp to 0
      quality: 'invalid'    // Should default to 'high'
    });
    assert(config.maxDisplacement === 100, 'maxDisplacement clamped to 100');
    assert(config.waveFrequency === 0, 'waveFrequency clamped to 0');
    assert(config.quality === 'high', 'Invalid quality defaults to high');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 3: Flat Configuration (No Nesting)
  log('\nTest 3: Flat Configuration Structure', 'blue');
  try {
    const config = new ChromaticAberrationConfig();
    const json = config.toJSON();
    
    let isFlat = true;
    for (const key in json) {
      if (typeof json[key] === 'object' && json[key] !== null) {
        isFlat = false;
        break;
      }
    }
    
    assert(isFlat, 'Configuration is flat (no nested objects)');
    assert(Object.keys(json).length > 15, 'All properties serialized');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 4: Serialization/Deserialization
  log('\nTest 4: Serialization/Deserialization', 'blue');
  try {
    const original = new ChromaticAberrationConfig({
      maxDisplacement: 35,
      displacementMode: 'radial',
      waveFrequency: 3,
      blendMode: 'additive',
      noiseAmount: 0.5,
      noiseSeed: 42
    });
    
    const json = original.toJSON();
    const restored = ChromaticAberrationConfig.fromJSON(json);
    
    assert(restored.maxDisplacement === 35, 'maxDisplacement preserved');
    assert(restored.displacementMode === 'radial', 'displacementMode preserved');
    assert(restored.waveFrequency === 3, 'waveFrequency preserved');
    assert(restored.blendMode === 'additive', 'blendMode preserved');
    assert(restored.noiseAmount === 0.5, 'noiseAmount preserved');
    assert(restored.noiseSeed === 42, 'noiseSeed preserved');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 5: All Displacement Modes
  log('\nTest 5: All Displacement Modes', 'blue');
  try {
    const modes = ['wave', 'radial', 'orbital', 'pulse', 'scanline'];
    
    for (const mode of modes) {
      const config = new ChromaticAberrationConfig({ displacementMode: mode });
      assert(config.displacementMode === mode, `Mode '${mode}' accepted`);
    }
    
    // Test invalid mode
    const invalidConfig = new ChromaticAberrationConfig({ displacementMode: 'invalid' });
    assert(invalidConfig.displacementMode === 'wave', 'Invalid mode defaults to wave');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 6: Effect Creation
  log('\nTest 6: Effect Creation', 'blue');
  try {
    const config = new ChromaticAberrationConfig();
    const effect = new ChromaticAberrationEffect({
      config,
      settings: { width: 800, height: 600 }
    });
    
    assert(effect !== null, 'Effect instance created');
    assert(effect.config === config, 'Config reference stored');
    assert(effect.data !== undefined, 'Internal data generated');
    assert(effect.data.width === 800, 'Width stored in data');
    assert(effect.data.height === 600, 'Height stored in data');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 7: Static Metadata
  log('\nTest 7: Static Metadata', 'blue');
  try {
    assert(ChromaticAberrationEffect._name_ === 'chromatic-aberration', 'Effect name correct');
    assert(ChromaticAberrationEffect._displayName_ === 'Chromatic Aberration', 'Display name correct');
    assert(ChromaticAberrationEffect._version_ === '1.0.0', 'Version correct');
    assert(ChromaticAberrationEffect._author_ === 'Zencoder', 'Author correct');
    assert(Array.isArray(ChromaticAberrationEffect._tags_), 'Tags is array');
    assert(ChromaticAberrationEffect._tags_.includes('glitch'), 'Has glitch tag');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 8: Deterministic Behavior (Pure Function)
  log('\nTest 8: Deterministic Behavior', 'blue');
  try {
    const config1 = new ChromaticAberrationConfig({
      maxDisplacement: 25,
      displacementMode: 'wave',
      noiseSeed: 12345
    });
    
    const config2 = new ChromaticAberrationConfig({
      maxDisplacement: 25,
      displacementMode: 'wave',
      noiseSeed: 12345
    });
    
    const effect1 = new ChromaticAberrationEffect({ config: config1, settings: { width: 100, height: 100 } });
    const effect2 = new ChromaticAberrationEffect({ config: config2, settings: { width: 100, height: 100 } });
    
    // Data should be identical for same config
    assert(effect1.data.maxDisplacement === effect2.data.maxDisplacement, 'Same config produces same data');
    assert(effect1.data.noiseSeed === effect2.data.noiseSeed, 'Noise seed preserved');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 9: All Blend Modes
  log('\nTest 9: All Blend Modes', 'blue');
  try {
    const modes = ['screen', 'additive', 'normal'];
    
    for (const mode of modes) {
      const config = new ChromaticAberrationConfig({ blendMode: mode });
      assert(config.blendMode === mode, `Blend mode '${mode}' accepted`);
    }
    
    const invalidConfig = new ChromaticAberrationConfig({ blendMode: 'invalid' });
    assert(invalidConfig.blendMode === 'screen', 'Invalid blend mode defaults to screen');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 10: All Edge Modes
  log('\nTest 10: All Edge Modes', 'blue');
  try {
    const modes = ['wrap', 'clamp', 'transparent'];
    
    for (const mode of modes) {
      const config = new ChromaticAberrationConfig({ edgeMode: mode });
      assert(config.edgeMode === mode, `Edge mode '${mode}' accepted`);
    }
    
    const invalidConfig = new ChromaticAberrationConfig({ edgeMode: 'invalid' });
    assert(invalidConfig.edgeMode === 'wrap', 'Invalid edge mode defaults to wrap');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 11: Quality Levels
  log('\nTest 11: Quality Levels', 'blue');
  try {
    const levels = ['low', 'medium', 'high'];
    
    for (const level of levels) {
      const config = new ChromaticAberrationConfig({ quality: level });
      assert(config.quality === level, `Quality '${level}' accepted`);
    }
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 12: Channel Opacity Control
  log('\nTest 12: Channel Opacity Control', 'blue');
  try {
    const config = new ChromaticAberrationConfig({
      redChannelOpacity: 0.8,
      greenChannelOpacity: 0.9,
      blueChannelOpacity: 1.0
    });
    
    assert(config.redChannelOpacity === 0.8, 'Red channel opacity set');
    assert(config.greenChannelOpacity === 0.9, 'Green channel opacity set');
    assert(config.blueChannelOpacity === 1.0, 'Blue channel opacity set');
    
    // Test clamping
    const clampedConfig = new ChromaticAberrationConfig({
      redChannelOpacity: 2.0,
      greenChannelOpacity: -0.5
    });
    
    assert(clampedConfig.redChannelOpacity === 1.0, 'Red opacity clamped to 1.0');
    assert(clampedConfig.greenChannelOpacity === 0.0, 'Green opacity clamped to 0.0');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 13: Perfect Loop Configuration
  log('\nTest 13: Perfect Loop Configuration', 'blue');
  try {
    const config = new ChromaticAberrationConfig({ perfectLoop: false });
    assert(config.perfectLoop === true, 'Perfect loop always true (forced)');
    
    const json = config.toJSON();
    assert(json.perfectLoop === true, 'Perfect loop serialized as true');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 14: Angle Wrapping
  log('\nTest 14: Angle Wrapping', 'blue');
  try {
    const config = new ChromaticAberrationConfig({
      displacementAngle: 450,  // Should wrap to 90
      wavePhaseShift: 720      // Should wrap to 0
    });
    
    assert(config.displacementAngle === 90, 'Displacement angle wraps at 360');
    assert(config.wavePhaseShift === 0, 'Phase shift wraps at 360');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 15: SOLID Principles Compliance
  log('\nTest 15: SOLID Principles Compliance', 'blue');
  try {
    // SRP: Config only handles configuration
    const config = new ChromaticAberrationConfig();
    assert(typeof config.toJSON === 'function', 'Config has serialization (SRP)');
    assert(typeof config.invoke === 'undefined', 'Config does not render (SRP)');
    
    // LSP: Effect can substitute LayerEffect
    const effect = new ChromaticAberrationEffect({ config });
    assert(typeof effect.invoke === 'function', 'Effect has invoke method (LSP)');
    
    // DIP: Effect depends on config abstraction
    assert(effect.config instanceof ChromaticAberrationConfig, 'Effect depends on config (DIP)');
    
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Summary
  log('\n' + '='.repeat(60), 'cyan');
  log('Test Summary', 'bold');
  log('='.repeat(60), 'cyan');
  log(`Total Tests: ${passed + failed}`, 'blue');
  log(`Passed: ${passed}`, 'green');
  log(`Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log('='.repeat(60) + '\n', 'cyan');

  if (failed === 0) {
    log('🎉 All tests passed! Effect is production ready.', 'green');
    log('"I am the operator, the signal cutting through the noise."\n', 'cyan');
    return true;
  } else {
    log('❌ Some tests failed. Please review the errors above.\n', 'red');
    return false;
  }
}

// Run tests if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests()
    .then(success => process.exit(success ? 0 : 1))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

export { runTests };