# Spectral Overwatch — Architecture

## Goals
- Final-image effect that: respects transparency, uses flat/serializable config, fits my-nft-gen conventions, and loops perfectly per active window.

## Keyframe scheduling
- Input: `keyFrames: number[]` are the start frames for effect windows.
- Duration: `glitchFrameCount: [min,max]` produces deterministic `duration` for each keyframe start using `hash2(seed, index)` → u ∈ [0,1], then:
  `duration = min + floor(u * (max - min + 1))`.
- Mapping: Given `frameNumber`, choose window where `start ≤ frame < start + duration`.
- Normalized time: `t = (frame - start) / duration` in [0,1).

## Perfect per-window loops
- Compute integer cycle counts per window for all periodic motions:
  - `rotCycles = round(rotationSpeed)`, min 1 if > 0
  - `rippleCycles = round(rippleFrequency * rippleSpeed)`, min 1 if > 0
  - `shimmerCycles = round(shimmerSpeed)`, min 1 if > 0
- Phases at time `t`:
  - `rotAngle = 2π * rotCycles * t`
  - `ripplePhase = 2π * rippleCycles * t`
  - `shimmerPhase = 2π * shimmerCycles * t`

## Rendering pipeline
1. Read source RGBA as raw (ensures alpha is present).
2. If `time.active` is false, pass through (copy input to output).
3. If active:
   - Compute sweep direction from `baseAngle + rotAngle`.
   - Evaluate soft band mask via `smoothstep` around the projection distance.
   - Apply caustic response combining ripple and shimmer.
   - Colorize by mode (`mono`, `tinted`, `prismatic` with HSV→RGB at `baseHue + 360*s`).
   - Apply vignette and screen-like blend; preserve alpha if configured.
4. Write PNG back to layer, then apply `layerOpacity` via host API.

## Determinism
- Only depends on `config` (including `seed`) and layer input.
- No random at runtime; the schedule is precomputed in constructor via `#generate`.

## Integration
- Extends `LayerEffect` and uses `EffectConfig` per repo conventions.
- Registered in `plugin.js` under `FINAL_IMAGE` with `_configClass_` linkage.

## Extensibility ideas
- Optional per-window color modulation using window index.
- Alternate blends (additive, soft-light) preserved behind a config toggle.
- User-provided `hueCurve` sampled by `s` for custom prismatic mapping.