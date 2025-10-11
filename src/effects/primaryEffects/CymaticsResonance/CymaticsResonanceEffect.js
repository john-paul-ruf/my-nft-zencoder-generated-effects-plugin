import {LayerEffect} from 'my-nft-gen/src/core/layer/LayerEffect.js';
import {Canvas2dFactory} from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import {LayerFactory} from 'my-nft-gen/src/core/factory/layer/LayerFactory.js';
import {randomNumber, randomId} from 'my-nft-gen/src/core/math/random.js';
import {Settings} from 'my-nft-gen/src/core/Settings.js';
import {CymaticsResonanceConfig} from './CymaticsResonanceConfig.js';
import sharp from 'sharp';

export class CymaticsResonanceEffect extends LayerEffect {
    static _name_ = 'cymatics-resonance';
    static _displayName_ = 'Cymatics Resonance';
    static _description_ = 'Mesmerizing standing wave patterns inspired by cymatics - visible sound vibrations creating harmonic interference patterns';
    static _version_ = '1.0.0';
    static _author_ = 'Zencoder';
    static _tags_ = ['effect', 'primary', 'cymatics', 'waves', 'harmonic', 'resonance', 'animated'];

    constructor({
                    name = CymaticsResonanceEffect._name_,
                    requiresLayer = true,
                    config = new CymaticsResonanceConfig({}),
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

    #generate(settings) {
        // Use finalSize from parent class LayerEffect which gets it from settings
        const width = this.finalSize?.width || 1024;
        const height = this.finalSize?.height || 1024;

        // Store all pre-generated data for pure function rendering
        this.data = {
            width,
            height,
            
            // Wave parameters
            waveFrequencyX: this.config.waveFrequencyX,
            waveFrequencyY: this.config.waveFrequencyY,
            harmonicCount: this.config.harmonicCount,
            harmonicRatio: this.config.harmonicRatio,
            waveAmplitude: this.config.waveAmplitude,
            interferenceIntensity: this.config.interferenceIntensity,
            
            // Visual style
            patternOpacityMin: this.config.patternOpacityMin,
            patternOpacityMax: this.config.patternOpacityMax,
            lineWidth: this.config.lineWidth,
            showFrequencyGrid: this.config.showFrequencyGrid,
            gridOpacity: this.config.gridOpacity,
            
            // Morphing
            morphSpeed: this.config.morphSpeed,
            morphComplexity: this.config.morphComplexity,
            phaseShiftSpeed: this.config.phaseShiftSpeed,
            perfectLoop: this.config.perfectLoop,
            
            // Layer composition
            layerOpacity: this.config.layerOpacity,
            layerBlendMode: this.config.layerBlendMode,
            
            // Colors (resolved from ColorPicker)
            primaryWaveColor: this.#getColorFromPicker(this.config.primaryWaveColor, settings),
            secondaryWaveColor: this.#getColorFromPicker(this.config.secondaryWaveColor, settings),
            nodeColor: this.#getColorFromPicker(this.config.nodeColor, settings),
            nodeCoreColor: this.#getColorFromPicker(this.config.nodeCoreColor, settings),
            rippleColor: this.#getColorFromPicker(this.config.rippleColor, settings),
            gridColor: this.#getColorFromPicker(this.config.gridColor, settings),
            
            // Pre-generated random values for consistent animation
            glowIntensity: randomNumber(this.config.glowIntensityMin, this.config.glowIntensityMax),
            blurAmount: randomNumber(this.config.blurAmountMin, this.config.blurAmountMax),
            
            // Generate resonant nodes (will be positioned based on wave field)
            nodes: null, // Will be assigned below
            
            // Generate harmonic ripples
            ripples: null, // Will be assigned below
        };
        
        // Generate components
        this.data.nodes = this.#generateNodes(width, height);
        this.data.ripples = this.#generateRipples(width, height);
    }

    #generateNodes(width, height) {
        const nodes = [];
        const area = (width * height) / (1024 * 1024); // Normalize to 1024x1024 reference
        const scaleFactor = Math.sqrt(area);
        const nodeCount = Math.max(20, Math.round(this.config.nodeCount * scaleFactor));
        
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                id: randomId(),
                // Initial position - will be updated based on wave field
                gridX: randomNumber(0, 1),
                gridY: randomNumber(0, 1),
                radius: randomNumber(this.config.nodeRadiusMin, this.config.nodeRadiusMax),
                pulseSpeed: randomNumber(this.config.nodePulseSpeedMin, this.config.nodePulseSpeedMax),
                pulseOffset: randomNumber(0, Math.PI * 2),
                glowRadius: randomNumber(this.config.nodeGlowRadiusMin, this.config.nodeGlowRadiusMax),
                intensityMultiplier: randomNumber(0.7, 1.3),
            });
        }
        
        return nodes;
    }

    #generateRipples(width, height) {
        const ripples = [];
        const area = (width * height) / (1024 * 1024);
        const scaleFactor = Math.sqrt(area);
        const rippleCount = Math.max(6, Math.round(this.config.rippleCount * scaleFactor));
        
        for (let i = 0; i < rippleCount; i++) {
            ripples.push({
                id: randomId(),
                speed: randomNumber(this.config.rippleSpeedMin, this.config.rippleSpeedMax),
                width: randomNumber(this.config.rippleWidthMin, this.config.rippleWidthMax),
                decayRate: this.config.rippleDecayRate,
                startOffset: randomNumber(0, 100),
                phaseOffset: randomNumber(0, Math.PI * 2),
                // Origin will be determined by node positions
                originNodeIndex: Math.floor(randomNumber(0, this.data?.nodes?.length || 10)),
            });
        }
        
        return ripples;
    }

    async invoke(layer, currentFrame, numberOfFrames) {
        // Draw cymatics resonance directly to layer
        await this.#drawCymaticsResonance(layer, currentFrame, numberOfFrames);
        return layer;
    }

    async #drawCymaticsResonance(layer, currentFrame, numberOfFrames) {
        // Create independent canvas following framework pattern
        const canvas = await Canvas2dFactory.getNewCanvas(this.data.width, this.data.height);

        // Draw all cymatics elements using the Canvas2d wrapper
        await this.#renderCymaticsElements(canvas, currentFrame, numberOfFrames);
        
        // Convert canvas to layer manually with proper dimensions
        // Note: canvas.convertToLayer() has a bug where it doesn't pass finalImageSize config
        const svgContent = canvas.strategy._generateSVG();
        const pngBuffer = await sharp(Buffer.from(svgContent))
            .png()
            .toBuffer();
        
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

        // Apply post-processing effects
        if (this.data.blurAmount > 0.3) {
            // Sharp requires blur between 0.3 and 1000
            const validBlurAmount = Math.min(1000, this.data.blurAmount);
            await resultLayer.blur(validBlurAmount);
        }

        await resultLayer.adjustLayerOpacity(this.data.layerOpacity);
        await layer.compositeLayerOver(resultLayer);
    }

    async #renderCymaticsElements(canvas, currentFrame, numberOfFrames) {
        const {width, height} = this.data;
        
        // Calculate loop phase for perfect looping
        const loopPhase = this.#calculateLoopPhase(currentFrame, numberOfFrames);

        // Draw frequency grid if enabled
        if (this.data.showFrequencyGrid) {
            await this.#drawFrequencyGrid(canvas, loopPhase);
        }

        // Calculate wave field (this is the core of the effect)
        const waveField = this.#calculateWaveField(loopPhase);

        // Draw wave patterns as contour lines
        await this.#drawWavePatterns(canvas, waveField, loopPhase);

        // Find and draw resonant nodes
        await this.#drawResonantNodes(canvas, waveField, currentFrame, numberOfFrames);

        // Draw harmonic ripples
        await this.#drawHarmonicRipples(canvas, waveField, currentFrame, numberOfFrames);
    }

    #calculateLoopPhase(currentFrame, numberOfFrames) {
        // Ensure perfect loop by preventing duplicate frame at loop point
        const progress = (currentFrame % numberOfFrames) / numberOfFrames;
        
        // Use sine wave for smooth transitions
        const cyclePhase = Math.sin(progress * Math.PI * 2 * this.data.morphComplexity);
        
        return {
            progress,
            frequencyMultiplier: 1 + cyclePhase * 0.3,
            phaseOffset: progress * Math.PI * 2,
            morphBlend: (Math.sin(progress * Math.PI * 2) + 1) / 2,
            harmonicShift: Math.cos(progress * Math.PI * 2 * this.data.morphSpeed) * 0.5,
        };
    }

    #calculateWaveField(loopPhase) {
        const {width, height} = this.data;
        const resolution = 64; // Calculate on a lower resolution grid for performance
        const field = [];
        
        const cellWidth = width / resolution;
        const cellHeight = height / resolution;
        
        for (let row = 0; row <= resolution; row++) {
            field[row] = [];
            for (let col = 0; col <= resolution; col++) {
                const x = col * cellWidth;
                const y = row * cellHeight;
                
                // Normalize coordinates to 0-1 range
                const nx = col / resolution;
                const ny = row / resolution;
                
                // Calculate wave amplitude at this point
                const amplitude = this.#calculateWaveAmplitude(nx, ny, loopPhase);
                
                field[row][col] = {
                    x,
                    y,
                    amplitude,
                    nx,
                    ny,
                };
            }
        }
        
        return field;
    }

    #calculateWaveAmplitude(nx, ny, loopPhase) {
        let amplitude = 0;
        
        // Sum all harmonic components
        for (let h = 0; h < this.data.harmonicCount; h++) {
            const harmonicIndex = h + 1;
            
            // Apply frequency with harmonic ratio and loop phase modulation
            const freqX = this.data.waveFrequencyX * harmonicIndex * this.data.harmonicRatio * loopPhase.frequencyMultiplier;
            const freqY = this.data.waveFrequencyY * harmonicIndex * this.data.harmonicRatio * loopPhase.frequencyMultiplier;
            
            // Standing wave equation: sin(kx) * sin(ky) * cos(ωt + φ)
            const waveX = Math.sin(nx * Math.PI * 2 * freqX);
            const waveY = Math.sin(ny * Math.PI * 2 * freqY);
            const temporal = Math.cos(loopPhase.phaseOffset + h * Math.PI / 3 + loopPhase.harmonicShift);
            
            // Harmonic decay (higher harmonics are weaker)
            const harmonicWeight = 1 / harmonicIndex;
            
            amplitude += waveX * waveY * temporal * harmonicWeight;
        }
        
        // Apply amplitude scaling and interference intensity
        amplitude *= this.data.waveAmplitude * this.data.interferenceIntensity;
        
        return amplitude;
    }



    async #drawFrequencyGrid(canvas, loopPhase) {
        const {width, height} = this.data;
        const gridSize = 32;
        const cellWidth = width / gridSize;
        const cellHeight = height / gridSize;
        
        // Pulsing grid opacity
        const pulseOpacity = this.data.gridOpacity * (0.7 + 0.3 * Math.sin(loopPhase.phaseOffset));
        const gridColor = this.#addAlpha(this.data.gridColor, pulseOpacity);
        
        // Draw vertical lines using Canvas2d API
        for (let i = 0; i <= gridSize; i++) {
            const x = i * cellWidth;
            await canvas.drawLine2d(
                {x: x, y: 0},
                {x: x, y: height},
                0.5,
                gridColor,
                0,
                null,
                1
            );
        }
        
        // Draw horizontal lines using Canvas2d API
        for (let i = 0; i <= gridSize; i++) {
            const y = i * cellHeight;
            await canvas.drawLine2d(
                {x: 0, y: y},
                {x: width, y: y},
                0.5,
                gridColor,
                0,
                null,
                1
            );
        }
    }

    async #drawWavePatterns(canvas, waveField, loopPhase) {
        const resolution = waveField.length - 1;
        
        // Draw wave patterns as horizontal and vertical lines modulated by amplitude
        // This creates a simpler but still beautiful interference pattern
        
        // Draw horizontal wave lines
        for (let row = 0; row < resolution; row += 2) {
            const path = [];
            for (let col = 0; col <= resolution; col++) {
                const point = waveField[row][col];
                // Modulate Y position based on amplitude
                const yOffset = point.amplitude * 10;
                path.push({
                    x: point.x,
                    y: point.y + yOffset
                });
            }
            
            // Color based on row position
            const colorBlend = row / resolution;
            const color = this.#blendColors(
                this.data.primaryWaveColor,
                this.data.secondaryWaveColor,
                colorBlend
            );
            
            const opacity = this.data.patternOpacityMin + 
                (this.data.patternOpacityMax - this.data.patternOpacityMin) * 0.5;
            const waveColor = this.#addAlpha(color, opacity);
            
            await canvas.drawPath(
                path,
                this.data.lineWidth,
                waveColor,
                0,
                null
            );
        }
        
        // Draw vertical wave lines
        for (let col = 0; col < resolution; col += 2) {
            const path = [];
            for (let row = 0; row <= resolution; row++) {
                const point = waveField[row][col];
                // Modulate X position based on amplitude
                const xOffset = point.amplitude * 10;
                path.push({
                    x: point.x + xOffset,
                    y: point.y
                });
            }
            
            // Color based on column position
            const colorBlend = col / resolution;
            const color = this.#blendColors(
                this.data.primaryWaveColor,
                this.data.secondaryWaveColor,
                colorBlend
            );
            
            const opacity = this.data.patternOpacityMin + 
                (this.data.patternOpacityMax - this.data.patternOpacityMin) * 0.5;
            const waveColor = this.#addAlpha(color, opacity);
            
            await canvas.drawPath(
                path,
                this.data.lineWidth,
                waveColor,
                0,
                null
            );
        }
    }

    async #drawResonantNodes(canvas, waveField, currentFrame, numberOfFrames) {
        const resolution = waveField.length - 1;
        
        // Find local maxima in the wave field
        const resonantPoints = [];
        
        for (let row = 1; row < resolution - 1; row++) {
            for (let col = 1; col < resolution - 1; col++) {
                const current = waveField[row][col].amplitude;
                
                // Check if this is a local maximum
                if (this.#isLocalMaximum(waveField, row, col) && current > 0.3) {
                    resonantPoints.push({
                        x: waveField[row][col].x,
                        y: waveField[row][col].y,
                        intensity: current,
                    });
                }
            }
        }
        
        // Draw nodes at resonant points
        const progress = currentFrame / numberOfFrames;
        
        for (let i = 0; i < Math.min(resonantPoints.length, this.data.nodes.length); i++) {
            const point = resonantPoints[i];
            const node = this.data.nodes[i];
            
            // Pulse animation
            const pulse = Math.sin(progress * Math.PI * 2 * node.pulseSpeed + node.pulseOffset);
            const pulseScale = 0.7 + 0.3 * pulse;
            
            const radius = node.radius * pulseScale * point.intensity;
            const glowRadius = node.glowRadius * pulseScale;
            
            // Draw glow using circle path with outer stroke
            const glowPath = this.#createCirclePath(point.x, point.y, radius);
            const glowColor = this.#addAlpha(this.data.nodeColor, 0.6 * point.intensity);
            
            await canvas.drawPath(
                glowPath,
                radius * 2, // innerStroke - filled appearance
                glowColor,
                glowRadius, // outerStroke for glow
                glowColor
            );
            
            // Draw core
            const corePath = this.#createCirclePath(point.x, point.y, radius * 0.5);
            const coreColor = this.#addAlpha(this.data.nodeCoreColor, 0.9);
            
            await canvas.drawPath(
                corePath,
                radius, // innerStroke - filled appearance
                coreColor,
                0,
                null
            );
        }
    }

    #isLocalMaximum(field, row, col) {
        const current = field[row][col].amplitude;
        
        // Check all 8 neighbors
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                
                const neighbor = field[row + dr][col + dc].amplitude;
                if (neighbor > current) {
                    return false;
                }
            }
        }
        
        return true;
    }

    async #drawHarmonicRipples(canvas, waveField, currentFrame, numberOfFrames) {
        const {width, height} = this.data;
        const progress = currentFrame / numberOfFrames;
        const resolution = waveField.length - 1;
        
        // Find some resonant points to use as ripple origins
        const origins = [];
        for (let row = 1; row < resolution - 1; row += 4) {
            for (let col = 1; col < resolution - 1; col += 4) {
                if (this.#isLocalMaximum(waveField, row, col) && waveField[row][col].amplitude > 0.4) {
                    origins.push({
                        x: waveField[row][col].x,
                        y: waveField[row][col].y,
                        intensity: waveField[row][col].amplitude,
                    });
                }
            }
        }
        
        if (origins.length === 0) return;
        
        // Draw ripples using Canvas2d API
        for (const ripple of this.data.ripples) {
            const originIndex = ripple.originNodeIndex % origins.length;
            const origin = origins[originIndex];
            
            // Calculate ripple expansion
            const rippleProgress = (progress + ripple.startOffset / 100) % 1;
            const maxRadius = Math.sqrt(width * width + height * height) / 2;
            const radius = rippleProgress * maxRadius * ripple.speed;
            
            // Fade out as ripple expands
            const opacity = (1 - rippleProgress) * origin.intensity * 0.6;
            
            if (opacity > 0.05) {
                const ripplePath = this.#createCirclePath(origin.x, origin.y, radius);
                const rippleColor = this.#addAlpha(this.data.rippleColor, opacity);
                
                await canvas.drawPath(
                    ripplePath,
                    ripple.width,
                    rippleColor,
                    0,
                    null
                );
            }
        }
    }

    #blendColors(color1, color2, blend) {
        // Simple color blending (assumes hex colors)
        const c1 = this.#hexToRgb(color1);
        const c2 = this.#hexToRgb(color2);
        
        const r = Math.round(c1.r * (1 - blend) + c2.r * blend);
        const g = Math.round(c1.g * (1 - blend) + c2.g * blend);
        const b = Math.round(c1.b * (1 - blend) + c2.b * blend);
        
        return `rgb(${r}, ${g}, ${b})`;
    }

    #hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Handle 3-digit hex
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16),
        };
    }

    #addAlpha(color, alpha) {
        // Handle rgb() format
        if (color.startsWith('rgb(')) {
            // Convert rgb(r, g, b) to rgba(r, g, b, alpha)
            return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
        }
        
        // Handle hex format
        const rgb = this.#hexToRgb(color);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    }

    /**
     * Helper method to create a circle path for Canvas2d API
     */
    #createCirclePath(centerX, centerY, radius) {
        const path = [];
        const steps = 32; // Smooth circle
        for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            path.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            });
        }
        return path;
    }

    /**
     * Helper method to get color from ColorPicker
     * Handles both static colors and dynamic color bucket selection
     */
    #getColorFromPicker(colorPicker, settings) {
        if (!colorPicker) {
            return '#FFFFFF';
        }
        
        // If it's already a string (shouldn't happen but defensive)
        if (typeof colorPicker === 'string') {
            return colorPicker;
        }
        
        // Use the ColorPicker's getColor method if available
        if (typeof colorPicker.getColor === 'function') {
            const color = colorPicker.getColor(settings);
            // Ensure we got a valid color back
            if (color && typeof color === 'string') {
                return color;
            }
        }
        
        // Fallback to value property
        return colorPicker.value || colorPicker.color || '#FFFFFF';
    }
}

// Set the config class reference for serialization
CymaticsResonanceEffect._configClass_ = CymaticsResonanceConfig;