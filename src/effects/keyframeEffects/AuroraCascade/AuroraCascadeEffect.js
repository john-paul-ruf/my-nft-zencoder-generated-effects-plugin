// File: src/effects/keyframeEffects/AuroraCascade/AuroraCascadeEffect.js
// Aurora borealis-inspired keyframe effect with flowing ribbons of light, particle systems, and magnetic field distortions

import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import { Canvas2dFactory } from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import sharp from 'sharp';

// ========== UTILITY FUNCTIONS ==========
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smoothstep = (edge0, edge1, x) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

// Deterministic hash for stable randomization
const hash2 = (seed, index) => {
  let h = seed + index * 0x9e3779b1;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 0xffffffff;
};

// Parse hex color to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 255, g: 255, b: 255 };
};

// RGB to HSL conversion
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: h * 360, s, l };
};

// HSL to RGB conversion
const hslToRgb = (h, s, l) => {
  h = h / 360;
  
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

// ========== CONFIGURATION CLASS ==========
export class AuroraCascadeConfig extends EffectConfig {
  static _name_ = 'aurora-cascade-config';
  static _displayName_ = 'Aurora Cascade Config';
  static _version_ = '1.0.0';

  constructor({
    // Identity & Scheduling
    seed = 42,
    keyFrames = [0, 100, 300],
    cascadeDuration = [30, 60],
    
    // Aurora Properties
    ribbonCount = 5,
    ribbonWidth = 0.15,
    flowDirection = 'down',
    flowSpeed = 1.0,
    
    // Wave Configuration
    waveAmplitude = 0.3,
    waveFrequency = 2.0,
    wavePhaseShift = 0.25,
    turbulenceStrength = 0.2,
    
    // Color System
    colorMode = 'natural',
    primaryColor = '#00FF7F',
    secondaryColor = '#4169E1',
    tertiaryColor = '#9400D3',
    colorShiftSpeed = 0.5,
    saturationBoost = 1.2,
    
    // Particle Effects
    particleDensity = 50,
    particleSize = [1, 4],
    particleGlow = true,
    particleTrailLength = 0.3,
    
    // Magnetic Field
    fieldStrength = 0.5,
    fieldComplexity = 3,
    vortexCount = 2,
    vortexStrength = 0.3,
    
    // Atmospheric Effects
    glowIntensity = 1.5,
    blurRadius = 2,
    shimmerSpeed = 2.0,
    fadeEdges = 0.2,
    
    // Rendering
    blendMode = 'screen',
    layerOpacity = 0.9,
    preserveAlpha = true,
    quality = 'high',
  } = {}) {
    super();
    
    // Identity
    this.seed = Math.floor(Number.isFinite(seed) ? seed : 42);
    
    // Scheduling
    this.keyFrames = Array.isArray(keyFrames) ? keyFrames.map(n => Math.max(0, Math.floor(n))) : [];
    this.cascadeDuration = Array.isArray(cascadeDuration) && cascadeDuration.length === 2
      ? [Math.max(1, Math.floor(cascadeDuration[0])), Math.max(1, Math.floor(cascadeDuration[1]))]
      : [30, 60];
    
    // Aurora
    this.ribbonCount = Math.max(1, Math.floor(ribbonCount));
    this.ribbonWidth = clamp01(ribbonWidth);
    this.flowDirection = ['down', 'up', 'radial', 'spiral'].includes(flowDirection) ? flowDirection : 'down';
    this.flowSpeed = Math.max(0, Number.isFinite(flowSpeed) ? flowSpeed : 1.0);
    
    // Wave
    this.waveAmplitude = clamp01(waveAmplitude);
    this.waveFrequency = Math.max(0, Number.isFinite(waveFrequency) ? waveFrequency : 2.0);
    this.wavePhaseShift = clamp01(wavePhaseShift);
    this.turbulenceStrength = clamp01(turbulenceStrength);
    
    // Color
    this.colorMode = ['natural', 'cosmic', 'fire', 'ice', 'custom'].includes(colorMode) ? colorMode : 'natural';
    this.primaryColor = String(primaryColor || '#00FF7F');
    this.secondaryColor = String(secondaryColor || '#4169E1');
    this.tertiaryColor = String(tertiaryColor || '#9400D3');
    this.colorShiftSpeed = Math.max(0, Number.isFinite(colorShiftSpeed) ? colorShiftSpeed : 0.5);
    this.saturationBoost = Math.max(0, Number.isFinite(saturationBoost) ? saturationBoost : 1.2);
    
    // Particles
    this.particleDensity = Math.max(0, Math.floor(particleDensity));
    this.particleSize = Array.isArray(particleSize) && particleSize.length === 2
      ? [Math.max(1, particleSize[0]), Math.max(1, particleSize[1])]
      : [1, 4];
    this.particleGlow = !!particleGlow;
    this.particleTrailLength = clamp01(particleTrailLength);
    
    // Magnetic Field
    this.fieldStrength = clamp01(fieldStrength);
    this.fieldComplexity = Math.max(1, Math.floor(fieldComplexity));
    this.vortexCount = Math.max(0, Math.floor(vortexCount));
    this.vortexStrength = clamp01(vortexStrength);
    
    // Atmospheric
    this.glowIntensity = Math.max(0, Number.isFinite(glowIntensity) ? glowIntensity : 1.5);
    this.blurRadius = Math.max(0, Number.isFinite(blurRadius) ? blurRadius : 2);
    this.shimmerSpeed = Math.max(0, Number.isFinite(shimmerSpeed) ? shimmerSpeed : 2.0);
    this.fadeEdges = clamp01(fadeEdges);
    
    // Rendering
    this.blendMode = ['screen', 'additive', 'overlay'].includes(blendMode) ? blendMode : 'screen';
    this.layerOpacity = clamp01(layerOpacity);
    this.preserveAlpha = !!preserveAlpha;
    this.quality = ['low', 'medium', 'high'].includes(quality) ? quality : 'high';
  }

  toJSON() {
    return {
      seed: this.seed,
      keyFrames: this.keyFrames,
      cascadeDuration: this.cascadeDuration,
      ribbonCount: this.ribbonCount,
      ribbonWidth: this.ribbonWidth,
      flowDirection: this.flowDirection,
      flowSpeed: this.flowSpeed,
      waveAmplitude: this.waveAmplitude,
      waveFrequency: this.waveFrequency,
      wavePhaseShift: this.wavePhaseShift,
      turbulenceStrength: this.turbulenceStrength,
      colorMode: this.colorMode,
      primaryColor: this.primaryColor,
      secondaryColor: this.secondaryColor,
      tertiaryColor: this.tertiaryColor,
      colorShiftSpeed: this.colorShiftSpeed,
      saturationBoost: this.saturationBoost,
      particleDensity: this.particleDensity,
      particleSize: this.particleSize,
      particleGlow: this.particleGlow,
      particleTrailLength: this.particleTrailLength,
      fieldStrength: this.fieldStrength,
      fieldComplexity: this.fieldComplexity,
      vortexCount: this.vortexCount,
      vortexStrength: this.vortexStrength,
      glowIntensity: this.glowIntensity,
      blurRadius: this.blurRadius,
      shimmerSpeed: this.shimmerSpeed,
      fadeEdges: this.fadeEdges,
      blendMode: this.blendMode,
      layerOpacity: this.layerOpacity,
      preserveAlpha: this.preserveAlpha,
      quality: this.quality,
    };
  }

  static fromJSON(json) {
    return new AuroraCascadeConfig(json);
  }
}

// ========== RENDERING STRATEGIES ==========
class RibbonRenderer {
  constructor(config) {
    this.config = config;
    this.initializeColorPalette();
  }

  initializeColorPalette() {
    // Set up color palette based on mode
    const modes = {
      natural: {
        primary: '#00FF7F',
        secondary: '#4169E1',
        tertiary: '#9400D3'
      },
      cosmic: {
        primary: '#FF00FF',
        secondary: '#00FFFF',
        tertiary: '#FF00AA'
      },
      fire: {
        primary: '#FF4500',
        secondary: '#FFD700',
        tertiary: '#FF6347'
      },
      ice: {
        primary: '#00FFFF',
        secondary: '#E0FFFF',
        tertiary: '#B0E0E6'
      },
      custom: {
        primary: this.config.primaryColor || '#00FF7F',
        secondary: this.config.secondaryColor || '#4169E1',
        tertiary: this.config.tertiaryColor || '#9400D3'
      }
    };

    const palette = modes[this.config.colorMode] || modes.natural;
    
    // Ensure palette colors are strings before parsing
    const primaryStr = String(palette.primary || '#00FF7F');
    const secondaryStr = String(palette.secondary || '#4169E1');
    const tertiaryStr = String(palette.tertiary || '#9400D3');
    
    this.colors = {
      primary: hexToRgb(primaryStr),
      secondary: hexToRgb(secondaryStr),
      tertiary: hexToRgb(tertiaryStr)
    };
  }

  async renderRibbon(canvas, ribbonIndex, t, width, height) {
    const phaseOffset = ribbonIndex * this.config.wavePhaseShift;
    const ribbonY = this.calculateRibbonY(t, phaseOffset, height);
    const ribbonWidth = width * this.config.ribbonWidth;
    
    // Calculate color for this ribbon
    const colorPhase = (t * this.config.colorShiftSpeed + ribbonIndex * 0.2) % 1.0;
    const color1 = this.blendColors(this.colors.primary, this.colors.secondary, colorPhase);
    const color2 = this.blendColors(this.colors.secondary, this.colors.tertiary, colorPhase);
    
    // Apply saturation boost
    const boostedColor1 = this.boostSaturation(color1);
    const boostedColor2 = this.boostSaturation(color2);
    
    // Build ribbon path (top edge)
    const ribbonPath = [];
    
    for (let x = 0; x <= width; x += 5) {
      const waveY = this.calculateWaveY(x, t, phaseOffset, width, ribbonY);
      const turbulence = this.calculateTurbulence(x, waveY, t);
      const y = waveY + turbulence;
      ribbonPath.push({ x, y: y - ribbonWidth / 2 });
    }
    
    // Add bottom edge in reverse
    for (let x = width; x >= 0; x -= 5) {
      const waveY = this.calculateWaveY(x, t, phaseOffset, width, ribbonY);
      const turbulence = this.calculateTurbulence(x, waveY, t);
      const y = waveY + turbulence;
      ribbonPath.push({ x, y: y + ribbonWidth / 2 });
    }
    
    // Convert RGB to hex color string
    const c1r = Math.max(0, Math.min(255, Math.floor(boostedColor1.r || 0)));
    const c1g = Math.max(0, Math.min(255, Math.floor(boostedColor1.g || 0)));
    const c1b = Math.max(0, Math.min(255, Math.floor(boostedColor1.b || 0)));
    const c2r = Math.max(0, Math.min(255, Math.floor(boostedColor2.r || 0)));
    const c2g = Math.max(0, Math.min(255, Math.floor(boostedColor2.g || 0)));
    const c2b = Math.max(0, Math.min(255, Math.floor(boostedColor2.b || 0)));
    
    const color1Hex = `#${c1r.toString(16).padStart(2, '0')}${c1g.toString(16).padStart(2, '0')}${c1b.toString(16).padStart(2, '0')}`;
    const color2Hex = `#${c2r.toString(16).padStart(2, '0')}${c2g.toString(16).padStart(2, '0')}${c2b.toString(16).padStart(2, '0')}`;
    
    // Draw ribbon with blend of colors for gradient effect
    await canvas.drawPath(ribbonPath, 2, color1Hex, 0.4, color2Hex);
    
    // Add glow effect with multiple passes
    if (this.config.glowIntensity > 0) {
      const glowStrength = 0.2 * this.config.glowIntensity;
      await canvas.drawPath(ribbonPath, 4, color2Hex, glowStrength, null);
      await canvas.drawPath(ribbonPath, 8, color1Hex, glowStrength * 0.5, null);
    }
  }

  calculateRibbonY(t, phaseOffset, height) {
    const direction = this.config.flowDirection;
    const flowPhase = (t + phaseOffset) % 1.0;
    
    switch (direction) {
      case 'down':
        return flowPhase * height;
      case 'up':
        return (1 - flowPhase) * height;
      case 'radial':
        return height / 2 + Math.sin(flowPhase * Math.PI * 2) * height * 0.4;
      case 'spiral':
        return height / 2 + Math.sin(flowPhase * Math.PI * 4) * height * 0.3;
      default:
        return flowPhase * height;
    }
  }

  calculateWaveY(x, t, phaseOffset, width, baseY) {
    const wavePhase = (t + phaseOffset) * this.config.waveFrequency;
    const waveX = (x / width) * Math.PI * 2 * this.config.waveFrequency;
    const amplitude = width * this.config.waveAmplitude;
    
    const wave = Math.sin(waveX + wavePhase * Math.PI * 2) * amplitude;
    return baseY + wave;
  }

  calculateTurbulence(x, y, t) {
    if (this.config.turbulenceStrength === 0) return 0;
    
    // Simple turbulence using multiple sine waves
    const turb1 = Math.sin(x * 0.01 + t * 10) * 5;
    const turb2 = Math.sin(y * 0.02 + t * 15) * 3;
    const turb3 = Math.sin((x + y) * 0.015 + t * 20) * 2;
    
    return (turb1 + turb2 + turb3) * this.config.turbulenceStrength;
  }

  blendColors(color1, color2, t) {
    // Validate input colors
    if (!color1 || typeof color1.r !== 'number') color1 = { r: 255, g: 255, b: 255 };
    if (!color2 || typeof color2.r !== 'number') color2 = { r: 255, g: 255, b: 255 };
    
    return {
      r: Math.round(lerp(color1.r, color2.r, t)),
      g: Math.round(lerp(color1.g, color2.g, t)),
      b: Math.round(lerp(color1.b, color2.b, t))
    };
  }

  boostSaturation(color) {
    // Validate color object
    if (!color || typeof color.r !== 'number' || typeof color.g !== 'number' || typeof color.b !== 'number') {
      return { r: 255, g: 255, b: 255 }; // Return white as fallback
    }
    
    const hsl = rgbToHsl(color.r, color.g, color.b);
    hsl.s = Math.min(1, hsl.s * this.config.saturationBoost);
    const result = hslToRgb(hsl.h, hsl.s, hsl.l);
    
    // Validate result
    if (!result || typeof result.r !== 'number' || typeof result.g !== 'number' || typeof result.b !== 'number') {
      return { r: 255, g: 255, b: 255 }; // Return white as fallback
    }
    
    return result;
  }
}

class ParticleSystem {
  constructor(config, seed) {
    this.config = config;
    this.seed = seed;
    this.particles = this.initializeParticles();
  }

  initializeParticles() {
    const particles = [];
    const totalParticles = this.config.ribbonCount * this.config.particleDensity;
    
    for (let i = 0; i < totalParticles; i++) {
      const rand1 = hash2(this.seed, i * 3);
      const rand2 = hash2(this.seed, i * 3 + 1);
      const rand3 = hash2(this.seed, i * 3 + 2);
      
      particles.push({
        baseX: rand1,
        baseY: rand2,
        size: this.config.particleSize[0] + 
              (this.config.particleSize[1] - this.config.particleSize[0]) * rand3,
        speed: 0.5 + rand3 * 1.5,
        phase: rand1 * Math.PI * 2,
        ribbonIndex: Math.floor(rand2 * this.config.ribbonCount)
      });
    }
    
    return particles;
  }

  async renderParticles(canvas, t, width, height) {
    for (const particle of this.particles) {
      const x = particle.baseX * width;
      const y = (particle.baseY + t * particle.speed) % 1.0 * height;
      
      // Apply magnetic field distortion
      const fieldOffset = this.calculateFieldDistortion(x, y, t);
      const finalX = x + fieldOffset.x;
      const finalY = y + fieldOffset.y;
      
      // Calculate shimmer
      const shimmer = Math.sin(t * this.config.shimmerSpeed * Math.PI * 2 + particle.phase);
      const opacity = 0.3 + shimmer * 0.7;
      
      // Draw trail if enabled
      if (this.config.particleTrailLength > 0) {
        const trailLength = height * this.config.particleTrailLength;
        const trailStartOpacity = opacity * 0.8;
        const trailEndOpacity = opacity * 0.1;
        
        // Draw trail as a line with fading effect using multiple passes
        await canvas.drawLine2d(
          { x: finalX, y: finalY },
          { x: finalX, y: finalY - trailLength },
          particle.size * 0.5,
          '#FFFFFF',
          trailStartOpacity,
          null,
          1.0
        );
      }
      
      // Draw glow if enabled
      if (this.config.particleGlow && particle.size > 0) {
        // Draw glow rings
        const glowColor = '#FFFFFF';
        const glowAlpha = opacity * 0.3;
        await canvas.drawRing2d(
          { x: finalX, y: finalY },
          particle.size * 1.5,
          1.5,
          glowColor,
          glowAlpha,
          null
        );
        await canvas.drawRing2d(
          { x: finalX, y: finalY },
          particle.size * 2.5,
          1,
          glowColor,
          glowAlpha * 0.5,
          null
        );
      }
      
      // Draw main particle
      await canvas.drawRing2d(
        { x: finalX, y: finalY },
        particle.size,
        particle.size,
        '#FFFFFF',
        opacity,
        '#FFFFFF'
      );
    }
  }

  calculateFieldDistortion(x, y, t) {
    if (this.config.fieldStrength === 0) return { x: 0, y: 0 };
    
    let distX = 0;
    let distY = 0;
    
    // Apply magnetic field sources
    for (let i = 0; i < this.config.fieldComplexity; i++) {
      const sourceX = hash2(this.seed, i * 100) * 1000;
      const sourceY = hash2(this.seed, i * 100 + 1) * 1000;
      const strength = hash2(this.seed, i * 100 + 2);
      
      const dx = x - sourceX;
      const dy = y - sourceY;
      const distance = Math.sqrt(dx * dx + dy * dy) + 1;
      
      distX += (dy / distance) * strength * 50;
      distY -= (dx / distance) * strength * 50;
    }
    
    // Apply vortex effects
    for (let i = 0; i < this.config.vortexCount; i++) {
      const vortexX = hash2(this.seed, i * 200) * 1000;
      const vortexY = hash2(this.seed, i * 200 + 1) * 1000;
      const vortexPhase = t * (1 + hash2(this.seed, i * 200 + 2));
      
      const dx = x - vortexX;
      const dy = y - vortexY;
      const angle = Math.atan2(dy, dx) + vortexPhase * Math.PI * 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 200) {
        const strength = (1 - distance / 200) * this.config.vortexStrength;
        distX += Math.cos(angle + Math.PI / 2) * strength * 30;
        distY += Math.sin(angle + Math.PI / 2) * strength * 30;
      }
    }
    
    return {
      x: distX * this.config.fieldStrength,
      y: distY * this.config.fieldStrength
    };
  }
}

// ========== EFFECT CLASS ==========
export class AuroraCascadeEffect extends LayerEffect {
  static _name_ = 'aurora-cascade';
  static _displayName_ = 'Aurora Cascade';
  static _description_ = 'Mesmerizing aurora borealis effect with flowing ribbons of light and particle systems.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'keyframe', 'aurora', 'cascade', 'particles', 'animated'];

  constructor({ name = AuroraCascadeEffect._name_, config, settings } = {}) {
    super({ name, config, settings });
    this.#initialize(settings);
  }

  #initialize(settings) {
    const width = settings?.width || this.finalSize?.width || 1024;
    const height = settings?.height || this.finalSize?.height || 1024;
    
    // Ensure config exists
    if (!this.config) {
      this.config = new AuroraCascadeConfig();
    }
    
    // Parse schedule
    const keyFrames = Array.isArray(this.config.keyFrames) 
      ? this.config.keyFrames.slice().sort((a, b) => a - b) 
      : [];
    const [minLen, maxLen] = Array.isArray(this.config.cascadeDuration) && this.config.cascadeDuration.length === 2
      ? this.config.cascadeDuration
      : [30, 60];
    
    // Build schedule with deterministic durations
    this.schedule = keyFrames.map((start, i) => {
      const u = hash2(this.config.seed, i);
      const duration = minLen + Math.floor(u * (maxLen - minLen + 1));
      return { start, duration };
    });
    
    // Calculate perfect loop cycles (round to integers)
    this.flowCycles = Math.max(1, Math.round(this.config.flowSpeed));
    this.waveCycles = Math.max(1, Math.round(this.config.waveFrequency));
    this.colorCycles = Math.max(1, Math.round(this.config.colorShiftSpeed));
    this.shimmerCycles = Math.max(1, Math.round(this.config.shimmerSpeed));
    
    // Initialize rendering strategies
    this.ribbonRenderer = new RibbonRenderer(this.config);
    this.particleSystem = new ParticleSystem(this.config, this.config.seed);
    
    // Store dimensions
    this.width = width;
    this.height = height;
  }
  
  #getTimeInfo(frameNumber) {
    // Find active window
    for (const window of this.schedule) {
      const end = window.start + window.duration;
      if (frameNumber >= window.start && frameNumber < end) {
        const localFrame = frameNumber - window.start;
        const t = localFrame / window.duration; // Normalized time [0, 1)
        return { active: true, t, window };
      }
    }
    return { active: false };
  }
  
  async invoke(layer, frameNumber, totalFrames) {
    if (!layer) {
      throw new Error('AuroraCascadeEffect requires a layer');
    }

    const timeInfo = this.#getTimeInfo(frameNumber);
    if (!timeInfo.active) {
      // Not in active window, return original layer
      return layer;
    }

    const {t} = timeInfo;

    // Get layer buffer
    const layerBuffer = await layer.toBuffer();
    const inputMetadata = await sharp(layerBuffer).metadata();

    // Ensure dimensions are set (lazy initialization for secondary effects)
    if (!this.width || !this.height) {
      this.width = inputMetadata.width || 1024;
      this.height = inputMetadata.height || 1024;
    }

    // Ensure config exists and is properly hydrated (for deserialization)
    let configWasHydrated = false;
    if (!this.config) {
      this.config = new AuroraCascadeConfig();
      configWasHydrated = true;
    } else if (!(this.config instanceof AuroraCascadeConfig)) {
      // Config exists but is a plain object (from deserialization) - hydrate it
      this.config = new AuroraCascadeConfig(this.config);
      configWasHydrated = true;
    }

    // Ensure schedule is initialized (lazy initialization for secondary effects)
    if (!this.schedule) {
      const keyFrames = Array.isArray(this.config.keyFrames)
          ? this.config.keyFrames.slice().sort((a, b) => a - b)
          : [];
      const [minLen, maxLen] = Array.isArray(this.config.cascadeDuration) && this.config.cascadeDuration.length === 2
          ? this.config.cascadeDuration
          : [30, 60];

      this.schedule = keyFrames.map((start, i) => {
        const u = hash2(this.config.seed, i);
        const duration = minLen + Math.floor(u * (maxLen - minLen + 1));
        return {start, duration};
      });
    }

    // Ensure cycles are initialized (lazy initialization for secondary effects)
    if (!this.flowCycles) {
      this.flowCycles = Math.max(1, Math.round(this.config.flowSpeed));
      this.waveCycles = Math.max(1, Math.round(this.config.waveFrequency));
      this.colorCycles = Math.max(1, Math.round(this.config.colorShiftSpeed));
      this.shimmerCycles = Math.max(1, Math.round(this.config.shimmerSpeed));
    }

    // Ensure renderers are initialized (lazy initialization for secondary effects)
    // If config was hydrated, recreate renderers to use the proper config instance
    if (!this.ribbonRenderer || configWasHydrated) {
      this.ribbonRenderer = new RibbonRenderer(this.config);
    }
    if (!this.particleSystem || configWasHydrated) {
      this.particleSystem = new ParticleSystem(this.config, this.config.seed);
    }

    // Create canvas for effect rendering using Canvas2dFactory
    const canvas = await Canvas2dFactory.getNewCanvas(this.width, this.height);

    // Calculate animation phases for perfect loops
    const flowPhase = (t * this.flowCycles) % 1.0;
    const wavePhase = (t * this.waveCycles) % 1.0;
    const colorPhase = (t * this.colorCycles) % 1.0;
    const shimmerPhase = (t * this.shimmerCycles) % 1.0;

    // Render ribbons
    for (let i = 0; i < this.config.ribbonCount; i++) {
      await this.ribbonRenderer.renderRibbon(canvas, i, flowPhase, this.width, this.height);
    }

    // Render particles
    if (this.config.particleDensity > 0) {
      await this.particleSystem.renderParticles(canvas, flowPhase, this.width, this.height);
    }

    // Convert canvas to layer using Canvas2dFactory
    let resultLayer = await canvas.convertToLayer();

    // Apply blur if configured
    if (this.config.blurRadius > 0) {
      await resultLayer.blur(this.config.blurRadius);
    }

    // Apply opacity settings
    await resultLayer.adjustLayerOpacity(this.config.layerOpacity);

    // Composite over original layer
    await layer.compositeLayerOver(resultLayer);

    return layer;
  }
}

// Export both classes
export default AuroraCascadeEffect;