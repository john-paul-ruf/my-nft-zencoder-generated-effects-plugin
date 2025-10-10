// Plugin metadata
export const name = 'my-nft-zencoder-generated-effects-plugin';
export const version = '1.0.0';

// Plugin registration function that will be called by my-nft-gen's PluginManager
export async function register(EffectRegistry, PositionRegistry) {
    try {
        console.log('🔄 [Plugin] Starting registration...');
        console.log('🔄 [Plugin] Current file:', import.meta.url);
        console.log('🔄 [Plugin] EffectRegistry:', EffectRegistry ? 'Available' : 'Missing');
        console.log('🔄 [Plugin] PositionRegistry:', PositionRegistry ? 'Available' : 'Missing');
        
        // Import the effect classes dynamically to catch import errors
        console.log('📦 [Plugin] Importing QuantumField effect...');
        const { QuantumFieldEffect } = await import('./src/effects/primaryEffects/QuantumField/QuantumFieldEffect.js');
        const { QuantumFieldConfig } = await import('./src/effects/primaryEffects/QuantumField/QuantumFieldConfig.js');
        
        console.log('📦 [Plugin] Importing FlowField effect...');
        const { FlowFieldEffect } = await import('./src/effects/secondaryEffects/FlowField/index.js');
        const { FlowFieldConfig } = await import('./src/effects/secondaryEffects/FlowField/index.js');
        
        console.log('📦 [Plugin] Importing CircuitStream effect...');
        const { CircuitStreamEffect } = await import('./src/effects/primaryEffects/CircuitStream/CircuitStreamEffect.js');
        const { CircuitStreamConfig } = await import('./src/effects/primaryEffects/CircuitStream/CircuitStreamConfig.js');
        
        console.log('📦 [Plugin] Importing MetatronCube effect...');
        const { MetatronCubeEffect } = await import('./src/effects/primaryEffects/MetatronCube/MetatronCubeEffect.js');
        const { MetatronCubeConfig } = await import('./src/effects/primaryEffects/MetatronCube/MetatronCubeConfig.js');
        
        console.log('📦 [Plugin] Importing EffectCategories...');
        const { EffectCategories } = await import('my-nft-gen/src/core/registry/EffectCategories.js');
        
        // Set the config class reference
        QuantumFieldEffect._configClass_ = QuantumFieldConfig;
        FlowFieldEffect._configClass_ = FlowFieldConfig;
        CircuitStreamEffect._configClass_ = CircuitStreamConfig;
        MetatronCubeEffect._configClass_ = MetatronCubeConfig;
        
        console.log('🔄 [Plugin] All imports successful, registering effects...');

        // Register QuantumField effect
        console.log(`📦 Effect name: ${QuantumFieldEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(QuantumFieldEffect._name_)) {
            console.log(`ℹ️ Effect '${QuantumFieldEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(QuantumFieldEffect, EffectCategories.PRIMARY, {
                displayName: QuantumFieldEffect._displayName_ || 'Quantum Field',
                description: QuantumFieldEffect._description_ || 'Simulates quantum particle interactions with dynamic connections',
                version: QuantumFieldEffect._version_ || '1.0.0',
                author: QuantumFieldEffect._author_ || 'Zencoder',
                tags: QuantumFieldEffect._tags_ || ['effect', 'visual', 'quantum', 'particles', 'animated']
            });
            console.log(`✅ Registered: ${QuantumFieldEffect._name_} as PRIMARY effect`);
        }

        // Register CircuitStream effect as PRIMARY  
        console.log(`📦 Effect name: ${CircuitStreamEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(CircuitStreamEffect._name_)) {
            console.log(`ℹ️ Effect '${CircuitStreamEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(CircuitStreamEffect, EffectCategories.PRIMARY, {
                displayName: CircuitStreamEffect._displayName_ || 'Circuit Stream',
                description: CircuitStreamEffect._description_ || 'Animated digital circuit board with flowing data streams and pulsing logic gates',
                version: CircuitStreamEffect._version_ || '1.0.0',
                author: CircuitStreamEffect._author_ || 'Zencoder',
                tags: CircuitStreamEffect._tags_ || ['effect', 'primary', 'circuit', 'digital', 'animated', 'data-flow']
            });
            console.log(`✅ Registered: ${CircuitStreamEffect._name_} as PRIMARY effect`);
        }

        // Register MetatronCube effect as PRIMARY
        console.log(`📦 Effect name: ${MetatronCubeEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(MetatronCubeEffect._name_)) {
            console.log(`ℹ️ Effect '${MetatronCubeEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(MetatronCubeEffect, EffectCategories.PRIMARY, {
                displayName: MetatronCubeEffect._displayName_ || 'Metatron Cube',
                description: MetatronCubeEffect._description_ || 'Sacred geometry effect featuring Metatron\'s Cube with inscribed runes, Platonic solids, and overwhelming mystical detail',
                version: MetatronCubeEffect._version_ || '1.0.0',
                author: MetatronCubeEffect._author_ || 'Digital Alchemist',
                tags: MetatronCubeEffect._tags_ || ['effect', 'primary', 'sacred-geometry', 'metatron', 'mystical', 'animated']
            });
            console.log(`✅ Registered: ${MetatronCubeEffect._name_} as PRIMARY effect`);
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
                author: FlowFieldEffect._author_ || 'Zencoder',
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
        console.error('❌ [Plugin] Registration failed:', error.message);
        console.error('❌ [Plugin] Error name:', error.name);
        console.error('❌ [Plugin] Stack:', error.stack);
        
        // Provide more helpful error messages
        if (error.message.includes('Cannot find module') || error.message.includes('Cannot find package')) {
            console.error('💡 [Plugin] Hint: Make sure my-nft-gen is properly installed in the plugin directory');
            console.error('💡 [Plugin] Try running: npm install in the plugin directory');
        }
        
        throw error;
    }
}