# Liquid Chromatic Effect - Quick Start Guide

## 🚀 5-Minute Setup

### 1. Import
```javascript
import { LiquidChromaticEffect, LiquidChromaticConfig } from './LiquidChromatic/index.js';
```

### 2. Create Config
```javascript
const config = new LiquidChromaticConfig({
  flowSpeed: 1.5,              // How fast liquid flows
  chromaticSeparation: 15,     // RGB channel separation
  iridescenceIntensity: 0.8,   // Color shimmer strength
  primaryHue: 200              // Base color (0-360)
});
```

### 3. Initialize Effect
```javascript
const effect = new LiquidChromaticEffect({
  config,
  settings: { width: 512, height: 512 }
});
```

### 4. Apply to Layer
```javascript
// Single frame
const result = await effect.invoke(layer, 0, 30);

// Animation loop
for (let frame = 0; frame < 30; frame++) {
  const result = await effect.invoke(layer, frame, 30);
  // Save or composite result
}
```

## 🎨 Quick Presets

### Oil Slick (Slow & Iridescent)
```javascript
new LiquidChromaticConfig({
  flowSpeed: 0.5,
  viscosity: 0.8,
  chromaticSeparation: 15,
  iridescenceIntensity: 0.9,
  primaryHue: 280,
  hueShiftRange: 120
})
```

### Liquid Metal (Fast & Shiny)
```javascript
new LiquidChromaticConfig({
  flowSpeed: 1.5,
  viscosity: 0.3,
  specularHighlights: 0.9,
  surfaceTension: 0.7,
  contrastBoost: 0.6
})
```

### Psychedelic Flow (Chaotic & Colorful)
```javascript
new LiquidChromaticConfig({
  flowSpeed: 2.0,
  turbulence: 0.8,
  chromaticSeparation: 25,
  iridescenceIntensity: 1.0,
  hueShiftRange: 180,
  shimmerSpeed: 2.5
})
```

## 🎛️ Key Parameters

### Must-Know Settings
| Parameter | Range | Effect |
|-----------|-------|--------|
| `flowSpeed` | 0-3 | Overall motion speed |
| `chromaticSeparation` | 0-30 | RGB channel offset |
| `iridescenceIntensity` | 0-1 | Color shimmer |
| `waveAmplitude` | 5-50 | Displacement strength |
| `effectIntensity` | 0-1 | Blend with original |

### For Subtle Effects
```javascript
{
  effectIntensity: 0.3,
  waveAmplitude: 10,
  chromaticSeparation: 3
}
```

### For Dramatic Effects
```javascript
{
  effectIntensity: 1.0,
  waveAmplitude: 40,
  chromaticSeparation: 25,
  turbulence: 0.9
}
```

## 🔧 Common Tweaks

### More Liquid Motion
```javascript
{
  flowSpeed: 2.0,
  waveFrequency1: 1.0,
  waveFrequency2: 1.5,
  viscosity: 0.3
}
```

### More Color Shift
```javascript
{
  iridescenceIntensity: 1.0,
  primaryHue: 180,
  hueShiftRange: 180,
  shimmerSpeed: 2.0
}
```

### More Chromatic Aberration
```javascript
{
  chromaticSeparation: 25,
  chromaticFlow: 2.0,
  trailLength: 0.8
}
```

### More Surface Effects
```javascript
{
  surfaceTension: 0.8,
  specularHighlights: 0.9,
  depthGradient: 0.5
}
```

## 🎯 Use Case Recipes

### NFT Enhancement
```javascript
new LiquidChromaticConfig({
  effectIntensity: 0.6,      // Subtle blend
  flowSpeed: 1.0,
  chromaticSeparation: 10,
  iridescenceIntensity: 0.5,
  waveAmplitude: 20
})
```

### Music Visualization
```javascript
new LiquidChromaticConfig({
  flowSpeed: 2.5,            // Fast motion
  turbulence: 0.9,           // Chaotic
  chromaticSeparation: 20,
  pulseFrequency: 4.0,       // Rapid pulsing
  shimmerSpeed: 3.0
})
```

### Logo Animation
```javascript
new LiquidChromaticConfig({
  effectIntensity: 0.4,      // Keep logo visible
  flowSpeed: 0.8,
  waveAmplitude: 15,
  chromaticSeparation: 5,
  edgePreservation: 0.7      // Preserve sharp edges
})
```

### Abstract Art
```javascript
new LiquidChromaticConfig({
  effectIntensity: 1.0,      // Full effect
  flowSpeed: 1.5,
  turbulence: 0.7,
  chromaticSeparation: 20,
  iridescenceIntensity: 0.9,
  waveAmplitude: 35
})
```

## 🐛 Troubleshooting

### Effect Too Subtle
- Increase `effectIntensity` (try 0.8-1.0)
- Increase `waveAmplitude` (try 30-40)
- Increase `chromaticSeparation` (try 20-25)

### Effect Too Chaotic
- Decrease `turbulence` (try 0.2-0.4)
- Decrease `flowSpeed` (try 0.5-1.0)
- Increase `viscosity` (try 0.6-0.8)

### Colors Not Shifting
- Increase `iridescenceIntensity` (try 0.7-1.0)
- Increase `hueShiftRange` (try 120-180)
- Increase `shimmerSpeed` (try 2.0-3.0)

### Not Looping Smoothly
- Ensure `perfectLoop: true` (default)
- Check `totalFrames` is consistent
- Verify frame numbers start at 0

## 📊 Performance Tips

### For Faster Rendering
```javascript
{
  glowRadius: 0,           // Disable glow
  surfaceTension: 0,       // Disable edge detection
  contrastBoost: 0         // Disable contrast
}
```

### For Better Quality
```javascript
{
  glowRadius: 10,          // Soft glow
  surfaceTension: 0.5,     // Edge effects
  contrastBoost: 0.3       // Punch
}
```

## 🎓 Learning Path

1. **Start Simple**: Use a preset
2. **Tweak One Parameter**: See what changes
3. **Combine Effects**: Adjust multiple parameters
4. **Create Preset**: Save your favorite settings
5. **Experiment**: Try extreme values

## 📚 Next Steps

- Read [README.md](README.md) for full documentation
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for technical details
- Run [test.js](../../../src/effects/secondaryEffects/LiquidChromatic/test.js) to verify installation
- Run [demo.js](../../../src/effects/secondaryEffects/LiquidChromatic/demo.js) to see examples

## 💡 Pro Tips

1. **Start with presets** and modify from there
2. **Use seed** for reproducible results
3. **Animate parameters** by changing config per frame
4. **Layer effects** by applying multiple times
5. **Blend modes** work great with other effects

---

*Get flowing in 5 minutes!* 🌊✨