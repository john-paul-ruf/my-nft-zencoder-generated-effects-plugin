# MetatronCube Effect - Technical Documentation

## Overview
MetatronCube is a primary visual effect that brings sacred geometry to life through the legendary Metatron's Cube pattern. This effect combines ancient mystical symbolism with modern animation techniques to create an overwhelmingly detailed, perfectly looping visual experience featuring inscribed runes, rotating Platonic solids, and flowing energy particles.

## Sacred Geometry Foundation

### Metatron's Cube
The foundation of this effect is Metatron's Cube - one of the most powerful symbols in sacred geometry. It consists of:
- **13 Spheres**: 1 central sphere + 6 inner hexagon + 6 outer hexagon
- **78 Connecting Lines**: All possible connections between the 13 spheres
- **Contains All Platonic Solids**: The five fundamental 3D shapes inscribed within

### The Five Platonic Solids
Each solid represents one of the classical elements:
1. **Tetrahedron** (Fire) - 4 vertices, 6 edges
2. **Cube/Hexahedron** (Earth) - 8 vertices, 12 edges
3. **Octahedron** (Air) - 6 vertices, 12 edges
4. **Icosahedron** (Water) - 12 vertices, 30 edges
5. **Dodecahedron** (Ether/Universe) - 20 vertices, 30 edges

### Flower of Life
An ancient symbol consisting of overlapping circles that form a flower-like pattern. This effect uses 19 circles arranged in the traditional pattern, creating the foundation for all sacred geometry.

## Architecture

### Core Principles (SOLID)
- **Single Responsibility**: Each geometric component (cube, solids, runes, particles) has dedicated generation and rendering methods
- **Open/Closed**: Extensible through configuration without modifying core logic
- **Dependency Inversion**: Effect depends on abstractions (LayerEffect, Canvas2d) not concrete implementations
- **Pure Functions**: All rendering is based on pre-generated immutable data
- **Immutable Data Pattern**: All geometry generated once in constructor, never modified

### Data Generation Pattern
```javascript
constructor() {
    super(...);
    this.#generate(settings); // Generate all data once
}

#generate(settings) {
    this.data = {
        // All pre-calculated values
        metatronCube: this.#generateMetatronCube(),
        flowerOfLife: this.#generateFlowerOfLife(),
        platonicSolids: this.#generatePlatonicSolids(),
        outerRunes: this.#generateOuterRunes(),
        innerGlyphs: this.#generateInnerGlyphs(),
        particles: this.#generateParticles(),
        energyPulses: this.#generateEnergyPulses(),
        centralMandala: this.#generateCentralMandala(),
    };
}
```

### Smooth Animation System
All animations use trigonometry and linear interpolation for buttery-smooth motion:

**Vertex Pulsing:**
```javascript
const pulseProgress = (progress * sphere.pulseFrequency + sphere.phaseOffset) % (Math.PI * 2);
const pulseScale = 1.0 + Math.sin(pulseProgress) * 0.2;
```

**Energy Line Pulses:**
```javascript
const pulseProgress = (progress * line.pulseSpeed + line.phaseOffset) % (Math.PI * 2);
const intensity = (Math.sin(pulseProgress) + 1) / 2; // 0 to 1
const color = blendColors(primaryColor, tertiaryColor, intensity);
```

**3D Rotation:**
```javascript
const angleX = progress * solid.rotationSpeed.x + solid.phaseOffset;
const angleY = progress * solid.rotationSpeed.y + solid.phaseOffset;
const angleZ = progress * solid.rotationSpeed.z + solid.phaseOffset;
const rotated = rotateVertex3D(vertex, angleX, angleY, angleZ);
const projected = project3DTo2D(rotated, centerX, centerY);
```

**Rune Rotation:**
```javascript
const rotation = progress * rotationSpeed;
const angle = rune.angle + rotation;
const x = centerX + Math.cos(angle) * radius;
const y = centerY + Math.sin(angle) * radius;
```

## Configuration Structure

### Core Geometry Parameters
- `cubeScale` (0.7): Size of Metatron's Cube relative to canvas (0-1)
- `sphereRadiusMin/Max` (8-12): Size range for the 13 spheres
- `lineWidth` (2): Width of connecting lines

### Platonic Solids Parameters
- `showPlatonicSolids` (true): Enable/disable 3D solids
- `solidScale` (0.4): Size of solids relative to cube
- `solidRotationSpeedMin/Max` (0.2-0.8): Rotation speed multipliers for X/Y/Z axes
- `solidWireframeWidth` (2): Width of solid edges
- `solidEdgeGlowMin/Max` (10-20): Glow intensity for edges
- `solidFaceOpacityMin/Max` (0.05-0.15): Opacity for solid faces (future feature)

### Flower of Life Parameters
- `showFlowerOfLife` (true): Enable/disable flower pattern
- `flowerCircleCount` (19): Number of overlapping circles
- `flowerBreathingSpeed` (0.5): Speed of breathing animation
- `flowerBreathingAmount` (0.05): Scale variation (0.95-1.05)
- `flowerOpacityMin/Max` (0.2-0.4): Opacity range for circles

### Outer Runes Parameters
- `outerRuneCount` (12): Number of runes in outer circle
- `outerRuneRotationSpeed` (0.3): Clockwise rotation speed
- `outerRuneRadius` (0.85): Distance from center (relative to cube)
- `outerRuneSize` (24): Font size for runes
- `outerRuneOpacityMin/Max` (0.4-0.9): Opacity range with pulsing

### Inner Glyphs Parameters
- `innerGlyphCount` (8): Number of glyphs in inner circle
- `innerGlyphRotationSpeed` (-0.6): Counter-clockwise rotation speed
- `innerGlyphRadius` (0.25): Distance from center (relative to cube)
- `innerGlyphSize` (20): Font size for glyphs
- `innerGlyphOpacityMin/Max` (0.5-1.0): Opacity range with pulsing

### Energy Particles Parameters
- `particleCount` (150): Number of particles flowing through cube
- `particleSpeedMin/Max` (0.5-1.5): Movement speed multipliers
- `particleSizeMin/Max` (2-6): Particle radius range
- `particleGlowMin/Max` (6-12): Glow effect radius
- `particleTrailLength` (5): Length of particle trails (future feature)

### Energy Pulses Parameters
- `energyPulseCount` (24): Number of energy pulses on lines
- `energyPulseSpeedMin/Max` (0.8-1.2): Pulse movement speed
- `energyPulseWidthMin/Max` (3-6): Pulse circle radius

### Vertex Effects Parameters
- `vertexGlowRadiusMin/Max` (8-16): Glow radius for sphere vertices
- `vertexPulseFrequencyMin/Max` (0.3-0.7): Pulsing frequency

### Central Mandala Parameters
- `showCentralMandala` (true): Enable/disable central mandala
- `mandalaRotationSpeed` (0.1): Rotation speed
- `mandalaLayers` (3): Number of concentric layers
- `mandalaPetalCount` (12): Petals per layer
- `mandalaOpacityMin/Max` (0.3-0.6): Opacity range

### Visual Effects Parameters
- `glowIntensityMin/Max` (15-30): Overall glow strength
- `blurAmountMin/Max` (0-3): Blur filter amount (0 = no blur)

### Color Configuration
All colors use ColorPicker for dynamic selection:
- `primaryColor`: Main geometry color (Metatron's Cube lines and spheres)
- `secondaryColor`: Accent color (Flower of Life, Platonic Solids)
- `tertiaryColor`: Energy color (pulses, highlights)
- `runeColor`: Symbol color (runes and glyphs)
- `particleColor`: Particle visualization color
- `glowColor`: Glow effect color
- `backgroundGradientStart`: Radial gradient center color
- `backgroundGradientEnd`: Radial gradient edge color

### Animation Parameters
- `perfectLoop` (true): Enable smooth looping animations
- `masterRotationSpeed` (0.2): Overall rotation speed multiplier

### Layer Composition
- `layerOpacity` (1.0): Overall effect opacity
- `layerBlendMode` ('screen'): Blend mode for compositing

## Component Details

### Metatron's Cube Structure
- **13 Spheres**: Arranged in hexagonal pattern (1 center + 2 hexagons)
- **78 Lines**: All possible connections between spheres
- **Pulsing Vertices**: Each sphere pulses independently with sine waves
- **Energy Flow**: Lines pulse with color blending between primary and tertiary colors
- **Phase Offsets**: Random offsets prevent synchronized pulsing

### Platonic Solids System
- **3D Vertices**: Each solid defined by 3D coordinates
- **Golden Ratio**: Icosahedron and Dodecahedron use φ (phi) = 1.618...
- **3D Rotation**: Independent X/Y/Z rotation for each solid
- **2D Projection**: Perspective projection with depth-based opacity
- **Wireframe Rendering**: Edges drawn with glow effects
- **Depth Sorting**: Closer edges appear more opaque

### Flower of Life Pattern
- **19 Circles**: Traditional sacred geometry arrangement
- **Breathing Animation**: Smooth scale pulsing (0.95-1.05)
- **Phase-Offset Opacity**: Each circle pulses at different phase
- **Gradient Strokes**: Circles drawn with secondary color

### Rune & Glyph System
- **Outer Runes**: 12 Elder Futhark runes rotating clockwise
  - ᚠ (Fehu), ᚢ (Uruz), ᚦ (Thurisaz), ᚨ (Ansuz), ᚱ (Raidho), ᚲ (Kenaz)
  - ᚷ (Gebo), ᚹ (Wunjo), ᚺ (Hagalaz), ᚾ (Nauthiz), ᛁ (Isa), ᛃ (Jera)
- **Inner Glyphs**: 8 alchemical/planetary symbols rotating counter-clockwise
  - ☿ (Mercury), ♀ (Venus), ♁ (Earth), ♂ (Mars)
  - ♃ (Jupiter), ♄ (Saturn), ☉ (Sun), ☽ (Moon)
- **Opacity Pulsing**: Symbols fade in/out with sine waves
- **Circular Arrangement**: Evenly distributed around center

### Energy Particle System
- **Line Assignment**: Each particle assigned to one of 78 cube lines
- **Linear Movement**: Smooth interpolation along line path
- **Speed Variation**: Different speeds create visual interest
- **Glow Effects**: Each particle has configurable glow radius
- **Perfect Looping**: Particles wrap seamlessly at line ends

### Energy Pulse System
- **Wave Propagation**: Pulses travel along cube lines
- **Glowing Circles**: Rendered as bright circles with intense glow
- **Speed Variation**: Different pulse speeds for organic feel
- **Phase Offsets**: Staggered start times prevent synchronization

### Central Mandala
- **Layered Structure**: Multiple concentric layers of petals
- **Rotation**: Slow rotation with layer-specific offsets
- **Petal Circles**: Small circles arranged in flower pattern
- **Opacity Variation**: Each petal pulses independently

## Animation Techniques

### Perfect Looping
- All animations use modulo arithmetic for seamless loops
- Sine waves naturally complete cycles over frame count
- Linear animations wrap using `(currentFrame + offset) % numberOfFrames`
- No discontinuities at loop points
- All rotation speeds calculated to complete integer cycles

### Smooth Motion Principles
1. **Direct Trigonometry**: Using `Math.sin()` and `Math.cos()` for natural motion
2. **Phase Offsets**: Stagger animations using random offsets (0 to 2π)
3. **Linear Interpolation**: Simple division for progress calculations
4. **Modulo Wrapping**: Clean loop points with remainder operator
5. **Independent Frequencies**: Each element has unique animation speed

### 3D Rotation Mathematics
```javascript
// Rotate around X axis
y' = y * cos(θ) - z * sin(θ)
z' = y * sin(θ) + z * cos(θ)

// Rotate around Y axis
x' = x * cos(θ) + z * sin(θ)
z' = -x * sin(θ) + z * cos(θ)

// Rotate around Z axis
x' = x * cos(θ) - y * sin(θ)
y' = x * sin(θ) + y * cos(θ)

// Perspective projection
scale = focalLength / (focalLength + z)
screenX = centerX + x * scale
screenY = centerY + y * scale
```

### Performance Optimizations
- **Pre-calculated Geometry**: All vertices and paths generated once at initialization
- **Immutable Data Structure**: No runtime data generation
- **Conditional Rendering**: Skip invisible elements (opacity < 0.01)
- **Efficient Color Operations**: Hex color blending and opacity application
- **Normalized Vertices**: All 3D vertices normalized to unit sphere, then scaled

## Canvas Rendering

### Drawing Methods Used
- `canvas.drawPath()`: For lines, circles, and geometric shapes
- `canvas.drawText()`: For runes and glyphs
- `canvas.blur()`: Post-processing blur effect
- `canvas.opacity()`: Layer-level opacity adjustment

### Render Order (Back to Front)
1. **Background**: Radial gradient (dark blue to black)
2. **Flower of Life**: Breathing circles with secondary color
3. **Metatron's Cube Lines**: 78 connecting lines with energy pulses
4. **Platonic Solids**: 3D wireframe shapes
5. **Energy Pulses**: Bright circles traveling along lines
6. **Particles**: Small glowing circles flowing through cube
7. **Metatron's Cube Spheres**: 13 pulsing vertices
8. **Outer Runes**: 12 rotating Elder Futhark symbols
9. **Inner Glyphs**: 8 rotating alchemical symbols
10. **Central Mandala**: Layered petal pattern

## Usage Examples

### Basic Usage
```javascript
import { MetatronCubeEffect } from './MetatronCubeEffect.js';
import { MetatronCubeConfig } from './MetatronCubeConfig.js';

const config = new MetatronCubeConfig({
    cubeScale: 0.7,
    particleCount: 150,
    perfectLoop: true,
});

const effect = new MetatronCubeEffect({
    config,
    settings,
});

await effect.invoke(layer, currentFrame, totalFrames);
```

### Custom Color Scheme (Mystical Purple/Gold)
```javascript
const config = new MetatronCubeConfig({
    primaryColor: new ColorPicker(ColorPicker.SelectionType.color, '#9D4EDD'),
    secondaryColor: new ColorPicker(ColorPicker.SelectionType.color, '#FFD700'),
    tertiaryColor: new ColorPicker(ColorPicker.SelectionType.color, '#FF6B9D'),
    runeColor: new ColorPicker(ColorPicker.SelectionType.color, '#FFFFFF'),
    particleColor: new ColorPicker(ColorPicker.SelectionType.color, '#00FFFF'),
    backgroundGradientStart: new ColorPicker(ColorPicker.SelectionType.color, '#1A0033'),
    backgroundGradientEnd: new ColorPicker(ColorPicker.SelectionType.color, '#000000'),
});
```

### High-Detail Configuration
```javascript
const config = new MetatronCubeConfig({
    particleCount: 300,
    energyPulseCount: 48,
    outerRuneCount: 24,
    innerGlyphCount: 12,
    mandalaLayers: 5,
    mandalaPetalCount: 16,
    glowIntensityMin: 25,
    glowIntensityMax: 40,
});
```

### Minimal Sacred Geometry
```javascript
const config = new MetatronCubeConfig({
    showPlatonicSolids: false,
    showFlowerOfLife: false,
    showCentralMandala: false,
    particleCount: 50,
    energyPulseCount: 12,
    outerRuneCount: 6,
    innerGlyphCount: 0,
});
```

### Fast Rotation Speed
```javascript
const config = new MetatronCubeConfig({
    masterRotationSpeed: 0.5,
    outerRuneRotationSpeed: 0.8,
    innerGlyphRotationSpeed: -1.2,
    solidRotationSpeedMin: 0.5,
    solidRotationSpeedMax: 1.5,
    mandalaRotationSpeed: 0.3,
});
```

## Technical Notes

### Browser Compatibility
- ES6+ modules required
- Canvas 2D context
- Unicode support for runes and glyphs
- No external dependencies beyond my-nft-gen framework

### Performance Characteristics
- O(n) rendering complexity
- ~60 FPS on modern hardware with default settings
- Memory usage proportional to element count
- Canvas size: Automatically scales to fit any resolution
- 3D calculations: Minimal overhead with pre-normalized vertices

### Best Practices
1. Keep particle counts reasonable for smooth animation (50-300)
2. Use `perfectLoop: true` for seamless GIF/video exports
3. Test with various frame counts (60, 120, 240)
4. Adjust blur amount carefully (0 = disabled, requires >= 0.3 for visible effect)
5. Balance glow intensity with particle/element counts
6. Use color buckets for dynamic color schemes
7. Experiment with rotation speeds for different moods

### Known Limitations
- Text rendering for runes/glyphs depends on Canvas2d text support
- Particle trails not yet implemented (future feature)
- Solid face rendering not yet implemented (wireframe only)
- No collision detection between particles
- Fixed focal length for 3D projection (500 units)

### Sacred Geometry Accuracy
- Metatron's Cube: Mathematically accurate 13-sphere pattern
- Platonic Solids: Precise vertex coordinates using golden ratio
- Flower of Life: Traditional 19-circle arrangement
- Runes: Authentic Elder Futhark symbols
- Alchemical Symbols: Classical planetary glyphs

## Mystical Symbolism

### Metatron's Cube Meaning
- **Archangel Metatron**: Celestial scribe and guardian of sacred knowledge
- **Creation Pattern**: Contains blueprints for all physical forms
- **Balance**: Represents harmony between physical and spiritual realms
- **Protection**: Used as a powerful protective symbol

### Platonic Solids Elements
- **Tetrahedron (Fire)**: Transformation, passion, energy
- **Cube (Earth)**: Stability, grounding, manifestation
- **Octahedron (Air)**: Intellect, communication, breath
- **Icosahedron (Water)**: Emotion, flow, adaptability
- **Dodecahedron (Ether)**: Universe, consciousness, spirit

### Rune Meanings (Elder Futhark)
- **ᚠ Fehu**: Wealth, abundance, new beginnings
- **ᚢ Uruz**: Strength, vitality, primal power
- **ᚦ Thurisaz**: Protection, gateway, transformation
- **ᚨ Ansuz**: Communication, wisdom, divine inspiration
- **ᚱ Raidho**: Journey, movement, rhythm
- **ᚲ Kenaz**: Knowledge, creativity, illumination
- **ᚷ Gebo**: Gift, partnership, balance
- **ᚹ Wunjo**: Joy, harmony, perfection
- **ᚺ Hagalaz**: Disruption, change, awakening
- **ᚾ Nauthiz**: Need, resistance, growth
- **ᛁ Isa**: Ice, stillness, clarity
- **ᛃ Jera**: Harvest, cycles, completion

### Alchemical Symbols
- **☿ Mercury**: Transformation, fluidity, communication
- **♀ Venus**: Love, beauty, harmony
- **♁ Earth**: Grounding, manifestation, physical realm
- **♂ Mars**: Action, courage, willpower
- **♃ Jupiter**: Expansion, wisdom, abundance
- **♄ Saturn**: Structure, discipline, time
- **☉ Sun**: Consciousness, vitality, divine masculine
- **☽ Moon**: Intuition, emotion, divine feminine

## Conclusion
MetatronCube provides an overwhelmingly detailed sacred geometry effect that combines ancient mystical symbolism with modern animation techniques. Its multi-layered approach creates visual depth that rewards close inspection, while smooth mathematical animations ensure perfect loops for meditation, NFT art, or spiritual visualization. This is digital alchemy at its finest - transforming code into sacred art.

---

*"As above, so below. As within, so without. As the universe, so the soul."*  
— Hermes Trismegistus