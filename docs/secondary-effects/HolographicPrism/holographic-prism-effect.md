# Holographic Prism Effect - Technical Documentation

## Overview
Holographic Prism is a secondary visual effect that transforms layer content into mesmerizing holographic displays with chromatic dispersion, light refraction, and iridescent shimmer. It simulates viewing content through a crystalline prism that splits light into rainbow spectrums while creating depth through parallax displacement.

## Architecture

### Core Principles (SOLID)
- **Single Responsibility**: Separate concerns for chromatic aberration, dispersion, shimmer, parallax, and glow
- **Open/Closed**: Extensible through animation modes without modifying core logic
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
        animationMode: getRandomFromArray(this.config.animationMode),
        chromaticAlgorithm: getRandomFromArray(this.config.chromaticAlgorithm),
        dispersionAlgorithm: getRandomFromArray(this.config.dispersionAlgorithm),
        shimmerAlgorithm: getRandomFromArray(this.config.shimmerAlgorithm),
        parallaxAlgorithm: getRandomFromArray(this.config.parallaxAlgorithm),
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
const chromaticStrength = findValue(
    this.config.chromaticStrength.lower,
    this.config.chromaticStrength.upper,
    1,
    totalFrames,
    frameNumber,
    this.data.chromaticAlgorithm
);
```

## Configuration Structure (Flat Design)

### Chromatic Aberration Parameters
- `chromaticStrength` ({lower: 2, upper: 8}): Pixel offset for RGB channel separation
- `chromaticAngle` ({lower: 0, upper: 360}): Direction of separation in degrees

### Prismatic Dispersion Parameters
- `dispersionIntensity` ({lower: 0.3, upper: 0.8}): Overall dispersion strength
- `dispersionAngle` ({lower: 0, upper: 360}): Prism orientation in degrees
- `wavelengthSeparation` ({lower: 1.5, upper: 4}): Distance between color wavelengths

### Holographic Shimmer Parameters
- `shimmerIntensity` ({lower: 0.2, upper: 0.6}): Iridescent overlay strength
- `shimmerSpeed` ({lower: 0.5, upper: 2}): Animation speed multiplier
- `shimmerScale` ({lower: 0.002, upper: 0.006}): Pattern scale (smaller = larger patterns)

### Depth Parallax Parameters
- `parallaxLayers` ({lower: 3, upper: 5}): Number of depth layers (integer)
- `parallaxStrength` ({lower: 2, upper: 6}): Displacement per layer
- `parallaxAngle` ({lower: 0, upper: 360}): Direction of depth shift in degrees

### Spectral Glow Parameters
- `glowIntensity` ({lower: 0.1, upper: 0.4}): Rainbow glow strength
- `glowRadius` ({lower: 3, upper: 8}): Glow spread distance in pixels
- `glowSaturation` ({lower: 0.6, upper: 1.0}): Color saturation of glow

### Refraction Parameters
- `refractionStrength` ({lower: 0.2, upper: 0.5}): Light bending intensity
- `refractionComplexity` ({lower: 1, upper: 3}): Refraction pattern detail level

### Animation Mode
- `animationMode` (['rotation', 'pulse', 'wave', 'shimmer', 'depth', 'combined']): Animation behavior

### Color Spectrum Parameters
- `spectrumHueStart` ({lower: 0, upper: 360}): Starting hue for spectrum
- `spectrumHueRange` ({lower: 180, upper: 360}): Hue range to cover
- `spectrumSaturation` ({lower: 0.7, upper: 1.0}): Spectrum color saturation
- `spectrumBrightness` ({lower: 0.8, upper: 1.0}): Spectrum brightness

### Blending Parameters
- `effectStrength` ({lower: 0.5, upper: 1.0}): Overall effect intensity
- `preserveOriginal` ({lower: 0.3, upper: 0.7}): Blend with original layer
- `edgeBehavior` ('clamp' | 'wrap'): How to handle pixels at edges

### Layer Properties
- `layerOpacity` (1.0): Final layer opacity
- `layerBlendMode` ('normal'): Blend mode

### Loop Configuration
- `perfectLoop` (true): Enable perfect loop animation

### Animation Algorithms
Support for multiple FindValue algorithms:
- `chromaticAlgorithm`: Chromatic aberration animations
- `dispersionAlgorithm`: Dispersion and refraction animations
- `shimmerAlgorithm`: Shimmer and glow animations
- `parallaxAlgorithm`: Parallax depth animations

## Animation Modes

### 1. Rotation Mode
Prism rotates around the layer creating sweeping rainbow trails.
- Chromatic aberration angle rotates continuously
- Creates dynamic directional color separation
- Best for: Spinning prism effects, orbital rainbows

**Characteristics:**
```javascript
const animatedAngle = angleRad + this.time;
```

### 2. Pulse Mode
Dispersion intensity pulses rhythmically.
- Intensity oscillates between min and max
- Creates breathing effect
- Best for: Pulsing holograms, energy fields

**Characteristics:**
```javascript
const pulse = 0.5 + 0.5 * Math.sin(this.time * 2);
intensity *= pulse;
```

### 3. Wave Mode
Sine wave distortion travels across the layer.
- Horizontal wave propagation
- Position-based phase offset
- Best for: Flowing energy, scanning effects

**Characteristics:**
```javascript
const wavePhase = (x / width) * Math.PI * 2;
animatedTime += Math.sin(wavePhase + this.time) * Math.PI;
```

### 4. Shimmer Mode
Iridescent colors flow across the surface.
- Position-based color variation
- Time-based animation
- Best for: Holographic displays, iridescent surfaces

**Characteristics:**
```javascript
const phase = (x + y) * scale + this.time * speed;
const hue = (spectrumHueStart + Math.sin(phase) * hueRange) % 360;
```

### 5. Depth Mode
Parallax layers shift creating 3D depth illusion.
- Alpha-based depth mapping
- Multi-layer displacement
- Best for: 3D pop-out effects, depth enhancement

**Characteristics:**
```javascript
const depth = alpha / 255;
const displacement = (depth * parallaxLayers) * strength * Math.sin(this.time);
```

### 6. Combined Mode
All effects work together in harmony.
- Rotation + Pulse + Wave + Shimmer + Depth
- Maximum visual complexity
- Best for: Showcase pieces, hero effects

## Component Details

### Chromatic Aberration
Separates RGB channels along a directional vector to create rainbow edges.

**Algorithm:**
```javascript
// Sample R channel from offset position
const rColor = samplePixel(pixels, x + offsetX, y + offsetY);

// Sample G channel from center
const gColor = samplePixel(pixels, x, y);

// Sample B channel from opposite offset
const bColor = samplePixel(pixels, x - offsetX, y - offsetY);

return { r: rColor.r, g: gColor.g, b: bColor.b, a: gColor.a };
```

**Visual Effect:**
- Red channel shifts in one direction
- Blue channel shifts in opposite direction
- Green channel remains centered
- Creates rainbow fringing at edges

### Prismatic Dispersion
Displaces pixels based on their brightness (wavelength simulation).

**Algorithm:**
```javascript
// Calculate wavelength from pixel brightness
const brightness = (color.r + color.g + color.b) / 3;
const wavelength = brightness / 255;

// Displace based on wavelength (red shifts more than blue)
const displacement = wavelength * separation * intensity;
const offsetX = Math.cos(angle) * displacement;
const offsetY = Math.sin(angle) * displacement;
```

**Visual Effect:**
- Brighter pixels displace more (like red light)
- Darker pixels displace less (like blue light)
- Simulates light refraction through prism
- Creates spectral separation

### Holographic Shimmer
Overlays iridescent colors based on position and time.

**Algorithm:**
```javascript
// Calculate shimmer phase from position and time
const phase = (x + y) * scale + this.time * speed;

// Generate rainbow hue
const hue = (spectrumHueStart + Math.sin(phase) * hueRange) % 360;

// Convert HSL to RGB
const shimmerColor = hslToRgb(hue / 360, saturation, brightness);

// Blend with original color
return blendColors(color, shimmerColor, intensity);
```

**Visual Effect:**
- Flowing rainbow colors across surface
- Position-dependent hue variation
- Time-based animation
- Iridescent appearance

### Depth Parallax
Creates depth illusion through multi-layer displacement.

**Algorithm:**
```javascript
// Use alpha as depth indicator (more opaque = closer)
const depth = alpha / 255;
const layer = Math.floor(depth * parallaxLayers);
const layerDepth = layer / parallaxLayers;

// Calculate displacement for this layer
const displacement = layerDepth * strength * Math.sin(this.time);
const offsetX = Math.cos(angle) * displacement;
const offsetY = Math.sin(angle) * displacement;
```

**Visual Effect:**
- Opaque pixels (foreground) move more
- Transparent pixels (background) move less
- Creates 3D depth perception
- Parallax scrolling effect

### Spectral Glow
Adds rainbow glow to edges detected via alpha gradient.

**Algorithm:**
```javascript
// Detect edges by checking alpha gradient
const isEdge = detectEdgePixel(pixels, x, y);

if (isEdge) {
    // Calculate glow color based on position
    const angle = Math.atan2(y - centerY, x - centerX);
    const hue = ((angle / (2 * Math.PI)) * 360 + this.time * 60) % 360;
    
    // Create and apply glow
    const glowColor = hslToRgb(hue / 360, saturation, 0.5);
    return blendColors(color, glowColor, intensity);
}
```

**Visual Effect:**
- Rainbow glow at edges
- Position-based color variation
- Animated hue rotation
- Enhances silhouette

## Pixel Sampling

### Bilinear Interpolation
Smooth pixel sampling for sub-pixel accuracy:

```javascript
samplePixel(pixels, x, y, width, height) {
    // Get integer and fractional parts
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const x1 = Math.min(x0 + 1, width - 1);
    const y1 = Math.min(y0 + 1, height - 1);
    const fx = x - x0;
    const fy = y - y0;
    
    // Sample 4 neighboring pixels
    // Interpolate based on fractional position
    const r = (1-fx)*(1-fy)*pixels[idx00] + fx*(1-fy)*pixels[idx10] +
              (1-fx)*fy*pixels[idx01] + fx*fy*pixels[idx11];
    
    return { r, g, b, a };
}
```

### Edge Behavior
- **Clamp**: Pixels at edges are clamped to image boundaries
- **Wrap**: Pixels wrap around for seamless tiling

## Color Space Conversion

### HSL to RGB
Converts hue, saturation, lightness to RGB:

```javascript
hslToRgb(h, s, l) {
    // Standard HSL to RGB conversion
    // Handles all edge cases
    // Returns { r, g, b } in 0-255 range
}
```

**Usage:**
- Generating rainbow spectrums
- Iridescent shimmer colors
- Spectral glow colors

## Performance Optimizations

### Buffer Pooling
- Uses `globalBufferPool` for memory management
- Reuses buffers across frames
- Reduces garbage collection

### Single-Pass Processing
- All effects applied in one pixel iteration
- Minimizes memory access
- Maximizes cache efficiency

### Efficient Sampling
- Bilinear interpolation for smooth results
- Edge behavior handled efficiently
- No redundant calculations

## Usage Examples

### Basic Holographic Effect
```javascript
import { HolographicPrismEffect } from './HolographicPrismEffect.js';
import { HolographicPrismConfig } from './HolographicPrismConfig.js';

const config = new HolographicPrismConfig({
    animationMode: ['shimmer'],
    chromaticStrength: {lower: 3, upper: 5},
    shimmerIntensity: {lower: 0.3, upper: 0.5},
    perfectLoop: true,
});

const effect = new HolographicPrismEffect({ config, settings });
await effect.invoke(layer, currentFrame, totalFrames);
```

### Intense Prismatic Explosion
```javascript
const config = new HolographicPrismConfig({
    animationMode: ['rotation', 'pulse'],
    chromaticStrength: {lower: 6, upper: 10},
    dispersionIntensity: {lower: 0.7, upper: 0.9},
    wavelengthSeparation: {lower: 3, upper: 5},
    glowIntensity: {lower: 0.3, upper: 0.5},
    effectStrength: {lower: 0.8, upper: 1.0},
});
```

### Subtle Depth Enhancement
```javascript
const config = new HolographicPrismConfig({
    animationMode: ['depth'],
    chromaticStrength: {lower: 1, upper: 2},
    parallaxLayers: {lower: 5, upper: 5},
    parallaxStrength: {lower: 3, upper: 5},
    effectStrength: {lower: 0.4, upper: 0.6},
    preserveOriginal: {lower: 0.6, upper: 0.8},
});
```

### Rainbow Wave
```javascript
const config = new HolographicPrismConfig({
    animationMode: ['wave', 'shimmer'],
    shimmerIntensity: {lower: 0.5, upper: 0.7},
    shimmerSpeed: {lower: 1.5, upper: 2.5},
    spectrumHueRange: {lower: 300, upper: 360},
    glowSaturation: {lower: 0.9, upper: 1.0},
});
```

## Integration with Other Effects

### As a Secondary Effect
Holographic Prism is designed as a secondary effect that modifies existing layer content:

```javascript
// Apply primary effect first
const primaryEffect = new MetatronCubeEffect({config: primaryConfig});
await primaryEffect.invoke(layer, frame, totalFrames);

// Then apply holographic prism
const prismEffect = new HolographicPrismEffect({config: prismConfig});
await prismEffect.invoke(layer, frame, totalFrames);
```

### Layering Strategy
1. **Base Layer**: Original content or primary effect
2. **Holographic Transform**: Apply Holographic Prism effect
3. **Additional Effects**: Optional post-processing

## Technical Notes

### Transparency Handling
- All operations preserve original alpha channel
- Fully transparent pixels (alpha = 0) are skipped
- Edge detection respects alpha gradients
- Depth parallax uses alpha as depth map

### Perfect Loop Guarantee
- Time progresses from 0 to 2π over totalFrames
- All animations use findValue for smooth interpolation
- Frame 0 and frame totalFrames are identical
- No discontinuities or jumps

### Memory Management
- Uses buffer pooling for efficiency
- Releases buffers after processing
- Minimal memory footprint
- No memory leaks

### Browser Compatibility
- ES6+ modules required
- Uses sharp for image processing
- Node.js environment
- No browser-specific APIs

## Future Enhancements

### Planned Features
1. **Custom Spectrum Gradients**: User-defined color gradients
2. **Directional Glow**: Glow direction control
3. **Refraction Patterns**: Complex refraction algorithms
4. **Particle Advection**: Visible particles following light rays
5. **Multi-Prism**: Multiple prism orientations
6. **Caustics**: Light caustic patterns

### Optimization Opportunities
1. WebGL shader implementation for real-time performance
2. Tile-based processing for large images
3. Adaptive quality based on motion
4. Cached edge detection
5. SIMD operations for pixel processing

## Troubleshooting

### Effect Too Subtle
- Increase `effectStrength`
- Decrease `preserveOriginal`
- Increase `chromaticStrength` and `dispersionIntensity`

### Effect Too Intense
- Decrease `effectStrength`
- Increase `preserveOriginal`
- Reduce `chromaticStrength` and `glowIntensity`

### Colors Not Visible
- Increase `shimmerIntensity`
- Increase `spectrumSaturation`
- Check `spectrumHueRange` is large enough

### No Animation
- Verify `perfectLoop` is true
- Check animation mode is set
- Ensure totalFrames > 1

### Performance Issues
- Reduce image resolution
- Decrease `parallaxLayers`
- Simplify animation mode
- Use 'clamp' edge behavior instead of 'wrap'

## Conclusion

Holographic Prism is a powerful secondary effect that transforms ordinary layers into stunning holographic displays. With its multiple animation modes, extensive configuration options, and perfect loop support, it provides endless creative possibilities for NFT generation.

The effect respects transparency, maintains performance through efficient algorithms, and integrates seamlessly with the my-nft-gen framework. Whether you need subtle iridescent shimmer or intense prismatic explosions, Holographic Prism delivers professional-quality results.