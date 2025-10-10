# Cymatics Resonance Effect

## Overview
The **Cymatics Resonance Effect** creates mesmerizing standing wave patterns inspired by cymatics - the study of visible sound vibrations. This effect simulates the beautiful interference patterns that form when frequencies resonate through a medium, similar to sand forming intricate geometric patterns on a vibrating plate.

## Visual Description
- **Primary Element**: Multiple overlapping standing wave patterns creating interference patterns
- **Secondary Element**: Resonant nodes (points of maximum amplitude) that glow and pulse
- **Tertiary Element**: Harmonic ripples that emanate from resonant points
- **Background**: Subtle frequency grid showing the underlying wave structure
- **Animation**: Smooth transitions between harmonic frequencies creating a perfect loop

## Scientific Inspiration
Cymatics is the study of visible sound and vibration. When a surface vibrates at specific frequencies, particles on that surface arrange themselves into beautiful geometric patterns at the nodes (points of zero displacement) and antinodes (points of maximum displacement). This effect digitally recreates these phenomena with:
- Standing wave equations
- Harmonic overtones
- Wave interference patterns
- Resonant frequency transitions

## Configuration Parameters

### Wave Pattern Parameters
- **waveFrequencyX** (1-8, default: 3): Base frequency for horizontal waves
- **waveFrequencyY** (1-8, default: 3): Base frequency for vertical waves
- **harmonicCount** (2-6, default: 4): Number of harmonic overtones to layer
- **harmonicRatio** (1.0-2.0, default: 1.5): Ratio between successive harmonics
- **waveAmplitude** (0.3-1.0, default: 0.7): Strength of wave displacement
- **interferenceIntensity** (0.5-1.5, default: 1.0): How strongly waves interact

### Resonant Node Parameters
- **nodeCount** (20-100, default: 50): Number of resonant points to display
- **nodeRadiusMin** (4-8, default: 6): Minimum node size in pixels
- **nodeRadiusMax** (12-24, default: 16): Maximum node size in pixels
- **nodePulseSpeedMin** (0.5-1.0, default: 0.7): Minimum pulse frequency
- **nodePulseSpeedMax** (1.5-2.5, default: 2.0): Maximum pulse frequency
- **nodeGlowRadiusMin** (10-20, default: 15): Minimum glow spread
- **nodeGlowRadiusMax** (20-40, default: 30): Maximum glow spread

### Ripple Parameters
- **rippleCount** (8-20, default: 12): Number of harmonic ripples
- **rippleSpeedMin** (0.8-1.2, default: 1.0): Minimum ripple expansion speed
- **rippleSpeedMax** (1.5-2.5, default: 2.0): Maximum ripple expansion speed
- **rippleWidthMin** (2-4, default: 2): Minimum ripple line width
- **rippleWidthMax** (4-8, default: 5): Maximum ripple line width
- **rippleDecayRate** (0.02-0.08, default: 0.05): How fast ripples fade

### Pattern Morphing
- **morphSpeed** (0.1-0.5, default: 0.25): Speed of pattern transitions
- **morphComplexity** (2-5, default: 3): Number of pattern states in loop
- **phaseShiftSpeed** (0.05-0.2, default: 0.1): Speed of wave phase changes

### Visual Style
- **patternOpacityMin** (0.2-0.4, default: 0.3): Minimum pattern visibility
- **patternOpacityMax** (0.6-0.9, default: 0.8): Maximum pattern visibility
- **lineWidth** (1-4, default: 2): Width of wave pattern lines
- **showFrequencyGrid** (boolean, default: true): Display underlying grid
- **gridOpacity** (0.1-0.3, default: 0.2): Grid visibility

### Effects
- **glowIntensityMin** (10-20, default: 15): Minimum glow strength
- **glowIntensityMax** (25-40, default: 35): Maximum glow strength
- **blurAmountMin** (0-2, default: 1): Minimum blur amount
- **blurAmountMax** (2-6, default: 4): Maximum blur amount

### Colors (ColorPicker)
- **primaryWaveColor**: Main wave pattern color
- **secondaryWaveColor**: Secondary harmonic color
- **nodeColor**: Resonant node color
- **nodeCoreColor**: Node center color
- **rippleColor**: Harmonic ripple color
- **gridColor**: Frequency grid color (default: #1a1a3a)
- **backgroundGradientStart**: Background gradient start (default: #000033)
- **backgroundGradientEnd**: Background gradient end (default: #000000)

### Animation
- **perfectLoop** (boolean, default: true): Ensure seamless looping
- **layerOpacity** (0.0-1.0, default: 1.0): Overall layer opacity
- **layerBlendMode** (string, default: 'screen'): Blend mode

## Usage Example

```javascript
import {CymaticsResonanceEffect} from './src/effects/primaryEffects/CymaticsResonance/CymaticsResonanceEffect.js';
import {CymaticsResonanceConfig} from './src/effects/primaryEffects/CymaticsResonance/CymaticsResonanceConfig.js';
import {ColorPicker} from '../my-nft-gen/src/core/layer/configType/ColorPicker.js';

// Create configuration
const config = new CymaticsResonanceConfig({
    waveFrequencyX: 4,
    waveFrequencyY: 3,
    harmonicCount: 5,
    harmonicRatio: 1.618, // Golden ratio for pleasing harmonics
    showFrequencyGrid: true,
    primaryWaveColor: new ColorPicker(ColorPicker.SelectionType.color, '#00ffff'),
    secondaryWaveColor: new ColorPicker(ColorPicker.SelectionType.color, '#ff00ff'),
});

// Create effect
const effect = new CymaticsResonanceEffect({
    config,
    settings
});

// Apply to layer
await effect.invoke(layer, currentFrame, totalFrames);
```

## Animation Behaviors

### Wave Morphing
The effect smoothly transitions between different harmonic states, creating flowing, organic motion. The wave patterns morph through various configurations based on musical intervals:
- Octave (2:1)
- Perfect Fifth (3:2)
- Perfect Fourth (4:3)
- Major Third (5:4)

### Node Pulsing
Resonant nodes pulse at their own frequencies, with intensity based on the wave amplitude at that point. This creates a visual rhythm synchronized with the wave patterns.

### Ripple Propagation
Harmonic ripples emanate from resonant nodes, expanding outward with gradual decay. Multiple ripples create additional interference patterns, adding depth and complexity.

### Perfect Loop
When `perfectLoop` is enabled, the effect uses sinusoidal interpolation to ensure the animation returns smoothly to its initial state, creating a seamless loop perfect for NFT animations.

## Mathematical Foundation

### Standing Wave Equation
The core of the effect uses the standing wave equation:

```
amplitude = Σ sin(kx·n·r) × sin(ky·n·r) × cos(ωt + φ) × (1/n)
```

Where:
- `kx, ky` = base frequencies in x and y directions
- `n` = harmonic number (1, 2, 3, ...)
- `r` = harmonic ratio
- `ω` = angular frequency (time component)
- `φ` = phase offset
- `1/n` = harmonic decay factor

### Interference Patterns
When multiple harmonics overlap, they create natural interference patterns similar to:
- Chladni patterns (vibrating plates)
- Lissajous curves (parametric curves)
- Moiré effects (overlapping grids)
- Sacred geometry (emergent from wave mathematics)

## Performance Considerations

### Wave Field Resolution
The effect calculates the wave field on a 64x64 grid for performance, then interpolates for rendering. This provides smooth patterns while maintaining good frame rates.

### Contour Line Rendering
Wave patterns are rendered as contour lines using a simplified marching squares algorithm, which efficiently traces lines of constant amplitude.

### Scaling
All element counts (nodes, ripples) scale proportionally with canvas size to maintain consistent visual density across different resolutions.

## Creative Tips

### Musical Harmonics
Use harmonic ratios based on musical intervals for aesthetically pleasing patterns:
- **1.5** (3:2) - Perfect Fifth
- **1.618** (φ) - Golden Ratio
- **1.333** (4:3) - Perfect Fourth
- **1.25** (5:4) - Major Third

### Frequency Combinations
Experiment with different X/Y frequency combinations:
- **Equal (3:3)** - Symmetrical patterns
- **Octave (4:2)** - Elongated patterns
- **Prime (5:3)** - Complex, non-repeating patterns
- **Fibonacci (5:3, 8:5)** - Natural-looking patterns

### Color Schemes
- **Monochromatic**: Use shades of a single color for elegant simplicity
- **Complementary**: Cyan/Magenta or Blue/Orange for vibrant contrast
- **Analogous**: Blues to purples for smooth gradients
- **Neon**: Bright colors on dark backgrounds for cyberpunk aesthetics

## Technical Details

### Pure Function Rendering
All rendering is deterministic and based on pre-generated data stored during construction. No random values are generated during the render phase, ensuring consistent output for the same configuration.

### Serialization
The effect fully supports serialization - all parameters are primitive types or ColorPicker instances that serialize automatically. Effects can be saved to JSON and reconstructed identically.

### Layer Integration
The effect follows the my-nft-gen framework patterns:
- Inherits from `LayerEffect`
- Uses `Canvas2dFactory` for rendering
- Returns a composited layer
- Supports blur and opacity post-processing

## Version History

### 1.0.0 (Initial Release)
- Standing wave pattern generation
- Harmonic overtone layering
- Resonant node detection and rendering
- Harmonic ripple propagation
- Perfect loop animation
- Frequency grid overlay
- Full color customization
- Configurable morphing and animation speeds

## Author
Zencoder

## Tags
`effect`, `primary`, `cymatics`, `waves`, `harmonic`, `resonance`, `animated`, `physics`, `sound`, `vibration`