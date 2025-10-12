# CircuitStream PCB Style Guide

## Overview

The CircuitStream effect has been enhanced with **PCB-style features** to make it look like a realistic circuit board instead of a simple grid. This guide explains the new features and how to use them.

## What Changed?

### Before (Grid Style)
- ❌ Uniform grid with visible background lines
- ❌ Sharp 90° corners on all traces
- ❌ All traces have the same width
- ❌ Only basic nodes/junctions
- ❌ Looks like a digital grid overlay

### After (PCB Style)
- ✅ Realistic circuit board appearance
- ✅ Smooth curved trace corners
- ✅ Variable trace widths (power vs signal lines)
- ✅ Component pads (circular, square, rounded)
- ✅ Via holes with inner/outer rings
- ✅ IC chip footprints with pins
- ✅ Looks like an actual PCB

## New Configuration Options

### Enable PCB Features

```javascript
const config = new CircuitStreamConfig({
    // Master switch for PCB-style rendering
    usePCBStyle: true,
    
    // Individual component toggles
    showComponentPads: true,
    showVias: true,
    showICFootprints: true,
    useCurvedTraces: true,
    
    // ... other options
});
```

### Trace Styling

```javascript
{
    // Trace width variation (0-1)
    // 0 = all traces same width
    // 1 = maximum variation between power/signal lines
    traceWidthVariation: 0.5,
    
    // Curve amount for trace corners (0-1)
    // 0 = sharp 90° corners
    // 1 = maximum curve radius
    traceCurvature: 0.3,
    
    // Base trace width
    traceWidth: 4,
}
```

### Component Counts

```javascript
{
    // Number of component pads to generate
    padCount: 40,
    
    // Number of via holes
    viaCount: 30,
    
    // Number of IC chip footprints
    icCount: 5,
}
```

### Component Sizes

```javascript
{
    // Component pad radius range
    padRadiusMin: 4,
    padRadiusMax: 8,
    
    // Via hole radius range
    viaRadiusMin: 2,
    viaRadiusMax: 4,
    
    // IC chip size range
    icSizeMin: 40,
    icSizeMax: 80,
}
```

### PCB Colors

```javascript
{
    // Color for component pads (typically gold/copper)
    padColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
    
    // Color for via holes (typically silver)
    viaColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
    
    // Color for IC chips (typically white/gray)
    icColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
    
    // Color for solder mask (typically green)
    solderMaskColor: new ColorPicker(ColorPicker.SelectionType.colorBucket),
}
```

## PCB Components Explained

### 1. Component Pads
**What they are:** Landing pads where electronic components connect to the PCB

**Shapes:**
- **Circle**: Most common, used for through-hole components
- **Square**: Often used for pin 1 identification
- **Rounded Square**: Modern SMD component pads

**Features:**
- Subtle pulse animation when connected to active traces
- Variable sizes for different component types
- Realistic metallic appearance

### 2. Via Holes
**What they are:** Plated holes that connect traces between PCB layers

**Features:**
- Outer copper ring (annular ring)
- Inner drilled hole (darker)
- Smaller than component pads
- Distributed throughout the board

### 3. IC Footprints
**What they are:** Integrated circuit chip outlines with pins

**Types:**
- **DIP**: Dual In-line Package (classic through-hole)
- **QFP**: Quad Flat Package (surface mount)
- **SOIC**: Small Outline IC (surface mount)

**Features:**
- Rectangular body outline
- Evenly spaced pins on both sides
- Pin 1 indicator (small circle)
- Various sizes and pin counts

### 4. Curved Traces
**What they are:** PCB traces with smooth corners instead of sharp 90° angles

**Why it matters:**
- Real PCBs avoid sharp corners for signal integrity
- Reduces electromagnetic interference
- More professional appearance
- Configurable curvature amount

### 5. Variable Trace Widths
**What they are:** Different trace widths for different purposes

**Types:**
- **Power traces**: Thicker (carry more current)
- **Signal traces**: Thinner (data/control signals)

**Implementation:**
- 20% of traces are power traces (thicker)
- 80% are signal traces (thinner)
- Configurable variation amount

## Usage Examples

### Example 1: Classic Green PCB

```javascript
const config = new CircuitStreamConfig({
    usePCBStyle: true,
    showComponentPads: true,
    showVias: true,
    showICFootprints: true,
    useCurvedTraces: true,
    
    traceWidthVariation: 0.6,
    traceCurvature: 0.25,
    
    // Classic PCB green
    traceColor: new ColorPicker(ColorPicker.SelectionType.static, '#00FF41'),
    padColor: new ColorPicker(ColorPicker.SelectionType.static, '#FFD700'),
    viaColor: new ColorPicker(ColorPicker.SelectionType.static, '#C0C0C0'),
    icColor: new ColorPicker(ColorPicker.SelectionType.static, '#FFFFFF'),
    
    showBackgroundGrid: false, // Hide grid for clean PCB look
});
```

### Example 2: High-Tech Blue PCB

```javascript
const config = new CircuitStreamConfig({
    usePCBStyle: true,
    showComponentPads: true,
    showVias: true,
    showICFootprints: true,
    useCurvedTraces: true,
    
    traceWidthVariation: 0.5,
    traceCurvature: 0.3,
    
    // Blue PCB theme
    traceColor: new ColorPicker(ColorPicker.SelectionType.static, '#1E90FF'),
    activeTraceColor: new ColorPicker(ColorPicker.SelectionType.static, '#00FFFF'),
    padColor: new ColorPicker(ColorPicker.SelectionType.static, '#FFD700'),
    viaColor: new ColorPicker(ColorPicker.SelectionType.static, '#FFFFFF'),
    icColor: new ColorPicker(ColorPicker.SelectionType.static, '#E0E0E0'),
    
    showBackgroundGrid: false,
});
```

### Example 3: Minimal PCB (Fewer Components)

```javascript
const config = new CircuitStreamConfig({
    usePCBStyle: true,
    showComponentPads: true,
    showVias: true,
    showICFootprints: true,
    useCurvedTraces: true,
    
    // Reduce component counts for cleaner look
    padCount: 20,
    viaCount: 15,
    icCount: 3,
    nodeCount: 15,
    
    traceWidthVariation: 0.4,
    traceCurvature: 0.2,
    
    showBackgroundGrid: false,
});
```

### Example 4: Disable PCB Style (Original Grid Look)

```javascript
const config = new CircuitStreamConfig({
    usePCBStyle: false, // Disable all PCB features
    showBackgroundGrid: true, // Show grid
    useCurvedTraces: false, // Sharp corners
    traceWidthVariation: 0, // Uniform widths
    
    // Original grid-style appearance
});
```

## Best Practices

### For Realistic PCB Appearance

1. **Disable background grid**: `showBackgroundGrid: false`
2. **Enable curved traces**: `useCurvedTraces: true`
3. **Use moderate curvature**: `traceCurvature: 0.2 - 0.3`
4. **Enable trace variation**: `traceWidthVariation: 0.4 - 0.6`
5. **Use appropriate colors**: Green/gold for classic, blue/white for modern

### For Performance

1. **Reduce component counts** on lower-end hardware
2. **Disable unused features** (e.g., if you don't want ICs, set `showICFootprints: false`)
3. **Lower blur amounts** for faster rendering

### For Animation

1. **Keep perfectLoop: true** for seamless loops
2. **Adjust packet speeds** for desired flow rate
3. **Tune pulse frequencies** for visual rhythm

## Technical Details

### Rendering Order (Bottom to Top)

1. Background grid (if enabled)
2. IC footprints (largest elements)
3. Component pads
4. Circuit traces (with variable widths)
5. Via holes (on top of traces)
6. Signal waves
7. Nodes/logic gates
8. Data packets (top layer)

### Trace Width Calculation

```javascript
// Power traces: 20% of traces, thicker
if (isPowerTrace) {
    width = baseWidth * (1 + variation);
}
// Signal traces: 80% of traces, thinner
else {
    width = baseWidth * (1 - variation * 0.5);
}
```

### Curved Trace Algorithm

Curved corners are created by adding intermediate control points:
- Calculate corner position
- Add points before and after corner
- Offset based on curvature parameter
- Results in smooth bezier-like curves

## Testing

Run the comparison test to see the difference:

```bash
node tests/test-circuit-comparison.js
```

This will generate two images:
- `grid_style_frame_0030.png` - Old grid appearance
- `pcb_style_frame_0030.png` - New PCB appearance

## Migration Guide

### Updating Existing Configs

If you have existing CircuitStream configs, they will continue to work with default PCB features disabled. To enable PCB style:

```javascript
// Old config (still works)
const oldConfig = new CircuitStreamConfig({
    traceWidth: 6,
    nodeCount: 20,
    // ... other options
});

// New config with PCB features
const newConfig = new CircuitStreamConfig({
    ...oldConfig, // Keep existing settings
    usePCBStyle: true, // Enable PCB features
    showComponentPads: true,
    showVias: true,
    showICFootprints: true,
    useCurvedTraces: true,
    traceWidthVariation: 0.5,
    traceCurvature: 0.25,
    showBackgroundGrid: false, // Hide grid for PCB look
});
```

## Troubleshooting

### Issue: Too many components, looks cluttered
**Solution**: Reduce `padCount`, `viaCount`, and `icCount`

### Issue: Traces look too uniform
**Solution**: Increase `traceWidthVariation` (try 0.6-0.8)

### Issue: Corners too sharp
**Solution**: Increase `traceCurvature` (try 0.3-0.4)

### Issue: Corners too rounded
**Solution**: Decrease `traceCurvature` (try 0.1-0.2)

### Issue: Want original grid look
**Solution**: Set `usePCBStyle: false`

## Future Enhancements

Potential future additions:
- Silkscreen text labels
- Component outlines (resistors, capacitors)
- Copper pour areas
- Solder mask cutouts
- Multiple PCB layers with transparency
- Realistic solder joints
- Component shadows

## Conclusion

The PCB-style features transform CircuitStream from a simple grid overlay into a realistic circuit board visualization. Experiment with the settings to achieve your desired look, from clean minimal PCBs to complex high-density boards!