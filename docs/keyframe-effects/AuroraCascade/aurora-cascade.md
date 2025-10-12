# Aurora Cascade Keyframe Effect

## Overview
The Aurora Cascade effect creates mesmerizing aurora borealis animations with flowing ribbons of light, particle systems, and magnetic field distortions. This keyframe effect transforms layers into stunning displays of cascading light reminiscent of the northern lights.

## Features
- **Flowing Ribbons**: Multiple layers of light with sinusoidal wave patterns
- **Particle System**: Sparkling stars with trails and glow effects
- **Magnetic Field**: Realistic distortions and vortex effects
- **Color Modes**: Natural, Cosmic, Fire, Ice, and Custom palettes
- **Perfect Loops**: Seamless animation cycles for each active window
- **Alpha Preservation**: Respects transparent backgrounds

## Configuration

### Timing Parameters
- `keyFrames`: Array of frame numbers where effect starts
- `cascadeDuration`: [min, max] duration for each cascade window

### Aurora Properties
- `ribbonCount`: Number of aurora ribbons (1-20)
- `ribbonWidth`: Width of each ribbon (0-1)
- `flowDirection`: Direction of flow ('down', 'up', 'radial', 'spiral')
- `flowSpeed`: Speed of ribbon movement (cycles per duration)

### Wave Configuration
- `waveAmplitude`: Horizontal wave amplitude (0-1)
- `waveFrequency`: Wave cycles across width
- `wavePhaseShift`: Phase offset between ribbons
- `turbulenceStrength`: Organic distortion amount

### Color System
- `colorMode`: Preset color schemes ('natural', 'cosmic', 'fire', 'ice', 'custom')
- `primaryColor`: Base aurora color (hex)
- `secondaryColor`: Secondary gradient color (hex)
- `tertiaryColor`: Tertiary accent color (hex)
- `colorShiftSpeed`: Color rotation speed
- `saturationBoost`: Color intensity multiplier

### Particle Effects
- `particleDensity`: Number of particles per ribbon
- `particleSize`: [min, max] particle size range
- `particleGlow`: Enable glow effect
- `particleTrailLength`: Trail fade length (0-1)

### Magnetic Field
- `fieldStrength`: Field influence strength (0-1)
- `fieldComplexity`: Number of field sources
- `vortexCount`: Number of swirl points
- `vortexStrength`: Swirl intensity

### Atmospheric Effects
- `glowIntensity`: Overall glow strength
- `blurRadius`: Soft edge blur radius
- `shimmerSpeed`: Shimmer animation speed
- `fadeEdges`: Edge fade amount (0-1)

### Rendering
- `blendMode`: Compositing mode ('screen', 'additive', 'overlay')
- `layerOpacity`: Overall effect opacity (0-1)
- `preserveAlpha`: Respect layer transparency
- `quality`: Render quality ('low', 'medium', 'high')

## Usage Example

```javascript
import { AuroraCascadeEffect, AuroraCascadeConfig } from './AuroraCascade';

// Create configuration
const config = new AuroraCascadeConfig({
  keyFrames: [0, 100, 300],
  cascadeDuration: [40, 60],
  ribbonCount: 7,
  colorMode: 'natural',
  particleDensity: 60,
  fieldStrength: 0.4,
  glowIntensity: 1.8
});

// Initialize effect
const effect = new AuroraCascadeEffect({ 
  config,
  settings: { width: 1024, height: 1024 }
});

// Apply to layer at specific frame
const outputLayer = await effect.invoke(inputLayer, frameNumber, totalFrames);
```

## Color Modes

### Natural
Classic aurora colors with green-blue gradient, subtle particles, and gentle flow.

### Cosmic
Vibrant purple-pink spectrum with dense particle field and dynamic movement.

### Fire
Warm red-orange-yellow gradient with upward flow and ember-like particles.

### Ice
Cool cyan-white spectrum with crystalline particles and sharp wave patterns.

### Custom
User-defined colors using primary, secondary, and tertiary color settings.

## Perfect Looping
The effect automatically calculates perfect loop cycles based on the configured speeds:
- Flow cycles are rounded to nearest integer
- Wave cycles maintain phase continuity
- Color shifts complete full rotations
- Particles loop seamlessly

## Performance Notes
- Pre-calculated wave tables optimize rendering
- Particle system uses efficient recycling
- Canvas operations are batched
- Memory is managed through buffer pooling

## SOLID Architecture
- **Single Responsibility**: Separate classes for rendering strategies
- **Open/Closed**: Extensible color modes and flow directions
- **Dependency Injection**: Renderer strategies injected at construction
- **Pure Functions**: All animations deterministic from constructor data