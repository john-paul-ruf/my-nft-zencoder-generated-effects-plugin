# Spectral Overwatch — Final Image Effect

## Overview
Spectral Overwatch is a keyframe-driven, final-image post-process that overlays a holographic spectral sweep with prismatic caustics. It honors transparency, runs in deterministic windows, and loops perfectly within each active window.

- **Category**: FINAL_IMAGE
- **Looping**: Perfect per-window (cycles rounded to integers)
- **Transparency**: Preserved when `preserveAlpha` is true
- **Determinism**: Schedule derived from `seed`, `keyFrames`, and `glitchFrameCount`
- **Config**: Flat, serializable, no nested objects

## Why this effect
- Reusable keyframe scheduling pattern using `keyFrames` plus a deterministic duration from `[min,max]`.
- Ensures consistent output across runs (seed → same frames/windows).
- Works as a pure final-image effect with no new dependencies and a clean integration style.

## Core concepts
- **Keyframes**: Start indices where the effect becomes active.
- **Window duration**: Derived from `[min,max]` using a stable hash of `(seed, index)`.
- **Perfect per-window loop**: Rotation, ripple, and shimmer cycles are rounded to integers to ensure seamless animation loops within each window.
- **Color modes**: `mono`, `tinted`, or `prismatic`.

## API Summary
Exports from `src/effects/finalImageEffects/SpectralOverwatch/index.js`:
- `SpectralOverwatchConfig`
- `SpectralOverwatchEffect`

```javascript
new SpectralOverwatchConfig({
  seed: 1337,
  keyFrames: [0, 120, 360, 900],
  glitchFrameCount: [15, 30],
  colorMode: 'prismatic', // 'mono' | 'tinted' | 'prismatic'
  baseHue: 210,
  saturation: 0.9,
  value: 1.0,
  tintRed: '#FF6666',
  tintGreen: '#66FF66',
  tintBlue: '#6666FF',
  sweepAngleDeg: 25,
  sweepWidth: 0.35,
  rotationSpeed: 1.0,    // cycles per window (rounded to integer)
  rippleFrequency: 2.0,
  rippleSpeed: 1.0,
  shimmerSpeed: 3.0,
  highlightBoost: 1.25,
  vignetteStrength: 0.2,
  causticStrength: 1.0,
  grainStrength: 0.05,
  preserveAlpha: true,
  layerOpacity: 1.0,
  interpolation: 'nearest' // 'nearest' | 'bilinear'
});
```

## Behavior
- If the current frame is not in any active window, the effect passes the image through unchanged (except for the optional global `layerOpacity`).
- In active windows, the effect computes a normalized `t ∈ [0,1)` and applies animated sweep, ripple, shimmer, and prismatic mapping.
- Output is blended screen-like and respects the original alpha when `preserveAlpha` is true.

## Registration
The plugin registers Spectral Overwatch under `FINAL_IMAGE` and assigns its config via `_configClass_`. See `plugin.js` for the dynamic import and registration block.

## See also
- QUICKSTART.md for a minimal runnable example
- ARCHITECTURE.md for internals and scheduling details
- MANIFEST.md for metadata and compatibility