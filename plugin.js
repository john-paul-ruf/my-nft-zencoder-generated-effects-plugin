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
        
        console.log('📦 [Plugin] Importing CymaticsResonance effect...');
        const { CymaticsResonanceEffect } = await import('./src/effects/primaryEffects/CymaticsResonance/CymaticsResonanceEffect.js');
        const { CymaticsResonanceConfig } = await import('./src/effects/primaryEffects/CymaticsResonance/CymaticsResonanceConfig.js');
        
        console.log('📦 [Plugin] Importing AuroraKaleido effect...');
        const { AuroraKaleidoEffect } = await import('./src/effects/primaryEffects/AuroraKaleido/AuroraKaleidoEffect.js');
        const { AuroraKaleidoConfig } = await import('./src/effects/primaryEffects/AuroraKaleido/AuroraKaleidoConfig.js');
        
        console.log('📦 [Plugin] Importing EffectCategories...');
        const { EffectCategories } = await import('my-nft-gen/src/core/registry/EffectCategories.js');

        // Import OrbitBloom FINAL effect
        console.log('📦 [Plugin] Importing OrbitBloom final effect...');
        const { OrbitBloomEffect } = await import('./src/effects/finalImageEffects/OrbitBloom/OrbitBloomEffect.js');
        const { OrbitBloomConfig } = await import('./src/effects/finalImageEffects/OrbitBloom/OrbitBloomConfig.js');
        
        // Import VoidEcho FINAL effect
        console.log('📦 [Plugin] Importing VoidEcho final effect...');
        const { VoidEchoEffect } = await import('./src/effects/finalImageEffects/VoidEcho/VoidEchoEffect.js');
        const { VoidEchoConfig } = await import('./src/effects/finalImageEffects/VoidEcho/VoidEchoConfig.js');
        
        // Import FluxWeave FINAL effect
        console.log('📦 [Plugin] Importing FluxWeave final effect...');
        const { FluxWeaveEffect } = await import('./src/effects/finalImageEffects/FluxWeave/FluxWeaveEffect.js');
        const { FluxWeaveConfig } = await import('./src/effects/finalImageEffects/FluxWeave/FluxWeaveConfig.js');
        
        // Set the config class reference
        QuantumFieldEffect._configClass_ = QuantumFieldConfig;
        FlowFieldEffect._configClass_ = FlowFieldConfig;
        CircuitStreamEffect._configClass_ = CircuitStreamConfig;
        MetatronCubeEffect._configClass_ = MetatronCubeConfig;
        CymaticsResonanceEffect._configClass_ = CymaticsResonanceConfig;
        AuroraKaleidoEffect._configClass_ = AuroraKaleidoConfig;
        OrbitBloomEffect._configClass_ = OrbitBloomConfig;
        VoidEchoEffect._configClass_ = VoidEchoConfig;
        FluxWeaveEffect._configClass_ = FluxWeaveConfig;
        
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
                author: MetatronCubeEffect._author_ || 'Zencoder',
                tags: MetatronCubeEffect._tags_ || ['effect', 'primary', 'sacred-geometry', 'metatron', 'mystical', 'animated']
            });
            console.log(`✅ Registered: ${MetatronCubeEffect._name_} as PRIMARY effect`);
        }

        // Register CymaticsResonance effect as PRIMARY
        console.log(`📦 Effect name: ${CymaticsResonanceEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(CymaticsResonanceEffect._name_)) {
            console.log(`ℹ️ Effect '${CymaticsResonanceEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(CymaticsResonanceEffect, EffectCategories.PRIMARY, {
                displayName: CymaticsResonanceEffect._displayName_ || 'Cymatics Resonance',
                description: CymaticsResonanceEffect._description_ || 'Mesmerizing standing wave patterns inspired by cymatics - visible sound vibrations creating harmonic interference patterns',
                version: CymaticsResonanceEffect._version_ || '1.0.0',
                author: CymaticsResonanceEffect._author_ || 'Zencoder',
                tags: CymaticsResonanceEffect._tags_ || ['effect', 'primary', 'cymatics', 'waves', 'harmonic', 'resonance', 'animated']
            });
            console.log(`✅ Registered: ${CymaticsResonanceEffect._name_} as PRIMARY effect`);
        }

        // Register AuroraKaleido effect as PRIMARY
        console.log(`📦 Effect name: ${AuroraKaleidoEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(AuroraKaleidoEffect._name_)) {
            console.log(`ℹ️ Effect '${AuroraKaleidoEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(AuroraKaleidoEffect, EffectCategories.PRIMARY, {
                displayName: AuroraKaleidoEffect._displayName_ || 'Aurora Kaleidoscope Flow',
                description: AuroraKaleidoEffect._description_ || 'Flowing aurora ribbons reflected through a kaleidoscope with perfect loop.',
                version: AuroraKaleidoEffect._version_ || '1.0.0',
                author: AuroraKaleidoEffect._author_ || 'Zencoder',
                tags: AuroraKaleidoEffect._tags_ || ['effect', 'primary', 'aurora', 'kaleido', 'ribbons', 'animated']
            });
            console.log(`✅ Registered: ${AuroraKaleidoEffect._name_} as PRIMARY effect`);
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

        // Register OrbitBloom effect as FINAL
        console.log(`📦 Effect name: ${OrbitBloomEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(OrbitBloomEffect._name_)) {
            console.log(`ℹ️ Effect '${OrbitBloomEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(OrbitBloomEffect, EffectCategories.FINAL, {
                displayName: OrbitBloomEffect._displayName_ || 'Orbit Bloom',
                description: OrbitBloomEffect._description_ || 'Iridescent chromatic orbit, ripple displacement, bloom, vignette with perfect loop.',
                version: OrbitBloomEffect._version_ || '1.0.0',
                author: OrbitBloomEffect._author_ || 'Zencoder',
                tags: OrbitBloomEffect._tags_ || ['effect', 'final', 'post', 'bloom', 'chromatic', 'animated']
            });
            console.log(`✅ Registered: ${OrbitBloomEffect._name_} as FINAL effect`);
        }

        // Register VoidEcho effect as FINAL
        console.log(`📦 Effect name: ${VoidEchoEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(VoidEchoEffect._name_)) {
            console.log(`ℹ️ Effect '${VoidEchoEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(VoidEchoEffect, EffectCategories.FINAL, {
                displayName: VoidEchoEffect._displayName_ || 'Void Echo',
                description: VoidEchoEffect._description_ || 'Recursive reality distortion with chromatic echoes through dimensional layers. Perfect loop.',
                version: VoidEchoEffect._version_ || '1.0.0',
                author: VoidEchoEffect._author_ || 'Zencoder',
                tags: VoidEchoEffect._tags_ || ['effect', 'final', 'post', 'recursive', 'chromatic', 'psychedelic', 'animated']
            });
            console.log(`✅ Registered: ${VoidEchoEffect._name_} as FINAL effect`);
        }

        // Register FluxWeave effect as FINAL
        console.log(`📦 Effect name: ${FluxWeaveEffect._name_}`);
        if (EffectRegistry.hasGlobal && EffectRegistry.hasGlobal(FluxWeaveEffect._name_)) {
            console.log(`ℹ️ Effect '${FluxWeaveEffect._name_}' is already registered, skipping...`);
        } else {
            EffectRegistry.registerGlobal(FluxWeaveEffect, EffectCategories.FINAL, {
                displayName: FluxWeaveEffect._displayName_ || 'Flux Weave',
                description: FluxWeaveEffect._description_ || 'Temporal fabric manipulation with flowing energy threads. Perfect loop.',
                version: FluxWeaveEffect._version_ || '1.0.0',
                author: FluxWeaveEffect._author_ || 'Zencoder',
                tags: FluxWeaveEffect._tags_ || ['effect', 'final', 'post', 'wave', 'flow', 'fabric', 'animated']
            });
            console.log(`✅ Registered: ${FluxWeaveEffect._name_} as FINAL effect`);
        }

        // Verify registration in the global registry
        const primaryEffects = EffectRegistry.getByCategoryGlobal(EffectCategories.PRIMARY);
        const secondaryEffects = EffectRegistry.getByCategoryGlobal(EffectCategories.SECONDARY);
        const finalEffects = EffectRegistry.getByCategoryGlobal(EffectCategories.FINAL);
        console.log(`📊 PRIMARY effects after registration:`, Object.keys(primaryEffects));
        console.log(`📊 SECONDARY effects after registration:`, Object.keys(secondaryEffects));
        console.log(`📊 FINAL effects after registration:`, Object.keys(finalEffects));

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