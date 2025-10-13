# Preset Quick Reference Guide

## Available Presets by Effect

### Primary Effects (5 effects, 15 presets)

**quantum-field**
- `subtle-quantum` - Gentle quantum field with minimal particles
- `intense-field` - Dense quantum field with strong connections  
- `wave-particle` - Wave-particle duality demonstration

**circuit-stream**
- `minimal-circuit` - Sparse circuit traces
- `dense-pcb` - Dense PCB-style layout
- `data-highway` - Flowing data streams

**metatron-cube**
- `sacred-minimal` - Minimal sacred geometry
- `mystical-overload` - Complex mystical patterns
- `platonic-solids` - Platonic solids emphasis

**cymatics-resonance**
- `gentle-waves` - Soft cymatics patterns
- `harmonic-resonance` - Strong harmonic patterns
- `standing-waves` - Standing wave patterns

**aurora-kaleido**
- `soft-aurora` - Gentle aurora effect
- `vivid-kaleidoscope` - Vivid kaleidoscope patterns
- `northern-lights` - Northern lights simulation

---

### Secondary Effects (5 effects, 15 presets)

**flow-field**
- `subtle-flow` - Gentle flow field distortion
- `organic-distortion` - Organic flow patterns
- `chaotic-flow` - Chaotic turbulent flow

**liquid-chromatic**
- `gentle-liquid` - Soft liquid metal effect
- `iridescent-flow` - Iridescent flowing colors
- `oil-slick` - Oil slick rainbow effect

**holographic-prism**
- `subtle-hologram` - Gentle holographic shimmer
- `prismatic-display` - Strong prismatic dispersion
- `holographic-card` - Trading card holographic effect

**chrono-lenticular-foil**
- `subtle-foil` - Gentle lenticular effect
- `premium-foil` - Premium foil card effect
- `micro-groove` - Micro-groove pattern emphasis

**chromatic-aberration**
- `subtle-aberration` - Minimal chromatic separation
- `glitch-aberration` - Glitch-style aberration
- `lens-distortion` - Lens distortion effect

---

### Final Image Effects (6 effects, 18 presets)

**orbit-bloom**
- `soft-bloom` - Gentle bloom glow
- `intense-bloom` - Strong bloom effect
- `ethereal-glow` - Ethereal glowing aura

**void-echo**
- `minimal-echo` - Subtle void echo
- `psychedelic-portal` - Psychedelic portal effect
- `dimensional-rift` - Dimensional rift effect

**flux-weave**
- `silk-curtain` - Gentle silk-like weave
- `cosmic-loom` - Cosmic weaving patterns
- `prismatic-storm` - Prismatic storm effect

**chromatic-aberration-final-image-effect**
- `subtle-separation` - Minimal color separation
- `cyberpunk-glitch` - Cyberpunk glitch aesthetic
- `operator-noise` - "Operator in the Noise" style

**prismatic-shatter**
- `gentle-fracture` - Gentle fracture lines
- `crystal-explosion` - Crystal explosion effect
- `kaleidoscope-shards` - Kaleidoscope shard pattern

**holofoil**
- `subtle-holo` - Subtle holographic foil
- `premium-holo` - Premium holographic card
- `rainbow-foil` - Rainbow foil effect

---

### Keyframe Effects (3 effects, 9 presets)

**spectral-overwatch**
- `gentle-sweep` - Gentle spectral sweep
- `intense-caustics` - Intense caustic patterns
- `rainbow-scan` - Rainbow scanning effect

**tactical-pulse-grid**
- `minimal-hud` - Minimal HUD overlay
- `combat-mode` - Combat mode tactical display
- `tactical-scan` - Tactical scanning grid

**aurora-cascade**
- `gentle-aurora` - Gentle aurora cascade
- `northern-lights` - Northern lights cascade
- `celestial-cascade` - Celestial light cascade

---

## Usage Examples

### JavaScript/Node.js

```javascript
import {PresetRegistry} from '../my-nft-gen/index';

// Get all presets for an effect
const presets = PresetRegistry.getGlobal('quantum-field');
console.log(presets); // Array of 3 preset objects

// Get a specific preset
const preset = PresetRegistry.getPresetGlobal('quantum-field', 'subtle-quantum');
console.log(preset.displayName); // "Subtle Quantum"
console.log(preset.currentEffectConfig); // QuantumFieldConfig instance

// Get preset names only
const names = PresetRegistry.getPresetNamesGlobal('flux-weave');
console.log(names); // ['silk-curtain', 'cosmic-loom', 'prismatic-storm']

// Check if effect has presets
const hasPresets = PresetRegistry.hasGlobal('holographic-prism');
console.log(hasPresets); // true

// Get all presets across all effects
const allPresets = PresetRegistry.getAllGlobal();
console.log(allPresets.length); // 19 (one entry per effect)

// Get statistics
const effectCount = PresetRegistry.sizeGlobal(); // 19
const totalPresets = PresetRegistry.totalPresetsGlobal(); // 57
```

### Using a Preset

```javascript
import { PresetRegistry, EffectRegistry } from 'my-nft-gen';

// Get the preset
const preset = PresetRegistry.getPresetGlobal('quantum-field', 'intense-field');

// Get the effect class
const EffectClass = EffectRegistry.getGlobal('quantum-field');

// Create effect instance with preset config
const effect = new EffectClass({
  config: preset.currentEffectConfig
});

// Apply to layer
await effect.invoke(layer, frameNumber, totalFrames);
```

### Iterating Through All Presets

```javascript
const allPresets = PresetRegistry.getAllGlobal();

allPresets.forEach(({ effectName, presets, metadata }) => {
  console.log(`Effect: ${effectName}`);
  presets.forEach(preset => {
    console.log(`  - ${preset.displayName}: ${preset.description}`);
  });
});
```

---

## Preset Naming Convention

- **Preset names**: kebab-case (e.g., `subtle-quantum`)
- **Display names**: Title Case (e.g., "Subtle Quantum")
- **Effect names**: kebab-case (e.g., `quantum-field`)

## Intensity Levels

Most effects follow a three-tier intensity pattern:

1. **Subtle/Minimal/Gentle** - Low intensity, understated
2. **Intense/Premium/Vivid** - High intensity, dramatic
3. **Balanced/Unique** - Medium or unique variation

## Testing

Run the test script to verify all presets:

```bash
node test-presets.js
```

Expected output:
- ✅ 19 effects with presets
- ✅ 57 total presets
- ✅ All presets listed with names and display names
- ✅ Specific preset retrieval test passes

---

## Total Count

- **Effects**: 19
- **Presets**: 57
- **Average per Effect**: 3
- **Categories**: 4 (Primary, Secondary, Final, Keyframe)