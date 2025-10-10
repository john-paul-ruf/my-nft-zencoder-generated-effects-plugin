# FlowField Effect - Technical Documentation

## Overview
FlowField is a secondary visual effect that applies dynamic flow-based distortions to existing layer content. It simulates various fluid dynamics including liquid flow, smoke movement, plasma energy, and vortex patterns. The effect transforms static images into flowing, animated compositions with perfect mathematical loops.

## Architecture

### Core Principles (SOLID)
- **Single Responsibility**: Separate concerns for vector field generation, pixel sampling, and distortion application
- **Open/Closed**: Extensible through flow modes without modifying core logic
- **Dependency Inversion**: Effect depends on abstractions (LayerEffect, findValue) not concrete implementations
- **Pure Functions**: All rendering based on pre-selected algorithms and deterministic calculations

### Data Generation Pattern
```javascript
constructor() {
    super(...);
    this.#generate(settings); // Pre-select algorithms once
}

#generate(settings) {
    this.data = {
        // Pre-selected algorithms to avoid randomness in invoke
        flowAlgorithm: getRandomFromArray(this.config.flowAlgorithm),
        distortionAlgorithm: getRandomFromArray(this.config.distortionAlgorithm),
        turbulenceAlgorithm: getRandomFromArray(this.config.turbulenceAlgorithm),
        mode: getRandomFromArray(this.config.mode),
        // ... more immutable configuration
    };
}
```

### Perfect Loop Implementation
Time progression is controlled by the `perfectLoop` setting:
```javascript
this.time = this.config.perfectLoop
    ? progress * Math.PI * 2  // Perfect loop: 0 to 2π
    : frameNumber * 0.01;     // Natural: continuous progression
```

All animated parameters use `findValue` for smooth interpolation:
```javascript
const flowStrength = findValue(
    this.config.flowStrength.lower,
    this.config.flowStrength.upper,
    1,
    totalFrames,
    frameNumber,
    this.data.flowAlgorithm
);
```

## Configuration Structure (Flat Design)

### Flow Parameters
- `flowStrength` ({lower: 15, upper: 40}): Overall strength of the flow effect
- `noiseScale` ({lower: 0.003, upper: 0.008}): Scale of noise patterns (smaller = larger patterns)
- `timeScale` ({lower: 0.0005, upper: 0.002}): Speed of time-based animation
- `distortionAmount` ({lower: 10, upper: 30}): Intensity of pixel displacement

### Vector Field Parameters
- `swirls` ({lower: 2, upper: 5}): Number of vortex centers in the field
- `vortexIntensity` ({lower: 0.2, upper: 0.6}): Strength of vortex rotation
- `vectorFieldStrength` ({lower: 0.5, upper: 1.5}): Overall field intensity multiplier
- `streamlineCoherence` ({lower: 0.4, upper: 0.9}): Flow coherence (higher = more organized)

### Turbulence Parameters
- `turbulence` ({lower: 0.3, upper: 0.8}): Amount of chaotic turbulence
- `smoothingFactor` ({lower: 0.85, upper: 0.95}): Smoothness of flow transitions

### Blending Parameters
- `blendStrength` ({lower: 0.5, upper: 1.0}): Blend between original and distorted
- `preserveAlpha` (true): Whether to preserve original alpha channel
- `layerOpacity` (0.8): Overall layer opacity after effect

### Color Shift Parameters
Optional color manipulation during flow:
```javascript
colorShift: {
    enabled: false,
    hueRotation: {lower: -30, upper: 30},      // Degrees of hue shift
    saturationBoost: {lower: -0.3, upper: 0.3}, // Saturation adjustment
    brightness: {lower: -0.2, upper: 0.2}       // Brightness adjustment
}
```

### Animation Parameters
```javascript
animation: {
    enabled: true,
    speed: {lower: 0.5, upper: 2},              // Animation speed multiplier
    pulseAmplitude: {lower: 0.1, upper: 0.4},   // Pulse effect intensity
    waveFrequency: {lower: 1, upper: 4}         // Wave oscillation frequency
}
```

### Edge Behavior
- `edgeBehavior` ('wrap' | 'clamp'): How to handle pixels at edges
  - **wrap**: Seamless wrapping (tiling effect)
  - **clamp**: Clamp to edge pixels

### Loop Configuration
- `perfectLoop` (true): Enable perfect loop animation

### Animation Algorithms
Support for multiple FindValue algorithms:
- `flowAlgorithm`: Flow strength and general animations
- `distortionAlgorithm`: Distortion amount and noise scale
- `turbulenceAlgorithm`: Turbulence variations

## Flow Modes

### 1. Liquid Mode
Simulates flowing liquid with smooth, organic movement.
- Circular flow patterns
- Smooth directional changes
- Natural fluid dynamics
- Best for: Water, oil, liquid metal effects

**Characteristics:**
```javascript
vx = Math.sin(noise * Math.PI * 2) * flowStrength;
vy = Math.cos(noise * Math.PI * 2) * flowStrength;
```

### 2. Smoke Mode
Simulates rising smoke with upward bias.
- Upward directional flow
- Horizontal drift
- Dissipation-like patterns
- Best for: Smoke, steam, fog effects

**Characteristics:**
```javascript
vx = noise * flowStrength * 0.5;           // Gentle horizontal drift
vy = -Math.abs(noise) * flowStrength;      // Strong upward movement
```

### 3. Plasma Mode
Simulates energetic plasma with complex rotation.
- Multi-directional rotation
- High-frequency variations
- Energy-like patterns
- Best for: Energy fields, plasma, electricity

**Characteristics:**
```javascript
const plasmaAngle = noise * Math.PI * 4 + time * animSpeed * waveFreq;
vx = Math.sin(plasmaAngle) * flowStrength;
vy = Math.cos(plasmaAngle + noise * Math.PI) * flowStrength;
```

### 4. Vortex Mode
Simulates multiple rotating vortices.
- Multiple rotation centers
- Distance-based influence
- Orbital motion patterns
- Best for: Whirlpools, tornadoes, spiral effects

**Characteristics:**
```javascript
// For each vortex center:
const angle = Math.atan2(dy, dx) + Math.PI / 2;
const influence = vortex.strength * (1 - distance / 200);
vx += Math.cos(angle) * influence * flowStrength;
vy += Math.sin(angle) * influence * flowStrength;
```

## Component Details

### Vector Field Generation
The effect generates a dynamic vector field with multiple vortex centers:
```javascript
generateVectorField(width, height, progress, swirls, vortexIntensity, vectorFieldStrength, mode) {
    // Create vortex centers distributed in a circle
    for (let i = 0; i < swirls; i++) {
        const angle = (i / swirls) * Math.PI * 2;
        const radius = Math.min(width, height) * 0.3;
        
        const vortexX = centerX + Math.cos(angle + this.time) * radius;
        const vortexY = centerY + Math.sin(angle + this.time) * radius;
        
        // Animated field strength
        const fieldStrength = vortexIntensity * vectorFieldStrength * 
                            (0.5 + 0.5 * Math.sin(this.time * 2 + i));
        
        this.vectorField.push({x: vortexX, y: vortexY, strength: fieldStrength});
    }
}
```

### Noise System
3D Perlin-like noise for smooth, organic patterns:
```javascript
noise3D(x, y, z) {
    // Hash-based 3D noise implementation
    // Provides smooth, continuous noise values
    // Z-axis used for time dimension
}
```

### Pixel Sampling
Bilinear interpolation for smooth distortion:
```javascript
samplePixel(pixels, x, y, width, height) {
    // Sample 4 neighboring pixels
    // Interpolate based on fractional position
    // Returns smooth color values
}
```

### Distortion Application
For each pixel in the output:
1. Calculate flow vector at pixel position
2. Determine source pixel position (current + vector * distortion)
3. Sample source pixel with bilinear interpolation
4. Apply optional color shift
5. Blend with original pixel

## Animation Techniques

### Perfect Looping
- Time progresses from 0 to 2π over `totalFrames`
- All noise and vector calculations based on looping time
- Ensures seamless loop at frame boundary
- No discontinuities or jumps

### Streamline Coherence
Controls flow organization:
- **High coherence (0.8-0.9)**: Organized, flowing patterns
- **Medium coherence (0.5-0.7)**: Balanced flow with variation
- **Low coherence (0.3-0.5)**: Chaotic, turbulent patterns

```javascript
const coherentVx = vx * streamlineCoherence;
const coherentVy = vy * streamlineCoherence;

// Add perpendicular flow for chaos when coherence is low
const perpVx = -vy * (1 - streamlineCoherence) * 0.3;
const perpVy = vx * (1 - streamlineCoherence) * 0.3;
```

### Animation Modulation
Multiple animation parameters work together:
- **Speed**: Controls time progression rate
- **Pulse**: Adds rhythmic intensity variation
- **Wave Frequency**: Controls oscillation rate

```javascript
const pulse = 1 + Math.sin(this.time * animSpeed * waveFreq * 3) * pulseAmp;
vx *= pulse;
vy *= pulse;
```

### Performance Optimizations
- Single-pass pixel processing
- Efficient noise calculation
- Buffer pooling for memory management
- Adaptive vector field resolution

## Color Manipulation

### HSL Color Space
The effect can shift colors in HSL space:
- **Hue Rotation**: Shift colors around the color wheel
- **Saturation Boost**: Increase or decrease color intensity
- **Brightness**: Adjust lightness

### Color Shift Application
```javascript
applyColorShift(color, frameNumber, totalFrames) {
    // Convert RGB to HSL
    const {h, s, l} = this.rgbToHsl(color.r / 255, color.g / 255, color.b / 255);
    
    // Apply animated shifts
    const newH = (h + hueRotation / 360) % 1;
    const newS = Math.max(0, Math.min(1, s + satBoost));
    const newL = Math.max(0, Math.min(1, l + brightness));
    
    // Convert back to RGB
    const {r, g, b} = this.hslToRgb(newH, newS, newL);
}
```

## Usage Examples

### Basic Liquid Flow
```javascript
import { FlowFieldEffect } from './FlowFieldEffect.js';
import { FlowFieldConfig } from './FlowFieldConfig.js';

const config = new FlowFieldConfig({
    mode: ['liquid'],
    flowStrength: {lower: 20, upper: 35},
    distortionAmount: {lower: 15, upper: 25},
    perfectLoop: true,
});

const effect = new FlowFieldEffect({
    config,
    settings,
});

await effect.invoke(layer, currentFrame, totalFrames);
```

### Smoke Rising Effect
```javascript
const config = new FlowFieldConfig({
    mode: ['smoke'],
    flowStrength: {lower: 25, upper: 45},
    turbulence: {lower: 0.5, upper: 0.9},
    streamlineCoherence: {lower: 0.6, upper: 0.8},
    edgeBehavior: 'clamp',
});
```

### Energetic Plasma
```javascript
const config = new FlowFieldConfig({
    mode: ['plasma'],
    flowStrength: {lower: 30, upper: 50},
    vortexIntensity: {lower: 0.4, upper: 0.8},
    animation: {
        enabled: true,
        speed: {lower: 1.5, upper: 2.5},
        pulseAmplitude: {lower: 0.3, upper: 0.5},
        waveFrequency: {lower: 2, upper: 4}
    },
    colorShift: {
        enabled: true,
        hueRotation: {lower: -45, upper: 45},
        saturationBoost: {lower: 0.1, upper: 0.4}
    }
});
```

### Multiple Vortices
```javascript
const config = new FlowFieldConfig({
    mode: ['vortex'],
    swirls: {lower: 4, upper: 6},
    vortexIntensity: {lower: 0.5, upper: 0.8},
    vectorFieldStrength: {lower: 1.0, upper: 1.5},
    distortionAmount: {lower: 20, upper: 40},
});
```

### Subtle Distortion
```javascript
const config = new FlowFieldConfig({
    flowStrength: {lower: 5, upper: 15},
    distortionAmount: {lower: 3, upper: 8},
    blendStrength: {lower: 0.3, upper: 0.6},
    turbulence: {lower: 0.1, upper: 0.3},
    layerOpacity: 0.5,
});
```

## Integration with Other Effects

### As a Secondary Effect
FlowField is designed as a secondary effect that modifies existing layer content:

```javascript
// Apply primary effect first
const primaryEffect = new SpiralWaveEffect({config: primaryConfig});
await primaryEffect.invoke(layer, frame, totalFrames);

// Then apply flow field distortion
const flowEffect = new FlowFieldEffect({config: flowConfig});
await flowEffect.invoke(layer, frame, totalFrames);
```

### Layering Strategy
1. **Base Layer**: Original content or primary effect
2. **Flow Distortion**: Apply FlowField effect
3. **Additional Effects**: Optional post-processing

## Future Enhancements

### Planned Features
1. **Directional Flow**: User-defined flow directions
2. **Obstacle Avoidance**: Flow around defined regions
3. **Particle Advection**: Visible particles following flow
4. **Flow Visualization**: Debug mode showing vector field
5. **Custom Vector Fields**: Import external flow data
6. **Multi-Scale Noise**: Octave-based noise for detail

### Optimization Opportunities
1. WebGL shader implementation for real-time performance
2. Tile-based processing for large images
3. Adaptive resolution based on flow complexity
4. Cached vector field for static configurations
5. SIMD operations for pixel processing

## Technical Notes

### Browser Compatibility
- ES6+ modules required
- Canvas 2D context
- Sharp library for image processing
- Buffer pooling for memory efficiency

### Performance Characteristics
- O(width × height) pixel processing complexity
- ~30-60 FPS on modern hardware with 1920×1080
- Memory usage: 2-3× layer size (input + output + working buffers)
- CPU-intensive due to per-pixel calculations

### Best Practices
1. Use appropriate distortion amounts (10-30 for subtle, 30-60 for dramatic)
2. Balance flow strength with distortion amount
3. Test edge behavior with your content (wrap vs clamp)
4. Use perfect loop mode for NFT generation
5. Consider layer opacity for blending with original
6. Disable color shift unless specifically needed (performance)
7. Use higher streamline coherence for organized flows
8. Use lower coherence for chaotic, turbulent effects

### Mode Selection Guide
- **Liquid**: Organic, flowing, water-like
- **Smoke**: Upward movement, dissipation
- **Plasma**: Energetic, rotating, electric
- **Vortex**: Spiral, whirlpool, tornado

### Algorithm Selection
- **Flow Algorithm**: Controls overall animation smoothness
- **Distortion Algorithm**: Affects distortion intensity variation
- **Turbulence Algorithm**: Controls chaos and randomness

## Conclusion
FlowField provides a powerful, versatile effect for applying dynamic flow-based distortions to layer content. Its multiple flow modes, extensive configuration options, and perfect loop support make it ideal for creating fluid, animated compositions in NFT generation. The effect's pure functional design ensures consistent, reproducible results while maintaining visual complexity and organic movement. As a secondary effect, it excels at transforming static or primary-effect content into flowing, dynamic artwork.