# Liquid Chromatic Effect - Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LiquidChromaticEffect                     │
│                   (extends LayerEffect)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ uses
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   LiquidChromaticConfig                      │
│                   (extends EffectConfig)                     │
│                                                              │
│  • 30+ flat parameters (all primitives)                     │
│  • toJSON() / fromJSON() serialization                      │
│  • Automatic validation and clamping                        │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Processing Pipeline

```
Input Layer
    │
    ├─────────────────────────────────────────────────────┐
    │                                                      │
    ▼                                                      ▼
┌─────────────────┐                              ┌──────────────┐
│  Edge Detection │                              │ Noise Field  │
│   (if enabled)  │                              │ (pre-cached) │
└─────────────────┘                              └──────────────┘
    │                                                      │
    └──────────────────────┬───────────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  For Each Pixel (x,y)  │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ Calculate Displacement │
              │  • Multi-freq waves    │
              │  • Flow direction      │
              │  • Turbulence          │
              │  • Viscosity           │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │ Chromatic Aberration   │
              │  • Sample R channel    │
              │  • Sample G channel    │
              │  • Sample B channel    │
              │  • Combine with trails │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Apply Iridescence     │
              │  • RGB to HSL          │
              │  • Hue shift by angle  │
              │  • Saturation boost    │
              │  • HSL to RGB          │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Surface Effects       │
              │  • Surface tension     │
              │  • Specular highlights │
              │  • Depth gradient      │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │  Blend with Original   │
              │  (effectIntensity)     │
              └────────────────────────┘
                           │
                           ▼
              ┌────────────────────────┐
              │   Post-Processing      │
              │  • Glow (box blur)     │
              │  • Contrast boost      │
              └────────────────────────┘
                           │
                           ▼
                    Output Layer
```

## 🎨 Displacement Calculation

```
┌─────────────────────────────────────────────────────────────┐
│                  Displacement Calculation                    │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Wave 1     │  │   Wave 2     │  │   Wave 3     │
│ (freq: 2.0)  │  │ (freq: 3.0)  │  │ (freq: 1.5)  │
│ weight: 0.5  │  │ weight: 0.3  │  │ weight: 0.2  │
└──────────────┘  └──────────────┘  └──────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   Wave Sum      │
                  │ (weighted avg)  │
                  └─────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Flow Angle   │  │  Turbulence  │  │    Pulse     │
│  Rotation    │  │    Noise     │  │ Modulation   │
└──────────────┘  └──────────────┘  └──────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Final Displacement│
                  │   (dx, dy, angle)│
                  └─────────────────┘
```

## 🌈 Chromatic Aberration

```
                    Input Pixel (x, y)
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ R Channel    │  │ G Channel    │  │ B Channel    │
│ Offset: 0°   │  │ Offset: 120° │  │ Offset: 240° │
│ Distance: 1.0│  │ Distance: 0.8│  │ Distance: 0.6│
└──────────────┘  └──────────────┘  └──────────────┘
        │                  │                  │
        ▼                  ▼                  ▼
   Sample at          Sample at          Sample at
   (x+dx1, y+dy1)    (x+dx2, y+dy2)    (x+dx3, y+dy3)
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Combine RGB    │
                  │  with Trails    │
                  └─────────────────┘
```

## 🎭 Iridescence System

```
                    Flow Angle
                         │
                         ▼
              ┌──────────────────┐
              │ Normalize (0-1)  │
              └──────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Shimmer    │  │  Hue Shift   │  │  Saturation  │
│  Animation   │  │  Calculation │  │    Boost     │
└──────────────┘  └──────────────┘  └──────────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
              ┌──────────────────┐
              │   RGB to HSL     │
              └──────────────────┘
                         │
                         ▼
              ┌──────────────────┐
              │  Apply Hue Shift │
              │  Apply Sat Boost │
              │  Apply Brightness│
              └──────────────────┘
                         │
                         ▼
              ┌──────────────────┐
              │   HSL to RGB     │
              └──────────────────┘
```

## 🔢 Data Flow

```
Constructor
    │
    ├─> Config Validation
    │   └─> Clamp all values to valid ranges
    │
    ├─> Angle Conversion
    │   └─> Convert degrees to radians
    │
    ├─> Noise Field Generation
    │   └─> Create 256x256 deterministic noise
    │
    └─> Data Object Creation
        └─> Store all precomputed values

Invoke (frame, totalFrames)
    │
    ├─> Calculate Progress (0-1)
    │
    ├─> For Each Pixel:
    │   │
    │   ├─> Calculate Displacement
    │   │   └─> Pure function of (x, y, time, config)
    │   │
    │   ├─> Sample with Chromatic Aberration
    │   │   └─> Pure function of (src, displacement, time)
    │   │
    │   ├─> Apply Iridescence
    │   │   └─> Pure function of (color, angle, time)
    │   │
    │   └─> Apply Surface Effects
    │       └─> Pure function of (color, edges, displacement)
    │
    ├─> Apply Glow (if enabled)
    │
    ├─> Apply Contrast Boost (if enabled)
    │
    └─> Return Modified Layer
```

## 🧮 Mathematical Foundations

### Perfect Loop Formula
```
progress = frameNumber / totalFrames  // [0, 1]
phase = progress * 2π                 // [0, 2π]
wave = sin(phase * frequency)         // Returns to 0 at phase = 2π
```

### Multi-Frequency Waves
```
wave1 = sin(phase * f1 + position) * w1
wave2 = sin(phase * f2 + position) * w2
wave3 = sin(phase * f3 + position) * w3
total = wave1 + wave2 + wave3
```

### Chromatic Offset
```
rAngle = baseAngle + 0°
gAngle = baseAngle + 2π/3
bAngle = baseAngle + 4π/3

rOffset = (cos(rAngle) * dist, sin(rAngle) * dist)
gOffset = (cos(gAngle) * dist * 0.8, sin(gAngle) * dist * 0.8)
bOffset = (cos(bAngle) * dist * 0.6, sin(bAngle) * dist * 0.6)
```

### Iridescence Hue Shift
```
angleNormalized = (flowAngle + π) / (2π)
shimmer = sin(time * speed + angleNormalized * 4π) * 0.5 + 0.5
hueShift = shimmer * hueShiftRange
finalHue = (primaryHue + hueShift) % 360
```

## 🎯 Performance Characteristics

### Time Complexity
- **Per Pixel**: O(1) - constant time operations
- **Total**: O(width × height) - linear in image size

### Space Complexity
- **Noise Cache**: 256 × 256 × 4 bytes = 256 KB
- **Edge Buffer**: width × height × 4 bytes (if enabled)
- **Output Buffer**: width × height × 4 bytes
- **Total**: ~2-3 MB for 512×512 image

### Optimization Strategies
1. **Buffer Pooling**: Reuse buffers to avoid allocation
2. **Lazy Edge Detection**: Only compute if surface tension > 0
3. **Precomputed Noise**: Generate once in constructor
4. **Bilinear Interpolation**: Smooth sampling without quality loss
5. **Early Exit**: Skip expensive operations when intensity = 0

## 🔧 Extension Points

### Adding New Wave Patterns
```javascript
// In #calculateLiquidDisplacement
const customWave = Math.sin(phase * customFreq + customOffset);
const waveSum = wave1 + wave2 + wave3 + customWave;
```

### Adding New Surface Effects
```javascript
// In #applySurfaceEffects
if (this.data.customEffect > 0) {
  const effect = this.#calculateCustomEffect(x, y, displacement);
  color.r += effect;
  color.g += effect;
  color.b += effect;
}
```

### Adding New Blend Modes
```javascript
// In invoke, after processing
if (this.data.blendMode === 'custom') {
  output[idx] = this.#customBlend(color, original);
}
```

## 📊 Configuration Categories

```
LiquidChromaticConfig
    │
    ├─> Flow Dynamics (4 params)
    │   ├─ flowSpeed
    │   ├─ flowAngle
    │   ├─ turbulence
    │   └─ viscosity
    │
    ├─> Wave System (5 params)
    │   ├─ waveFrequency1
    │   ├─ waveFrequency2
    │   ├─ waveFrequency3
    │   ├─ waveAmplitude
    │   └─ wavePhaseOffset
    │
    ├─> Chromatic Aberration (4 params)
    │   ├─ chromaticSeparation
    │   ├─ chromaticAngle
    │   ├─ chromaticFlow
    │   └─ trailLength
    │
    ├─> Iridescence (5 params)
    │   ├─ iridescenceIntensity
    │   ├─ primaryHue
    │   ├─ hueShiftRange
    │   ├─ saturationBoost
    │   └─ brightnessModulation
    │
    ├─> Surface Effects (4 params)
    │   ├─ surfaceTension
    │   ├─ refractionStrength
    │   ├─ specularHighlights
    │   └─ depthGradient
    │
    ├─> Blend & Composition (4 params)
    │   ├─ effectIntensity
    │   ├─ edgePreservation
    │   ├─ glowRadius
    │   └─ contrastBoost
    │
    ├─> Animation (3 params)
    │   ├─ rotationSpeed
    │   ├─ pulseFrequency
    │   └─ shimmerSpeed
    │
    └─> General (3 params)
        ├─ seed
        ├─ layerOpacity
        └─ perfectLoop
```

## 🎓 Design Patterns Used

### 1. Strategy Pattern
- Different wave frequencies act as strategies
- Configurable blend modes
- Pluggable surface effects

### 2. Template Method Pattern
- Base LayerEffect defines invoke() contract
- LiquidChromaticEffect implements specific algorithm

### 3. Builder Pattern
- LiquidChromaticConfig acts as builder
- Fluent configuration with defaults

### 4. Factory Pattern
- fromJSON() creates instances from serialized data
- Deterministic noise field generation

### 5. Object Pool Pattern
- Buffer pooling for memory efficiency
- Reuse allocated memory

---

*Architecture designed for performance, extensibility, and maintainability.* 🏗️✨