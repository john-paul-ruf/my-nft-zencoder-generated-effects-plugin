# NFT Zencoder Generated Effects Plugin

A comprehensive JavaScript plugin library providing advanced visual effects for NFT generation. This plugin seamlessly integrates with the `my-nft-gen` framework to deliver stunning, highly-configurable visual effects for generative art and NFT creation.

## Features

### 🎨 **Primary Effects**
- **Quantum Field** - Simulates quantum particle interactions with dynamic connections
- **Circuit Stream** - Animated digital circuit board with flowing data streams
- **Metatron Cube** - Sacred geometry effect with inscribed runes and Platonic solids
- **Cymatics Resonance** - Wave interference patterns and vibrational effects
- **Aurora Kaleido** - Aurora borealis-inspired kaleidoscopic patterns

### 🌊 **Secondary Effects**
- **Flow Field** - Particle systems following dynamic flow fields
- **Liquid Chromatic** - Flowing liquid color distortions
- **Holographic Prism** - Iridescent holographic refractions
- **Chrono Lenticular Foil** - Time-based lenticular effects
- **Chromatic Aberration** - Color separation and light dispersion

### ✨ **Keyframe Effects**
- **Aurora Cascade** - Flowing ribbons of light with particle systems
- **Tactical Pulse Grid** - Dynamic grid-based tactical effects
- **Spectral Overwatch** - Spectral color transformations

### 🔮 **Final Image Effects**
- **Orbit Bloom** - Orbital light bloom effects
- **Void Echo** - Void-inspired echo and distortion effects
- **Flux Weave** - Flowing energy patterns
- **Prismatic Shatter** - Crystal-like shattering effects
- **HoloFoil** - Holographic foil texture effects

## Installation

```bash
npm install my-nft-zencoder-generated-effects-plugins my-nft-gen
```

## Quick Start

```javascript
import { register } from 'my-nft-zencoder-generated-effects-plugins';

// Register effects with your NFT framework
await register(EffectRegistry, PositionRegistry);

// Create an effect instance
import { QuantumFieldEffect, QuantumFieldConfig } from './src/effects/primaryEffects/QuantumField/';

const config = new QuantumFieldConfig({
  particleDensity: 100,
  particleSize: [2, 6],
  renderMode: 'quantum'
});

const effect = new QuantumFieldEffect({ config });

// Apply to a canvas layer
await effect.invoke(layer, frameNumber, totalFrames);
```

## Usage

Each effect is highly configurable through its corresponding configuration class. Effects can be:

- **Applied during layer rendering** - Integrated with the frame animation pipeline
- **Used as keyframe effects** - Applied at specific frame ranges
- **Used as final effects** - Applied to the complete rendered image

### Example: Aurora Cascade

```javascript
import { AuroraCascadeEffect, AuroraCascadeConfig } from './src/effects/keyframeEffects/AuroraCascade/';

const config = new AuroraCascadeConfig({
  ribbonCount: 5,
  flowDirection: 'down',
  colorMode: 'natural',
  particleDensity: 50,
  glowIntensity: 1.5
});

const effect = new AuroraCascadeEffect({ config });
```

## Effect Categories

Effects are organized by category:

- **PRIMARY** - Full-layer effects applied during rendering
- **SECONDARY** - Overlay or blend effects
- **KEYFRAME** - Time-based effects triggered at specific frames
- **FINAL_IMAGE** - Post-processing effects applied to final renders

## Presets

Each effect includes built-in presets for common configurations:

```javascript
const effect = new QuantumFieldEffect({ config: QuantumFieldEffect.presets['default'] });
```

## Documentation

For detailed effect documentation, configuration parameters, and presets, see:
- [Primary Effects](./docs/primary-effects/)
- [Secondary Effects](./docs/secondary-effects/)
- [Keyframe Effects](./docs/keyframe-effects/)
- [Final Image Effects](./docs/final-image/)
- [Presets Quick Reference](./docs/PRESET_QUICK_REFERENCE.md)

## Requirements

- **Node.js** >= 14.0.0
- **my-nft-gen** >= 1.0.0 (required peer dependency)
- **canvas** >= 3.2.0
- **sharp** 0.33.5

## Development

```bash
# Install dependencies
npm install

# Run demo
npm run demo

# Run tests
npm run test:primary
```

## API Reference

All effects extend `LayerEffect` from `my-nft-gen` and implement:

- `invoke(layer, frameNumber, totalFrames)` - Main rendering method
- Configuration class with `toJSON()` and `static fromJSON()` methods
- Serializable configuration objects

## Performance Considerations

- Use `quality: 'low'` for faster rendering, `quality: 'high'` for best results
- Reduce `particleDensity` for lower-end systems
- Limit `blurRadius` and `glowIntensity` for performance-critical applications

## Contributing

Contributions are welcome! Please ensure:
- Code follows the existing style conventions
- New effects include configuration classes and presets
- Documentation is updated for new effects

## License

MIT © 2024 John Paul Ruf

See [LICENSE](./LICENSE) file for details.

## Support

For issues, feature requests, or questions:
- GitHub Issues: [Project Issues](https://github.com/john-paul-ruf/my-nft-zencoder-generated-effects-plugin/issues)
- Documentation: [./docs](./docs)

---

**Built with precision for NFT generation.** ✨