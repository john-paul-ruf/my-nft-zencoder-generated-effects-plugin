import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { ColorPicker } from 'my-nft-gen/src/core/layer/configType/ColorPicker.js';

// Flat, serializable config for ChronoLenticularFoil
export class ChronoLenticularFoilConfig extends EffectConfig {
  constructor({
    seed = 1337,
    intensity = 0.85,
    grooveAngleDeg = 22,
    grooveCount = 1.8,
    grooveAngle2Deg = 98,
    grooveCount2 = 2.3,
    shimmerSpeed = 1.0,
    phaseK1 = 3,
    phaseK2 = 5,
    hueShiftDeg = 18,
    dispersion = 0.35,
    displacementPx = 2.2,
    edgeBoost = 1.4,
    mode = 'overlay', // 'overlay' | 'screen' | 'add'
    colorBase = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    colorHighlight = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    colorShadow = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    gamma = 1.0,
    quality = 'medium', // 'low' | 'medium' | 'high'
    layerOpacity = 1.0,
  } = {}) {
    super();
    this.seed = seed;
    this.intensity = clamp01(intensity);
    this.grooveAngleDeg = grooveAngleDeg;
    this.grooveCount = grooveCount;
    this.grooveAngle2Deg = grooveAngle2Deg;
    this.grooveCount2 = grooveCount2;
    this.shimmerSpeed = Math.max(0, shimmerSpeed);
    this.phaseK1 = Math.max(1, Math.round(phaseK1));
    this.phaseK2 = Math.max(1, Math.round(phaseK2));
    this.hueShiftDeg = hueShiftDeg;
    this.dispersion = clamp01(dispersion);
    this.displacementPx = Math.max(0, displacementPx);
    this.edgeBoost = Math.max(0, edgeBoost);
    this.mode = ['overlay','screen','add'].includes(mode) ? mode : 'overlay';
    this.colorBase = colorBase;
    this.colorHighlight = colorHighlight;
    this.colorShadow = colorShadow;
    this.gamma = Math.max(0.5, Math.min(2.2, gamma));
    this.quality = ['low','medium','high'].includes(quality) ? quality : 'medium';
    this.layerOpacity = clamp01(layerOpacity);

    // Always enforce perfect loop capability on this secondary effect
    this.perfectLoop = true;
  }

  toJSON() {
    return { ...this };
  }

  static fromJSON(obj) {
    return new ChronoLenticularFoilConfig(obj);
  }
}

function clamp01(v){ return Math.max(0, Math.min(1, v)); }