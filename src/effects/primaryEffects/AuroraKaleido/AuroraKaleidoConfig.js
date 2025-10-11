import {EffectConfig} from 'my-nft-gen/src/core/layer/EffectConfig.js';
import {ColorPicker} from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

// Flat, serializable config for Aurora Kaleidoscope Flow
export class AuroraKaleidoConfig extends EffectConfig {
    constructor(cfg = {}) {
        super();
        this.seed = cfg.seed ?? Math.floor(Math.random() * 1e9);
        this.segments = cfg.segments ?? 8; // [3..24]
        this.symmetryReflection = cfg.symmetryReflection ?? true;
        this.ribbonCount = cfg.ribbonCount ?? 18; // [3..64]
        this.ribbonWidth = cfg.ribbonWidth ?? 6;
        this.ribbonWidthJitter = cfg.ribbonWidthJitter ?? 0.4; // 0..1
        this.freqX = cfg.freqX ?? 3; // integer for perfect loop
        this.freqY = cfg.freqY ?? 2; // integer for perfect loop
        this.phaseOffset = cfg.phaseOffset ?? 0;
        this.swirlSpeed = cfg.swirlSpeed ?? 1.0; // integer for perfect loop
        this.swirlAmplitude = cfg.swirlAmplitude ?? 0.35;
        this.morphSpeed = cfg.morphSpeed ?? 1.0; // integer for perfect loop
        this.morphDepth = cfg.morphDepth ?? 0.4; // 0..1
        this.ribbonTrail = cfg.ribbonTrail ?? 48; // subdivisions per ribbon
        this.renderMode = cfg.renderMode ?? 'ribbons'; // 'ribbons' | 'streaks' | 'points'
        this.samplingResolution = cfg.samplingResolution ?? 96;
        this.opacity = cfg.opacity ?? 1.0;
        this.lineWidth = cfg.lineWidth ?? 1.5;

        // Colors are configured via ColorPicker to match repo patterns
        this.colorA = this.#ensureColorPicker(cfg.colorA ?? new ColorPicker(ColorPicker.SelectionType.color, '#33d1ff'));
        this.colorB = this.#ensureColorPicker(cfg.colorB ?? new ColorPicker(ColorPicker.SelectionType.color, '#9b5bff'));
        this.colorC = this.#ensureColorPicker(cfg.colorC ?? new ColorPicker(ColorPicker.SelectionType.color, '#ff5ea0'));

        this.colorMode = cfg.colorMode ?? 'angle'; // 'angle' | 'radius' | 'time'
        this.blendMode = cfg.blendMode ?? 'screen';
        this.layerOpacity = cfg.layerOpacity ?? 1.0;
        this.perfectLoop = cfg.perfectLoop ?? true;
    }

    #ensureColorPicker(colorParam) {
        if (colorParam instanceof ColorPicker) return colorParam;
        if (typeof colorParam === 'object' && colorParam !== null) {
            const selectionType = colorParam.selectionType || ColorPicker.SelectionType.color;
            const value = colorParam.value || colorParam.color || '#FFFFFF';
            return new ColorPicker(selectionType, value);
        }
        if (typeof colorParam === 'string') {
            return new ColorPicker(ColorPicker.SelectionType.color, colorParam);
        }
        return new ColorPicker(ColorPicker.SelectionType.color, '#FFFFFF');
    }
}