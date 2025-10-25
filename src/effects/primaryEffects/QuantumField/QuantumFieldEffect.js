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
import {findValue, FindValueAlgorithm} from 'my-nft-gen/src/core/math/findValue.js';
import {Settings} from 'my-nft-gen/src/core/Settings.js';
import {QuantumFieldConfig} from './QuantumFieldConfig.js';

export class QuantumFieldEffect extends LayerEffect {
    static _name_ = 'quantum-field';
    static _displayName_ = 'Quantum Field';
    static _description_ = 'Simulates quantum particle interactions with dynamic connections, tunneling behaviors, and entanglement effects. Features multiple rendering modes with configurable particle physics and perfect loop animation support.';
    static _version_ = '1.0.0';
    static _author_ = 'Zencoder';
    static _tags_ = ['effect', 'particles', 'quantum', 'physics', 'final', 'post-processing', 'psychedelic', 'animated', 'loopable', 'entanglement', 'wave-particle'];

    constructor({
                    name = QuantumFieldEffect._name_,
                    requiresLayer = true,
                    config = new QuantumFieldConfig({}),
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
     * Public method for testing perfect loop behavior
     * @param {number} currentFrame - Current frame number
     * @param {number} numberOfFrames - Total number of frames
     * @returns {Array} Array of particle objects
     */
    generateParticles(currentFrame, numberOfFrames) {
        return this.#generateParticles(currentFrame, numberOfFrames);
    }

    #generateParticles(currentFrame, numberOfFrames) {
        const particles = [];
        
        if (this.data.perfectLoop) {
            return this.#generatePerfectLoopParticles(currentFrame, numberOfFrames);
        } else {
            return this.#generateNaturalParticles(currentFrame, numberOfFrames);
        }
    }

    #generatePerfectLoopParticles(currentFrame, numberOfFrames) {
        const particles = [];
        for (let i = 0; i < this.data.particleCount; i++) {
            // PERFECT LOOP: All particle properties are calculated purely from currentFrame
            // This ensures particles return to exact starting positions at frame numberOfFrames
            
            // Base position from seeds (starting position)
            const baseX = this.data.particleSeeds.positionX[i];
            const baseY = this.data.particleSeeds.positionY[i];
            
            // Perfect loop floating animation - completes exactly one cycle over numberOfFrames
            const floatPhaseX = this.#findValueWithAlgorithm(
                0, Math.PI * 2, 
                numberOfFrames, numberOfFrames, currentFrame + i * 19, 
                this.data.interpolationAlgorithm
            );
            const floatPhaseY = this.#findValueWithAlgorithm(
                0, Math.PI * 2, 
                numberOfFrames, numberOfFrames, currentFrame + i * 23, 
                this.data.interpolationAlgorithm
            );
            
            // Floating motion amplitude - increased for visible movement
            const floatAmplitude = Math.min(this.data.width, this.data.height) * 0.08; // Increased from 0.02 to 0.08
            const floatX = Math.sin(floatPhaseX + this.data.particleSeeds.cornerTransitionPhase[i]) * floatAmplitude;
            const floatY = Math.cos(floatPhaseY + this.data.particleSeeds.cornerTransitionPhase[i]) * floatAmplitude;
            
            // Perfect loop orbital motion - completes exactly one cycle
            const orbitAngle = this.#findValueWithAlgorithm(
                0, Math.PI * 2, 
                numberOfFrames, numberOfFrames, currentFrame + i * 31, 
                this.data.interpolationAlgorithm
            ) + this.data.particleSeeds.orbitAngle[i];
            
            const orbitRadius = this.data.particleSeeds.orbitRadius[i];
            const orbitX = Math.cos(orbitAngle) * orbitRadius * 0.15; // Increased from 0.02 to 0.15 for visible orbital motion
            const orbitY = Math.sin(orbitAngle) * orbitRadius * 0.15;
            
            // Perfect loop quantum fluctuation
            const quantumFluctuation = this.#findValueWithAlgorithm(
                this.data.quantumFluctuation.lower, 
                this.data.quantumFluctuation.upper, 
                numberOfFrames, numberOfFrames, currentFrame + i * 37, 
                this.data.fluctuationAlgorithm
            );
            
            // Perfect loop drift motion
            const driftPhaseX = this.#findValueWithAlgorithm(
                0, Math.PI * 2, 
                numberOfFrames, numberOfFrames, currentFrame + i * 41, 
                this.data.fluctuationAlgorithm
            );
            const driftPhaseY = this.#findValueWithAlgorithm(
                0, Math.PI * 2, 
                numberOfFrames, numberOfFrames, currentFrame + i * 43, 
                this.data.fluctuationAlgorithm
            );
            
            const driftIntensity = this.#findValueWithAlgorithm(
                this.data.driftIntensity.lower, 
                this.data.driftIntensity.upper, 
                numberOfFrames, numberOfFrames, currentFrame + i * 47, 
                this.data.fluctuationAlgorithm
            );
            
            const driftX = Math.sin(driftPhaseX) * driftIntensity * 50; // Increased from 20 to 50 for more visible drift
            const driftY = Math.cos(driftPhaseY) * driftIntensity * 50;
            
            // Calculate final position (all components loop perfectly)
            const finalX = baseX + floatX + orbitX + driftX;
            const finalY = baseY + floatY + orbitY + driftY;
            
            // Perfect loop velocity calculation
            const velocityPhaseX = this.#findValueWithAlgorithm(
                0, Math.PI * 2, 
                numberOfFrames, numberOfFrames, currentFrame + i * 53, 
                this.data.interpolationAlgorithm
            );
            const velocityPhaseY = this.#findValueWithAlgorithm(
                0, Math.PI * 2, 
                numberOfFrames, numberOfFrames, currentFrame + i * 59, 
                this.data.interpolationAlgorithm
            );
            
            const particleSpeed = this.#findValueWithAlgorithm(
                this.data.particleSpeed.lower, 
                this.data.particleSpeed.upper, 
                numberOfFrames, numberOfFrames, currentFrame + i * 61, 
                this.data.interpolationAlgorithm
            );
            
            const vx = Math.sin(velocityPhaseX) * particleSpeed;
            const vy = Math.cos(velocityPhaseY) * particleSpeed;
            
            // Perfect loop quantum state (cycles between states)
            const quantumStatePhase = this.#findValueWithAlgorithm(
                0, 1, 
                numberOfFrames, numberOfFrames, currentFrame + i * 67, 
                this.data.interpolationAlgorithm
            );
            const quantumState = quantumStatePhase < 0.5 ? 'wave' : 'particle';
            
            // Perfect loop size variation
            const sizeVariation = this.#findValueWithAlgorithm(
                0.8, 1.2, 
                numberOfFrames, numberOfFrames, currentFrame + i * 71, 
                this.data.interpolationAlgorithm
            );
            const currentSize = this.data.particleSeeds.size[i] * sizeVariation;
            
            // Perfect loop opacity variation
            const opacityVariation = this.#findValueWithAlgorithm(
                0.8, 1.0, 
                numberOfFrames, numberOfFrames, currentFrame + i * 73, 
                this.data.pulseAlgorithm
            );
            const currentOpacity = this.data.particleSeeds.opacity[i] * opacityVariation;
            
            particles.push({
                id: i,
                x: finalX,
                y: finalY,
                vx: vx,
                vy: vy,
                baseVx: vx,
                baseVy: vy,
                targetVx: vx,
                targetVy: vy,
                size: currentSize,
                orbitRadius: orbitRadius,
                orbitAngle: orbitAngle,
                orbitSpeed: this.data.particleSeeds.orbitSpeed[i],
                opacity: currentOpacity,
                entangled: this.data.particleSeeds.entangled[i],
                pulsePhase: this.data.particleSeeds.pulsePhase[i],
                quantumState: quantumState,
                quantumFluctuation: quantumFluctuation,
                tunnelCooldown: 0,
                // Store original seeds for reference
                tunnelSeedX: this.data.particleSeeds.tunnelSeedX[i],
                tunnelSeedY: this.data.particleSeeds.tunnelSeedY[i],
                tunnelSeed: this.data.particleSeeds.tunnelSeed[i],
                assignedCorner: this.data.particleSeeds.assignedCorner[i],
                cornerTransitionPhase: this.data.particleSeeds.cornerTransitionPhase[i],
            });
        }
        return particles;
    }

    #generateNaturalParticles(currentFrame, numberOfFrames) {
        const particles = [];
        for (let i = 0; i < this.data.particleCount; i++) {
            // NATURAL MOVEMENT: Non-repeating, more organic particle behavior
            // Uses continuous time progression without perfect looping constraints
            
            // Base position from seeds (starting position)
            const baseX = this.data.particleSeeds.positionX[i];
            const baseY = this.data.particleSeeds.positionY[i];
            
            // Natural floating animation - uses continuous time progression
            const timeScale = currentFrame * 0.02; // Slower, more natural time progression
            const floatPhaseX = timeScale + i * 0.7; // Different phase offsets for each particle
            const floatPhaseY = timeScale + i * 0.9;
            
            // Floating motion with natural amplitude variation
            const floatAmplitude = Math.min(this.data.width, this.data.height) * 0.12; // Slightly larger for natural movement
            const floatX = Math.sin(floatPhaseX + this.data.particleSeeds.cornerTransitionPhase[i]) * floatAmplitude;
            const floatY = Math.cos(floatPhaseY + this.data.particleSeeds.cornerTransitionPhase[i]) * floatAmplitude;
            
            // Natural orbital motion - continuous, non-repeating
            const orbitTimeScale = currentFrame * 0.015; // Different time scale for orbital motion
            const orbitAngle = orbitTimeScale + this.data.particleSeeds.orbitAngle[i] + i * 0.5;
            
            const orbitRadius = this.data.particleSeeds.orbitRadius[i];
            const orbitX = Math.cos(orbitAngle) * orbitRadius * 0.18; // Slightly larger orbital motion
            const orbitY = Math.sin(orbitAngle) * orbitRadius * 0.18;
            
            // Natural quantum fluctuation - continuous variation
            const fluctuationTime = currentFrame * 0.03 + i * 1.1;
            const quantumFluctuation = this.data.quantumFluctuation.lower + 
                (Math.sin(fluctuationTime) * 0.5 + 0.5) * 
                (this.data.quantumFluctuation.upper - this.data.quantumFluctuation.lower);
            
            // Natural drift motion - continuous, evolving patterns
            const driftTimeX = currentFrame * 0.008 + i * 0.6;
            const driftTimeY = currentFrame * 0.011 + i * 0.8;
            
            const driftIntensity = this.data.driftIntensity.lower + 
                (Math.sin(currentFrame * 0.005 + i * 0.4) * 0.5 + 0.5) * 
                (this.data.driftIntensity.upper - this.data.driftIntensity.lower);
            
            const driftX = Math.sin(driftTimeX) * driftIntensity * 60; // Larger drift for natural movement
            const driftY = Math.cos(driftTimeY) * driftIntensity * 60;
            
            // Calculate final position
            const finalX = baseX + floatX + orbitX + driftX;
            const finalY = baseY + floatY + orbitY + driftY;
            
            // Natural velocity calculation - continuous evolution
            const velocityTimeX = currentFrame * 0.012 + i * 0.9;
            const velocityTimeY = currentFrame * 0.016 + i * 1.2;
            
            const particleSpeed = this.data.particleSpeed.lower + 
                (Math.sin(currentFrame * 0.007 + i * 0.3) * 0.5 + 0.5) * 
                (this.data.particleSpeed.upper - this.data.particleSpeed.lower);
            
            const vx = Math.sin(velocityTimeX) * particleSpeed;
            const vy = Math.cos(velocityTimeY) * particleSpeed;
            
            // Natural quantum state - gradual transitions
            const quantumStateTime = currentFrame * 0.004 + i * 0.7;
            const quantumStateValue = Math.sin(quantumStateTime) * 0.5 + 0.5;
            const quantumState = quantumStateValue < 0.4 ? 'wave' : quantumStateValue > 0.6 ? 'particle' : 'superposition';
            
            // Natural size variation - continuous fluctuation
            const sizeTime = currentFrame * 0.009 + i * 1.3;
            const sizeVariation = 0.7 + (Math.sin(sizeTime) * 0.5 + 0.5) * 0.6; // Range: 0.7 to 1.3
            const currentSize = this.data.particleSeeds.size[i] * sizeVariation;
            
            // Natural opacity variation - breathing effect
            const opacityTime = currentFrame * 0.006 + i * 0.8;
            const opacityVariation = 0.6 + (Math.sin(opacityTime) * 0.5 + 0.5) * 0.4; // Range: 0.6 to 1.0
            const currentOpacity = this.data.particleSeeds.opacity[i] * opacityVariation;
            
            particles.push({
                id: i,
                x: finalX,
                y: finalY,
                vx: vx,
                vy: vy,
                baseVx: vx,
                baseVy: vy,
                targetVx: vx,
                targetVy: vy,
                size: currentSize,
                orbitRadius: orbitRadius,
                orbitAngle: orbitAngle,
                orbitSpeed: this.data.particleSeeds.orbitSpeed[i],
                opacity: currentOpacity,
                entangled: this.data.particleSeeds.entangled[i],
                pulsePhase: this.data.particleSeeds.pulsePhase[i],
                quantumState: quantumState,
                quantumFluctuation: quantumFluctuation,
                tunnelCooldown: 0,
                // Store original seeds for reference
                tunnelSeedX: this.data.particleSeeds.tunnelSeedX[i],
                tunnelSeedY: this.data.particleSeeds.tunnelSeedY[i],
                tunnelSeed: this.data.particleSeeds.tunnelSeed[i],
                assignedCorner: this.data.particleSeeds.assignedCorner[i],
                cornerTransitionPhase: this.data.particleSeeds.cornerTransitionPhase[i],
            });
        }
        return particles;
    }

    #updateParticles(particles, currentFrame, numberOfFrames) {
        if (this.data.perfectLoop) {
            // PERFECT LOOP: No particle updates needed since all properties are calculated 
            // directly from currentFrame in #generateParticles. This ensures perfect looping.
            // 
            // All particle positions, velocities, quantum states, and other properties
            // are now purely deterministic functions of the current frame, guaranteeing
            // that particles return to their exact starting state at frame numberOfFrames.
            
            // Optional: Add boundary wrapping if particles should stay within canvas bounds
            particles.forEach(particle => {
                // Ensure particles stay within canvas bounds with smooth wrapping
                particle.x = this.#smoothWrap(particle.x, 0, this.data.width);
                particle.y = this.#smoothWrap(particle.y, 0, this.data.height);
            });
        } else {
            // NATURAL MOVEMENT: Allow for more dynamic particle interactions and updates
            particles.forEach(particle => {
                // Apply quantum tunneling if enabled
                if (this.data.quantumTunneling && Math.random() < this.data.tunnelingProbability) {
                    // Quantum tunneling - particle can appear at a random location
                    particle.x = Math.random() * this.data.width;
                    particle.y = Math.random() * this.data.height;
                    particle.tunnelCooldown = 30; // Prevent immediate re-tunneling
                } else if (particle.tunnelCooldown > 0) {
                    particle.tunnelCooldown--;
                }
                
                // Apply velocity damping for smoother natural movement
                particle.vx *= this.data.movementDamping;
                particle.vy *= this.data.movementDamping;
                
                // Add some brownian motion for natural randomness
                const brownianForce = 0.5;
                particle.vx += (Math.random() - 0.5) * brownianForce;
                particle.vy += (Math.random() - 0.5) * brownianForce;
                
                // Ensure particles stay within canvas bounds with smooth wrapping
                particle.x = this.#smoothWrap(particle.x, 0, this.data.width);
                particle.y = this.#smoothWrap(particle.y, 0, this.data.height);
            });
        }
    }

    /**
     * Smooth interpolation helper methods for fluid movement
     */
    #lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    #smoothStep(t) {
        // Smooth step function for eased transitions (S-curve)
        return t * t * (3 - 2 * t);
    }

    #smootherStep(t) {
        // Even smoother step function (6t^5 - 15t^4 + 10t^3)
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    #sineStep(t) {
        // Sine-based smooth step
        return (Math.sin((t - 0.5) * Math.PI) + 1) / 2;
    }

    #cubicStep(t) {
        // Cubic easing
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    #smoothWrap(value, min, max) {
        const range = max - min;
        if (value < min) {
            return max - (min - value) % range;
        } else if (value > max) {
            return min + (value - max) % range;
        }
        return value;
    }

    /**
     * Apply the configured interpolation algorithm to a normalized value (0-1)
     */
    #applyInterpolationAlgorithm(t, algorithmType) {
        const clampedT = Math.max(0, Math.min(1, t));
        
        switch (algorithmType) {
            case 'linear':
                return clampedT;
            case 'smoothstep':
                return this.#smoothStep(clampedT);
            case 'smootherstep':
                return this.#smootherStep(clampedT);
            case 'sine':
                return this.#sineStep(clampedT);
            case 'cubic':
                return this.#cubicStep(clampedT);
            default:
                return this.#smoothStep(clampedT); // Default fallback
        }
    }

    /**
     * Enhanced findValue that applies the configured algorithm
     */
    #findValueWithAlgorithm(min, max, duration, totalFrames, currentFrame, algorithmType = 'linear') {
        // Use FindValueAlgorithm for the algorithmic transformation
        const value = findValue(min, max, duration, totalFrames, currentFrame, algorithmType);
        return value;
    }

    /**
     * Get corner position based on corner index and current animation frame
     */
    #getCornerPosition(cornerIndex, currentFrame, numberOfFrames, cornerRadius) {
        const corners = [
            { x: 0, y: 0 }, // top-left
            { x: this.data.width, y: 0 }, // top-right
            { x: this.data.width, y: this.data.height }, // bottom-right
            { x: 0, y: this.data.height } // bottom-left
        ];
        
        const baseCorner = corners[cornerIndex];
        const radiusPixels = cornerRadius * Math.min(this.data.width, this.data.height);
        
        // Add some variation within the corner radius for more natural distribution
        const angleOffset = this.#findValueWithAlgorithm(0, Math.PI * 2, 1, numberOfFrames, currentFrame + cornerIndex * 47, this.data.fluctuationAlgorithm);
        const radiusOffset = this.#findValueWithAlgorithm(0, radiusPixels, 1, numberOfFrames, currentFrame + cornerIndex * 73, this.data.interpolationAlgorithm);
        
        return {
            x: baseCorner.x + Math.cos(angleOffset) * radiusOffset,
            y: baseCorner.y + Math.sin(angleOffset) * radiusOffset
        };
    }

    #findConnections(particles, currentFrame, numberOfFrames) {
        const connections = [];

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // PERFECT LOOP: Use numberOfFrames as duration for perfect looping
                const currentConnectionDistance = this.#findValueWithAlgorithm(
                    this.data.connectionDistance.lower, 
                    this.data.connectionDistance.upper, 
                    numberOfFrames, numberOfFrames, currentFrame + i * 23 + j * 29, 
                    this.data.interpolationAlgorithm
                );
                const currentConnectionOpacity = this.#findValueWithAlgorithm(
                    this.data.connectionOpacity.lower, 
                    this.data.connectionOpacity.upper, 
                    numberOfFrames, numberOfFrames, currentFrame + i * 31 + j * 37, 
                    this.data.fluctuationAlgorithm
                );

                if (distance < currentConnectionDistance) {
                    const opacity = (1 - distance / currentConnectionDistance) * currentConnectionOpacity;
                    connections.push({
                        from: particles[i],
                        to: particles[j],
                        distance: distance,
                        opacity: opacity,
                        isEntangled: particles[i].entangled === j || particles[j].entangled === i
                    });
                }
            }
        }

        return connections;
    }

    #createCirclePath(x, y, radius, steps = 32) {
        const points = [];
        for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            points.push({
                x: x + Math.cos(angle) * radius,
                y: y + Math.sin(angle) * radius
            });
        }
        return points;
    }

    async #drawQuantumField(canvas, particles, connections, currentFrame, numberOfFrames) {
        // PERFECT LOOP: Use numberOfFrames as duration for perfect looping
        const animationProgress = this.#findValueWithAlgorithm(0, 1, numberOfFrames, numberOfFrames, currentFrame, this.data.interpolationAlgorithm);
        const pulsePhase = this.#findValueWithAlgorithm(0, Math.PI * 4, numberOfFrames, numberOfFrames, currentFrame, this.data.pulseAlgorithm);
        
        // Get animated pulse values for this frame with perfect looping
        const currentPulseFrequency = this.#findValueWithAlgorithm(
            this.data.pulseFrequency.lower, 
            this.data.pulseFrequency.upper, 
            numberOfFrames, numberOfFrames, currentFrame, 
            this.data.pulseAlgorithm
        );
        const currentPulseAmplitude = this.#findValueWithAlgorithm(
            this.data.pulseAmplitude.lower, 
            this.data.pulseAmplitude.upper, 
            numberOfFrames, numberOfFrames, currentFrame, 
            this.data.pulseAlgorithm
        );
        
        const pulseValue = Math.sin(pulsePhase * currentPulseFrequency) * currentPulseAmplitude + 1;

        // Draw connections with smooth animation
        for (const connection of connections) {
            const color = connection.isEntangled ? this.data.coreColor : this.data.connectionColor;
            const lineWidth = connection.isEntangled ? 2 : 1;

            if (this.data.renderMode === 'quantum' || this.data.renderMode === 'field') {
                // Create smooth curved path for quantum/field modes using findValue
                const midX = (connection.from.x + connection.to.x) / 2;
                const midY = (connection.from.y + connection.to.y) / 2;
                
                // PERFECT LOOP: Smooth control point animation with perfect looping
                const curvePhase = this.#findValueWithAlgorithm(0, Math.PI * 8, numberOfFrames, numberOfFrames, currentFrame, this.data.curveAlgorithm);
                const controlOffset = Math.sin(curvePhase + connection.distance * 0.01) * 20;
                const controlX = midX + controlOffset;
                const controlY = midY + Math.cos(curvePhase + connection.distance * 0.01) * 20;

                // Create smooth bezier curve points
                const curvePoints = [];
                const steps = Math.max(10, Math.floor(connection.distance / 10)); // Adaptive resolution
                for (let i = 0; i <= steps; i++) {
                    const t = i / steps;
                    const smoothT = this.#applyInterpolationAlgorithm(t, this.data.curveAlgorithm); // Apply configurable curve algorithm
                    const t2 = smoothT * smoothT;
                    const mt = 1 - smoothT;
                    const mt2 = mt * mt;
                    
                    curvePoints.push({
                        x: connection.from.x * mt2 + controlX * 2 * mt * smoothT + connection.to.x * t2,
                        y: connection.from.y * mt2 + controlY * 2 * mt * smoothT + connection.to.y * t2
                    });
                }
                await canvas.drawPath(curvePoints, lineWidth, color, 1, null);
            } else {
                // Simple line for other modes
                const linePoints = [
                    {x: connection.from.x, y: connection.from.y},
                    {x: connection.to.x, y: connection.to.y}
                ];
                await canvas.drawPath(linePoints, lineWidth, color, 1, null);
            }
        }

        // Draw particles
        for (const particle of particles) {
            const size = particle.size * pulseValue;
            const opacity = particle.opacity;

            // Create opacity-adjusted colors
            const particleColorWithOpacity = this.#adjustColorOpacity(this.data.particleColor, opacity);
            const coreColorWithOpacity = this.#adjustColorOpacity(this.data.coreColor, opacity * 0.5);

            // Draw wave rings if in wave state
            if (particle.quantumState === 'wave' || this.data.renderMode === 'wave') {
                const ringColorWithOpacity = this.#adjustColorOpacity(this.data.particleColor, opacity * 0.3);
                for (let ring = 3; ring > 0; ring--) {
                    const ringSize = size * ring * 0.5;
                    const ringPath = this.#createCirclePath(particle.x, particle.y, ringSize);
                    await canvas.drawPath(ringPath, 2, ringColorWithOpacity, 0, null);
                }
            }

            // Draw main particle (filled circle)
            const particlePath = this.#createCirclePath(particle.x, particle.y, size);
            await canvas.drawPath(particlePath, 1, particleColorWithOpacity, 1, particleColorWithOpacity);

            // Draw tunnel effect
            if (particle.tunnelCooldown > 0) {
                const tunnelPath = this.#createCirclePath(particle.x, particle.y, size * 3);
                await canvas.drawPath(tunnelPath, 2, coreColorWithOpacity, 0, null);
            }
        }
    }

    async #quantumField(layer, currentFrame, numberOfFrames) {
        const canvas = await Canvas2dFactory.getNewCanvas(this.data.width, this.data.height);

        // Generate particles for each frame to create smooth animation
        this.particles = this.#generateParticles(currentFrame, numberOfFrames);

        this.#updateParticles(this.particles, currentFrame, numberOfFrames);
        const connections = this.#findConnections(this.particles, currentFrame, numberOfFrames);

        await this.#drawQuantumField(canvas, this.particles, connections, currentFrame, numberOfFrames);

        let resultLayer = await canvas.convertToLayer();

       
        if (this.data.blur > 0) {
            await resultLayer.blur(this.data.blur);
        }

        await resultLayer.adjustLayerOpacity(this.data.layerOpacity);
        await layer.compositeLayerOver(resultLayer);
    }

    /**
     * Generate deterministic pseudo-random value from seed
     * Uses a hash-based approach to avoid correlation between consecutive seeds
     * For static values (when currentFrame and totalFrames are not provided)
     */
    #seedRandom(seed) {
        // Use a hash-based approach that produces better distribution
        // and avoids correlation between consecutive seeds
        let hash = seed;
        
        // Apply multiple hash operations to break correlation
        hash = ((hash >>> 16) ^ hash) * 0x45d9f3b;
        hash = ((hash >>> 16) ^ hash) * 0x45d9f3b;
        hash = (hash >>> 16) ^ hash;
        
        // Convert to 0-1 range
        return (hash >>> 0) / 4294967296;
    }

    /**
     * Generate frame-aware deterministic pseudo-random value for smooth animation
     * Uses findValue for smooth interpolation between random values over time
     * @param {number} seed - Base seed for deterministic generation
     * @param {number} currentFrame - Current animation frame
     * @param {number} totalFrames - Total frames in animation
     * @param {number} [cycles=1] - Number of oscillation cycles over totalFrames
     * @param {string} [algorithm=FindValueAlgorithm.JOURNEY_SIN] - Interpolation algorithm to use
     * @returns {number} Value between 0 and 1
     */
    #seedRandomAnimated(seed, currentFrame, totalFrames, cycles = 1, algorithm = FindValueAlgorithm.JOURNEY_SIN) {
        // Generate two deterministic values from the seed for interpolation range
        const minSeed = this.#seedRandom(seed);
        const maxSeed = this.#seedRandom(seed + 999999); // Large offset to ensure different value
        
        // Use findValue to smoothly interpolate between the two seeded values
        // This creates smooth, deterministic animation that loops perfectly
        return findValue(minSeed, maxSeed, cycles, totalFrames, currentFrame, algorithm);
    }

    #generateParticleSeeds() {
        const seeds = {
            positionX: [],
            positionY: [],
            velocityX: [],
            velocityY: [],
            size: [],
            orbitRadius: [],
            orbitAngle: [],
            orbitSpeed: [],
            opacity: [],
            entangled: [],
            pulsePhase: [],
            quantumState: [],
            tunnelSeedX: [],
            tunnelSeedY: [],
            tunnelSeed: [],
            assignedCorner: [], // Which corner this particle is assigned to (0-3)
            cornerTransitionPhase: [] // Phase for smooth transitions between corners
        };

        // Use deterministic seed-based generation instead of random functions
        // Calculate particle speed range using deterministic approach
        const speedSeed = this.#seedRandom(12345); // Fixed seed for consistent speed range
        const particleSpeedRange = this.config.particleSpeed.lower + 
            speedSeed * (this.config.particleSpeed.upper - this.config.particleSpeed.lower);

        for (let i = 0; i < this.config.particleCount; i++) {
            // Generate deterministic seeds for each particle using unique base seeds
            const baseSeed = i * 10000 + 54321; // Larger offset to ensure unique seeds per particle
            
            // Position seeds will be set later in the random distribution section
            
            // Velocity seeds - use different large offsets
            const velXSeed = this.#seedRandom(baseSeed + 271);
            const velYSeed = this.#seedRandom(baseSeed + 419);
            seeds.velocityX[i] = (velXSeed - 0.5) * 2 * particleSpeedRange; // Convert to -range to +range
            seeds.velocityY[i] = (velYSeed - 0.5) * 2 * particleSpeedRange;
            
            // Size seed
            const sizeSeed = this.#seedRandom(baseSeed + 5);
            seeds.size[i] = this.config.particleSize.lower + 
                sizeSeed * (this.config.particleSize.upper - this.config.particleSize.lower);
            
            // Orbit radius seed
            const orbitSeed = this.#seedRandom(baseSeed + 6);
            seeds.orbitRadius[i] = this.config.orbitRadius.lower + 
                orbitSeed * (this.config.orbitRadius.upper - this.config.orbitRadius.lower);
            
            // Orbit angle seed
            const angleSeed = this.#seedRandom(baseSeed + 7);
            seeds.orbitAngle[i] = angleSeed * Math.PI * 2;
            
            // Orbit speed seed
            const speedSeed = this.#seedRandom(baseSeed + 8);
            seeds.orbitSpeed[i] = 0.01 + speedSeed * (0.05 - 0.01);
            
            // Opacity seed
            const opacitySeed = this.#seedRandom(baseSeed + 9);
            seeds.opacity[i] = this.config.particleOpacity.lower + 
                opacitySeed * (this.config.particleOpacity.upper - this.config.particleOpacity.lower);
            
            // Entanglement seed
            const entangleSeed = this.#seedRandom(baseSeed + 10);
            if (entangleSeed < this.config.entanglementProbability) {
                const targetSeed = this.#seedRandom(baseSeed + 11);
                seeds.entangled[i] = Math.floor(targetSeed * this.config.particleCount);
            } else {
                seeds.entangled[i] = null;
            }
            
            // Pulse phase seed
            const pulseSeed = this.#seedRandom(baseSeed + 12);
            seeds.pulsePhase[i] = pulseSeed * Math.PI * 2;
            
            // Quantum state seed
            const stateSeed = this.#seedRandom(baseSeed + 13);
            seeds.quantumState[i] = stateSeed < 0.5 ? 'wave' : 'particle';
            
            // Tunnel seeds
            const tunnelXSeed = this.#seedRandom(baseSeed + 14);
            const tunnelYSeed = this.#seedRandom(baseSeed + 15);
            const tunnelSeed = this.#seedRandom(baseSeed + 16);
            seeds.tunnelSeedX[i] = tunnelXSeed * Math.PI * 2;
            seeds.tunnelSeedY[i] = tunnelYSeed * Math.PI * 2;
            seeds.tunnelSeed[i] = tunnelSeed * Math.PI * 2;
            
            // Random distribution - distribute particles randomly across screen
            // Use Math.random() for true randomness in particle positions
            // This ensures particles appear in different positions each render
            seeds.positionX[i] = Math.random() * this.finalSize.width;
            seeds.positionY[i] = Math.random() * this.finalSize.height;
            
            // Assign corners randomly for quantum effects compatibility
            const cornerSeed = this.#seedRandom(baseSeed + 202);
            seeds.assignedCorner[i] = Math.floor(cornerSeed * 4); // Random corner 0-3
            
            // Corner transition phase for smooth movement between corners
            const transitionSeed = this.#seedRandom(baseSeed + 17);
            seeds.cornerTransitionPhase[i] = transitionSeed * Math.PI * 2;
        }

        return seeds;
    }

    #generate(settings) {
        // Use deterministic seed-based generation only for algorithm selection and static values
        // Keep ranges for animated parameters that will use findValue during rendering
        
        // Algorithm selection seeds
        const interpolationSeed = this.#seedRandom(100013);
        const fluctuationSeed = this.#seedRandom(100014);
        const pulseSeed = this.#seedRandom(100015);
        const curveSeed = this.#seedRandom(100016);
        const renderModeSeed = this.#seedRandom(100017);

        this.data = {
            particleCount: this.config.particleCount,
            
            // Keep ranges for animated parameters - these will be used with findValue during animation
            particleSize: this.config.particleSize,
            connectionDistance: this.config.connectionDistance,
            entanglementProbability: this.config.entanglementProbability,
            particleSpeed: this.config.particleSpeed,
            orbitRadius: this.config.orbitRadius,
            quantumFluctuation: this.config.quantumFluctuation,

            // Smooth movement parameters
            velocitySmoothing: this.config.velocitySmoothing,
            tunnelTransitionFrames: this.config.tunnelTransitionFrames,
            movementDamping: this.config.movementDamping,
            
            // Keep ranges for enhanced movement parameters - these will be animated
            driftIntensity: this.config.driftIntensity,
            brownianIntensity: this.config.brownianIntensity,
            fieldInteractionStrength: this.config.fieldInteractionStrength,
            velocityEvolutionRate: this.config.velocityEvolutionRate,
            
            // Corner bundling parameters
            cornerAttraction: this.config.cornerAttraction,
            cornerRadius: this.config.cornerRadius,
            cornerTransitionSpeed: this.config.cornerTransitionSpeed,
            
            // Algorithm configurations - deterministic selection
            interpolationAlgorithm: getRandomFromArray(this.config.interpolationAlgorithm),
            fluctuationAlgorithm: getRandomFromArray(this.config.fluctuationAlgorithm),
            pulseAlgorithm: getRandomFromArray(this.config.pulseAlgorithm),
            curveAlgorithm: getRandomFromArray(this.config.curveAlgorithm),

            particleColor: this.config.particleColor.getColor(settings),
            connectionColor: this.config.connectionColor.getColor(settings),
            coreColor: this.config.coreColor.getColor(settings),

            // Keep ranges for animated opacity values
            connectionOpacity: this.config.connectionOpacity,
            particleOpacity: this.config.particleOpacity,

            // Keep ranges for animated pulse values
            pulseFrequency: this.config.pulseFrequency,
            pulseAmplitude: this.config.pulseAmplitude,

            quantumTunneling: this.config.quantumTunneling,
            tunnelingProbability: this.config.tunnelingProbability,
            
            // Perfect looping configuration
            perfectLoop: this.config.perfectLoop,

            renderMode: getRandomFromArray(this.config.renderMode),


            // Keep ranges for animated visual effects
            glowIntensity: this.config.glowIntensity,
            blur: this.config.blur,
            layerOpacity: this.config.layerOpacity,

            width: this.finalSize.width,
            height: this.finalSize.height,
        };

        // Generate deterministic particle seeds once
        this.data.particleSeeds = this.#generateParticleSeeds();

        this.particles = null;
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

    async invoke(layer, currentFrame, numberOfFrames) {
        await this.#quantumField(layer, currentFrame, numberOfFrames);
        await super.invoke(layer, currentFrame, numberOfFrames);
    }

    getInfo() {
        return `${this.name}: ${this.data.particleCount} particles, ${this.data.renderMode} mode, entanglement: ${(this.data.entanglementProbability * 100).toFixed(0)}%`;
    }
}