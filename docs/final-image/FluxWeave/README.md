# 🌊 FluxWeave Effect

**Temporal Fabric Manipulation for NFT Generation**

Transform your images into living tapestries where reality's threads unravel and reweave themselves in hypnotic patterns. FluxWeave creates the illusion that your image is woven from flowing energy threads that undulate, braid, and phase-shift through color spectrums.

---

## ✨ Features

- 🌊 **Multi-frequency wave interference** - Complex organic patterns
- 🧭 **4 directional modes** - Horizontal, vertical, radial, diagonal
- 🧬 **Braiding algorithm** - Threads interweave like actual fabric
- 🌈 **Chromatic phase shifting** - RGB channel separation
- 💫 **Perfect loop animation** - Seamless infinite loops
- 🎨 **Configurable colors** - Tinting and hue rotation
- ⚡ **Pure deterministic** - Same inputs = same outputs
- 🎭 **4 blend modes** - Normal, screen, overlay, add

---

## 🚀 Quick Start

### Basic Usage

```javascript
import { FluxWeaveEffect, FluxWeaveConfig } from './FluxWeave/index.js';

// 1. Create configuration
const config = new FluxWeaveConfig({
  waveDirection: 'radial',
  waveAmplitude: 40,
  phaseShiftStrength: 25,
  braidCount: 4,
  tintColor: '#9966ff',
  blendMode: 'screen'
});

// 2. Create effect
const effect = new FluxWeaveEffect({ 
  config,
  settings: { width: 1920, height: 1080 }
});

// 3. Apply to layer
await effect.invoke(layer, frameNumber, totalFrames);
```

### Using Presets

```javascript
import { FluxWeaveEffect } from './FluxWeave/index.js';
import { PRESETS } from './FluxWeave/demo.js';

// Use a ready-made preset
const effect = new FluxWeaveEffect({ 
  config: PRESETS.cosmicLoom,
  settings: { width: 1920, height: 1080 }
});

await effect.invoke(layer, 0, 60); // Frame 0 of 60
```

---

## 🎨 Presets Gallery

### 1. **Silk Curtain** (Subtle)
Gentle horizontal waves with minimal color shift.
```javascript
PRESETS.silkCurtain
```
**Use for**: Elegant animations, subtle enhancement

### 2. **Cosmic Loom** (Balanced)
Radial braiding with moderate color separation.
```javascript
PRESETS.cosmicLoom
```
**Use for**: Psychedelic art, portal effects

### 3. **Prismatic Storm** (Intense)
Maximum displacement and color chaos.
```javascript
PRESETS.prismaticStorm
```
**Use for**: Intense visuals, glitch art

### 4. **DNA Helix** (Diagonal)
Tight diagonal braiding with pulsing.
```javascript
PRESETS.dnaHelix
```
**Use for**: Sci-fi aesthetics, organic patterns

### 5. **Aurora Flow** (Vertical)
Vertical waves with cyan/magenta shift.
```javascript
PRESETS.auroraFlow
```
**Use for**: Northern lights effect, ethereal visuals

### 6. **Quantum Fabric** (Fast)
High-frequency interference patterns.
```javascript
PRESETS.quantumFabric
```
**Use for**: Technical aesthetics, energy fields

### 7. **Meditation Weave** (Slow)
Hypnotic slow breathing with warm tint.
```javascript
PRESETS.meditationWeave
```
**Use for**: Calm visuals, meditation apps

### 8. **Glitch Fabric** (Sharp)
Digital aesthetic with turbulence.
```javascript
PRESETS.glitchFabric
```
**Use for**: Cyberpunk, digital art, VJ loops

---

## ⚙️ Configuration Parameters

### Wave Parameters

| Parameter | Type | Range | Default | Description |
|-----------|------|-------|---------|-------------|
| `waveFrequency1` | number | 0.001-0.1 | 0.02 | Primary wave density |
| `waveFrequency2` | number | 0.001-0.1 | 0.015 | Secondary wave density |
| `waveSpeed1` | number | 0-5 | 1.0 | Primary animation speed |
| `waveSpeed2` | number | 0-5 | 1.5 | Secondary animation speed |
| `waveAmplitude` | number | 0-200 | 30 | Displacement strength |
| `waveDirection` | string | enum | 'horizontal' | Flow direction |

**Wave Directions**:
- `'horizontal'` - Waves flow left-right
- `'vertical'` - Waves flow up-down
- `'radial'` - Waves emanate from center
- `'diagonal'` - Waves flow at 45° angle

### Flow Parameters

| Parameter | Type | Range | Default | Description |
|-----------|------|-------|---------|-------------|
| `flowAngle` | number | 0-360 | 0 | Direction of flow in degrees |
| `flowTurbulence` | number | 0-1 | 0.3 | Chaos in the flow |
| `braidCount` | number | 1-8 | 3 | Number of interweaving threads |
| `braidTightness` | number | 0-1 | 0.5 | How tightly braided |

### Color Parameters

| Parameter | Type | Range | Default | Description |
|-----------|------|-------|---------|-------------|
| `phaseShiftStrength` | number | 0-100 | 20 | Color separation intensity |
| `hueRotation` | number | 0-360 | 0 | Global hue shift in degrees |
| `tintColor` | string | hex | '#ffffff' | Overlay tint color |
| `tintStrength` | number | 0-1 | 0.2 | Tint opacity |

### Animation Parameters

| Parameter | Type | Range | Default | Description |
|-----------|------|-------|---------|-------------|
| `pulseIntensity` | number | 0-1 | 0.3 | Breathing effect strength |
| `pulseFrequency` | number | 0.5-4 | 1.0 | Breathing speed multiplier |
| `shimmerSpeed` | number | 0-5 | 1.0 | Color phase animation speed |

### Rendering Parameters

| Parameter | Type | Range | Default | Description |
|-----------|------|-------|---------|-------------|
| `blendMode` | string | enum | 'overlay' | How to blend with original |
| `layerOpacity` | number | 0-1 | 1.0 | Final layer opacity |

**Blend Modes**:
- `'normal'` - Standard alpha blending
- `'screen'` - Lightens, good for glows
- `'overlay'` - Contrast enhancement
- `'add'` - Additive blending, brightest

---

## 🎯 Use Cases

1. **Music Visualizers** - Waves sync to rhythm
2. **Psychedelic Art** - Flowing reality distortion
3. **Sci-Fi UI** - Energy field aesthetics
4. **Abstract NFTs** - Generative fabric patterns
5. **VJ Loops** - Perfect loops for performances
6. **Meditation Visuals** - Hypnotic flow patterns
7. **Album Art** - Prismatic wave aesthetics
8. **Game Effects** - Portal/warp transitions
9. **Fashion NFTs** - Literal fabric simulation
10. **Cosmic Art** - Aurora/nebula effects

---

## 🔧 Advanced Usage

### Custom Wave Patterns

```javascript
// Create complex interference patterns
const config = new FluxWeaveConfig({
  waveFrequency1: 0.03,  // High frequency
  waveFrequency2: 0.007, // Low frequency
  waveSpeed1: 2.0,       // Fast
  waveSpeed2: 0.5,       // Slow
  waveDirection: 'radial'
});
```

### Directional Flow Control

```javascript
// Rotate the entire flow pattern
const config = new FluxWeaveConfig({
  waveDirection: 'horizontal',
  flowAngle: 45, // Rotate 45 degrees
  flowTurbulence: 0.6 // Add chaos
});
```

### Color Manipulation

```javascript
// Create rainbow shimmer effect
const config = new FluxWeaveConfig({
  phaseShiftStrength: 50,  // Strong RGB separation
  hueRotation: 180,        // Shift hue
  shimmerSpeed: 2.5,       // Fast color animation
  tintColor: '#ff00ff',    // Magenta tint
  tintStrength: 0.3
});
```

### Breathing Animation

```javascript
// Slow hypnotic pulse
const config = new FluxWeaveConfig({
  pulseIntensity: 0.7,   // Strong breathing
  pulseFrequency: 0.5,   // Slow (half speed)
  waveAmplitude: 40      // Will pulse 40 ± 28
});
```

---

## 📊 Performance

### Benchmarks (1920×1080)

| Settings | Time/Frame | Quality | Use Case |
|----------|-----------|---------|----------|
| Low (amp: 15, braids: 2) | ~120ms | Fast | Real-time preview |
| Medium (amp: 30, braids: 4) | ~200ms | Balanced | Standard rendering |
| High (amp: 60, braids: 6) | ~350ms | Quality | Final output |

### Optimization Tips

1. **Lower amplitude** for faster rendering
2. **Reduce braid count** for simpler patterns
3. **Disable turbulence** (set to 0) for speed
4. **Use 'normal' blend mode** for fastest blending
5. **Lower resolution** for testing, full res for final

---

## 🧪 Serialization

FluxWeave configs are fully serializable for storage and transmission.

```javascript
// Serialize to JSON
const config = new FluxWeaveConfig({ waveAmplitude: 50 });
const json = JSON.stringify(config.serialize());

// Save to file
fs.writeFileSync('my-config.json', json);

// Load from file
const loaded = JSON.parse(fs.readFileSync('my-config.json'));
const restoredConfig = FluxWeaveConfig.deserialize(loaded);

// Configs are identical
console.log(restoredConfig.waveAmplitude); // 50
```

---

## 🎓 Tips & Tricks

### Creating Smooth Loops

The effect automatically creates perfect loops, but you can enhance them:

```javascript
// Ensure speeds are whole numbers for cleaner loops
const config = new FluxWeaveConfig({
  waveSpeed1: 1.0,  // ✓ Clean loop
  waveSpeed2: 2.0,  // ✓ Clean loop
  pulseFrequency: 1.0 // ✓ Clean loop
});
```

### Matching Music Tempo

```javascript
// For 120 BPM music at 30 FPS
const beatsPerSecond = 120 / 60; // 2 beats/sec
const framesPerBeat = 30 / beatsPerSecond; // 15 frames/beat

const config = new FluxWeaveConfig({
  pulseFrequency: 2.0, // Pulse twice per loop = on beat
  waveSpeed1: 1.0      // One wave cycle per loop
});
```

### Combining with Other Effects

```javascript
// Apply FluxWeave after VoidEcho for maximum psychedelia
await voidEchoEffect.invoke(layer, frame, total);
await fluxWeaveEffect.invoke(layer, frame, total);
```

### Direction Combinations

Each direction creates a unique aesthetic:
- **Horizontal** - Liquid curtains, flowing silk
- **Vertical** - Waterfalls, aurora borealis
- **Radial** - Portals, energy fields, explosions
- **Diagonal** - DNA helixes, twisted fabric

---

## 🐛 Troubleshooting

### Effect too subtle?
- Increase `waveAmplitude` (try 60-80)
- Increase `phaseShiftStrength` (try 40-60)
- Change `blendMode` to 'screen' or 'add'

### Effect too chaotic?
- Decrease `flowTurbulence` (try 0.1-0.3)
- Decrease `braidCount` (try 2-3)
- Use 'overlay' or 'normal' blend mode

### Colors look wrong?
- Check `tintColor` is valid hex
- Adjust `tintStrength` (0 = no tint)
- Try different `hueRotation` values

### Animation not smooth?
- Ensure `totalFrames` is consistent
- Use whole number speeds for cleaner loops
- Check frame rate matches playback rate

---

## 📚 See Also

- **ARCHITECTURE.md** - Technical deep dive
- **QUICKSTART.md** - 5-minute setup guide
- **demo.js** - All 8 presets with examples
- **VoidEcho** - Complementary spatial echo effect

---

## 🌊 Philosophy

> *"Reality is not solid - it's woven. FluxWeave reveals the threads."*

FluxWeave transforms static images into **living fabrics of flowing energy**, where:
- Pixels become threads
- Waves become looms
- Time becomes the weaver
- Reality becomes malleable

The fabric flows eternal. 🌊

---

**Created by Zencoder** | Version 1.0.0 | MIT License