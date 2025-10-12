# CircuitStream PCB Quick Reference

## 🎛️ Toggle PCB Features

```javascript
const config = new CircuitStreamConfig({
    usePCBStyle: true,           // Master switch - enables all PCB features
    showComponentPads: true,     // Show component landing pads
    showVias: true,              // Show via holes
    showICFootprints: true,      // Show IC chip outlines
    useCurvedTraces: true,       // Smooth corners vs sharp 90°
    showBackgroundGrid: false,   // Hide grid for clean PCB look
});
```

## 📏 Adjust Appearance

```javascript
{
    // Trace styling
    traceWidth: 4,                  // Base trace width (px)
    traceWidthVariation: 0.5,       // 0=uniform, 1=max variation
    traceCurvature: 0.25,           // 0=sharp, 1=very curved
    traceDensity: 0.7,              // 0=sparse, 1=dense
    
    // Component counts
    padCount: 40,                   // Number of pads
    viaCount: 30,                   // Number of vias
    icCount: 5,                     // Number of IC chips
    nodeCount: 25,                  // Number of nodes
    
    // Component sizes
    padRadiusMin: 4,                // Min pad size
    padRadiusMax: 8,                // Max pad size
    viaRadiusMin: 2,                // Min via size
    viaRadiusMax: 4,                // Max via size
    icSizeMin: 40,                  // Min IC size
    icSizeMax: 80,                  // Max IC size
}
```

## 🎨 Color Schemes

### Classic Green PCB
```javascript
{
    traceColor: '#00FF41',          // PCB green
    activeTraceColor: '#00FFFF',    // Cyan glow
    padColor: '#FFD700',            // Gold pads
    viaColor: '#C0C0C0',            // Silver vias
    icColor: '#FFFFFF',             // White ICs
    dataPacketColor: '#FF1493',     // Pink packets
    nodeColor: '#FFD700',           // Gold nodes
}
```

### Modern Blue PCB
```javascript
{
    traceColor: '#1E90FF',          // Blue
    activeTraceColor: '#00FFFF',    // Cyan
    padColor: '#FFD700',            // Gold
    viaColor: '#FFFFFF',            // White
    icColor: '#E0E0E0',             // Light gray
    dataPacketColor: '#FF69B4',     // Pink
    nodeColor: '#FFD700',           // Gold
}
```

### Dark/Stealth PCB
```javascript
{
    traceColor: '#404040',          // Dark gray
    activeTraceColor: '#00FF00',    // Green glow
    padColor: '#808080',            // Gray pads
    viaColor: '#606060',            // Dark gray vias
    icColor: '#505050',             // Darker gray ICs
    dataPacketColor: '#00FF00',     // Green packets
    nodeColor: '#808080',           // Gray nodes
}
```

## ⚡ Performance Presets

### High Quality (Slow)
```javascript
{
    padCount: 60,
    viaCount: 50,
    icCount: 8,
    nodeCount: 30,
    packetCount: 40,
    blurAmountMin: 2,
    blurAmountMax: 5,
}
```

### Balanced (Default)
```javascript
{
    padCount: 40,
    viaCount: 30,
    icCount: 5,
    nodeCount: 25,
    packetCount: 30,
    blurAmountMin: 1,
    blurAmountMax: 3,
}
```

### Fast (Performance)
```javascript
{
    padCount: 20,
    viaCount: 15,
    icCount: 3,
    nodeCount: 15,
    packetCount: 20,
    blurAmountMin: 0,
    blurAmountMax: 1,
}
```

## 🎬 Animation Settings

```javascript
{
    // Data packet animation
    packetSpeedMin: 0.8,            // Slower packets
    packetSpeedMax: 1.5,            // Faster packets
    packetSizeMin: 4,               // Smaller packets
    packetSizeMax: 8,               // Larger packets
    
    // Trace pulse animation
    energyPulseFrequencyMin: 0.3,   // Slower pulse
    energyPulseFrequencyMax: 0.7,   // Faster pulse
    
    // Node blink animation
    gateBlinkFrequencyMin: 0.5,     // Slower blink
    gateBlinkFrequencyMax: 2.0,     // Faster blink
    
    // Perfect loop
    perfectLoop: true,              // Seamless animation loop
}
```

## 🔄 Common Use Cases

### Minimal Clean PCB
```javascript
new CircuitStreamConfig({
    usePCBStyle: true,
    padCount: 20,
    viaCount: 15,
    icCount: 2,
    nodeCount: 10,
    showBackgroundGrid: false,
    traceWidthVariation: 0.3,
    traceCurvature: 0.2,
})
```

### Dense Complex PCB
```javascript
new CircuitStreamConfig({
    usePCBStyle: true,
    padCount: 80,
    viaCount: 60,
    icCount: 10,
    nodeCount: 40,
    traceDensity: 0.9,
    traceWidthVariation: 0.7,
    traceCurvature: 0.3,
})
```

### Animated Data Flow Focus
```javascript
new CircuitStreamConfig({
    usePCBStyle: true,
    packetCount: 50,
    packetSpeedMin: 1.5,
    packetSpeedMax: 3.0,
    packetGlowRadiusMin: 12,
    packetGlowRadiusMax: 20,
    showComponentPads: false,
    showVias: false,
})
```

### Retro Grid Style (Original)
```javascript
new CircuitStreamConfig({
    usePCBStyle: false,
    showBackgroundGrid: true,
    useCurvedTraces: false,
    traceWidthVariation: 0,
})
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Too cluttered | Reduce `padCount`, `viaCount`, `icCount` |
| Too sparse | Increase component counts |
| Traces too uniform | Increase `traceWidthVariation` |
| Corners too sharp | Increase `traceCurvature` |
| Corners too round | Decrease `traceCurvature` |
| Slow rendering | Use Performance preset |
| Want grid look | Set `usePCBStyle: false` |

## 📦 Import Statements

```javascript
import {CircuitStreamEffect} from './CircuitStreamEffect.js';
import {CircuitStreamConfig} from './CircuitStreamConfig.js';
import {ColorPicker} from '../my-nft-gen/src/core/layer/configType/ColorPicker.js';
import {Settings} from '../my-nft-gen/src/core/Settings.js';
```

## 🧪 Test Commands

```bash
# Compare grid vs PCB styles
node tests/test-circuit-comparison.js

# Test PCB features
node tests/test-circuit-pcb-style.js

# Original test (still works)
node tests/test-circuit-stream.js
```

## 📚 Documentation

- **Full Guide**: `docs/PCB_STYLE_GUIDE.md`
- **Summary**: `docs/CIRCUIT_STREAM_PCB_SUMMARY.md`
- **This File**: `docs/CIRCUIT_PCB_QUICK_REF.md`

## 💡 Pro Tips

1. **Disable grid** for realistic PCB: `showBackgroundGrid: false`
2. **Use curved traces** for modern look: `useCurvedTraces: true`
3. **Vary trace widths** for realism: `traceWidthVariation: 0.5`
4. **Match colors** to PCB theme (green/gold for classic)
5. **Adjust counts** based on canvas size
6. **Enable perfectLoop** for seamless animations
7. **Test performance** before high counts

## 🎯 Key Differences

| Feature | Grid Style | PCB Style |
|---------|-----------|-----------|
| Background | Visible grid | Clean surface |
| Corners | Sharp 90° | Smooth curves |
| Widths | Uniform | Variable |
| Components | Nodes only | Pads, vias, ICs |
| Look | Digital grid | Real PCB |

---

**Quick Start**: Set `usePCBStyle: true` and `showBackgroundGrid: false` for instant PCB look! 🚀