# 🌈 Holographic Prism Effect

Transform your NFT layers into stunning holographic displays with chromatic dispersion, light refraction, and iridescent shimmer!

## ✨ Features

- **Chromatic Aberration**: RGB channel separation creating rainbow edges
- **Prismatic Dispersion**: Wavelength-based pixel displacement
- **Holographic Shimmer**: Animated iridescent color overlay
- **Depth Parallax**: Multi-layer displacement for 3D depth illusion
- **Spectral Glow**: Rainbow glow emanating from edges
- **6 Animation Modes**: Rotation, Pulse, Wave, Shimmer, Depth, Combined
- **Perfect Loop**: Seamless animation loops
- **Transparency Aware**: Respects and preserves alpha channel

## 🚀 Quick Start

```javascript
import { HolographicPrismEffect, HolographicPrismConfig } from './index.js';

// Create configuration
const config = new HolographicPrismConfig({
  animationMode: ['shimmer'],
  chromaticStrength: { lower: 3, upper: 5 },
  shimmerIntensity: { lower: 0.3, upper: 0.5 },
  perfectLoop: true,
});

// Create effect
const effect = new HolographicPrismEffect({ config, settings });

// Apply to layer
await effect.invoke(layer, frameNumber, totalFrames);
```

## 🎨 Animation Modes

### Rotation
Prism rotates creating sweeping rainbow trails
```javascript
animationMode: ['rotation']
```

### Pulse
Dispersion intensity pulses rhythmically
```javascript
animationMode: ['pulse']
```

### Wave
Sine wave distortion travels across the layer
```javascript
animationMode: ['wave']
```

### Shimmer
Iridescent colors flow across the surface
```javascript
animationMode: ['shimmer']
```

### Depth
Parallax layers shift creating 3D depth
```javascript
animationMode: ['depth']
```

### Combined
All effects work together
```javascript
animationMode: ['combined']
```

## 📋 Configuration Options

### Chromatic Aberration
- `chromaticStrength`: Pixel offset for RGB separation (2-8)
- `chromaticAngle`: Direction of separation (0-360°)

### Prismatic Dispersion
- `dispersionIntensity`: Overall dispersion strength (0.3-0.8)
- `dispersionAngle`: Prism orientation (0-360°)
- `wavelengthSeparation`: Distance between colors (1.5-4)

### Holographic Shimmer
- `shimmerIntensity`: Iridescent overlay strength (0.2-0.6)
- `shimmerSpeed`: Animation speed multiplier (0.5-2)
- `shimmerScale`: Pattern scale (0.002-0.006)

### Depth Parallax
- `parallaxLayers`: Number of depth layers (3-5)
- `parallaxStrength`: Displacement per layer (2-6)
- `parallaxAngle`: Direction of depth shift (0-360°)

### Spectral Glow
- `glowIntensity`: Rainbow glow strength (0.1-0.4)
- `glowRadius`: Glow spread distance (3-8)
- `glowSaturation`: Color saturation (0.6-1.0)

### Color Spectrum
- `spectrumHueStart`: Starting hue (0-360°)
- `spectrumHueRange`: Hue range to cover (180-360°)
- `spectrumSaturation`: Color saturation (0.7-1.0)
- `spectrumBrightness`: Brightness (0.8-1.0)

### Blending
- `effectStrength`: Overall effect intensity (0.5-1.0)
- `preserveOriginal`: Blend with original (0.3-0.7)
- `edgeBehavior`: 'clamp' or 'wrap'

## 🎯 Preset Configurations

### Subtle Shimmer
```javascript
{
  chromaticStrength: { lower: 1, upper: 2 },
  shimmerIntensity: { lower: 0.2, upper: 0.3 },
  effectStrength: { lower: 0.3, upper: 0.5 },
}
```

### Intense Prismatic
```javascript
{
  chromaticStrength: { lower: 6, upper: 10 },
  dispersionIntensity: { lower: 0.7, upper: 0.9 },
  glowIntensity: { lower: 0.3, upper: 0.5 },
}
```

### Deep Parallax
```javascript
{
  animationMode: ['depth'],
  parallaxLayers: { lower: 5, upper: 5 },
  parallaxStrength: { lower: 5, upper: 8 },
}
```

### Rainbow Wave
```javascript
{
  animationMode: ['wave', 'shimmer'],
  shimmerSpeed: { lower: 1.5, upper: 2.5 },
  spectrumHueRange: { lower: 300, upper: 360 },
}
```

## 📚 Documentation

- **Full Documentation**: See `docs/secondary-effects/holographic-prism-effect.md`
- **Demo Examples**: See `demo.js` for preset configurations
- **Technical Details**: Architecture, algorithms, and performance notes in docs

## 🔧 Requirements

- ✅ Respects transparent background
- ✅ Flat configuration structure
- ✅ Perfect loop animation
- ✅ Serializable configuration
- ✅ Configurable colors
- ✅ Returns my-nft-gen layer
- ✅ No additional dependencies
- ✅ Pure function based on constructor data
- ✅ Inherits from LayerEffect

## 🎬 Example Usage

```javascript
import {HolographicPrismEffect, HolographicPrismConfig} from './index.js';
import {LayerFactory} from '../my-nft-gen/src/core/factory/layer/LayerFactory.js';
import {Settings} from '../my-nft-gen/src/core/Settings.js';

// Load layer
const layer = await LayerFactory.createFromFile('input.png');

// Configure effect
const config = new HolographicPrismConfig({
    animationMode: ['rotation', 'shimmer'],
    chromaticStrength: {lower: 4, upper: 6},
    shimmerIntensity: {lower: 0.4, upper: 0.6},
    spectrumHueStart: {lower: 180, upper: 240}, // Blue-purple
    perfectLoop: true,
});

// Create settings
const settings = new Settings({width: 1024, height: 1024});

// Apply effect
const effect = new HolographicPrismEffect({config, settings});

// Render frames
for (let frame = 0; frame < 60; frame++) {
    const processedLayer = await effect.invoke(layer, frame, 60);
    await processedLayer.save(`output/frame_${frame.toString().padStart(4, '0')}.png`);
}
```

## 🌟 Tips

- **Subtle Effects**: Use lower `effectStrength` and higher `preserveOriginal`
- **Intense Effects**: Increase `chromaticStrength` and `dispersionIntensity`
- **Custom Colors**: Adjust `spectrumHueStart` and `spectrumHueRange`
- **Performance**: Use 'clamp' edge behavior for better performance
- **Depth**: Higher alpha values = foreground, lower = background

## 🐛 Troubleshooting

**Effect too subtle?**
- Increase `effectStrength`
- Decrease `preserveOriginal`

**Effect too intense?**
- Decrease `effectStrength`
- Increase `preserveOriginal`

**No animation?**
- Verify `perfectLoop` is true
- Check `animationMode` is set

**Colors not visible?**
- Increase `shimmerIntensity`
- Increase `spectrumSaturation`

## 📝 License

Part of my-nft-zencoder-generated-effects-plugin

## 👨‍💻 Author

Zencoder - AI-powered effect generation

---

**Ready to make your NFTs holographic! 🌈✨**