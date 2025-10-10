import {EffectConfig} from 'my-nft-gen/src/core/layer/EffectConfig.js';
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getAllFindValueAlgorithms} from "my-nft-gen";

export class CircuitStreamConfig extends EffectConfig {
    constructor({
                    // Circuit Grid Parameters (flat structure)
                    gridColumns = 16,
                    gridRows = 12,
                    traceWidth = 3,
                    traceDensity = 0.3, // Probability of trace at each grid point
                    
                    // Node Parameters
                    nodeCount = 12,
                    nodeRadiusMin = 4,
                    nodeRadiusMax = 8,
                    nodePulseIntensityMin = 0.3,
                    nodePulseIntensityMax = 1.0,
                    
                    // Data Packet Parameters
                    packetCount = 20,
                    packetSizeMin = 2,
                    packetSizeMax = 4,
                    packetSpeedMin = 0.5,
                    packetSpeedMax = 2.0,
                    packetGlowRadiusMin = 8,
                    packetGlowRadiusMax = 16,
                    
                    // Signal Wave Parameters
                    signalWaveCount = 5,
                    signalWaveSpeedMin = 0.3,
                    signalWaveSpeedMax = 1.5,
                    signalWaveAmplitudeMin = 0.2,
                    signalWaveAmplitudeMax = 0.8,
                    signalDecayRateMin = 0.05,
                    signalDecayRateMax = 0.15,
                    
                    // Logic Gate Animation
                    gateBlinkFrequencyMin = 0.5,
                    gateBlinkFrequencyMax = 2.0,
                    gateChargeTimeMin = 30, // frames
                    gateChargeTimeMax = 90, // frames
                    gateDischargeTimeMin = 10,
                    gateDischargeTimeMax = 30,
                    
                    // Circuit Energy Flow
                    energyFlowSpeedMin = 0.2,
                    energyFlowSpeedMax = 1.0,
                    energyPulseFrequencyMin = 0.1,
                    energyPulseFrequencyMax = 0.5,
                    energyFieldStrengthMin = 0.1,
                    energyFieldStrengthMax = 0.4,
                    
                    // Visual Style Parameters
                    traceOpacityMin = 0.3,
                    traceOpacityMax = 0.7,
                    activeTraceOpacity = 1.0,
                    connectionLineOpacityMin = 0.1,
                    connectionLineOpacityMax = 0.4,
                    
                    // Glow and Blur Effects
                    glowIntensityMin = 10,
                    glowIntensityMax = 30,
                    glowSpreadMin = 2,
                    glowSpreadMax = 8,
                    blurAmountMin = 0,
                    blurAmountMax = 2,
                    
                    // Color Configuration
                    traceColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    activeTraceColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    dataPacketColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    nodeColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    nodeCoreColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    signalColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    backgroundGridColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    
                    // Animation Algorithms
                    interpolationAlgorithm = getAllFindValueAlgorithms(),
                    pulseAlgorithm = getAllFindValueAlgorithms(),
                    waveAlgorithm = getAllFindValueAlgorithms(),
                    flowAlgorithm = getAllFindValueAlgorithms(),
                    
                    // Render Modes
                    renderMode = ['digital', 'matrix', 'neon', 'blueprint', 'hologram'],
                    
                    // Circuit Pattern Style
                    useOrthogonalTraces = true, // 90-degree angles only
                    useDiagonalTraces = false,
                    useHexagonalGrid = false,
                    showBackgroundGrid = true,
                    showDataBits = true, // Show 0s and 1s in data packets
                    
                    // Perfect Loop Configuration
                    perfectLoop = true,
                    loopPhaseOffsetMin = 0,
                    loopPhaseOffsetMax = 100,
                    
                    // Layer Composition
                    layerOpacity = 1.0,
                    layerBlendMode = 'screen', // normal, screen, multiply, overlay
                } = {}) {
        super();

        // Circuit Grid Parameters
        this.gridColumns = gridColumns;
        this.gridRows = gridRows;
        this.traceWidth = traceWidth;
        this.traceDensity = traceDensity;
        
        // Node Parameters
        this.nodeCount = nodeCount;
        this.nodeRadiusMin = nodeRadiusMin;
        this.nodeRadiusMax = nodeRadiusMax;
        this.nodePulseIntensityMin = nodePulseIntensityMin;
        this.nodePulseIntensityMax = nodePulseIntensityMax;
        
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
        this.signalWaveAmplitudeMin = signalWaveAmplitudeMin;
        this.signalWaveAmplitudeMax = signalWaveAmplitudeMax;
        this.signalDecayRateMin = signalDecayRateMin;
        this.signalDecayRateMax = signalDecayRateMax;
        
        // Logic Gate Animation
        this.gateBlinkFrequencyMin = gateBlinkFrequencyMin;
        this.gateBlinkFrequencyMax = gateBlinkFrequencyMax;
        this.gateChargeTimeMin = gateChargeTimeMin;
        this.gateChargeTimeMax = gateChargeTimeMax;
        this.gateDischargeTimeMin = gateDischargeTimeMin;
        this.gateDischargeTimeMax = gateDischargeTimeMax;
        
        // Circuit Energy Flow
        this.energyFlowSpeedMin = energyFlowSpeedMin;
        this.energyFlowSpeedMax = energyFlowSpeedMax;
        this.energyPulseFrequencyMin = energyPulseFrequencyMin;
        this.energyPulseFrequencyMax = energyPulseFrequencyMax;
        this.energyFieldStrengthMin = energyFieldStrengthMin;
        this.energyFieldStrengthMax = energyFieldStrengthMax;
        
        // Visual Style Parameters
        this.traceOpacityMin = traceOpacityMin;
        this.traceOpacityMax = traceOpacityMax;
        this.activeTraceOpacity = activeTraceOpacity;
        this.connectionLineOpacityMin = connectionLineOpacityMin;
        this.connectionLineOpacityMax = connectionLineOpacityMax;
        
        // Glow and Blur Effects
        this.glowIntensityMin = glowIntensityMin;
        this.glowIntensityMax = glowIntensityMax;
        this.glowSpreadMin = glowSpreadMin;
        this.glowSpreadMax = glowSpreadMax;
        this.blurAmountMin = blurAmountMin;
        this.blurAmountMax = blurAmountMax;
        
        // Color Configuration - handle both ColorPicker instances and plain objects from deserialization
        this.traceColor = this.#ensureColorPicker(traceColor);
        this.activeTraceColor = this.#ensureColorPicker(activeTraceColor);
        this.dataPacketColor = this.#ensureColorPicker(dataPacketColor);
        this.nodeColor = this.#ensureColorPicker(nodeColor);
        this.nodeCoreColor = this.#ensureColorPicker(nodeCoreColor);
        this.signalColor = this.#ensureColorPicker(signalColor);
        this.backgroundGridColor = this.#ensureColorPicker(backgroundGridColor);
        
        // Animation Algorithms
        this.interpolationAlgorithm = interpolationAlgorithm;
        this.pulseAlgorithm = pulseAlgorithm;
        this.waveAlgorithm = waveAlgorithm;
        this.flowAlgorithm = flowAlgorithm;
        
        // Render Modes
        this.renderMode = renderMode;
        
        // Circuit Pattern Style
        this.useOrthogonalTraces = useOrthogonalTraces;
        this.useDiagonalTraces = useDiagonalTraces;
        this.useHexagonalGrid = useHexagonalGrid;
        this.showBackgroundGrid = showBackgroundGrid;
        this.showDataBits = showDataBits;
        
        // Perfect Loop Configuration
        this.perfectLoop = perfectLoop;
        this.loopPhaseOffsetMin = loopPhaseOffsetMin;
        this.loopPhaseOffsetMax = loopPhaseOffsetMax;
        
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