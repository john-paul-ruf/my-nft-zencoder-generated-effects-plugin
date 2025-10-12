import {CircuitStreamEffect} from '../src/effects/primaryEffects/CircuitStream/CircuitStreamEffect.js';
import {CircuitStreamConfig} from '../src/effects/primaryEffects/CircuitStream/CircuitStreamConfig.js';
import {Settings} from 'my-nft-gen/src/core/Settings.js';
import {Layer} from 'my-nft-gen/src/core/layer/Layer.js';
import {ColorPicker} from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

/**
 * Comparison test: Grid Style vs PCB Style
 * Shows the difference between the old grid-like appearance
 * and the new realistic circuit board appearance
 */

async function testComparison() {
    console.log('🔬 CircuitStream: Grid Style vs PCB Style Comparison\n');

    const settings = new Settings({
        width: 1024,
        height: 1024,
        totalFrames: 60,
        fps: 30,
        outputDir: './output/circuit-comparison',
        outputName: 'comparison',
        colorBuckets: [
            ['#00FF41', '#00D936', '#00B32C'], // Green
            ['#FFD700', '#FFA500', '#FF8C00'], // Gold
            ['#4169E1', '#1E90FF', '#00BFFF'], // Blue
            ['#FF1493', '#FF69B4', '#FFB6C1'], // Pink
            ['#FFFFFF', '#E0E0E0', '#C0C0C0'], // White
        ],
    });

    // ========================================
    // 1. OLD STYLE: Grid-like appearance
    // ========================================
    console.log('📊 Creating GRID STYLE (old look)...');
    
    const gridConfig = new CircuitStreamConfig({
        usePCBStyle: false, // Disable PCB features
        showBackgroundGrid: true,
        useOrthogonalTraces: true,
        useCurvedTraces: false, // Sharp corners
        traceWidth: 6,
        traceWidthVariation: 0, // No variation
        traceDensity: 0.6,
        
        nodeCount: 20,
        packetCount: 25,
        
        traceColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 0),
        activeTraceColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 2),
        dataPacketColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 3),
        nodeColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 1),
        nodeCoreColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 4),
        backgroundGridColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 0),
        
        layerOpacity: 1.0,
        layerBlendMode: 'screen',
        perfectLoop: true,
    });

    const gridEffect = new CircuitStreamEffect({
        config: gridConfig,
        settings,
    });

    console.log('   ✓ Grid style effect created');
    console.log('     - Background grid: VISIBLE');
    console.log('     - Trace corners: SHARP (90°)');
    console.log('     - Trace widths: UNIFORM');
    console.log('     - PCB components: NONE');

    // ========================================
    // 2. NEW STYLE: PCB-like appearance
    // ========================================
    console.log('\n🔌 Creating PCB STYLE (new look)...');
    
    const pcbConfig = new CircuitStreamConfig({
        usePCBStyle: true, // Enable PCB features
        showComponentPads: true,
        showVias: true,
        showICFootprints: true,
        useCurvedTraces: true, // Smooth curves
        showBackgroundGrid: false, // Hide grid
        useOrthogonalTraces: true,
        
        traceWidth: 4,
        traceWidthVariation: 0.6, // Variable widths
        traceCurvature: 0.25,
        traceDensity: 0.7,
        
        padCount: 50,
        viaCount: 35,
        icCount: 6,
        nodeCount: 25,
        packetCount: 30,
        
        padRadiusMin: 5,
        padRadiusMax: 10,
        viaRadiusMin: 2,
        viaRadiusMax: 4,
        icSizeMin: 50,
        icSizeMax: 90,
        
        traceColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 0),
        activeTraceColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 2),
        dataPacketColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 3),
        nodeColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 1),
        nodeCoreColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 4),
        padColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 1),
        viaColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 4),
        icColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 4),
        
        layerOpacity: 1.0,
        layerBlendMode: 'screen',
        perfectLoop: true,
    });

    const pcbEffect = new CircuitStreamEffect({
        config: pcbConfig,
        settings,
    });

    console.log('   ✓ PCB style effect created');
    console.log('     - Background grid: HIDDEN');
    console.log('     - Trace corners: CURVED');
    console.log('     - Trace widths: VARIABLE (power/signal)');
    console.log('     - PCB components: PADS, VIAS, ICs');

    // ========================================
    // 3. Render comparison frames
    // ========================================
    console.log('\n🎬 Rendering comparison frames...\n');
    
    const frame = 30; // Middle frame
    
    // Render grid style
    console.log('   Rendering GRID style...');
    const gridLayer = await Layer.createBlankLayer(settings.width, settings.height);
    await gridEffect.invoke(gridLayer, frame, settings.totalFrames);
    const gridPath = `${settings.outputDir}/grid_style_frame_${String(frame).padStart(4, '0')}.png`;
    await gridLayer.saveToFile(gridPath);
    console.log(`   ✓ Saved: ${gridPath}`);
    
    // Render PCB style
    console.log('   Rendering PCB style...');
    const pcbLayer = await Layer.createBlankLayer(settings.width, settings.height);
    await pcbEffect.invoke(pcbLayer, frame, settings.totalFrames);
    const pcbPath = `${settings.outputDir}/pcb_style_frame_${String(frame).padStart(4, '0')}.png`;
    await pcbLayer.saveToFile(pcbPath);
    console.log(`   ✓ Saved: ${pcbPath}`);

    // ========================================
    // 4. Summary
    // ========================================
    console.log('\n✅ Comparison test complete!\n');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 GRID STYLE (Old)          vs    🔌 PCB STYLE (New)');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('• Visible background grid    vs    • Clean PCB surface');
    console.log('• Sharp 90° corners          vs    • Smooth curved traces');
    console.log('• Uniform trace widths       vs    • Variable widths');
    console.log('• Simple nodes only          vs    • Component pads');
    console.log('• No physical components     vs    • Via holes');
    console.log('• Generic digital look       vs    • IC chip footprints');
    console.log('• Grid-like pattern          vs    • Realistic PCB layout');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('\n💡 The PCB style makes CircuitStream look like a real');
    console.log('   circuit board instead of a simple grid!');
}

// Run test
testComparison().catch(console.error);