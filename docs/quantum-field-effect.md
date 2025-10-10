# QuantumField Effect - Technical Documentation

## Overview
QuantumField is a primary visual effect that simulates quantum particle interactions with dynamic connections, entanglement behaviors, and wave-particle duality. The effect creates a mesmerizing visualization of quantum mechanics principles with perfect mathematical loops for seamless animation.

## Architecture

### Core Principles (SOLID)
- **Single Responsibility**: Separate concerns for particle generation, connection finding, and rendering
- **Open/Closed**: Extensible through render modes and animation algorithms without modifying core logic
- **Dependency Inversion**: Effect depends on abstractions (LayerEffect, findValue) not concrete implementations
- **Pure Functions**: Rendering based on deterministically generated particle data with frame-aware calculations

### Data Generation Pattern
```javascript
constructor() {
    super(...);
    this.#generate(settings); // Generate deterministic seeds once
}

#generate(settings) {
    this.data = {
        // Pre-selected algorithms
        interpolationAlgorithm: getRandomFromArray(this.config.interpolationAlgorithm),
        // Particle seeds for deterministic generation
        particleSeeds: this.#generateParticleSeeds(),
        // Color values from ColorPicker
        particleColor: this.config.particleColor.getColor(settings),
        // ... more immutable configuration
    };
}
```

### Perfect Loop Implementation
The effect supports two animation modes:

#### Perfect Loop Mode (`perfectLoop: true`)
All particle properties are calculated purely from `currentFrame` using `findValue`:
```javascript
const floatPhaseX = this.#findValueWithAlgorithm(
    0, Math.PI * 2, 
    numberOfFrames, numberOfFrames, currentFrame + i * 19, 
    this.data.interpolationAlgorithm
);
```
This ensures particles return to exact starting positions at frame `numberOfFrames`.

#### Natural Movement Mode (`perfectLoop: false`)
Uses continuous time progression for more organic, non-repeating behavior:
```javascript
const timeScale = currentFrame * 0.02;
const floatPhaseX = timeScale + i * 0.7;
```

## Configuration Structure (Flat Design)

### Particle Parameters
- `particleCount` (20): Number of quantum particles in the field
- `particleSize` ({lower: 3, upper: 8}): Size range for particles in pixels
- `particleSpeed` ({lower: 2, upper: 8}): Movement speed multiplier range
- `particleOpacity` ({lower: 0.6, upper: 1.0}): Opacity range for particles

### Connection Parameters
- `connectionDistance` ({lower: 100, upper: 200}): Distance threshold for particle connections
- `connectionOpacity` ({lower: 0.2, upper: 0.6}): Opacity range for connection lines
- `entanglementProbability` (0.3): Probability of quantum entanglement between particles

### Quantum Behavior Parameters
- `quantumFluctuation` ({lower: 0.1, upper: 0.5}): Intensity of quantum fluctuations
- `quantumTunneling` (true): Enable quantum tunneling effect
- `tunnelingProbability` (0.1): Probability of tunneling events (natural mode only)

### Movement Parameters
- `orbitRadius` ({lower: 30, upper: 100}): Orbital motion radius range
- `driftIntensity` ({lower: 0.4, upper: 0.8}): Drift motion intensity range
- `brownianIntensity` ({lower: 0.1, upper: 0.2}): Brownian motion intensity (natural mode)
- `fieldInteractionStrength` ({lower: 0.05, upper: 0.15}): Particle field interaction strength
- `velocityEvolutionRate` ({lower: 0.005, upper: 0.02}): Rate of velocity evolution

### Smooth Movement Parameters
- `velocitySmoothing` (0.1): How quickly particles adjust to new velocities (0-1)
- `tunnelTransitionFrames` (20): Frames for smooth tunneling transition
- `movementDamping` (0.95): Damping factor for smoother movement

### Corner Bundling Parameters
- `cornerAttraction` ({lower: 0.3, upper: 0.8}): Strength of attraction to corners
- `cornerRadius` ({lower: 0.15, upper: 0.35}): Radius around corners where particles cluster (fraction of canvas)
- `cornerTransitionSpeed` ({lower: 0.02, upper: 0.08}): Speed of transition towards corners

### Animation Parameters
- `pulseFrequency` ({lower: 0.5, upper: 2}): Frequency of particle pulsing
- `pulseAmplitude` ({lower: 0.2, upper: 0.5}): Amplitude of pulse effect
- `perfectLoop` (true): Enable perfect loop animation

### Color Configuration
All colors use ColorPicker for dynamic selection:
- `particleColor`: Main particle color
- `connectionColor`: Connection line color
- `coreColor`: Core/entangled particle color

### Visual Effects Parameters
- `glowIntensity` ({lower: 5, upper: 15}): Glow effect strength
- `blur` ({lower: 0, upper: 3}): Blur filter amount
- `layerOpacity` (1.0): Overall layer opacity

### Animation Algorithms
Support for multiple FindValue algorithms:
- `interpolationAlgorithm`: General movement interpolation ('linear', 'smoothstep', 'smootherstep', 'sine', 'cubic')
- `fluctuationAlgorithm`: Quantum fluctuation patterns
- `pulseAlgorithm`: Particle pulsing patterns
- `curveAlgorithm`: Connection curve interpolation

## Render Modes

### 1. Quantum Mode
Full quantum visualization with curved connections and wave effects.
- Smooth bezier curves for connections
- Wave rings for particles in wave state
- Entanglement visualization with special colors
- Quantum tunneling effects

### 2. Wave Mode
Emphasizes wave-particle duality.
- All particles display wave rings
- Oscillating patterns
- Interference visualization
- Smooth curved connections

### 3. Particle Mode
Classical particle visualization.
- Simple straight-line connections
- Solid particle rendering
- No wave effects
- Clean, minimal aesthetic

### 4. Field Mode
Field-based visualization showing force interactions.
- Curved connection paths
- Field strength visualization
- Gradient effects
- Energy flow representation

## Component Details

### Particle System
Each particle has the following properties:
- **Position**: (x, y) coordinates with multiple motion components
- **Velocity**: (vx, vy) with smooth evolution
- **Size**: Animated size with variation
- **Opacity**: Dynamic opacity with pulsing
- **Quantum State**: 'wave', 'particle', or 'superposition'
- **Entanglement**: Link to another particle (if entangled)
- **Orbital Motion**: Circular motion around base position
- **Drift**: Slow directional movement
- **Quantum Fluctuation**: Random quantum variations

### Motion Components
Particles have multiple layered motion systems:

1. **Base Position**: Starting position from seeds
2. **Floating Motion**: Sinusoidal floating animation
3. **Orbital Motion**: Circular orbit around base position
4. **Drift Motion**: Slow directional drift
5. **Quantum Fluctuation**: Random quantum variations
6. **Brownian Motion**: Random walk (natural mode only)

### Connection System
- Dynamic distance-based connections
- Opacity based on distance
- Special rendering for entangled pairs
- Smooth curved paths in quantum/field modes
- Straight lines in particle mode

### Quantum Behaviors

#### Quantum Tunneling
Particles can "tunnel" to random locations:
- Only active in natural movement mode
- Probability-based occurrence
- Cooldown period after tunneling
- Visual effect during tunnel

#### Quantum Entanglement
Particles can be entangled with partners:
- Special connection rendering
- Thicker connection lines
- Different color (coreColor)
- Synchronized behaviors

#### Wave-Particle Duality
Particles transition between states:
- Wave state: Displays concentric rings
- Particle state: Solid rendering
- Superposition: Mixed state (natural mode)

## Animation Techniques

### Perfect Loop Mode
- All properties calculated from `currentFrame`
- Uses `findValue` for deterministic interpolation
- Guarantees exact loop at frame `numberOfFrames`
- Multiple phase offsets for variety
- No state accumulation between frames

### Natural Movement Mode
- Continuous time progression
- Non-repeating patterns
- More organic behavior
- State accumulation allowed
- Random elements (tunneling, brownian motion)

### Smooth Interpolation
Multiple interpolation algorithms available:
- **Linear**: Constant rate of change
- **Smoothstep**: Smooth acceleration/deceleration
- **Smootherstep**: Even smoother transitions
- **Sine**: Sinusoidal easing
- **Cubic**: Cubic easing curves

### Performance Optimizations
- Deterministic seed-based generation
- Efficient distance calculations
- Adaptive curve resolution
- Single render pass
- Efficient color manipulation

## Serialization Support

### Data Structure
```javascript
{
    effectName: 'quantum-field',
    effectData: {
        width: 800,
        height: 600,
        particleSeeds: {...},
        interpolationAlgorithm: 'smoothstep',
        renderMode: 'quantum',
        // All pre-generated data
    },
    config: {
        // Flat configuration values
    }
}
```

### Rehydration Process
1. Parse serialized JSON
2. Create new QuantumFieldConfig from stored config
3. Create new QuantumFieldEffect with config
4. Effect automatically regenerates consistent particle seeds
5. Ready for rendering with identical behavior

## Usage Examples

### Basic Usage
```javascript
import { QuantumFieldEffect } from './QuantumFieldEffect.js';
import { QuantumFieldConfig } from './QuantumFieldConfig.js';

const config = new QuantumFieldConfig({
    particleCount: 30,
    renderMode: ['quantum'],
    perfectLoop: true,
});

const effect = new QuantumFieldEffect({
    config,
    settings,
});

await effect.invoke(layer, currentFrame, totalFrames);
```

### Custom Quantum Behavior
```javascript
const config = new QuantumFieldConfig({
    particleCount: 50,
    quantumTunneling: true,
    tunnelingProbability: 0.2,
    entanglementProbability: 0.5,
    renderMode: ['quantum'],
    perfectLoop: false, // Natural movement
});
```

### High-Energy Field
```javascript
const config = new QuantumFieldConfig({
    particleSpeed: {lower: 5, upper: 12},
    orbitRadius: {lower: 50, upper: 150},
    driftIntensity: {lower: 0.6, upper: 1.0},
    glowIntensity: {lower: 15, upper: 30},
    pulseAmplitude: {lower: 0.4, upper: 0.8},
});
```

### Custom Color Scheme
```javascript
const config = new QuantumFieldConfig({
    particleColor: new ColorPicker(ColorPicker.SelectionType.static, '#00FFFF'),
    connectionColor: new ColorPicker(ColorPicker.SelectionType.static, '#FF00FF'),
    coreColor: new ColorPicker(ColorPicker.SelectionType.static, '#FFFF00'),
    renderMode: ['wave'],
});
```

## Future Enhancements

### Planned Features
1. **Quantum Superposition**: Visual representation of superposition states
2. **Wave Function Collapse**: Animated collapse events
3. **Quantum Interference**: Interference patterns between particles
4. **Field Gradients**: Visual field strength gradients
5. **Particle Trails**: Motion trails for particles
6. **Energy Levels**: Discrete energy state visualization

### Optimization Opportunities
1. WebGL rendering for better performance
2. Spatial hashing for connection finding
3. LOD system for particle count
4. Instanced rendering for particles
5. Worker thread for particle calculations

## Technical Notes

### Browser Compatibility
- ES6+ modules required
- Canvas 2D context
- No external dependencies beyond my-nft-gen

### Performance Characteristics
- O(n²) connection finding complexity
- ~60 FPS on modern hardware with default settings (20 particles)
- Memory usage proportional to particle count
- Recommended max: 100 particles for smooth animation

### Best Practices
1. Keep particle count reasonable (<50 for optimal performance)
2. Use perfect loop mode for NFT generation
3. Test different interpolation algorithms for desired feel
4. Balance visual complexity with performance
5. Verify serialization for production use
6. Use natural mode for more organic, unique variations

### Algorithm Selection
- **Smoothstep**: Best for general smooth animations
- **Smootherstep**: Ultra-smooth, fluid motion
- **Sine**: Natural oscillating patterns
- **Cubic**: Dynamic, energetic movement
- **Linear**: Mechanical, constant motion

## Conclusion
QuantumField provides a sophisticated, scientifically-inspired effect that visualizes quantum mechanics principles. Its dual animation modes (perfect loop and natural movement), multiple render modes, and extensive configuration options make it suitable for various NFT generation scenarios requiring a futuristic, scientific aesthetic. The effect's pure functional design ensures consistent, reproducible results while maintaining visual complexity and interest.