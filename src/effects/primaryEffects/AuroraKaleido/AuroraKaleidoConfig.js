import {EffectConfig} from 'my-nft-gen/src/core/layer/EffectConfig.js';
import {ColorPicker} from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

// Flat, serializable config for Aurora Kaleidoscope Flow
export class AuroraKaleidoConfig extends EffectConfig {
    constructor({
        seed = Math.floor(Math.random() * 1e9),
        segments = 8, // [3..24]
        symmetryReflection = true,
        ribbonCount = 18, // [3..64]
        ribbonWidth = 6,
        ribbonWidthJitter = 0.4, // 0..1
        freqX = 3, // integer for perfect loop
        freqY = 2, // integer for perfect loop
        phaseOffset = 0,
        swirlSpeed = 1.0, // integer for perfect loop
        swirlAmplitude = 0.35,
        morphSpeed = 1.0, // integer for perfect loop
        morphDepth = 0.4, // 0..1
        ribbonTrail = 48, // subdivisions per ribbon
        renderMode = 'ribbons', // 'ribbons' | 'streaks' | 'points'
        samplingResolution = 96,
        opacity = 1.0,
        lineWidth = 1.5,

        // Colors are configured via ColorPicker to match repo patterns
        colorA = new ColorPicker(ColorPicker.SelectionType.colorBucket),
        colorB = new ColorPicker(ColorPicker.SelectionType.colorBucket),
        colorC = new ColorPicker(ColorPicker.SelectionType.colorBucket),

        colorMode = 'angle', // 'angle' | 'radius' | 'time'
        blendMode = 'screen',
        layerOpacity = 1.0,
        perfectLoop = true
    } = {}) {
        super();
        
        this.seed = seed;
        this.segments = segments;
        this.symmetryReflection = symmetryReflection;
        this.ribbonCount = ribbonCount;
        this.ribbonWidth = ribbonWidth;
        this.ribbonWidthJitter = ribbonWidthJitter;
        this.freqX = freqX;
        this.freqY = freqY;
        this.phaseOffset = phaseOffset;
        this.swirlSpeed = swirlSpeed;
        this.swirlAmplitude = swirlAmplitude;
        this.morphSpeed = morphSpeed;
        this.morphDepth = morphDepth;
        this.ribbonTrail = ribbonTrail;
        this.renderMode = renderMode;
        this.samplingResolution = samplingResolution;
        this.opacity = opacity;
        this.lineWidth = lineWidth;

        this.colorA = colorA;
        this.colorB = colorB;
        this.colorC = colorC;

        this.colorMode = colorMode;
        this.blendMode = blendMode;
        this.layerOpacity = layerOpacity;
        this.perfectLoop = perfectLoop;
    }
}