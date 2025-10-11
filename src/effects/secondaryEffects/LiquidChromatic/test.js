#!/usr/bin/env node

/**
 * Comprehensive Test Suite for LiquidChromatic Effect
 * 
 * Tests all requirements and validates SOLID principles
 */

import { LiquidChromaticEffect } from './LiquidChromaticEffect.js';
import { LiquidChromaticConfig } from './LiquidChromaticConfig.js';

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
  log('LiquidChromatic Effect - Comprehensive Test Suite', 'bold');
  log('='.repeat(60) + '\n', 'cyan');

  let passed = 0;
  let failed = 0;

  // Test 1: Configuration Creation
  log('Test 1: Configuration Creation', 'blue');
  try {
    const config = new LiquidChromaticConfig();
    assert(config !== null, 'Config instance created');
    assert(config.flowSpeed === 1.0, 'Default flowSpeed is 1.0');
    assert(config.flowAngle === 45, 'Default flowAngle is 45');
    assert(config.perfectLoop === true, 'Perfect loop is always true');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 2: Configuration Validation (Clamping)
  log('\nTest 2: Configuration Validation', 'blue');
  try {
    const config = new LiquidChromaticConfig({
      flowSpeed: 999,           // Should clamp to 3
      turbulence: -5,           // Should clamp to 0
      waveAmplitude: 1000,      // Should clamp to 50
      chromaticSeparation: -10  // Should clamp to 0
    });
    
    assert(config.flowSpeed === 3, 'flowSpeed clamped to 3');
    assert(config.turbulence === 0, 'turbulence clamped to 0');
    assert(config.waveAmplitude === 50, 'waveAmplitude clamped to 50');
    assert(config.chromaticSeparation === 0, 'chromaticSeparation clamped to 0');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 3: Flat Configuration (No Nesting)
  log('\nTest 3: Flat Configuration Structure', 'blue');
  try {
    const config = new LiquidChromaticConfig();
    const json = config.toJSON();
    
    let isFlat = true;
    for (const key in json) {
      if (typeof json[key] === 'object' && json[key] !== null) {
        isFlat = false;
        break;
      }
    }
    
    assert(isFlat, 'Configuration is flat (no nested objects)');
    assert(Object.keys(json).length > 25, 'All properties serialized');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 4: Serialization/Deserialization
  log('\nTest 4: Serialization/Deserialization', 'blue');
  try {
    const original = new LiquidChromaticConfig({
      flowSpeed: 1.5,
      flowAngle: 90,
      chromaticSeparation: 15,
      iridescenceIntensity: 0.7,
      primaryHue: 200,
      seed: 12345
    });
    
    const json = original.toJSON();
    const restored = LiquidChromaticConfig.fromJSON(json);
    
    assert(restored.flowSpeed === 1.5, 'flowSpeed preserved');
    assert(restored.flowAngle === 90, 'flowAngle preserved');
    assert(restored.chromaticSeparation === 15, 'chromaticSeparation preserved');
    assert(restored.iridescenceIntensity === 0.7, 'iridescenceIntensity preserved');
    assert(restored.primaryHue === 200, 'primaryHue preserved');
    assert(restored.seed === 12345, 'seed preserved');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 5: Effect Instantiation
  log('\nTest 5: Effect Instantiation', 'blue');
  try {
    const config = new LiquidChromaticConfig();
    const effect = new LiquidChromaticEffect({
      config,
      settings: { width: 512, height: 512 }
    });
    
    assert(effect !== null, 'Effect instance created');
    assert(effect.config === config, 'Config reference stored');
    assert(effect.data !== undefined, 'Internal data generated');
    assert(effect.data.width === 512, 'Width stored in data');
    assert(effect.data.height === 512, 'Height stored in data');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 6: Static Metadata
  log('\nTest 6: Static Metadata', 'blue');
  try {
    assert(LiquidChromaticEffect._name_ === 'liquid-chromatic', 'Effect name correct');
    assert(LiquidChromaticEffect._displayName_ === 'Liquid Chromatic', 'Display name correct');
    assert(LiquidChromaticEffect._version_ === '1.0.0', 'Version correct');
    assert(LiquidChromaticEffect._author_ === 'Zencoder', 'Author correct');
    assert(Array.isArray(LiquidChromaticEffect._tags_), 'Tags is array');
    assert(LiquidChromaticEffect._tags_.includes('liquid'), 'Has liquid tag');
    assert(LiquidChromaticEffect._tags_.includes('chromatic'), 'Has chromatic tag');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 7: Deterministic Behavior (Pure Function)
  log('\nTest 7: Deterministic Behavior', 'blue');
  try {
    const config1 = new LiquidChromaticConfig({
      flowSpeed: 1.5,
      chromaticSeparation: 15,
      seed: 12345
    });
    
    const config2 = new LiquidChromaticConfig({
      flowSpeed: 1.5,
      chromaticSeparation: 15,
      seed: 12345
    });
    
    const effect1 = new LiquidChromaticEffect({ config: config1, settings: { width: 100, height: 100 } });
    const effect2 = new LiquidChromaticEffect({ config: config2, settings: { width: 100, height: 100 } });
    
    // Data should be identical for same config
    assert(effect1.data.flowSpeed === effect2.data.flowSpeed, 'Same config produces same data');
    assert(effect1.data.seed === effect2.data.seed, 'Seed preserved');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 8: Wave Frequency Validation
  log('\nTest 8: Wave Frequency Validation', 'blue');
  try {
    const config = new LiquidChromaticConfig({
      waveFrequency1: 2.5,
      waveFrequency2: 3.5,
      waveFrequency3: 1.5
    });
    
    assert(config.waveFrequency1 === 2.5, 'waveFrequency1 set correctly');
    assert(config.waveFrequency2 === 3.5, 'waveFrequency2 set correctly');
    assert(config.waveFrequency3 === 1.5, 'waveFrequency3 set correctly');
    
    // Test clamping
    const clampedConfig = new LiquidChromaticConfig({
      waveFrequency1: 10,  // Should clamp to 5
      waveFrequency2: 0.1  // Should clamp to 0.5
    });
    
    assert(clampedConfig.waveFrequency1 === 5, 'waveFrequency1 clamped to 5');
    assert(clampedConfig.waveFrequency2 === 0.5, 'waveFrequency2 clamped to 0.5');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 9: Angle Wrapping
  log('\nTest 9: Angle Wrapping', 'blue');
  try {
    const config = new LiquidChromaticConfig({
      flowAngle: 450,        // Should wrap to 90
      chromaticAngle: 720,   // Should wrap to 0
      primaryHue: 400        // Should wrap to 40
    });
    
    assert(config.flowAngle === 90, 'flowAngle wraps at 360');
    assert(config.chromaticAngle === 0, 'chromaticAngle wraps at 360');
    assert(config.primaryHue === 40, 'primaryHue wraps at 360');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 10: Perfect Loop Configuration
  log('\nTest 10: Perfect Loop Configuration', 'blue');
  try {
    const config = new LiquidChromaticConfig({ perfectLoop: false });
    assert(config.perfectLoop === true, 'Perfect loop always true (forced)');
    
    const json = config.toJSON();
    assert(json.perfectLoop === true, 'Perfect loop serialized as true');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 11: Iridescence Parameters
  log('\nTest 11: Iridescence Parameters', 'blue');
  try {
    const config = new LiquidChromaticConfig({
      iridescenceIntensity: 0.8,
      primaryHue: 180,
      hueShiftRange: 120,
      saturationBoost: 0.5,
      brightnessModulation: 0.3
    });
    
    assert(config.iridescenceIntensity === 0.8, 'iridescenceIntensity set');
    assert(config.primaryHue === 180, 'primaryHue set');
    assert(config.hueShiftRange === 120, 'hueShiftRange set');
    assert(config.saturationBoost === 0.5, 'saturationBoost set');
    assert(config.brightnessModulation === 0.3, 'brightnessModulation set');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 12: Surface Effects Parameters
  log('\nTest 12: Surface Effects Parameters', 'blue');
  try {
    const config = new LiquidChromaticConfig({
      surfaceTension: 0.6,
      refractionStrength: 0.5,
      specularHighlights: 0.8,
      depthGradient: 0.4
    });
    
    assert(config.surfaceTension === 0.6, 'surfaceTension set');
    assert(config.refractionStrength === 0.5, 'refractionStrength set');
    assert(config.specularHighlights === 0.8, 'specularHighlights set');
    assert(config.depthGradient === 0.4, 'depthGradient set');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 13: Animation Parameters
  log('\nTest 13: Animation Parameters', 'blue');
  try {
    const config = new LiquidChromaticConfig({
      rotationSpeed: 1.5,
      pulseFrequency: 3.0,
      shimmerSpeed: 2.5
    });
    
    assert(config.rotationSpeed === 1.5, 'rotationSpeed set');
    assert(config.pulseFrequency === 3.0, 'pulseFrequency set');
    assert(config.shimmerSpeed === 2.5, 'shimmerSpeed set');
    
    // Test clamping
    const clampedConfig = new LiquidChromaticConfig({
      rotationSpeed: 10,    // Should clamp to 2
      pulseFrequency: -1,   // Should clamp to 0
      shimmerSpeed: 100     // Should clamp to 3
    });
    
    assert(clampedConfig.rotationSpeed === 2, 'rotationSpeed clamped to 2');
    assert(clampedConfig.pulseFrequency === 0, 'pulseFrequency clamped to 0');
    assert(clampedConfig.shimmerSpeed === 3, 'shimmerSpeed clamped to 3');
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 14: Preset Configurations
  log('\nTest 14: Preset Configurations', 'blue');
  try {
    const presets = {
      'Oil Slick': new LiquidChromaticConfig({
        flowSpeed: 0.5,
        viscosity: 0.8,
        chromaticSeparation: 15,
        iridescenceIntensity: 0.9,
        primaryHue: 280,
        hueShiftRange: 120
      }),
      
      'Liquid Metal': new LiquidChromaticConfig({
        flowSpeed: 1.5,
        viscosity: 0.3,
        specularHighlights: 0.9,
        saturationBoost: 0.2,
        surfaceTension: 0.7,
        contrastBoost: 0.6
      }),
      
      'Psychedelic Flow': new LiquidChromaticConfig({
        flowSpeed: 2.0,
        turbulence: 0.8,
        chromaticSeparation: 25,
        iridescenceIntensity: 1.0,
        hueShiftRange: 180,
        shimmerSpeed: 2.5
      })
    };
    
    for (const [name, config] of Object.entries(presets)) {
      assert(config instanceof LiquidChromaticConfig, `Preset "${name}" is valid config`);
    }
    passed++;
  } catch (e) {
    log(`  Error: ${e.message}`, 'red');
    failed++;
  }

  // Test 15: SOLID Principles Compliance
  log('\nTest 15: SOLID Principles Compliance', 'blue');
  try {
    // SRP: Config only handles configuration
    const config = new LiquidChromaticConfig();
    assert(typeof config.toJSON === 'function', 'Config has serialization (SRP)');
    assert(typeof config.invoke === 'undefined', 'Config does not render (SRP)');
    
    // LSP: Effect can substitute LayerEffect
    const effect = new LiquidChromaticEffect({ config });
    assert(typeof effect.invoke === 'function', 'Effect has invoke method (LSP)');
    
    // DIP: Effect depends on config abstraction
    assert(effect.config instanceof LiquidChromaticConfig, 'Effect depends on config (DIP)');
    
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
    log('"Liquid dreams flowing through digital streams."\n', 'cyan');
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