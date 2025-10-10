# Prismatic Shatter Effect

A stunning post-processing effect that fractures images into crystalline shards with physically-inspired light refraction, creating mesmerizing prismatic spectrums and volumetric light rays.

## 🌟 Features

- **Crystalline Tessellation**: Voronoi-based shard generation creates organic crystal patterns
- **Prismatic Refraction**: Physically accurate light physics with configurable refraction index
- **3D Motion**: Individual shard rotation and orbital movement in 3D space
- **Chromatic Aberration**: RGB channel separation for realistic light dispersion
- **Volumetric Lighting**: Dynamic light rays with intersection hotspots
- **Atmospheric Effects**: Fog, bloom, and lens flares for added depth
- **Perfect Loop**: All animations use sine waves for seamless looping
- **Fully Deterministic**: No randomness - reproducible results every time

## 📦 Installation

The effect is part of the NFT Effects Plugin and requires no additional dependencies.

```javascript
import { PrismaticShatterEffect, PrismaticShatterConfig } from './PrismaticShatter/index.js';
```

## 🚀 Quick Start

```javascript
// Create configuration
const config = new PrismaticShatterConfig({
  shardCount: 12,
  refractionIndex: 1.52,
  chromaticDispersion: 0.7,
  primarySpectrumColor: '#ff0000',
  secondarySpectrumColor: '#0000ff'
});

// Initialize effect
const effect = new PrismaticShatterEffect({
  config,
  settings: { width: 512, height: 512 }
});

// Apply to a layer
const result = await effect.invoke(layer, frameNumber, totalFrames);
```

## ⚙️ Configuration

### Shard System
- `shardCount` (5-50): Number of crystal shards
- `shardSizeVariance` (0-1): Size variation between shards
- `shardDepthRange` (50-300): Z-depth range for 3D effect
- `tessellationSeed`: Deterministic pattern seed

### Prismatic Refraction
- `refractionIndex` (1.3-2.4): Material refraction (glass=1.5, diamond=2.4)
- `chromaticDispersion` (0-1): RGB separation strength
- `spectralWidth` (5-50): Rainbow spread in pixels
- `criticalAngle` (30-60): Total internal reflection angle

### Motion & Animation
- `rotationSpeedX/Y/Z` (0-2): Rotation speeds per axis
- `orbitRadius` (0-150): Orbital motion radius
- `floatAmplitude` (0-30): Vertical floating range
- `phaseOffset` (0-1): Phase shift between shards

### Light Rays
- `lightAngle` (0-360): Primary light source direction
- `lightIntensity` (0-1): Ray brightness
- `rayCount` (1-5): Rays per shard edge
- `rayLength` (50-300): Maximum ray length
- `rayFalloff` (0.3-1): Ray opacity decay

### Colors
- `primarySpectrumColor`: Starting spectrum color (hex)
- `secondarySpectrumColor`: Ending spectrum color (hex)
- `glowColor`: Edge glow color (hex)
- `fogColor`: Atmospheric fog tint (hex)
- `flareColor`: Lens flare color (hex)

### Atmospheric Effects
- `bloomIntensity` (0-1): Edge bloom strength
- `fogDensity` (0-1): Atmospheric fog density
- `depthBlur` (0-1): Depth of field blur
- `flareThreshold` (0.5-1): Brightness threshold for flares
- `ambientGlow` (0-1): Overall glow level

### Blend Modes
- `shardBlendMode`: 'normal', 'screen', 'overlay', 'add'
- `rayBlendMode`: 'add', 'screen', 'linear-dodge'

## 🎨 Preset Configurations

### Diamond
```javascript
new PrismaticShatterConfig({
  shardCount: 8,
  refractionIndex: 2.4,
  chromaticDispersion: 0.9,
  spectralWidth: 30,
  bloomIntensity: 0.8
})
```

### Glass
```javascript
new PrismaticShatterConfig({
  shardCount: 15,
  refractionIndex: 1.5,
  chromaticDispersion: 0.3,
  spectralWidth: 10,
  fogDensity: 0.2
})
```

### Psychedelic
```javascript
new PrismaticShatterConfig({
  shardCount: 20,
  chromaticDispersion: 1.0,
  spectralWidth: 40,
  primarySpectrumColor: '#ff00ff',
  secondarySpectrumColor: '#00ffff',
  rotationSpeedX: 1.5,
  rotationSpeedY: 1.2
})
```

## 🧪 Testing

Run the test suite:
```bash
node src/effects/finalImageEffects/PrismaticShatter/test.js
```

Run the demo:
```bash
node src/effects/finalImageEffects/PrismaticShatter/demo.js
```

## 📊 Performance

- Optimized for 512x512 images
- Pre-calculates shard positions in constructor
- Uses canvas 2D API for broad compatibility
- Scalable quality settings for performance tuning

## 🎯 Use Cases

- **NFT Enhancement**: Add dramatic crystalline effects to NFT artwork
- **Logo Animation**: Transform logos into shattered prisms
- **Abstract Art**: Create purely generative prismatic patterns
- **Transition Effects**: Use for stunning scene transitions
- **Music Visualization**: Sync parameters to audio for VJ effects

## 🔧 Advanced Usage

### Custom Shard Patterns
```javascript
const config = new PrismaticShatterConfig({
  tessellationSeed: Date.now(), // Different pattern each time
  shardSizeVariance: 0.8,       // More variety in shard sizes
  shardDepthRange: 200          // Greater depth effect
});
```

### Synchronized Animation
```javascript
// Sync multiple effects
const phase1 = new PrismaticShatterEffect({ config: config1 });
const phase2 = new PrismaticShatterEffect({ config: config2 });

// Render with offset timing
const result1 = await phase1.invoke(layer, frame, total);
const result2 = await phase2.invoke(layer, frame + 15, total);
```

### Layer Compositing
```javascript
// Apply to specific opacity
const config = new PrismaticShatterConfig({
  effectIntensity: 0.5,  // 50% effect strength
  layerOpacity: 0.8      // 80% final opacity
});
```

## 📈 Future Enhancements

- [ ] GPU acceleration via WebGL
- [ ] Audio reactivity
- [ ] Custom shard shapes
- [ ] Multi-layer refraction
- [ ] Caustic light patterns
- [ ] Real-time parameter animation

## 📝 License

Part of the NFT Effects Plugin project.

## 🤝 Contributing

Contributions welcome! The effect follows SOLID principles:
- Single Responsibility: Separate classes for config, rendering, and utilities
- Open/Closed: Extensible through configuration
- Dependency Inversion: Extends base LayerEffect interface

---

*Transform your images into crystalline masterworks with the Prismatic Shatter effect!* ✨