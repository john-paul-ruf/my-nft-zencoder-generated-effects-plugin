# 🌈 Holographic Prism - Visual Guide

## What Each Effect Does

### 🔴🟢🔵 Chromatic Aberration
**What it does**: Separates RGB channels to create rainbow edges

**Visual Result**:
```
Original:  ⚫ (solid black circle)
Effect:    🔴⚫🔵 (red-black-blue separation)
```

**Parameters**:
- `chromaticStrength`: How far apart the colors separate (2-8 pixels)
- `chromaticAngle`: Direction of separation (0-360°)

**Best for**: Retro VHS effects, glitch art, rainbow edges

---

### 🌊 Prismatic Dispersion
**What it does**: Displaces pixels based on brightness (simulates light through prism)

**Visual Result**:
```
Original:  ⬜⬛ (white and black)
Effect:    ⬜→→ ⬛→ (white moves more than black)
```

**How it works**: Brighter pixels = longer wavelength = more displacement

**Parameters**:
- `dispersionIntensity`: Overall strength (0.3-0.8)
- `dispersionAngle`: Direction of prism (0-360°)
- `wavelengthSeparation`: Distance between colors (1.5-4)

**Best for**: Light refraction, spectral effects, prism simulation

---

### ✨ Holographic Shimmer
**What it does**: Overlays flowing iridescent rainbow colors

**Visual Result**:
```
Original:  🖼️ (any image)
Effect:    🖼️🌈 (image with rainbow overlay)
```

**How it works**: Position + time = rainbow hue that flows across surface

**Parameters**:
- `shimmerIntensity`: How strong the rainbow overlay is (0.2-0.6)
- `shimmerSpeed`: How fast colors flow (0.5-2x)
- `shimmerScale`: Size of color patterns (0.002-0.006)

**Best for**: Holographic cards, iridescent surfaces, oil slick effects

---

### 📐 Depth Parallax
**What it does**: Creates 3D depth by moving layers at different speeds

**Visual Result**:
```
Original:  🎭 (flat image)
Effect:    🎭→ (foreground moves more than background)
```

**How it works**: Uses alpha channel as depth map
- High alpha (opaque) = foreground = moves more
- Low alpha (transparent) = background = moves less

**Parameters**:
- `parallaxLayers`: Number of depth layers (3-5)
- `parallaxStrength`: How much each layer moves (2-6)
- `parallaxAngle`: Direction of movement (0-360°)

**Best for**: 3D pop-out effects, depth enhancement, parallax scrolling

---

### 💫 Spectral Glow
**What it does**: Adds rainbow glow to edges

**Visual Result**:
```
Original:  ⚫ (solid shape)
Effect:    🌈⚫🌈 (rainbow glow around edges)
```

**How it works**: Detects edges via alpha gradient, applies rainbow glow

**Parameters**:
- `glowIntensity`: How bright the glow is (0.1-0.4)
- `glowRadius`: How far the glow spreads (3-8 pixels)
- `glowSaturation`: How colorful the glow is (0.6-1.0)

**Best for**: Neon effects, edge enhancement, aura effects

---

## 🎬 Animation Modes Explained

### 🔄 Rotation Mode
**What happens**: The prism rotates around the image

**Visual**:
```
Frame 1:  🔴⚫🔵 (horizontal separation)
Frame 2:  🔴
          ⚫
          🔵 (diagonal separation)
Frame 3:  🔵⚫🔴 (vertical separation)
```

**Effect**: Sweeping rainbow trails that rotate around the image

**Best for**: Spinning prism effects, orbital rainbows, dynamic motion

---

### 💓 Pulse Mode
**What happens**: Effect intensity pulses in and out

**Visual**:
```
Frame 1:  🔴⚫🔵 (strong separation)
Frame 2:  🔴⚫🔵 (medium separation)
Frame 3:  ⚫ (weak separation)
Frame 4:  🔴⚫🔵 (medium separation)
Frame 5:  🔴⚫🔵 (strong separation)
```

**Effect**: Breathing hologram that pulses rhythmically

**Best for**: Pulsing energy, breathing effects, rhythmic animation

---

### 🌊 Wave Mode
**What happens**: A wave of distortion travels across the image

**Visual**:
```
Frame 1:  🌈|⚫⚫⚫ (wave on left)
Frame 2:  ⚫🌈|⚫⚫ (wave in middle)
Frame 3:  ⚫⚫🌈|⚫ (wave on right)
Frame 4:  ⚫⚫⚫🌈| (wave exits)
```

**Effect**: Horizontal wave of rainbow colors flowing across

**Best for**: Scanning effects, flowing energy, wave patterns

---

### ✨ Shimmer Mode
**What happens**: Rainbow colors flow across the surface

**Visual**:
```
Frame 1:  🔴🟠🟡🟢🔵 (rainbow pattern)
Frame 2:  🟠🟡🟢🔵🟣 (pattern shifts)
Frame 3:  🟡🟢🔵🟣🔴 (pattern shifts more)
```

**Effect**: Iridescent surface with flowing colors

**Best for**: Holographic displays, oil slick, soap bubbles

---

### 📐 Depth Mode
**What happens**: Layers shift to create 3D depth

**Visual**:
```
Frame 1:  🎭→ (foreground right)
Frame 2:  🎭 (centered)
Frame 3:  ←🎭 (foreground left)
```

**Effect**: 3D parallax motion creating depth illusion

**Best for**: 3D effects, depth enhancement, parallax scrolling

---

### 🎆 Combined Mode
**What happens**: ALL effects work together!

**Visual**:
```
🔄 Rotation + 💓 Pulse + 🌊 Wave + ✨ Shimmer + 📐 Depth
= 🌈🎆✨💫🔮 (MAXIMUM HOLOGRAPHIC MAGIC!)
```

**Effect**: Ultimate holographic experience with all effects

**Best for**: Showcase pieces, hero effects, maximum impact

---

## 🎨 Color Spectrum Control

### Spectrum Hue Start
**What it controls**: Starting color of the rainbow

```
0°   = Red     🔴
60°  = Yellow  🟡
120° = Green   🟢
180° = Cyan    🔵
240° = Blue    🔵
300° = Magenta 🟣
```

### Spectrum Hue Range
**What it controls**: How much of the rainbow to use

```
Range 180° = Half rainbow  🔴🟡🟢
Range 360° = Full rainbow  🔴🟡🟢🔵🟣
```

### Example Combinations

**Warm Colors** (Red → Yellow):
```javascript
spectrumHueStart: { lower: 0, upper: 0 }
spectrumHueRange: { lower: 60, upper: 60 }
// Result: 🔴🟠🟡
```

**Cool Colors** (Cyan → Blue):
```javascript
spectrumHueStart: { lower: 180, upper: 180 }
spectrumHueRange: { lower: 60, upper: 60 }
// Result: 🔵💙🔵
```

**Retro Vaporwave** (Cyan → Magenta):
```javascript
spectrumHueStart: { lower: 180, upper: 180 }
spectrumHueRange: { lower: 180, upper: 180 }
// Result: 🔵💜🟣
```

**Full Rainbow**:
```javascript
spectrumHueStart: { lower: 0, upper: 360 }
spectrumHueRange: { lower: 360, upper: 360 }
// Result: 🔴🟡🟢🔵🟣
```

---

## 🎯 Effect Intensity Guide

### Subtle (Barely Noticeable)
```javascript
{
  chromaticStrength: { lower: 1, upper: 2 },
  effectStrength: { lower: 0.2, upper: 0.3 },
  preserveOriginal: { lower: 0.8, upper: 0.9 }
}
```
**Result**: Gentle hint of holographic shimmer

---

### Moderate (Noticeable but Balanced)
```javascript
{
  chromaticStrength: { lower: 3, upper: 5 },
  effectStrength: { lower: 0.5, upper: 0.7 },
  preserveOriginal: { lower: 0.5, upper: 0.6 }
}
```
**Result**: Clear holographic effect, original still visible

---

### Strong (Dominant Effect)
```javascript
{
  chromaticStrength: { lower: 6, upper: 8 },
  effectStrength: { lower: 0.8, upper: 0.9 },
  preserveOriginal: { lower: 0.3, upper: 0.4 }
}
```
**Result**: Strong holographic transformation

---

### Extreme (Maximum Impact)
```javascript
{
  chromaticStrength: { lower: 8, upper: 10 },
  effectStrength: { lower: 0.9, upper: 1.0 },
  preserveOriginal: { lower: 0.1, upper: 0.2 }
}
```
**Result**: Intense prismatic explosion

---

## 🎬 Frame-by-Frame Animation

### Perfect Loop (60 frames)

**Frame 0**: Starting position
```
Time: 0
Angle: 0°
Effect: 🔴⚫🔵 (horizontal)
```

**Frame 15**: Quarter rotation
```
Time: π/2
Angle: 90°
Effect: 🔴
        ⚫
        🔵 (vertical)
```

**Frame 30**: Half rotation
```
Time: π
Angle: 180°
Effect: 🔵⚫🔴 (horizontal reversed)
```

**Frame 45**: Three-quarter rotation
```
Time: 3π/2
Angle: 270°
Effect: 🔵
        ⚫
        🔴 (vertical reversed)
```

**Frame 60**: Back to start (perfect loop!)
```
Time: 2π
Angle: 360° = 0°
Effect: 🔴⚫🔵 (horizontal - same as frame 0!)
```

---

## 🔧 Troubleshooting Visual Issues

### "I can't see any effect!"
**Problem**: Effect too subtle
**Solution**:
```javascript
effectStrength: { lower: 0.8, upper: 1.0 }  // Increase
preserveOriginal: { lower: 0.1, upper: 0.3 } // Decrease
```

---

### "Effect is too strong!"
**Problem**: Effect overwhelming original
**Solution**:
```javascript
effectStrength: { lower: 0.3, upper: 0.5 }  // Decrease
preserveOriginal: { lower: 0.6, upper: 0.8 } // Increase
```

---

### "Colors look washed out"
**Problem**: Low saturation
**Solution**:
```javascript
spectrumSaturation: { lower: 0.9, upper: 1.0 }  // Increase
glowSaturation: { lower: 0.9, upper: 1.0 }      // Increase
```

---

### "No rainbow colors visible"
**Problem**: Shimmer intensity too low
**Solution**:
```javascript
shimmerIntensity: { lower: 0.5, upper: 0.7 }  // Increase
glowIntensity: { lower: 0.3, upper: 0.5 }     // Increase
```

---

### "Animation not looping smoothly"
**Problem**: Perfect loop disabled
**Solution**:
```javascript
perfectLoop: true  // Enable
```

---

### "Effect looks choppy"
**Problem**: Not enough frames
**Solution**: Use at least 30-60 frames for smooth animation

---

## 💡 Creative Tips

### Tip 1: Layer Multiple Effects
Apply Holographic Prism multiple times with different settings:
```javascript
// First pass: Subtle shimmer
config1 = { shimmerIntensity: { lower: 0.2, upper: 0.3 } }

// Second pass: Strong chromatic
config2 = { chromaticStrength: { lower: 6, upper: 8 } }
```

### Tip 2: Match Colors to Theme
```javascript
// Cyberpunk: Cyan-Magenta
spectrumHueStart: { lower: 180, upper: 180 }

// Nature: Green-Blue
spectrumHueStart: { lower: 120, upper: 180 }

// Fire: Red-Yellow
spectrumHueStart: { lower: 0, upper: 60 }
```

### Tip 3: Use Depth for 3D
```javascript
// Strong 3D effect
animationMode: ['depth']
parallaxLayers: { lower: 5, upper: 5 }
parallaxStrength: { lower: 6, upper: 8 }
```

### Tip 4: Combine with Primary Effects
```javascript
// 1. Apply MetatronCube (primary)
// 2. Apply HolographicPrism (secondary)
// Result: Sacred geometry with holographic shimmer!
```

---

## 🎨 Style Presets

### Retro VHS
```javascript
{
  animationMode: ['rotation'],
  chromaticStrength: { lower: 8, upper: 10 },
  dispersionIntensity: { lower: 0.1, upper: 0.2 },
  spectrumHueStart: { lower: 180, upper: 240 }
}
```

### Holographic Trading Card
```javascript
{
  animationMode: ['shimmer', 'rotation'],
  shimmerIntensity: { lower: 0.5, upper: 0.7 },
  glowIntensity: { lower: 0.3, upper: 0.5 },
  spectrumHueRange: { lower: 360, upper: 360 }
}
```

### Crystal Prism
```javascript
{
  animationMode: ['pulse', 'wave'],
  dispersionIntensity: { lower: 0.7, upper: 0.9 },
  wavelengthSeparation: { lower: 3, upper: 5 },
  glowRadius: { lower: 6, upper: 10 }
}
```

### Subtle Enhancement
```javascript
{
  animationMode: ['shimmer'],
  chromaticStrength: { lower: 1, upper: 2 },
  shimmerIntensity: { lower: 0.2, upper: 0.3 },
  effectStrength: { lower: 0.3, upper: 0.5 }
}
```

### Maximum Chaos
```javascript
{
  animationMode: ['combined'],
  chromaticStrength: { lower: 8, upper: 10 },
  dispersionIntensity: { lower: 0.8, upper: 1.0 },
  shimmerIntensity: { lower: 0.6, upper: 0.8 },
  parallaxStrength: { lower: 6, upper: 8 },
  glowIntensity: { lower: 0.4, upper: 0.6 }
}
```

---

**Now you're ready to create stunning holographic effects! 🌈✨**