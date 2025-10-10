# 🌊 FluxWeave - Quick Start Guide

Get up and running with FluxWeave in 5 minutes.

---

## Installation

FluxWeave is part of the `my-nft-zencoder-generated-effects-plugin`. No additional installation needed.

```bash
# Already installed if you have the plugin
npm install
```

---

## 3-Step Usage

### Step 1: Import

```javascript
import { FluxWeaveEffect, FluxWeaveConfig } from './src/effects/finalImageEffects/FluxWeave/index.js';
```

### Step 2: Configure

```javascript
const config = new FluxWeaveConfig({
  waveDirection: 'radial',
  waveAmplitude: 40,
  phaseShiftStrength: 25,
  braidCount: 4,
  tintColor: '#9966ff',
  blendMode: 'screen'
});
```

### Step 3: Apply

```javascript
const effect = new FluxWeaveEffect({ 
  config,
  settings: { width: 1920, height: 1080 }
});

await effect.invoke(layer, frameNumber, totalFrames);
```

**Done!** Your image now flows with temporal fabric. 🌊

---

## Using Presets (Even Faster)

```javascript
import { FluxWeaveEffect } from './src/effects/finalImageEffects/FluxWeave/index.js';
import { PRESETS } from './src/effects/finalImageEffects/FluxWeave/demo.js';

// Pick a preset
const effect = new FluxWeaveEffect({ 
  config: PRESETS.cosmicLoom,
  settings: { width: 1920, height: 1080 }
});

// Apply it
await effect.invoke(layer, 0, 60);
```

### Available Presets

1. **silkCurtain** - Subtle horizontal waves
2. **cosmicLoom** - Radial braiding (recommended!)
3. **prismaticStorm** - Maximum intensity
4. **dnaHelix** - Diagonal braiding
5. **auroraFlow** - Vertical waves
6. **quantumFabric** - High-frequency
7. **meditationWeave** - Slow hypnotic
8. **glitchFabric** - Digital aesthetic

---

## Complete Example

```javascript
import { Layer } from 'my-nft-gen/src/core/layer/Layer.js';
import { FluxWeaveEffect, FluxWeaveConfig } from './src/effects/finalImageEffects/FluxWeave/index.js';

async function applyFluxWeave() {
  // 1. Load your image
  const layer = new Layer({ name: 'my-image' });
  await layer.fromFile('./input.png');

  // 2. Create effect
  const config = new FluxWeaveConfig({
    waveDirection: 'radial',
    waveAmplitude: 50,
    phaseShiftStrength: 30,
    blendMode: 'screen'
  });

  const effect = new FluxWeaveEffect({ 
    config,
    settings: { width: 1920, height: 1080 }
  });

  // 3. Apply to multiple frames
  const totalFrames = 60;
  for (let frame = 0; frame < totalFrames; frame++) {
    await effect.invoke(layer, frame, totalFrames);
    await layer.toFile(`./output/frame-${frame.toString().padStart(4, '0')}.png`);
  }

  console.log('✓ FluxWeave applied to 60 frames!');
}

applyFluxWeave();
```

---

## Key Parameters to Tweak

### For Intensity
```javascript
waveAmplitude: 60      // Higher = more displacement
phaseShiftStrength: 40 // Higher = more color separation
```

### For Direction
```javascript
waveDirection: 'radial'    // 'horizontal' | 'vertical' | 'radial' | 'diagonal'
flowAngle: 45              // Rotate the flow pattern
```

### For Animation Speed
```javascript
waveSpeed1: 2.0      // Faster wave animation
pulseFrequency: 2.0  // Faster breathing
```

### For Colors
```javascript
tintColor: '#ff00ff'     // Magenta tint
hueRotation: 180         // Shift all hues
shimmerSpeed: 2.5        // Faster color animation
```

---

## Common Recipes

### Psychedelic Portal
```javascript
new FluxWeaveConfig({
  waveDirection: 'radial',
  waveAmplitude: 70,
  phaseShiftStrength: 50,
  braidCount: 6,
  blendMode: 'screen'
})
```

### Gentle Silk
```javascript
new FluxWeaveConfig({
  waveDirection: 'horizontal',
  waveAmplitude: 15,
  phaseShiftStrength: 5,
  pulseIntensity: 0.2,
  blendMode: 'overlay'
})
```

### Glitch Art
```javascript
new FluxWeaveConfig({
  waveAmplitude: 60,
  flowTurbulence: 0.9,
  phaseShiftStrength: 45,
  blendMode: 'add'
})
```

### Meditation Visual
```javascript
new FluxWeaveConfig({
  waveSpeed1: 0.3,
  pulseFrequency: 0.5,
  pulseIntensity: 0.6,
  tintColor: '#ff9966',
  blendMode: 'overlay'
})
```

---

## Integration with Plugin System

FluxWeave is automatically registered when you load the plugin:

```javascript
import { register } from './plugin.js';

// Register all effects (including FluxWeave)
register(effectRegistry);

// Now available in the registry
const FluxWeave = effectRegistry.getEffect('flux-weave');
```

---

## Serialization Example

Save and load configurations:

```javascript
// Save
const config = new FluxWeaveConfig({ waveAmplitude: 50 });
const json = JSON.stringify(config.serialize());
fs.writeFileSync('config.json', json);

// Load
const loaded = JSON.parse(fs.readFileSync('config.json'));
const restored = FluxWeaveConfig.deserialize(loaded);
```

---

## Performance Tips

- **Start with presets** - They're optimized
- **Lower amplitude** for faster rendering
- **Reduce braid count** for simpler patterns
- **Test at low resolution** first
- **Use 'normal' blend mode** for speed

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Effect too subtle | Increase `waveAmplitude` and `phaseShiftStrength` |
| Effect too chaotic | Decrease `flowTurbulence` and `braidCount` |
| Colors look wrong | Check `tintColor` format, adjust `tintStrength` |
| Not looping smoothly | Use whole number speeds (1.0, 2.0, etc.) |

---

## Next Steps

1. ✅ Try all 8 presets
2. ✅ Experiment with parameters
3. ✅ Combine with other effects
4. ✅ Read ARCHITECTURE.md for deep dive
5. ✅ Create your own presets

---

## Resources

- **README.md** - Full documentation
- **ARCHITECTURE.md** - Technical details
- **demo.js** - All presets and examples
- **VoidEcho** - Complementary effect

---

**You're ready to weave!** 🌊

The fabric flows eternal. Go create something beautiful.

---

**Created by Zencoder** | Version 1.0.0