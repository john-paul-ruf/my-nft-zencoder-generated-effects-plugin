// Test runner for Aurora Cascade keyframe effect
import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import the effect
import { AuroraCascadeEffect, AuroraCascadeConfig } from '../src/effects/keyframeEffects/AuroraCascade/AuroraCascadeEffect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mock Layer class for testing
class TestLayer {
  constructor(buffer) {
    this.buffer = buffer;
  }

  async getBuffer() {
    return this.buffer;
  }

  static fromBuffer(buffer) {
    return new TestLayer(buffer);
  }
}

// Create test configurations
const testConfigs = [
  {
    name: 'natural-aurora',
    config: new AuroraCascadeConfig({
      seed: 12345,
      keyFrames: [0, 50, 100],
      cascadeDuration: [40, 40],
      ribbonCount: 7,
      ribbonWidth: 0.12,
      flowDirection: 'down',
      flowSpeed: 1.0,
      waveAmplitude: 0.25,
      waveFrequency: 2.0,
      colorMode: 'natural',
      particleDensity: 60,
      fieldStrength: 0.4,
      vortexCount: 2,
      glowIntensity: 1.8,
      blendMode: 'screen',
      layerOpacity: 0.85
    })
  },
  {
    name: 'cosmic-aurora',
    config: new AuroraCascadeConfig({
      seed: 54321,
      keyFrames: [0, 60, 120],
      cascadeDuration: [30, 30],
      ribbonCount: 5,
      ribbonWidth: 0.18,
      flowDirection: 'spiral',
      flowSpeed: 1.5,
      waveAmplitude: 0.35,
      waveFrequency: 3.0,
      colorMode: 'cosmic',
      particleDensity: 80,
      particleGlow: true,
      fieldStrength: 0.6,
      vortexCount: 3,
      vortexStrength: 0.4,
      glowIntensity: 2.0,
      shimmerSpeed: 2.5,
      blendMode: 'additive',
      layerOpacity: 0.9
    })
  },
  {
    name: 'fire-aurora',
    config: new AuroraCascadeConfig({
      seed: 99999,
      keyFrames: [0, 40, 80],
      cascadeDuration: [35, 35],
      ribbonCount: 8,
      ribbonWidth: 0.1,
      flowDirection: 'up',
      flowSpeed: 2.0,
      waveAmplitude: 0.4,
      waveFrequency: 1.5,
      turbulenceStrength: 0.3,
      colorMode: 'fire',
      particleDensity: 100,
      particleSize: [2, 6],
      fieldStrength: 0.3,
      vortexCount: 1,
      glowIntensity: 2.5,
      blendMode: 'screen',
      layerOpacity: 0.95
    })
  },
  {
    name: 'ice-aurora',
    config: new AuroraCascadeConfig({
      seed: 77777,
      keyFrames: [0, 45, 90],
      cascadeDuration: [45, 45],
      ribbonCount: 6,
      ribbonWidth: 0.14,
      flowDirection: 'radial',
      flowSpeed: 0.8,
      waveAmplitude: 0.2,
      waveFrequency: 2.5,
      colorMode: 'ice',
      particleDensity: 40,
      particleGlow: true,
      particleTrailLength: 0.4,
      fieldStrength: 0.5,
      fieldComplexity: 4,
      vortexCount: 2,
      glowIntensity: 1.5,
      fadeEdges: 0.15,
      blendMode: 'overlay',
      layerOpacity: 0.8
    })
  }
];

async function createTestLayer(width, height, hasAlpha = true) {
  // Create a gradient background with some shapes for testing
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  if (!hasAlpha) {
    // Solid background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  // Add some test shapes
  ctx.fillStyle = hasAlpha ? 'rgba(255, 255, 255, 0.5)' : '#ffffff';
  ctx.beginPath();
  ctx.arc(width * 0.3, height * 0.3, 80, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = hasAlpha ? 'rgba(100, 200, 255, 0.5)' : '#64c8ff';
  ctx.fillRect(width * 0.6, height * 0.6, 150, 150);
  
  // Add some detail
  ctx.strokeStyle = hasAlpha ? 'rgba(255, 100, 100, 0.7)' : '#ff6464';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(width * 0.1, height * 0.8);
  ctx.lineTo(width * 0.9, height * 0.2);
  ctx.stroke();
  
  const buffer = canvas.toBuffer('image/png');
  return new TestLayer(buffer);
}

async function testEffect(configName, config, outputDir) {
  console.log(`\n🌌 Testing ${configName}...`);
  
  const width = 512;
  const height = 512;
  const totalFrames = 150;
  
  // Create effect instance
  const effect = new AuroraCascadeEffect({
    config,
    settings: { width, height }
  });
  
  // Test with transparent layer
  console.log('  Creating test layer with alpha...');
  const layerWithAlpha = await createTestLayer(width, height, true);
  
  // Test with opaque layer
  const layerOpaque = await createTestLayer(width, height, false);
  
  // Create output directory
  const testOutputDir = path.join(outputDir, configName);
  fs.mkdirSync(testOutputDir, { recursive: true });
  
  // Test key frames
  const testFrames = [
    ...config.keyFrames,
    config.keyFrames[0] + Math.floor(config.cascadeDuration[0] / 2),
    config.keyFrames[1] + Math.floor(config.cascadeDuration[0] / 2),
    config.keyFrames[0] + config.cascadeDuration[0] - 1
  ].sort((a, b) => a - b);
  
  console.log(`  Testing frames: ${testFrames.join(', ')}`);
  
  for (const frame of testFrames) {
    if (frame >= totalFrames) continue;
    
    // Test with alpha
    const resultAlpha = await effect.invoke(layerWithAlpha, frame, totalFrames);
    const bufferAlpha = await resultAlpha.getBuffer();
    await sharp(bufferAlpha).toFile(path.join(testOutputDir, `frame-${String(frame).padStart(3, '0')}-alpha.png`));
    
    // Test with opaque
    const resultOpaque = await effect.invoke(layerOpaque, frame, totalFrames);
    const bufferOpaque = await resultOpaque.getBuffer();
    await sharp(bufferOpaque).toFile(path.join(testOutputDir, `frame-${String(frame).padStart(3, '0')}-opaque.png`));
  }
  
  console.log(`  ✅ Saved test frames to ${testOutputDir}`);
  
  // Test perfect loop
  console.log('  Testing perfect loop...');
  if (config.keyFrames.length > 0) {
    const startFrame = config.keyFrames[0];
    const endFrame = startFrame + config.cascadeDuration[0];
    
    const resultStart = await effect.invoke(layerWithAlpha, startFrame, totalFrames);
    const resultEnd = await effect.invoke(layerWithAlpha, endFrame, totalFrames);
    
    const bufferStart = await resultStart.getBuffer();
    const bufferEnd = await resultEnd.getBuffer();
    
    // These should be identical for perfect loop
    await sharp(bufferStart).toFile(path.join(testOutputDir, 'loop-start.png'));
    await sharp(bufferEnd).toFile(path.join(testOutputDir, 'loop-end.png'));
    
    console.log('  ✅ Loop test frames saved');
  }
  
  // Test serialization
  console.log('  Testing serialization...');
  const json = config.toJSON();
  const reconstructed = AuroraCascadeConfig.fromJSON(json);
  const jsonReconstructed = reconstructed.toJSON();
  
  const isEqual = JSON.stringify(json) === JSON.stringify(jsonReconstructed);
  console.log(`  ${isEqual ? '✅' : '❌'} Serialization ${isEqual ? 'successful' : 'failed'}`);
  
  if (!isEqual) {
    console.log('  Original:', JSON.stringify(json, null, 2));
    console.log('  Reconstructed:', JSON.stringify(jsonReconstructed, null, 2));
  }
}

async function runTests() {
  console.log('🚀 Aurora Cascade Effect Test Suite');
  console.log('=====================================');
  
  const outputDir = path.join(__dirname, '..', 'test-output', 'aurora-cascade');
  fs.mkdirSync(outputDir, { recursive: true });
  
  // Run tests for each configuration
  for (const { name, config } of testConfigs) {
    await testEffect(name, config, outputDir);
  }
  
  console.log('\n✨ All tests completed!');
  console.log(`📁 Output saved to: ${outputDir}`);
}

// Run the tests
runTests().catch(console.error);