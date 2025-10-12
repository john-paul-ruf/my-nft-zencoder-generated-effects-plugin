import {EffectConfig} from 'my-nft-gen/src/core/layer/EffectConfig.js';
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";

export class CymaticsResonanceConfig extends EffectConfig {
    constructor({
                    // Wave Pattern Parameters
                    waveFrequencyX = 3,
                    waveFrequencyY = 3,
                    harmonicCount = 4,
                    harmonicRatio = 1.5,
                    waveAmplitude = 0.7,
                    interferenceIntensity = 1.0,

                    // Resonant Node Parameters
                    nodeCount = 50,
                    nodeRadiusMin = 6,
                    nodeRadiusMax = 16,
                    nodePulseSpeedMin = 0.7,
                    nodePulseSpeedMax = 2.0,
                    nodeGlowRadiusMin = 15,
                    nodeGlowRadiusMax = 30,

                    // Ripple Parameters
                    rippleCount = 12,
                    rippleSpeedMin = 1.0,
                    rippleSpeedMax = 2.0,
                    rippleWidthMin = 2,
                    rippleWidthMax = 5,
                    rippleDecayRate = 0.05,

                    // Pattern Morphing
                    morphSpeed = 0.25,
                    morphComplexity = 3,
                    phaseShiftSpeed = 0.1,

                    // Visual Style
                    patternOpacityMin = 0.3,
                    patternOpacityMax = 0.8,
                    lineWidth = 2,
                    showFrequencyGrid = true,
                    gridOpacity = 0.2,

                    // Effects
                    glowIntensityMin = 15,
                    glowIntensityMax = 35,
                    blurAmountMin = 1,
                    blurAmountMax = 4,

                    // Color Configuration
                    primaryWaveColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    secondaryWaveColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    nodeColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    nodeCoreColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    rippleColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    gridColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),

                    // Animation
                    perfectLoop = true,
                    layerOpacity = 1.0,
                    layerBlendMode = 'screen',
                } = {}) {
        super();

        // Wave Pattern Parameters
        this.waveFrequencyX = waveFrequencyX;
        this.waveFrequencyY = waveFrequencyY;
        this.harmonicCount = harmonicCount;
        this.harmonicRatio = harmonicRatio;
        this.waveAmplitude = waveAmplitude;
        this.interferenceIntensity = interferenceIntensity;

        // Resonant Node Parameters
        this.nodeCount = nodeCount;
        this.nodeRadiusMin = nodeRadiusMin;
        this.nodeRadiusMax = nodeRadiusMax;
        this.nodePulseSpeedMin = nodePulseSpeedMin;
        this.nodePulseSpeedMax = nodePulseSpeedMax;
        this.nodeGlowRadiusMin = nodeGlowRadiusMin;
        this.nodeGlowRadiusMax = nodeGlowRadiusMax;

        // Ripple Parameters
        this.rippleCount = rippleCount;
        this.rippleSpeedMin = rippleSpeedMin;
        this.rippleSpeedMax = rippleSpeedMax;
        this.rippleWidthMin = rippleWidthMin;
        this.rippleWidthMax = rippleWidthMax;
        this.rippleDecayRate = rippleDecayRate;

        // Pattern Morphing
        this.morphSpeed = morphSpeed;
        this.morphComplexity = morphComplexity;
        this.phaseShiftSpeed = phaseShiftSpeed;

        // Visual Style
        this.patternOpacityMin = patternOpacityMin;
        this.patternOpacityMax = patternOpacityMax;
        this.lineWidth = lineWidth;
        this.showFrequencyGrid = showFrequencyGrid;
        this.gridOpacity = gridOpacity;

        // Effects
        this.glowIntensityMin = glowIntensityMin;
        this.glowIntensityMax = glowIntensityMax;
        this.blurAmountMin = blurAmountMin;
        this.blurAmountMax = blurAmountMax;

        // Color Configuration
        this.primaryWaveColor = this.#ensureColorPicker(primaryWaveColor);
        this.secondaryWaveColor = this.#ensureColorPicker(secondaryWaveColor);
        this.nodeColor = this.#ensureColorPicker(nodeColor);
        this.nodeCoreColor = this.#ensureColorPicker(nodeCoreColor);
        this.rippleColor = this.#ensureColorPicker(rippleColor);
        this.gridColor = this.#ensureColorPicker(gridColor);

        // Animation
        this.perfectLoop = perfectLoop;
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
            const selectionType = colorParam.selectionType || ColorPicker.SelectionType.colorBucket;
            const value = colorParam.value || colorParam.color || null;
            return new ColorPicker(selectionType, value);
        } else if (typeof colorParam === 'string') {
            // If it's just a string color, create a static ColorPicker
            return new ColorPicker(ColorPicker.SelectionType.colorBucket);
        } else {
            // Default fallback
            return new ColorPicker(ColorPicker.SelectionType.colorBucket);
        }
    }
}