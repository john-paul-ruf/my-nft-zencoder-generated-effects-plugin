# 🌀 VoidEcho - Quick Start Guide

## 5-Minute Setup

### 1. Import the Effect
```javascript
import { VoidEchoEffect, VoidEchoConfig } from './VoidEcho/index.js';
```

### 2. Create a Configuration
```javascript
const config = new VoidEchoConfig({
  echoCount: 5,              // How many echoes
  displacementRadius: 80,    // How far they move
  chromaticStrength: 8,      // RGB separation
  blendMode: 'screen',       // How they combine
  tintColor: '#00ffff'       // Color tint
});
```

### 3. Create the Effect
```javascript
const effect = new VoidEchoEffect({ config });
```

### 4. Apply to Layer
```javascript
await effect.invoke(layer, frameNumber, totalFrames);
```

**Done!** Your image now has recursive chromatic echoes. 🎉

---

## Parameter Cheat Sheet

### 🔢 Echo System
```javascript
echoCount: 5        // 2-12   | More = deeper effect
echoSpacing: 0.15   // 0.05-0.5 | Smaller = tighter echoes
echoDecay: 0.7      // 0.3-0.95 | Higher = echoes last longer
```

### 📍 Displacement
```javascript
displacementRadius: 80   // 20-200 | Pixels to move
displacementSpeed: 1.0   // 0.1-3.0 | Animation speed
displacementAngle: 0     // 0-360  | Starting direction
```

### 🌈 Chromatic
```javascript
chromaticStrength: 8    // 0-30  | RGB separation
chromaticRotation: 120  // 0-180 | Angle between channels
```

### 🎨 Colors
```javascript
tintColor: '#00ffff'       // Hex color
tintStrength: 0.3          // 0-1 | How much tint
vignetteColor: '#000000'   // Hex color
vignetteStrength: 0.4      // 0-1 | Edge darkening
```

### 🎭 Blend & Animation
```javascript
blendMode: 'screen'        // 'screen', 'add', 'overlay', 'normal'
feedbackStrength: 0.6      // 0-1 | Echo recursion
pulseIntensity: 0.5        // 0-1 | Breathing effect
rotationSpeed: 0.3         // 0-2 | Spinning speed
```

---

## Visual Parameter Guide

### Echo Count
```
echoCount: 2          echoCount: 5          echoCount: 10
    ●                     ●                      ●
    ●                     ●                      ●
                          ●                      ●
                          ●                      ●
                          ●                      ●
                                                 ●
                                                 ●
                                                 ●
                                                 ●
                                                 ●
```

### Displacement Radius
```
radius: 30            radius: 80            radius: 150
   ●─●                   ●────●                 ●────────●
```

### Chromatic Strength
```
strength: 0           strength: 8           strength: 20
   RGB                  R G B                 R   G   B
   |||                  | | |                 |   |   |
```

### Blend Mode
```
screen:  Brightens, glows
add:     Intense, blown out
overlay: Contrast enhanced
normal:  Standard alpha
```

---

## Quick Presets

### Copy-Paste Ready

#### Subtle Effect
```javascript
new VoidEchoConfig({
  echoCount: 3,
  displacementRadius: 30,
  chromaticStrength: 4,
  blendMode: 'overlay',
  tintStrength: 0.1
})
```

#### Psychedelic
```javascript
new VoidEchoConfig({
  echoCount: 8,
  displacementRadius: 120,
  chromaticStrength: 15,
  blendMode: 'screen',
  tintColor: '#ff00ff',
  tintStrength: 0.4,
  pulseIntensity: 0.7
})
```

#### Glitch
```javascript
new VoidEchoConfig({
  echoCount: 4,
  displacementRadius: 60,
  chromaticStrength: 12,
  chromaticRotation: 180,
  blendMode: 'overlay',
  smoothing: false
})
```

#### Meditation
```javascript
new VoidEchoConfig({
  echoCount: 6,
  displacementRadius: 40,
  displacementSpeed: 0.3,
  chromaticStrength: 6,
  blendMode: 'screen',
  tintColor: '#8800ff',
  pulseIntensity: 0.6
})
```

---

## Common Patterns

### Maximum Depth
```javascript
{
  echoCount: 12,           // Maximum echoes
  echoSpacing: 0.06,       // Tight spacing
  echoDecay: 0.9,          // Long fade
  displacementRadius: 100  // Moderate movement
}
```

### Fast Motion
```javascript
{
  displacementSpeed: 2.5,  // Fast animation
  rotationSpeed: 1.5,      // Fast rotation
  pulseIntensity: 0.8      // Strong pulse
}
```

### Extreme Chromatic
```javascript
{
  chromaticStrength: 25,   // Maximum separation
  chromaticRotation: 90,   // 90° between channels
  blendMode: 'add'         // Intense blending
}
```

### Subtle Enhancement
```javascript
{
  echoCount: 3,            // Few echoes
  displacementRadius: 20,  // Small movement
  chromaticStrength: 3,    // Minimal separation
  blendMode: 'overlay',    // Balanced blend
  tintStrength: 0.1        // Light tint
}
```

---

## Troubleshooting

### Effect Too Subtle?
- ⬆️ Increase `echoCount`
- ⬆️ Increase `displacementRadius`
- ⬆️ Increase `chromaticStrength`
- Change `blendMode` to `'screen'` or `'add'`

### Effect Too Intense?
- ⬇️ Decrease `echoCount`
- ⬇️ Decrease `displacementRadius`
- ⬇️ Decrease `chromaticStrength`
- Change `blendMode` to `'overlay'` or `'normal'`

### Animation Too Fast?
- ⬇️ Decrease `displacementSpeed`
- ⬇️ Decrease `rotationSpeed`
- ⬇️ Decrease `pulseIntensity`

### Animation Too Slow?
- ⬆️ Increase `displacementSpeed`
- ⬆️ Increase `rotationSpeed`
- ⬆️ Increase `pulseIntensity`

### Colors Wrong?
- Change `tintColor` (hex format: `'#RRGGBB'`)
- Adjust `tintStrength` (0 = none, 1 = full)
- Change `vignetteColor` for edge color

### Performance Issues?
- Set `smoothing: false` (faster, sharper)
- ⬇️ Decrease `echoCount`
- ⬇️ Decrease resolution

---

## Testing Your Config

### Serialization Test
```javascript
const config = new VoidEchoConfig({ /* your params */ });
const json = config.toJSON();
const restored = VoidEchoConfig.fromJSON(json);

console.log('Match:', 
  JSON.stringify(config.toJSON()) === 
  JSON.stringify(restored.toJSON())
);
// Should print: Match: true
```

### Parameter Validation Test
```javascript
const config = new VoidEchoConfig({
  echoCount: 999,  // Will clamp to 12
  chromaticStrength: -10  // Will clamp to 0
});

console.log(config.echoCount);  // 12
console.log(config.chromaticStrength);  // 0
```

---

## Performance Tips

### For Speed
```javascript
{
  smoothing: false,        // Disable interpolation
  echoCount: 3,            // Fewer echoes
  chromaticStrength: 5     // Less chromatic work
}
```

### For Quality
```javascript
{
  smoothing: true,         // Enable interpolation
  echoCount: 8,            // More echoes
  chromaticStrength: 15    // More chromatic detail
}
```

### Balanced
```javascript
{
  smoothing: true,         // Quality sampling
  echoCount: 5,            // Moderate echoes
  chromaticStrength: 8     // Moderate chromatic
}
```

---

## Integration Examples

### With my-nft-gen
```javascript
import { VoidEchoEffect, VoidEchoConfig } from './VoidEcho/index.js';

// In your generation pipeline
const finalEffect = new VoidEchoEffect({
  config: new VoidEchoConfig({
    echoCount: 5,
    displacementRadius: 80,
    chromaticStrength: 8,
    blendMode: 'screen'
  })
});

// Apply to composite layer
for (let frame = 0; frame < totalFrames; frame++) {
  await finalEffect.invoke(compositeLayer, frame, totalFrames);
  await compositeLayer.save(`output/frame_${frame}.png`);
}
```

### With Presets
```javascript
import { presets, createEffectWithPreset } from './VoidEcho/demo.js';

// Use a preset
const effect = createEffectWithPreset('psychedelicPortal');
await effect.invoke(layer, frameNumber, totalFrames);

// Or customize a preset
const customConfig = new VoidEchoConfig({
  ...presets.psychedelicPortal.toJSON(),
  tintColor: '#00ff00',  // Override tint color
  echoCount: 10          // Override echo count
});
```

---

## Next Steps

1. **Experiment** - Try different presets
2. **Customize** - Adjust parameters to taste
3. **Combine** - Use with other effects
4. **Share** - Show off your creations

---

## Resources

- **README.md** - Full documentation
- **ARCHITECTURE.md** - Technical details
- **demo.js** - 8 preset configurations
- **MANIFEST.md** - Project summary

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│                  VOIDECHO QUICK REF                      │
├─────────────────────────────────────────────────────────┤
│ ECHOES                                                   │
│  echoCount: 2-12        | More = deeper                 │
│  echoSpacing: 0.05-0.5  | Smaller = tighter             │
│  echoDecay: 0.3-0.95    | Higher = longer fade          │
├─────────────────────────────────────────────────────────┤
│ DISPLACEMENT                                             │
│  radius: 20-200         | Pixels to move                │
│  speed: 0.1-3.0         | Animation speed               │
│  angle: 0-360           | Starting direction            │
├─────────────────────────────────────────────────────────┤
│ CHROMATIC                                                │
│  strength: 0-30         | RGB separation                │
│  rotation: 0-180        | Angle between channels        │
├─────────────────────────────────────────────────────────┤
│ BLEND                                                    │
│  screen   | Brightens, glows                            │
│  add      | Intense, blown out                          │
│  overlay  | Contrast enhanced                           │
│  normal   | Standard alpha                              │
├─────────────────────────────────────────────────────────┤
│ COLORS                                                   │
│  tintColor: '#RRGGBB'   | Hex color                     │
│  tintStrength: 0-1      | How much tint                 │
│  vignetteStrength: 0-1  | Edge darkening                │
├─────────────────────────────────────────────────────────┤
│ ANIMATION                                                │
│  pulseIntensity: 0-1    | Breathing effect              │
│  rotationSpeed: 0-2     | Spinning speed                │
│  feedbackStrength: 0-1  | Echo recursion                │
└─────────────────────────────────────────────────────────┘
```

---

**Ready to create recursive chromatic portals? Let's go!** 🌀✨