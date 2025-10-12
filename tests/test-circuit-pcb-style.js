import {CircuitStreamEffect} from '../src/effects/primaryEffects/CircuitStream/CircuitStreamEffect.js';
import {CircuitStreamConfig} from '../src/effects/primaryEffects/CircuitStream/CircuitStreamConfig.js';
import {Settings} from 'my-nft-gen/src/core/Settings.js';
import {Layer} from 'my-nft-gen/src/core/layer/Layer.js';
import {ColorPicker} from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

/**
 * Test CircuitStream effect with PCB-style appearance
 * This demonstrates the realistic circuit board look with:
 * - Component pads (circular, square, rounded)
 * - Via holes
 * - IC chip footprints
 * - Curved traces
 * - Variable trace widths (power vs signal lines)
 */

async function testCircuitPCBStyle() {
    console.log('🔌 Testing CircuitStream with PCB Style...\n');

    // Create settings
    const settings = new Settings({
        width: 1024,
        height: 1024,
        totalFrames: 60,
        fps: 30,
        outputDir: './output/circuit-pcb-test',
        outputName: 'circuit-pcb',
        colorBuckets: [
            ['#00FF41', '#00D936', '#00B32C'], // Green traces (classic PCB)
            ['#FFD700', '#FFA500', '#FF8C00'], // Gold pads
            ['#4169E1', '#1E90FF', '#00BFFF'], // Blue signals
            ['#FF1493', '#FF69B4', '#FFB6C1'], // Pink accents
            ['#FFFFFF', '#E0E0E0', '#C0C0C0'], // White/silver
        ],
    });

    // Create PCB-style config
    const config = new CircuitStreamConfig({
        // Enable PCB features
        usePCBStyle: true,
        showComponentPads: true,
        showVias: true,
        showICFootprints: true,
        useCurvedTraces: true,
        
        // Trace styling
        traceWidth: 4,
        traceWidthVariation: 0.6, // High variation for power vs signal lines
        traceCurvature: 0.25, // Smooth curves
        traceDensity: 0.7,
        useOrthogonalTraces: true,
        
        // Component counts
        padCount: 50,
        viaCount: 35,
        icCount: 6,
        nodeCount: 25,
        packetCount: 30,
        
        // Component sizes
        padRadiusMin: 5,
        padRadiusMax: 10,
        viaRadiusMin: 2,
        viaRadiusMax: 4,
        icSizeMin: 50,
        icSizeMax: 90,
        
        // Node styling
        nodeRadiusMin: 6,
        nodeRadiusMax: 12,
        
        // Animation
        packetSpeedMin: 0.8,
        packetSpeedMax: 1.5,
        energyPulseFrequencyMin: 0.3,
        energyPulseFrequencyMax: 0.7,
        
        // Visual effects
        glowIntensityMin: 15,
        glowIntensityMax: 25,
        glowSpreadMin: 3,
        glowSpreadMax: 6,
        blurAmountMin: 1,
        blurAmountMax: 3,
        
        // Grid
        showBackgroundGrid: false, // Turn off grid for cleaner PCB look
        
        // Colors - PCB theme
        traceColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 0), // Green
        activeTraceColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 2), // Blue
        dataPacketColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 3), // Pink
        nodeColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 1), // Gold
        nodeCoreColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 4), // White
        signalColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 2), // Blue
        padColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 1), // Gold
        viaColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 4), // Silver
        icColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 4), // White
        solderMaskColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 0), // Green
        
        // Layer composition
        layerOpacity: 1.0,
        layerBlendMode: 'screen',
        perfectLoop: true,
    });

    // Create effect
    const effect = new CircuitStreamEffect({
        config,
        settings,
    });

    console.log('✅ Effect created successfully');
    console.log(`   - PCB Style: ${config.usePCBStyle ? 'ENABLED' : 'DISABLED'}`);
    console.log(`   - Component Pads: ${config.padCount}`);
    console.log(`   - Vias: ${config.viaCount}`);
    console.log(`   - IC Chips: ${config.icCount}`);
    console.log(`   - Curved Traces: ${config.useCurvedTraces ? 'YES' : 'NO'}`);
    console.log(`   - Trace Width Variation: ${config.traceWidthVariation * 100}%`);

    // Create a blank layer
    const layer = await Layer.createBlankLayer(settings.width, settings.height);

    // Render a few frames
    console.log('\n🎬 Rendering frames...');
    const framesToRender = [0, 15, 30, 45];
    
    for (const frameNum of framesToRender) {
        console.log(`   Frame ${frameNum}/${settings.totalFrames}...`);
        const frameLayer = await Layer.createBlankLayer(settings.width, settings.height);
        await effect.invoke(frameLayer, frameNum, settings.totalFrames);
        
        // Save frame
        const outputPath = `${settings.outputDir}/frame_${String(frameNum).padStart(4, '0')}.png`;
        await frameLayer.saveToFile(outputPath);
        console.log(`   ✓ Saved: ${outputPath}`);
    }

    console.log('\n✅ PCB-style CircuitStream test complete!');
    console.log('\n📋 Summary:');
    console.log('   The effect now includes:');
    console.log('   • Component pads (circular, square, rounded)');
    console.log('   • Via holes with inner/outer rings');
    console.log('   • IC chip footprints with pins');
    console.log('   • Curved trace corners');
    console.log('   • Variable trace widths (power vs signal)');
    console.log('   • Realistic PCB appearance');
}

// Run test
testCircuitPCBStyle().catch(console.error);