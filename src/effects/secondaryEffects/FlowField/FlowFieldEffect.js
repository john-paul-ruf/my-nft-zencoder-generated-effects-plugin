import {LayerEffect} from 'my-nft-gen/src/core/layer/LayerEffect.js';
import {findValue} from 'my-nft-gen';
import {getRandomFromArray} from 'my-nft-gen/src/core/math/random.js';
import sharp from 'sharp';
import {globalBufferPool} from 'my-nft-gen/src/core/pool/BufferPool.js';

export class FlowFieldEffect extends LayerEffect {
    static _name_ = 'flow-field';

    constructor({
                    name = FlowFieldEffect._name_,
                    config,
                    settings
                }) {
        super({
            name,
            config
        });
        this.vectorField = [];
        this.time = 0;
        this.#generate(settings);
    }

    /**
     * Generates deterministic data from configuration to ensure invoke is pure
     */
    #generate(settings) {
        this.data = {
            // Pre-select algorithms for each parameter to avoid random selection in invoke
            flowAlgorithm: Array.isArray(this.config.flowAlgorithm)
                ? getRandomFromArray(this.config.flowAlgorithm)
                : this.config.flowAlgorithm,

            distortionAlgorithm: Array.isArray(this.config.distortionAlgorithm)
                ? getRandomFromArray(this.config.distortionAlgorithm)
                : this.config.distortionAlgorithm,

            turbulenceAlgorithm: Array.isArray(this.config.turbulenceAlgorithm)
                ? getRandomFromArray(this.config.turbulenceAlgorithm)
                : this.config.turbulenceAlgorithm,

            // Pre-select mode if it's an array
            mode: Array.isArray(this.config.mode)
                ? getRandomFromArray(this.config.mode)
                : this.config.mode,

            // Store layer opacity for compositing
            layerOpacity: this.config.layerOpacity,

            // Store dimensions from settings if available, otherwise will use layer dimensions
            width: settings?.width,
            height: settings?.height
        };
    }

    async invoke(layer, frameNumber, totalFrames) {
        // Get layer info for dimensions
        const layerInfo = await layer.getInfo();
        const width = this.data.width || layerInfo.width;
        const height = this.data.height || layerInfo.height;

        // Get the original layer as a buffer and convert to raw pixel data
        const layerBuffer = await layer.toBuffer();
        const {data: originalPixels, info} = await sharp(layerBuffer)
            .ensureAlpha()
            .raw()
            .toBuffer({resolveWithObject: true});

        // Create a buffer for the processed image
        const processedPixels = globalBufferPool.getBuffer(width, height, 4);

        // Copy original pixels to processed buffer
        processedPixels.set(originalPixels);

        // Calculate time for perfect loop animation (default: true)
        const progress = frameNumber / totalFrames;
        this.time = (this.config.perfectLoop !== false)
            ? progress * Math.PI * 2
            : frameNumber * 0.01;

        const flowStrength = findValue(
            this.config.flowStrength.lower,
            this.config.flowStrength.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.flowAlgorithm
        );

        const noiseScale = findValue(
            this.config.noiseScale.lower,
            this.config.noiseScale.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.distortionAlgorithm
        );

        const timeScale = findValue(
            this.config.timeScale.lower,
            this.config.timeScale.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.flowAlgorithm
        );

        const distortionAmount = findValue(
            this.config.distortionAmount.lower,
            this.config.distortionAmount.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.distortionAlgorithm
        );

        const turbulence = findValue(
            this.config.turbulence.lower,
            this.config.turbulence.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.turbulenceAlgorithm
        );

        const vortexIntensity = findValue(
            this.config.vortexIntensity.lower,
            this.config.vortexIntensity.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.flowAlgorithm
        );

        const vectorFieldStrength = findValue(
            this.config.vectorFieldStrength.lower,
            this.config.vectorFieldStrength.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.flowAlgorithm
        );

        const streamlineCoherence = findValue(
            this.config.streamlineCoherence.lower,
            this.config.streamlineCoherence.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.flowAlgorithm
        );

        const swirls = Math.round(findValue(
            this.config.swirls.lower,
            this.config.swirls.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.flowAlgorithm
        ));

        const animSpeed = this.config.animation.enabled
            ? findValue(
                this.config.animation.speed.lower,
                this.config.animation.speed.upper,
                1,
                totalFrames,
                frameNumber,
                this.data.flowAlgorithm
            )
            : 1;

        const pulseAmp = this.config.animation.enabled
            ? findValue(
                this.config.animation.pulseAmplitude.lower,
                this.config.animation.pulseAmplitude.upper,
                1,
                totalFrames,
                frameNumber,
                this.data.flowAlgorithm
            )
            : 0;

        const waveFreq = this.config.animation.enabled
            ? findValue(
                this.config.animation.waveFrequency.lower,
                this.config.animation.waveFrequency.upper,
                1,
                totalFrames,
                frameNumber,
                this.data.flowAlgorithm
            )
            : 1;

        const mode = this.data.mode;

        this.generateVectorField(width, height, progress, swirls, vortexIntensity, vectorFieldStrength, mode);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const vector = this.getFieldVector(
                    x, y, width, height,
                    flowStrength, noiseScale, timeScale,
                    turbulence, animSpeed, pulseAmp, waveFreq, streamlineCoherence, mode
                );

                const sourceX = x + vector.x * distortionAmount;
                const sourceY = y + vector.y * distortionAmount;

                const wrappedX = this.config.edgeBehavior === 'wrap'
                    ? (sourceX + width) % width
                    : Math.max(0, Math.min(width - 1, sourceX));

                const wrappedY = this.config.edgeBehavior === 'wrap'
                    ? (sourceY + height) % height
                    : Math.max(0, Math.min(height - 1, sourceY));

                const color = this.samplePixel(
                    originalPixels, wrappedX, wrappedY, width, height
                );

                if (this.config.colorShift.enabled) {
                    this.applyColorShift(color, frameNumber, totalFrames);
                }

                const idx = (y * width + x) * 4;
                const blendStrength = findValue(
                    this.config.blendStrength.lower,
                    this.config.blendStrength.upper,
                    1,
                    totalFrames,
                    frameNumber,
                    this.data.flowAlgorithm
                );

                processedPixels[idx] = color.r * blendStrength + processedPixels[idx] * (1 - blendStrength);
                processedPixels[idx + 1] = color.g * blendStrength + processedPixels[idx + 1] * (1 - blendStrength);
                processedPixels[idx + 2] = color.b * blendStrength + processedPixels[idx + 2] * (1 - blendStrength);

                if (!this.config.preserveAlpha) {
                    processedPixels[idx + 3] = color.a * blendStrength + processedPixels[idx + 3] * (1 - blendStrength);
                }
            }
        }

        // Convert processed pixels back to PNG buffer
        const processedBuffer = await sharp(processedPixels, {
            raw: {
                width: width,
                height: height,
                channels: 4
            }
        })
            .png()
            .toBuffer();

        // Return buffer to pool
        globalBufferPool.returnBuffer(processedPixels, width, height, 4);

        // Create a temporary layer from the processed buffer
        await layer.fromBuffer(processedBuffer);

        // Apply opacity adjustment
        await layer.adjustLayerOpacity(this.data.layerOpacity);

        // Composite the processed layer over the original layer
        return layer;
    }

    generateVectorField(width, height, progress, swirls, vortexIntensity, vectorFieldStrength, mode) {
        this.vectorField = [];
        const centerX = width / 2;
        const centerY = height / 2;

        for (let i = 0; i < swirls; i++) {
            const angle = (i / swirls) * Math.PI * 2;
            const radius = Math.min(width, height) * 0.3;

            const vortexX = centerX + Math.cos(angle + this.time) * radius;
            const vortexY = centerY + Math.sin(angle + this.time) * radius;

            // Apply vectorFieldStrength to modulate the overall field intensity
            const fieldStrength = vortexIntensity * vectorFieldStrength * (0.5 + 0.5 * Math.sin(this.time * 2 + i));

            this.vectorField.push({
                x: vortexX,
                y: vortexY,
                strength: fieldStrength,
                rotation: angle + this.time,
                fieldStrength: vectorFieldStrength // Store for use in field calculations
            });
        }
    }

    getFieldVector(x, y, width, height, flowStrength, noiseScale, timeScale, turbulence, animSpeed, pulseAmp, waveFreq, streamlineCoherence, mode) {
        let vx = 0;
        let vy = 0;

        const noise1 = this.noise3D(x * noiseScale, y * noiseScale, this.time * timeScale * animSpeed);
        const noise2 = this.noise3D(x * noiseScale * 2, y * noiseScale * 2, this.time * timeScale * animSpeed * 1.5);

        // Add wave frequency modulation to the base noise
        const waveModulation = Math.sin(this.time * animSpeed * waveFreq) * 0.5 + 0.5;
        const modulatedNoise1 = noise1 * (0.5 + 0.5 * waveModulation);
        const modulatedNoise2 = noise2 * (0.5 + 0.5 * waveModulation);

        switch (mode) {
            case 'liquid':
                vx = Math.sin(modulatedNoise1 * Math.PI * 2) * flowStrength;
                vy = Math.cos(modulatedNoise1 * Math.PI * 2) * flowStrength;
                break;

            case 'smoke':
                vx = modulatedNoise1 * flowStrength * 0.5;
                vy = -Math.abs(modulatedNoise2) * flowStrength;
                break;

            case 'plasma':
                const plasmaAngle = modulatedNoise1 * Math.PI * 4 + this.time * animSpeed * waveFreq;
                vx = Math.sin(plasmaAngle) * flowStrength;
                vy = Math.cos(plasmaAngle + modulatedNoise2 * Math.PI) * flowStrength;
                break;

            case 'vortex':
                for (const vortex of this.vectorField) {
                    const dx = x - vortex.x;
                    const dy = y - vortex.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance > 0 && distance < 200) {
                        const influence = vortex.strength * (1 - distance / 200);
                        const angle = Math.atan2(dy, dx) + Math.PI / 2;
                        vx += Math.cos(angle) * influence * flowStrength;
                        vy += Math.sin(angle) * influence * flowStrength;
                    }
                }
                break;
        }

        // Apply turbulence with wave frequency modulation
        const turbulenceWave = Math.sin(this.time * animSpeed * waveFreq * 2) * turbulence;
        vx += Math.sin(this.time * animSpeed * 2) * turbulenceWave * flowStrength * 0.3;
        vy += Math.cos(this.time * animSpeed * 1.5) * turbulenceWave * flowStrength * 0.3;

        // Apply pulse with wave frequency
        const pulse = 1 + Math.sin(this.time * animSpeed * waveFreq * 3) * pulseAmp;
        vx *= pulse;
        vy *= pulse;

        // Apply streamline coherence - higher values create more coherent, flowing patterns
        // Lower values create more chaotic, turbulent patterns
        const coherenceSmoothing = this.config.smoothingFactor.lower +
            Math.abs(noise1) * (this.config.smoothingFactor.upper - this.config.smoothingFactor.lower);

        // Streamline coherence affects how much the flow follows consistent directions
        const coherentVx = vx * streamlineCoherence;
        const coherentVy = vy * streamlineCoherence;

        // Add some perpendicular flow for interesting patterns when coherence is low
        const perpVx = -vy * (1 - streamlineCoherence) * 0.3;
        const perpVy = vx * (1 - streamlineCoherence) * 0.3;

        vx = (coherentVx + perpVx) * coherenceSmoothing;
        vy = (coherentVy + perpVy) * coherenceSmoothing;

        return {x: vx, y: vy};
    }

    samplePixel(pixels, x, y, width, height) {
        const x0 = Math.floor(x);
        const y0 = Math.floor(y);
        const x1 = Math.min(x0 + 1, width - 1);
        const y1 = Math.min(y0 + 1, height - 1);

        const fx = x - x0;
        const fy = y - y0;

        const idx00 = (y0 * width + x0) * 4;
        const idx10 = (y0 * width + x1) * 4;
        const idx01 = (y1 * width + x0) * 4;
        const idx11 = (y1 * width + x1) * 4;

        const r = this.bilinearInterpolate(
            pixels[idx00], pixels[idx10], pixels[idx01], pixels[idx11], fx, fy
        );
        const g = this.bilinearInterpolate(
            pixels[idx00 + 1], pixels[idx10 + 1], pixels[idx01 + 1], pixels[idx11 + 1], fx, fy
        );
        const b = this.bilinearInterpolate(
            pixels[idx00 + 2], pixels[idx10 + 2], pixels[idx01 + 2], pixels[idx11 + 2], fx, fy
        );
        const a = this.bilinearInterpolate(
            pixels[idx00 + 3], pixels[idx10 + 3], pixels[idx01 + 3], pixels[idx11 + 3], fx, fy
        );

        return {r, g, b, a};
    }

    bilinearInterpolate(v00, v10, v01, v11, fx, fy) {
        const v0 = v00 * (1 - fx) + v10 * fx;
        const v1 = v01 * (1 - fx) + v11 * fx;
        return v0 * (1 - fy) + v1 * fy;
    }

    applyColorShift(color, frameNumber, totalFrames) {
        const hueRotation = findValue(
            this.config.colorShift.hueRotation.lower,
            this.config.colorShift.hueRotation.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.flowAlgorithm
        );

        const satBoost = findValue(
            this.config.colorShift.saturationBoost.lower,
            this.config.colorShift.saturationBoost.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.flowAlgorithm
        );

        const brightness = findValue(
            this.config.colorShift.brightness.lower,
            this.config.colorShift.brightness.upper,
            1,
            totalFrames,
            frameNumber,
            this.data.flowAlgorithm
        );

        const {h, s, l} = this.rgbToHsl(color.r / 255, color.g / 255, color.b / 255);

        const newH = (h + hueRotation / 360) % 1;
        const newS = Math.max(0, Math.min(1, s + satBoost));
        const newL = Math.max(0, Math.min(1, l + brightness));

        const {r, g, b} = this.hslToRgb(newH, newS, newL);

        color.r = r * 255;
        color.g = g * 255;
        color.b = b * 255;
    }

    rgbToHsl(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }

        return {h, s, l};
    }

    hslToRgb(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return {r, g, b};
    }

    noise3D(x, y, z) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);

        const hash = (x, y, z) => {
            const h = x * 374761393 + y * 668265263 + z * 1274126177;
            return ((h ^ (h >> 13)) * 1274126177) / 2147483647 - 1;
        };

        const lerp = (t, a, b) => a + t * (b - a);

        const a = hash(X, Y, Z);
        const b = hash(X + 1, Y, Z);
        const c = hash(X, Y + 1, Z);
        const d = hash(X + 1, Y + 1, Z);
        const e = hash(X, Y, Z + 1);
        const f = hash(X + 1, Y, Z + 1);
        const g = hash(X, Y + 1, Z + 1);
        const h = hash(X + 1, Y + 1, Z + 1);

        const x1 = lerp(u, a, b);
        const x2 = lerp(u, c, d);
        const y1 = lerp(v, x1, x2);

        const x3 = lerp(u, e, f);
        const x4 = lerp(u, g, h);
        const y2 = lerp(v, x3, x4);

        return lerp(w, y1, y2);
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
}