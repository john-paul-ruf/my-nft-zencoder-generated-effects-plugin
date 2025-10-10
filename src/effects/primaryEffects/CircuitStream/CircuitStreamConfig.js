import {EffectConfig} from 'my-nft-gen/src/core/layer/EffectConfig.js';
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";

export class CircuitStreamConfig extends EffectConfig {
    constructor({
                    // Circuit Grid Parameters
                    traceWidth = 6,
                    traceDensity = 0.6,

                    // Node Parameters
                    nodeCount = 20,
                    nodeRadiusMin = 8,
                    nodeRadiusMax = 16,

                    // Data Packet Parameters
                    packetCount = 25,
                    packetSizeMin = 4,
                    packetSizeMax = 8,
                    packetSpeedMin = 1.0,
                    packetSpeedMax = 2.0,
                    packetGlowRadiusMin = 8,
                    packetGlowRadiusMax = 16,

                    // Signal Wave Parameters
                    signalWaveCount = 8,
                    signalWaveSpeedMin = 0.8,
                    signalWaveSpeedMax = 1.5,
                    signalDecayRateMin = 0.05,
                    signalDecayRateMax = 0.15,

                    // Node Charge Animation
                    gateChargeTimeMin = 40,
                    gateChargeTimeMax = 120,
                    gateDischargeTimeMin = 20,
                    gateDischargeTimeMax = 60,

                    // Trace Pulse Animation
                    energyPulseFrequencyMin = 0.2,
                    energyPulseFrequencyMax = 0.6,

                    // Visual Style Parameters
                    traceOpacityMin = 0.3,
                    traceOpacityMax = 0.7,

                    // Glow and Blur Effects
                    glowIntensityMin = 10,
                    glowIntensityMax = 30,
                    glowSpreadMin = 2,
                    glowSpreadMax = 8,
                    blurAmountMin = 0,
                    blurAmountMax = 5,

                    // Color Configuration
                    traceColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    activeTraceColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    dataPacketColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    nodeColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    nodeCoreColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    signalColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    backgroundGridColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),

                    // Circuit Pattern Style
                    useOrthogonalTraces = true,
                    showBackgroundGrid = true,

                    // Perfect Loop Configuration
                    perfectLoop = true,

                    // Layer Composition
                    layerOpacity = 1.0,
                    layerBlendMode = 'screen',
                } = {}) {
        super();

        // Circuit Grid Parameters
        this.traceWidth = traceWidth;
        this.traceDensity = traceDensity;

        // Node Parameters
        this.nodeCount = nodeCount;
        this.nodeRadiusMin = nodeRadiusMin;
        this.nodeRadiusMax = nodeRadiusMax;

        // Data Packet Parameters
        this.packetCount = packetCount;
        this.packetSizeMin = packetSizeMin;
        this.packetSizeMax = packetSizeMax;
        this.packetSpeedMin = packetSpeedMin;
        this.packetSpeedMax = packetSpeedMax;
        this.packetGlowRadiusMin = packetGlowRadiusMin;
        this.packetGlowRadiusMax = packetGlowRadiusMax;

        // Signal Wave Parameters
        this.signalWaveCount = signalWaveCount;
        this.signalWaveSpeedMin = signalWaveSpeedMin;
        this.signalWaveSpeedMax = signalWaveSpeedMax;
        this.signalDecayRateMin = signalDecayRateMin;
        this.signalDecayRateMax = signalDecayRateMax;

        // Node Charge Animation
        this.gateChargeTimeMin = gateChargeTimeMin;
        this.gateChargeTimeMax = gateChargeTimeMax;
        this.gateDischargeTimeMin = gateDischargeTimeMin;
        this.gateDischargeTimeMax = gateDischargeTimeMax;

        // Trace Pulse Animation
        this.energyPulseFrequencyMin = energyPulseFrequencyMin;
        this.energyPulseFrequencyMax = energyPulseFrequencyMax;

        // Visual Style Parameters
        this.traceOpacityMin = traceOpacityMin;
        this.traceOpacityMax = traceOpacityMax;

        // Glow and Blur Effects
        this.glowIntensityMin = glowIntensityMin;
        this.glowIntensityMax = glowIntensityMax;
        this.glowSpreadMin = glowSpreadMin;
        this.glowSpreadMax = glowSpreadMax;
        this.blurAmountMin = blurAmountMin;
        this.blurAmountMax = blurAmountMax;

        // Color Configuration
        this.traceColor = this.#ensureColorPicker(traceColor);
        this.activeTraceColor = this.#ensureColorPicker(activeTraceColor);
        this.dataPacketColor = this.#ensureColorPicker(dataPacketColor);
        this.nodeColor = this.#ensureColorPicker(nodeColor);
        this.nodeCoreColor = this.#ensureColorPicker(nodeCoreColor);
        this.signalColor = this.#ensureColorPicker(signalColor);
        this.backgroundGridColor = this.#ensureColorPicker(backgroundGridColor);

        // Circuit Pattern Style
        this.useOrthogonalTraces = useOrthogonalTraces;
        this.showBackgroundGrid = showBackgroundGrid;

        // Perfect Loop Configuration
        this.perfectLoop = perfectLoop;

        // Layer Composition
        this.layerOpacity = layerOpacity;
        this.layerBlendMode = layerBlendMode;
    }
    
    /**
     * Helper method to ensure a color parameter is a ColorPicker instance
     * Handles both ColorPicker instances and plain objects from deserialization
     */
    #ensureColorPicker(colorParam) {
        if (colorParam instanceof ColorPicker) {
            return colorParam;
        } else if (typeof colorParam === 'object' && colorParam !== null) {
            // Reconstruct ColorPicker from plain object (deserialized data)
            // Assume it has selectionType and value properties
            const selectionType = colorParam.selectionType || ColorPicker.SelectionType.color;
            const value = colorParam.value || colorParam.color || '#FFFFFF';
            return new ColorPicker(selectionType, value);
        } else if (typeof colorParam === 'string') {
            // If it's just a string color, create a static ColorPicker
            return new ColorPicker(ColorPicker.SelectionType.color, colorParam);
        } else {
            // Default fallback
            return new ColorPicker(ColorPicker.SelectionType.color, '#FFFFFF');
        }
    }
}