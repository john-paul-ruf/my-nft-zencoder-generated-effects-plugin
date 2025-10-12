# Prismatic Shatter Effect - Project Plan

## 🎨 Vision Statement
**"Prismatic Shatter"** - A mesmerizing post-processing effect that fractures the composite image into crystalline shards, each acting as a prism that refracts light into stunning rainbow spectrums. The shards float and rotate in 3D space, creating dynamic light patterns and chromatic aberrations that pulse and shift through the animation loop.

## 🌟 Core Concept
Imagine looking at your NFT through a shattered prism - the image breaks into geometric crystal fragments that:
- Float independently in 3D space with depth perception
- Refract light into rainbow spectrums at their edges
- Cast prismatic shadows and light rays
- Rotate and pulse with mathematical precision
- Create interference patterns where light rays overlap
- Generate aurora-like color bleeds between shards

## 🎯 Visual Effects Breakdown

### 1. **Shard Generation System**
- **Voronoi-based tessellation** for organic crystal patterns
- **Configurable shard count** (5-50 shards)
- **Shard size variance** for visual interest
- **Edge detection** to align shards with image features
- **Depth layering** for 3D parallax effect

### 2. **Prismatic Light Refraction**
- **RGB channel separation** at shard edges
- **Wavelength-based dispersion** (red bends less, violet more)
- **Configurable refraction index** (1.3-2.4 for glass to diamond)
- **Rainbow generation** at critical angles
- **Spectral spread width** control

### 3. **3D Motion & Animation**
- **Individual shard rotation** (X, Y, Z axes)
- **Orbital motion paths** around center point
- **Depth-based scaling** (near shards larger)
- **Sine-wave floating** for organic movement
- **Perfect loop synchronization** using 2π cycles

### 4. **Light Ray System**
- **Volumetric light beams** from shard edges
- **Ray intersection hotspots** creating bright points
- **Configurable light source angle**
- **Ray opacity based on refraction angle**
- **Color bleeding** between overlapping rays

### 5. **Atmospheric Effects**
- **Chromatic fog** in shard gaps
- **Bloom on bright edges**
- **Depth-of-field blur** for distant shards
- **Lens flare** at peak brightness points
- **Configurable ambient glow**

## 📋 Technical Requirements

### Configuration Parameters (Flat Structure)
```javascript
{
  // Shard System
  shardCount: 12,              // Number of crystal shards (5-50)
  shardSizeVariance: 0.5,      // Size variation (0.0-1.0)
  shardDepthRange: 100,         // Z-depth range in pixels (50-300)
  tessellationSeed: 42,        // Deterministic seed for pattern
  
  // Prismatic Refraction
  refractionIndex: 1.52,       // Glass=1.5, Diamond=2.4 (1.3-2.4)
  chromaticDispersion: 0.7,    // RGB separation strength (0.0-1.0)
  spectralWidth: 20,           // Rainbow spread in pixels (5-50)
  criticalAngle: 42,           // Total internal reflection angle (30-60)
  
  // Motion & Animation
  rotationSpeedX: 0.3,         // X-axis rotation speed (0.0-2.0)
  rotationSpeedY: 0.5,         // Y-axis rotation speed (0.0-2.0)
  rotationSpeedZ: 0.2,         // Z-axis rotation speed (0.0-2.0)
  orbitRadius: 50,             // Orbital motion radius (0-150)
  floatAmplitude: 10,          // Vertical float range (0-30)
  phaseOffset: 0.15,           // Phase shift between shards (0.0-1.0)
  
  // Light Rays
  lightAngle: 45,              // Primary light source angle (0-360)
  lightIntensity: 0.8,         // Ray brightness (0.0-1.0)
  rayCount: 3,                 // Rays per shard edge (1-5)
  rayLength: 150,              // Maximum ray length (50-300)
  rayFalloff: 0.7,             // Ray opacity decay (0.3-1.0)
  
  // Colors (All Configurable)
  primarySpectrumColor: '#ff0000',    // Red spectrum start
  secondarySpectrumColor: '#0000ff',  // Blue spectrum end
  glowColor: '#ffffff',               // Edge glow color
  fogColor: '#9932cc',                // Atmospheric fog tint
  flareColor: '#ffff00',              // Lens flare color
  
  // Atmospheric Effects
  bloomIntensity: 0.6,         // Edge bloom strength (0.0-1.0)
  fogDensity: 0.3,             // Atmospheric fog (0.0-1.0)
  depthBlur: 0.4,              // DOF blur amount (0.0-1.0)
  flareThreshold: 0.8,         // Brightness for flares (0.5-1.0)
  ambientGlow: 0.2,            // Overall glow level (0.0-1.0)
  
  // Blend Modes
  shardBlendMode: 'screen',    // 'normal', 'screen', 'overlay', 'add'
  rayBlendMode: 'add',         // 'add', 'screen', 'linear-dodge'
  
  // Quality & Performance
  antialiasing: true,          // Smooth shard edges
  highQualityRefraction: true, // Accurate light physics
  
  // General
  effectIntensity: 1.0,        // Overall effect strength (0.0-1.0)
  layerOpacity: 1.0           // Final layer opacity (0.0-1.0)
}
```

### Animation Loop Mathematics
All animations use sine/cosine functions for perfect loops:
```javascript
// Frame progress (0 to 1)
const progress = frameNumber / totalFrames;
const angle = progress * Math.PI * 2;

// Perfect loop examples:
shardRotation = Math.sin(angle * rotationSpeed) * amplitude;
orbitalPosition = {
  x: Math.cos(angle + phaseShift) * orbitRadius,
  y: Math.sin(angle + phaseShift) * orbitRadius
};
floatOffset = Math.sin(angle * 2 + shardIndex * phaseOffset) * floatAmplitude;
```

## 🏗️ Implementation Structure

### File Organization
```
src/effects/finalImageEffects/PrismaticShatter/
├── PrismaticShatterEffect.js    # Main effect class
├── PrismaticShatterConfig.js    # Configuration class
├── index.js                      # Export module
├── demo.js                       # Demonstration script
└── test.js                       # Unit tests
```

### Core Classes (SOLID Principles)

#### 1. **PrismaticShatterConfig** (SRP: Configuration Only)
- Extends `EffectConfig`
- Validates and stores all parameters
- Implements `toJSON()` and `fromJSON()`
- No business logic, only data

#### 2. **PrismaticShatterEffect** (SRP: Effect Rendering)
- Extends `LayerEffect`
- Pure function approach in `#generate()`
- Deterministic shard generation
- Canvas-based rendering

#### 3. **ShardGenerator** (SRP: Tessellation)
- Generates Voronoi cells deterministically
- Uses config seed for reproducibility
- Returns shard geometry data

#### 4. **PrismaticRenderer** (SRP: Light Refraction)
- Calculates refraction angles
- Generates spectrum colors
- Handles RGB channel separation

#### 5. **RayTracer** (SRP: Light Rays)
- Calculates ray paths
- Handles intersections
- Manages opacity falloff

#### 6. **MotionCalculator** (SRP: Animation)
- Computes shard positions
- Handles rotation matrices
- Ensures perfect loops

## 🚀 Key Features

### ✅ Deterministic & Pure
- No `Math.random()` - uses deterministic algorithms
- All calculations based on config + frame number
- Reproducible results every time

### ✅ Perfect Loop
- All animations use full sine/cosine cycles
- Phase synchronization across all shards
- Smooth transition from last to first frame

### ✅ Serializable
- Flat configuration structure
- All parameters are primitives
- Full `toJSON()` / `fromJSON()` support

### ✅ Performance Optimized
- Pre-calculated shard positions in `#generate()`
- Efficient canvas operations
- Optional quality settings

### ✅ Visually Stunning
- Complex light physics simulation
- Multiple layered effects
- Rich color customization

## 🎬 Animation Sequences

### Phase 1: Shatter (0-25%)
- Shards separate from center
- Initial prismatic refraction appears
- Light rays begin emanating

### Phase 2: Dispersion (25-50%)
- Maximum shard separation
- Peak chromatic aberration
- Ray intersections create hotspots

### Phase 3: Convergence (50-75%)
- Shards begin returning
- Spectrum colors shift
- Atmospheric effects intensify

### Phase 4: Reform (75-100%)
- Shards approach original positions
- Seamless loop to Phase 1
- Light effects fade and restart

## 🎨 Visual Inspiration Sources
- Crystal prisms and their light refraction
- Shattered glass photography
- Aurora borealis light phenomena
- Holographic foil effects
- Kaleidoscope patterns
- Diamond light dispersion
- Soap bubble interference patterns
- Cyberpunk holographic displays

## 📊 Expected Impact
This effect will create:
- **Depth**: 3D parallax adds dimensionality
- **Movement**: Dynamic rotation and floating
- **Color**: Rich prismatic spectrum generation
- **Drama**: Light rays and atmospheric effects
- **Uniqueness**: Each configuration creates distinct patterns
- **Polish**: Professional post-processing quality

## 🔧 Development Phases

### Phase 1: Core Structure
- [ ] Create config and effect classes
- [ ] Implement basic shard tessellation
- [ ] Set up canvas rendering pipeline

### Phase 2: Shard System
- [ ] Voronoi cell generation
- [ ] Depth layering system
- [ ] Basic shard rendering

### Phase 3: Prismatic Effects
- [ ] RGB channel separation
- [ ] Refraction calculations
- [ ] Spectrum color generation

### Phase 4: Animation
- [ ] Rotation matrices
- [ ] Orbital motion
- [ ] Loop synchronization

### Phase 5: Light & Atmosphere
- [ ] Ray tracing system
- [ ] Bloom and glow effects
- [ ] Fog and depth blur

### Phase 6: Polish & Optimize
- [ ] Performance tuning
- [ ] Quality settings
- [ ] Final testing

## 🎯 Success Criteria
- ✅ Perfectly loops every animation
- ✅ All colors fully configurable
- ✅ Deterministic/reproducible output
- ✅ Flat configuration structure
- ✅ Extends LayerEffect/EffectConfig
- ✅ Returns my-nft-gen layer
- ✅ No external dependencies
- ✅ Pure function based on constructor data
- ✅ Visually stunning results

## 💡 Unique Selling Points
1. **Physically Accurate**: Real light refraction physics
2. **Highly Customizable**: 30+ parameters to tune
3. **Performance Scalable**: Quality settings for different needs
4. **Artistically Inspiring**: Creates gallery-worthy effects
5. **Mathematically Beautiful**: Based on elegant algorithms

This effect will transform any NFT into a stunning crystalline masterpiece that captures light in impossible ways!