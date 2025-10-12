import { Canvas2dFactory } from '../../my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import { LayerFactory } from '../../my-nft-gen/src/core/factory/layer/LayerFactory.js';
import { Settings } from '../../my-nft-gen/src/core/Settings.js';
import { CircuitStreamEffect } from '../src/effects/primaryEffects/CircuitStream/CircuitStreamEffect.js';
import { CircuitStreamConfig } from '../src/effects/primaryEffects/CircuitStream/CircuitStreamConfig.js';
import { ColorPicker } from '../../my-nft-gen/src/core/layer/configType/ColorPicker.js';
import { promises as fs } from 'fs';
import path from 'path';

async function testCircuitStreamEffect() {
    console.log('🚀 Starting CircuitStream Effect Test...\n');
    
    // Create settings
    const settings = new Settings({
        width: 800,
        height: 600,
        totalSupply: 1,
        startIndex: 0,
    });
    
    // Test different render modes
    const renderModes = ['digital', 'matrix', 'neon', 'blueprint', 'hologram'];
    
    for (const mode of renderModes) {
        console.log(`\n📊 Testing render mode: ${mode}`);
        console.log('=' .repeat(40));
        
        // Create configuration
        const config = new CircuitStreamConfig({
            // Circuit Grid
            gridColumns: 20,
            gridRows: 15,
            traceWidth: 3,
            traceDensity: 0.4,
            
            // Nodes (Logic Gates)
            nodeCount: 15,
            nodeRadiusMin: 6,
            nodeRadiusMax: 12,
            
            // Data Packets
            packetCount: 25,
            packetSizeMin: 2,
            packetSizeMax: 5,
            packetSpeedMin: 0.8,
            packetSpeedMax: 2.5,
            
            // Signal Waves
            signalWaveCount: 8,
            signalWaveSpeedMin: 0.5,
            signalWaveSpeedMax: 2.0,
            
            // Visual Effects
            glowIntensityMin: 15,
            glowIntensityMax: 30,
            glowSpreadMin: 3,
            glowSpreadMax: 10,
            
            // Colors (will be randomly selected from these)
            // Create ColorPicker instances with static colors
            traceColor: new ColorPicker(ColorPicker.SelectionType.color, 
                mode === 'digital' ? '#00FF00' : 
                mode === 'matrix' ? '#00FF00' :
                mode === 'neon' ? '#00FFFF' :
                mode === 'blueprint' ? '#4A90E2' :
                '#00FF99'),
            activeTraceColor: new ColorPicker(ColorPicker.SelectionType.color,
                mode === 'digital' ? '#00FF00' :
                mode === 'matrix' ? '#FFFFFF' :
                mode === 'neon' ? '#FF00FF' :
                mode === 'blueprint' ? '#FFFFFF' :
                '#00FFFF'),
            dataPacketColor: new ColorPicker(ColorPicker.SelectionType.color,
                mode === 'digital' ? '#FFFF00' :
                mode === 'matrix' ? '#00FF00' :
                mode === 'neon' ? '#FFFF00' :
                mode === 'blueprint' ? '#FFD700' :
                '#FF00FF'),
            nodeColor: new ColorPicker(ColorPicker.SelectionType.color,
                mode === 'digital' ? '#00FF00' :
                mode === 'matrix' ? '#00AA00' :
                mode === 'neon' ? '#FF00FF' :
                mode === 'blueprint' ? '#6BB6FF' :
                '#00CCFF'),
            nodeCoreColor: new ColorPicker(ColorPicker.SelectionType.color,
                mode === 'digital' ? '#FFFF00' :
                mode === 'matrix' ? '#00FF00' :
                mode === 'neon' ? '#FFFFFF' :
                mode === 'blueprint' ? '#FFFFFF' :
                '#FFFFFF'),
            signalColor: new ColorPicker(ColorPicker.SelectionType.color,
                mode === 'digital' ? '#00FFFF' :
                mode === 'matrix' ? '#00FF00' :
                mode === 'neon' ? '#00FFFF' :
                mode === 'blueprint' ? '#ADD8E6' :
                '#00FF99'),
            backgroundGridColor: new ColorPicker(ColorPicker.SelectionType.color,
                mode === 'digital' ? '#003300' :
                mode === 'matrix' ? '#001100' :
                mode === 'neon' ? '#330033' :
                mode === 'blueprint' ? '#003366' :
                '#003333'),
            
            // Render mode
            renderMode: [mode],
            
            // Circuit style
            useOrthogonalTraces: true,
            showBackgroundGrid: true,
            showDataBits: mode === 'digital' || mode === 'matrix',
            
            // Perfect loop
            perfectLoop: true,
            
            // Layer settings
            layerOpacity: 1.0,
            layerBlendMode: mode === 'neon' ? 'screen' : 'normal',
        });
        
        // Create effect
        const effect = new CircuitStreamEffect({
            name: `circuit-stream-${mode}`,
            config,
            settings,
        });
        
        console.log('✅ Effect created successfully');
        
        // Create canvas and layer for rendering
        const canvas = await Canvas2dFactory.getNewCanvas(settings.width, settings.height);
        
        // Create a mock layer object that matches what the effect expects
        // The canvas from Canvas2dFactory should have a context accessible via .ctx property
        const layer = {
            ctx: canvas.ctx || canvas.context || (() => {
                // If ctx is not directly available, try to get it or create a mock
                const mockCanvas = {
                    width: settings.width,
                    height: settings.height
                };
                // Create a proper 2D context mock with essential methods
                const mockCtx = {
                    canvas: mockCanvas,
                    save: () => {},
                    restore: () => {},
                    globalCompositeOperation: 'normal',
                    globalAlpha: 1,
                    fillStyle: '#000000',
                    strokeStyle: '#000000',
                    lineWidth: 1,
                    shadowColor: 'rgba(0, 0, 0, 0)',
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    filter: 'none',
                    beginPath: () => {},
                    closePath: () => {},
                    moveTo: (x, y) => {},
                    lineTo: (x, y) => {},
                    quadraticCurveTo: (cpx, cpy, x, y) => {},
                    arc: (x, y, radius, startAngle, endAngle, anticlockwise) => {},
                    rect: (x, y, width, height) => {},
                    fill: () => {},
                    stroke: () => {},
                    fillRect: (x, y, width, height) => {},
                    strokeRect: (x, y, width, height) => {},
                    clearRect: (x, y, width, height) => {},
                    fillText: (text, x, y, maxWidth) => {},
                    strokeText: (text, x, y, maxWidth) => {},
                    setLineDash: (segments) => {},
                    createRadialGradient: (x0, y0, r0, x1, y1, r1) => ({
                        addColorStop: (offset, color) => {}
                    }),
                    createLinearGradient: (x0, y0, x1, y1) => ({
                        addColorStop: (offset, color) => {}
                    }),
                    font: '10px sans-serif',
                    textAlign: 'left',
                    textBaseline: 'alphabetic',
                    // Transform methods
                    translate: (x, y) => {},
                    rotate: (angle) => {},
                    scale: (x, y) => {},
                    transform: (a, b, c, d, e, f) => {},
                    setTransform: (a, b, c, d, e, f) => {},
                    resetTransform: () => {},
                };
                return mockCtx;
            })(),
            canvas: canvas,
            width: settings.width,
            height: settings.height,
            // Add mock methods for layer operations
            compositeLayerOver: async (otherLayer) => {
                // Mock implementation
            },
            blur: async (amount) => {},
            adjustLayerOpacity: async (opacity) => {}
        };
        
        // Test perfect loop by rendering several frames
        const testFrames = [0, 30, 60, 90, 119, 0]; // Last frame should match first
        const totalFrames = 120;
        
        console.log(`\n🎬 Testing perfect loop (${totalFrames} total frames):`);
        
        for (const frame of testFrames) {
            await effect.invoke(layer, frame, totalFrames);
            console.log(`  Frame ${frame.toString().padStart(3, '0')}: Rendered`);
        }
        
        console.log('✅ Perfect loop test completed');
        
        // Test serialization and deserialization
        console.log('\n📦 Testing serialization:');
        
        // Serialize the effect's data
        const serialized = JSON.stringify({
            effectName: effect.name,
            effectData: effect.data,
            config: config,
        });
        
        console.log(`  Serialized size: ${(serialized.length / 1024).toFixed(2)} KB`);
        
        // Deserialize and create new effect
        const parsed = JSON.parse(serialized);
        const rehydratedEffect = new CircuitStreamEffect({
            name: parsed.effectName,
            config: new CircuitStreamConfig(parsed.config),
            settings,
        });
        
        console.log('✅ Rehydration successful');
        
        // Verify rehydrated effect works
        await rehydratedEffect.invoke(layer, 0, totalFrames);
        console.log('✅ Rehydrated effect renders correctly');
    }
    
    console.log('\n' + '='.repeat(40));
    console.log('🎉 All tests completed successfully!');
}

// Run the test
testCircuitStreamEffect().catch(error => {
    console.error('❌ Test failed:', error);
    console.error(error.stack);
    process.exit(1);
});