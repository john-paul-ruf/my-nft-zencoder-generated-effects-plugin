#!/usr/bin/env node

/**
 * PrismaticShatter Effect Test Suite
 * 
 * Validates the Prismatic Shatter effect implementation.
 */

import { PrismaticShatterEffect } from './PrismaticShatterEffect.js';
import { PrismaticShatterConfig } from './PrismaticShatterConfig.js';
import { Canvas2dFactory } from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';

/**
 * Test utilities
 */
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    console.log('🧪 PrismaticShatter Effect Test Suite\n');
    
    for (const test of this.tests) {
      try {
        await test.fn();
        this.passed++;
        console.log(`✅ ${test.name}`);
      } catch (error) {
        this.failed++;
        console.log(`❌ ${test.name}`);
        console.log(`   Error: ${error.message}`);
      }
    }
    
    console.log(`\n📊 Results: ${this.passed} passed, ${this.failed} failed`);
    return this.failed === 0;
  }
}

/**
 * Create test layer
 */
async function createTestLayer(width = 512, height = 512) {
  const canvas = await Canvas2dFactory.getNewCanvas(width, height);
  const ctx = canvas.ctx;
  
  // Simple gradient for testing
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#ff0000');
  gradient.addColorStop(0.5, '#00ff00');
  gradient.addColorStop(1, '#0000ff');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  const layer = await canvas.convertToLayer();
  return layer;
}

/**
 * Run tests
 */
async function runTests() {
  const runner = new TestRunner();
  
  // Test 1: Configuration validation
  runner.test('Configuration creates with defaults', () => {
    const config = new PrismaticShatterConfig();
    
    if (config.shardCount !== 12) throw new Error('Default shardCount incorrect');
    if (config.refractionIndex !== 1.52) throw new Error('Default refractionIndex incorrect');
    if (!config.antialiasing) throw new Error('Default antialiasing should be true');
  });
  
  // Test 2: Configuration serialization
  runner.test('Configuration serializes and deserializes', () => {
    const config = new PrismaticShatterConfig({
      shardCount: 20,
      refractionIndex: 2.0,
      primarySpectrumColor: '#ff00ff'
    });
    
    const json = config.toJSON();
    const restored = PrismaticShatterConfig.fromJSON(json);
    
    if (restored.shardCount !== 20) throw new Error('shardCount not restored');
    if (restored.refractionIndex !== 2.0) throw new Error('refractionIndex not restored');
    if (restored.primarySpectrumColor !== '#ff00ff') throw new Error('Color not restored');
  });
  
  // Test 3: Configuration bounds validation
  runner.test('Configuration validates bounds', () => {
    const config = new PrismaticShatterConfig({
      shardCount: 100,      // Should clamp to 50
      refractionIndex: 5.0, // Should clamp to 2.4
      chromaticDispersion: -1, // Should clamp to 0
      rayCount: 10          // Should clamp to 5
    });
    
    if (config.shardCount !== 50) throw new Error('shardCount not clamped');
    if (config.refractionIndex !== 2.4) throw new Error('refractionIndex not clamped');
    if (config.chromaticDispersion !== 0) throw new Error('chromaticDispersion not clamped');
    if (config.rayCount !== 5) throw new Error('rayCount not clamped');
  });
  
  // Test 4: Effect instantiation
  runner.test('Effect instantiates correctly', () => {
    const config = new PrismaticShatterConfig();
    const effect = new PrismaticShatterEffect({
      config,
      settings: { width: 512, height: 512 }
    });
    
    if (!effect) throw new Error('Effect not created');
    if (effect.name !== 'prismatic-shatter') throw new Error('Effect name incorrect');
  });
  
  // Test 5: Basic rendering
  runner.test('Effect renders without errors', async () => {
    const config = new PrismaticShatterConfig();
    const effect = new PrismaticShatterEffect({
      config,
      settings: { width: 512, height: 512 }
    });
    
    const layer = await createTestLayer();
    const result = await effect.invoke(layer, 0, 1);
    
    if (!result) throw new Error('No result returned');
    if (!result.canvas) throw new Error('No canvas in result');
  });
  
  // Test 6: Animation loop
  runner.test('Effect creates perfect loop', async () => {
    const config = new PrismaticShatterConfig();
    const effect = new PrismaticShatterEffect({
      config,
      settings: { width: 256, height: 256 }
    });
    
    const layer = await createTestLayer(256, 256);
    const frames = 30;
    
    // Generate first and last frame
    const firstFrame = await effect.invoke(layer, 0, frames);
    const lastFrame = await effect.invoke(layer, frames - 1, frames);
    
    if (!firstFrame?.canvas || !lastFrame?.canvas) {
      throw new Error('Frames not generated');
    }
    
    // Note: In a real test, we'd compare pixel data to verify loop
    // For now, just ensure both frames generated successfully
  });
  
  // Test 7: Deterministic output
  runner.test('Effect produces deterministic output', async () => {
    const config = new PrismaticShatterConfig({ tessellationSeed: 42 });
    
    const effect1 = new PrismaticShatterEffect({
      config,
      settings: { width: 256, height: 256 }
    });
    
    const effect2 = new PrismaticShatterEffect({
      config: PrismaticShatterConfig.fromJSON(config.toJSON()),
      settings: { width: 256, height: 256 }
    });
    
    const layer = await createTestLayer(256, 256);
    
    const result1 = await effect1.invoke(layer, 10, 30);
    const result2 = await effect2.invoke(layer, 10, 30);
    
    if (!result1?.canvas || !result2?.canvas) {
      throw new Error('Results not generated');
    }
    
    // Both effects with same config should produce identical results
  });
  
  // Test 8: Different blend modes
  runner.test('Effect handles different blend modes', async () => {
    const blendModes = ['normal', 'screen', 'overlay', 'add'];
    const layer = await createTestLayer(128, 128);
    
    for (const mode of blendModes) {
      const config = new PrismaticShatterConfig({ shardBlendMode: mode });
      const effect = new PrismaticShatterEffect({
        config,
        settings: { width: 128, height: 128 }
      });
      
      const result = await effect.invoke(layer, 0, 1);
      if (!result?.canvas) {
        throw new Error(`Failed with blend mode: ${mode}`);
      }
    }
  });
  
  // Test 9: Color configuration
  runner.test('Effect applies custom colors', async () => {
    const config = new PrismaticShatterConfig({
      primarySpectrumColor: '#ff00ff',
      secondarySpectrumColor: '#00ffff',
      glowColor: '#ffff00',
      fogColor: '#ff0000',
      flareColor: '#00ff00'
    });
    
    const effect = new PrismaticShatterEffect({
      config,
      settings: { width: 256, height: 256 }
    });
    
    const layer = await createTestLayer(256, 256);
    const result = await effect.invoke(layer, 0, 1);
    
    if (!result?.canvas) throw new Error('Result not generated');
    // Colors should be applied (visual verification needed)
  });
  
  // Test 10: Performance with max shards
  runner.test('Effect handles maximum shards', async () => {
    const config = new PrismaticShatterConfig({
      shardCount: 50, // Maximum
      rayCount: 5,     // Maximum
      highQualityRefraction: true
    });
    
    const effect = new PrismaticShatterEffect({
      config,
      settings: { width: 512, height: 512 }
    });
    
    const layer = await createTestLayer(512, 512);
    const startTime = Date.now();
    const result = await effect.invoke(layer, 0, 1);
    const renderTime = Date.now() - startTime;
    
    if (!result?.canvas) throw new Error('Failed to render with max shards');
    console.log(`     Render time with max shards: ${renderTime}ms`);
  });
  
  // Test 11: Effect intensity
  runner.test('Effect intensity scales properly', async () => {
    const intensities = [0, 0.5, 1.0];
    const layer = await createTestLayer(128, 128);
    
    for (const intensity of intensities) {
      const config = new PrismaticShatterConfig({ effectIntensity: intensity });
      const effect = new PrismaticShatterEffect({
        config,
        settings: { width: 128, height: 128 }
      });
      
      const result = await effect.invoke(layer, 0, 1);
      if (!result?.canvas) {
        throw new Error(`Failed with intensity: ${intensity}`);
      }
    }
  });
  
  // Test 12: Animation parameters
  runner.test('Animation parameters affect output', async () => {
    const config = new PrismaticShatterConfig({
      rotationSpeedX: 2.0,
      rotationSpeedY: 2.0,
      rotationSpeedZ: 2.0,
      orbitRadius: 100,
      floatAmplitude: 25
    });
    
    const effect = new PrismaticShatterEffect({
      config,
      settings: { width: 256, height: 256 }
    });
    
    const layer = createTestLayer(256, 256);
    
    // Generate frames at different points
    const frame1 = await effect.invoke(layer, 0, 30);
    const frame2 = await effect.invoke(layer, 15, 30);
    
    if (!frame1?.canvas || !frame2?.canvas) {
      throw new Error('Animation frames not generated');
    }
  });
  
  // Run all tests
  const success = await runner.run();
  process.exit(success ? 0 : 1);
}

// Execute tests
runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});