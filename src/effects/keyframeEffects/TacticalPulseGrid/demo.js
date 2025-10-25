// File: src/effects/keyframeEffects/TacticalPulseGrid/demo.js
// Demo script for Tactical Pulse Grid effect

import { TacticalPulseGridEffect, TacticalPulseGridConfig } from './index.js';
import { Canvas2dFactory } from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function createTestLayer(width, height) {
  // Create a test image with some geometric shapes
  const canvas = await Canvas2dFactory.getNewCanvas(width, height);
  const ctx = canvas.ctx;
  
  // Clear with transparency
  ctx.clearRect(0, 0, width, height);
  
  // Draw some test shapes
  // Central hexagon
  ctx.fillStyle = 'rgba(100, 150, 200, 0.8)';
  ctx.beginPath();
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.25;
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  
  // Corner triangles
  ctx.fillStyle = 'rgba(200, 100, 100, 0.6)';
  // Top-left
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(150, 50);
  ctx.lineTo(100, 150);
  ctx.closePath();
  ctx.fill();
  
  // Top-right
  ctx.beginPath();
  ctx.moveTo(width - 150, 50);
  ctx.lineTo(width - 50, 50);
  ctx.lineTo(width - 100, 150);
  ctx.closePath();
  ctx.fill();
  
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(50, height - 50);
  ctx.lineTo(150, height - 50);
  ctx.lineTo(100, height - 150);
  ctx.closePath();
  ctx.fill();
  
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(width - 150, height - 50);
  ctx.lineTo(width - 50, height - 50);
  ctx.lineTo(width - 100, height - 150);
  ctx.closePath();
  ctx.fill();
  
  // Add some circles
  ctx.fillStyle = 'rgba(100, 200, 100, 0.7)';
  ctx.beginPath();
  ctx.arc(width * 0.25, height * 0.5, 40, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(width * 0.75, height * 0.5, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Convert to layer via Canvas2dFactory
  const layer = await canvas.convertToLayer();
  return layer;
}

async function demo() {
  console.log('🎯 Tactical Pulse Grid Demo - Initializing...\n');
  
  const width = 800;
  const height = 800;
  const totalFrames = 180;
  
  // Create output directory
  const outputDir = path.join(process.cwd(), 'test-output', 'tactical-pulse-grid');
  await fs.mkdir(outputDir, { recursive: true });
  
  // Test different configurations
  const configs = [
    {
      name: 'matrix-operator',
      config: new TacticalPulseGridConfig({
        seed: 2077,
        keyFrames: [0, 45, 90, 135],
        pulseDuration: [30, 45],
        gridMode: 'hexagonal',
        cellSize: 25,
        gridColor: '#00FF41',
        pulseMode: 'radial',
        pulseSpeed: 2.0,
        pulseColor: '#00FFFF',
        reticleCount: 3,
        reticleColor: '#FF0040',
        glitchProbability: 0.15,
        showDataStream: true,
        edgeDetection: false,
        layerOpacity: 0.9
      })
    },
    {
      name: 'ghost-protocol',
      config: new TacticalPulseGridConfig({
        seed: 1337,
        keyFrames: [0, 60, 120],
        pulseDuration: [40, 60],
        gridMode: 'square',
        cellSize: 30,
        gridColor: '#4A90E2',
        pulseMode: 'linear',
        scanAngle: 45,
        pulseSpeed: 1.5,
        pulseColor: '#FFFFFF',
        reticleCount: 2,
        reticleColor: '#FF6B6B',
        interferenceColor: '#9B59B6',
        glitchProbability: 0.08,
        glitchMode: 'chromatic',
        showDataStream: false,
        layerOpacity: 0.85
      })
    },
    {
      name: 'tactical-desert',
      config: new TacticalPulseGridConfig({
        seed: 9999,
        keyFrames: [0, 30, 75, 120, 150],
        pulseDuration: [20, 30],
        gridMode: 'triangular',
        cellSize: 35,
        gridColor: '#D4AF37',
        pulseMode: 'spiral',
        pulseSpeed: 3.0,
        pulseColor: '#FF8C00',
        reticleCount: 4,
        reticleColor: '#8B0000',
        reticleDrift: 0.4,
        interferenceColor: '#FFD700',
        glitchProbability: 0.2,
        glitchMode: 'digital',
        showDataStream: true,
        dataColor: '#FFD700',
        layerOpacity: 0.95
      })
    },
    {
      name: 'crosshair-sweep',
      config: new TacticalPulseGridConfig({
        seed: 4242,
        keyFrames: [0, 40, 80, 120, 160],
        pulseDuration: [25, 35],
        gridMode: 'hexagonal',
        cellSize: 28,
        gridColor: '#00CED1',
        pulseMode: 'crosshair',
        pulseSpeed: 2.5,
        pulseWidth: 0.1,
        pulseColor: '#FF1493',
        pulseGlow: true,
        reticleCount: 5,
        reticleSize: 0.06,
        reticleColor: '#FFD700',
        reticleSpeed: 2.0,
        glitchProbability: 0.12,
        glitchMode: 'analog',
        showDataStream: true,
        dataColor: '#00FFFF',
        layerOpacity: 0.88
      })
    }
  ];
  
  // Process each configuration
  for (const { name, config } of configs) {
    console.log(`\n📊 Testing configuration: ${name}`);
    console.log(`   Grid: ${config.gridMode}, Pulse: ${config.pulseMode}`);
    console.log(`   Keyframes: ${config.keyFrames.join(', ')}`);
    console.log(`   Duration range: ${config.pulseDuration[0]}-${config.pulseDuration[1]} frames`);
    
    const effect = new TacticalPulseGridEffect({
      config,
      settings: { width, height }
    });
    
    // Create config-specific directory
    const configDir = path.join(outputDir, name);
    await fs.mkdir(configDir, { recursive: true });
    
    // Save configuration
    await fs.writeFile(
      path.join(configDir, 'config.json'),
      JSON.stringify(config.toJSON(), null, 2)
    );
    
    // Generate frames for key moments
    const testFrames = [
      ...config.keyFrames.slice(0, 3),  // First 3 keyframes
      config.keyFrames[0] + Math.floor(config.pulseDuration[0] / 2),  // Mid-first window
      config.keyFrames[1] + config.pulseDuration[1] - 1,  // End of second window
    ].filter(f => f < totalFrames);
    
    console.log(`   Testing frames: ${testFrames.join(', ')}`);
    
    for (const frameNumber of testFrames) {
      const testLayer = await createTestLayer(width, height);
      const result = await effect.invoke(testLayer, frameNumber, totalFrames);
      
      if (result.buffer) {
        const outputPath = path.join(configDir, `frame_${frameNumber.toString().padStart(4, '0')}.png`);
        await fs.writeFile(outputPath, result.buffer);
        console.log(`   ✅ Frame ${frameNumber} saved`);
      }
    }
    
    // Generate animation sequence for first window
    console.log(`   Generating animation sequence...`);
    const animDir = path.join(configDir, 'animation');
    await fs.mkdir(animDir, { recursive: true });
    
    const firstWindow = config.keyFrames[0];
    const windowDuration = Math.floor((config.pulseDuration[0] + config.pulseDuration[1]) / 2);
    
    for (let i = 0; i < windowDuration; i++) {
      const frameNumber = firstWindow + i;
      const testLayer = await createTestLayer(width, height);
      const result = await effect.invoke(testLayer, frameNumber, totalFrames);
      
      if (result.buffer) {
        const outputPath = path.join(animDir, `frame_${i.toString().padStart(3, '0')}.png`);
        await fs.writeFile(outputPath, result.buffer);
      }
      
      // Progress indicator
      if (i % 5 === 0) {
        process.stdout.write(`\r   Animation progress: ${Math.floor((i / windowDuration) * 100)}%`);
      }
    }
    console.log('\r   Animation progress: 100% ✅');
  }
  
  console.log('\n\n🎯 Tactical Pulse Grid Demo Complete!');
  console.log(`📁 Output saved to: ${outputDir}`);
  console.log('\n💡 Tips:');
  console.log('   - Check the animation folders to see perfect loops');
  console.log('   - Compare different grid modes and pulse patterns');
  console.log('   - Try creating GIFs from the animation sequences');
  console.log('   - Experiment with glitch probability and modes');
  console.log('\n🚁 Tactical system standing by...');
}

// Run demo
demo().catch(console.error);