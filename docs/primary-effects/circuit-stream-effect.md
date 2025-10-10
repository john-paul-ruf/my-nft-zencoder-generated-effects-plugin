# CircuitStream Effect - Technical Documentation

## Overview
CircuitStream is a primary visual effect that simulates an animated digital circuit board with flowing data streams, pulsing logic gates, and dynamic electrical pathways. The effect creates a living, breathing representation of digital circuits with smooth, perfect mathematical loops for seamless animation.

## Architecture

### Core Principles (SOLID)
- **Single Responsibility**: Each component (config, effect, rendering) has one clear purpose
- **Open/Closed**: Extensible through configuration without modifying core logic
- **Dependency Inversion**: Effect depends on abstractions (LayerEffect, Canvas2d) not concrete implementations
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
        signalWaves: this.#generateSignalWaves(),
        // ... more immutable data
    };
}
```

### Smooth Animation System
All animations use simple trigonometry for buttery-smooth motion:

**Grid Pulsing:**
```javascript
const phaseOffset = (col / grid.gridColumns) * Math.PI * 2;
const progress = (currentFrame / numberOfFrames) * Math.PI * 2;
const opacity = 0.15 + Math.sin(progress + phaseOffset) * 0.1;
```

**Trace Pulses:**
```javascript
const progress = ((currentFrame + offset) / numberOfFrames) * speed * Math.PI * 2;
const intensity = (Math.sin(progress) + 1) / 2; // 0 to 1
```

**Data Packet Flow:**
```javascript
const cycleFrames = numberOfFrames / packet.speed;
const progress = ((currentFrame + offset) % cycleFrames) / cycleFrames;
```

## Configuration Structure (Cleaned & Simplified)

### Grid Parameters
- `traceWidth` (6): Width of circuit traces in pixels
- `traceDensity` (0.6): Probability of trace at each grid intersection

### Node/Logic Gate Parameters
- `nodeCount` (20): Number of logic gates/junctions
- `nodeRadiusMin/Max` (8-16): Size range for nodes

### Data Packet Parameters
- `packetCount` (25): Number of data packets flowing through traces
- `packetSizeMin/Max` (4-8): Size range for data packets
- `packetSpeedMin/Max` (1.0-2.0): Movement speed multiplier
- `packetGlowRadiusMin/Max` (8-16): Glow effect radius

### Signal Wave Parameters
- `signalWaveCount` (8): Number of propagating signal waves
- `signalWaveSpeedMin/Max` (0.8-1.5): Wave expansion speed
- `signalDecayRateMin/Max` (0.05-0.15): Fade-out rate

### Node Animation
- `gateChargeTimeMin/Max` (40-120 frames): Charge cycle duration
- `gateDischargeTimeMin/Max` (20-60 frames): Discharge cycle duration

### Trace Animation
- `energyPulseFrequencyMin/Max` (0.2-0.6): Pulse speed multiplier

### Visual Style Parameters
- `traceOpacityMin/Max` (0.3-0.7): Base trace visibility
- `glowIntensityMin/Max` (10-30): Glow effect strength
- `glowSpreadMin/Max` (2-8): Glow radius
- `blurAmountMin/Max` (0-5): Blur filter amount (0 = no blur)

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
Smooth easing algorithms for variety:
- `interpolationAlgorithm`: ['easeInOutSine', 'easeInOutQuad'] - Grid pulsing
- `pulseAlgorithm`: ['easeInOutSine', 'easeInOutQuad'] - Trace pulses (not currently used in favor of sine waves)
- `waveAlgorithm`: ['linear', 'easeInOutSine'] - Signal waves (not currently used)
- `flowAlgorithm`: ['linear', 'easeOutQuad'] - Packet flow (not currently used)

### Circuit Pattern Style
- `useOrthogonalTraces` (true): Use 90-degree angles for traces
- `showBackgroundGrid` (true): Display animated grid overlay

### Perfect Loop Configuration
- `perfectLoop` (true): Enable smooth looping animations

### Layer Composition
- `layerOpacity` (1.0): Overall effect opacity
- `layerBlendMode` ('screen'): Blend mode for compositing

## Component Details

### Circuit Grid System
- **Dynamic Grid**: Grid dimensions calculated based on canvas size (target ~64px cells)
- **Orthogonal Routing**: Traces follow 90-degree angles for authentic PCB look
- **Grid-based Layout**: Nodes and traces align to grid for structured appearance
- **Animated Grid Lines**: Background grid pulses smoothly with sine waves

### Trace System
- **Path Generation**: L-shaped paths between grid points for orthogonal mode
- **Active/Inactive States**: Some traces pulse with energy, others remain static
- **Color Blending**: Active traces blend between base and active colors
- **Glow Effects**: Active traces have configurable glow spread

### Node Types
1. **Junction**: Circular connection point with pulsing core
2. **Processor**: Square node representing CPU/logic element
3. **Default**: All other types render as junctions

### Data Packet System
- **Path Following**: Packets travel along assigned trace paths
- **Bidirectional Movement**: Direction property controls flow orientation
- **Linear Interpolation**: Smooth position calculation along path segments
- **Glow Effects**: Each packet has configurable glow radius
- **Speed Variation**: Different speeds create visual interest

### Signal Wave System
- **Circular Expansion**: Waves expand from origin points
- **Linear Growth**: Simple progress-based expansion for smooth animation
- **Opacity Decay**: Waves fade as they expand based on decay rate
- **Origin Variety**: Waves can originate from nodes or random positions

## Animation Techniques

### Perfect Looping
- All animations use modulo arithmetic for seamless loops
- Sine waves naturally complete cycles over frame count
- Linear animations wrap using `(currentFrame + offset) % numberOfFrames`
- No discontinuities at loop points

### Smooth Motion Principles
1. **Direct Trigonometry**: Using `Math.sin()` instead of complex easing functions
2. **Phase Offsets**: Stagger animations using grid position or random offsets
3. **Linear Interpolation**: Simple division for progress calculations
4. **Modulo Wrapping**: Clean loop points with remainder operator

### Performance Optimizations
- **Pre-calculated Paths**: All trace paths generated once at initialization
- **Immutable Data Structure**: No runtime data generation
- **Single Render Pass**: All elements drawn in one canvas pass
- **Efficient Color Operations**: Hex color blending and opacity application
- **Conditional Rendering**: Skip invisible elements (opacity < 0.01)

## Canvas Rendering

### Drawing Methods Used
- `canvas.drawLine2d()`: For background grid lines
- `canvas.drawPath()`: For traces, nodes, packets, and waves
- Path generation: `#createCirclePath()`, `#createSquarePath()`
- Post-processing: Blur and opacity adjustments

### Render Order
1. Background (transparent)
2. Background grid (if enabled)
3. Circuit traces
4. Signal waves
5. Nodes/logic gates
6. Data packets

## Usage Examples

### Basic Usage
```javascript
import { CircuitStreamEffect } from './CircuitStreamEffect.js';
import { CircuitStreamConfig } from './CircuitStreamConfig.js';

const config = new CircuitStreamConfig({
    nodeCount: 20,
    packetCount: 25,
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
    traceColor: new ColorPicker(ColorPicker.SelectionType.color, '#FF6B6B'),
    activeTraceColor: new ColorPicker(ColorPicker.SelectionType.color, '#4ECDC4'),
    dataPacketColor: new ColorPicker(ColorPicker.SelectionType.color, '#FFD93D'),
    nodeColor: new ColorPicker(ColorPicker.SelectionType.color, '#6BCF7F'),
});
```

### High-Density Circuit
```javascript
const config = new CircuitStreamConfig({
    traceDensity: 0.8,
    nodeCount: 40,
    packetCount: 50,
    signalWaveCount: 12,
});
```

## Technical Notes

### Browser Compatibility
- ES6+ modules required
- Canvas 2D context
- No external dependencies beyond my-nft-gen framework

### Performance Characteristics
- O(n) rendering complexity
- ~60 FPS on modern hardware with default settings
- Memory usage proportional to element count
- Canvas size: Automatically scales grid to fit (minimum 6x6 grid)

### Best Practices
1. Keep element counts reasonable for smooth animation
2. Grid size auto-calculates for optimal density
3. Use `perfectLoop: true` for seamless GIF/video exports
4. Test with various frame counts (60, 120, 240)
5. Adjust blur amount carefully (0 = disabled, Sharp requires >= 0.3)

### Known Limitations
- Grid dimensions calculated dynamically (not configurable)
- Only orthogonal traces supported (diagonal mode removed)
- Node types limited to junction and processor
- Binary data bits display not implemented

## Conclusion
CircuitStream provides a highly configurable, visually striking effect that brings digital circuits to life with smooth, mathematically perfect animations. Its simplified animation system using direct trigonometry ensures glitch-free motion while maintaining visual complexity through layered elements and dynamic behaviors.
