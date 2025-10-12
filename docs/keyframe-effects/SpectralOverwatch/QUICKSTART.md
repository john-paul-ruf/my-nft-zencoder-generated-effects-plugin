# Spectral Overwatch — Quickstart

## Prerequisites
- Node 18+
- `npm install` at project root

## Minimal usage

```javascript
import {
    SpectralOverwatchEffect,
    SpectralOverwatchConfig
} from './index.js';

const width = 512, height = 512;
const config = new SpectralOverwatchConfig({
    keyFrames: [0, 60, 180],
    glitchFrameCount: [20, 20],
    colorMode: 'prismatic',
    baseHue: 200,
});

const effect = new SpectralOverwatchEffect({config, settings: {width, height}});

// Use with a layer implementing getInfo/toBuffer/fromBuffer/adjustLayerOpacity
```

## Run the demo
1. Execute:
```bash
node ./src/effects/finalImageEffects/SpectralOverwatch/demo.js
```
2. Inspect frames in `./output/spectral-overwatch-demo`.

## Key configuration tips
- **Perfect loops**: Keep `rotationSpeed`, `rippleFrequency*rippleSpeed`, and `shimmerSpeed` near integers; the effect rounds them to ensure seamless loops.
- **Determinism**: `seed` fixes window durations; same seed → same schedule.
- **Transparency**: `preserveAlpha: true` preserves the original layer alpha.