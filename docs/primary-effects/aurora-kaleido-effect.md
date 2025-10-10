# Aurora Kaleidoscope Flow (Primary Effect)

## Summary
Flowing aurora ribbons reflected through a kaleidoscope. Symmetric, prismatic trails morph smoothly over time and loop perfectly. Colors are fully configurable.

## Features
- Kaleidoscopic symmetry with optional radial reflection
- Lissajous-driven aurora ribbons/streaks/points
- Breathing morph and global swirl for lively motion
- Perfect loop by construction (integer frequencies, 2π phase)
- Deterministic output (seeded) and serializable config

## Config (flat, serializable)
- **seed**: number (default random)
- **segments**: integer (default 8)
- **symmetryReflection**: boolean (default true)
- **ribbonCount**: integer (default 18)
- **ribbonWidth**: number px (default 6)
- **ribbonWidthJitter**: 0..1 (default 0.4)
- **freqX**: integer (default 3)
- **freqY**: integer (default 2)
- **phaseOffset**: number (default 0)
- **swirlSpeed**: number (default 0.25)
- **swirlAmplitude**: 0..1 (default 0.35)
- **morphSpeed**: number (default 0.5)
- **morphDepth**: 0..1 (default 0.4)
- **ribbonTrail**: integer (default 48)
- **renderMode**: 'ribbons' | 'streaks' | 'points' (default 'ribbons')
- **samplingResolution**: integer (default 96)
- **opacity**: 0..1 (default 1)
- **lineWidth**: number px (default 1.5)
- **bgStartColor**: ColorPicker/string (default '#030711')
- **bgEndColor**: ColorPicker/string (default '#0b1b36')
- **colorA**: ColorPicker/string (default '#33d1ff')
- **colorB**: ColorPicker/string (default '#9b5bff')
- **colorC**: ColorPicker/string (default '#ff5ea0')
- **colorMode**: 'angle' | 'radius' | 'time' (default 'angle')
- **blendMode**: string (default 'screen')
- **layerOpacity**: 0..1 (default 1)
- **perfectLoop**: boolean (default true)

All fields are primitives or ColorPicker; config serializes with JSON.

## Usage
```javascript
import { AuroraKaleidoEffect } from './src/effects/primaryEffects/AuroraKaleido/AuroraKaleidoEffect.js';
import { AuroraKaleidoConfig } from './src/effects/primaryEffects/AuroraKaleido/AuroraKaleidoConfig.js';

const config = new AuroraKaleidoConfig({
  segments: 10,
  ribbonCount: 24,
  freqX: 3,
  freqY: 5,
  colorMode: 'angle',
  layerOpacity: 0.95,
});

const effect = new AuroraKaleidoEffect({ config, settings });
await effect.invoke(layer, currentFrame, numberOfFrames); // returns a my-nft-gen layer
```

## Notes
- Perfect loop ensured via periodic functions of `currentFrame / numberOfFrames` with integer frequencies.
- No per-frame randomness; all randomness is precomputed in `generate()` based on `seed`.
- Colors resolved from `ColorPicker` to string before render for deterministic results.

## Preset Ideas
- **Neon Aurora**: segments=12, ribbonCount=28, colorA=#32ffe8, colorB=#5f3bff, colorC=#ff5ea0
- **Cold Sky**: segments=8, ribbonCount=16, colorA=#5bbcff, colorB=#3a6bff, colorC=#bde3ff, colorMode='radius'