import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

/**
 * HoloFoil Configuration (Final Image Effect)
 * 
 * Flat, JSON-serializable configuration for iridescent holographic foil simulation
 * with diffraction-like prismatic color shifts and shimmering animation.
 */
export class HoloFoilConfig extends EffectConfig {
  constructor({
    // General
    seed = 1337,
    layerOpacity = 1.0,
    perfectLoop = true,

    // Color base (HSV)
    baseHue = 200,           // 0..360
    saturation = 0.9,        // 0..1
    value = 1.0,             // 0..1
    rainbowStrength = 0.8,   // 0..1 multiplier for hue shift amplitude

    // Diffraction grating pattern
    gratingScale = 1.0,      // spatial frequency scale
    gratingAngleDeg = 30,    // base angle in degrees
    gratingOrderCount = 3,   // number of spectral orders to mix (1..5 recommended)

    // Animation controls
    animationMode = 'rotate',     // 'rotate' | 'tilt' | 'ripple' | 'pulse' | 'static'
    rotationSpeed = 0.5,          // cycles per loop
    tiltStrength = 0.5,           // 0..1
    rippleStrength = 0.3,         // 0..1 amplitude of radial ripple
    rippleFrequency = 2.0,        // cycles per loop for ripple
    rippleSpeed = 1.0,            // multiplier
    shimmerStrength = 0.6,        // 0..1 global shimmer modulation
    shimmerSpeed = 1.0,           // cycles per loop for shimmer

    // Color mode
    colorMode = 'prismatic',      // 'prismatic' | 'tinted' | 'mono'
    tintRed = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    tintGreen = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    tintBlue = new ColorPicker(ColorPicker.SelectionType.colorBucket),

    // Surface shaping
    highlightBoost = 0.35,   // 0..1 boosts highlights from source luminance
    vignetteStrength = 0.15, // 0..1 fades toward edges
    scratchDensity = 0.15,   // 0..1 density of micro-scratches
    scratchAngleDeg = 10,    // degrees
    scratchContrast = 0.6,   // 0..1
    grainStrength = 0.1,     // 0..1 dither/grain to reduce banding

    // Sampling & alpha
    preserveAlpha = true,
    interpolation = 'bilinear',   // 'bilinear' | 'nearest'

    // Reserved subtle parallax (default disabled)
    maxDisplacement = 0.0,   // keep 0 by default; not used in v1
  } = {}) {
    super();

    // General
    this.seed = Math.floor(Number.isFinite(seed) ? seed : 1337);
    this.layerOpacity = clamp01(layerOpacity);
    this.perfectLoop = true && !!perfectLoop;

    // Color base
    this.baseHue = wrapDeg(baseHue);
    this.saturation = clamp01(saturation);
    this.value = clamp01(value);
    this.rainbowStrength = clamp01(rainbowStrength);

    // Grating
    this.gratingScale = Number.isFinite(gratingScale) ? gratingScale : 1.0;
    this.gratingAngleDeg = wrapDeg(gratingAngleDeg);
    this.gratingOrderCount = Math.max(1, Math.min(5, Math.round(gratingOrderCount)));

    // Animation
    this.animationMode = ['rotate', 'tilt', 'ripple', 'pulse', 'static'].includes(animationMode) ? animationMode : 'rotate';
    this.rotationSpeed = Number.isFinite(rotationSpeed) ? rotationSpeed : 0.5;
    this.tiltStrength = clamp01(tiltStrength);
    this.rippleStrength = clamp01(rippleStrength);
    this.rippleFrequency = Math.max(0, Number.isFinite(rippleFrequency) ? rippleFrequency : 2.0);
    this.rippleSpeed = Number.isFinite(rippleSpeed) ? rippleSpeed : 1.0;
    this.shimmerStrength = clamp01(shimmerStrength);
    this.shimmerSpeed = Math.max(0, Number.isFinite(shimmerSpeed) ? shimmerSpeed : 1.0);

    // Color mode
    this.colorMode = ['prismatic', 'tinted', 'mono'].includes(colorMode) ? colorMode : 'prismatic';
    this.tintRed = tintRed;
    this.tintGreen = tintGreen;
    this.tintBlue = tintBlue;

    // Surface
    this.highlightBoost = clamp01(highlightBoost);
    this.vignetteStrength = clamp01(vignetteStrength);
    this.scratchDensity = clamp01(scratchDensity);
    this.scratchAngleDeg = wrapDeg(scratchAngleDeg);
    this.scratchContrast = clamp01(scratchContrast);
    this.grainStrength = clamp01(grainStrength);

    // Sampling & alpha
    this.preserveAlpha = !!preserveAlpha;
    this.interpolation = ['bilinear', 'nearest'].includes(interpolation) ? interpolation : 'bilinear';

    // Parallax
    this.maxDisplacement = Math.max(0, Number.isFinite(maxDisplacement) ? maxDisplacement : 0);
  }

  toJSON() {
    return {
      seed: this.seed,
      layerOpacity: this.layerOpacity,
      perfectLoop: this.perfectLoop,
      baseHue: this.baseHue,
      saturation: this.saturation,
      value: this.value,
      rainbowStrength: this.rainbowStrength,
      gratingScale: this.gratingScale,
      gratingAngleDeg: this.gratingAngleDeg,
      gratingOrderCount: this.gratingOrderCount,
      animationMode: this.animationMode,
      rotationSpeed: this.rotationSpeed,
      tiltStrength: this.tiltStrength,
      rippleStrength: this.rippleStrength,
      rippleFrequency: this.rippleFrequency,
      rippleSpeed: this.rippleSpeed,
      shimmerStrength: this.shimmerStrength,
      shimmerSpeed: this.shimmerSpeed,
      colorMode: this.colorMode,
      tintRed: this.tintRed,
      tintGreen: this.tintGreen,
      tintBlue: this.tintBlue,
      highlightBoost: this.highlightBoost,
      vignetteStrength: this.vignetteStrength,
      scratchDensity: this.scratchDensity,
      scratchAngleDeg: this.scratchAngleDeg,
      scratchContrast: this.scratchContrast,
      grainStrength: this.grainStrength,
      preserveAlpha: this.preserveAlpha,
      interpolation: this.interpolation,
      maxDisplacement: this.maxDisplacement
    };
  }

  static fromJSON(json) {
    return new HoloFoilConfig(json);
  }
}

// Helpers
function clamp01(v){ return Math.max(0, Math.min(1, Number(v))); }
function wrapDeg(d){
  let n = Number.isFinite(d) ? d : 0;
  n = n % 360;
  return n < 0 ? n + 360 : n;
}