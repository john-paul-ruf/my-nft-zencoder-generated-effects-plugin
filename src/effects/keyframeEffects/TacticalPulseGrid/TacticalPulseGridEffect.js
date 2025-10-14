// File: src/effects/keyframeEffects/TacticalPulseGrid/TacticalPulseGridEffect.js
// Tactical HUD-inspired keyframe effect with scanning pulses, targeting reticles, and digital interference

import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';
import { EffectConfig } from 'my-nft-gen/src/core/layer/EffectConfig.js';
import sharp from 'sharp';
import { createCanvas } from 'canvas';

// ========== UTILITY FUNCTIONS ==========
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const wrapDeg = (deg) => ((deg % 360) + 360) % 360;
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

// ========== CONFIGURATION CLASS ==========
export class TacticalPulseGridConfig extends EffectConfig {
  static _name_ = 'tactical-pulse-grid-config';
  static _displayName_ = 'Tactical Pulse Grid Config';
  static _version_ = '1.0.0';

  constructor({
    // Identity & Scheduling
    seed = 2077,
    keyFrames = [0, 150, 400],
    pulseDuration = [20, 40],
    
    // Grid Configuration
    gridMode = 'hexagonal',
    cellSize = 30,
    gridOpacity = 0.3,
    gridColor = '#00FF41',
    
    // Pulse Configuration
    pulseMode = 'radial',
    pulseSpeed = 2.0,
    pulseWidth = 0.15,
    pulseIntensity = 1.5,
    pulseColor = '#00FFFF',
    pulseGlow = true,
    
    // Scan Configuration
    scanAngle = 45,
    scanRotation = 1.0,
    scannerCount = 2,
    scannerPhaseOffset = 0.5,
    
    // Targeting System
    reticleCount = 3,
    reticleSize = 0.08,
    reticleColor = '#FF0040',
    reticleDrift = 0.3,
    reticleSpeed = 1.5,
    reticleLockTime = 0.3,
    
    // Interference Effects
    interferenceMode = 'constructive',
    interferenceThreshold = 0.5,
    interferenceColor = '#FFFF00',
    
    // Glitch Effects
    glitchProbability = 0.1,
    glitchIntensity = 0.3,
    glitchDuration = 0.05,
    glitchMode = 'digital',
    
    // Data Overlay
    showDataStream = true,
    dataColor = '#00FF00',
    dataOpacity = 0.5,
    dataScrollSpeed = 2.0,
    
    // Edge Detection
    edgeDetection = true,
    edgeThreshold = 0.2,
    edgeColor = '#FFFFFF',
    edgeBlend = 'screen',
    
    // Output Control
    preserveAlpha = true,
    layerOpacity = 0.9,
    blendMode = 'screen',
  } = {}) {
    super();
    
    // Identity
    this.seed = Math.floor(Number.isFinite(seed) ? seed : 2077);
    
    // Scheduling
    this.keyFrames = Array.isArray(keyFrames) ? keyFrames.map(n => Math.max(0, Math.floor(n))) : [];
    this.pulseDuration = Array.isArray(pulseDuration) && pulseDuration.length === 2
      ? [Math.max(1, Math.floor(pulseDuration[0])), Math.max(1, Math.floor(pulseDuration[1]))]
      : [20, 40];
    
    // Grid
    this.gridMode = ['hexagonal', 'square', 'triangular'].includes(gridMode) ? gridMode : 'hexagonal';
    this.cellSize = Math.max(10, Math.floor(cellSize));
    this.gridOpacity = clamp01(gridOpacity);
    this.gridColor = String(gridColor || '#00FF41');
    
    // Pulse
    this.pulseMode = ['radial', 'linear', 'spiral', 'crosshair'].includes(pulseMode) ? pulseMode : 'radial';
    this.pulseSpeed = Math.max(0, Number.isFinite(pulseSpeed) ? pulseSpeed : 2.0);
    this.pulseWidth = clamp01(pulseWidth);
    this.pulseIntensity = Math.max(0, Number.isFinite(pulseIntensity) ? pulseIntensity : 1.5);
    this.pulseColor = String(pulseColor || '#00FFFF');
    this.pulseGlow = !!pulseGlow;
    
    // Scan
    this.scanAngle = wrapDeg(scanAngle);
    this.scanRotation = Number.isFinite(scanRotation) ? scanRotation : 1.0;
    this.scannerCount = Math.max(1, Math.floor(scannerCount));
    this.scannerPhaseOffset = clamp01(scannerPhaseOffset);
    
    // Targeting
    this.reticleCount = Math.max(0, Math.floor(reticleCount));
    this.reticleSize = clamp01(reticleSize);
    this.reticleColor = String(reticleColor || '#FF0040');
    this.reticleDrift = clamp01(reticleDrift);
    this.reticleSpeed = Math.max(0, Number.isFinite(reticleSpeed) ? reticleSpeed : 1.5);
    this.reticleLockTime = clamp01(reticleLockTime);
    
    // Interference
    this.interferenceMode = ['constructive', 'destructive', 'both'].includes(interferenceMode) 
      ? interferenceMode : 'constructive';
    this.interferenceThreshold = clamp01(interferenceThreshold);
    this.interferenceColor = String(interferenceColor || '#FFFF00');
    
    // Glitch
    this.glitchProbability = clamp01(glitchProbability);
    this.glitchIntensity = clamp01(glitchIntensity);
    this.glitchDuration = clamp01(glitchDuration);
    this.glitchMode = ['digital', 'analog', 'chromatic'].includes(glitchMode) ? glitchMode : 'digital';
    
    // Data Overlay
    this.showDataStream = !!showDataStream;
    this.dataColor = String(dataColor || '#00FF00');
    this.dataOpacity = clamp01(dataOpacity);
    this.dataScrollSpeed = Math.max(0, Number.isFinite(dataScrollSpeed) ? dataScrollSpeed : 2.0);
    
    // Edge Detection
    this.edgeDetection = !!edgeDetection;
    this.edgeThreshold = clamp01(edgeThreshold);
    this.edgeColor = String(edgeColor || '#FFFFFF');
    this.edgeBlend = ['screen', 'additive', 'overlay'].includes(edgeBlend) ? edgeBlend : 'screen';
    
    // Output
    this.preserveAlpha = !!preserveAlpha;
    this.layerOpacity = clamp01(layerOpacity);
    this.blendMode = ['screen', 'additive', 'overlay'].includes(blendMode) ? blendMode : 'screen';
  }

  toJSON() {
    return {
      seed: this.seed,
      keyFrames: this.keyFrames,
      pulseDuration: this.pulseDuration,
      gridMode: this.gridMode,
      cellSize: this.cellSize,
      gridOpacity: this.gridOpacity,
      gridColor: this.gridColor,
      pulseMode: this.pulseMode,
      pulseSpeed: this.pulseSpeed,
      pulseWidth: this.pulseWidth,
      pulseIntensity: this.pulseIntensity,
      pulseColor: this.pulseColor,
      pulseGlow: this.pulseGlow,
      scanAngle: this.scanAngle,
      scanRotation: this.scanRotation,
      scannerCount: this.scannerCount,
      scannerPhaseOffset: this.scannerPhaseOffset,
      reticleCount: this.reticleCount,
      reticleSize: this.reticleSize,
      reticleColor: this.reticleColor,
      reticleDrift: this.reticleDrift,
      reticleSpeed: this.reticleSpeed,
      reticleLockTime: this.reticleLockTime,
      interferenceMode: this.interferenceMode,
      interferenceThreshold: this.interferenceThreshold,
      interferenceColor: this.interferenceColor,
      glitchProbability: this.glitchProbability,
      glitchIntensity: this.glitchIntensity,
      glitchDuration: this.glitchDuration,
      glitchMode: this.glitchMode,
      showDataStream: this.showDataStream,
      dataColor: this.dataColor,
      dataOpacity: this.dataOpacity,
      dataScrollSpeed: this.dataScrollSpeed,
      edgeDetection: this.edgeDetection,
      edgeThreshold: this.edgeThreshold,
      edgeColor: this.edgeColor,
      edgeBlend: this.edgeBlend,
      preserveAlpha: this.preserveAlpha,
      layerOpacity: this.layerOpacity,
      blendMode: this.blendMode,
    };
  }

  static fromJSON(json) {
    return new TacticalPulseGridConfig(json);
  }
}

// ========== EFFECT CLASS ==========
export class TacticalPulseGridEffect extends LayerEffect {
  static _name_ = 'tactical-pulse-grid';
  static _displayName_ = 'Tactical Pulse Grid';
  static _description_ = 'Tactical HUD overlay with scanning pulses, targeting reticles, and digital interference.';
  static _version_ = '1.0.0';
  static _author_ = 'Zencoder';
  static _tags_ = ['effect', 'keyframe', 'tactical', 'hud', 'pulse', 'grid', 'animated'];

  constructor({ name = TacticalPulseGridEffect._name_, config, settings } = {}) {
    super({ name, config });
    this.#generate(settings);
  }

  #generate(settings) {
    const width = settings?.width || 1024;
    const height = settings?.height || 1024;
    
    // Ensure config exists
    if (!this.config) {
      this.config = new TacticalPulseGridConfig();
    }
    
    // Parse schedule
    const keyFrames = Array.isArray(this.config.keyFrames) 
      ? this.config.keyFrames.slice().sort((a, b) => a - b) 
      : [];
    const [minLen, maxLen] = Array.isArray(this.config.pulseDuration) && this.config.pulseDuration.length === 2
      ? this.config.pulseDuration
      : [20, 40];
    
    // Build schedule with deterministic durations
    this.schedule = keyFrames.map((start, i) => {
      const u = hash2(this.config.seed, i);
      const duration = minLen + Math.floor(u * (maxLen - minLen + 1));
      return { start, duration };
    });
    
    // Pre-calculate grid positions
    this.gridPositions = this.#generateGridPositions(width, height);
    
    // Pre-calculate reticle paths (Lissajous curves)
    this.reticlePaths = [];
    for (let i = 0; i < this.config.reticleCount; i++) {
      const freqX = 2 + hash2(this.config.seed, i * 100) * 3;
      const freqY = 3 + hash2(this.config.seed, i * 100 + 1) * 2;
      const phaseShift = hash2(this.config.seed, i * 100 + 2) * Math.PI * 2;
      this.reticlePaths.push({ freqX, freqY, phaseShift });
    }
    
    // Calculate perfect loop cycles
    this.pulseCycles = Math.max(1, Math.round(this.config.pulseSpeed));
    this.scanCycles = Math.max(1, Math.round(this.config.scanRotation));
    this.reticleCycles = Math.max(1, Math.round(this.config.reticleSpeed));
    
    // Store dimensions
    this.width = width;
    this.height = height;
  }
  
  #generateGridPositions(width, height) {
    const positions = [];
    const cellSize = this.config.cellSize;
    
    if (this.config.gridMode === 'hexagonal') {
      const hexHeight = cellSize * Math.sqrt(3);
      const rows = Math.ceil(height / hexHeight) + 1;
      const cols = Math.ceil(width / (cellSize * 1.5)) + 1;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellSize * 1.5;
          const y = row * hexHeight + (col % 2) * (hexHeight / 2);
          positions.push({ x, y, row, col });
        }
      }
    } else if (this.config.gridMode === 'square') {
      const rows = Math.ceil(height / cellSize) + 1;
      const cols = Math.ceil(width / cellSize) + 1;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          positions.push({
            x: col * cellSize,
            y: row * cellSize,
            row,
            col
          });
        }
      }
    } else if (this.config.gridMode === 'triangular') {
      const triHeight = cellSize * Math.sqrt(3) / 2;
      const rows = Math.ceil(height / triHeight) + 1;
      const cols = Math.ceil(width / cellSize) + 1;
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * cellSize + (row % 2) * (cellSize / 2);
          const y = row * triHeight;
          positions.push({ x, y, row, col });
        }
      }
    }
    
    return positions;
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
  
  #calculatePulseActivation(x, y, t, centerX, centerY) {
    const maxDist = Math.sqrt(this.width * this.width + this.height * this.height);
    
    if (this.config.pulseMode === 'radial') {
      // Radial pulse expanding from center
      const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const normalizedDist = dist / maxDist;
      const wavePos = (t * this.pulseCycles) % 1.0;
      
      return smoothstep(
        wavePos - this.config.pulseWidth,
        wavePos,
        normalizedDist
      ) * smoothstep(
        wavePos + this.config.pulseWidth,
        wavePos,
        normalizedDist
      );
    } else if (this.config.pulseMode === 'linear') {
      // Linear sweep at angle
      const angle = (this.config.scanAngle + t * this.scanCycles * 360) * Math.PI / 180;
      const projDist = (x - centerX) * Math.cos(angle) + (y - centerY) * Math.sin(angle);
      const normalizedDist = (projDist + maxDist) / (2 * maxDist);
      const wavePos = (t * this.pulseCycles) % 1.0;
      
      return smoothstep(
        wavePos - this.config.pulseWidth,
        wavePos,
        normalizedDist
      ) * smoothstep(
        wavePos + this.config.pulseWidth,
        wavePos,
        normalizedDist
      );
    } else if (this.config.pulseMode === 'spiral') {
      // Spiral pattern
      const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const angle = Math.atan2(y - centerY, x - centerX);
      const spiralPhase = (dist / maxDist - angle / (2 * Math.PI) + t * this.pulseCycles) % 1.0;
      
      return smoothstep(0, this.config.pulseWidth, spiralPhase) * 
             smoothstep(this.config.pulseWidth * 2, this.config.pulseWidth, spiralPhase);
    } else if (this.config.pulseMode === 'crosshair') {
      // Dual perpendicular sweeps
      const phase = t * this.pulseCycles;
      const horizontalDist = Math.abs(y - centerY) / this.height;
      const verticalDist = Math.abs(x - centerX) / this.width;
      
      const hPulse = smoothstep(
        (phase % 1.0) - this.config.pulseWidth,
        phase % 1.0,
        horizontalDist
      ) * smoothstep(
        (phase % 1.0) + this.config.pulseWidth,
        phase % 1.0,
        horizontalDist
      );
      
      const vPulse = smoothstep(
        ((phase + 0.5) % 1.0) - this.config.pulseWidth,
        (phase + 0.5) % 1.0,
        verticalDist
      ) * smoothstep(
        ((phase + 0.5) % 1.0) + this.config.pulseWidth,
        (phase + 0.5) % 1.0,
        verticalDist
      );
      
      return Math.max(hPulse, vPulse);
    }
    
    return 0;
  }
  
  #getReticlePosition(index, t) {
    const path = this.reticlePaths[index];
    const phase = t * this.reticleCycles * 2 * Math.PI;
    
    // Lissajous curve
    const x = this.width * 0.5 + 
              this.width * this.config.reticleDrift * 
              Math.sin(path.freqX * phase + path.phaseShift);
    const y = this.height * 0.5 + 
              this.height * this.config.reticleDrift * 
              Math.cos(path.freqY * phase);
    
    // Lock-on effect
    const lockPhase = (t * this.reticleCycles * this.config.reticleCount + index) % 1.0;
    const isLocked = lockPhase < this.config.reticleLockTime;
    
    return { x, y, isLocked };
  }
  
  #applyGlitch(imageData, t) {
    if (Math.random() > this.config.glitchProbability) return;
    
    const { data, width, height } = imageData;
    const glitchHeight = Math.floor(height * 0.05);
    const glitchY = Math.floor(Math.random() * (height - glitchHeight));
    
    if (this.config.glitchMode === 'digital') {
      // Horizontal displacement
      const shift = Math.floor(this.config.glitchIntensity * width * 0.1);
      for (let y = glitchY; y < glitchY + glitchHeight; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = (x + shift) % width;
          const srcIdx = (y * width + srcX) * 4;
          const dstIdx = (y * width + x) * 4;
          
          data[dstIdx] = data[srcIdx];
          data[dstIdx + 1] = data[srcIdx + 1];
          data[dstIdx + 2] = data[srcIdx + 2];
        }
      }
    } else if (this.config.glitchMode === 'chromatic') {
      // RGB channel shift
      const shiftR = Math.floor(this.config.glitchIntensity * 10);
      const shiftG = Math.floor(this.config.glitchIntensity * 5);
      
      for (let y = glitchY; y < glitchY + glitchHeight; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const idxR = (y * width + Math.min(width - 1, x + shiftR)) * 4;
          const idxG = (y * width + Math.max(0, x - shiftG)) * 4;
          
          data[idx] = data[idxR];
          data[idx + 1] = data[idxG + 1];
        }
      }
    }
  }
  
  async invoke(layer, frameNumber, totalFrames) {
    if (!layer?.buffer) return layer;
    
    // Get time info
    const timeInfo = this.#getTimeInfo(frameNumber);
    if (!timeInfo.active) return layer;
    
    const t = timeInfo.t;
    
    // Load source image
    const sourceImage = sharp(layer.buffer);
    const metadata = await sourceImage.metadata();
    const { width, height } = metadata;
    
    // Create canvas for effect
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Load source as image data
    const sourceBuffer = await sourceImage.raw().toBuffer();
    const imageData = ctx.createImageData(width, height);
    
    // Copy source to canvas (preserving alpha)
    for (let i = 0; i < sourceBuffer.length; i++) {
      imageData.data[i] = sourceBuffer[i];
    }
    ctx.putImageData(imageData, 0, 0);
    
    // Apply grid overlay
    const gridRgb = hexToRgb(this.config.gridColor);
    const pulseRgb = hexToRgb(this.config.pulseColor);
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.globalCompositeOperation = this.config.blendMode === 'additive' ? 'lighter' : this.config.blendMode;
    
    // Draw grid cells with pulse activation
    this.gridPositions.forEach(pos => {
      const activation = this.#calculatePulseActivation(pos.x, pos.y, t, centerX, centerY);
      const cellOpacity = this.config.gridOpacity + activation * this.config.pulseIntensity;
      
      // Mix grid and pulse colors based on activation
      const r = Math.floor(lerp(gridRgb.r, pulseRgb.r, activation));
      const g = Math.floor(lerp(gridRgb.g, pulseRgb.g, activation));
      const b = Math.floor(lerp(gridRgb.b, pulseRgb.b, activation));
      
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${cellOpacity})`;
      ctx.lineWidth = 1 + activation * 2;
      
      if (this.config.gridMode === 'hexagonal') {
        // Draw hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = Math.PI / 3 * i;
          const x = pos.x + this.config.cellSize * Math.cos(angle);
          const y = pos.y + this.config.cellSize * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      } else if (this.config.gridMode === 'square') {
        ctx.strokeRect(
          pos.x - this.config.cellSize / 2,
          pos.y - this.config.cellSize / 2,
          this.config.cellSize,
          this.config.cellSize
        );
      }
      
      // Add glow for activated cells
      if (activation > 0.5 && this.config.pulseGlow) {
        ctx.shadowColor = `rgba(${pulseRgb.r}, ${pulseRgb.g}, ${pulseRgb.b}, ${activation})`;
        ctx.shadowBlur = 10 * activation;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    });
    
    // Draw targeting reticles
    const reticleRgb = hexToRgb(this.config.reticleColor);
    for (let i = 0; i < this.config.reticleCount; i++) {
      const reticle = this.#getReticlePosition(i, t);
      const size = width * this.config.reticleSize;
      
      ctx.strokeStyle = reticle.isLocked 
        ? `rgba(${reticleRgb.r}, ${reticleRgb.g}, ${reticleRgb.b}, 1)`
        : `rgba(${reticleRgb.r}, ${reticleRgb.g}, ${reticleRgb.b}, 0.6)`;
      ctx.lineWidth = reticle.isLocked ? 3 : 2;
      
      // Draw reticle crosshair
      ctx.beginPath();
      // Horizontal line
      ctx.moveTo(reticle.x - size/2, reticle.y);
      ctx.lineTo(reticle.x - size/4, reticle.y);
      ctx.moveTo(reticle.x + size/4, reticle.y);
      ctx.lineTo(reticle.x + size/2, reticle.y);
      // Vertical line
      ctx.moveTo(reticle.x, reticle.y - size/2);
      ctx.lineTo(reticle.x, reticle.y - size/4);
      ctx.moveTo(reticle.x, reticle.y + size/4);
      ctx.lineTo(reticle.x, reticle.y + size/2);
      ctx.stroke();
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(reticle.x, reticle.y, size/3, 0, Math.PI * 2);
      ctx.stroke();
      
      // Add lock indicator
      if (reticle.isLocked) {
        ctx.fillStyle = `rgba(${reticleRgb.r}, ${reticleRgb.g}, ${reticleRgb.b}, 0.3)`;
        ctx.fill();
        
        // Draw corner brackets
        const bracketSize = size / 6;
        ctx.beginPath();
        // Top-left
        ctx.moveTo(reticle.x - size/2, reticle.y - size/2 + bracketSize);
        ctx.lineTo(reticle.x - size/2, reticle.y - size/2);
        ctx.lineTo(reticle.x - size/2 + bracketSize, reticle.y - size/2);
        // Top-right
        ctx.moveTo(reticle.x + size/2 - bracketSize, reticle.y - size/2);
        ctx.lineTo(reticle.x + size/2, reticle.y - size/2);
        ctx.lineTo(reticle.x + size/2, reticle.y - size/2 + bracketSize);
        // Bottom-right
        ctx.moveTo(reticle.x + size/2, reticle.y + size/2 - bracketSize);
        ctx.lineTo(reticle.x + size/2, reticle.y + size/2);
        ctx.lineTo(reticle.x + size/2 - bracketSize, reticle.y + size/2);
        // Bottom-left
        ctx.moveTo(reticle.x - size/2 + bracketSize, reticle.y + size/2);
        ctx.lineTo(reticle.x - size/2, reticle.y + size/2);
        ctx.lineTo(reticle.x - size/2, reticle.y + size/2 - bracketSize);
        ctx.stroke();
      }
    }
    
    // Apply glitch effect
    const glitchData = ctx.getImageData(0, 0, width, height);
    this.#applyGlitch(glitchData, t);
    ctx.putImageData(glitchData, 0, 0);
    
    // Add data stream overlay
    if (this.config.showDataStream) {
      const dataRgb = hexToRgb(this.config.dataColor);
      ctx.fillStyle = `rgba(${dataRgb.r}, ${dataRgb.g}, ${dataRgb.b}, ${this.config.dataOpacity})`;
      ctx.font = '10px monospace';
      
      const scrollOffset = (t * this.config.dataScrollSpeed * 100) % 100;
      const dataLines = [
        `FRAME: ${frameNumber.toString().padStart(4, '0')}`,
        `SCAN: ${(t * 100).toFixed(1)}%`,
        `GRID: ${this.config.gridMode.toUpperCase()}`,
        `PULSE: ${this.config.pulseMode.toUpperCase()}`,
        `TARGETS: ${this.config.reticleCount}`,
        `STATUS: ACTIVE`,
        `0x${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase()}`,
        `0x${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0').toUpperCase()}`,
      ];
      
      dataLines.forEach((line, i) => {
        const y = 20 + i * 12 - scrollOffset;
        if (y > 0 && y < height) {
          ctx.fillText(line, 10, y);
        }
      });
    }
    
    // Convert canvas to buffer
    const outputBuffer = canvas.toBuffer('image/png');
    
    // Create final layer with opacity
    const finalImage = await sharp(outputBuffer)
      .ensureAlpha(this.config.preserveAlpha ? 1 : 0)
      .toBuffer();
    
    return {
      buffer: finalImage,
      opacity: this.config.layerOpacity,
      name: layer.name || 'tactical-pulse-grid'
    };
  }
}