import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { ColorPicker } from "../../../../../my-nft-gen/src/core/layer/configType/ColorPicker.js";

/**
 * FluxWeave Configuration
 * 
 * Configures the temporal fabric manipulation effect that transforms images into
 * living tapestries of flowing energy threads.
 * 
 * All parameters are flat (primitives only) for easy serialization.
 */
export class FluxWeaveConfig extends EffectConfig {
  static _name_ = 'flux-weave-config';
  static _displayName_ = 'FluxWeave Config';
  static _version_ = '1.0.0';

  constructor({
    // Wave Parameters
    waveFrequency1 = 0.02,
    waveFrequency2 = 0.015,
    waveSpeed1 = 1.0,
    waveSpeed2 = 1.5,
    waveAmplitude = 30,
    waveDirection = 'horizontal', // 'horizontal' | 'vertical' | 'radial' | 'diagonal'
    
    // Flow Parameters
    flowAngle = 0,
    flowTurbulence = 0.3,
    braidCount = 3,
    braidTightness = 0.5,
    
    // Color Parameters
    phaseShiftStrength = 20,
    hueRotation = 0,
    tintColor = new ColorPicker(ColorPicker.SelectionType.colorBucket),
    tintStrength = 0.2,
    
    // Animation Parameters
    pulseIntensity = 0.3,
    pulseFrequency = 1.0,
    shimmerSpeed = 1.0,
    
    // Rendering Parameters
    blendMode = 'overlay', // 'normal' | 'screen' | 'overlay' | 'add'
    
    // General
    layerOpacity = 1.0,
    
    ...rest
  } = {}) {
    super(rest);

    // Validate and store wave parameters
    this.waveFrequency1 = this.#clamp(waveFrequency1, 0.001, 0.1);
    this.waveFrequency2 = this.#clamp(waveFrequency2, 0.001, 0.1);
    this.waveSpeed1 = this.#clamp(waveSpeed1, 0, 5);
    this.waveSpeed2 = this.#clamp(waveSpeed2, 0, 5);
    this.waveAmplitude = this.#clamp(waveAmplitude, 0, 200);
    this.waveDirection = ['horizontal', 'vertical', 'radial', 'diagonal'].includes(waveDirection) 
      ? waveDirection 
      : 'horizontal';
    
    // Validate and store flow parameters
    this.flowAngle = this.#clamp(flowAngle, 0, 360);
    this.flowTurbulence = this.#clamp(flowTurbulence, 0, 1);
    this.braidCount = Math.round(this.#clamp(braidCount, 1, 8));
    this.braidTightness = this.#clamp(braidTightness, 0, 1);
    
    // Validate and store color parameters
    this.phaseShiftStrength = this.#clamp(phaseShiftStrength, 0, 100);
    this.hueRotation = this.#clamp(hueRotation, 0, 360);
    this.tintColor = tintColor;
    this.tintStrength = this.#clamp(tintStrength, 0, 1);
    
    // Validate and store animation parameters
    this.pulseIntensity = this.#clamp(pulseIntensity, 0, 1);
    this.pulseFrequency = this.#clamp(pulseFrequency, 0.5, 4);
    this.shimmerSpeed = this.#clamp(shimmerSpeed, 0, 5);
    
    // Validate and store rendering parameters
    this.blendMode = ['normal', 'screen', 'overlay', 'add'].includes(blendMode) 
      ? blendMode 
      : 'overlay';
    
    // General
    this.layerOpacity = this.#clamp(layerOpacity, 0, 1);
  }

  /**
   * Serialize to JSON-compatible object
   */
  toJSON() {
    return {
      waveFrequency1: this.waveFrequency1,
      waveFrequency2: this.waveFrequency2,
      waveSpeed1: this.waveSpeed1,
      waveSpeed2: this.waveSpeed2,
      waveAmplitude: this.waveAmplitude,
      waveDirection: this.waveDirection,
      flowAngle: this.flowAngle,
      flowTurbulence: this.flowTurbulence,
      braidCount: this.braidCount,
      braidTightness: this.braidTightness,
      phaseShiftStrength: this.phaseShiftStrength,
      hueRotation: this.hueRotation,
      tintColor: this.tintColor,
      tintStrength: this.tintStrength,
      pulseIntensity: this.pulseIntensity,
      pulseFrequency: this.pulseFrequency,
      shimmerSpeed: this.shimmerSpeed,
      blendMode: this.blendMode,
      layerOpacity: this.layerOpacity
    };
  }

  /**
   * Deserialize from JSON object
   */
  static fromJSON(json) {
    return new FluxWeaveConfig(json);
  }

  /**
   * Clamp value between min and max
   */
  #clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
}