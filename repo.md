# NFT Effects Plugin Collection

## 📦 Repository Overview

A comprehensive modular NFT visual effects plugin collection for the `my-nft-gen` NFT generation framework. This plugin provides four distinct visual effects: **QuantumField**, **CircuitStream**, **MetatronCube** (primary effects), and **FlowField** (secondary effect), each designed to create unique, animated NFT visuals.

## 🏗️ Architecture

### Core Structure
```
my-nft-zencoder-generated-effects-plugin/
├── plugin.js                # Main plugin registration entry point
├── package.json              # Node.js project configuration
├── docs/                     # Effect-specific documentation
│   ├── quantum-field-effect.md
│   ├── circuit-stream-effect.md
│   ├── metatron-cube-effect.md
│   └── flow-field-effect.md
├── examples/                 # Example configurations and usage
├── test-*.js                 # Individual effect test runners
└── src/
    └── effects/
        ├── primaryEffects/
        │   ├── QuantumField/
        │   │   ├── QuantumFieldEffect.js
        │   │   └── QuantumFieldConfig.js
        │   ├── CircuitStream/
        │   │   ├── CircuitStreamEffect.js
        │   │   └── CircuitStreamConfig.js
        │   └── MetatronCube/
        │       ├── MetatronCubeEffect.js
        │       └── MetatronCubeConfig.js
        └── secondaryEffects/
            └── FlowField/
                ├── FlowFieldEffect.js
                ├── FlowFieldConfig.js
                └── index.js
```

### Design Principles
- **Plugin Architecture**: Modular design allowing easy integration with `my-nft-gen`
- **Effect Abstraction**: All effects extend `LayerEffect` base class from the framework
- **Configuration-Driven**: Separates effect parameters from implementation
- **Framework Integration**: Uses framework-provided factories and utilities
- **Pure Function Rendering**: Effects pre-generate data in constructor for deterministic rendering

## 🎨 Effects Overview

### 1. QuantumField Effect (PRIMARY)
**Category**: Primary Effect  
**Name**: `quantum-field`  
**Description**: Simulates quantum particle interactions with dynamic connections

#### Key Features
- Particle system with configurable properties
- Quantum-inspired behaviors (tunneling, entanglement)
- Dynamic connections between particles based on distance
- Multiple rendering modes (quantum, wave, particle, field)
- Glow and blur effects for ethereal appearance
- Perfect loop animation support

#### Visual Characteristics
- Animated particles with quantum behaviors
- Dynamic connection lines between nearby particles
- Pulsing and glowing effects
- Customizable color schemes via ColorPicker
- Supports various blend modes

---

### 2. CircuitStream Effect (PRIMARY)
**Category**: Primary Effect  
**Name**: `circuit-stream`  
**Display Name**: Circuit Stream  
**Description**: Animated digital circuit board with flowing data streams and pulsing logic gates

#### Key Features
- Procedurally generated circuit board layout
- Flowing data packets along circuit paths
- Pulsing logic gates and connection nodes
- Multiple circuit patterns (grid, organic, radial)
- Animated data streams with customizable speed
- Glow effects for digital aesthetic

#### Visual Characteristics
- Technical, cyberpunk aesthetic
- Animated data flow visualization
- Pulsing electronic components
- Customizable circuit density and complexity
- Support for various color schemes

---

### 3. MetatronCube Effect (PRIMARY)
**Category**: Primary Effect  
**Name**: `metatron-cube`  
**Display Name**: Metatron Cube  
**Author**: Digital Alchemist  
**Description**: Sacred geometry effect featuring Metatron's Cube with inscribed runes, Platonic solids, and overwhelming mystical detail

#### Key Features
- **Metatron's Cube**: 13 spheres with 78 connecting lines
- **Flower of Life**: Optional sacred geometry pattern overlay
- **Platonic Solids**: All five solids with 3D rotation (tetrahedron, cube, octahedron, icosahedron, dodecahedron)
- **Mystical Runes**: Outer ring of ancient symbols
- **Inner Glyphs**: Additional symbolic elements
- **Particle System**: Mystical energy particles
- **Energy Pulses**: Animated energy flows
- **Central Mandala**: Optional detailed center piece

#### Visual Characteristics
- Sacred geometry with mathematical precision
- Multiple layers of mystical symbolism
- 3D rotating Platonic solids
- Animated energy flows and pulses
- Extensive glow and blur effects
- Breathing animations on geometric elements
- Gradient backgrounds with mystical atmosphere

#### Configuration Highlights
- Extensive color customization (8+ color pickers)
- Configurable rotation speeds for all elements
- Adjustable glow, blur, and opacity
- Toggle individual geometric components
- Perfect loop animation support
- Randomized parameters within ranges for variation

---

### 4. FlowField Effect (SECONDARY)
**Category**: Secondary Effect  
**Name**: `flow-field`  
**Description**: Creates dynamic flow field distortions with organic movement

#### Key Features
- Vector field-based distortion
- Multiple flow algorithms (perlin, simplex, curl, vortex)
- Turbulence and distortion effects
- Time-based animation
- Pixel displacement for organic warping
- Works as a post-processing effect on existing layers

#### Visual Characteristics
- Organic, fluid distortions
- Non-destructive layer transformation
- Animated flow patterns
- Customizable intensity and scale
- Multiple distortion modes

## 🔧 Technical Implementation

### Class Hierarchy
```
LayerEffect (my-nft-gen framework)
    ├── QuantumFieldEffect
    │       ├── Uses: QuantumFieldConfig
    │       └── Implements: invoke(), #generate()
    ├── CircuitStreamEffect
    │       ├── Uses: CircuitStreamConfig
    │       └── Implements: invoke(), #generate()
    ├── MetatronCubeEffect
    │       ├── Uses: MetatronCubeConfig
    │       └── Implements: invoke(), #generate()
    └── FlowFieldEffect
            ├── Uses: FlowFieldConfig
            └── Implements: invoke(), #generate()
```

### Effect Lifecycle
1. **Construction**: Effect instantiated with config and settings
2. **Generation**: `#generate()` pre-computes all deterministic data
3. **Invocation**: `invoke(layer, frame, totalFrames)` renders frame
4. **Rendering**: Pure function using pre-generated data
5. **Compositing**: Result blended with layer using blend modes

### Key Design Patterns

#### Pure Function Rendering
All effects follow this pattern:
```javascript
constructor({ config, settings }) {
    super({ config, settings });
    this.#generate(settings);  // Pre-generate all random/deterministic data
}

async invoke(layer, currentFrame, numberOfFrames) {
    // Pure function - uses only this.data and parameters
    // No randomness or side effects during rendering
}
```

#### Configuration Classes
Each effect has a dedicated config class:
```javascript
class EffectConfig {
    constructor({
        // Visual parameters
        // Animation parameters
        // Color pickers
        // Ranges for randomization
    }) {
        // Validation and defaults
    }
}
```

## 🚀 Usage

### As a Plugin
```javascript
// Automatically registered when loaded by my-nft-gen
import { register } from './plugin.js';

// Registration happens via PluginManager
await register(EffectRegistry, PositionRegistry);
```

### Testing Individual Effects
```bash
# Test QuantumField
node test-quantum-field.js

# Test CircuitStream
node test-circuit-stream.js

# Test MetatronCube
node test-metatron-cube.js

# Test FlowField
node test-flowfield.js
```

### Custom Configuration Example
```javascript
import { QuantumFieldEffect, QuantumFieldConfig } from './src/effects/primaryEffects/QuantumField/QuantumFieldEffect.js';
import { ColorPicker } from 'my-nft-gen/src/core/config/ColorPicker.js';

const config = new QuantumFieldConfig({
    particleCount: { lower: 50, upper: 100 },
    connectionDistance: { lower: 100, upper: 150 },
    renderMode: ['quantum', 'wave'],
    particleColor: new ColorPicker({
        selectionType: 'colorBucket',
        colorBucket: ['#00ffff', '#ff00ff', '#ffff00']
    }),
    glowIntensity: { lower: 5, upper: 15 }
});

const effect = new QuantumFieldEffect({ config, settings });
await effect.invoke(layer, frameNumber, totalFrames);
```

## 🔗 Dependencies

### Runtime Dependencies
- **my-nft-gen**: Parent NFT generation framework (local dependency)
  - Base classes: `LayerEffect`, `Settings`
  - Factories: `Canvas2dFactory`, `LayerFactory`
  - Math utilities: `findValue`, `findOneWayValue`, random functions
  - Config types: `ColorPicker`, `Range`, `Position`
  - Registry: `EffectRegistry`, `EffectCategories`
- **canvas**: ^3.2.0 - Canvas API for Node.js
- **sharp**: 0.33.5 - Image processing (used by FlowField)

### Development Dependencies
- **my-nft-gen**: file:../my-nft-gen (local development link)

### Environment
- **Node.js**: ES Modules support required (`"type": "module"`)
- **JavaScript**: ES6+ (classes, async/await, private methods)

## 🛠️ Development

### Setup
```bash
# Install dependencies
npm install

# Run individual effect tests
npm run test-quantum
npm run test-circuit
npm run test-metatron
npm run test-flow
```

### Project Structure Guidelines
- **Primary Effects**: Standalone visual effects that create content
- **Secondary Effects**: Post-processing effects that modify existing layers
- **Config Classes**: Separate configuration from implementation
- **Pure Rendering**: All randomness happens in constructor, not during rendering

### Creating New Effects

#### 1. Create Effect Directory
```bash
mkdir -p src/effects/primaryEffects/NewEffect
```

#### 2. Implement Effect Class
```javascript
// NewEffect.js
import { LayerEffect } from 'my-nft-gen/src/core/layer/LayerEffect.js';

export class NewEffect extends LayerEffect {
    static _name_ = 'new-effect';
    static _displayName_ = 'New Effect';
    static _description_ = 'Description of the effect';
    static _version_ = '1.0.0';
    static _author_ = 'Your Name';
    static _tags_ = ['effect', 'primary', 'custom'];

    constructor({ config, settings }) {
        super({ config, settings });
        this.#generate(settings);
    }

    #generate(settings) {
        // Pre-generate all deterministic data
        this.data = {
            // ... pre-computed values
        };
    }

    async invoke(layer, currentFrame, numberOfFrames) {
        // Pure rendering function
    }
}
```

#### 3. Create Config Class
```javascript
// NewEffectConfig.js
export class NewEffectConfig {
    constructor({
        // parameters with defaults
    }) {
        // Assign and validate
    }
}
```

#### 4. Register in plugin.js
```javascript
import { NewEffect } from './src/effects/primaryEffects/NewEffect/NewEffect.js';
import { NewEffectConfig } from './src/effects/primaryEffects/NewEffect/NewEffectConfig.js';

// In register function:
NewEffect._configClass_ = NewEffectConfig;
EffectRegistry.registerGlobal(NewEffect, EffectCategories.PRIMARY, {
    displayName: NewEffect._displayName_,
    description: NewEffect._description_,
    version: NewEffect._version_,
    author: NewEffect._author_,
    tags: NewEffect._tags_
});
```

## 📝 Code Quality

### SOLID Principles Applied

#### Single Responsibility Principle (SRP)
- ✅ Each effect class handles one visual effect
- ✅ Config classes separate configuration from logic
- ✅ Factories handle object creation
- ✅ Registry handles effect registration

#### Open/Closed Principle (OCP)
- ✅ New effects can be added without modifying existing code
- ✅ Plugin system allows extension without framework modification
- ✅ Effect categories allow flexible organization

#### Liskov Substitution Principle (LSP)
- ✅ All effects extend `LayerEffect` and honor its contract
- ✅ Effects can be used interchangeably through the registry

#### Interface Segregation Principle (ISP)
- ✅ Effects only implement required methods (`invoke`)
- ✅ Config classes contain only relevant parameters

#### Dependency Inversion Principle (DIP)
- ✅ Effects depend on framework abstractions (`LayerEffect`)
- ✅ Dependencies injected via constructor (config, settings)
- ✅ No hardcoded instantiation of framework classes

### Patterns Used
- **Factory Pattern**: Canvas and layer creation via factories
- **Configuration Object Pattern**: Separating config from logic
- **Template Method**: Base class defines structure, subclass implements specifics
- **Registry Pattern**: Central registration of effects
- **Strategy Pattern**: Multiple rendering modes within effects
- **Pure Functions**: Deterministic rendering with pre-generated data

### Code Standards
- ES6+ syntax (classes, arrow functions, destructuring)
- Private methods using `#` syntax
- Async/await for asynchronous operations
- Comprehensive JSDoc comments
- Consistent naming conventions
- No side effects in rendering functions

## 🔍 Potential Improvements

### Performance Optimizations
- Implement WebGL rendering for GPU acceleration
- Add worker threads for parallel particle calculations
- Optimize geometry calculations with lookup tables
- Implement object pooling for particle systems
- Add progressive rendering for complex effects

### Feature Enhancements
- **Effect Composition**: Combine multiple effects
- **Parameter Interpolation**: Smooth transitions between states
- **Preset System**: Pre-configured effect combinations
- **Interactive Preview**: Real-time parameter adjustment
- **Effect Masks**: Selective application of effects
- **Noise Variations**: Add organic randomness to geometric patterns

### Code Structure
- Extract rendering strategies into separate classes
- Implement effect composition system
- Add comprehensive parameter validation
- Create unit tests for core calculations
- Add integration tests for effect pipeline
- Implement effect versioning system
- Add performance profiling tools

### Documentation
- Add interactive examples
- Create video tutorials
- Document performance characteristics
- Add troubleshooting guide
- Create effect combination recipes

## 📊 Effect Comparison

| Feature | QuantumField | CircuitStream | MetatronCube | FlowField |
|---------|-------------|---------------|--------------|-----------|
| **Category** | Primary | Primary | Primary | Secondary |
| **Complexity** | Medium | Medium | High | Medium |
| **Animation** | Particles | Data Flow | Multi-layer | Distortion |
| **Style** | Sci-fi | Cyberpunk | Mystical | Organic |
| **Performance** | Good | Good | Moderate | Good |
| **Customization** | High | High | Very High | Medium |
| **3D Elements** | No | No | Yes | No |

## 📄 License
Private package as specified in `package.json`

## 🤝 Integration Notes

This plugin is designed to work seamlessly with the `my-nft-gen` framework's plugin system. The framework handles:
- Plugin discovery and registration
- Effect lifecycle management
- Canvas/layer management
- Animation frame orchestration
- Color palette management
- Settings propagation

The plugin focuses solely on implementing visual effect logic, leveraging framework-provided utilities for all infrastructure concerns.

### Registration Flow
1. Framework loads `plugin.js`
2. Calls `register(EffectRegistry, PositionRegistry)`
3. Plugin imports effect classes
4. Plugin registers effects with metadata
5. Effects become available in framework's effect system

### Effect Invocation Flow
1. Framework creates effect instance with config
2. Effect pre-generates data in constructor
3. Framework calls `invoke(layer, frame, totalFrames)` per frame
4. Effect renders to layer using pure function
5. Framework composites result with blend modes

## 🎯 Use Cases

### QuantumField
- Sci-fi themed NFTs
- Abstract particle art
- Energy field visualizations
- Quantum computing aesthetics

### CircuitStream
- Cyberpunk collections
- Tech-themed NFTs
- Digital circuit art
- Data visualization aesthetics

### MetatronCube
- Sacred geometry collections
- Mystical/spiritual NFTs
- Mathematical art
- Esoteric symbolism

### FlowField
- Organic distortions
- Fluid dynamics art
- Post-processing enhancement
- Abstract transformations

## 🔮 Future Roadmap

### Short Term
- Add more rendering modes to existing effects
- Implement effect presets
- Add parameter validation
- Create comprehensive test suite

### Medium Term
- Add WebGL rendering support
- Implement effect composition
- Create visual effect editor
- Add performance profiling

### Long Term
- Machine learning-based parameter optimization
- Real-time interactive preview
- Effect marketplace integration
- Community effect contributions