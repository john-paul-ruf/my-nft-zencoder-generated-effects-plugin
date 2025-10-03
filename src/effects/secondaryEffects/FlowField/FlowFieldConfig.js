import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { getAllFindValueAlgorithms } from 'my-nft-gen';

export class FlowFieldConfig extends EffectConfig {
  constructor({
    flowStrength = { lower: 15, upper: 40 },
    noiseScale = { lower: 0.003, upper: 0.008 },
    timeScale = { lower: 0.0005, upper: 0.002 },
    distortionAmount = { lower: 10, upper: 30 },
    swirls = { lower: 2, upper: 5 },
    turbulence = { lower: 0.3, upper: 0.8 },

    vectorFieldStrength = { lower: 0.5, upper: 1.5 },
    vortexIntensity = { lower: 0.2, upper: 0.6 },
    streamlineCoherence = { lower: 0.4, upper: 0.9 },

    flowAlgorithm = getAllFindValueAlgorithms(),
    distortionAlgorithm = getAllFindValueAlgorithms(),
    turbulenceAlgorithm = getAllFindValueAlgorithms(),

    mode = ['liquid', 'smoke', 'plasma', 'vortex'],
    preserveAlpha = true,
    blendStrength = { lower: 0.5, upper: 1.0 },

    colorShift = {
      enabled: false,
      hueRotation: { lower: -30, upper: 30 },
      saturationBoost: { lower: -0.3, upper: 0.3 },
      brightness: { lower: -0.2, upper: 0.2 }
    },

    animation = {
      enabled: true,
      speed: { lower: 0.5, upper: 2 },
      pulseAmplitude: { lower: 0.1, upper: 0.4 },
      waveFrequency: { lower: 1, upper: 4 }
    },

    perfectLoop = true,
    smoothingFactor = { lower: 0.85, upper: 0.95 },
    edgeBehavior = 'wrap',
    layerOpacity = 0.8
  } = {}) {
    super();

    this.flowStrength = flowStrength;
    this.noiseScale = noiseScale;
    this.timeScale = timeScale;
    this.distortionAmount = distortionAmount;
    this.swirls = swirls;
    this.turbulence = turbulence;

    this.vectorFieldStrength = vectorFieldStrength;
    this.vortexIntensity = vortexIntensity;
    this.streamlineCoherence = streamlineCoherence;

    this.flowAlgorithm = flowAlgorithm;
    this.distortionAlgorithm = distortionAlgorithm;
    this.turbulenceAlgorithm = turbulenceAlgorithm;

    this.mode = mode;
    this.preserveAlpha = preserveAlpha;
    this.blendStrength = blendStrength;

    this.colorShift = colorShift;
    this.animation = animation;

    this.perfectLoop = perfectLoop;
    this.smoothingFactor = smoothingFactor;
    this.edgeBehavior = edgeBehavior;
    this.layerOpacity = layerOpacity;
  }
}