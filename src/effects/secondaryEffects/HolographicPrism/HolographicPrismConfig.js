import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { getAllFindValueAlgorithms } from 'my-nft-gen';

export class HolographicPrismConfig extends EffectConfig {
  constructor({
    // === CHROMATIC ABERRATION ===
    chromaticStrength = { lower: 2, upper: 8 },
    chromaticAngle = { lower: 0, upper: 360 },
    
    // === PRISMATIC DISPERSION ===
    dispersionIntensity = { lower: 0.3, upper: 0.8 },
    dispersionAngle = { lower: 0, upper: 360 },
    wavelengthSeparation = { lower: 1.5, upper: 4 },
    
    // === HOLOGRAPHIC SHIMMER ===
    shimmerIntensity = { lower: 0.2, upper: 0.6 },
    shimmerSpeed = { lower: 0.5, upper: 2 },
    shimmerScale = { lower: 0.002, upper: 0.006 },
    
    // === DEPTH PARALLAX ===
    parallaxLayers = { lower: 3, upper: 5 },
    parallaxStrength = { lower: 2, upper: 6 },
    parallaxAngle = { lower: 0, upper: 360 },
    
    // === SPECTRAL GLOW ===
    glowIntensity = { lower: 0.1, upper: 0.4 },
    glowRadius = { lower: 3, upper: 8 },
    glowSaturation = { lower: 0.6, upper: 1.0 },
    
    // === REFRACTION ===
    refractionStrength = { lower: 0.2, upper: 0.5 },
    refractionComplexity = { lower: 1, upper: 3 },
    
    // === ANIMATION MODE ===
    animationMode = ['rotation', 'pulse', 'wave', 'shimmer', 'depth', 'combined'],
    
    // === COLOR SPECTRUM ===
    spectrumHueStart = { lower: 0, upper: 360 },
    spectrumHueRange = { lower: 180, upper: 360 },
    spectrumSaturation = { lower: 0.7, upper: 1.0 },
    spectrumBrightness = { lower: 0.8, upper: 1.0 },
    
    // === BLENDING ===
    effectStrength = { lower: 0.5, upper: 1.0 },
    preserveOriginal = { lower: 0.3, upper: 0.7 },
    edgeBehavior = 'clamp',
    
    // === LAYER PROPERTIES ===
    layerOpacity = 1.0,
    layerBlendMode = 'normal',
    
    // === LOOP CONFIGURATION ===
    perfectLoop = true,
    
    // === ALGORITHMS ===
    chromaticAlgorithm = getAllFindValueAlgorithms(),
    dispersionAlgorithm = getAllFindValueAlgorithms(),
    shimmerAlgorithm = getAllFindValueAlgorithms(),
    parallaxAlgorithm = getAllFindValueAlgorithms(),
  } = {}) {
    super();

    // Chromatic aberration
    this.chromaticStrength = chromaticStrength;
    this.chromaticAngle = chromaticAngle;
    
    // Prismatic dispersion
    this.dispersionIntensity = dispersionIntensity;
    this.dispersionAngle = dispersionAngle;
    this.wavelengthSeparation = wavelengthSeparation;
    
    // Holographic shimmer
    this.shimmerIntensity = shimmerIntensity;
    this.shimmerSpeed = shimmerSpeed;
    this.shimmerScale = shimmerScale;
    
    // Depth parallax
    this.parallaxLayers = parallaxLayers;
    this.parallaxStrength = parallaxStrength;
    this.parallaxAngle = parallaxAngle;
    
    // Spectral glow
    this.glowIntensity = glowIntensity;
    this.glowRadius = glowRadius;
    this.glowSaturation = glowSaturation;
    
    // Refraction
    this.refractionStrength = refractionStrength;
    this.refractionComplexity = refractionComplexity;
    
    // Animation mode
    this.animationMode = animationMode;
    
    // Color spectrum
    this.spectrumHueStart = spectrumHueStart;
    this.spectrumHueRange = spectrumHueRange;
    this.spectrumSaturation = spectrumSaturation;
    this.spectrumBrightness = spectrumBrightness;
    
    // Blending
    this.effectStrength = effectStrength;
    this.preserveOriginal = preserveOriginal;
    this.edgeBehavior = edgeBehavior;
    
    // Layer properties
    this.layerOpacity = layerOpacity;
    this.layerBlendMode = layerBlendMode;
    
    // Loop configuration
    this.perfectLoop = perfectLoop;
    
    // Algorithms
    this.chromaticAlgorithm = chromaticAlgorithm;
    this.dispersionAlgorithm = dispersionAlgorithm;
    this.shimmerAlgorithm = shimmerAlgorithm;
    this.parallaxAlgorithm = parallaxAlgorithm;
  }
}