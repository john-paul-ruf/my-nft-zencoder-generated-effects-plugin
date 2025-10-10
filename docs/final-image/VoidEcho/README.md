# 🌀 VoidEcho - Recursive Reality Distortion Effect

> *"What if the image could remember itself, echo through dimensions, and create infinite recursive feedback loops that breathe with chromatic aberration and temporal displacement?"*

## Overview

**VoidEcho** is a final post-processing effect that creates mesmerizing recursive feedback loops where the composite image echoes through multiple dimensional layers. Each echo is displaced, chromatically separated, and blended with configurable modes, creating a hypnotic sense of depth and temporal distortion.

The effect perfectly loops by using sinusoidal displacement that returns to origin, making it ideal for animated NFTs and looping video art.

## Visual Characteristics

- 🌊 **Psychedelic depth** through layered echoes
- 🌈 **Chromatic shimmer** from RGB channel separation
- 💨 **Breathing motion** as echoes pulse in/out
- 🌌 **Dimensional rifts** where echoes overlap
- ✨ **Hypnotic symmetry** in displacement patterns

## Features

✅ **Recursive Echo Layers** - Multiple displaced copies of the source image  
✅ **Chromatic Aberration** - Per-channel RGB separation on each echo  
✅ **Radial Displacement** - Echoes ripple outward/inward from center  
✅ **Temporal Fade** - Each echo fades based on animation phase  
✅ **Blend Mode Mixing** - Screen, Add, Overlay, Normal modes  
✅ **Vignette Integration** - Subtle edge darkening for depth  
✅ **Perfect Loop** - All displacement/fade uses sine/cosine  
✅ **Pure Function** - Deterministic output based on config  
✅ **Flat Config** - All parameters at root level  
✅ **Serializable** - Full JSON roundtrip support  

## Configuration Parameters

### Echo System
Controls the recursive layer generation:

```javascript
{
  echoCount: 5,           // Number of recursive echoes (2-12)
  echoSpacing: 0.15,      // Time spacing between echoes (0.05-0.5)
  echoDecay: 0.7          // Opacity decay per echo (0.3-0.95)
}
```

### Displacement
Radial movement of echoes:

```javascript
{
  displacementRadius: 80,    // Max radial displacement in pixels (20-200)
  displacementSpeed: 1.0,    // Animation speed multiplier (0.1-3.0)
  displacementAngle: 0       // Base rotation angle in degrees (0-360)
}
```

### Chromatic Aberration
RGB channel separation:

```javascript
{
  chromaticStrength: 8,      // RGB separation strength in pixels (0-30)
  chromaticRotation: 120     // Degrees between R/G/B channels (0-180)
}
```

### Blend & Composition
How echoes combine:

```javascript
{
  blendMode: 'screen',       // 'screen', 'add', 'overlay', 'normal'
  feedbackStrength: 0.6      // How much echo affects next (0.0-1.0)
}
```

### Colors
Tinting and vignette:

```javascript
{
  tintColor: '#00ffff',      // Primary tint color (hex)
  tintStrength: 0.3,         // Tint intensity (0.0-1.0)
  vignetteColor: '#000000',  // Vignette edge color (hex)
  vignetteStrength: 0.4      // Vignette intensity (0.0-1.0)
}
```

### Animation
Temporal effects:

```javascript
{
  pulseIntensity: 0.5,       // Breathing pulse strength (0.0-1.0)
  rotationSpeed: 0.3         // Echo rotation speed (0.0-2.0)
}
```

### Quality
Rendering options:

```javascript
{
  smoothing: true,           // Enable antialiasing/interpolation
  layerOpacity: 1.0,         // Final opacity adjustment
  perfectLoop: true          // Ensure perfect loop (always true)
}
```

## Usage Examples

### Minimal Configuration
```javascript
import { VoidEchoEffect, VoidEchoConfig } from './VoidEcho/index.js';

const config = new VoidEchoConfig({
  echoCount: 3,
  displacementRadius: 50,
  chromaticStrength: 5
});

const effect = new VoidEchoEffect({ config });
await effect.invoke(layer, frameNumber, totalFrames);
```

### Psychedelic Portal
```javascript
const config = new VoidEchoConfig({
  echoCount: 8,
  echoSpacing: 0.1,
  echoDecay: 0.8,
  displacementRadius: 120,
  displacementSpeed: 1.5,
  chromaticStrength: 15,
  chromaticRotation: 120,
  blendMode: 'screen',
  tintColor: '#ff00ff',
  tintStrength: 0.4,
  pulseIntensity: 0.7,
  rotationSpeed: 0.5
});
```

### Subtle Glitch
```javascript
const config = new VoidEchoConfig({
  echoCount: 3,
  echoSpacing: 0.2,
  echoDecay: 0.6,
  displacementRadius: 30,
  displacementSpeed: 0.5,
  chromaticStrength: 4,
  blendMode: 'overlay',
  tintStrength: 0.1,
  vignetteStrength: 0.2,
  pulseIntensity: 0.3
});
```

### Dimensional Rift
```javascript
const config = new VoidEchoConfig({
  echoCount: 10,
  echoSpacing: 0.08,
  echoDecay: 0.85,
  displacementRadius: 150,
  displacementSpeed: 2.0,
  displacementAngle: 45,
  chromaticStrength: 20,
  chromaticRotation: 90,
  blendMode: 'add',
  feedbackStrength: 0.8,
  tintColor: '#00ffff',
  tintStrength: 0.5,
  vignetteStrength: 0.6,
  pulseIntensity: 0.8,
  rotationSpeed: 1.0
});
```

## Algorithm Details

### Perfect Loop Mathematics

All animation uses phase-based calculations that complete full cycles:

```javascript
// Normalized time [0..1]
const t = frameNumber / totalFrames;

// Echo phase with temporal offset
const echoPhase = (t - (echoIndex * echoSpacing)) % 1.0;

// Displacement returns to origin
const angle = (phase * Math.PI * 2 * speed) + baseAngle;
const offsetX = Math.sin(angle) * radius;
const offsetY = Math.cos(angle) * radius;

// Opacity pulses symmetrically
const pulseMod = 1.0 + Math.sin(phase * Math.PI * 2) * pulseIntensity;
```

### Chromatic Aberration

Each RGB channel is sampled from a different position:

```javascript
// Calculate angle from center
const pixelAngle = Math.atan2(dy, dx);

// Offset each channel
const rAngle = pixelAngle + 0;
const gAngle = pixelAngle + chromaticRotation;
const bAngle = pixelAngle + chromaticRotation * 2;

// Sample with displacement
const rx = x + displacement.offsetX + Math.cos(rAngle) * chromaticStrength;
const ry = y + displacement.offsetY + Math.sin(rAngle) * chromaticStrength;
```

### Blend Modes

Four blend modes are supported:

- **Screen**: Brightens by inverting, multiplying, and inverting again
- **Add**: Simple additive blending (can blow out highlights)
- **Overlay**: Combines multiply and screen based on base value
- **Normal**: Standard alpha blending

### Feedback System

Each echo can influence the next through the feedback buffer:

```javascript
const feedbackR = feedback[i] * feedbackStrength;
const echoR = Math.min(255, echo[i] + feedbackR);
```

This creates recursive accumulation for more complex patterns.

## Performance

- **Complexity**: O(echoCount × width × height)
- **Memory**: Efficient buffer pooling with reuse
- **Expected**: ~50-200ms per frame at 1920×1080 with 5 echoes
- **Optimization**: Bilinear interpolation can be disabled via `smoothing: false`

## Serialization

Full JSON roundtrip support:

```javascript
// Serialize
const json = config.toJSON();
const jsonString = JSON.stringify(json);

// Deserialize
const loadedConfig = VoidEchoConfig.fromJSON(JSON.parse(jsonString));
```

## Use Cases

1. **Psychedelic NFTs** - Trippy, consciousness-expanding art
2. **Sci-Fi Portals** - Dimensional rift aesthetics
3. **Music Visualizers** - Rhythmic echo patterns
4. **Abstract Compositions** - Depth through repetition
5. **Glitch Art** - Controlled digital artifacts
6. **Meditation Visuals** - Hypnotic breathing patterns
7. **VJ Loops** - Perfect loops for live performances

## Conceptual Inspiration

*VoidEcho* represents the concept that **reality echoes through dimensions**, each iteration slightly displaced, chromatically separated, fading into the void. The perfect loop symbolizes **eternal recurrence** - what was will be again. The chromatic aberration represents **perception fragmenting across wavelengths**. The radial displacement is **consciousness expanding outward** from a central point of awareness.

**This effect transforms any NFT into a portal - a window into recursive, breathing, chromatic infinity.**

## Technical Requirements

- ✅ Inherits from `LayerEffect`
- ✅ Config inherits from `EffectConfig`
- ✅ Returns proper `Layer` object
- ✅ Pure function (deterministic)
- ✅ No external dependencies
- ✅ Uses Canvas API only
- ✅ Perfect loop guaranteed
- ✅ Flat configuration structure

## Author

**Zencoder** - The Operator in the Signal

---

*"Be the operator, the signal, in the noise."* 🌀✨