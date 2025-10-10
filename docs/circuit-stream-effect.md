# CircuitStream Effect - Technical Documentation

## Overview
CircuitStream is a primary visual effect that simulates an animated digital circuit board with flowing data streams, pulsing logic gates, and dynamic electrical pathways. The effect creates a living, breathing representation of digital circuits with perfect mathematical loops for seamless animation.

## Architecture

### Core Principles (SOLID)
- **Single Responsibility**: Each component (config, effect, rendering) has one clear purpose
- **Open/Closed**: Extensible through render modes without modifying core logic
- **Dependency Inversion**: Effect depends on abstractions (LayerEffect, findValue) not concrete implementations
- **Pure Functions**: All rendering is based on pre-generated immutable data

### Data Generation Pattern
```javascript
constructor() {
    super(...);
    this.#generate(settings); // Generate all data once
}

#generate(settings) {
    this.data = {
        // All pre-calculated values
        grid: this.#generateGrid(),
        traces: this.#generateTraces(),
        nodes: this.#generateNodes(),
        packets: this.#generateDataPackets(),
        // ... more immutable data
    };
}
```

### Perfect Loop Implementation
All animations use `findValue` to ensure mathematical perfection:
```javascript
const progress = findValue(
    0,                    // min
    1,                    // max
    numberOfFrames,       // period
    numberOfFrames,       // totalFrames
    currentFrame + offset,// current position
    algorithm            // interpolation type
);
```

## Configuration Structure (Flat Design)

### Grid Parameters
- `gridColumns` (16): Number of horizontal divisions
- `gridRows` (12): Number of vertical divisions  
- `traceWidth` (3): Width of circuit traces in pixels
- `traceDensity` (0.3): Probability of trace at each grid intersection

### Node/Logic Gate Parameters  
- `nodeCount` (12): Number of logic gates/junctions
- `nodeRadiusMin/Max` (4-8): Size range for nodes
- `nodePulseIntensityMin/Max` (0.3-1.0): Pulse brightness range

### Data Packet Parameters
- `packetCount` (20): Number of data packets flowing through traces
- `packetSizeMin/Max` (2-4): Size range for data packets
- `packetSpeedMin/Max` (0.5-2.0): Movement speed multiplier
- `packetGlowRadiusMin/Max` (8-16): Glow effect radius

### Signal Wave Parameters
- `signalWaveCount` (5): Number of propagating signal waves
- `signalWaveSpeedMin/Max` (0.3-1.5): Wave expansion speed
- `signalWaveAmplitudeMin/Max` (0.2-0.8): Wave intensity
- `signalDecayRateMin/Max` (0.05-0.15): Fade-out rate

### Visual Style Parameters
- `glowIntensityMin/Max` (10-30): Glow effect strength
- `blurAmountMin/Max` (0-2): Blur filter amount
- `traceOpacityMin/Max` (0.3-0.7): Base trace visibility
- `activeTraceOpacity` (1.0): Opacity for active/powered traces

### Color Configuration
All colors use ColorPicker for dynamic selection:
- `traceColor`: Base circuit trace color
- `activeTraceColor`: Powered/active trace color
- `dataPacketColor`: Data packet visualization
- `nodeColor`: Logic gate base color
- `nodeCoreColor`: Logic gate core/active color
- `signalColor`: Signal wave color
- `backgroundGridColor`: Background grid overlay

### Animation Algorithms
Support for multiple FindValue algorithms:
- `interpolationAlgorithm`: General movement interpolation
- `pulseAlgorithm`: Node pulsing patterns
- `waveAlgorithm`: Signal wave propagation
- `flowAlgorithm`: Data packet flow along traces

## Render Modes

### 1. Digital Mode
Classic green-on-black terminal aesthetic reminiscent of old computer displays.
- Green traces on black background
- Yellow data packets
- ASCII-style data bits (0/1)
- Minimal glow effects

### 2. Matrix Mode  
Inspired by "The Matrix" digital rain.
- Green traces with white highlights
- Falling data effect overlay
- Strong contrast
- Binary data visualization

### 3. Neon Mode
Cyberpunk-inspired glowing circuits.
- Cyan and magenta color scheme
- Heavy glow and bloom effects
- Screen blend mode for vibrant colors
- Pulsing energy effects

### 4. Blueprint Mode
Technical schematic appearance.
- Blue and white color palette
- Grid overlay prominent
- Technical drawing aesthetic
- Gold accents for data

### 5. Hologram Mode
Futuristic holographic projection.
- Cyan and teal colors
- Semi-transparent effects
- Wavering/flickering elements
- Depth illusion through opacity

## Component Details

### Circuit Grid System
- Orthogonal trace routing (90-degree angles)
- Grid-based layout for authentic PCB look
- Configurable density for complexity control
- Support for diagonal traces (optional)

### Trace System
- Pathfinding between grid points
- L-shaped routing for orthogonal mode
- Direct routing for diagonal mode
- Active/inactive states with different visuals
- Pulse animation along active traces

### Node Types
1. **Junction**: Simple connection point
2. **AND Gate**: D-shaped logic gate
3. **OR Gate**: Shield-shaped logic gate  
4. **XOR Gate**: OR gate with extra curve
5. **Capacitor**: Parallel lines with charge visualization
6. **Processor**: Grid pattern representing CPU

### Data Packet System
- Follows assigned trace paths
- Bidirectional movement
- Optional binary digit display (0/1)
- Glow effect with configurable radius
- Speed variation for visual interest

### Signal Wave System
- Expanding circular waves
- Originates from random points
- Decay over distance
- Interference patterns when waves meet
- Dashed line rendering for distinction

## Animation Techniques

### Perfect Looping
- All animations complete exactly one cycle over `numberOfFrames`
- Phase offsets ensure variety while maintaining perfect loops
- No discontinuities at loop points
- Smooth interpolation using selected algorithms

### Performance Optimizations
- Pre-calculated paths and positions
- Immutable data structure
- Single render pass
- Efficient color blending
- Conditional rendering based on visibility

## Serialization Support

### Data Structure
```javascript
{
    effectName: 'circuit-stream',
    effectData: {
        width: 800,
        height: 600,
        grid: {...},
        traces: [...],
        nodes: [...],
        packets: [...],
        // All pre-generated data
    },
    config: {
        // Flat configuration values
    }
}
```

### Rehydration Process
1. Parse serialized JSON
2. Create new CircuitStreamConfig from stored config
3. Create new CircuitStreamEffect with config
4. Effect automatically regenerates consistent data
5. Ready for rendering without loss of state

## Usage Examples

### Basic Usage
```javascript
import { CircuitStreamEffect } from './CircuitStreamEffect.js';
import { CircuitStreamConfig } from './CircuitStreamConfig.js';

const config = new CircuitStreamConfig({
    gridColumns: 20,
    gridRows: 15,
    renderMode: ['neon'],
    perfectLoop: true,
});

const effect = new CircuitStreamEffect({
    config,
    settings,
});

await effect.invoke(layer, currentFrame, totalFrames);
```

### Custom Color Scheme
```javascript
const config = new CircuitStreamConfig({
    traceColor: { type: 'static', value: '#FF6B6B' },
    activeTraceColor: { type: 'static', value: '#4ECDC4' },
    dataPacketColor: { type: 'static', value: '#FFD93D' },
    nodeColor: { type: 'static', value: '#6BCF7F' },
    renderMode: ['digital'],
});
```

### High-Density Circuit
```javascript
const config = new CircuitStreamConfig({
    gridColumns: 32,
    gridRows: 24,
    traceDensity: 0.6,
    nodeCount: 30,
    packetCount: 50,
});
```

## Future Enhancements

### Planned Features
1. **Interactive Paths**: Traces that respond to external input
2. **Heat Maps**: Visual representation of circuit activity
3. **3D Layering**: Multiple circuit board layers with depth
4. **Custom Node Types**: User-definable logic gate shapes
5. **Particle Effects**: Sparks at connection points
6. **Text Overlay**: Display actual code/data in packets

### Optimization Opportunities
1. WebGL rendering for better performance
2. Spatial indexing for trace-packet collision
3. LOD system for complex circuits
4. Instanced rendering for repeated elements
5. Worker thread generation for data

## Technical Notes

### Browser Compatibility
- ES6+ modules required
- Canvas 2D context
- No external dependencies beyond my-nft-gen

### Performance Characteristics
- O(n) rendering complexity
- ~60 FPS on modern hardware with default settings
- Memory usage proportional to grid size and element count

### Best Practices
1. Keep packet count reasonable (<50 for smooth animation)
2. Use appropriate grid size for canvas dimensions
3. Balance visual complexity with performance
4. Test perfect loops with various frame counts
5. Verify serialization for production use

## Conclusion
CircuitStream provides a highly configurable, visually striking effect that brings digital circuits to life. Its pure functional design, perfect mathematical loops, and support for multiple render modes make it suitable for various NFT generation scenarios requiring a tech-inspired aesthetic.