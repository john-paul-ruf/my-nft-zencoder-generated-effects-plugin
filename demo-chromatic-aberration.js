import { ChromaticAberrationConfig } from './src/effects/secondaryEffects/ChromaticAberration/ChromaticAberrationConfig.js';

console.log('🌈 ChromaticAberration Effect - Configuration Showcase');
console.log('=====================================================\n');

// Preset 1: Classic Lens Aberration
console.log('📸 Preset 1: Classic Lens Aberration');
console.log('   Perfect for: Vintage camera look, subtle distortion');
const classicLens = new ChromaticAberrationConfig({
  maxDisplacement: 15,
  animationMode: 'pulse',
  pulseSpeed: 0.8,
  displacementCurve: 'radial',
  redOffset: 1.0,
  greenOffset: 0.0,
  blueOffset: -1.0,
  edgeFalloff: 0.4,
  focalPointX: 0.5,
  focalPointY: 0.5,
  preserveAlpha: true,
  interpolation: 'bilinear',
  layerOpacity: 0.85
});
console.log('   Config:', JSON.stringify(classicLens.toJSON(), null, 2));
console.log('');

// Preset 2: VHS Glitch
console.log('📼 Preset 2: VHS Glitch');
console.log('   Perfect for: Retro 80s/90s aesthetic, horizontal distortion');
const vhsGlitch = new ChromaticAberrationConfig({
  maxDisplacement: 30,
  animationMode: 'wave',
  pulseSpeed: 1.2,
  waveCount: 3,
  waveFrequency: 2.0,
  displacementCurve: 'horizontal',
  redOffset: 1.5,
  greenOffset: 0.2,
  blueOffset: -1.5,
  edgeFalloff: 0.2,
  preserveAlpha: true,
  interpolation: 'nearest',
  layerOpacity: 1.0
});
console.log('   Config:', JSON.stringify(vhsGlitch.toJSON(), null, 2));
console.log('');

// Preset 3: Psychedelic Spin
console.log('🌀 Preset 3: Psychedelic Spin');
console.log('   Perfect for: Trippy visuals, rotating rainbow effect');
const psychedelicSpin = new ChromaticAberrationConfig({
  maxDisplacement: 25,
  animationMode: 'rotate',
  pulseSpeed: 1.5,
  rotationDirection: 1,
  displacementCurve: 'radial',
  redOffset: 1.2,
  greenOffset: -0.8,
  blueOffset: 1.0,
  edgeFalloff: 0.3,
  tintStrength: 0.3,
  redTint: '#FF00FF',
  greenTint: '#00FF88',
  blueTint: '#00FFFF',
  preserveAlpha: true,
  interpolation: 'bilinear',
  layerOpacity: 0.9
});
console.log('   Config:', JSON.stringify(psychedelicSpin.toJSON(), null, 2));
console.log('');

// Preset 4: Subtle Dream
console.log('💭 Preset 4: Subtle Dream');
console.log('   Perfect for: Soft, ethereal look, minimal distortion');
const subtleDream = new ChromaticAberrationConfig({
  maxDisplacement: 8,
  animationMode: 'pulse',
  pulseSpeed: 0.5,
  displacementCurve: 'radial',
  redOffset: 0.8,
  greenOffset: 0.0,
  blueOffset: -0.8,
  edgeFalloff: 0.6,
  focalPointX: 0.5,
  focalPointY: 0.5,
  preserveAlpha: true,
  interpolation: 'bilinear',
  layerOpacity: 0.7
});
console.log('   Config:', JSON.stringify(subtleDream.toJSON(), null, 2));
console.log('');

// Preset 5: Extreme Glitch Art
console.log('⚡ Preset 5: Extreme Glitch Art');
console.log('   Perfect for: Digital corruption, heavy distortion');
const extremeGlitch = new ChromaticAberrationConfig({
  maxDisplacement: 50,
  animationMode: 'wave',
  pulseSpeed: 2.0,
  waveCount: 5,
  waveFrequency: 2.5,
  displacementCurve: 'diagonal',
  redOffset: 2.0,
  greenOffset: -1.5,
  blueOffset: 1.8,
  edgeFalloff: 0.1,
  preserveAlpha: false,
  interpolation: 'nearest',
  layerOpacity: 1.0
});
console.log('   Config:', JSON.stringify(extremeGlitch.toJSON(), null, 2));
console.log('');

// Preset 6: Vertical Scan Lines
console.log('📺 Preset 6: Vertical Scan Lines');
console.log('   Perfect for: CRT monitor effect, vertical distortion');
const verticalScan = new ChromaticAberrationConfig({
  maxDisplacement: 20,
  animationMode: 'wave',
  pulseSpeed: 1.0,
  waveCount: 4,
  waveFrequency: 1.5,
  displacementCurve: 'vertical',
  redOffset: 1.0,
  greenOffset: 0.0,
  blueOffset: -1.0,
  edgeFalloff: 0.25,
  preserveAlpha: true,
  interpolation: 'bilinear',
  layerOpacity: 0.9
});
console.log('   Config:', JSON.stringify(verticalScan.toJSON(), null, 2));
console.log('');

// Preset 7: Off-Center Vortex
console.log('🌪️  Preset 7: Off-Center Vortex');
console.log('   Perfect for: Dynamic focal point, asymmetric distortion');
const offCenterVortex = new ChromaticAberrationConfig({
  maxDisplacement: 35,
  animationMode: 'rotate',
  pulseSpeed: 1.0,
  rotationDirection: -1,
  displacementCurve: 'radial',
  redOffset: 1.5,
  greenOffset: 0.3,
  blueOffset: -1.2,
  focalPointX: 0.3,
  focalPointY: 0.7,
  edgeFalloff: 0.35,
  preserveAlpha: true,
  interpolation: 'bilinear',
  layerOpacity: 0.95
});
console.log('   Config:', JSON.stringify(offCenterVortex.toJSON(), null, 2));
console.log('');

// Preset 8: Static Poster Effect
console.log('🖼️  Preset 8: Static Poster Effect');
console.log('   Perfect for: Non-animated NFTs, consistent look');
const staticPoster = new ChromaticAberrationConfig({
  maxDisplacement: 18,
  animationMode: 'static',
  displacementCurve: 'radial',
  redOffset: 1.0,
  greenOffset: 0.0,
  blueOffset: -1.0,
  edgeFalloff: 0.5,
  tintStrength: 0.15,
  redTint: '#FF3366',
  greenTint: '#33FF66',
  blueTint: '#3366FF',
  preserveAlpha: true,
  interpolation: 'bilinear',
  layerOpacity: 1.0
});
console.log('   Config:', JSON.stringify(staticPoster.toJSON(), null, 2));
console.log('');

// Preset 9: Neon Glow
console.log('💡 Preset 9: Neon Glow');
console.log('   Perfect for: Cyberpunk aesthetic, vibrant colors');
const neonGlow = new ChromaticAberrationConfig({
  maxDisplacement: 22,
  animationMode: 'pulse',
  pulseSpeed: 1.8,
  displacementCurve: 'radial',
  redOffset: 1.3,
  greenOffset: -0.5,
  blueOffset: 1.1,
  edgeFalloff: 0.3,
  tintStrength: 0.4,
  redTint: '#FF0099',
  greenTint: '#00FF99',
  blueTint: '#0099FF',
  preserveAlpha: true,
  interpolation: 'bilinear',
  layerOpacity: 0.88
});
console.log('   Config:', JSON.stringify(neonGlow.toJSON(), null, 2));
console.log('');

// Preset 10: Minimal Shift
console.log('🎯 Preset 10: Minimal Shift');
console.log('   Perfect for: Barely noticeable enhancement, professional look');
const minimalShift = new ChromaticAberrationConfig({
  maxDisplacement: 5,
  animationMode: 'pulse',
  pulseSpeed: 0.6,
  displacementCurve: 'radial',
  redOffset: 0.5,
  greenOffset: 0.0,
  blueOffset: -0.5,
  edgeFalloff: 0.7,
  preserveAlpha: true,
  interpolation: 'bilinear',
  layerOpacity: 0.6
});
console.log('   Config:', JSON.stringify(minimalShift.toJSON(), null, 2));
console.log('');

console.log('✨ All presets generated successfully!');
console.log('\n📚 Usage Tips:');
console.log('   • Start with Classic Lens or Subtle Dream for beginners');
console.log('   • Use VHS Glitch or Extreme Glitch for bold, artistic looks');
console.log('   • Psychedelic Spin and Neon Glow work great for animated NFTs');
console.log('   • Static Poster is perfect for single-frame renders');
console.log('   • Experiment with focal points for unique asymmetric effects');
console.log('   • Combine with other secondary effects for complex results');
console.log('\n🚀 Ready to create stunning chromatic aberration effects!');