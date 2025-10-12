// Quick test runner for Tactical Pulse Grid effect
import { TacticalPulseGridEffect, TacticalPulseGridConfig } from '../src/effects/keyframeEffects/TacticalPulseGrid/index.js';
import { createCanvas } from 'canvas';
import fs from 'fs/promises';

async function quickTest() {
  console.log('🎯 Quick Tactical Pulse Grid Test\n');
  
  // Create a simple test layer
  const width = 512;
  const height = 512;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Draw a simple gradient background
  const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
  gradient.addColorStop(0, 'rgba(100, 0, 200, 0.8)');
  gradient.addColorStop(1, 'rgba(0, 100, 200, 0.4)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add some test content
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = 'bold 48px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('TARGET', width/2, height/2);
  
  const testLayer = {
    buffer: canvas.toBuffer('image/png'),
    name: 'test-layer'
  };
  
  // Create effect with minimal config
  const config = new TacticalPulseGridConfig({
    seed: 1337,
    keyFrames: [0, 30, 60],
    pulseDuration: [20, 30],
    gridMode: 'hexagonal',
    pulseMode: 'radial',
    reticleCount: 2,
    gridColor: '#00FF41',
    pulseColor: '#00FFFF',
    reticleColor: '#FF0040',
    showDataStream: true
  });
  
  const effect = new TacticalPulseGridEffect({
    config,
    settings: { width, height }
  });
  
  console.log('Config:', JSON.stringify(config.toJSON(), null, 2));
  console.log('\nProcessing frames...');
  
  // Test a few frames
  const testFrames = [0, 5, 10, 15, 20, 25, 30, 35];
  
  for (const frame of testFrames) {
    const result = await effect.invoke(testLayer, frame, 90);
    if (result?.buffer) {
      const filename = `test-output/tactical-pulse-quick/frame_${frame.toString().padStart(3, '0')}.png`;
      await fs.mkdir('test-output/tactical-pulse-quick', { recursive: true });
      await fs.writeFile(filename, result.buffer);
      console.log(`✅ Frame ${frame} processed`);
    } else {
      console.log(`⚠️ Frame ${frame} - no active window`);
    }
  }
  
  console.log('\n✨ Test complete! Check test-output/tactical-pulse-quick/');
}

quickTest().catch(console.error);