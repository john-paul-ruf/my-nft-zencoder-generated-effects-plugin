/**
 * Holographic Prism Effect Demo
 * 
 * This demo showcases the various animation modes and configurations
 * of the Holographic Prism effect.
 */

import { HolographicPrismEffect } from './HolographicPrismEffect.js';
import { HolographicPrismConfig } from './HolographicPrismConfig.js';
import { Settings } from 'my-nft-gen/src/core/Settings.js';
import { LayerFactory } from 'my-nft-gen/src/core/factory/layer/LayerFactory.js';

// Demo configurations for different visual styles

/**
 * Subtle Holographic Shimmer
 * Perfect for adding a gentle iridescent glow without overwhelming the original content
 */
export const subtleShimmerConfig = new HolographicPrismConfig({
  animationMode: ['shimmer'],
  chromaticStrength: { lower: 1, upper: 2 },
  dispersionIntensity: { lower: 0.1, upper: 0.2 },
  shimmerIntensity: { lower: 0.2, upper: 0.3 },
  glowIntensity: { lower: 0.1, upper: 0.2 },
  effectStrength: { lower: 0.3, upper: 0.5 },
  preserveOriginal: { lower: 0.6, upper: 0.8 },
  perfectLoop: true,
});

/**
 * Intense Prismatic Explosion
 * Maximum chromatic aberration and dispersion for dramatic effect
 */
export const intensePrismaticConfig = new HolographicPrismConfig({
  animationMode: ['rotation', 'pulse'],
  chromaticStrength: { lower: 6, upper: 10 },
  dispersionIntensity: { lower: 0.7, upper: 0.9 },
  wavelengthSeparation: { lower: 3, upper: 5 },
  shimmerIntensity: { lower: 0.4, upper: 0.6 },
  glowIntensity: { lower: 0.3, upper: 0.5 },
  glowRadius: { lower: 5, upper: 10 },
  effectStrength: { lower: 0.8, upper: 1.0 },
  preserveOriginal: { lower: 0.2, upper: 0.4 },
  perfectLoop: true,
});

/**
 * Deep 3D Parallax
 * Emphasizes depth through multi-layer displacement
 */
export const deepParallaxConfig = new HolographicPrismConfig({
  animationMode: ['depth'],
  chromaticStrength: { lower: 2, upper: 3 },
  parallaxLayers: { lower: 5, upper: 5 },
  parallaxStrength: { lower: 5, upper: 8 },
  shimmerIntensity: { lower: 0.3, upper: 0.4 },
  glowIntensity: { lower: 0.2, upper: 0.3 },
  effectStrength: { lower: 0.6, upper: 0.8 },
  preserveOriginal: { lower: 0.4, upper: 0.6 },
  perfectLoop: true,
});

/**
 * Rainbow Wave
 * Flowing rainbow colors with wave distortion
 */
export const rainbowWaveConfig = new HolographicPrismConfig({
  animationMode: ['wave', 'shimmer'],
  chromaticStrength: { lower: 3, upper: 5 },
  dispersionIntensity: { lower: 0.4, upper: 0.6 },
  shimmerIntensity: { lower: 0.5, upper: 0.7 },
  shimmerSpeed: { lower: 1.5, upper: 2.5 },
  spectrumHueStart: { lower: 0, upper: 360 },
  spectrumHueRange: { lower: 300, upper: 360 },
  glowIntensity: { lower: 0.3, upper: 0.4 },
  glowSaturation: { lower: 0.9, upper: 1.0 },
  effectStrength: { lower: 0.7, upper: 0.9 },
  preserveOriginal: { lower: 0.3, upper: 0.5 },
  perfectLoop: true,
});

/**
 * Combined Mode - All Effects
 * Uses all animation modes together for maximum visual impact
 */
export const combinedModeConfig = new HolographicPrismConfig({
  animationMode: ['combined'],
  chromaticStrength: { lower: 4, upper: 6 },
  dispersionIntensity: { lower: 0.5, upper: 0.7 },
  wavelengthSeparation: { lower: 2, upper: 3 },
  shimmerIntensity: { lower: 0.4, upper: 0.5 },
  shimmerSpeed: { lower: 1, upper: 2 },
  parallaxLayers: { lower: 4, upper: 4 },
  parallaxStrength: { lower: 3, upper: 5 },
  glowIntensity: { lower: 0.2, upper: 0.4 },
  glowRadius: { lower: 4, upper: 7 },
  effectStrength: { lower: 0.6, upper: 0.8 },
  preserveOriginal: { lower: 0.4, upper: 0.6 },
  perfectLoop: true,
});

/**
 * Cyan-Magenta Spectrum
 * Focuses on cyan-magenta color range for a retro-futuristic look
 */
export const cyanMagentaConfig = new HolographicPrismConfig({
  animationMode: ['rotation', 'shimmer'],
  chromaticStrength: { lower: 4, upper: 6 },
  dispersionIntensity: { lower: 0.4, upper: 0.6 },
  shimmerIntensity: { lower: 0.4, upper: 0.6 },
  spectrumHueStart: { lower: 180, upper: 180 }, // Cyan
  spectrumHueRange: { lower: 180, upper: 180 }, // To magenta
  spectrumSaturation: { lower: 0.9, upper: 1.0 },
  glowIntensity: { lower: 0.3, upper: 0.4 },
  effectStrength: { lower: 0.7, upper: 0.9 },
  preserveOriginal: { lower: 0.3, upper: 0.5 },
  perfectLoop: true,
});

/**
 * Demo function to apply effect to a layer
 */
export async function applyHolographicPrismDemo(layer, config, frameNumber = 0, totalFrames = 60) {
  const settings = new Settings({
    width: 1024,
    height: 1024,
  });

  const effect = new HolographicPrismEffect({
    config,
    settings,
  });

  return await effect.invoke(layer, frameNumber, totalFrames);
}

/**
 * Example usage:
 * 
 * import { applyHolographicPrismDemo, subtleShimmerConfig } from './demo.js';
 * import { LayerFactory } from 'my-nft-gen/src/core/factory/layer/LayerFactory.js';
 * 
 * // Load your layer
 * const layer = await LayerFactory.createFromFile('path/to/image.png');
 * 
 * // Apply effect
 * const processedLayer = await applyHolographicPrismDemo(
 *   layer,
 *   subtleShimmerConfig,
 *   0,  // current frame
 *   60  // total frames
 * );
 * 
 * // Save result
 * await processedLayer.save('output.png');
 */

console.log('✨ Holographic Prism Effect Demo Loaded');
console.log('Available configurations:');
console.log('  - subtleShimmerConfig: Gentle iridescent glow');
console.log('  - intensePrismaticConfig: Maximum chromatic explosion');
console.log('  - deepParallaxConfig: 3D depth effect');
console.log('  - rainbowWaveConfig: Flowing rainbow waves');
console.log('  - combinedModeConfig: All effects combined');
console.log('  - cyanMagentaConfig: Retro-futuristic cyan-magenta');