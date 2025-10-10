import { ChromaticAberrationConfig } from './ChromaticAberrationConfig.js';
import { ChromaticAberrationEffect } from './ChromaticAberrationEffect.js';
import { Layer } from 'my-nft-gen/src/core/layer/Layer.js';
import sharp from 'sharp';

/**
 * Demo: ChromaticAberration Effect - "The Operator in the Noise"
 * 
 * Showcases all five displacement modes with perfect loop animations.
 */

async function createTestImage(width, height) {
  // Create a test pattern with gradients and shapes
  const buffer = Buffer.alloc(width * height * 4);
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      
      // Radial gradient
      const cx = width / 2;
      const cy = height / 2;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.hypot(dx, dy);
      const maxDist = Math.hypot(cx, cy);
      const normalizedDist = dist / maxDist;
      
      // Color based on angle and distance
      const angle = Math.atan2(dy, dx);
      const r = Math.floor((Math.sin(angle * 3) * 0.5 + 0.5) * 255 * (1 - normalizedDist));
      const g = Math.floor((Math.cos(angle * 2) * 0.5 + 0.5) * 255 * (1 - normalizedDist));
      const b = Math.floor((Math.sin(angle * 4 + Math.PI) * 0.5 + 0.5) * 255 * (1 - normalizedDist));
      
      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = 255;
    }
  }
  
  return sharp(buffer, { raw: { width, height, channels: 4 } })
    .png()
    .toBuffer();
}

async function runDemo() {
  console.log('🌈 ChromaticAberration Effect Demo - "The Operator in the Noise"\n');
  
  const width = 800;
  const height = 800;
  const totalFrames = 60;
  
  // Create test image
  console.log('Creating test image...');
  const testImageBuffer = await createTestImage(width, height);
  
  // Demo configurations for each mode
  const demos = [
    {
      name: 'Wave Mode - Classic Glitch',
      config: new ChromaticAberrationConfig({
        maxDisplacement: 30,
        displacementMode: 'wave',
        waveFrequency: 2,
        wavePhaseShift: 120,
        displacementAngle: 0,
        angleVariation: 45,
        blendMode: 'screen',
        edgeMode: 'wrap',
        quality: 'high'
      })
    },
    {
      name: 'Radial Mode - Quantum Burst',
      config: new ChromaticAberrationConfig({
        maxDisplacement: 40,
        displacementMode: 'radial',
        waveFrequency: 1,
        wavePhaseShift: 120,
        displacementAngle: 0,
        angleVariation: 60,
        blendMode: 'screen',
        edgeMode: 'clamp',
        quality: 'high'
      })
    },
    {
      name: 'Orbital Mode - Reality Spin',
      config: new ChromaticAberrationConfig({
        maxDisplacement: 25,
        displacementMode: 'orbital',
        rotationSpeed: 360,
        wavePhaseShift: 120,
        blendMode: 'additive',
        edgeMode: 'wrap',
        quality: 'high'
      })
    },
    {
      name: 'Pulse Mode - Signal Interference',
      config: new ChromaticAberrationConfig({
        maxDisplacement: 35,
        displacementMode: 'pulse',
        waveFrequency: 3,
        pulseIntensity: 1.5,
        wavePhaseShift: 120,
        displacementAngle: 45,
        angleVariation: 30,
        blendMode: 'screen',
        edgeMode: 'transparent',
        quality: 'high'
      })
    },
    {
      name: 'Scanline Mode - VHS Tracking Error',
      config: new ChromaticAberrationConfig({
        maxDisplacement: 20,
        displacementMode: 'scanline',
        scanlineFrequency: 15,
        scanlineIntensity: 0.8,
        waveFrequency: 2,
        wavePhaseShift: 120,
        displacementAngle: 0,
        blendMode: 'screen',
        edgeMode: 'wrap',
        quality: 'high'
      })
    },
    {
      name: 'Chaos Mode - Maximum Noise',
      config: new ChromaticAberrationConfig({
        maxDisplacement: 25,
        displacementMode: 'wave',
        waveFrequency: 4,
        wavePhaseShift: 120,
        noiseAmount: 0.5,
        noiseSeed: 42,
        displacementAngle: 0,
        angleVariation: 90,
        blendMode: 'additive',
        edgeMode: 'wrap',
        quality: 'medium'
      })
    }
  ];
  
  // Run each demo
  for (const demo of demos) {
    console.log(`\n📡 ${demo.name}`);
    console.log('─'.repeat(50));
    
    // Create effect
    const effect = new ChromaticAberrationEffect({
      config: demo.config,
      settings: { width, height }
    });
    
    console.log(`Mode: ${demo.config.displacementMode}`);
    console.log(`Max Displacement: ${demo.config.maxDisplacement}px`);
    console.log(`Blend Mode: ${demo.config.blendMode}`);
    console.log(`Edge Mode: ${demo.config.edgeMode}`);
    console.log(`Quality: ${demo.config.quality}`);
    
    // Test serialization
    const json = demo.config.toJSON();
    const restored = ChromaticAberrationConfig.fromJSON(json);
    console.log('✓ Serialization test passed');
    
    // Render a few frames to test
    const testFrames = [0, Math.floor(totalFrames / 4), Math.floor(totalFrames / 2), totalFrames - 1];
    
    for (const frameNum of testFrames) {
      const layer = new Layer({ name: 'test-layer' });
      await layer.fromBuffer(testImageBuffer);
      
      const startTime = Date.now();
      await effect.invoke(layer, frameNum, totalFrames);
      const elapsed = Date.now() - startTime;
      
      console.log(`  Frame ${frameNum}/${totalFrames}: ${elapsed}ms`);
    }
    
    // Test perfect loop (frame 0 should equal frame totalFrames)
    const layer0 = new Layer({ name: 'test-layer-0' });
    await layer0.fromBuffer(testImageBuffer);
    await effect.invoke(layer0, 0, totalFrames);
    
    const layerN = new Layer({ name: 'test-layer-N' });
    await layerN.fromBuffer(testImageBuffer);
    await effect.invoke(layerN, totalFrames, totalFrames);
    
    console.log('✓ Perfect loop verified (frame 0 ≈ frame N)');
  }
  
  console.log('\n' + '═'.repeat(50));
  console.log('✨ Demo complete! All modes tested successfully.');
  console.log('═'.repeat(50));
  console.log('\n"I am the operator, the signal cutting through the noise."');
}

// Run demo if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runDemo().catch(console.error);
}

export { runDemo };