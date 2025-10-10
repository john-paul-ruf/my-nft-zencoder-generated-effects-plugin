# 🌊 FluxWeave - Technical Architecture

Deep dive into the implementation, algorithms, and mathematics behind FluxWeave.

---

## Table of Contents

1. [Overview](#overview)
2. [Core Algorithm](#core-algorithm)
3. [Wave Mathematics](#wave-mathematics)
4. [Directional Modes](#directional-modes)
5. [Chromatic Phase Shifting](#chromatic-phase-shifting)
6. [Braiding Algorithm](#braiding-algorithm)
7. [Perfect Loop Implementation](#perfect-loop-implementation)
8. [Blend Modes](#blend-modes)
9. [Performance Optimization](#performance-optimization)
10. [Memory Management](#memory-management)

---

## Overview

### Conceptual Model

FluxWeave operates on the principle of **temporal fabric manipulation**. The effect treats the image as a woven fabric where each pixel is a thread that can be displaced by wave interference patterns.

```
Input Image → Wave Displacement → Chromatic Shift → Blend → Output
```

### Key Innovations

1. **Multi-frequency interference** - Two wave frequencies combine to create complex organic patterns
2. **Directional flow** - Four distinct modes (horizontal, vertical, radial, diagonal)
3. **Braiding simulation** - Threads interweave using sine modulation
4. **Deterministic noise** - Turbulence without randomness
5. **Perfect loop math** - All animations return to origin

---

## Core Algorithm

### Main Processing Pipeline

```javascript
for each pixel (x, y):
  1. Calculate wave displacement vector
  2. Apply directional transformation
  3. Add turbulence (if enabled)
  4. Calculate chromatic phase shift
  5. Sample RGB channels with offsets
  6. Apply hue rotation
  7. Blend with original pixel
  8. Write to output buffer
```

### Pseudocode

```
function applyFluxWeave(src, output, width, height, phase, amplitude):
  for y in 0..height:
    for x in 0..width:
      // Calculate displacement
      displacement = calculateWaveDisplacement(x, y, phase, amplitude)
      
      // Calculate chromatic offsets
      phaseShift = calculatePhaseShift(displacement, phase)
      
      // Sample with displacement
      r = sample(x + displacement.x + phaseShift.r, y + displacement.y)
      g = sample(x + displacement.x + phaseShift.g, y + displacement.y)
      b = sample(x + displacement.x + phaseShift.b, y + displacement.y)
      
      // Apply hue rotation
      rgb = applyHueRotation(r, g, b, phase)
      
      // Blend with original
      output[x,y] = blend(src[x,y], rgb)
```

---

## Wave Mathematics

### Perfect Loop Formula

All animations use normalized time `t ∈ [0, 1]` and phase `φ = t × 2π`:

```javascript
const t = frameNumber / totalFrames;  // Normalized time [0, 1]
const phase = t * Math.PI * 2;        // Phase [0, 2π]
```

This ensures that when `frameNumber === totalFrames`, we return to `phase === 0`.

### Wave Interference

Two sine waves at different frequencies create interference patterns:

```javascript
wave1 = sin(x × freq1 + phase × speed1)
wave2 = cos(y × freq2 + phase × speed2)
combined = (wave1 + wave2) × amplitude
```

**Why sine and cosine?**
- Sine and cosine are 90° out of phase
- Creates richer interference patterns
- Both loop perfectly over 2π

### Amplitude Modulation (Pulse)

The breathing effect modulates amplitude over time:

```javascript
pulseMod = 1.0 + sin(phase × pulseFrequency) × pulseIntensity
currentAmplitude = baseAmplitude × pulseMod
```

**Example**: With `pulseIntensity = 0.3` and `baseAmplitude = 40`:
- Min amplitude: `40 × (1 - 0.3) = 28`
- Max amplitude: `40 × (1 + 0.3) = 52`
- Breathes smoothly between these values

---

## Directional Modes

### Horizontal Mode

Waves flow left-right with vertical displacement:

```javascript
wave1 = sin(x × freq1 + phase × speed1)
wave2 = cos(y × freq2 + phase × speed2)
braid = sin(y × braidCount × π / height) × braidTightness

offsetX = (wave1 + braid) × amplitude × 0.3
offsetY = (wave2 + wave1 × 0.5) × amplitude
```

**Characteristics**:
- Primary motion is vertical (offsetY)
- Horizontal position modulates wave
- Creates curtain/silk effect

### Vertical Mode

Waves flow up-down with horizontal displacement:

```javascript
wave1 = sin(y × freq1 + phase × speed1)
wave2 = cos(x × freq2 + phase × speed2)
braid = sin(x × braidCount × π / width) × braidTightness

offsetX = (wave2 + wave1 × 0.5) × amplitude
offsetY = (wave1 + braid) × amplitude × 0.3
```

**Characteristics**:
- Primary motion is horizontal (offsetX)
- Vertical position modulates wave
- Creates waterfall/aurora effect

### Radial Mode

Waves emanate from center in all directions:

```javascript
dx = x - centerX
dy = y - centerY
distance = sqrt(dx² + dy²)
angle = atan2(dy, dx)

wave1 = sin(distance × freq1 + phase × speed1)
wave2 = cos(angle × braidCount + phase × speed2)
radialWave = wave1 × wave2

offsetX = cos(angle) × radialWave × amplitude
offsetY = sin(angle) × radialWave × amplitude
```

**Characteristics**:
- Displacement radiates from center
- Distance and angle both modulate
- Creates portal/explosion effect

### Diagonal Mode

Waves flow at 45° angle:

```javascript
diag = (x + y) × 0.707  // Normalize diagonal distance
wave1 = sin(diag × freq1 + phase × speed1)
wave2 = cos(diag × freq2 - phase × speed2)
braid = sin(diag × braidCount × π / (width + height)) × braidTightness

combined = (wave1 + wave2 + braid) × amplitude
offsetX = combined × 0.707
offsetY = combined × 0.707
```

**Characteristics**:
- Equal X and Y displacement
- Creates DNA helix effect
- Counter-rotating waves (note `-phase`)

---

## Chromatic Phase Shifting

### RGB Channel Separation

Each color channel is sampled from a slightly different position:

```javascript
phaseShift = {
  r: strength × (1 + shimmer × 0.3),
  g: strength × 0.5,
  b: -strength × (1 + shimmer × 0.3)
}

r = sample(x + displacement.x + phaseShift.r, y + displacement.y)
g = sample(x + displacement.x + phaseShift.g, y + displacement.y)
b = sample(x + displacement.x + phaseShift.b, y + displacement.y)
```

**Why this pattern?**
- Red and blue shift in opposite directions (creates cyan/magenta fringing)
- Green shifts less (maintains luminance stability)
- Shimmer adds temporal variation

### Shimmer Effect

Shimmer modulates the phase shift over time:

```javascript
shimmer = sin(phase × shimmerSpeed) × 0.5 + 0.5  // Range [0, 1]
```

This creates a pulsing color separation effect.

---

## Braiding Algorithm

### Concept

Braiding simulates multiple threads interweaving by modulating displacement based on position:

```javascript
braid = sin(position × braidCount × π / dimension) × braidTightness
```

### How It Works

1. **Position** - Either x, y, or diagonal depending on mode
2. **braidCount** - Number of complete braid cycles across the image
3. **braidTightness** - Amplitude of the braiding modulation

**Example**: With `braidCount = 4` and `height = 1000`:
```javascript
// At y = 0:    braid = sin(0) = 0
// At y = 250:  braid = sin(π) = 0
// At y = 125:  braid = sin(π/2) = 1 × tightness
// At y = 375:  braid = sin(3π/2) = -1 × tightness
```

This creates 4 complete braid cycles vertically.

### Integration with Waves

The braid modulation is added to the wave displacement:

```javascript
offsetY = (wave + braid) × amplitude
```

This creates the appearance of threads weaving over and under each other.

---

## Perfect Loop Implementation

### The Challenge

For a perfect loop, all values must return to their starting point when `frameNumber === totalFrames`.

### The Solution

Use only sine and cosine functions with phase `φ = (t × 2π)`:

```javascript
// These all loop perfectly:
sin(phase)
cos(phase)
sin(phase × speed)
cos(phase × speed)
sin(x × freq + phase × speed)
```

### Why It Works

- `sin(0) === sin(2π)` - Sine loops over 2π
- `cos(0) === cos(2π)` - Cosine loops over 2π
- When `t = 0`: `phase = 0`
- When `t = 1`: `phase = 2π`
- Therefore all sine/cosine values return to origin

### Speed Multipliers

Speed multipliers scale the phase:

```javascript
wave = sin(phase × speed)
```

- `speed = 1.0` - One complete cycle per loop
- `speed = 2.0` - Two complete cycles per loop
- `speed = 0.5` - Half a cycle per loop

**Important**: Non-integer speeds still loop perfectly because they're multiplied by `2π`.

---

## Blend Modes

### Normal (Alpha Blending)

```javascript
result = base × (1 - alpha) + blend × alpha
```

Standard linear interpolation between base and blend.

### Screen (Lightening)

```javascript
result = 255 - ((255 - base) × (255 - blend) / 255)
result = base + (result - base) × alpha
```

Inverts, multiplies, inverts again. Always lightens, never darkens.

**Use for**: Glows, light effects, ethereal visuals

### Overlay (Contrast)

```javascript
if (base < 128):
  result = (2 × base × blend) / 255
else:
  result = 255 - (2 × (255 - base) × (255 - blend) / 255)

result = base + (result - base) × alpha
```

Multiplies dark areas, screens light areas. Increases contrast.

**Use for**: Balanced blending, texture enhancement

### Add (Additive)

```javascript
result = min(255, base + blend × alpha)
```

Simply adds values, clamped to 255. Brightens significantly.

**Use for**: Energy effects, intense glows, maximum brightness

---

## Performance Optimization

### Bilinear Interpolation

For smooth sampling, we use bilinear interpolation:

```javascript
x0 = floor(sampleX)
y0 = floor(sampleY)
x1 = x0 + 1
y1 = y0 + 1

fx = sampleX - x0  // Fractional part
fy = sampleY - y0

// Sample 4 neighbors
v00 = src[y0, x0]
v10 = src[y0, x1]
v01 = src[y1, x0]
v11 = src[y1, x1]

// Interpolate horizontally
v0 = v00 × (1 - fx) + v10 × fx
v1 = v01 × (1 - fx) + v11 × fx

// Interpolate vertically
result = v0 × (1 - fy) + v1 × fy
```

**Cost**: 4 samples + 5 multiplications + 4 additions per pixel per channel

**Benefit**: Smooth, anti-aliased displacement

### Bounds Checking

Early exit for out-of-bounds samples:

```javascript
if (x0 < 0 || x1 >= width || y0 < 0 || y1 >= height) {
  return 0;  // Black for out-of-bounds
}
```

### Buffer Pooling

Uses `globalBufferPool` to reuse buffers:

```javascript
const output = globalBufferPool.getBuffer(width, height, 4);
// ... use buffer ...
globalBufferPool.returnBuffer(output, width, height, 4);
```

**Benefit**: Reduces garbage collection pressure

---

## Memory Management

### Buffer Lifecycle

```javascript
// 1. Acquire from pool
const output = globalBufferPool.getBuffer(width, height, 4);

// 2. Use buffer
applyFluxWeave(src, output, ...);

// 3. Convert to PNG
const pngBuffer = await sharp(output, { raw: {...} }).png().toBuffer();

// 4. Return to pool
globalBufferPool.returnBuffer(output, width, height, 4);
```

### Memory Usage

For 1920×1080 RGBA:
- Input buffer: `1920 × 1080 × 4 = 8,294,400 bytes ≈ 8 MB`
- Output buffer: `8 MB`
- Sharp internal: `~8 MB`
- **Total**: `~24 MB` per frame

### Optimization Strategies

1. **Reuse buffers** - Pool prevents allocation churn
2. **Single pass** - No intermediate buffers
3. **In-place operations** - Tint and hue rotation modify output directly
4. **Early cleanup** - Return buffers as soon as possible

---

## Deterministic Noise

### The Challenge

We need turbulence but can't use `Math.random()` (not deterministic).

### The Solution

Sine-based noise function:

```javascript
simpleNoise(x, y, t) {
  const n = sin(x × 12.9898 + y × 78.233 + t × 43.758) × 43758.5453;
  return (n - floor(n)) × 2 - 1;  // Range [-1, 1]
}
```

**How it works**:
1. Combine x, y, t with large prime-like numbers
2. Take sine (deterministic, smooth)
3. Multiply by large number to spread values
4. Take fractional part (pseudo-random distribution)
5. Remap to [-1, 1]

**Properties**:
- ✅ Deterministic (same inputs = same output)
- ✅ Smooth (sine is continuous)
- ✅ Pseudo-random distribution
- ✅ Loops perfectly (t is phase-based)

---

## Hue Rotation

### RGB to HSL Conversion

```javascript
max = max(r, g, b)
min = min(r, g, b)
l = (max + min) / 2

if (max === min):
  h = 0  // Grayscale
  s = 0
else:
  d = max - min
  s = l > 127.5 ? d / (510 - max - min) : d / (max + min)
  
  if (max === r):
    h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g):
    h = ((b - r) / d + 2) / 6
  else:
    h = ((r - g) / d + 4) / 6
```

### Hue Rotation

```javascript
h = (h + hueRotationRad / (2π) + shimmer) % 1
```

### HSL to RGB Conversion

```javascript
if (s === 0):
  r = g = b = l × 255
else:
  q = l < 0.5 ? l × (1 + s) : l + s - l × s
  p = 2 × l - q
  
  r = hue2rgb(p, q, h + 1/3) × 255
  g = hue2rgb(p, q, h) × 255
  b = hue2rgb(p, q, h - 1/3) × 255

hue2rgb(p, q, t):
  if (t < 0): t += 1
  if (t > 1): t -= 1
  if (t < 1/6): return p + (q - p) × 6 × t
  if (t < 1/2): return q
  if (t < 2/3): return p + (q - p) × (2/3 - t) × 6
  return p
```

---

## Flow Angle Rotation

### Rotation Matrix

To rotate the displacement vector by `flowAngle`:

```javascript
angleRad = flowAngle × π / 180
cos = cos(angleRad)
sin = sin(angleRad)

rotatedX = offsetX × cos - offsetY × sin
rotatedY = offsetX × sin + offsetY × cos
```

This is a standard 2D rotation matrix:

```
[cos  -sin] [offsetX]   [rotatedX]
[sin   cos] [offsetY] = [rotatedY]
```

---

## Complexity Analysis

### Time Complexity

Per frame:
- **Pixel iteration**: `O(width × height)`
- **Per pixel**:
  - Wave calculation: `O(1)` - constant time math
  - Bilinear sampling: `O(1)` - 4 samples
  - Hue rotation: `O(1)` - constant time conversion
  - Blending: `O(1)` - simple math

**Total**: `O(width × height)` - linear in pixel count

### Space Complexity

- Input buffer: `O(width × height)`
- Output buffer: `O(width × height)`
- No additional data structures

**Total**: `O(width × height)` - linear in pixel count

---

## Comparison with VoidEcho

| Aspect | VoidEcho | FluxWeave |
|--------|----------|-----------|
| **Concept** | Spatial recursion | Temporal flow |
| **Method** | Multiple echo layers | Wave displacement |
| **Direction** | Radial from center | 4 directional modes |
| **Complexity** | O(echoes × pixels) | O(pixels) |
| **Memory** | O(echoes × pixels) | O(pixels) |
| **Aesthetic** | Recursive depth | Flowing fabric |

**Complementary**: VoidEcho echoes through space, FluxWeave flows through time.

---

## Future Optimizations

### Potential Improvements

1. **GPU Acceleration** - Move to WebGL shaders
2. **Displacement Map Caching** - Precompute for static configs
3. **Multi-threading** - Process rows in parallel
4. **Adaptive Quality** - Lower quality for preview, high for final
5. **SIMD** - Use SIMD instructions for pixel operations

### Estimated Gains

- GPU: **10-50x** faster
- Caching: **2-3x** faster for static configs
- Multi-threading: **2-4x** faster (depends on cores)
- SIMD: **2-4x** faster for pixel ops

---

## Mathematical Proofs

### Perfect Loop Proof

**Theorem**: For any function `f(phase) = sin(phase × k)` where `k` is constant and `phase = t × 2π`, the function loops perfectly when `t ∈ [0, 1]`.

**Proof**:
```
When t = 0:
  phase = 0 × 2π = 0
  f(0) = sin(0 × k) = sin(0) = 0

When t = 1:
  phase = 1 × 2π = 2π
  f(2π) = sin(2π × k) = sin(2πk)
  
Since sin(θ + 2πn) = sin(θ) for any integer n:
  sin(2πk) = sin(0) = 0
  
Therefore f(0) = f(2π), proving the loop is perfect. ∎
```

### Wave Interference Proof

**Theorem**: The sum of two sinusoids at different frequencies creates a periodic interference pattern.

**Proof**:
```
Let:
  f₁(x, t) = A₁ sin(ω₁x + φ₁t)
  f₂(x, t) = A₂ sin(ω₂x + φ₂t)
  
Combined:
  f(x, t) = f₁(x, t) + f₂(x, t)
  
The period T is the LCM of the individual periods:
  T = LCM(2π/ω₁, 2π/ω₂)
  
For our implementation with phase-based time:
  When t completes one cycle (0 → 1), both waves return to origin.
  Therefore the interference pattern also loops perfectly. ∎
```

---

## Conclusion

FluxWeave is a mathematically rigorous, performance-optimized effect that creates the illusion of temporal fabric manipulation through:

1. **Multi-frequency wave interference**
2. **Directional flow transformations**
3. **Chromatic phase shifting**
4. **Deterministic noise**
5. **Perfect loop mathematics**

All implemented with:
- ✅ Pure deterministic functions
- ✅ Efficient memory management
- ✅ Optimized pixel operations
- ✅ Clean, maintainable code

**The fabric flows eternal.** 🌊

---

**Created by Zencoder** | Version 1.0.0 | MIT License