#!/usr/bin/env node

/**
 * PrismaticShatter Effect Demo
 * 
 * Demonstrates the Prismatic Shatter effect with various configurations.
 * Creates sample outputs showing crystalline light refraction effects.
 */

import { PrismaticShatterEffect } from './PrismaticShatterEffect.js';
import { PrismaticShatterConfig } from './PrismaticShatterConfig.js';
import { createCanvas } from 'canvas';
import fs from 'fs/promises';
import path from 'path';

/**
 * Create a test pattern canvas
 */
function createTestPattern(width, height) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Create colorful gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#ff006e');
  gradient.addColorStop(0.25, '#8338ec');
  gradient.addColorStop(0.5, '#3a86ff');
  gradient.addColorStop(0.75, '#06ffa5');
  gradient.addColorStop(1, '#ffbe0b');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add geometric shapes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 3;
  
  // Draw circles
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 50 + i * 30, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  // Draw radial lines
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(
      width / 2 + Math.cos(angle) * 200,
      height / 2 + Math.sin(angle) * 200
    );
    ctx.stroke();
  }
  
  // Add text
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PRISMATIC', width / 2, height / 2 - 30);
  ctx.fillText('SHATTER', width / 2, height / 2 + 30);
  
  return { canvas };
}

/**
 * Demo configurations showcasing different aspects
 */
const demoConfigs = {
  // Classic diamond refraction
  diamond: {
    shardCount: 8,
    refractionIndex: 2.4,
    chromaticDispersion: 0.9,
    spectralWidth: 30,
    primarySpectrumColor: '#ff0000',
    secondarySpectrumColor: '#0000ff',
    glowColor: '#ffffff',
    lightIntensity: 1.0,
    bloomIntensity: 0.8
  },
  
  // Subtle glass effect
  glass: {
    shardCount: 15,
    refractionIndex: 1.5,
    chromaticDispersion: 0.3,
    spectralWidth: 10,
    rotationSpeedX: 0.1,
    rotationSpeedY: 0.1,
    rotationSpeedZ: 0.1,
    fogDensity: 0.2,
    bloomIntensity: 0.3
  },
  
  // Psychedelic prism
  psychedelic: {
    shardCount: 20,
    refractionIndex: 1.8,
    chromaticDispersion: 1.0,
    spectralWidth: 40,
    primarySpectrumColor: '#ff00ff',
    secondarySpectrumColor: '#00ffff',
    glowColor: '#ffff00',
    fogColor: '#ff00ff',
    rotationSpeedX: 1.5,
    rotationSpeedY: 1.2,
    rotationSpeedZ: 1.8,
    lightIntensity: 1.0,
    rayCount: 5,
    bloomIntensity: 1.0
  },
  
  // Crystal cave
  crystal: {
    shardCount: 10,
    shardSizeVariance: 0.8,
    shardDepthRange: 200,
    refractionIndex: 2.0,
    chromaticDispersion: 0.6,
    primarySpectrumColor: '#00ffff',
    secondarySpectrumColor: '#ff00ff',
    fogColor: '#0066ff',
    fogDensity: 0.5,
    orbitRadius: 80,
    floatAmplitude: 20,
    lightAngle: 225,
    lightIntensity: 0.9,
    rayLength: 200
  },
  
  // Minimal elegant
  minimal: {
    shardCount: 5,
    shardSizeVariance: 0.2,
    refractionIndex: 1.6,
    chromaticDispersion: 0.4,
    spectralWidth: 15,
    rotationSpeedX: 0.2,
    rotationSpeedY: 0.3,
    rotationSpeedZ: 0.1,
    orbitRadius: 30,
    floatAmplitude: 5,
    lightIntensity: 0.4,
    rayCount: 2,
    bloomIntensity: 0.2,
    fogDensity: 0.1,
    shardBlendMode: 'overlay'
  }
};

/**
 * Generate a single frame
 */
async function generateFrame(effect, layer, frameNumber, totalFrames, outputPath) {
  const result = await effect.invoke(layer, frameNumber, totalFrames);
  
  if (result?.canvas) {
    const buffer = result.canvas.toBuffer('image/png');
    await fs.writeFile(outputPath, buffer);
    console.log(`  ✓ Generated: ${outputPath}`);
  }
}

/**
 * Main demo function
 */
async function runDemo() {
  console.log('🎨 PrismaticShatter Effect Demo\n');
  console.log('Generating sample outputs...\n');
  
  const width = 512;
  const height = 512;
  const outputDir = path.join(process.cwd(), 'test-output', 'prismatic-shatter');
  
  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });
  
  // Create test pattern
  const testLayer = createTestPattern(width, height);
  
  // Generate samples for each configuration
  for (const [name, configOverrides] of Object.entries(demoConfigs)) {
    console.log(`\n📐 Generating "${name}" variant...`);
    
    // Create config and effect
    const config = new PrismaticShatterConfig(configOverrides);
    const effect = new PrismaticShatterEffect({
      config,
      settings: { width, height }
    });
    
    // Generate static frame
    const staticPath = path.join(outputDir, `${name}-static.png`);
    await generateFrame(effect, testLayer, 0, 1, staticPath);
    
    // Generate animation frames
    const animDir = path.join(outputDir, name);
    await fs.mkdir(animDir, { recursive: true });
    
    const frameCount = 30; // 30 frames for smooth animation
    console.log(`  Generating ${frameCount} animation frames...`);
    
    for (let i = 0; i < frameCount; i++) {
      const framePath = path.join(animDir, `frame-${String(i).padStart(3, '0')}.png`);
      await generateFrame(effect, testLayer, i, frameCount, framePath);
    }
    
    console.log(`  ✓ Animation frames saved to: ${animDir}`);
  }
  
  // Generate comparison grid
  console.log('\n📊 Generating comparison grid...');
  const gridCanvas = createCanvas(width * 3, height * 2);
  const gridCtx = gridCanvas.getContext('2d');
  
  let gridX = 0;
  let gridY = 0;
  
  for (const [name, configOverrides] of Object.entries(demoConfigs)) {
    const config = new PrismaticShatterConfig(configOverrides);
    const effect = new PrismaticShatterEffect({
      config,
      settings: { width, height }
    });
    
    const result = await effect.invoke(testLayer, 15, 30); // Mid-animation frame
    
    if (result?.canvas) {
      gridCtx.drawImage(result.canvas, gridX * width, gridY * height);
      
      // Add label
      gridCtx.font = 'bold 20px Arial';
      gridCtx.fillStyle = 'white';
      gridCtx.strokeStyle = 'black';
      gridCtx.lineWidth = 3;
      gridCtx.strokeText(name, gridX * width + 10, gridY * height + 30);
      gridCtx.fillText(name, gridX * width + 10, gridY * height + 30);
      
      gridX++;
      if (gridX >= 3) {
        gridX = 0;
        gridY++;
      }
    }
  }
  
  const gridPath = path.join(outputDir, 'comparison-grid.png');
  const gridBuffer = gridCanvas.toBuffer('image/png');
  await fs.writeFile(gridPath, gridBuffer);
  console.log(`  ✓ Comparison grid saved to: ${gridPath}`);
  
  // Save configuration reference
  const configPath = path.join(outputDir, 'configurations.json');
  await fs.writeFile(configPath, JSON.stringify(demoConfigs, null, 2));
  console.log(`  ✓ Configuration reference saved to: ${configPath}`);
  
  console.log('\n✨ Demo complete!');
  console.log(`📁 All outputs saved to: ${outputDir}`);
  console.log('\n💡 Tips:');
  console.log('  - Use an image viewer to see the static results');
  console.log('  - Use an animation tool to create GIFs from the frame sequences');
  console.log('  - Try combining with other effects for unique results');
  console.log('  - Adjust configurations in configurations.json for experimentation');
}

// Run demo
runDemo().catch(console.error);