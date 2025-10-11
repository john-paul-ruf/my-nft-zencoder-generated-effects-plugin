# HoloFoil (Final Image Effect)

## Summary
Deterministic, prismatic holographic foil post‑process for trading‑card‑style shimmer. Perfect looping via periodic animation of grating/shimmer/ripple.

- **Category**: FINAL_IMAGE (post-process)
- **Looping**: Perfect loop (t = frame/totalFrames)
- **Config**: Flat, JSON‑serializable
- **Purity**: All randomness resolved in constructor; invoke is pure per frame

## Installation
No additional dependencies beyond the plugin’s existing stack.

```bash
npm install
```

Ensure the plugin is registered (plugin.js already wires HoloFoil as FINAL_IMAGE).

## Quick Start
```javascript
import { HoloFoilConfig } from '../../../src/effects/finalImageEffects/HoloFoil/HoloFoilConfig.js';
import { HoloFoilEffect } from '../../../src/effects/finalImageEffects/HoloFoil/HoloFoilEffect.js';

// Typical my-nft-gen usage context
const config = new HoloFoilConfig({
  seed: 1337,
  layerOpacity: 1.0,
  baseHue: 210,
  saturation: 0.9,
  value: 1.0,
  rainbowStrength: 0.85,
  gratingScale: 1.2,
  gratingAngleDeg: 25,
  gratingOrderCount: 3,
  shimmerStrength: 0.6,
  shimmerSpeed: 1.0,
  rippleStrength: 0.25,
  rippleFrequency: 2.0,
  rippleSpeed: 0.75,
  tiltStrength: 0.3,
  rotationSpeed: 0.5,
  animationMode: 'rotate', // 'rotate' | 'tilt' | 'ripple' | 'pulse' | 'static'
  colorMode: 'prismatic',   // 'prismatic' | 'tinted' | 'mono'
  highlightBoost: 0.4,
  vignetteStrength: 0.15,
  scratchDensity: 0.2,
  scratchAngleDeg: 12,
  scratchContrast: 0.65,
  grainStrength: 0.08,
  preserveAlpha: true
});

const effect = new HoloFoilEffect({ config, settings: { width: 1920, height: 1080 } });
// In your render loop:
// await effect.invoke(layer, frameNumber, totalFrames);
```

## Minimal Usage in Pipeline
If you’re using the plugin registry, request by name:
```javascript
import { EffectRegistry, EffectCategories } from 'my-nft-gen/src/core/registry/EffectRegistry.js';

const EffectClass = EffectRegistry.get('holofoil');
const effect = new EffectClass({ config: new HoloFoilConfig({ animationMode: 'pulse' }) });
await effect.invoke(layer, currentFrame, numberOfFrames);
```

## Render Modes
- **animationMode**:
  - **rotate**: Rotates grating basis over time (default cinematic shimmer)
  - **tilt**: Subtle intensity oscillation (simulates tilt‑card effect)
  - **ripple**: Radial ripple phase modulation
  - **pulse**: Global intensity breathing
  - **static**: No time modulation
- **colorMode**:
  - **prismatic**: HSV spectrum around baseHue with rainbowStrength
  - **tinted**: Screen‑blends toward `tintRed`, `tintGreen`, `tintBlue`
  - **mono**: Grayscale intensity

## Key Parameters
- **seed**: Deterministic variations across gratings/scratches
- **baseHue, saturation, value**: HSV base for prismatic mode
- **rainbowStrength**: Spectral sweep amplitude (0..1)
- **gratingScale**: Spatial frequency; higher = finer bands
- **gratingAngleDeg**: Main grating orientation
- **gratingOrderCount**: Number of grating orders mixed (1..5)
- **shimmerStrength/Speed**: Global oscillation of grating phase
- **rippleStrength/Frequency/Speed**: Radial ripple shaping
- **tiltStrength**: Intensity influence for tilt mode
- **rotationSpeed**: Revolutions per loop for rotate mode
- **highlightBoost**: Accentuate bright regions from source
- **vignetteStrength**: Falloff toward edges
- **scratchDensity/Angle/Contrast**: Micro‑scratch look
- **grainStrength**: Dither to reduce banding
- **preserveAlpha**: Keep source alpha
- **layerOpacity**: Final layer opacity after processing

## Perfect Looping
HoloFoil uses periodic functions of `t = frame/totalFrames` with integer‑like multipliers (rotation, shimmer, ripple) to guarantee seamless loops.

## Tips
- For strong “trading card shimmer,” use `animationMode: 'rotate'`, `gratingScale ~ 1.0–1.6`, `rainbowStrength ~ 0.7–0.95`.
- Reduce `grainStrength` if output is already dithered.
- For subtle foil, lower `rainbowStrength` and `highlightBoost`.

## Troubleshooting
- Banding: Increase `grainStrength` slightly (e.g., 0.08 → 0.12).
- Too strong colors: Lower `rainbowStrength` and/or `saturation`.
- Visible seams in loop: Keep `rotationSpeed`, `shimmerSpeed`, `rippleFrequency` as integers or simple ratios.

## See Also
- Demo presets: `src/effects/finalImageEffects/HoloFoil/demo.js`
- Other final effects for reference: `FluxWeave`, `ChromaticAberration`