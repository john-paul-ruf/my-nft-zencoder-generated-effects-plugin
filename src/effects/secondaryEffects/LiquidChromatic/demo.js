import { LiquidChromaticEffect } from './LiquidChromaticEffect.js';
import { LiquidChromaticConfig } from './LiquidChromaticConfig.js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Mock Layer class for demo purposes
class MockLayer {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
  }
  
  getImage() {
    return this.image;
  }
  
  getWidth() {
    return this.width;
  }
  
  getHeight() {
    return this.height;
  }
  
  async getInfo() {
    return {
      width: this.width,
      height: this.height,
      channels: 4
    };
  }
  
  async toBuffer() {
    return await this.image.png().toBuffer();
  }
}

/**
 * Demo Script for LiquidChromatic Effect
 * Generates sample animations with different presets
 */

console.log('🌊 LiquidChromatic Effect Demo\n');

const OUTPUT_DIR = './output/liquid-chromatic-demo';
const WIDTH = 512;
const HEIGHT = 512;
const TOTAL_FRAMES = 30;

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Create a test image with interesting patterns
 */
async function createTestImage() {
  const buffer = Buffer.alloc(WIDTH * HEIGHT * 4);
  
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const idx = (y * WIDTH + x) * 4;
      
      // Create a radial gradient with some patterns
      const cx = WIDTH / 2;
      const cy = HEIGHT / 2;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      
      // Radial pattern
      const radial = Math.sin(dist * 0.05) * 127 + 128;
      
      // Angular pattern
      const angular = Math.sin(angle * 5) * 127 + 128;
      
      // Grid pattern
      const grid = (Math.sin(x * 0.1) * Math.sin(y * 0.1)) * 127 + 128;
      
      buffer[idx] = radial;
      buffer[idx + 1] = angular;
      buffer[idx + 2] = grid;
      buffer[idx + 3] = 255;
    }
  }
  
  return await sharp(buffer, {
    raw: { width: WIDTH, height: HEIGHT, channels: 4 }
  }).png().toBuffer();
}

/**
 * Render animation with given config
 */
async function renderAnimation(name, config, frames = TOTAL_FRAMES) {
  console.log(`\n🎬 Rendering "${name}" preset...`);
  
  const effect = new LiquidChromaticEffect({
    config,
    settings: { width: WIDTH, height: HEIGHT }
  });
  
  const testImage = await createTestImage();
  const presetDir = path.join(OUTPUT_DIR, name.toLowerCase().replace(/\s+/g, '-'));
  
  if (!fs.existsSync(presetDir)) {
    fs.mkdirSync(presetDir, { recursive: true });
  }
  
  for (let frame = 0; frame < frames; frame++) {
    const image = sharp(testImage);
    const layer = new MockLayer(image, WIDTH, HEIGHT);
    
    const resultLayer = await effect.invoke(layer, frame, frames);
    
    const outputBuffer = await resultLayer.getImage().png().toBuffer();
    const outputPath = path.join(presetDir, `frame-${String(frame).padStart(4, '0')}.png`);
    
    fs.writeFileSync(outputPath, outputBuffer);
    
    const progress = ((frame + 1) / frames * 100).toFixed(1);
    process.stdout.write(`\r   Progress: ${progress}%`);
  }
  
  console.log('\n   ✅ Complete!');
  console.log(`   📁 Output: ${presetDir}`);
}

/**
 * Main demo execution
 */
async function main() {
  try {
    // Preset 1: Oil Slick
    await renderAnimation('Oil Slick', new LiquidChromaticConfig({
      flowSpeed: 0.5,
      viscosity: 0.8,
      chromaticSeparation: 15,
      iridescenceIntensity: 0.9,
      primaryHue: 280,
      hueShiftRange: 120,
      waveAmplitude: 25,
      surfaceTension: 0.5
    }));
    
    // Preset 2: Liquid Metal
    await renderAnimation('Liquid Metal', new LiquidChromaticConfig({
      flowSpeed: 1.5,
      viscosity: 0.3,
      specularHighlights: 0.9,
      saturationBoost: 0.2,
      surfaceTension: 0.7,
      contrastBoost: 0.6,
      chromaticSeparation: 8,
      waveAmplitude: 30
    }));
    
    // Preset 3: Psychedelic Flow
    await renderAnimation('Psychedelic Flow', new LiquidChromaticConfig({
      flowSpeed: 2.0,
      turbulence: 0.8,
      chromaticSeparation: 25,
      iridescenceIntensity: 1.0,
      hueShiftRange: 180,
      shimmerSpeed: 2.5,
      waveAmplitude: 35,
      rotationSpeed: 1.0
    }));
    
    // Preset 4: Gentle Waves
    await renderAnimation('Gentle Waves', new LiquidChromaticConfig({
      flowSpeed: 0.8,
      viscosity: 0.6,
      waveFrequency1: 1.0,
      waveFrequency2: 1.5,
      waveFrequency3: 0.8,
      waveAmplitude: 15,
      chromaticSeparation: 5,
      iridescenceIntensity: 0.3,
      effectIntensity: 0.6
    }));
    
    // Preset 5: Chromatic Storm
    await renderAnimation('Chromatic Storm', new LiquidChromaticConfig({
      flowSpeed: 2.5,
      turbulence: 1.0,
      chromaticSeparation: 30,
      chromaticFlow: 2.0,
      trailLength: 0.8,
      waveAmplitude: 40,
      pulseFrequency: 3.0,
      effectIntensity: 1.0
    }));
    
    console.log('\n🎉 Demo complete!');
    console.log(`\n📊 Summary:`);
    console.log(`   Total presets: 5`);
    console.log(`   Frames per preset: ${TOTAL_FRAMES}`);
    console.log(`   Resolution: ${WIDTH}x${HEIGHT}`);
    console.log(`   Output directory: ${OUTPUT_DIR}`);
    console.log('\n💡 Tip: Use ffmpeg to create videos from frames:');
    console.log(`   ffmpeg -framerate 30 -i ${OUTPUT_DIR}/oil-slick/frame-%04d.png -c:v libx264 -pix_fmt yuv420p oil-slick.mp4`);
    
  } catch (error) {
    console.error('\n❌ Demo failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();