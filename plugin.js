// Import the effect classes at the top level
import { SpiralWaveEffect } from './src/effects/primaryEffects/SpiralWave/SpiralWaveEffect.js';
import { SpiralWaveConfig } from './src/effects/primaryEffects/SpiralWave/SpiralWaveConfig.js';
import { QuantumFieldEffect } from './src/effects/primaryEffects/QuantumField/QuantumFieldEffect.js';
import { QuantumFieldConfig } from './src/effects/primaryEffects/QuantumField/QuantumFieldConfig.js';
import { FlowFieldEffect } from './src/effects/secondaryEffects/FlowField/FlowFieldEffect.js';
import { FlowFieldConfig } from './src/effects/secondaryEffects/FlowField/FlowFieldConfig.js';

// Import required registry items from my-nft-gen
import { EffectCategories } from 'my-nft-gen/src/core/registry/EffectCategories.js';

// Set the config class reference
SpiralWaveEffect._configClass_ = SpiralWaveConfig;
QuantumFieldEffect._configClass_ = QuantumFieldConfig;
FlowFieldEffect._configClass_ = FlowFieldConfig;

// Plugin metadata
export const name = 'my-nft-zencoder-generated-effects-plugin';

// Plugin registration function that will be called by my-nft-gen's PluginManager
export async function register(EffectRegistry, PositionRegistry) {
    try {
        console.log('🔄 Registering plugin effects...');

        // Register SpiralWave effect
        console.log(`📦 Effect name: ${SpiralWaveEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(SpiralWaveEffect._name_)) {
            console.log(`ℹ️ Effect '${SpiralWaveEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(SpiralWaveEffect, EffectCategories.PRIMARY, {
                displayName: SpiralWaveEffect._displayName_ || 'Spiral Wave',
                description: SpiralWaveEffect._description_ || 'Creates a spiral wave effect',
                version: SpiralWaveEffect._version_ || '1.0.0',
                author: SpiralWaveEffect._author_ || 'Plugin Author',
                tags: SpiralWaveEffect._tags_ || ['effect', 'visual', 'spiral']
            });
            console.log(`✅ Registered: ${SpiralWaveEffect._name_} as PRIMARY effect`);
        }

        // Register QuantumField effect
        console.log(`📦 Effect name: ${QuantumFieldEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(QuantumFieldEffect._name_)) {
            console.log(`ℹ️ Effect '${QuantumFieldEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(QuantumFieldEffect, EffectCategories.PRIMARY, {
                displayName: QuantumFieldEffect._displayName_ || 'Quantum Field',
                description: QuantumFieldEffect._description_ || 'Simulates quantum particle interactions with dynamic connections',
                version: QuantumFieldEffect._version_ || '1.0.0',
                author: QuantumFieldEffect._author_ || 'Plugin Author',
                tags: QuantumFieldEffect._tags_ || ['effect', 'visual', 'quantum', 'particles', 'animated']
            });
            console.log(`✅ Registered: ${QuantumFieldEffect._name_} as PRIMARY effect`);
        }

        // Register FlowField effect as SECONDARY
        console.log(`📦 Effect name: ${FlowFieldEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(FlowFieldEffect._name_)) {
            console.log(`ℹ️ Effect '${FlowFieldEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(FlowFieldEffect, EffectCategories.SECONDARY, {
                displayName: FlowFieldEffect._displayName_ || 'Flow Field',
                description: FlowFieldEffect._description_ || 'Creates dynamic flow field distortions with organic movement',
                version: FlowFieldEffect._version_ || '1.0.0',
                author: FlowFieldEffect._author_ || 'Plugin Author',
                tags: FlowFieldEffect._tags_ || ['effect', 'secondary', 'distortion', 'flow', 'movement']
            });
            console.log(`✅ Registered: ${FlowFieldEffect._name_} as SECONDARY effect`);
        }

        // Verify registration in the global registry
        const primaryEffects = EffectRegistry.getByCategoryGlobal(EffectCategories.PRIMARY);
        const secondaryEffects = EffectRegistry.getByCategoryGlobal(EffectCategories.SECONDARY);
        console.log(`📊 PRIMARY effects after registration:`, Object.keys(primaryEffects));
        console.log(`📊 SECONDARY effects after registration:`, Object.keys(secondaryEffects));

        return true;
    } catch (error) {
        console.error('❌ Failed to register SpiralWave plugin:', error.message);
        console.error('Stack:', error.stack);
        throw error;
    }
}

// Also export the effect classes directly for backward compatibility
export { SpiralWaveEffect, SpiralWaveConfig, QuantumFieldEffect, QuantumFieldConfig, FlowFieldEffect, FlowFieldConfig };