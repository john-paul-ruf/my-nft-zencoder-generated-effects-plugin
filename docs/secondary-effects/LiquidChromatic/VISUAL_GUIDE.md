# Liquid Chromatic Effect - Visual Guide

## 🎨 What Does It Look Like?

This guide helps you visualize what each parameter does to your image.

---

## 🌊 Flow Dynamics

### flowSpeed (0-3)
```
0.5 = Slow, gentle flow
│░░░░░░░░░░│  Like honey
│  ░░░░░░  │
│    ░░    │

1.5 = Medium, natural flow
│░░░░░░░░░░│  Like water
│ ░░░░░░░░ │
│░░░░░░░░░░│

2.5 = Fast, turbulent flow
│░░░░░░░░░░│  Like rapids
│░░░░░░░░░░│
│░░░░░░░░░░│
```

### flowAngle (0-360)
```
0° = Right →        90° = Down ↓
180° = Left ←       270° = Up ↑

Example at 45°:
    ↗
  ↗
↗
```

### turbulence (0-1)
```
0.0 = Smooth
│═══════════│
│═══════════│
│═══════════│

0.5 = Wavy
│≈≈≈≈≈≈≈≈≈≈≈│
│≈≈≈≈≈≈≈≈≈≈≈│
│≈≈≈≈≈≈≈≈≈≈≈│

1.0 = Chaotic
│∿∿∿∿∿∿∿∿∿∿∿│
│∿∿∿∿∿∿∿∿∿∿∿│
│∿∿∿∿∿∿∿∿∿∿∿│
```

### viscosity (0-1)
```
0.0 = Thin (water)
│ ░░░░░░░░ │  Fast, fluid
│░░░░░░░░░░│
│ ░░░░░░░░ │

0.5 = Medium (oil)
│  ░░░░░░  │  Moderate
│  ░░░░░░  │
│  ░░░░░░  │

1.0 = Thick (honey)
│   ░░░░   │  Slow, viscous
│   ░░░░   │
│   ░░░░   │
```

---

## 🌀 Wave System

### waveAmplitude (5-50)
```
10 = Subtle displacement
│Original: ████│
│Result:   ████│  (slight shift)

25 = Medium displacement
│Original: ████│
│Result:  ████ │  (noticeable shift)

40 = Strong displacement
│Original: ████│
│Result: ████  │  (dramatic shift)
```

### Multi-Frequency Waves
```
Single Frequency:
│∿∿∿∿∿∿∿∿∿∿∿│  Simple wave

Three Frequencies:
│∿∿∿∿∿∿∿∿∿∿∿│  Complex, organic
│ ∿∿∿∿∿∿∿∿∿ │  (more natural)
│  ∿∿∿∿∿∿∿  │
```

---

## 🌈 Chromatic Aberration

### chromaticSeparation (0-30)
```
0 = No separation
│ ████ │  Normal image

10 = Subtle separation
│R████ │  Slight RGB offset
│ G███ │
│  B██ │

25 = Strong separation
│R████    │  Dramatic RGB offset
│  G████  │
│    B████│
```

### Visual Effect
```
Original:        With Chromatic:
┌─────────┐     ┌─────────┐
│  ████   │     │R ████   │
│  ████   │  →  │ G███B   │
│  ████   │     │  ████   │
└─────────┘     └─────────┘
```

---

## ✨ Iridescence

### iridescenceIntensity (0-1)
```
0.0 = Original colors
│ ████ │  No color shift

0.5 = Subtle shimmer
│ ████ │  Slight rainbow
│ ████ │

1.0 = Full rainbow
│ ████ │  Oil-on-water effect
│ ████ │
```

### hueShiftRange (0-180)
```
30° shift:
Red → Orange → Red

90° shift:
Red → Yellow → Green → Red

180° shift:
Red → Green → Blue → Red
```

### Visual Progression
```
Frame 0:  Frame 10: Frame 20: Frame 30:
┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
│ 🔴  │  │ 🟡  │  │ 🔵  │  │ 🔴  │
└─────┘  └─────┘  └─────┘  └─────┘
(Perfect loop!)
```

---

## 💎 Surface Effects

### surfaceTension (0-1)
```
0.0 = No edges
│ ████ │

0.5 = Subtle edges
│◆████◆│  Bubble-like

1.0 = Strong edges
│◆◆██◆◆│  Pronounced boundaries
```

### specularHighlights (0-1)
```
0.0 = Matte
│ ████ │

0.5 = Semi-gloss
│ ✦██ │

1.0 = Glossy
│ ✦✦✦ │  Shiny spots
```

### depthGradient (0-1)
```
0.0 = Flat
│████████│

0.5 = Subtle depth
│████▓▓▓▓│  Darker in "deep" areas

1.0 = Strong depth
│████▓▓▒▒│  3D illusion
```

---

## 🎭 Blend & Composition

### effectIntensity (0-1)
```
0.0 = Original only
│ ████ │  No effect

0.5 = 50/50 blend
│ ████ │  Subtle effect

1.0 = Effect only
│ ∿∿∿∿ │  Full effect
```

### glowRadius (0-20)
```
0 = No glow
│ ████ │

5 = Subtle glow
│░████░│

15 = Strong glow
│░░██░░│  Soft bloom
```

### contrastBoost (0-1)
```
0.0 = Original contrast
│ ▓▓▓▓ │

0.5 = Enhanced contrast
│ ████ │  More punch

1.0 = Maximum contrast
│ ████ │  Very punchy
```

---

## 🎬 Animation Examples

### Perfect Loop (30 frames)
```
Frame 0:     Frame 15:    Frame 30:
┌─────┐     ┌─────┐     ┌─────┐
│ →→→ │     │ ←←← │     │ →→→ │
└─────┘     └─────┘     └─────┘
(Seamless!)
```

### Rotation Animation
```
Frame 0:  Frame 7:  Frame 15: Frame 22: Frame 30:
   →         ↘         ↓         ↙         →
```

### Pulse Animation
```
Frame 0:  Frame 10: Frame 20: Frame 30:
┌─────┐  ┌──────┐  ┌─────┐  ┌─────┐
│ ██  │  │ ████ │  │ ██  │  │ ██  │
└─────┘  └──────┘  └─────┘  └─────┘
```

---

## 🎨 Preset Visualizations

### Oil Slick
```
┌─────────────────┐
│ 🌈🌈🌈🌈🌈🌈🌈 │  Slow flow
│ 🌈🌈🌈🌈🌈🌈🌈 │  High iridescence
│ 🌈🌈🌈🌈🌈🌈🌈 │  Viscous
└─────────────────┘
```

### Liquid Metal
```
┌─────────────────┐
│ ✦▓▓▓▓▓▓▓▓✦    │  Fast flow
│   ✦▓▓▓▓▓✦      │  Metallic shine
│     ✦▓✦        │  Low viscosity
└─────────────────┘
```

### Psychedelic Flow
```
┌─────────────────┐
│ 🔴🟡🔵🟢🟣🟠🔴 │  Chaotic
│ 🟡🔵🟢🟣🟠🔴🟡 │  Full colors
│ 🔵🟢🟣🟠🔴🟡🔵 │  High turbulence
└─────────────────┘
```

### Gentle Waves
```
┌─────────────────┐
│ ≈≈≈≈≈≈≈≈≈≈≈≈≈ │  Calm
│ ≈≈≈≈≈≈≈≈≈≈≈≈≈ │  Subtle
│ ≈≈≈≈≈≈≈≈≈≈≈≈≈ │  Smooth
└─────────────────┘
```

### Chromatic Storm
```
┌─────────────────┐
│R∿∿∿∿∿∿∿∿∿∿∿∿∿│  Extreme
│ G∿∿∿∿∿∿∿∿∿∿∿∿│  Chaotic
│  B∿∿∿∿∿∿∿∿∿∿∿│  Maximum effect
└─────────────────┘
```

---

## 🎯 Parameter Combinations

### For Subtle Enhancement
```
flowSpeed: 0.8          │ ≈≈≈≈ │
waveAmplitude: 10       │ ≈≈≈≈ │  Gentle
chromaticSeparation: 3  │ ≈≈≈≈ │
effectIntensity: 0.3    │ ≈≈≈≈ │
```

### For Dramatic Effect
```
flowSpeed: 2.5          │ ∿∿∿∿ │
waveAmplitude: 40       │ ∿∿∿∿ │  Intense
chromaticSeparation: 25 │ ∿∿∿∿ │
effectIntensity: 1.0    │ ∿∿∿∿ │
```

### For Iridescent Shimmer
```
iridescenceIntensity: 1.0  │ 🌈🌈 │
primaryHue: 180            │ 🌈🌈 │  Rainbow
hueShiftRange: 180         │ 🌈🌈 │
shimmerSpeed: 2.5          │ 🌈🌈 │
```

### For Liquid Metal
```
specularHighlights: 0.9    │ ✦▓▓ │
surfaceTension: 0.7        │ ✦▓▓ │  Metallic
contrastBoost: 0.6         │ ✦▓▓ │
saturationBoost: 0.2       │ ✦▓▓ │
```

---

## 📊 Visual Comparison Chart

```
Parameter         Low (0.0)    Medium (0.5)   High (1.0)
─────────────────────────────────────────────────────────
flowSpeed         ░░░░         ░░░░░░         ░░░░░░░░
turbulence        ═══          ≈≈≈            ∿∿∿
chromatic         ████         R██G█B         R███ G███ B███
iridescence       ████         ████           🌈🌈🌈🌈
surfaceTension    ████         ◆██◆           ◆◆◆◆
specular          ████         ✦██            ✦✦✦
glow              ████         ░██░           ░░░░
```

---

## 🎨 Color Wheel Reference

```
        0° Red
         │
    315° │ 45° Orange
        \│/
270° ────┼──── 90° Yellow
        /│\
   225° │ 135° Green
        │
      180° Cyan

primaryHue sets starting point
hueShiftRange determines travel distance
```

---

## 🌊 Flow Direction Guide

```
     270° (Up)
        ↑
        │
180° ←──┼──→ 0° (Right)
        │
        ↓
     90° (Down)

Diagonal examples:
45° = ↗ (Up-Right)
135° = ↘ (Down-Right)
225° = ↙ (Down-Left)
315° = ↖ (Up-Left)
```

---

## 💡 Quick Visual Tips

### Want More Motion?
```
Before:  After:
│ ░░ │   │░░░░│  ↑ flowSpeed
│ ░░ │   │░░░░│  ↑ waveAmplitude
│ ░░ │   │░░░░│  ↓ viscosity
```

### Want More Color?
```
Before:  After:
│ ██ │   │ 🌈 │  ↑ iridescenceIntensity
│ ██ │   │ 🌈 │  ↑ hueShiftRange
│ ██ │   │ 🌈 │  ↑ saturationBoost
```

### Want More Glitch?
```
Before:  After:
│ ██ │   │R█G█B│  ↑ chromaticSeparation
│ ██ │   │ █G█B│  ↑ chromaticFlow
│ ██ │   │  █G█│  ↑ trailLength
```

---

## 🎬 Animation Timeline

```
Frame:  0    5    10   15   20   25   30
        │────│────│────│────│────│────│
Flow:   →    ↘    ↓    ↙    ←    ↖    →
Color:  🔴   🟠   🟡   🟢   🔵   🟣   🔴
Wave:   ∿    ∿∿   ∿∿∿  ∿∿   ∿    ─    ∿
        └────────────────────────────┘
                Perfect Loop!
```

---

*Visualize your liquid dreams!* 🌊✨