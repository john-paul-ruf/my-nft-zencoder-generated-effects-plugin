# NFT Effects Plugin - SpiralWave

## 📦 Repository Overview

A modular NFT visual effects plugin that implements the **SpiralWave** effect for the `my-nft-gen` NFT generation framework. This plugin creates mesmerizing animated spiral patterns with wave-like distortions, perfect for generating unique NFT visuals.

## 🏗️ Architecture

### Core Structure
```
my-nft-zencoder-generated-effects-plugin/
├── plugin.js                # Main plugin registration entry point
├── index.js                  # Demo/test runner for standalone execution
├── package.json              # Node.js project configuration
└── src/
    └── effects/
        └── primaryEffects/
            └── SpiralWave/
                ├── SpiralWaveEffect.js   # Main effect implementation
                └── SpiralWaveConfig.js   # Configuration class
```

### Design Principles
- **Plugin Architecture**: Modular design allowing easy integration with `my-nft-gen`
- **Effect Abstraction**: Extends `LayerEffect` base class from the framework
- **Configuration-Driven**: Separates effect parameters from implementation
- **Framework Integration**: Uses framework-provided factories and utilities

## 🎨 SpiralWave Effect

### Description
Creates animated spiral patterns with wave distortions featuring:
- Multiple configurable spiral arms
- Wave-based distortion effects
- Animated rotation and pulsing
- Multiple rendering modes (gradient, solid, pulse)
- Customizable colors and visual parameters

### Key Features
- **Dynamic Spirals**: Configurable number of arms with independent rotation
- **Wave Distortion**: Sinusoidal wave effects applied to spiral paths
- **Animation Support**: Frame-based animation with rotation and pulse effects
- **Visual Effects**: Blur, glow, and opacity controls for artistic rendering
- **Rendering Modes**: Multiple strategies for visual variety

### Configuration Parameters

#### Core Spiral
- `spiralCount`: Number of spiral iterations
- `armCount`: Number of spiral arms (default: 5)
- `spiralTightness`: Controls how tightly wound the spiral is (Range: 0.1-0.3)

#### Wave Distortion
- `waveAmplitude`: Magnitude of wave distortion (Range: 10-50px)
- `waveFrequency`: Number of waves per spiral (Range: 2-8Hz)
- `waveSpeed`: Animation speed of waves (Range: 0.5-2.0)

#### Visual
- `lineWidth`: Thickness of spiral lines (Range: 2-8px)
- `opacity`: Overall effect opacity (Range: 0-1)
- `primaryColor`: Main color for rendering
- `secondaryColor`: Alternate color for gradient/pulse modes

#### Animation
- `rotationSpeed`: Speed of spiral rotation (Range: 0.5-3.0)
- `pulseIntensity`: Strength of pulsing effect (Range: 0.1-0.5)

#### Effects
- `blur`: Blur radius for softening (Range: 0-3)
- `glow`: Glow intensity for luminous effect (Range: 0-5)
- `layerOpacity`: Final layer compositing opacity

## 🔧 Technical Implementation

### Class Hierarchy
```
LayerEffect (my-nft-gen framework)
    └── SpiralWaveEffect
            ├── Uses: SpiralWaveConfig
            ├── Implements: invoke(), getInfo()
            └── Private methods: #draw(), #drawSpiralArm(), #drawSpiralPath()
```

### Key Methods

#### `invoke(layer, currentFrame, numberOfFrames)`
Main entry point called by the framework for each animation frame.

#### `#drawSpiralArm(armIndex, context)`
Draws a single spiral arm with wave distortion calculations.

#### `#drawSpiralPath(points, armIndex, context)`
Renders the calculated spiral points based on the selected render mode.

#### `#generate(settings)`
Initializes effect data from configuration, applying randomization within specified ranges.

### Rendering Pipeline
1. **Initialization**: Generate effect parameters from config
2. **Spiral Generation**: Calculate spiral points with wave distortion
3. **Path Rendering**: Draw spiral arms based on render mode
4. **Post-Processing**: Apply blur/glow effects
5. **Compositing**: Blend with existing layer

## 🚀 Usage

### As a Plugin
```javascript
// Automatically registered when loaded by my-nft-gen
import { register } from './plugin.js';

// Registration happens via PluginManager
await register(EffectRegistry, PositionRegistry);
```

### Standalone Demo
```bash
npm run demo
```
Generates 60 frames of animated spiral effect in `output/` directory.

### Custom Configuration
```javascript
import { SpiralWaveEffect, SpiralWaveConfig } from './src/index.js';

const config = new SpiralWaveConfig({
    armCount: 8,
    waveAmplitude: { lower: 30, upper: 60 },
    renderMode: ['gradient', 'pulse'],
    primaryColor: new ColorPicker({
        selectionType: 'colorBucket'
    })
});

const effect = new SpiralWaveEffect({ config });
```

## 🔗 Dependencies

### Runtime
- `my-nft-gen`: Parent NFT generation framework (local dependency)
  - Provides base classes: `LayerEffect`, `Settings`
  - Utilities: `Canvas2dFactory`, `LayerFactory`
  - Math helpers: `findValue`, `findOneWayValue`, random functions
  - Config types: `ColorPicker`, `Range`, `Position`

### Development
- Node.js with ESM support (`"type": "module"`)
- Canvas API compatibility (via framework)

## 🛠️ Development

### Setup
```bash
# Install dependencies
npm install

# Run demo
npm run demo
```

### Testing
The demo script (`index.js`) serves as both a test harness and example implementation.

### Creating New Effects
1. Create a new directory under `src/effects/primaryEffects/`
2. Implement effect class extending `LayerEffect`
3. Create corresponding config class
4. Update `plugin.js` to register the new effect

## 📝 Code Quality

### SOLID Principles Applied
- **Single Responsibility**: Each class has one clear purpose
- **Open/Closed**: Effect system extensible via new effects without modifying core
- **Dependency Inversion**: Depends on framework abstractions, not concrete implementations

### Patterns Used
- **Factory Pattern**: Canvas and layer creation via factories
- **Configuration Object Pattern**: Separating config from logic
- **Template Method**: Base class defines structure, subclass implements specifics

## 🔍 Potential Improvements

### Performance Optimizations
- Implement point caching for static spiral calculations
- Add WebGL rendering option for GPU acceleration
- Optimize wave calculations with lookup tables

### Feature Enhancements
- Add more render modes (radial gradient, rainbow)
- Implement spiral morphing between different configurations
- Add turbulence/noise effects for organic variations
- Support for multiple center points

### Code Structure
- Extract rendering strategies into separate classes
- Implement effect composition system
- Add parameter validation and error boundaries
- Create unit tests for core calculations

## 📄 License
Private package as specified in `package.json`

## 🤝 Integration Notes

This plugin is designed to work seamlessly with the `my-nft-gen` framework's plugin system. The framework handles:
- Plugin discovery and registration
- Effect lifecycle management
- Canvas/layer management
- Animation frame orchestration

The plugin focuses solely on implementing the visual effect logic, leveraging framework-provided utilities for all infrastructure concerns.