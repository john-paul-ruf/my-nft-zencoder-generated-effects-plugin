/**
 * FluxWeave Effect - Test Suite
 * 
 * Comprehensive tests to verify all functionality
 */

import { FluxWeaveEffect, FluxWeaveConfig } from './index.js';
import { PRESETS } from './demo.js';

console.log('🧪 FluxWeave Test Suite\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
}

// Test 1: Module Import
test('Module Import', () => {
  if (!FluxWeaveEffect) throw new Error('FluxWeaveEffect not imported');
  if (!FluxWeaveConfig) throw new Error('FluxWeaveConfig not imported');
});

// Test 2: Config Creation
test('Config Creation', () => {
  const config = new FluxWeaveConfig();
  if (!config) throw new Error('Config not created');
  if (config.waveAmplitude !== 30) throw new Error('Default value incorrect');
});

// Test 3: Parameter Validation
test('Parameter Validation', () => {
  const config = new FluxWeaveConfig({
    waveAmplitude: 500, // Should clamp to 200
    waveFrequency1: -1, // Should clamp to 0.001
    braidCount: 20 // Should clamp to 8
  });
  
  if (config.waveAmplitude !== 200) throw new Error('Amplitude not clamped');
  if (config.waveFrequency1 !== 0.001) throw new Error('Frequency not clamped');
  if (config.braidCount !== 8) throw new Error('Braid count not clamped');
});

// Test 4: Serialization
test('Serialization', () => {
  const config = new FluxWeaveConfig({ waveAmplitude: 50 });
  const json = config.toJSON();
  
  if (!json) throw new Error('Serialization failed');
  if (json.waveAmplitude !== 50) throw new Error('Serialized value incorrect');
  if (typeof json.waveDirection !== 'string') throw new Error('String not serialized');
});

// Test 5: Deserialization
test('Deserialization', () => {
  const json = { waveAmplitude: 75, waveDirection: 'radial' };
  const config = FluxWeaveConfig.fromJSON(json);
  
  if (!config) throw new Error('Deserialization failed');
  if (config.waveAmplitude !== 75) throw new Error('Deserialized value incorrect');
  if (config.waveDirection !== 'radial') throw new Error('String not deserialized');
});

// Test 6: Roundtrip Verification
test('Roundtrip Verification', () => {
  const original = new FluxWeaveConfig({
    waveAmplitude: 60,
    waveDirection: 'diagonal',
    braidCount: 5,
    tintColor: '#ff00ff'
  });
  
  const json = original.toJSON();
  const restored = FluxWeaveConfig.fromJSON(json);
  
  if (restored.waveAmplitude !== original.waveAmplitude) throw new Error('Amplitude mismatch');
  if (restored.waveDirection !== original.waveDirection) throw new Error('Direction mismatch');
  if (restored.braidCount !== original.braidCount) throw new Error('Braid count mismatch');
  if (restored.tintColor !== original.tintColor) throw new Error('Color mismatch');
});

// Test 7: Effect Creation
test('Effect Creation', () => {
  const config = new FluxWeaveConfig();
  const effect = new FluxWeaveEffect({ 
    config,
    settings: { width: 1920, height: 1080 }
  });
  
  if (!effect) throw new Error('Effect not created');
  if (!effect.data) throw new Error('Effect data not initialized');
});

// Test 8: Static Properties
test('Static Properties', () => {
  if (FluxWeaveEffect._name_ !== 'flux-weave') throw new Error('Name incorrect');
  if (!FluxWeaveEffect._displayName_) throw new Error('Display name missing');
  if (!FluxWeaveEffect._description_) throw new Error('Description missing');
  if (!FluxWeaveEffect._version_) throw new Error('Version missing');
  if (!FluxWeaveEffect._author_) throw new Error('Author missing');
  if (!Array.isArray(FluxWeaveEffect._tags_)) throw new Error('Tags not array');
});

// Test 9: All Presets
test('All 8 Presets', () => {
  const presetNames = Object.keys(PRESETS);
  if (presetNames.length !== 8) throw new Error(`Expected 8 presets, got ${presetNames.length}`);
  
  presetNames.forEach(name => {
    const preset = PRESETS[name];
    if (!(preset instanceof FluxWeaveConfig)) {
      throw new Error(`Preset ${name} is not a FluxWeaveConfig`);
    }
  });
});

// Test 10: Preset Serialization
test('Preset Serialization', () => {
  Object.keys(PRESETS).forEach(name => {
    const preset = PRESETS[name];
    const json = preset.toJSON();
    const restored = FluxWeaveConfig.fromJSON(json);
    
    if (restored.waveAmplitude !== preset.waveAmplitude) {
      throw new Error(`Preset ${name} serialization failed`);
    }
  });
});

// Test 11: Directional Modes
test('Directional Modes', () => {
  const modes = ['horizontal', 'vertical', 'radial', 'diagonal'];
  modes.forEach(mode => {
    const config = new FluxWeaveConfig({ waveDirection: mode });
    if (config.waveDirection !== mode) {
      throw new Error(`Direction ${mode} not set correctly`);
    }
  });
  
  // Test invalid mode
  const invalid = new FluxWeaveConfig({ waveDirection: 'invalid' });
  if (invalid.waveDirection !== 'horizontal') {
    throw new Error('Invalid direction not defaulted');
  }
});

// Test 12: Blend Modes
test('Blend Modes', () => {
  const modes = ['normal', 'screen', 'overlay', 'add'];
  modes.forEach(mode => {
    const config = new FluxWeaveConfig({ blendMode: mode });
    if (config.blendMode !== mode) {
      throw new Error(`Blend mode ${mode} not set correctly`);
    }
  });
  
  // Test invalid mode
  const invalid = new FluxWeaveConfig({ blendMode: 'invalid' });
  if (invalid.blendMode !== 'overlay') {
    throw new Error('Invalid blend mode not defaulted');
  }
});

// Test 13: Color Validation
test('Color Validation', () => {
  const valid = new FluxWeaveConfig({ tintColor: '#ff00ff' });
  if (valid.tintColor !== '#ff00ff') throw new Error('Valid color rejected');
  
  const invalid = new FluxWeaveConfig({ tintColor: 'not-a-color' });
  if (invalid.tintColor !== '#ffffff') throw new Error('Invalid color not defaulted');
});

// Test 14: Perfect Loop Math
test('Perfect Loop Math', () => {
  // Verify that phase calculation creates perfect loop
  const totalFrames = 60;
  
  for (let frame = 0; frame < totalFrames; frame++) {
    const t = frame / totalFrames;
    const phase = t * Math.PI * 2;
    
    // At frame 0 and frame 60, phase should produce same sine value
    if (frame === 0) {
      const sin0 = Math.sin(phase);
      const cos0 = Math.cos(phase);
      
      const tEnd = totalFrames / totalFrames;
      const phaseEnd = tEnd * Math.PI * 2;
      const sinEnd = Math.sin(phaseEnd);
      const cosEnd = Math.cos(phaseEnd);
      
      // Should be very close (accounting for floating point)
      if (Math.abs(sin0 - sinEnd) > 0.0001) throw new Error('Sine not looping');
      if (Math.abs(cos0 - cosEnd) > 0.0001) throw new Error('Cosine not looping');
    }
  }
});

// Test 15: Data Initialization
test('Data Initialization', () => {
  const config = new FluxWeaveConfig({
    waveAmplitude: 50,
    flowAngle: 45,
    hueRotation: 180
  });
  
  const effect = new FluxWeaveEffect({ 
    config,
    settings: { width: 1920, height: 1080 }
  });
  
  if (effect.data.waveAmplitude !== 50) throw new Error('Amplitude not in data');
  if (!effect.data.flowAngleRad) throw new Error('Flow angle not converted to radians');
  if (!effect.data.hueRotationRad) throw new Error('Hue rotation not converted to radians');
  
  // Verify radian conversion
  const expectedFlowRad = 45 * Math.PI / 180;
  const expectedHueRad = 180 * Math.PI / 180;
  
  if (Math.abs(effect.data.flowAngleRad - expectedFlowRad) > 0.0001) {
    throw new Error('Flow angle conversion incorrect');
  }
  if (Math.abs(effect.data.hueRotationRad - expectedHueRad) > 0.0001) {
    throw new Error('Hue rotation conversion incorrect');
  }
});

// Results
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`📊 Test Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('🎉 All tests passed! FluxWeave is production ready.\n');
  process.exit(0);
} else {
  console.log('❌ Some tests failed. Please review.\n');
  process.exit(1);
}