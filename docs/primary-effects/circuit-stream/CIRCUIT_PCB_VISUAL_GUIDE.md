# CircuitStream PCB Visual Guide

## 📐 Component Anatomy

### Component Pad (Circular)
```
     ╭─────╮
    ╱       ╲
   │    ●    │  ← Copper pad (gold/copper color)
    ╲       ╱
     ╰─────╯
```

### Component Pad (Square)
```
   ┌─────────┐
   │         │
   │    ●    │  ← Copper pad (gold/copper color)
   │         │
   └─────────┘
```

### Component Pad (Rounded Square)
```
   ╭─────────╮
   │         │
   │    ●    │  ← Copper pad (gold/copper color)
   │         │
   ╰─────────╯
```

### Via Hole
```
     ╭───╮
    ╱ ╭─╮ ╲     ← Outer copper ring (annular ring)
   │  │ │  │
    ╲ ╰─╯ ╱     ← Inner drilled hole (darker)
     ╰───╯
```

### IC Chip Footprint (DIP)
```
   ┌─────────────────┐
   │  ●              │  ← Pin 1 indicator
   │                 │
   │   IC CHIP       │  ← Chip body outline
   │                 │
   └─────────────────┘
   ║ ║ ║ ║     ║ ║ ║ ║  ← Pins on both sides
```

## 🔀 Trace Routing Comparison

### Sharp Corners (Grid Style)
```
   ─────────┐
            │
            │
            └─────────
```

### Curved Corners (PCB Style)
```
   ─────────╮
            │
            │
            ╰─────────
```

## 📊 Trace Width Variation

### Uniform Width (Grid Style)
```
   ═══════════════════  ← All traces same width
   ═══════════════════
   ═══════════════════
```

### Variable Width (PCB Style)
```
   ═══════════════════  ← Power trace (thick)
   ───────────────────  ← Signal trace (thin)
   ═══════════════════  ← Power trace (thick)
   ───────────────────  ← Signal trace (thin)
```

## 🎨 Layer Composition

### Rendering Order (Bottom to Top)
```
   ┌─────────────────────────────────┐
   │  7. Data Packets (top)          │  ← Animated glowing dots
   ├─────────────────────────────────┤
   │  6. Nodes/Logic Gates           │  ← Pulsing junctions
   ├─────────────────────────────────┤
   │  5. Signal Waves                │  ← Expanding circles
   ├─────────────────────────────────┤
   │  4. Via Holes                   │  ← Layer connections
   ├─────────────────────────────────┤
   │  3. Circuit Traces              │  ← Copper paths
   ├─────────────────────────────────┤
   │  2. Component Pads              │  ← Landing pads
   ├─────────────────────────────────┤
   │  1. IC Footprints (bottom)      │  ← Chip outlines
   └─────────────────────────────────┘
```

## 🔄 Complete PCB Layout Example

```
   ┌─────────────────────────────────────────────────────────┐
   │                                                         │
   │    ╭─────────╮                                         │
   │    │  IC1    │  ● ● ●  ═══╮                           │
   │    │  ●      │            ║                           │
   │    ╰─────────╯            ║                           │
   │    ║ ║ ║ ║                ║                           │
   │    ● ● ● ●                ╚═══════╮                   │
   │                                   ║                   │
   │         ╭─╮                       ║                   │
   │    ●───╱   ╲───●                  ║                   │
   │       │ VIA │                     ║                   │
   │        ╲   ╱                      ║                   │
   │         ╰─╯                       ║                   │
   │                                   ║                   │
   │    ●                              ╚═══════●           │
   │   PAD                                    PAD          │
   │                                                       │
   │         ╭─────────╮                                  │
   │         │  IC2    │                                  │
   │         │  ●      │                                  │
   │         ╰─────────╯                                  │
   │         ║ ║ ║ ║                                      │
   │         ● ● ● ●                                      │
   │                                                       │
   └─────────────────────────────────────────────────────────┘

   Legend:
   ═══  Power trace (thick)
   ───  Signal trace (thin)
   ●    Component pad
   ╭─╮  Via hole
   ╮╯   Curved corner
   IC   Integrated circuit
```

## 🎭 Before & After Comparison

### BEFORE: Grid Style
```
   ┌─────────────────────────────────┐
   │ · · · · · · · · · · · · · · · · │  ← Visible grid
   │ · ─────┐ · · · · · · · · · · · │
   │ · · · │ · · · · · · · · · · · · │
   │ · · · └─────● · · · · · · · · · │  ← Sharp corners
   │ · · · · · · · · · · · · · · · · │
   │ · · · · · · · · · · · · · · · · │
   │ · · · ─────┐ · · · · · · · · · │  ← Uniform width
   │ · · · · · │ · · · · · · · · · · │
   │ · · · · · └─────● · · · · · · · │
   │ · · · · · · · · · · · · · · · · │
   └─────────────────────────────────┘
```

### AFTER: PCB Style
```
   ┌─────────────────────────────────┐
   │                                 │  ← Clean surface
   │   ═══╮                          │
   │      ║                          │
   │      ╚═══●                      │  ← Curved corners
   │         PAD                     │
   │                                 │
   │   ───╮    ╭─╮                   │  ← Variable widths
   │      ╰───╱   ╲───●              │
   │          │ VIA │  PAD           │  ← PCB components
   │           ╲   ╱                 │
   │            ╰─╯                  │
   └─────────────────────────────────┘
```

## 🎯 Component Size Relationships

```
   IC Chip (largest)
   ┌─────────────┐
   │             │
   │             │
   └─────────────┘
   
   Component Pad (medium)
   ╭─────╮
   │     │
   ╰─────╯
   
   Via Hole (small)
   ╭─╮
   │ │
   ╰─╯
   
   Node (medium)
   ╭───╮
   │ ● │
   ╰───╯
   
   Data Packet (small, animated)
   ●  →  ●  →  ●
```

## 🌊 Animation Flow

### Data Packet Movement
```
   Frame 1:  ●─────────────────
   Frame 2:  ──●────────────────
   Frame 3:  ────●──────────────
   Frame 4:  ──────●────────────
   Frame 5:  ────────●──────────
   Frame 6:  ──────────●────────
   Frame 7:  ────────────●──────
   Frame 8:  ──────────────●────
   Frame 9:  ────────────────●──
```

### Trace Pulse Animation
```
   Frame 1:  ─────────────────  (dim)
   Frame 2:  ═════════════════  (bright)
   Frame 3:  ─────────────────  (dim)
   Frame 4:  ═════════════════  (bright)
```

### Node Blink Animation
```
   Frame 1:  ╭───╮  (off)
             │   │
             ╰───╯
   
   Frame 2:  ╭───╮  (charging)
             │ · │
             ╰───╯
   
   Frame 3:  ╭───╮  (full)
             │ ● │
             ╰───╯
   
   Frame 4:  ╭───╮  (discharging)
             │ · │
             ╰───╯
```

## 🎨 Color Mapping

### Classic Green PCB
```
   ┌─────────────────────────────────┐
   │                                 │
   │   GREEN ═══╮                    │  ← Traces
   │            ║                    │
   │            ╚═══ GOLD ●          │  ← Pads
   │                                 │
   │         SILVER ╭─╮              │  ← Vias
   │               │ │               │
   │                ╰─╯              │
   │                                 │
   │   WHITE ┌─────────┐             │  ← ICs
   │         │  IC     │             │
   │         └─────────┘             │
   │                                 │
   └─────────────────────────────────┘
```

### Modern Blue PCB
```
   ┌─────────────────────────────────┐
   │                                 │
   │   BLUE ═══╮                     │  ← Traces
   │           ║                     │
   │           ╚═══ GOLD ●           │  ← Pads
   │                                 │
   │         WHITE ╭─╮               │  ← Vias
   │              │ │                │
   │               ╰─╯               │
   │                                 │
   │   GRAY ┌─────────┐              │  ← ICs
   │        │  IC     │              │
   │        └─────────┘              │
   │                                 │
   └─────────────────────────────────┘
```

## 📏 Size Comparison Chart

```
   Component          Min Size    Max Size    Default Count
   ─────────────────────────────────────────────────────────
   IC Footprint       40px        80px        5
   Component Pad      4px         8px         40
   Via Hole           2px         4px         30
   Node               8px         16px        20
   Data Packet        4px         8px         25
   Trace Width        3px         9px         varies
```

## 🔧 Configuration Impact

### Low Density
```
   ┌─────────────────────────────────┐
   │                                 │
   │                                 │
   │     ●                           │
   │                                 │
   │           ●                     │
   │                                 │
   │                     ●           │
   │                                 │
   └─────────────────────────────────┘
   padCount: 10, viaCount: 5, icCount: 2
```

### Medium Density (Default)
```
   ┌─────────────────────────────────┐
   │   ●       ●                     │
   │                                 │
   │       ●       ●       ●         │
   │                                 │
   │   ●       ●       ●             │
   │                                 │
   │       ●       ●       ●         │
   │                                 │
   └─────────────────────────────────┘
   padCount: 40, viaCount: 30, icCount: 5
```

### High Density
```
   ┌─────────────────────────────────┐
   │ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● │
   │ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● │
   │ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● │
   │ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● │
   │ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● │
   │ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● │
   │ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● │
   │ ● ● ● ● ● ● ● ● ● ● ● ● ● ● ● │
   └─────────────────────────────────┘
   padCount: 80, viaCount: 60, icCount: 10
```

## 🎬 Perfect Loop Visualization

```
   Frame 0 ────────────────────────────────┐
      ↓                                    │
   Frame 1                                 │
      ↓                                    │
   Frame 2                                 │
      ↓                                    │
   ...                                     │
      ↓                                    │
   Frame 58                                │
      ↓                                    │
   Frame 59 ───────────────────────────────┘
      ↓                                    ↑
   Frame 0 (seamless loop)                 │
      └────────────────────────────────────┘
```

## 💡 Visual Tips

1. **Curved traces** = More organic, professional look
2. **Variable widths** = Realistic power distribution
3. **Component pads** = Authentic PCB appearance
4. **Via holes** = Multi-layer depth illusion
5. **IC footprints** = Scale and context
6. **No grid** = Clean, modern aesthetic

---

**Remember**: The goal is to look like a **real circuit board**, not a digital grid! 🎯