# ✨ Chrono Lenticular Foil Effect

Iridescent holographic shimmer built from micro-groove interference. Produces foil-like spectral glints, subtle refraction, and perfectly looping motion while preserving transparency.

## 🚩 Highlights

- **Interference shimmer**: Two rotating line gratings drive tileable interference
- **Perfect loop**: Integer harmonic phases guarantee seamless cycles
- **Alpha-safe**: Fully transparent pixels preserved; alpha copied back
- **Flat config**: Serializable single-level primitives with toJSON/fromJSON
- **Pure & deterministic**: No randomness; invoke depends on config + frame
- **Configurable color**: Base, highlight, shadow, and hue shift controls
- **Blend modes**: `overlay`, `screen`, or `add`
- **No new deps**: Uses existing sharp + buffer pool

## 🚀 Quick Start

```javascript
import { ChronoLenticularFoilEffect, ChronoLenticularFoilConfig } from '../../../src/effects/secondaryEffects/ChronoLenticularFoil/index.js';

const config = new ChronoLenticularFoilConfig({
  intensity: 0.9,
  grooveAngleDeg: 18,
  grooveCount: 2.0,
  grooveAngle2Deg: 104,
  grooveCount2: 2.6,
  shimmerSpeed: 1.0,
  phaseK1: 3,
  phaseK2: 5,
  hueShiftDeg: 24,
  dispersion: 0.4,
  displacementPx: 2.5,
  edgeBoost: 1.6,
  mode: 'overlay',
  colorBase: '#9ad2ff',
  colorHighlight: '#fff2b6',
  colorShadow: '#2a2a40',
  gamma: 1.0,
  quality: 'medium',
  layerOpacity: 1.0,
});

const effect = new ChronoLenticularFoilEffect({ config, settings });
await effect.invoke(layer, frameNumber, totalFrames);
```

## ⚙️ Configuration

- **seed**: Number used only for deterministic precompute paths (default 1337)
- **intensity**: 0–1 overall blend strength
- **grooveAngleDeg**: First grating angle in degrees
- **grooveCount**: First grating frequency scaler
- **grooveAngle2Deg**: Second grating angle in degrees
- **grooveCount2**: Second grating frequency scaler
- **shimmerSpeed**: Time multiplier for phase motion (>= 0)
- **phaseK1**: Integer harmonic for loop of first grating (>= 1)
- **phaseK2**: Integer harmonic for loop of second grating (>= 1)
- **hueShiftDeg**: Max hue oscillation in degrees applied from interference field
- **dispersion**: 0–1 spectral dispersion strength per channel
- **displacementPx**: Subpixel micro-refraction magnitude in pixels
- **edgeBoost**: Edge highlight amount based on gradient magnitude
- **mode**: 'overlay' | 'screen' | 'add' (blend mode)
- **colorBase**: Hex string for base tint (e.g., `#9ad2ff`)
- **colorHighlight**: Hex string for highlight tint (e.g., `#fff2b6`)
- **colorShadow**: Hex string for shadow tint (e.g., `#2a2a40`)
- **gamma**: 0.5–2.2 output gamma correction
- **quality**: 'low' | 'medium' | 'high' (reserved for future sampling controls)
- **layerOpacity**: 0–1 final layer opacity after processing
- **perfectLoop**: Always true (enforced internally)

## 🎯 Presets

- Subtle Foil
```javascript
{
  intensity: 0.5,
  dispersion: 0.2,
  displacementPx: 1.2,
  edgeBoost: 1.0,
  mode: 'overlay'
}
```

- Vivid Iridescence
```javascript
{
  intensity: 1.0,
  dispersion: 0.6,
  hueShiftDeg: 36,
  displacementPx: 3.0,
  edgeBoost: 1.8,
  mode: 'screen'
}
```

- Prismatic Additive
```javascript
{
  intensity: 0.9,
  dispersion: 0.5,
  hueShiftDeg: 28,
  displacementPx: 2.0,
  mode: 'add'
}
```

## 🧠 How it works

- Two cosine gratings create an interference field I ∈ [-1, 1]
- Analytical gradient steers micro-displacement to simulate refraction
- Per-channel phase offsets produce spectral dispersion
- Hue oscillation modulates color from I; edge glints scale with gradient magnitude
- Final blend over original using selected mode; alpha preserved exactly

## 🧪 Example Usage

```javascript
import { LayerFactory } from 'my-nft-gen/src/core/factory/layer/LayerFactory.js';
import { Settings } from 'my-nft-gen/src/core/Settings.js';
import { ChronoLenticularFoilEffect, ChronoLenticularFoilConfig } from '../../../src/effects/secondaryEffects/ChronoLenticularFoil/index.js';

const layer = await LayerFactory.createFromFile('input.png');
const settings = new Settings({ width: 1024, height: 1024 });
const config = new ChronoLenticularFoilConfig({ intensity: 0.9, dispersion: 0.4, phaseK1: 3, phaseK2: 5 });
const effect = new ChronoLenticularFoilEffect({ config, settings });

for (let frame = 0; frame < 60; frame++) {
  await effect.invoke(layer, frame, 60);
  await layer.save(`output/foil_${String(frame).padStart(2, '0')}.png`);
}
```

## ✅ Requirements Compliance

- Respects transparency • Flat config • Perfect loop • Serializable
- Configurable colors • Returns my-nft-gen layer • No new dependencies
- Pure/deterministic • Inherits required base classes

## 📂 Files
- `src/effects/secondaryEffects/ChronoLenticularFoil/ChronoLenticularFoilEffect.js`
- `src/effects/secondaryEffects/ChronoLenticularFoil/ChronoLenticularFoilConfig.js`
- `src/effects/secondaryEffects/ChronoLenticularFoil/index.js`

---
Craft shimmering, loop-perfect holographic vibes with zero artifacts. ✨