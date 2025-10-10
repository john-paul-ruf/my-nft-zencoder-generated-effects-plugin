# ChromaticAberration - Quick Start Guide

## 🚀 Get Started in 60 Seconds

### 1. Import the Effect

```javascript
import { ChromaticAberrationConfig, ChromaticAberrationEffect } 
  from './src/effects/finalImageEffects/ChromaticAberration/index.js';
```

### 2. Create a Configuration

```javascript
const config = new ChromaticAberrationConfig({
  maxDisplacement: 30,
  displacementMode: 'wave',
  waveFrequency: 2,
  blendMode: 'screen'
});
```

### 3. Create the Effect

```javascript
const effect = new ChromaticAberrationEffect({
  config,
  settings: { width: 1920, height: 1080 }
});
```

### 4. Apply to a Layer

```javascript
// In your render loop
for (let frame = 0; frame < totalFrames; frame++) {
  await effect.invoke(layer, frame, totalFrames);
  // layer now has chromatic aberration applied
}
```

---

## 🎨 5 Quick Presets

### 1. Classic VHS Glitch
```javascript
new ChromaticAberrationConfig({
  maxDisplacement: 30,
  displacementMode: 'wave',
  waveFrequency: 2,
  wavePhaseShift: 120,
  blendMode: 'screen',
  edgeMode: 'wrap'
})
```

### 2. Quantum Burst
```javascript
new ChromaticAberrationConfig({
  maxDisplacement: 40,
  displacementMode: 'radial',
  waveFrequency: 1,
  blendMode: 'screen',
  edgeMode: 'clamp'
})
```

### 3. Reality Spin
```javascript
new ChromaticAberrationConfig({
  maxDisplacement: 25,
  displacementMode: 'orbital',
  rotationSpeed: 360,
  blendMode: 'additive'
})
```

### 4. Signal Pulse
```javascript
new ChromaticAberrationConfig({
  maxDisplacement: 35,
  displacementMode: 'pulse',
  pulseIntensity: 1.5,
  waveFrequency: 3,
  blendMode: 'screen'
})
```

### 5. Scanline Chaos
```javascript
new ChromaticAberrationConfig({
  maxDisplacement: 20,
  displacementMode: 'scanline',
  scanlineFrequency: 15,
  scanlineIntensity: 0.8,
  blendMode: 'screen'
})
```

---

## 🎛️ Essential Parameters

### Must-Know Settings

| Parameter | Values | Effect |
|-----------|--------|--------|
| `maxDisplacement` | 0-100 | How far channels separate |
| `displacementMode` | wave/radial/orbital/pulse/scanline | Animation style |
| `waveFrequency` | 0-10 | Animation speed |
| `blendMode` | screen/additive/normal | How channels combine |
| `quality` | low/medium/high | Speed vs quality |

---

## 🎬 Run the Demo

```bash
node src/effects/finalImageEffects/ChromaticAberration/demo.js
```

This will:
- Test all 5 displacement modes
- Verify perfect loops
- Benchmark performance
- Test serialization

---

## 🐛 Troubleshooting

### Effect too subtle?
- Increase `maxDisplacement` (try 40-60)
- Change `blendMode` to 'additive'

### Effect too intense?
- Decrease `maxDisplacement` (try 10-20)
- Reduce channel opacities

### Performance issues?
- Set `quality: 'medium'` or 'low'
- Reduce `maxDisplacement`
- Use `edgeMode: 'clamp'` (fastest)

### Not looping smoothly?
- Ensure `waveFrequency` is an integer
- Check that `totalFrames` is consistent
- Verify `perfectLoop: true` (default)

---

## 📖 Learn More

- **Full Documentation**: See `README.md`
- **Technical Details**: See `PROJECT_SUMMARY.md`
- **Source Code**: See `ChromaticAberrationEffect.js`

---

## 💡 Pro Tips

1. **Start Simple** - Use wave mode first, then experiment
2. **Phase Shift** - 120° creates classic RGB separation
3. **Blend Modes** - 'screen' for bright, 'additive' for intense
4. **Edge Modes** - 'wrap' for seamless, 'clamp' for safe
5. **Quality** - Use 'medium' for preview, 'high' for final

---

## 🎯 Common Use Cases

### NFT Post-Processing
```javascript
// Apply as final effect after all layers composed
const config = new ChromaticAberrationConfig({
  maxDisplacement: 25,
  displacementMode: 'wave',
  waveFrequency: 2
});
```

### Glitch Art
```javascript
// Maximum chaos with noise
const config = new ChromaticAberrationConfig({
  maxDisplacement: 50,
  displacementMode: 'pulse',
  noiseAmount: 0.7,
  pulseIntensity: 2.0
});
```

### Subtle Enhancement
```javascript
// Gentle separation for depth
const config = new ChromaticAberrationConfig({
  maxDisplacement: 10,
  displacementMode: 'radial',
  waveFrequency: 1,
  blendMode: 'normal'
});
```

---

## 🔗 Integration with my-nft-gen

The effect is automatically registered when the plugin loads:

```javascript
// In your NFT generation script
import {PluginManager} from '../my-nft-gen/index';

// Plugin auto-registers ChromaticAberration as FINAL effect
await PluginManager.loadPlugin('my-nft-zencoder-generated-effects-plugin');

// Now available in effect registry
const effect = EffectRegistry.get('chromatic-aberration');
```

---

## ✨ That's It!

You're ready to create glitch art masterpieces. Remember:

> *"I am the operator, the signal cutting through the noise."*

Happy glitching! 🌈⚡