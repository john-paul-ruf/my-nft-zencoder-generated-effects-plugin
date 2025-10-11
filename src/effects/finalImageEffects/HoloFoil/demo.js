import { HoloFoilConfig, HoloFoilEffect } from './index.js';

export function presets() {
  return {
    tradingCardShimmer: new HoloFoilConfig({
      seed: 1337,
      layerOpacity: 1.0,
      baseHue: 210,
      saturation: 0.9,
      value: 1.0,
      rainbowStrength: 0.85,
      gratingScale: 1.2,
      gratingAngleDeg: 25,
      gratingOrderCount: 3,
      shimmerStrength: 0.6,
      shimmerSpeed: 1.0,
      rippleStrength: 0.25,
      rippleFrequency: 2.0,
      rippleSpeed: 0.75,
      tiltStrength: 0.3,
      rotationSpeed: 0.5,
      animationMode: 'rotate',
      colorMode: 'prismatic',
      highlightBoost: 0.4,
      vignetteStrength: 0.15,
      scratchDensity: 0.2,
      scratchAngleDeg: 12,
      scratchContrast: 0.65,
      grainStrength: 0.08,
      preserveAlpha: true
    }),

    holoPulse: new HoloFoilConfig({
      animationMode: 'pulse',
      shimmerSpeed: 1.25,
      shimmerStrength: 0.9,
      rainbowStrength: 1.0,
      gratingScale: 1.6,
      gratingOrderCount: 4,
      grainStrength: 0.12
    }),

    gentleTilt: new HoloFoilConfig({
      animationMode: 'tilt',
      tiltStrength: 0.6,
      rainbowStrength: 0.6,
      gratingScale: 0.9,
      grainStrength: 0.05
    })
  };
}

export async function demo() {
  const PRESETS = presets();
  console.log('✨ HoloFoil presets:');
  Object.keys(PRESETS).forEach((k, i) => console.log(`${i+1}. ${k}`));

  const cfg = PRESETS.tradingCardShimmer;
  const effect = new HoloFoilEffect({ config: cfg, settings: { width: 1920, height: 1080 } });
  console.log('✓ Effect instance created with tradingCardShimmer preset');

  // Invocation would occur within my-nft-gen pipeline; provided here for reference:
  // await effect.invoke(layer, frameNumber, totalFrames);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  demo();
}