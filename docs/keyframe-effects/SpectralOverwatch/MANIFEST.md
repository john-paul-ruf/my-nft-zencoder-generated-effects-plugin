# Spectral Overwatch — Manifest

- **Name**: spectral-overwatch
- **Display Name**: Spectral Overwatch
- **Category**: FINAL_IMAGE
- **Version**: 1.0.1
- **Author**: Zencoder
- **Tags**: effect, final, post, spectral, caustic, loop, animated

## Config Schema (flat)
- `seed: number`
- `keyFrames: number[]`
- `glitchFrameCount: [number, number]`
- `colorMode: 'mono' | 'tinted' | 'prismatic'`
- `baseHue: number`
- `saturation: number in [0,1]`
- `value: number in [0,1]`
- `tintRed: hex color`
- `tintGreen: hex color`
- `tintBlue: hex color`
- `sweepAngleDeg: number`
- `sweepWidth: number in [0,1]`
- `rotationSpeed: number`
- `rippleFrequency: number`
- `rippleSpeed: number`
- `shimmerSpeed: number`
- `highlightBoost: number in [0,1]`
- `vignetteStrength: number in [0,1]`
- `causticStrength: number >= 0`
- `grainStrength: number in [0,1]`
- `preserveAlpha: boolean`
- `layerOpacity: number in [0,1]`
- `interpolation: 'nearest' | 'bilinear'`

## Behavior
- Pass-through when not in an active window.
- Perfect per-window loops by rounding cycles to integers.
- Alpha-preserving screen-like blend.

## Dependencies
- Uses existing project deps: `sharp`, `my-nft-gen` core modules, `globalBufferPool`.

## Registration
- Registered in `plugin.js` as `EffectCategories.FINAL_IMAGE` with `_configClass_` mapping.