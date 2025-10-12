# CircuitStream PCB Style - Quick Start Guide

## 🎯 The Goal
Transform CircuitStream from a **grid overlay** to a **realistic circuit board**.

## ⚡ Quick Answer

### Enable PCB Style (Recommended)
```javascript
const config = new CircuitStreamConfig({
    usePCBStyle: true,           // ← Master switch: enables all PCB features
    showBackgroundGrid: false,   // ← Turn off grid for clean PCB look
});
```

That's it! These two settings transform the appearance.

## 🎨 Full PCB Configuration

### Complete Example

```javascript
import {CircuitStreamConfig} from './CircuitStreamConfig.js';
import {ColorPicker} from '../my-nft-gen/src/core/layer/configType/ColorPicker.js';

const config = new CircuitStreamConfig({
    // ═══════════════════════════════════════
    // PCB MASTER CONTROLS
    // ═══════════════════════════════════════
    usePCBStyle: true,              // Enable realistic PCB appearance
    showBackgroundGrid: false,      // Hide grid for clean look

    // ═══════════════════════════════════════
    // PCB COMPONENTS (Toggle On/Off)
    // ═══════════════════════════════════════
    showComponentPads: true,        // Show landing pads
    showVias: true,                 // Show via holes
    showICFootprints: true,         // Show IC chips
    useCurvedTraces: true,          // Smooth corners

    // ═══════════════════════════════════════
    // TRACE APPEARANCE
    // ═══════════════════════════════════════
    traceWidth: 4,                  // Base trace width (pixels)
    traceWidthVariation: 0.5,       // 0-1: variation (power vs signal)
    traceCurvature: 0.25,           // 0-1: how curved (0=sharp, 1=very curved)
    traceDensity: 0.7,              // 0-1: how many traces

    // ═══════════════════════════════════════
    // COMPONENT COUNTS
    // ═══════════════════════════════════════
    padCount: 40,                   // Number of component pads
    viaCount: 30,                   // Number of via holes
    icCount: 5,                     // Number of IC chips
    nodeCount: 20,                  // Number of logic nodes
    packetCount: 25,                // Number of data packets

    // ═══════════════════════════════════════
    // COMPONENT SIZES
    // ═══════════════════════════════════════
    padRadiusMin: 4,                // Smallest pad size
    padRadiusMax: 8,                // Largest pad size
    viaRadiusMin: 2,                // Smallest via size
    viaRadiusMax: 4,                // Largest via size
    icSizeMin: 40,                  // Smallest IC chip
    icSizeMax: 80,                  // Largest IC chip

    // ═══════════════════════════════════════
    // COLORS (Classic Green PCB)
    // ═══════════════════════════════════════
    traceColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 0),      // Green
    padColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 1),        // Gold
    viaColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 4),        // Silver
    icColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 4),         // White/Gray
    activeTraceColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 2), // Blue (animated)
    dataPacketColor: new ColorPicker(ColorPicker.SelectionType.colorBucket, 3),  // Pink (animated)

    // ═══════════════════════════════════════
    // ANIMATION
    // ═══════════════════════════════════════
    perfectLoop: true,              // Seamless loop
    layerOpacity: 1.0,
    layerBlendMode: 'screen',
});
```

## 🎨 Color Schemes

### Classic Green PCB
```javascript
colorBuckets: [
    ['#00FF41', '#00D936', '#00B32C'], // Bucket 0: Green traces
    ['#FFD700', '#FFA500', '#FF8C00'], // Bucket 1: Gold pads
    ['#4169E1', '#1E90FF', '#00BFFF'], // Bucket 2: Blue signals
    ['#FF1493', '#FF69B4', '#FFB6C1'], // Bucket 3: Pink packets
    ['#FFFFFF', '#E0E0E0', '#C0C0C0'], // Bucket 4: White/silver
]
```

### Modern Blue PCB
```javascript
colorBuckets: [
    ['#4080FF', '#3070EF', '#2060DF'], // Bucket 0: Blue traces
    ['#FFD700', '#FFA500', '#FF8C00'], // Bucket 1: Gold pads
    ['#00FFFF', '#00E0E0', '#00C0C0'], // Bucket 2: Cyan signals
    ['#FF00FF', '#E000E0', '#C000C0'], // Bucket 3: Magenta packets
    ['#FFFFFF', '#F0F0F0', '#E0E0E0'], // Bucket 4: White
]
```

### Dark Stealth PCB
```javascript
colorBuckets: [
    ['#404040', '#505050', '#606060'], // Bucket 0: Dark gray traces
    ['#C0C0C0', '#B0B0B0', '#A0A0A0'], // Bucket 1: Silver pads
    ['#00FFFF', '#00E0E0', '#00C0C0'], // Bucket 2: Cyan signals
    ['#FF0080', '#E00070', '#C00060'], // Bucket 3: Hot pink packets
    ['#808080', '#909090', '#A0A0A0'], // Bucket 4: Gray
]
```

## 📊 Density Presets

### Low Density (Clean, Minimal)
```javascript
{
    padCount: 20,
    viaCount: 15,
    icCount: 3,
    nodeCount: 12,
    traceDensity: 0.5,
}
```

### Medium Density (Default, Balanced)
```javascript
{
    padCount: 40,
    viaCount: 30,
    icCount: 5,
    nodeCount: 20,
    traceDensity: 0.7,
}
```

### High Density (Busy, Complex)
```javascript
{
    padCount: 80,
    viaCount: 60,
    icCount: 10,
    nodeCount: 35,
    traceDensity: 0.9,
}
```

## 🎛️ Style Variations

### Subtle PCB (Professional)
```javascript
{
    usePCBStyle: true,
    showBackgroundGrid: false,
    traceCurvature: 0.2,           // Gentle curves
    traceWidthVariation: 0.3,      // Subtle variation
    padCount: 30,
    viaCount: 20,
    icCount: 4,
}
```

### Dramatic PCB (Artistic)
```javascript
{
    usePCBStyle: true,
    showBackgroundGrid: false,
    traceCurvature: 0.5,           // Strong curves
    traceWidthVariation: 0.8,      // High variation
    padCount: 60,
    viaCount: 45,
    icCount: 8,
}
```

### Retro PCB (Vintage)
```javascript
{
    usePCBStyle: true,
    showBackgroundGrid: true,      // Keep grid for retro feel
    traceCurvature: 0.1,           // Mostly sharp corners
    traceWidthVariation: 0.2,      // Minimal variation
    padCount: 25,
    viaCount: 15,
    icCount: 3,
}
```

## 🔄 Comparison

### Grid Style (Old Way)
```javascript
{
    usePCBStyle: false,            // ← Disable PCB features
    showBackgroundGrid: true,      // ← Show grid
    // Result: Simple grid overlay with sharp corners
}
```

### PCB Style (New Way)
```javascript
{
    usePCBStyle: true,             // ← Enable PCB features
    showBackgroundGrid: false,     // ← Hide grid
    // Result: Realistic circuit board with components
}
```

## 🎯 Key Parameters Explained

### `usePCBStyle` (boolean)
- **true**: Enables all PCB features (pads, vias, ICs, curves, variable widths)
- **false**: Classic grid style (backward compatible)
- **Default**: `true`

### `showBackgroundGrid` (boolean)
- **true**: Shows grid dots in background
- **false**: Clean surface (recommended for PCB look)
- **Default**: `true`

### `traceWidthVariation` (0-1)
- **0**: All traces same width (uniform)
- **0.5**: Moderate variation (recommended)
- **1**: Maximum variation (dramatic)
- **Effect**: Power traces become thicker, signal traces thinner

### `traceCurvature` (0-1)
- **0**: Sharp 90° corners (grid-like)
- **0.25**: Subtle curves (professional)
- **0.5**: Strong curves (artistic)
- **1**: Very curved (organic)

### Component Counts
- Scale with canvas size automatically
- Higher counts = busier appearance
- Lower counts = cleaner, minimal look

## 🚀 Usage Example

```javascript
import { CircuitStreamEffect } from './CircuitStreamEffect.js';
import { CircuitStreamConfig } from './CircuitStreamConfig.js';
import { Settings } from 'my-nft-gen/src/core/Settings.js';

// Create settings with color scheme
const settings = new Settings({
    width: 1024,
    height: 1024,
    totalFrames: 60,
    colorBuckets: [
        ['#00FF41', '#00D936', '#00B32C'], // Green
        ['#FFD700', '#FFA500', '#FF8C00'], // Gold
        ['#4169E1', '#1E90FF', '#00BFFF'], // Blue
        ['#FF1493', '#FF69B4', '#FFB6C1'], // Pink
        ['#FFFFFF', '#E0E0E0', '#C0C0C0'], // White
    ],
});

// Create PCB-style config
const config = new CircuitStreamConfig({
    usePCBStyle: true,
    showBackgroundGrid: false,
    traceWidthVariation: 0.5,
    traceCurvature: 0.25,
});

// Create and use effect
const effect = new CircuitStreamEffect({ config, settings });
await effect.invoke(layer, frameNumber, totalFrames);
```

## ✅ Checklist for PCB Look

- [ ] Set `usePCBStyle: true`
- [ ] Set `showBackgroundGrid: false`
- [ ] Enable `useCurvedTraces: true`
- [ ] Set `traceWidthVariation` between 0.3-0.6
- [ ] Set `traceCurvature` between 0.2-0.4
- [ ] Choose appropriate component counts
- [ ] Use PCB-themed colors (green/gold or blue/gold)

## 🎬 Testing

Run the test files to see the effect in action:

```bash
# Compare grid vs PCB styles side-by-side
node tests/test-circuit-comparison.js

# See full PCB style with all features
node tests/test-circuit-pcb-style.js
```

---

**Bottom Line**: Set `usePCBStyle: true` and `showBackgroundGrid: false` for instant PCB appearance! 🎯