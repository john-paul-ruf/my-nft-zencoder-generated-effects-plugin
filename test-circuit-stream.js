import { CircuitStreamEffect } from './src/effects/primaryEffects/CircuitStream/CircuitStreamEffect.js';
import { CircuitStreamConfig } from './src/effects/primaryEffects/CircuitStream/CircuitStreamConfig.js';
import { Settings } from 'my-nft-gen/src/core/Settings.js';
import { LayerFactory } from 'my-nft-gen/src/core/factory/layer/LayerFactory.js';

async function testCircuitStream() {
    console.log('=== Testing CircuitStream Effect ===');

    // Create settings
    const settings = new Settings({
        width: 1024,
        height: 1024,
    });

    // Create config with defaults
    const config = new CircuitStreamConfig({});

    console.log('Config values:', {
        gridColumns: config.gridColumns,
        gridRows: config.gridRows,
        nodeCount: config.nodeCount,
        packetCount: config.packetCount,
        traceDensity: config.traceDensity,
        showBackgroundGrid: config.showBackgroundGrid
    });

    // Create effect
    const effect = new CircuitStreamEffect({
        config,
        settings
    });

    // Create a layer
    const layer = await LayerFactory.getLayer(settings.width, settings.height);

    // Run the effect
    console.log('\n=== Running effect ===');
    await effect.invoke(layer, 0, 100);

    console.log('\n=== Effect complete ===');

    // Save the result
    await layer.toFile('test-circuit-output.png');
    console.log('Output saved to test-circuit-output.png');
}

testCircuitStream().catch(console.error);