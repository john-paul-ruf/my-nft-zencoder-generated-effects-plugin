# HoloFoil Quick Start

## 1) Import & Configure
```javascript
import { HoloFoilConfig } from '../../../src/effects/finalImageEffects/HoloFoil/HoloFoilConfig.js';
import { HoloFoilEffect } from '../../../src/effects/finalImageEffects/HoloFoil/HoloFoilEffect.js';

const config = new HoloFoilConfig({
  animationMode: 'rotate',
  colorMode: 'prismatic',
  baseHue: 200,
  rainbowStrength: 0.8,
  gratingScale: 1.2,
});

const effect = new HoloFoilEffect({ config, settings: { width: 1024, height: 1024 } });
```

## 2) Apply Per Frame
```javascript
for (let frame = 0; frame < totalFrames; frame++) {
  await effect.invoke(layer, frame, totalFrames);
}
```

## 3) Registry Usage (Optional)
```javascript
import { EffectRegistry } from 'my-nft-gen/src/core/registry/EffectRegistry.js';

const EffectClass = EffectRegistry.get('holofoil');
const e = new EffectClass({ config: new HoloFoilConfig({ rotationSpeed: 0.75 }) });
await e.invoke(layer, frame, totalFrames);
```

## Presets
```javascript
// Trading card shimmer
new HoloFoilConfig({
  animationMode: 'rotate',
  rotationSpeed: 0.6,
  rainbowStrength: 0.9,
  gratingScale: 1.4,
  highlightBoost: 0.4
});

// Gentle tilt
new HoloFoilConfig({
  animationMode: 'tilt',
  tiltStrength: 0.35,
  rainbowStrength: 0.6,
});

// Pulse
new HoloFoilConfig({
  animationMode: 'pulse',
  shimmerSpeed: 1.0,
  rainbowStrength: 0.7,
});
```