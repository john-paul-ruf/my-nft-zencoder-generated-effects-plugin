import {LayerEffect} from 'my-nft-gen/src/core/layer/LayerEffect.js';
import {findOneWayValue} from 'my-nft-gen/src/core/math/findOneWayValue.js';
import {LayerFactory} from 'my-nft-gen/src/core/factory/layer/LayerFactory.js';
import {Canvas2dFactory} from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import {
    getRandomFromArray,
    getRandomIntExclusive,
    getRandomIntInclusive,
    randomId,
    randomNumber,
} from 'my-nft-gen/src/core/math/random.js';
import {findValue} from 'my-nft-gen/src/core/math/findValue.js';
import {Settings} from 'my-nft-gen/src/core/Settings.js';
import {SpiralWaveConfig} from './SpiralWaveConfig.js';

/**
 * SpiralWave Effect
 * Creates mesmerizing animated spiral patterns with wave-like distortions
 * Features multiple spiral arms that rotate and pulse with configurable wave effects
 */
export class SpiralWaveEffect extends LayerEffect {
    static _name_ = 'spiral-wave';

    constructor({
                    name = SpiralWaveEffect._name_,
                    requiresLayer = true,
                    config = new SpiralWaveConfig({}),
                    additionalEffects = [],
                    ignoreAdditionalEffects = false,
                    settings = new Settings({}),
                }) {
        super({
            name,
            requiresLayer,
            config,
            additionalEffects,
            ignoreAdditionalEffects,
            settings,
        });
        this.#generate(settings);
    }

    /**
     * Draws a single spiral arm with wave distortion
     */
    async #drawSpiralArm(armIndex, context) {
        const {canvas, data, currentFrame, numberOfFrames} = context;
        const centerPos = data.center.getPosition(currentFrame, numberOfFrames);

        // Calculate arm-specific rotation offset
        const armAngleOffset = (armIndex * 360) / data.armCount;

        // Calculate time-based rotation
        const rotationProgress = findOneWayValue(0, 360, 1, numberOfFrames, currentFrame);
        const currentRotation = rotationProgress * data.rotationSpeed + armAngleOffset;

        // Calculate pulse effect
        const pulseProgress = findValue(0, 1, 1, numberOfFrames, currentFrame);
        const pulseMultiplier = 1 + Math.sin(pulseProgress * Math.PI * 4) * data.pulseIntensity;

        // Generate spiral points
        const points = [];
        const maxRadius = Math.min(data.width, data.height) * 0.4;
        const steps = 200;

        for (let i = 0; i < steps; i++) {
            const t = i / steps;
            const angle = currentRotation + (t * 360 * data.spiralTightness);
            const radius = t * maxRadius * pulseMultiplier;

            // Apply wave distortion
            const waveOffset = Math.sin(t * data.waveFrequency * Math.PI * 2 + currentFrame * data.waveSpeed) * data.waveAmplitude;
            const distortedRadius = radius + waveOffset;

            // Convert to cartesian coordinates
            const radians = (angle * Math.PI) / 180;
            const x = centerPos.x + Math.cos(radians) * distortedRadius;
            const y = centerPos.y + Math.sin(radians) * distortedRadius;

            points.push({x, y});
        }

        // Draw the spiral arm
        await this.#drawSpiralPath(points, armIndex, context);
    }

    /**
     * Draws the actual spiral path with the specified render mode
     */
    async #drawSpiralPath(points, armIndex, context) {
        const {canvas, data} = context;

        if (points.length < 2) return;

        // Determine colors based on render mode
        let strokeColor, fillColor;

        switch (data.renderMode) {
            case 'gradient':
                // Alternate between primary and secondary colors for each arm
                strokeColor = armIndex % 2 === 0 ? data.primaryColor : data.secondaryColor;
                fillColor = null;
                break;

            case 'solid':
                strokeColor = data.primaryColor;
                fillColor = null;
                break;

            case 'pulse':
                // Pulse between colors based on animation frame
                const pulseProgress = findValue(0, 1, 1, context.numberOfFrames, context.currentFrame);
                const pulseFactor = (Math.sin(pulseProgress * Math.PI * 6) + 1) / 2;
                strokeColor = pulseFactor > 0.5 ? data.primaryColor : data.secondaryColor;
                fillColor = null;
                break;

            default:
                strokeColor = data.primaryColor;
                fillColor = null;
        }

        // Draw the path
        await canvas.drawPath(points, data.lineWidth, strokeColor, 0, null);
    }

    /**
     * Main drawing function that creates all spiral arms
     */
    async #draw(context) {
        const {canvas, data} = context;

        // Draw all spiral arms
        for (let armIndex = 0; armIndex < data.armCount; armIndex++) {
            await this.#drawSpiralArm(armIndex, context);
        }

        // Convert canvas to layer
        let resultLayer = await canvas.convertToLayer();

        // Apply glow effect if configured
        if (data.glow > 0) {
            await resultLayer.blur(data.glow);
        }

        return resultLayer;
    }

    /**
     * Composites the drawn spiral with the layer
     */
    async #compositeImage(tempLayer, context, layer) {
        // Apply blur if configured
        if (context.data.blur > 0) {
            await tempLayer.blur(context.data.blur);
        }

        // Apply layer opacity
        await tempLayer.adjustLayerOpacity(context.data.layerOpacity);

        await layer.compositeLayerOver(tempLayer);
    }

    /**
     * Main effect execution function
     */
    async #spiralWave(layer, currentFrame, numberOfFrames) {
        const context = {
            currentFrame,
            numberOfFrames,
            canvas: await Canvas2dFactory.getNewCanvas(this.data.width, this.data.height),
            data: this.data,
        };

        const tempLayer = await this.#draw(context);
        await this.#compositeImage(tempLayer, context, layer);
    }

    /**
     * Generates the effect data from configuration
     */
    #generate(settings) {
        this.data = {
            // Core parameters
            spiralCount: this.config.spiralCount,
            armCount: this.config.armCount,
            spiralTightness: randomNumber(this.config.spiralTightness.lower, this.config.spiralTightness.upper),

            // Wave parameters
            waveAmplitude: randomNumber(this.config.waveAmplitude.lower, this.config.waveAmplitude.upper),
            waveFrequency: randomNumber(this.config.waveFrequency.lower, this.config.waveFrequency.upper),
            waveSpeed: randomNumber(this.config.waveSpeed.lower, this.config.waveSpeed.upper),

            // Visual parameters
            lineWidth: getRandomIntInclusive(this.config.lineWidth.lower, this.config.lineWidth.upper),
            opacity: randomNumber(this.config.opacity.lower, this.config.opacity.upper),

            // Colors
            primaryColor: this.config.primaryColor.getColor(settings),
            secondaryColor: this.config.secondaryColor.getColor(settings),

            // Animation parameters
            rotationSpeed: randomNumber(this.config.rotationSpeed.lower, this.config.rotationSpeed.upper),
            pulseIntensity: randomNumber(this.config.pulseIntensity.lower, this.config.pulseIntensity.upper),

            // Positioning
            center: this.config.center,

            // Rendering
            renderMode: getRandomFromArray(this.config.renderMode),

            // Layer effects
            layerOpacity: this.config.layerOpacity,
            blur: getRandomIntInclusive(this.config.blur.lower, this.config.blur.upper),
            glow: getRandomIntInclusive(this.config.glow.lower, this.config.glow.upper),

            // Canvas dimensions
            width: this.finalSize.width,
            height: this.finalSize.height,
        };
    }

    /**
     * Main invoke method called by the framework
     */
    async invoke(layer, currentFrame, numberOfFrames) {
        await this.#spiralWave(layer, currentFrame, numberOfFrames);
        await super.invoke(layer, currentFrame, numberOfFrames);
    }

    /**
     * Returns information about the current effect configuration
     */
    getInfo() {
        return `${this.name}: ${this.data.armCount} arms, ${this.data.renderMode} mode, wave: ${this.data.waveFrequency.toFixed(1)}Hz @ ${this.data.waveAmplitude.toFixed(1)}px`;
    }
}