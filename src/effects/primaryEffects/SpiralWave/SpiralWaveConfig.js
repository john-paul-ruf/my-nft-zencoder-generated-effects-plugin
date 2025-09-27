import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';
import { PercentageRange } from 'my-nft-gen/src/core/layer/configType/PercentageRange.js';
import { Range } from 'my-nft-gen/src/core/layer/configType/Range.js';
import { Position } from 'my-nft-gen/src/core/position/Position.js';

/**
 * Configuration for SpiralWave Effect
 * Creates animated spiral patterns with wave-like distortions
 */
export class SpiralWaveConfig {
    constructor({
        // Core spiral parameters
        spiralCount = 3,
        armCount = 5,
        spiralTightness = new Range(0.1, 0.3),
        
        // Wave distortion parameters
        waveAmplitude = new Range(10, 50),
        waveFrequency = new Range(2, 8),
        waveSpeed = new Range(0.5, 2.0),
        
        // Visual parameters
        lineWidth = new Range(2, 8),
        opacity = new Range(0,1),
        
        // Colors
        primaryColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
        secondaryColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
        
        // Animation parameters
        rotationSpeed = new Range(0.5, 3.0),
        pulseIntensity = new Range(0.1, 0.5),
        
        // Positioning
        center = new Position({x: 0, y: 0}),
        
        // Rendering strategies
        renderMode = ['gradient', 'solid', 'pulse'],

        // Layer effects
        layerOpacity = 0.8,
        blur = new Range(0, 3),
        glow = new Range(0, 5)
    } = {}) {
        this.spiralCount = spiralCount;
        this.armCount = armCount;
        this.spiralTightness = spiralTightness;
        
        this.waveAmplitude = waveAmplitude;
        this.waveFrequency = waveFrequency;
        this.waveSpeed = waveSpeed;
        
        this.lineWidth = lineWidth;
        this.opacity = opacity;
        
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
        
        this.rotationSpeed = rotationSpeed;
        this.pulseIntensity = pulseIntensity;
        
        this.center = center;
        
        this.renderMode = renderMode;

        this.layerOpacity = layerOpacity;
        this.blur = blur;
        this.glow = glow;
    }
}