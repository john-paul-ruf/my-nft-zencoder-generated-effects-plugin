#!/usr/bin/env node
import {Canvas2dFactory} from '../../my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import {Settings} from '../../my-nft-gen/src/core/Settings.js';
import {CircuitStreamEffect} from '../src/effects/primaryEffects/CircuitStream/CircuitStreamEffect.js';
import {CircuitStreamConfig} from '../src/effects/primaryEffects/CircuitStream/CircuitStreamConfig.js';
import {ColorPicker} from '../../my-nft-gen/src/core/layer/configType/ColorPicker.js';
import fs from 'fs/promises';
import path from 'path';

console.log('🔧 Testing CircuitStream Perfect Loop...\n');

// Test parameters
const width = 512;
const height = 512;
const totalFrames = 60; // 60 frames for 2 second loop at 30fps
const testFrames = [0, 15, 30, 45, 59]; // Test key frames including last frame

// Create output directory
const outputDir = './test-output/circuit-stream-loop';
await fs.mkdir(outputDir, { recursive: true });

// Create configuration with perfect loop enabled
const config = new CircuitStreamConfig({
    // Enable perfect looping
    perfectLoop: true,
    
    // Circuit layout
    traceDensity: 0.7,
    traceWidth: 2,
    useOrthogonalTraces: true,
    
    // Data packets - key animation to test
    packetCount: 12,
    packetSizeMin: 3,
    packetSizeMax: 5,
    packetSpeedMin: 1, // Will be rounded to 1 cycle for perfect loop
    packetSpeedMax: 3, // Will be rounded to 3 cycles for perfect loop
    packetGlowRadiusMin: 8,
    packetGlowRadiusMax: 12,
    
    // Nodes
    nodeCount: 8,
    nodeRadiusMin: 6,
    nodeRadiusMax: 10,
    nodePulseIntensityMin: 0.5,
    nodePulseIntensityMax: 1,
    gateBlinkFrequencyMin: 1,
    gateBlinkFrequencyMax: 2,
    
    // Energy flow
    energyFlowSpeedMin: 1,
    energyFlowSpeedMax: 2,
    energyPulseFrequencyMin: 1,
    energyPulseFrequencyMax: 3,
    
    // Signal waves
    signalWaveCount: 3,
    signalWaveSpeedMin: 1,
    signalWaveSpeedMax: 2,
    
    // Colors
    traceColor: new ColorPicker({ value: '#00FF88' }),
    activeTraceColor: new ColorPicker({ value: '#00FFFF' }),
    dataPacketColor: new ColorPicker({ value: '#FFD700' }), // Gold packets for visibility
    nodeColor: new ColorPicker({ value: '#FF00FF' }),
    nodeCoreColor: new ColorPicker({ value: '#FFFF00' }),
    signalColor: new ColorPicker({ value: '#00AAFF' }),
    
    // Effects
    glowIntensityMin: 10,
    glowIntensityMax: 15,
    showBackgroundGrid: true,
    backgroundGridColor: new ColorPicker({ value: '#003333' }),
});

// Initialize effect
const settings = new Settings({ width, height, format: 'png' });
const effect = new CircuitStreamEffect({
    config,
    settings
});

console.log('🎬 Generating test frames to verify perfect loop...');

// Generate test frames
for (const frameNumber of testFrames) {
    console.log(`\n📸 Frame ${frameNumber}/${totalFrames - 1}`);
    
    // Create canvas for this frame
    const canvas = await Canvas2dFactory.getNewCanvas(width, height);
    
    // Apply effect
    const outputLayer = await effect.invoke(canvas, frameNumber, totalFrames);
    
    // Save frame
    const filename = `frame_${String(frameNumber).padStart(3, '0')}.png`;
    const filepath = path.join(outputDir, filename);
    await outputLayer.toPNG(filepath);
    
    console.log(`   ✅ Saved: ${filename}`);
    
    // Compare first and last frame positions
    if (frameNumber === 0) {
        console.log('   📍 First frame - recording packet starting positions');
    } else if (frameNumber === 59) {
        console.log('   📍 Last frame - packets should be at starting positions');
        console.log('   ⚡ With perfect loop enabled, frame 59 should match frame 0');
    }
}

console.log('\n✨ Test Complete!');
console.log(`\n📂 Output saved to: ${outputDir}`);
console.log('\n🔍 Verification Steps:');
console.log('1. Compare frame_000.png with frame_059.png');
console.log('2. Packet positions should be identical (perfect loop)');
console.log('3. Check that packets complete integer cycles (1, 2, or 3)');
console.log('4. All animations should seamlessly loop without jumps');
console.log('\n💡 Tip: Use an image viewer to quickly flip between first and last frame');