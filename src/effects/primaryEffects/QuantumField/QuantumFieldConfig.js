import {EffectConfig} from 'my-nft-gen/src/core/layer/EffectConfig.js';
import {ColorPicker} from "../../../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";
import {getAllFindValueAlgorithms} from "../../../../../my-nft-gen/index.js";

export class QuantumFieldConfig extends EffectConfig {
    constructor({
                    particleCount = 20,
                    particleSize = {lower: 3, upper: 8},
                    connectionDistance = {lower: 100, upper: 200},
                    entanglementProbability = 0.3,

                    particleSpeed = {lower: 2, upper: 8}, // Increased from 0.5-2 to 2-8 for more visible movement
                    orbitRadius = {lower: 30, upper: 100}, // Increased from 20-60 to 30-100 for more visible orbital motion
                    quantumFluctuation = {lower: 0.1, upper: 0.5},

                    // Smooth movement parameters
                    velocitySmoothing = 0.1, // How quickly particles adjust to new velocities (0-1)
                    tunnelTransitionFrames = 20, // Frames for smooth tunneling transition
                    movementDamping = 0.95, // Damping factor for smoother movement
                    
                    // Enhanced movement parameters
                    driftIntensity = {lower: 0.4, upper: 0.8}, // Increased from 0.2-0.4 to 0.4-0.8 for more visible drift
                    brownianIntensity = {lower: 0.1, upper: 0.2}, // Intensity of brownian-like motion
                    fieldInteractionStrength = {lower: 0.05, upper: 0.15}, // Strength of particle field interactions
                    velocityEvolutionRate = {lower: 0.005, upper: 0.02}, // Rate of continuous velocity evolution
                    
                    // Corner bundling parameters
                    cornerAttraction = {lower: 0.3, upper: 0.8}, // Strength of attraction to corners
                    cornerRadius = {lower: 0.15, upper: 0.35}, // Radius around corners where particles cluster (as fraction of canvas size)
                    cornerTransitionSpeed = {lower: 0.02, upper: 0.08}, // Speed of transition towards corners
                    
                    // FindValue algorithm types for different smoothness characteristics
                    interpolationAlgorithm = getAllFindValueAlgorithms(), // 'linear', 'smoothstep', 'smootherstep', 'sine', 'cubic'
                    fluctuationAlgorithm = getAllFindValueAlgorithms(), // Algorithm for quantum fluctuations
                    pulseAlgorithm = getAllFindValueAlgorithms(), // Algorithm for pulse animations
                    curveAlgorithm = getAllFindValueAlgorithms(), // Algorithm for connection curves

                    particleColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    connectionColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
                    coreColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),

                    connectionOpacity = {lower: 0.2, upper: 0.6},
                    particleOpacity = {lower: 0.6, upper: 1.0},

                    pulseFrequency = {lower: 0.5, upper: 2},
                    pulseAmplitude = {lower: 0.2, upper: 0.5},

                    quantumTunneling = true,
                    tunnelingProbability = 0.1,
                    
                    // Perfect looping configuration
                    perfectLoop = true, // When true, particles return to exact starting positions at frame N

                    renderMode = ['quantum', 'wave', 'particle', 'field'],

                    glowIntensity = {lower: 5, upper: 15},
                    blur = {lower: 0, upper: 3},
                    layerOpacity = 1.0,
                } = {}) {
        super();

        this.particleCount = particleCount;
        this.particleSize = particleSize;
        this.connectionDistance = connectionDistance;
        this.entanglementProbability = entanglementProbability;

        this.particleSpeed = particleSpeed;
        this.orbitRadius = orbitRadius;
        this.quantumFluctuation = quantumFluctuation;

        // Smooth movement parameters
        this.velocitySmoothing = velocitySmoothing;
        this.tunnelTransitionFrames = tunnelTransitionFrames;
        this.movementDamping = movementDamping;
        
        // Enhanced movement parameters
        this.driftIntensity = driftIntensity;
        this.brownianIntensity = brownianIntensity;
        this.fieldInteractionStrength = fieldInteractionStrength;
        this.velocityEvolutionRate = velocityEvolutionRate;
        
        // Corner bundling parameters
        this.cornerAttraction = cornerAttraction;
        this.cornerRadius = cornerRadius;
        this.cornerTransitionSpeed = cornerTransitionSpeed;
        
        // FindValue algorithm types
        this.interpolationAlgorithm = interpolationAlgorithm;
        this.fluctuationAlgorithm = fluctuationAlgorithm;
        this.pulseAlgorithm = pulseAlgorithm;
        this.curveAlgorithm = curveAlgorithm;

        this.particleColor = particleColor;
        this.connectionColor = connectionColor;
        this.coreColor = coreColor;

        this.connectionOpacity = connectionOpacity;
        this.particleOpacity = particleOpacity;

        this.pulseFrequency = pulseFrequency;
        this.pulseAmplitude = pulseAmplitude;

        this.quantumTunneling = quantumTunneling;
        this.tunnelingProbability = tunnelingProbability;
        
        // Perfect looping configuration
        this.perfectLoop = perfectLoop;

        this.renderMode = renderMode;

        this.glowIntensity = glowIntensity;
        this.blur = blur;
        this.layerOpacity = layerOpacity;
    }
}