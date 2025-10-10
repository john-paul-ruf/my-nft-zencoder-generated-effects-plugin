import {LayerEffect} from 'my-nft-gen/src/core/layer/LayerEffect.js';
import {Canvas2dFactory} from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import {LayerFactory} from 'my-nft-gen/src/core/factory/layer/LayerFactory.js';
import {Settings} from 'my-nft-gen/src/core/Settings.js';
import {AuroraKaleidoConfig} from './AuroraKaleidoConfig.js';

export class AuroraKaleidoEffect extends LayerEffect {
    static _name_ = 'aurora-kaleido';
    static _displayName_ = 'Aurora Kaleidoscope Flow';
    static _description_ = 'Flowing aurora ribbons reflected through a kaleidoscope with perfect loop.';
    static _version_ = '1.0.0';
    static _author_ = 'Zencoder';
    static _tags_ = ['effect', 'primary', 'aurora', 'kaleido', 'ribbons', 'animated'];

    constructor({
        name = AuroraKaleidoEffect._name_,
        requiresLayer = true,
        config = new AuroraKaleidoConfig({}),
        additionalEffects = [],
        ignoreAdditionalEffects = false,
        settings = new Settings({}),
    } = {}) {
        super({ name, requiresLayer, config, additionalEffects, ignoreAdditionalEffects, settings });
        this.#generate(settings);
    }

    #generate(settings) {
        const width = this.finalSize?.width || 1024;
        const height = this.finalSize?.height || 1024;

        // Deterministic RNG (LCG)
        const seed = (this.config.seed | 0) || 1;
        let s = seed >>> 0;
        const rnd = () => ((s = (1664525 * s + 1013904223) >>> 0) / 0xffffffff);

        const ribbons = Array.from({ length: this.config.ribbonCount }, () => ({
            phase: rnd(),                // 0..1, phase offset along loop
            widthFactor: 1 - this.config.ribbonWidthJitter * rnd(),
            colorBias: rnd(),
            radialBias: -0.2 + 0.4 * rnd(),
        }));

        this.data = {
            width, height,
            segments: this.config.segments | 0,
            symmetryReflection: !!this.config.symmetryReflection,
            freqX: this.config.freqX | 0,
            freqY: this.config.freqY | 0,
            phaseOffset: this.config.phaseOffset || 0,
            swirlSpeed: +this.config.swirlSpeed,
            swirlAmplitude: +this.config.swirlAmplitude,
            morphSpeed: +this.config.morphSpeed,
            morphDepth: +this.config.morphDepth,
            ribbonTrail: this.config.ribbonTrail | 0,
            renderMode: this.config.renderMode,
            samplingResolution: this.config.samplingResolution | 0,
            opacity: +this.config.opacity,
            lineWidth: +this.config.lineWidth,

            // Resolve colors from ColorPicker using repo pattern
            bgStartColor: this.#getColorFromPicker(this.config.bgStartColor, settings),
            bgEndColor: this.#getColorFromPicker(this.config.bgEndColor, settings),
            colorA: this.#getColorFromPicker(this.config.colorA, settings),
            colorB: this.#getColorFromPicker(this.config.colorB, settings),
            colorC: this.#getColorFromPicker(this.config.colorC, settings),

            colorMode: this.config.colorMode,
            blendMode: this.config.blendMode,
            layerOpacity: +this.config.layerOpacity,
            perfectLoop: !!this.config.perfectLoop,
            ribbonWidth: +this.config.ribbonWidth,
            ribbons,
        };
    }

    async invoke(layer, currentFrame, numberOfFrames) {
        const canvas = await Canvas2dFactory.getNewCanvas(this.data.width, this.data.height);
        await this.#drawBackground(canvas);
        await this.#renderAurora(canvas, currentFrame, numberOfFrames);

        // Follow CymaticsResonance pattern due to convertToLayer bug
        const svgContent = canvas.strategy._generateSVG();
        const sharpModule = (await import('sharp')).default; // dynamic import to avoid top-level dependency issues
        const pngBuffer = await sharpModule(Buffer.from(svgContent)).png().toBuffer();

        const resultLayer = await LayerFactory.getLayerFromBuffer(pngBuffer, {
            finalImageSize: {
                width: this.data.width,
                height: this.data.height,
                longestSide: Math.max(this.data.width, this.data.height),
                shortestSide: Math.min(this.data.width, this.data.height),
            },
            workingDirectory: null,
            layerStrategy: 'sharp',
        });

        await resultLayer.adjustLayerOpacity(this.data.layerOpacity);
        await layer.compositeLayerOver(resultLayer);
        return layer;
    }

    async #drawBackground(canvas) {
        const { width, height, bgStartColor, bgEndColor } = this.data;
        await canvas.drawGradientRect(0, 0, width, height, [
            { offset: 0, color: bgStartColor },
            { offset: 1, color: bgEndColor },
        ]);
    }

    async #renderAurora(canvas, currentFrame, numberOfFrames) {
        const d = this.data;
        const p = (currentFrame % numberOfFrames) / numberOfFrames; // perfect loop phase 0..1
        const morph = Math.sin(2 * Math.PI * p * d.morphSpeed) * d.morphDepth;
        const swirlAngle = 2 * Math.PI * d.swirlSpeed * p;
        const csSw = Math.cos(swirlAngle), snSw = Math.sin(swirlAngle);

        for (const r of d.ribbons) {
            const widthPx = d.ribbonWidth * r.widthFactor;
            const trail = [];
            for (let i = 0; i < d.ribbonTrail; i++) {
                const t = (p + r.phase + i / d.ribbonTrail) % 1;
                // Lissajous core, integer frequencies ensure loop closure
                const lx = Math.sin(2 * Math.PI * (d.freqX * t + d.phaseOffset));
                const ly = Math.sin(2 * Math.PI * (d.freqY * t));
                // Morphing radial envelope (breathing)
                const rad = (0.35 + 0.6 * (0.5 + 0.5 * Math.sin(2 * Math.PI * (t + r.radialBias) + morph)));
                // Apply global swirl rotation
                const sx = lx * csSw - ly * snSw;
                const sy = lx * snSw + ly * csSw;
                const cx = (0.5 + sx * rad) * d.width;
                const cy = (0.5 + sy * rad) * d.height;
                trail.push({ x: cx, y: cy, t });
            }

            const colorFor = ({ x, y, t }) => {
                if (d.colorMode === 'time') return this.#mix3(d.colorA, d.colorB, d.colorC, t);
                if (d.colorMode === 'radius') {
                    const dx = x / d.width - 0.5, dy = y / d.height - 0.5;
                    const rr = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 0.71);
                    return this.#mix3(d.colorA, d.colorB, d.colorC, rr);
                }
                // angle
                const angle = (Math.atan2(y - d.height / 2, x - d.width / 2) + Math.PI) / (2 * Math.PI);
                return this.#mix3(d.colorA, d.colorB, d.colorC, angle);
            };

            for (let s = 0; s < d.segments; s++) {
                const theta = (2 * Math.PI * s) / d.segments;
                const cs = Math.cos(theta), sn = Math.sin(theta);

                const segTrail = trail.map(pt => ({
                    x: (pt.x - d.width / 2) * cs - (pt.y - d.height / 2) * sn + d.width / 2,
                    y: (pt.x - d.width / 2) * sn + (pt.y - d.height / 2) * cs + d.height / 2,
                    t: pt.t,
                }));

                await this.#drawTrail(canvas, segTrail, widthPx, colorFor);

                if (d.symmetryReflection) {
                    const mirrorTrail = segTrail.map(pt => ({ x: d.width - pt.x, y: pt.y, t: pt.t }));
                    await this.#drawTrail(canvas, mirrorTrail, widthPx, colorFor);
                }
            }
        }
    }

    async #drawTrail(canvas, points, widthPx, colorFor) {
        const d = this.data;
        if (d.renderMode === 'points') {
            for (const pt of points) {
                // approximate filled circle by small stroke path
                await canvas.drawLine2d({x: pt.x, y: pt.y}, {x: pt.x + 0.01, y: pt.y + 0.01}, widthPx, colorFor(pt), 0, null, d.opacity);
            }
            return;
        }
        if (d.renderMode === 'streaks') {
            for (let k = 1; k < points.length; k++) {
                const a = points[k - 1], b = points[k];
                await canvas.drawLine2d(a, b, d.lineWidth, colorFor(b), 0, null, d.opacity);
            }
            return;
        }
        // ribbons: thick lines composing a ribbon-like trail
        for (let k = 1; k < points.length; k++) {
            const a = points[k - 1], b = points[k];
            await canvas.drawLine2d(a, b, widthPx, colorFor(b), 0, null, d.opacity);
        }
    }

    #mix3(a, b, c, s) {
        const lerpHex = (h1, h2, t) => {
            // expects #rrggbb
            const p = v => parseInt(v, 16);
            const r1 = p(h1.slice(1, 3)), g1 = p(h1.slice(3, 5)), b1 = p(h1.slice(5, 7));
            const r2 = p(h2.slice(1, 3)), g2 = p(h2.slice(3, 5)), b2 = p(h2.slice(5, 7));
            const r = Math.round(r1 + (r2 - r1) * t);
            const g = Math.round(g1 + (g2 - g1) * t);
            const b = Math.round(b1 + (b2 - b1) * t);
            return `#${[r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')}`;
        };
        const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;
        const t = clamp01(s);
        return t < 0.5 ? lerpHex(a, b, t * 2) : lerpHex(b, c, (t - 0.5) * 2);
    }

    #getColorFromPicker(colorPicker, settings) {
        if (!colorPicker) return '#FFFFFF';
        if (typeof colorPicker.getColor === 'function') {
            return colorPicker.getColor(settings) || '#FFFFFF';
        }
        if (typeof colorPicker === 'string') return colorPicker;
        if (typeof colorPicker === 'object' && colorPicker?.value) return colorPicker.value;
        return '#FFFFFF';
    }
}