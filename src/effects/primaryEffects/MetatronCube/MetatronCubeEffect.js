import {LayerEffect} from 'my-nft-gen/src/core/layer/LayerEffect.js';
import {Canvas2dFactory} from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import {
    getRandomFromArray,
    randomId,
    randomNumber,
} from 'my-nft-gen/src/core/math/random.js';
import {Settings} from 'my-nft-gen/src/core/Settings.js';
import {MetatronCubeConfig} from './MetatronCubeConfig.js';

export class MetatronCubeEffect extends LayerEffect {
    static _name_ = 'metatron-cube';
    static _displayName_ = 'Metatron Cube';
    static _description_ = 'Sacred geometry effect featuring Metatron\'s Cube with inscribed runes, Platonic solids, and overwhelming mystical detail';
    static _version_ = '1.0.0';
    static _author_ = 'Zencoder';
    static _tags_ = ['effect', 'primary', 'sacred-geometry', 'metatron', 'mystical', 'animated'];

    constructor({
                    name = MetatronCubeEffect._name_,
                    requiresLayer = true,
                    config = new MetatronCubeConfig({}),
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
        const width = this.finalSize?.width || 1024;
        const height = this.finalSize?.height || 1024;
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = Math.min(width, height) * this.config.cubeScale / 2;

        // Store all pre-generated data for pure function rendering
        this.data = {
            width,
            height,
            centerX,
            centerY,
            baseRadius,
            perfectLoop: this.config.perfectLoop,
            layerOpacity: this.config.layerOpacity,
            layerBlendMode: this.config.layerBlendMode,

            // Colors (direct from ColorPicker value)
            primaryColor: this.config.primaryColor.getColor(settings),
            secondaryColor: this.config.secondaryColor.getColor(settings),
            tertiaryColor: this.config.tertiaryColor.getColor(settings),
            runeColor: this.config.runeColor.getColor(settings),
            particleColor: this.config.particleColor.getColor(settings),
            glowColor: this.config.glowColor.getColor(settings),
            
            // Visual effects
            glowIntensity: randomNumber(this.config.glowIntensityMin, this.config.glowIntensityMax),
            blurAmount: randomNumber(this.config.blurAmountMin, this.config.blurAmountMax),
            
            // Generate all geometric components
            metatronCube: this.#generateMetatronCube(centerX, centerY, baseRadius),
            flowerOfLife: this.config.showFlowerOfLife ? this.#generateFlowerOfLife(centerX, centerY, baseRadius) : null,
            platonicSolids: this.config.showPlatonicSolids ? this.#generatePlatonicSolids(centerX, centerY, baseRadius) : null,
            outerRunes: this.#generateOuterRunes(centerX, centerY, baseRadius),
            innerGlyphs: this.#generateInnerGlyphs(centerX, centerY, baseRadius),
            particles: this.#generateParticles(centerX, centerY, baseRadius),
            energyPulses: this.#generateEnergyPulses(),
            centralMandala: this.config.showCentralMandala ? this.#generateCentralMandala(centerX, centerY, baseRadius) : null,
            
            // Animation settings (quantized for perfect loop if enabled)
            cubeRotationEnabled: this.config.cubeRotationEnabled,
            cubeRotationSpeed: this.#quantizeSpeed(this.config.cubeRotationSpeed),
            masterRotationSpeed: this.#quantizeSpeed(this.config.masterRotationSpeed),
            lineWidth: this.config.lineWidth,
            linePulseSpeed: this.#quantizeSpeed(this.config.linePulseSpeed),
            linePulseIntensity: this.config.linePulseIntensity,
            flowerBreathingSpeed: this.#quantizeSpeed(this.config.flowerBreathingSpeed),
            flowerBreathingAmount: this.config.flowerBreathingAmount,
            solidWireframeWidth: this.config.solidWireframeWidth,
            solidFaceOpacity: randomNumber(this.config.solidFaceOpacityMin, this.config.solidFaceOpacityMax),
            particleTrailLength: this.config.particleTrailLength,
            outerRuneRotationSpeed: this.#quantizeSpeed(this.config.outerRuneRotationSpeed),
            innerGlyphRotationSpeed: this.#quantizeSpeed(this.config.innerGlyphRotationSpeed),
            mandalaRotationSpeed: this.#quantizeSpeed(this.config.mandalaRotationSpeed),
        };
    }

    /**
     * Helper: Quantize speed to integer magnitude for perfect looping while preserving direction.
     * If perfectLoop is disabled, returns original value.
     */
    #quantizeSpeed(speed) {
        if (!this.config.perfectLoop) {
            return speed;
        }
        // Preserve sign to keep rotation direction; quantize magnitude for seamless loops
        const sign = speed < 0 ? -1 : 1;
        const magnitude = Math.max(1, Math.round(Math.abs(speed)));
        return sign * magnitude;
    }

    /**
     * Helper: Generate deterministic phase offset for perfect looping
     * If perfectLoop is enabled, uses index-based offset; otherwise random
     */
    #getPhaseOffset(index, total) {
        if (this.config.perfectLoop) {
            // Deterministic: evenly distribute phases across the cycle
            return (index / total) * Math.PI * 2;
        }
        // Random for visual variety when perfect loop not needed
        return Math.random() * Math.PI * 2;
    }

    /**
     * Helper: Generate integer frequency for perfect looping
     */
    #getIntegerFrequency(min, max) {
        const range = Math.floor(max - min) + 1;
        return Math.floor(min + Math.random() * range);
    }

    /**
     * Helper: Quantize speed within range for perfect looping
     */
    #getQuantizedSpeed(min, max) {
        if (this.config.perfectLoop) {
            return this.#getIntegerFrequency(min, max);
        }
        return randomNumber(min, max);
    }

    /**
     * Generate Metatron's Cube: 13 spheres and 78 connecting lines
     */
    #generateMetatronCube(centerX, centerY, baseRadius) {
        const spheres = [];
        const totalSpheres = 13; // 1 center + 6 inner + 6 outer
        let sphereIndex = 0;
        
        // Central sphere
        spheres.push({
            x: centerX,
            y: centerY,
            radius: randomNumber(this.config.sphereRadiusMin, this.config.sphereRadiusMax),
            glowRadius: randomNumber(this.config.vertexGlowRadiusMin, this.config.vertexGlowRadiusMax),
            pulseFrequency: this.#getIntegerFrequency(this.config.vertexPulseFrequencyMin, this.config.vertexPulseFrequencyMax),
            phaseOffset: this.#getPhaseOffset(sphereIndex++, totalSpheres),
        });
        
        // 6 inner circle spheres (hexagon)
        const innerRadius = baseRadius * 0.5;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            spheres.push({
                x: centerX + Math.cos(angle) * innerRadius,
                y: centerY + Math.sin(angle) * innerRadius,
                radius: randomNumber(this.config.sphereRadiusMin, this.config.sphereRadiusMax),
                glowRadius: randomNumber(this.config.vertexGlowRadiusMin, this.config.vertexGlowRadiusMax),
                pulseFrequency: this.#getIntegerFrequency(this.config.vertexPulseFrequencyMin, this.config.vertexPulseFrequencyMax),
                phaseOffset: this.#getPhaseOffset(sphereIndex++, totalSpheres),
            });
        }
        
        // 6 outer circle spheres (hexagon)
        const outerRadius = baseRadius;
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            spheres.push({
                x: centerX + Math.cos(angle) * outerRadius,
                y: centerY + Math.sin(angle) * outerRadius,
                radius: randomNumber(this.config.sphereRadiusMin, this.config.sphereRadiusMax),
                glowRadius: randomNumber(this.config.vertexGlowRadiusMin, this.config.vertexGlowRadiusMax),
                pulseFrequency: this.#getIntegerFrequency(this.config.vertexPulseFrequencyMin, this.config.vertexPulseFrequencyMax),
                phaseOffset: this.#getPhaseOffset(sphereIndex++, totalSpheres),
            });
        }
        
        // Generate all connecting lines (78 total)
        const lines = [];
        let lineIndex = 0;
        const totalLines = (spheres.length * (spheres.length - 1)) / 2; // 78 lines
        
        for (let i = 0; i < spheres.length; i++) {
            for (let j = i + 1; j < spheres.length; j++) {
                lines.push({
                    start: spheres[i],
                    end: spheres[j],
                    pulseSpeed: this.#getIntegerFrequency(this.config.energyPulseSpeedMin, this.config.energyPulseSpeedMax),
                    phaseOffset: this.#getPhaseOffset(lineIndex++, totalLines),
                });
            }
        }
        
        return { spheres, lines };
    }

    /**
     * Generate Flower of Life pattern
     */
    #generateFlowerOfLife(centerX, centerY, baseRadius) {
        const circles = [];
        const radius = baseRadius * 0.3;
        const totalCircles = 19; // 1 center + 6 first ring + 12 second ring
        let circleIndex = 0;
        
        // Central circle
        circles.push({
            x: centerX,
            y: centerY,
            radius: radius,
            opacity: randomNumber(this.config.flowerOpacityMin, this.config.flowerOpacityMax),
            phaseOffset: this.#getPhaseOffset(circleIndex++, totalCircles),
        });
        
        // 6 surrounding circles (first ring)
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            circles.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                radius: radius,
                opacity: randomNumber(this.config.flowerOpacityMin, this.config.flowerOpacityMax),
                phaseOffset: this.#getPhaseOffset(circleIndex++, totalCircles),
            });
        }
        
        // 12 outer circles (second ring)
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            const distance = i % 2 === 0 ? radius * 2 : radius * Math.sqrt(3);
            circles.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                radius: radius,
                opacity: randomNumber(this.config.flowerOpacityMin, this.config.flowerOpacityMax),
                phaseOffset: this.#getPhaseOffset(circleIndex++, totalCircles),
            });
        }
        
        return circles;
    }

    /**
     * Generate Platonic Solids (3D vertices and edges)
     */
    #generatePlatonicSolids(centerX, centerY, baseRadius) {
        const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
        const scale = baseRadius * this.config.solidScale;
        const totalSolids = 5;
        
        const solids = [
            {
                name: 'tetrahedron',
                vertices: [
                    [1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]
                ],
                edges: [[0,1], [0,2], [0,3], [1,2], [1,3], [2,3]],
                faces: [[0,1,2], [0,1,3], [0,2,3], [1,2,3]],
                rotationSpeed: {
                    x: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    y: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    z: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                },
                phaseOffset: this.#getPhaseOffset(0, totalSolids),
                edgeGlow: randomNumber(this.config.solidEdgeGlowMin, this.config.solidEdgeGlowMax),
            },
            {
                name: 'cube',
                vertices: [
                    [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
                    [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]
                ],
                edges: [
                    [0,1], [1,2], [2,3], [3,0], // bottom
                    [4,5], [5,6], [6,7], [7,4], // top
                    [0,4], [1,5], [2,6], [3,7]  // sides
                ],
                faces: [[0,1,2,3], [4,5,6,7], [0,1,5,4], [2,3,7,6], [0,3,7,4], [1,2,6,5]],
                rotationSpeed: {
                    x: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    y: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    z: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                },
                phaseOffset: this.#getPhaseOffset(1, totalSolids),
                edgeGlow: randomNumber(this.config.solidEdgeGlowMin, this.config.solidEdgeGlowMax),
            },
            {
                name: 'octahedron',
                vertices: [
                    [1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]
                ],
                edges: [
                    [0,2], [0,3], [0,4], [0,5],
                    [1,2], [1,3], [1,4], [1,5],
                    [2,4], [4,3], [3,5], [5,2]
                ],
                faces: [[0,2,4], [0,4,3], [0,3,5], [0,5,2], [1,2,5], [1,5,3], [1,3,4], [1,4,2]],
                rotationSpeed: {
                    x: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    y: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    z: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                },
                phaseOffset: this.#getPhaseOffset(2, totalSolids),
                edgeGlow: randomNumber(this.config.solidEdgeGlowMin, this.config.solidEdgeGlowMax),
            },
            {
                name: 'icosahedron',
                vertices: [
                    [0,1,phi], [0,1,-phi], [0,-1,phi], [0,-1,-phi],
                    [1,phi,0], [1,-phi,0], [-1,phi,0], [-1,-phi,0],
                    [phi,0,1], [phi,0,-1], [-phi,0,1], [-phi,0,-1]
                ],
                edges: [
                    [0,2], [0,4], [0,6], [0,8], [0,10],
                    [1,3], [1,4], [1,6], [1,9], [1,11],
                    [2,5], [2,7], [2,8], [2,10],
                    [3,5], [3,7], [3,9], [3,11],
                    [4,6], [4,8], [4,9],
                    [5,7], [5,8], [5,9],
                    [6,10], [6,11],
                    [7,10], [7,11],
                    [8,9], [10,11]
                ],
                rotationSpeed: {
                    x: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    y: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    z: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                },
                phaseOffset: this.#getPhaseOffset(3, totalSolids),
                edgeGlow: randomNumber(this.config.solidEdgeGlowMin, this.config.solidEdgeGlowMax),
            },
            {
                name: 'dodecahedron',
                vertices: [
                    [1,1,1], [1,1,-1], [1,-1,1], [1,-1,-1],
                    [-1,1,1], [-1,1,-1], [-1,-1,1], [-1,-1,-1],
                    [0,phi,1/phi], [0,phi,-1/phi], [0,-phi,1/phi], [0,-phi,-1/phi],
                    [1/phi,0,phi], [1/phi,0,-phi], [-1/phi,0,phi], [-1/phi,0,-phi],
                    [phi,1/phi,0], [phi,-1/phi,0], [-phi,1/phi,0], [-phi,-1/phi,0]
                ],
                edges: [
                    [0,8], [0,12], [0,16], [1,9], [1,13], [1,16],
                    [2,10], [2,12], [2,17], [3,11], [3,13], [3,17],
                    [4,8], [4,14], [4,18], [5,9], [5,15], [5,18],
                    [6,10], [6,14], [6,19], [7,11], [7,15], [7,19],
                    [8,9], [10,11], [12,13], [14,15], [16,17], [18,19]
                ],
                rotationSpeed: {
                    x: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    y: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                    z: this.#getQuantizedSpeed(this.config.solidRotationSpeedMin, this.config.solidRotationSpeedMax),
                },
                phaseOffset: this.#getPhaseOffset(4, totalSolids),
                edgeGlow: randomNumber(this.config.solidEdgeGlowMin, this.config.solidEdgeGlowMax),
            },
        ];
        
        // Normalize vertices and scale
        solids.forEach(solid => {
            solid.vertices = solid.vertices.map(v => {
                const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
                return [
                    (v[0] / len) * scale,
                    (v[1] / len) * scale,
                    (v[2] / len) * scale
                ];
            });
        });
        
        return solids;
    }

    /**
     * Generate outer rune circle
     */
    #generateOuterRunes(centerX, centerY, baseRadius) {
        const runes = [];
        const radius = baseRadius * this.config.outerRuneRadius;
        const runeSymbols = this.#getRuneSymbols();
        const totalRunes = this.config.outerRuneCount;
        
        for (let i = 0; i < totalRunes; i++) {
            const angle = (i / totalRunes) * Math.PI * 2;
            runes.push({
                symbol: runeSymbols[i % runeSymbols.length],
                angle: angle,
                radius: radius,
                size: this.config.outerRuneSize,
                opacity: randomNumber(this.config.outerRuneOpacityMin, this.config.outerRuneOpacityMax),
                phaseOffset: this.#getPhaseOffset(i, totalRunes),
            });
        }
        
        return runes;
    }

    /**
     * Generate inner glyph ring
     */
    #generateInnerGlyphs(centerX, centerY, baseRadius) {
        const glyphs = [];
        const radius = baseRadius * this.config.innerGlyphRadius;
        const glyphSymbols = this.#getGlyphSymbols();
        const totalGlyphs = this.config.innerGlyphCount;
        
        for (let i = 0; i < totalGlyphs; i++) {
            const angle = (i / totalGlyphs) * Math.PI * 2;
            glyphs.push({
                symbol: glyphSymbols[i % glyphSymbols.length],
                angle: angle,
                radius: radius,
                size: this.config.innerGlyphSize,
                opacity: randomNumber(this.config.innerGlyphOpacityMin, this.config.innerGlyphOpacityMax),
                phaseOffset: this.#getPhaseOffset(i, totalGlyphs),
            });
        }
        
        return glyphs;
    }

    /**
     * Generate energy particles flowing along cube lines
     */
    #generateParticles(centerX, centerY, baseRadius) {
        const particles = [];
        const totalParticles = this.config.particleCount;
        
        for (let i = 0; i < totalParticles; i++) {
            // Randomly assign to a line in the Metatron's Cube
            const lineIndex = Math.floor(Math.random() * 78);
            
            particles.push({
                lineIndex: lineIndex,
                progress: Math.random(), // 0 to 1 along the line
                speed: this.#getQuantizedSpeed(this.config.particleSpeedMin, this.config.particleSpeedMax),
                size: randomNumber(this.config.particleSizeMin, this.config.particleSizeMax),
                glow: randomNumber(this.config.particleGlowMin, this.config.particleGlowMax),
                phaseOffset: this.#getPhaseOffset(i, totalParticles),
                trail: [],
            });
        }
        
        return particles;
    }

    /**
     * Generate energy pulses along cube lines
     */
    #generateEnergyPulses() {
        const pulses = [];
        const totalPulses = this.config.energyPulseCount;
        
        for (let i = 0; i < totalPulses; i++) {
            pulses.push({
                lineIndex: Math.floor(Math.random() * 78),
                speed: this.#getIntegerFrequency(this.config.energyPulseSpeedMin, this.config.energyPulseSpeedMax),
                width: randomNumber(this.config.energyPulseWidthMin, this.config.energyPulseWidthMax),
                phaseOffset: this.#getPhaseOffset(i, totalPulses),
            });
        }
        
        return pulses;
    }

    /**
     * Generate central mandala pattern
     */
    #generateCentralMandala(centerX, centerY, baseRadius) {
        const layers = [];
        const mandalaRadius = baseRadius * 0.15;
        const totalLayers = this.config.mandalaLayers;
        const totalPetals = this.config.mandalaPetalCount;
        
        for (let layer = 0; layer < totalLayers; layer++) {
            const layerRadius = mandalaRadius * (1 - layer * 0.3);
            const petals = [];
            
            for (let i = 0; i < totalPetals; i++) {
                const angle = (i / totalPetals) * Math.PI * 2;
                petals.push({
                    angle: angle,
                    radius: layerRadius,
                    size: layerRadius * 0.4,
                    phaseOffset: this.#getPhaseOffset(i + layer * totalPetals, totalLayers * totalPetals),
                });
            }
            
            layers.push({
                petals: petals,
                opacity: randomNumber(this.config.mandalaOpacityMin, this.config.mandalaOpacityMax),
                rotationOffset: layer * (Math.PI / totalPetals),
            });
        }
        
        return layers;
    }

    /**
     * Get rune symbols (Elder Futhark and alchemical)
     */
    #getRuneSymbols() {
        return ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'];
    }

    /**
     * Get glyph symbols (alchemical and hermetic)
     */
    #getGlyphSymbols() {
        return ['☿', '♀', '♁', '♂', '♃', '♄', '☉', '☽'];
    }

    /**
     * Rotate 3D vertex
     */
    #rotateVertex3D(vertex, angleX, angleY, angleZ) {
        let [x, y, z] = vertex;
        
        // Rotate around X axis
        let cosX = Math.cos(angleX);
        let sinX = Math.sin(angleX);
        let y1 = y * cosX - z * sinX;
        let z1 = y * sinX + z * cosX;
        y = y1;
        z = z1;
        
        // Rotate around Y axis
        let cosY = Math.cos(angleY);
        let sinY = Math.sin(angleY);
        let x1 = x * cosY + z * sinY;
        let z2 = -x * sinY + z * cosY;
        x = x1;
        z = z2;
        
        // Rotate around Z axis
        let cosZ = Math.cos(angleZ);
        let sinZ = Math.sin(angleZ);
        let x2 = x * cosZ - y * sinZ;
        let y2 = x * sinZ + y * cosZ;
        x = x2;
        y = y2;
        
        return [x, y, z];
    }

    /**
     * Project 3D point to 2D
     */
    #project3DTo2D(vertex, centerX, centerY, focalLength = 500) {
        const [x, y, z] = vertex;
        const scale = focalLength / (focalLength + z);
        return {
            x: centerX + x * scale,
            y: centerY + y * scale,
            scale: scale,
        };
    }

    /**
     * Blend two hex colors
     */
    #blendColors(color1, color2, ratio) {
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);
        
        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);
        
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    /**
     * Create circle path
     */
    #createCirclePath(x, y, radius) {
        const path = [];
        const segments = 32;
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            path.push({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius,
            });
        }
        return path;
    }

    /**
     * Main invoke method - renders the effect
     */
    async invoke(layer, currentFrame, numberOfFrames) {
        await this.#drawMetatronCubeEffect(layer, currentFrame, numberOfFrames);
        await super.invoke(layer, currentFrame, numberOfFrames);
        return layer;
    }

    async #drawMetatronCubeEffect(layer, currentFrame, numberOfFrames) {
        // Create independent canvas following framework pattern
        const canvas = await Canvas2dFactory.getNewCanvas(this.data.width, this.data.height);
        
        // Calculate animation progress
        const progress = (currentFrame / numberOfFrames) * Math.PI * 2;
        const masterRotation = progress * this.data.masterRotationSpeed;
        
        // Draw Flower of Life (if enabled)
        if (this.data.flowerOfLife) {
            await this.#drawFlowerOfLife(canvas, currentFrame, numberOfFrames);
        }
        
        // Draw Metatron's Cube structure
        await this.#drawMetatronCube(canvas, currentFrame, numberOfFrames);
        
        // Draw Platonic Solids (if enabled)
        if (this.data.platonicSolids) {
            await this.#drawPlatonicSolids(canvas, currentFrame, numberOfFrames, masterRotation);
        }
        
        // Draw energy pulses
        await this.#drawEnergyPulses(canvas, currentFrame, numberOfFrames);
        
        // Draw particles
        await this.#drawParticles(canvas, currentFrame, numberOfFrames);
        
        // Draw outer runes
        await this.#drawOuterRunes(canvas, currentFrame, numberOfFrames);
        
        // Draw inner glyphs
        await this.#drawInnerGlyphs(canvas, currentFrame, numberOfFrames);
        
        // Draw central mandala (if enabled)
        if (this.data.centralMandala) {
            await this.#drawCentralMandala(canvas, currentFrame, numberOfFrames);
        }
        
        // Convert canvas to layer and composite
        const resultLayer = await canvas.convertToLayer();
        
        // Apply post-processing effects
        if (this.data.blurAmount > 0.3) {
            const validBlurAmount = Math.min(1000, this.data.blurAmount);
            await resultLayer.blur(validBlurAmount);
        }
        
        await resultLayer.adjustLayerOpacity(this.data.layerOpacity);
        await layer.compositeLayerOver(resultLayer);
    }



    /**
     * Draw Flower of Life
     */
    async #drawFlowerOfLife(canvas, currentFrame, numberOfFrames) {
        const progress = (currentFrame / numberOfFrames) * Math.PI * 2;
        const breathingScale = 1.0 + Math.sin(progress * this.data.flowerBreathingSpeed) * this.data.flowerBreathingAmount;
        
        for (const circle of this.data.flowerOfLife) {
            const opacity = circle.opacity * (0.8 + Math.sin(progress + circle.phaseOffset) * 0.2);
            if (opacity < 0.01) continue;
            
            const scaledRadius = circle.radius * breathingScale;
            const colorWithOpacity = this.#adjustColorOpacity(this.data.secondaryColor, opacity);
            
            await canvas.drawRing2d(
                {x: circle.x, y: circle.y},
                scaledRadius,
                1, // innerStroke
                colorWithOpacity,
                this.data.glowIntensity * 0.5, // outerStroke (glow)
                colorWithOpacity,
                1.0 // opacity already applied to color
            );
        }
    }

    /**
     * Draw Metatron's Cube
     */
    async #drawMetatronCube(canvas, currentFrame, numberOfFrames) {
        const animProgress = (currentFrame / numberOfFrames) * Math.PI * 2;
        const {spheres, lines} = this.data.metatronCube;
        
        // Calculate rotation angle if enabled
        const rotationAngle = this.data.cubeRotationEnabled 
            ? animProgress * this.data.cubeRotationSpeed 
            : 0;
        
        // Helper function to rotate a point around center
        const rotatePoint = (x, y, angle) => {
            const dx = x - this.data.centerX;
            const dy = y - this.data.centerY;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return {
                x: this.data.centerX + (dx * cos - dy * sin),
                y: this.data.centerY + (dx * sin + dy * cos)
            };
        };
        
        // Draw connecting lines with enhanced energy pulses
        for (const line of lines) {
            // Apply rotation to line endpoints
            const startPos = rotationAngle !== 0 
                ? rotatePoint(line.start.x, line.start.y, rotationAngle)
                : {x: line.start.x, y: line.start.y};
            const endPos = rotationAngle !== 0 
                ? rotatePoint(line.end.x, line.end.y, rotationAngle)
                : {x: line.end.x, y: line.end.y};
            
            // Enhanced pulsing effect along the line (perfect loop)
            const pulseProgress = (animProgress * line.pulseSpeed * this.data.linePulseSpeed + line.phaseOffset) % (Math.PI * 2);
            const intensity = (Math.sin(pulseProgress) + 1) / 2;
            const pulseIntensity = this.data.linePulseIntensity;
            
            // Create more dramatic color shifts
            const color = this.#blendColors(this.data.primaryColor, this.data.tertiaryColor, intensity);
            const opacity = 0.3 + intensity * pulseIntensity;
            const glowMultiplier = 1.0 + intensity * pulseIntensity * 1.5;
            const colorWithOpacity = this.#adjustColorOpacity(color, opacity);
            
            await canvas.drawLine2d(
                startPos,
                endPos,
                this.data.lineWidth, // innerStroke
                colorWithOpacity,
                this.data.glowIntensity * glowMultiplier, // outerStroke (glow)
                colorWithOpacity,
                1.0 // opacity already applied to color
            );
        }
        
        // Draw spheres with rotation
        for (const sphere of spheres) {
            // Apply rotation to sphere position
            const spherePos = rotationAngle !== 0 
                ? rotatePoint(sphere.x, sphere.y, rotationAngle)
                : {x: sphere.x, y: sphere.y};
            
            // Sphere pulsing (perfect loop with integer frequency)
            const pulseProgress = (animProgress * sphere.pulseFrequency + sphere.phaseOffset) % (Math.PI * 2);
            const pulseScale = 1.0 + Math.sin(pulseProgress) * 0.2;
            const glowScale = 1.0 + Math.sin(pulseProgress) * 0.5;
            const sphereColorWithOpacity = this.#adjustColorOpacity(this.data.primaryColor, 0.8);
            
            await canvas.drawRing2d(
                spherePos,
                sphere.radius * pulseScale,
                2, // innerStroke
                sphereColorWithOpacity,
                sphere.glowRadius * glowScale, // outerStroke (glow)
                sphereColorWithOpacity,
                1.0 // opacity already applied to color
            );
        }
    }

    /**
     * Draw Platonic Solids
     */
    async #drawPlatonicSolids(canvas, currentFrame, numberOfFrames, masterRotation) {
        const progress = (currentFrame / numberOfFrames) * Math.PI * 2;
        
        for (const solid of this.data.platonicSolids) {
            const angleX = progress * solid.rotationSpeed.x + solid.phaseOffset;
            const angleY = progress * solid.rotationSpeed.y + solid.phaseOffset;
            const angleZ = progress * solid.rotationSpeed.z + solid.phaseOffset;
            
            // Rotate and project vertices
            const projectedVertices = solid.vertices.map(vertex => {
                const rotated = this.#rotateVertex3D(vertex, angleX, angleY, angleZ);
                return this.#project3DTo2D(rotated, this.data.centerX, this.data.centerY);
            });
            
            // Draw edges
            for (const edge of solid.edges) {
                const v1 = projectedVertices[edge[0]];
                const v2 = projectedVertices[edge[1]];
                
                // Calculate opacity based on Z-depth (closer = more opaque)
                const avgScale = (v1.scale + v2.scale) / 2;
                const opacity = 0.2 + avgScale * 0.5;
                
                if (opacity < 0.01) continue;
                
                const edgeColorWithOpacity = this.#adjustColorOpacity(this.data.secondaryColor, opacity);
                
                await canvas.drawLine2d(
                    {x: v1.x, y: v1.y},
                    {x: v2.x, y: v2.y},
                    this.data.solidWireframeWidth, // innerStroke
                    edgeColorWithOpacity,
                    solid.edgeGlow * avgScale, // outerStroke (glow)
                    edgeColorWithOpacity,
                    1.0 // opacity already applied to color
                );
            }
            
            // Draw faces with subtle opacity for depth effect
            if (solid.faces && this.data.solidFaceOpacity > 0.01) {
                for (const face of solid.faces) {
                    const faceVertices = face.map(idx => projectedVertices[idx]);
                    
                    // Calculate average Z-depth for face
                    const avgScale = faceVertices.reduce((sum, v) => sum + v.scale, 0) / faceVertices.length;
                    const faceOpacity = this.data.solidFaceOpacity * avgScale;
                    
                    if (faceOpacity < 0.01) continue;
                    
                    // Draw filled polygon for face
                    const points = faceVertices.map(v => ({x: v.x, y: v.y}));
                    const faceColorWithOpacity = this.#adjustColorOpacity(this.data.tertiaryColor, faceOpacity);
                    
                    // Draw as a series of triangles from first vertex (simple fan triangulation)
                    for (let i = 1; i < points.length - 1; i++) {
                        await canvas.drawLine2d(
                            points[0],
                            points[i],
                            0, // no stroke
                            faceColorWithOpacity,
                            0, // no glow
                            faceColorWithOpacity,
                            1.0 // opacity already applied to color
                        );
                        await canvas.drawLine2d(
                            points[i],
                            points[i + 1],
                            0,
                            faceColorWithOpacity,
                            0,
                            faceColorWithOpacity,
                            1.0 // opacity already applied to color
                        );
                        await canvas.drawLine2d(
                            points[i + 1],
                            points[0],
                            0,
                            faceColorWithOpacity,
                            0,
                            faceColorWithOpacity,
                            1.0 // opacity already applied to color
                        );
                    }
                }
            }
        }
    }

    /**
     * Draw energy pulses along cube lines
     */
    async #drawEnergyPulses(canvas, currentFrame, numberOfFrames) {
        const progress = (currentFrame / numberOfFrames);
        const animProgress = progress * Math.PI * 2;
        const {lines} = this.data.metatronCube;
        
        // Calculate rotation angle if enabled (same as cube rotation)
        const rotationAngle = this.data.cubeRotationEnabled 
            ? animProgress * this.data.cubeRotationSpeed 
            : 0;
        
        // Helper function to rotate a point around center
        const rotatePoint = (x, y, angle) => {
            const dx = x - this.data.centerX;
            const dy = y - this.data.centerY;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return {
                x: this.data.centerX + (dx * cos - dy * sin),
                y: this.data.centerY + (dx * sin + dy * cos)
            };
        };
        
        for (const pulse of this.data.energyPulses) {
            const line = lines[pulse.lineIndex];
            if (!line) continue;
            
            // Calculate pulse position along line (perfect loop)
            // Use animProgress (0 to 2π) for smooth looping with phase offset
            const pulseProgress = ((animProgress * pulse.speed + pulse.phaseOffset) / (Math.PI * 2)) % 1;
            
            // Apply rotation to line endpoints FIRST
            const startPos = rotationAngle !== 0 
                ? rotatePoint(line.start.x, line.start.y, rotationAngle)
                : {x: line.start.x, y: line.start.y};
            const endPos = rotationAngle !== 0 
                ? rotatePoint(line.end.x, line.end.y, rotationAngle)
                : {x: line.end.x, y: line.end.y};
            
            // Calculate pulse position along the ROTATED line
            const pulsePos = {
                x: startPos.x + (endPos.x - startPos.x) * pulseProgress,
                y: startPos.y + (endPos.y - startPos.y) * pulseProgress
            };
            
            // Add pulsing size effect
            const sizeProgress = (animProgress * 2 + pulse.phaseOffset) % (Math.PI * 2);
            const sizePulse = 1.0 + Math.sin(sizeProgress) * 0.3;
            const glowPulse = 1.0 + Math.sin(sizeProgress) * 0.5;
            const pulseColorWithOpacity = this.#adjustColorOpacity(this.data.tertiaryColor, 0.8);
            
            // Draw pulse as a glowing circle with enhanced effects
            await canvas.drawRing2d(
                pulsePos,
                pulse.width * sizePulse,
                0, // no inner stroke (filled circle)
                pulseColorWithOpacity,
                this.data.glowIntensity * 1.5 * glowPulse, // outerStroke (glow)
                pulseColorWithOpacity,
                1.0 // opacity already applied to color
            );
        }
    }

    /**
     * Draw energy particles with trails
     */
    async #drawParticles(canvas, currentFrame, numberOfFrames) {
        const progress = (currentFrame / numberOfFrames);
        const animProgress = progress * Math.PI * 2;
        const {lines} = this.data.metatronCube;
        
        // Calculate rotation angle if enabled (same as cube rotation)
        const rotationAngle = this.data.cubeRotationEnabled 
            ? animProgress * this.data.cubeRotationSpeed 
            : 0;
        
        // Helper function to rotate a point around center
        const rotatePoint = (x, y, angle) => {
            const dx = x - this.data.centerX;
            const dy = y - this.data.centerY;
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return {
                x: this.data.centerX + (dx * cos - dy * sin),
                y: this.data.centerY + (dx * sin + dy * cos)
            };
        };
        
        for (const particle of this.data.particles) {
            const line = lines[particle.lineIndex];
            if (!line) continue;
            
            // Apply rotation to line endpoints FIRST
            const startPos = rotationAngle !== 0 
                ? rotatePoint(line.start.x, line.start.y, rotationAngle)
                : {x: line.start.x, y: line.start.y};
            const endPos = rotationAngle !== 0 
                ? rotatePoint(line.end.x, line.end.y, rotationAngle)
                : {x: line.end.x, y: line.end.y};
            
            // Update particle position along the ROTATED line
            const particleProgress = ((progress * particle.speed + particle.phaseOffset / (Math.PI * 2)) % 1);
            const x = startPos.x + (endPos.x - startPos.x) * particleProgress;
            const y = startPos.y + (endPos.y - startPos.y) * particleProgress;
            
            // Draw particle trail
            if (this.data.particleTrailLength > 0) {
                const trailStep = 0.02; // Distance between trail segments
                for (let i = 1; i <= this.data.particleTrailLength; i++) {
                    const trailProgress = particleProgress - (i * trailStep);
                    if (trailProgress < 0) continue; // Don't wrap around
                    
                    // Calculate trail position along the ROTATED line
                    const trailX = startPos.x + (endPos.x - startPos.x) * trailProgress;
                    const trailY = startPos.y + (endPos.y - startPos.y) * trailProgress;
                    
                    // Fade trail based on distance from particle
                    const trailOpacity = 0.6 * (1 - i / this.data.particleTrailLength);
                    const trailSize = particle.size * (1 - i / (this.data.particleTrailLength * 2));
                    const trailColorWithOpacity = this.#adjustColorOpacity(this.data.particleColor, trailOpacity);
                    
                    await canvas.drawRing2d(
                        {x: trailX, y: trailY},
                        trailSize,
                        0, // no inner stroke (filled circle)
                        trailColorWithOpacity,
                        particle.glow * 0.5, // reduced glow for trail
                        trailColorWithOpacity,
                        1.0 // opacity already applied to color
                    );
                }
            }
            
            // Draw main particle
            const particleColorWithOpacity = this.#adjustColorOpacity(this.data.particleColor, 0.9);
            await canvas.drawRing2d(
                {x, y},
                particle.size,
                0, // no inner stroke (filled circle)
                particleColorWithOpacity,
                particle.glow, // outerStroke (glow)
                particleColorWithOpacity,
                1.0 // opacity already applied to color
            );
        }
    }

    /**
     * Draw outer runes
     */
    async #drawOuterRunes(canvas, currentFrame, numberOfFrames) {
        const progress = (currentFrame / numberOfFrames) * Math.PI * 2;
        const rotation = progress * this.data.outerRuneRotationSpeed;
        
        for (const rune of this.data.outerRunes) {
            const angle = rune.angle + rotation;
            const x = this.data.centerX + Math.cos(angle) * rune.radius;
            const y = this.data.centerY + Math.sin(angle) * rune.radius;
            
            const opacity = rune.opacity * (0.7 + Math.sin(progress + rune.phaseOffset) * 0.3);
            if (opacity < 0.01) continue;
            
            const runeColorWithOpacity = this.#adjustColorOpacity(this.data.runeColor, opacity);
            const glowColorWithOpacity = this.#adjustColorOpacity(this.data.glowColor, opacity);
            
            // Try to draw text if available, otherwise fallback to geometric shape
            if (typeof canvas.drawText === 'function') {
                await canvas.drawText(
                    rune.symbol,             // text
                    x,                       // x coordinate
                    y,                       // y coordinate
                    {
                        fontSize: rune.size,
                        color: runeColorWithOpacity,
                        alpha: 1.0, // opacity already applied to color
                        textAnchor: 'middle',
                        dominantBaseline: 'middle',
                        strokeWidth: this.data.glowIntensity * 0.8,
                        strokeColor: glowColorWithOpacity,
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold'
                    }
                );
            } else {
                // Fallback: Draw rune as a small diamond shape (4-sided polygon rotated 45 degrees)
                await canvas.drawPolygon2d(
                    rune.size / 2,           // radius
                    {x, y},                  // position
                    4,                       // numberOfSides (diamond)
                    angle + Math.PI / 4,     // startAngle (rotated 45 degrees + rune rotation)
                    1,                       // innerStroke
                    runeColorWithOpacity,     // innerColor
                    this.data.glowIntensity * 0.8, // outerStroke (glow)
                    runeColorWithOpacity,     // outerColor
                    1.0                  // opacity already applied to color
                );
            }
        }
    }

    /**
     * Draw inner glyphs
     */
    async #drawInnerGlyphs(canvas, currentFrame, numberOfFrames) {
        const progress = (currentFrame / numberOfFrames) * Math.PI * 2;
        const rotation = progress * this.data.innerGlyphRotationSpeed;
        
        for (const glyph of this.data.innerGlyphs) {
            const angle = glyph.angle + rotation;
            const x = this.data.centerX + Math.cos(angle) * glyph.radius;
            const y = this.data.centerY + Math.sin(angle) * glyph.radius;
            
            const opacity = glyph.opacity * (0.8 + Math.sin(progress + glyph.phaseOffset) * 0.2);
            if (opacity < 0.01) continue;
            
            const glyphColorWithOpacity = this.#adjustColorOpacity(this.data.runeColor, opacity);
            const glyphGlowColorWithOpacity = this.#adjustColorOpacity(this.data.glowColor, opacity);
            
            // Try to draw text if available, otherwise fallback to geometric shape
            if (typeof canvas.drawText === 'function') {
                await canvas.drawText(
                    glyph.symbol,            // text
                    x,                       // x coordinate
                    y,                       // y coordinate
                    {
                        fontSize: glyph.size,
                        color: glyphColorWithOpacity,
                        alpha: 1.0, // opacity already applied to color
                        textAnchor: 'middle',
                        dominantBaseline: 'middle',
                        strokeWidth: this.data.glowIntensity,
                        strokeColor: glyphGlowColorWithOpacity,
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold'
                    }
                );
            } else {
                // Fallback: Draw glyph as a triangle (3-sided polygon)
                await canvas.drawPolygon2d(
                    glyph.size / 2,          // radius
                    {x, y},                  // position
                    3,                       // numberOfSides (triangle)
                    angle,                   // startAngle (rotates with glyph)
                    1,                       // innerStroke
                    glyphColorWithOpacity,     // innerColor
                    this.data.glowIntensity, // outerStroke (glow)
                    glyphColorWithOpacity,     // outerColor
                    1.0                  // opacity already applied to color
                );
            }
        }
    }

    /**
     * Draw central mandala
     */
    async #drawCentralMandala(canvas, currentFrame, numberOfFrames) {
        const progress = (currentFrame / numberOfFrames) * Math.PI * 2;
        const rotation = progress * this.data.mandalaRotationSpeed;
        
        for (const layer of this.data.centralMandala) {
            const layerRotation = rotation + layer.rotationOffset;
            
            for (const petal of layer.petals) {
                const angle = petal.angle + layerRotation;
                const x = this.data.centerX + Math.cos(angle) * petal.radius;
                const y = this.data.centerY + Math.sin(angle) * petal.radius;
                
                const opacity = layer.opacity * (0.8 + Math.sin(progress + petal.phaseOffset) * 0.2);
                if (opacity < 0.01) continue;
                
                const petalColorWithOpacity = this.#adjustColorOpacity(this.data.primaryColor, opacity);
                
                // Draw petal as a small glowing circle
                await canvas.drawRing2d(
                    {x, y},                          // position
                    petal.size,                      // radius
                    1,                               // innerStroke
                    petalColorWithOpacity,          // innerColor
                    this.data.glowIntensity * 0.6,   // outerStroke (glow)
                    petalColorWithOpacity,          // outerColor
                    1.0                          // opacity already applied to color
                );
            }
        }
    }

    /**
     * Adjust color opacity by modifying the alpha channel
     * @param {string} color - Color in hex format (e.g., "#FF0000")
     * @param {number} opacity - Opacity value between 0 and 1
     * @returns {string} Color with adjusted opacity
     */
    #adjustColorOpacity(color, opacity) {
        // Handle hex colors
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            let r, g, b;
            
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else if (hex.length === 6) {
                r = parseInt(hex.slice(0, 2), 16);
                g = parseInt(hex.slice(2, 4), 16);
                b = parseInt(hex.slice(4, 6), 16);
            } else {
                return color; // Return original if format is unexpected
            }
            
            // Clamp opacity between 0 and 1
            const alpha = Math.max(0, Math.min(1, opacity));
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        
        // Handle rgba colors
        if (color.startsWith('rgba(')) {
            const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
            if (match) {
                const [, r, g, b] = match;
                const alpha = Math.max(0, Math.min(1, opacity));
                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }
        }
        
        // Handle rgb colors
        if (color.startsWith('rgb(')) {
            const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
                const [, r, g, b] = match;
                const alpha = Math.max(0, Math.min(1, opacity));
                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }
        }
        
        // Return original color if format is not recognized
        return color;
    }
}