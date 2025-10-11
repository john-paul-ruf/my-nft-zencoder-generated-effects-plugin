# ChromaticAberration Effect - Visual Guide

## 🎨 Visual Representation of Effects

This guide provides ASCII art representations of how different configurations affect the image.

---

## 📐 Displacement Curves

### Radial (Default)
```
Original:           With Radial Aberration:
    [RGB]               [R] [G] [B]
   [RGB]               [R] [G] [B]
  [RGB]               [R] [G] [B]
 [RGB]               [R] [G] [B]
[RGB]               [R] [G] [B]

Center: Minimal separation
Edges:  Maximum separation
Direction: Outward from focal point
```

### Horizontal
```
Original:           With Horizontal Aberration:
[RGB][RGB][RGB]     [R][G][B] [R][G][B] [R][G][B]
[RGB][RGB][RGB]     [R][G][B] [R][G][B] [R][G][B]
[RGB][RGB][RGB]     [R][G][B] [R][G][B] [R][G][B]

Left side:  Red shifts left, Blue shifts right
Right side: Red shifts right, Blue shifts left
Direction:  Horizontal from focal point
```

### Vertical
```
Original:           With Vertical Aberration:
[RGB]               [R]
[RGB]               [G]
[RGB]               [B]
[RGB]               [R]
[RGB]               [G]
                    [B]

Top:    Red shifts up, Blue shifts down
Bottom: Red shifts down, Blue shifts up
Direction: Vertical from focal point
```

### Diagonal
```
Original:           With Diagonal Aberration:
[RGB][RGB]          [R]    [B]
[RGB][RGB]             [G]
                    [B]    [R]

Direction: 45° diagonal from focal point
Creates geometric patterns
```

---

## 🎬 Animation Modes Over Time

### Pulse Mode
```
Frame 0 (Start):
[R][G][B]  ← Channels aligned

Frame 25% (Quarter):
[R] [G] [B]  ← Separating

Frame 50% (Half):
[R]  [G]  [B]  ← Maximum separation

Frame 75% (Three-quarters):
[R] [G] [B]  ← Coming together

Frame 100% (End):
[R][G][B]  ← Aligned again (PERFECT LOOP)

Graph:
Intensity
1.0 |     ╱╲     ╱╲
0.5 |   ╱    ╲ ╱    ╲
0.0 |_╱________╲______╲_
    0   25  50  75  100
        Frame %
```

### Rotate Mode
```
Frame 0° (0%):
    [G]
[R] ● [B]  ← Horizontal split

Frame 90° (25%):
    [R]
    ●
    [B]  ← Vertical split

Frame 180° (50%):
[B] ● [R]  ← Horizontal reversed
    [G]

Frame 270° (75%):
    [B]
    ●
    [R]  ← Vertical reversed

Frame 360° (100%):
    [G]
[R] ● [B]  ← Back to start (PERFECT LOOP)

● = Focal point
```

### Wave Mode (waveCount=3)
```
Frame 0%:
Wave 1: ~~~[R]~~~[G]~~~[B]~~~
Wave 2:    ~~~[R]~~~[G]~~~[B]~~~
Wave 3:       ~~~[R]~~~[G]~~~[B]~~~

Frame 33%:
Wave 1:       ~~~[R]~~~[G]~~~[B]~~~
Wave 2: ~~~[R]~~~[G]~~~[B]~~~
Wave 3:    ~~~[R]~~~[G]~~~[B]~~~

Frame 66%:
Wave 1:    ~~~[R]~~~[G]~~~[B]~~~
Wave 2:       ~~~[R]~~~[G]~~~[B]~~~
Wave 3: ~~~[R]~~~[G]~~~[B]~~~

Frame 100%:
Wave 1: ~~~[R]~~~[G]~~~[B]~~~  ← Back to start
Wave 2:    ~~~[R]~~~[G]~~~[B]~~~
Wave 3:       ~~~[R]~~~[G]~~~[B]~~~

Graph:
Intensity
1.0 |╱╲╱╲╱╲╱╲╱╲╱╲
0.5 |          
0.0 |____________
    0    50   100
        Frame %
```

### Static Mode
```
All Frames:
[R] [G] [B]  ← Constant separation
[R] [G] [B]
[R] [G] [B]

No animation, consistent look
```

---

## 🎨 Channel Offset Examples

### Default (Red=1.0, Green=0.0, Blue=-1.0)
```
Original:     Result:
   [RGB]      [R][G][B]
              ←  •  →
Red shifts left, Green centered, Blue shifts right
```

### Asymmetric (Red=2.0, Green=0.5, Blue=-1.0)
```
Original:     Result:
   [RGB]      [R] [G][B]
              ←   • →
Red shifts far left, Green slightly left, Blue shifts right
```

### Inverted (Red=-1.0, Green=0.0, Blue=1.0)
```
Original:     Result:
   [RGB]      [B][G][R]
              →  •  ←
Blue shifts left, Green centered, Red shifts right
```

### All Positive (Red=1.0, Green=0.5, Blue=0.2)
```
Original:     Result:
   [RGB]      [RGB]
              ← ← ←
All channels shift in same direction (unusual but creative)
```

---

## 🌈 Color Tinting Examples

### No Tint (tintStrength=0.0)
```
Original RGB:  Result RGB:
R: 255         R: 255
G: 128         G: 128
B: 64          B: 64

Pure channel separation, no color modification
```

### Subtle Tint (tintStrength=0.3, redTint=#FF0066)
```
Original Red:  Result Red:
R: 200         R: 200 * 0.7 + 255 * 0.3 = 216
G: 0           G: 0 * 0.7 + 0 * 0.3 = 0
B: 0           B: 0 * 0.7 + 102 * 0.3 = 31

Slight magenta tint added to red channel
```

### Strong Tint (tintStrength=0.8, blueTint=#00FFFF)
```
Original Blue: Result Blue:
R: 0           R: 0 * 0.2 + 0 * 0.8 = 0
G: 0           G: 0 * 0.2 + 255 * 0.8 = 204
B: 255         B: 255 * 0.2 + 255 * 0.8 = 255

Strong cyan tint, blue becomes cyan
```

---

## 📊 Edge Falloff Visualization

### Low Falloff (edgeFalloff=0.1)
```
Distance from center → Effect strength

Center |░░░░░░░░░░░░░░░░░░░░| Edge
       0%                  100%

Nearly linear - effect strong everywhere
```

### Medium Falloff (edgeFalloff=0.5)
```
Distance from center → Effect strength

Center |░░░░░░░░▓▓▓▓▓▓▓▓▓▓| Edge
       0%                  100%

Moderate curve - balanced distribution
```

### High Falloff (edgeFalloff=0.9)
```
Distance from center → Effect strength

Center |░░░░░░░░░░░░▓▓▓▓▓▓| Edge
       0%                  100%

Strong curve - effect mostly at edges
```

---

## 🎯 Focal Point Examples

### Center (focalPointX=0.5, focalPointY=0.5)
```
┌─────────────┐
│             │
│      ●      │  ← Symmetric aberration
│             │
└─────────────┘
```

### Top-Left (focalPointX=0.25, focalPointY=0.25)
```
┌─────────────┐
│  ●          │
│             │  ← Asymmetric, stronger bottom-right
│             │
└─────────────┘
```

### Bottom-Right (focalPointX=0.75, focalPointY=0.75)
```
┌─────────────┐
│             │
│             │  ← Asymmetric, stronger top-left
│          ●  │
└─────────────┘
```

### Off-Canvas (focalPointX=1.5, focalPointY=0.5)
```
┌─────────────┐        ●
│             │
│             │  ← All displacement points left
│             │
└─────────────┘
```

---

## 🎨 Preset Visual Comparisons

### Classic Lens Aberration
```
Before:          After:
████████         ██▓▓▓▓██
████████         ██▓▓▓▓██
████████         ██▓▓▓▓██

Subtle, professional, vintage camera look
```

### VHS Glitch
```
Before:          After:
████████         █▓█▓█▓█▓
████████         ▓█▓█▓█▓█
████████         █▓█▓█▓█▓

Horizontal scan lines, retro 80s/90s
```

### Psychedelic Spin
```
Before:          After (rotating):
████████         ▓█▓█▓█▓█
████████         █▓█▓█▓█▓
████████         ▓█▓█▓█▓█

Spinning rainbow, trippy visuals
```

### Extreme Glitch Art
```
Before:          After:
████████         █ ▓ █ ▓ █
████████         ▓ █ ▓ █ ▓
████████         █ ▓ █ ▓ █

Heavy separation, digital corruption
```

---

## 🔍 Interpolation Comparison

### Nearest Neighbor (interpolation='nearest')
```
Original:        Result:
█████            █ █ █
█████            █ █ █
█████            █ █ █

Blocky, pixelated, fast
Good for: Retro pixel art, performance
```

### Bilinear (interpolation='bilinear')
```
Original:        Result:
█████            █▓░▓█
█████            █▓░▓█
█████            █▓░▓█

Smooth, blended, slower
Good for: Professional quality, smooth gradients
```

---

## 📈 Displacement Magnitude Over Distance

### maxDisplacement=20, edgeFalloff=0.3
```
Displacement (pixels)
20 |                    ╱
15 |                 ╱
10 |              ╱
 5 |          ╱
 0 |_____╱___________
   0%  25%  50%  75% 100%
   Distance from focal point
```

### maxDisplacement=50, edgeFalloff=0.7
```
Displacement (pixels)
50 |                    ╱
40 |                   ╱
30 |                  ╱
20 |                 ╱
10 |               ╱
 0 |__________╱_______
   0%  25%  50%  75% 100%
   Distance from focal point
```

---

## 🎭 Effect Intensity Comparison

### Subtle (maxDisplacement=5-10)
```
Original: ████████
Result:   ██▓▓▓▓██

Barely noticeable, professional enhancement
```

### Moderate (maxDisplacement=15-25)
```
Original: ████████
Result:   █▓░░░░▓█

Noticeable but tasteful, artistic look
```

### Strong (maxDisplacement=30-50)
```
Original: ████████
Result:   █ ░  ░ █

Obvious effect, bold artistic statement
```

### Extreme (maxDisplacement=75-100)
```
Original: ████████
Result:   █     █

Heavy distortion, experimental art
```

---

## 🌟 Combining Parameters

### Dreamy Soft Glow
```
maxDisplacement: 8
edgeFalloff: 0.6
layerOpacity: 0.7
interpolation: bilinear

Result: Soft, ethereal, subtle
████████ → ██▓▓▓▓██ (gentle)
```

### Aggressive Glitch
```
maxDisplacement: 45
edgeFalloff: 0.1
waveCount: 5
interpolation: nearest

Result: Harsh, digital, corrupted
████████ → █ ▓ █ ▓ █ (intense)
```

### Cinematic Lens
```
maxDisplacement: 18
edgeFalloff: 0.5
tintStrength: 0.2
animationMode: pulse

Result: Film-like, professional, dynamic
████████ → ██▓▓▓▓██ (breathing)
```

---

## 🎨 Color Channel Behavior

### Standard RGB Separation
```
Original Pixel:  Result:
R: 255          [R:255]  [G:128]  [B:64]
G: 128          ←  5px    0px    5px →
B: 64

Red shifts left 5px, Green stays, Blue shifts right 5px
```

### With Color Tinting
```
Original Pixel:  Tinted Result:
R: 255          [R:255→240]  [G:128→140]  [B:64→80]
G: 128          ←  5px         0px         5px →
B: 64           (magenta)    (original)   (cyan)

Channels separated AND tinted
```

---

## 📊 Performance Impact

### Fast Configuration
```
interpolation: 'nearest'
maxDisplacement: 10
animationMode: 'static'

Speed: ████████████ (very fast)
Quality: ██████░░░░░░ (good)
```

### Balanced Configuration
```
interpolation: 'bilinear'
maxDisplacement: 20
animationMode: 'pulse'

Speed: ████████░░░░ (fast)
Quality: ██████████░░ (excellent)
```

### Quality Configuration
```
interpolation: 'bilinear'
maxDisplacement: 50
animationMode: 'rotate'

Speed: ██████░░░░░░ (moderate)
Quality: ████████████ (perfect)
```

---

## 🎯 Use Case Visual Guide

### NFT Portrait Enhancement
```
Before:          After (subtle):
  👤              👤
 /|\\            /|\\
  |               |

Adds depth without overwhelming subject
```

### Abstract Art
```
Before:          After (extreme):
  ◆               ◆ ◆ ◆
 ◆◆◆             ◆ ◆ ◆
  ◆               ◆ ◆ ◆

Creates complex patterns from simple shapes
```

### Logo/Text
```
Before:          After (moderate):
 TEXT            T E X T
                 (with color fringe)

Adds retro/glitch aesthetic to typography
```

---

## 🎨 Final Visual Summary

```
ChromaticAberration Effect Spectrum:

Subtle ←──────────────────────────→ Extreme
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  ↑         ↑         ↑         ↑
  5px      15px      30px      50px
  
Professional  Artistic  Bold  Experimental
```

---

**Use this guide to visualize how different parameters affect your layers!**

🌈 **Happy aberrating!** ✨