import {EffectConfig} from 'my-nft-gen/src/core/layer/EffectConfig.js';
import {ColorPicker} from "my-nft-gen/src/core/layer/configType/ColorPicker.js";

export class MetatronCubeConfig extends EffectConfig {
    constructor({
                    // Core Geometry Parameters
                    cubeScale = 0.7,
                    sphereRadiusMin = 8,
                    sphereRadiusMax = 12,
                    
                    // Platonic Solids
                    showPlatonicSolids = true,
                    solidScale = 0.4,
                    solidRotationSpeedMin = 0.2,
                    solidRotationSpeedMax = 0.8,
                    solidEdgeGlowMin = 10,
                    solidEdgeGlowMax = 20,
                    solidWireframeWidth = 2,
                    solidFaceOpacityMin = 0.05,
                    solidFaceOpacityMax = 0.15,
                    
                    // Flower of Life
                    showFlowerOfLife = true,
                    flowerCircleCount = 19,
                    flowerOpacityMin = 0.2,
                    flowerOpacityMax = 0.4,
                    flowerBreathingSpeed = 0.5,
                    flowerBreathingAmount = 0.1,
                    
                    // Runes & Glyphs
                    outerRuneCount = 12,
                    outerRuneRotationSpeed = 0.3,
                    outerRuneRadius = 0.85,
                    outerRuneSize = 24,
                    outerRuneOpacityMin = 0.4,
                    outerRuneOpacityMax = 0.9,
                    
                    innerGlyphCount = 8,
                    innerGlyphRotationSpeed = -0.6,
                    innerGlyphRadius = 0.25,
                    innerGlyphSize = 20,
                    innerGlyphOpacityMin = 0.5,
                    innerGlyphOpacityMax = 1.0,
                    
                    // Energy Particles
                    particleCount = 150,
                    particleSpeedMin = 0.5,
                    particleSpeedMax = 1.5,
                    particleSizeMin = 2,
                    particleSizeMax = 6,
                    particleGlowMin = 6,
                    particleGlowMax = 12,
                    particleTrailLength = 5,
                    
                    // Energy Pulses
                    energyPulseCount = 24,
                    energyPulseSpeedMin = 0.8,
                    energyPulseSpeedMax = 1.2,
                    energyPulseWidthMin = 3,
                    energyPulseWidthMax = 6,
                    
                    // Vertex Effects
                    vertexGlowRadiusMin = 8,
                    vertexGlowRadiusMax = 16,
                    vertexPulseFrequencyMin = 0.3,
                    vertexPulseFrequencyMax = 0.7,
                    
                    // Central Mandala
                    showCentralMandala = true,
                    mandalaRotationSpeed = 0.1,
                    mandalaLayers = 3,
                    mandalaPetalCount = 12,
                    mandalaOpacityMin = 0.3,
                    mandalaOpacityMax = 0.6,
                    
                    // Visual Effects
                    glowIntensityMin = 15,
                    glowIntensityMax = 30,
                    blurAmountMin = 0,
                    blurAmountMax = 3,
                    
                    // Color Configuration
                    primaryColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    secondaryColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    tertiaryColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    runeColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    particleColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    glowColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    backgroundGradientStart = new ColorPicker(ColorPicker.SelectionType.color, '#000033'),
                    backgroundGradientEnd = new ColorPicker(ColorPicker.SelectionType.color, '#000000'),
                    
                    // Animation
                    perfectLoop = true,
                    cubeRotationSpeed = 0.15,
                    cubeRotationEnabled = true,
                    masterRotationSpeed = 0.05,
                    lineWidth = 2,
                    linePulseSpeed = 1.0,
                    linePulseIntensity = 0.6,
                    
                    // Layer Composition
                    layerOpacity = 1.0,
                    layerBlendMode = 'screen',
                } = {}) {
        super();

        // Core Geometry Parameters
        this.cubeScale = cubeScale;
        this.sphereRadiusMin = sphereRadiusMin;
        this.sphereRadiusMax = sphereRadiusMax;
        
        // Platonic Solids
        this.showPlatonicSolids = showPlatonicSolids;
        this.solidScale = solidScale;
        this.solidRotationSpeedMin = solidRotationSpeedMin;
        this.solidRotationSpeedMax = solidRotationSpeedMax;
        this.solidEdgeGlowMin = solidEdgeGlowMin;
        this.solidEdgeGlowMax = solidEdgeGlowMax;
        this.solidWireframeWidth = solidWireframeWidth;
        this.solidFaceOpacityMin = solidFaceOpacityMin;
        this.solidFaceOpacityMax = solidFaceOpacityMax;
        
        // Flower of Life
        this.showFlowerOfLife = showFlowerOfLife;
        this.flowerCircleCount = flowerCircleCount;
        this.flowerOpacityMin = flowerOpacityMin;
        this.flowerOpacityMax = flowerOpacityMax;
        this.flowerBreathingSpeed = flowerBreathingSpeed;
        this.flowerBreathingAmount = flowerBreathingAmount;
        
        // Runes & Glyphs
        this.outerRuneCount = outerRuneCount;
        this.outerRuneRotationSpeed = outerRuneRotationSpeed;
        this.outerRuneRadius = outerRuneRadius;
        this.outerRuneSize = outerRuneSize;
        this.outerRuneOpacityMin = outerRuneOpacityMin;
        this.outerRuneOpacityMax = outerRuneOpacityMax;
        
        this.innerGlyphCount = innerGlyphCount;
        this.innerGlyphRotationSpeed = innerGlyphRotationSpeed;
        this.innerGlyphRadius = innerGlyphRadius;
        this.innerGlyphSize = innerGlyphSize;
        this.innerGlyphOpacityMin = innerGlyphOpacityMin;
        this.innerGlyphOpacityMax = innerGlyphOpacityMax;
        
        // Energy Particles
        this.particleCount = particleCount;
        this.particleSpeedMin = particleSpeedMin;
        this.particleSpeedMax = particleSpeedMax;
        this.particleSizeMin = particleSizeMin;
        this.particleSizeMax = particleSizeMax;
        this.particleGlowMin = particleGlowMin;
        this.particleGlowMax = particleGlowMax;
        this.particleTrailLength = particleTrailLength;
        
        // Energy Pulses
        this.energyPulseCount = energyPulseCount;
        this.energyPulseSpeedMin = energyPulseSpeedMin;
        this.energyPulseSpeedMax = energyPulseSpeedMax;
        this.energyPulseWidthMin = energyPulseWidthMin;
        this.energyPulseWidthMax = energyPulseWidthMax;
        
        // Vertex Effects
        this.vertexGlowRadiusMin = vertexGlowRadiusMin;
        this.vertexGlowRadiusMax = vertexGlowRadiusMax;
        this.vertexPulseFrequencyMin = vertexPulseFrequencyMin;
        this.vertexPulseFrequencyMax = vertexPulseFrequencyMax;
        
        // Central Mandala
        this.showCentralMandala = showCentralMandala;
        this.mandalaRotationSpeed = mandalaRotationSpeed;
        this.mandalaLayers = mandalaLayers;
        this.mandalaPetalCount = mandalaPetalCount;
        this.mandalaOpacityMin = mandalaOpacityMin;
        this.mandalaOpacityMax = mandalaOpacityMax;
        
        // Visual Effects
        this.glowIntensityMin = glowIntensityMin;
        this.glowIntensityMax = glowIntensityMax;
        this.blurAmountMin = blurAmountMin;
        this.blurAmountMax = blurAmountMax;
        
        // Color Configuration
        this.primaryColor = this.#ensureColorPicker(primaryColor);
        this.secondaryColor = this.#ensureColorPicker(secondaryColor);
        this.tertiaryColor = this.#ensureColorPicker(tertiaryColor);
        this.runeColor = this.#ensureColorPicker(runeColor);
        this.particleColor = this.#ensureColorPicker(particleColor);
        this.glowColor = this.#ensureColorPicker(glowColor);
        this.backgroundGradientStart = this.#ensureColorPicker(backgroundGradientStart);
        this.backgroundGradientEnd = this.#ensureColorPicker(backgroundGradientEnd);
        
        // Animation
        this.perfectLoop = perfectLoop;
        this.cubeRotationSpeed = cubeRotationSpeed;
        this.cubeRotationEnabled = cubeRotationEnabled;
        this.masterRotationSpeed = masterRotationSpeed;
        this.lineWidth = lineWidth;
        this.linePulseSpeed = linePulseSpeed;
        this.linePulseIntensity = linePulseIntensity;
        
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