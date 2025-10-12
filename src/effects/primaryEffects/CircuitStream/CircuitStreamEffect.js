import {LayerEffect} from 'my-nft-gen/src/core/layer/LayerEffect.js';
import {Canvas2dFactory} from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import {
    getRandomFromArray,
    randomId,
    randomNumber,
} from 'my-nft-gen/src/core/math/random.js';
import {Settings} from 'my-nft-gen/src/core/Settings.js';
import {CircuitStreamConfig} from './CircuitStreamConfig.js';

export class CircuitStreamEffect extends LayerEffect {
    static _name_ = 'circuit-stream';
    static _displayName_ = 'Circuit Stream';
    static _description_ = 'Animated digital circuit board with flowing data streams and pulsing logic gates';
    static _version_ = '1.0.0';
    static _author_ = 'Zencoder';
    static _tags_ = ['effect', 'primary', 'circuit', 'digital', 'animated', 'data-flow'];

    constructor({
                    name = CircuitStreamEffect._name_,
                    requiresLayer = true,
                    config = new CircuitStreamConfig({}),
                    additionalEffects = [],
                    ignoreAdditionalEffects = false,
                    settings = new Settings({}),
                }) {
        super({
            name,
            requiresLayer,
            config,
            additionalEffects,
            ignoreAdditionalEffects,
            settings,
        });
        this.#generate(settings);
    }

    #generate(settings) {
        // Use finalSize from parent class LayerEffect which gets it from settings
        const width = this.finalSize?.width || 1024;
        const height = this.finalSize?.height || 1024;



        // Store all pre-generated data for pure function rendering
        this.data = {
            width,
            height,
            // Grid dimensions will be calculated dynamically based on canvas size
            traceWidth: this.config.traceWidth,
            perfectLoop: this.config.perfectLoop,
            showBackgroundGrid: this.config.showBackgroundGrid,
            useOrthogonalTraces: this.config.useOrthogonalTraces,
            layerOpacity: this.config.layerOpacity,
            layerBlendMode: this.config.layerBlendMode,

            // PCB-Style Features
            usePCBStyle: this.config.usePCBStyle,
            showComponentPads: this.config.showComponentPads,
            showVias: this.config.showVias,
            showICFootprints: this.config.showICFootprints,
            useCurvedTraces: this.config.useCurvedTraces,
            traceWidthVariation: this.config.traceWidthVariation,
            traceCurvature: this.config.traceCurvature,

            // Colors (direct from ColorPicker value)
            traceColor: this.config.traceColor?.getColor(settings) || '#FFFFFF',
            activeTraceColor: this.config.activeTraceColor?.getColor(settings) || '#FFFFFF',
            dataPacketColor: this.config.dataPacketColor?.getColor(settings) || '#FFFFFF',
            nodeColor: this.config.nodeColor?.getColor(settings) || '#FFFFFF',
            nodeCoreColor: this.config.nodeCoreColor?.getColor(settings) || '#FFFFFF',
            signalColor: this.config.signalColor?.getColor(settings)|| '#FFFFFF',
            backgroundGridColor: this.config.backgroundGridColor?.getColor(settings) || '#FFFFFF',
            padColor: this.config.padColor?.getColor(settings) || '#FFFFFF',
            viaColor: this.config.viaColor?.getColor(settings) || '#FFFFFF',
            icColor: this.config.icColor?.getColor(settings) || '#FFFFFF',
            solderMaskColor: this.config.solderMaskColor?.getColor(settings) || '#FFFFFF',
            
            // Generate circuit grid first (needed by other generators)
            grid: null, // Will be assigned below
            
            // Generate traces (connections between grid points)
            traces: null, // Will be assigned below
            
            // Generate nodes (logic gates/junctions)
            nodes: null, // Will be assigned below
            
            // Generate data packets
            packets: null, // Will be assigned below
            
            // Generate signal waves
            signalWaves: null, // Will be assigned below
            
            // PCB Components
            pads: null, // Component pads
            vias: null, // Via holes
            ics: null, // IC footprints
            
            // Store random values for consistent animation
            glowIntensity: randomNumber(this.config.glowIntensityMin, this.config.glowIntensityMax),
            glowSpread: randomNumber(this.config.glowSpreadMin, this.config.glowSpreadMax),
            blurAmount: randomNumber(this.config.blurAmountMin, this.config.blurAmountMax),
        };
        
        // Now generate components in order
        this.data.grid = this.#generateGrid(width, height);
        
        // Generate PCB components if enabled
        if (this.config.usePCBStyle) {
            this.data.pads = this.#generateComponentPads(width, height);
            this.data.vias = this.#generateVias(width, height);
            this.data.ics = this.#generateICFootprints(width, height);
        }
        
        this.data.traces = this.#generateTraces(width, height, this.data.grid);
        this.data.nodes = this.#generateNodes(width, height, this.data.grid);
        this.data.packets = this.#generateDataPackets(width, height, this.data.traces);
        this.data.signalWaves = this.#generateSignalWaves(width, height, this.data.nodes);

    }

    #generateGrid(width, height) {
        // Calculate grid size based on canvas dimensions
        // Aim for roughly square cells around 50-80 pixels
        const targetCellSize = 64;

        // Calculate columns and rows independently for non-square images
        const gridColumns = Math.max(6, Math.round(width / targetCellSize));
        const gridRows = Math.max(6, Math.round(height / targetCellSize));



        // Actual cell dimensions (may not be square for non-square images)
        const cellWidth = width / gridColumns;
        const cellHeight = height / gridRows;
        const grid = [];

        // Generate grid points that span the full canvas
        for (let row = 0; row <= gridRows; row++) {
            for (let col = 0; col <= gridColumns; col++) {
                grid.push({
                    x: col * cellWidth,
                    y: row * cellHeight,
                    col,
                    row,
                    hasTrace: Math.random() < this.config.traceDensity,
                    opacity: randomNumber(this.config.traceOpacityMin, this.config.traceOpacityMax),
                });
            }
        }
        
        return {
            points: grid,
            cellWidth,
            cellHeight,
            gridColumns,
            gridRows
        };
    }

    #generateTraces(width, height, grid) {
        const traces = [];
        const traceCount = Math.floor(grid.points.filter(p => p.hasTrace).length / 2);

        // Ensure we create enough traces to fill the space
        const minTraces = Math.max(15, traceCount); // At least 15 traces

        for (let i = 0; i < minTraces; i++) {
            const startPoint = getRandomFromArray(grid.points.filter(p => p.hasTrace));
            const endPoint = getRandomFromArray(grid.points.filter(p => p.hasTrace && p !== startPoint));
            
            // Generate path (orthogonal or direct)
            const path = this.#generateTracePath(startPoint, endPoint);
            
            // Calculate trace width with variation for PCB style
            let traceWidth = this.config.traceWidth;
            if (this.config.usePCBStyle && this.config.traceWidthVariation > 0) {
                // Some traces are power lines (thicker), others are signal lines (thinner)
                const isPowerTrace = Math.random() < 0.2; // 20% are power traces
                if (isPowerTrace) {
                    traceWidth = this.config.traceWidth * (1 + this.config.traceWidthVariation);
                } else {
                    traceWidth = this.config.traceWidth * (1 - this.config.traceWidthVariation * 0.5);
                }
            }
            
            traces.push({
                id: randomId(),
                startPoint,
                endPoint,
                path,
                width: traceWidth,
                opacity: randomNumber(this.config.traceOpacityMin, this.config.traceOpacityMax),
                // ✅ FIXED: Normalize pulseOffset to 0-1 range for perfect loop calculations
                pulseOffset: randomNumber(0, 1),
                pulseSpeed: randomNumber(this.config.energyPulseFrequencyMin, this.config.energyPulseFrequencyMax),
                flowSpeed: randomNumber(this.config.energyFlowSpeedMin, this.config.energyFlowSpeedMax),
                isActive: Math.random() > 0.3,
            });
        }
        
        return traces;
    }

    #generateTracePath(start, end) {
        const path = [];
        path.push({x: start.x, y: start.y});
        
        if (this.config.useOrthogonalTraces) {
            // Create L-shaped path (horizontal then vertical or vice versa)
            if (Math.random() > 0.5) {
                // Horizontal first
                if (this.config.useCurvedTraces && this.config.usePCBStyle) {
                    // Add curved corner using control points
                    const midX = end.x;
                    const midY = start.y;
                    const curvature = this.config.traceCurvature;
                    const offset = Math.abs(end.x - start.x) * curvature;
                    
                    // Add intermediate points for smooth curve
                    path.push({x: midX - offset, y: midY});
                    path.push({x: midX, y: midY + offset});
                } else {
                    path.push({x: end.x, y: start.y});
                }
            } else {
                // Vertical first
                if (this.config.useCurvedTraces && this.config.usePCBStyle) {
                    // Add curved corner using control points
                    const midX = start.x;
                    const midY = end.y;
                    const curvature = this.config.traceCurvature;
                    const offset = Math.abs(end.y - start.y) * curvature;
                    
                    // Add intermediate points for smooth curve
                    path.push({x: midX, y: midY - offset});
                    path.push({x: midX + offset, y: midY});
                } else {
                    path.push({x: start.x, y: end.y});
                }
            }
        }
        
        path.push({x: end.x, y: end.y});
        return path;
    }

    #generateNodes(width, height, grid) {
        const nodes = [];
        // Scale node count based on canvas area, maintaining density
        const area = (width * height) / (1024 * 1024); // Normalize to 1024x1024 reference
        const scaleFactor = Math.sqrt(area); // Square root for proportional scaling
        const nodeCount = Math.max(8, Math.round(this.config.nodeCount * scaleFactor));

        for (let i = 0; i < nodeCount; i++) {
            // Distribute nodes evenly across the canvas
            // Mix grid-aligned and random positions for natural look
            const useGridPosition = Math.random() > 0.5; // 50/50 chance
            let x, y;

            if (useGridPosition && grid.points.length > 0) {
                const gridPoint = getRandomFromArray(grid.points);
                x = gridPoint.x;
                y = gridPoint.y;
            } else {
                // Use full canvas area from edge to edge
                x = randomNumber(0, width);
                y = randomNumber(0, height);
            }
            
            nodes.push({
                id: randomId(),
                x,
                y,
                radius: randomNumber(this.config.nodeRadiusMin, this.config.nodeRadiusMax),
                pulseIntensity: randomNumber(this.config.nodePulseIntensityMin, this.config.nodePulseIntensityMax),
                // ✅ FIXED: Normalize pulseOffset to 0-1 range for perfect loop calculations
                pulseOffset: randomNumber(0, 1),
                blinkFrequency: randomNumber(this.config.gateBlinkFrequencyMin, this.config.gateBlinkFrequencyMax),
                chargeTime: randomNumber(this.config.gateChargeTimeMin, this.config.gateChargeTimeMax),
                dischargeTime: randomNumber(this.config.gateDischargeTimeMin, this.config.gateDischargeTimeMax),
                type: getRandomFromArray(['junction', 'and', 'or', 'xor', 'capacitor', 'processor']),
                connections: [], // Will be populated with connected traces
            });
        }
        
        return nodes;
    }

    #generateDataPackets(width, height, traces) {
        const packets = [];
        // Scale packet count based on canvas area
        const area = (width * height) / (1024 * 1024); // Normalize to 1024x1024 reference
        const scaleFactor = Math.sqrt(area);
        const packetCount = Math.max(10, Math.round(this.config.packetCount * scaleFactor));
        
        for (let i = 0; i < packetCount; i++) {
            // Assign each packet to a trace
            const trace = traces.length > 0 ? 
                getRandomFromArray(traces) : null;
            
            packets.push({
                id: randomId(),
                traceId: trace ? trace.id : null,
                size: randomNumber(this.config.packetSizeMin, this.config.packetSizeMax),
                speed: randomNumber(this.config.packetSpeedMin, this.config.packetSpeedMax),
                glowRadius: randomNumber(this.config.packetGlowRadiusMin, this.config.packetGlowRadiusMax),
                // ✅ FIXED: Normalize startOffset to 0-1 range for perfect loop calculations
                startOffset: randomNumber(0, 1),
                direction: Math.random() > 0.5 ? 1 : -1,
                dataBit: Math.random() > 0.5 ? '1' : '0',
                colorOffset: randomNumber(0, 50),
            });
        }
        
        return packets;
    }

    #generateSignalWaves(width, height, nodes) {
        const waves = [];
        // Scale wave count based on canvas area
        const area = (width * height) / (1024 * 1024); // Normalize to 1024x1024 reference
        const scaleFactor = Math.sqrt(area);
        const waveCount = Math.max(3, Math.round(this.config.signalWaveCount * scaleFactor));
        
        for (let i = 0; i < waveCount; i++) {
            // Optionally origin from nodes or random positions
            const useNodeOrigin = Math.random() > 0.5 && nodes.length > 0;
            let originX, originY;
            
            if (useNodeOrigin) {
                const node = getRandomFromArray(nodes);
                originX = node.x;
                originY = node.y;
            } else {
                originX = randomNumber(0, width);
                originY = randomNumber(0, height);
            }
            
            waves.push({
                id: randomId(),
                speed: randomNumber(this.config.signalWaveSpeedMin, this.config.signalWaveSpeedMax),
                amplitude: randomNumber(this.config.signalWaveAmplitudeMin, this.config.signalWaveAmplitudeMax),
                decayRate: randomNumber(this.config.signalDecayRateMin, this.config.signalDecayRateMax),
                // ✅ FIXED: Normalize phaseOffset to 0-1 range for perfect loop calculations
                phaseOffset: randomNumber(0, 1),
                frequency: randomNumber(0.5, 2),
                originX,
                originY,
            });
        }
        
        return waves;
    }

    #generateComponentPads(width, height) {
        const pads = [];
        const area = (width * height) / (1024 * 1024);
        const scaleFactor = Math.sqrt(area);
        const padCount = Math.max(10, Math.round(this.config.padCount * scaleFactor));
        
        for (let i = 0; i < padCount; i++) {
            pads.push({
                id: randomId(),
                x: randomNumber(0, width),
                y: randomNumber(0, height),
                radius: randomNumber(this.config.padRadiusMin, this.config.padRadiusMax),
                shape: getRandomFromArray(['circle', 'square', 'rounded-square']),
                hasTrace: Math.random() > 0.3, // 70% chance of having a trace connection
                pulseOffset: randomNumber(0, 1),
            });
        }
        
        return pads;
    }

    #generateVias(width, height) {
        const vias = [];
        const area = (width * height) / (1024 * 1024);
        const scaleFactor = Math.sqrt(area);
        const viaCount = Math.max(8, Math.round(this.config.viaCount * scaleFactor));
        
        for (let i = 0; i < viaCount; i++) {
            vias.push({
                id: randomId(),
                x: randomNumber(0, width),
                y: randomNumber(0, height),
                radius: randomNumber(this.config.viaRadiusMin, this.config.viaRadiusMax),
                innerRadius: randomNumber(this.config.viaRadiusMin * 0.4, this.config.viaRadiusMax * 0.6),
            });
        }
        
        return vias;
    }

    #generateICFootprints(width, height) {
        const ics = [];
        const area = (width * height) / (1024 * 1024);
        const scaleFactor = Math.sqrt(area);
        const icCount = Math.max(2, Math.round(this.config.icCount * scaleFactor));
        
        for (let i = 0; i < icCount; i++) {
            const icWidth = randomNumber(this.config.icSizeMin, this.config.icSizeMax);
            const icHeight = randomNumber(this.config.icSizeMin * 0.6, this.config.icSizeMax * 0.8);
            const pinCount = Math.floor(randomNumber(8, 32) / 2) * 2; // Even number of pins
            
            ics.push({
                id: randomId(),
                x: randomNumber(icWidth / 2, width - icWidth / 2),
                y: randomNumber(icHeight / 2, height - icHeight / 2),
                width: icWidth,
                height: icHeight,
                pinCount: pinCount,
                pinSize: randomNumber(2, 4),
                rotation: getRandomFromArray([0, 90, 180, 270]),
                type: getRandomFromArray(['DIP', 'QFP', 'SOIC']),
            });
        }
        
        return ics;
    }

    async invoke(layer, currentFrame, numberOfFrames) {
        // ✅ SOLID: DIP - Draw circuit stream directly to layer
        await this.#drawCircuitStream(layer, currentFrame, numberOfFrames);
        await super.invoke(layer, currentFrame, numberOfFrames);
        return layer;
    }

    async #drawCircuitStream(layer, currentFrame, numberOfFrames) {

        // Create independent canvas following framework pattern
        const canvas = await Canvas2dFactory.getNewCanvas(this.data.width, this.data.height);

        // Draw all circuit elements using the Canvas2d wrapper
        await this.#renderCircuitElements(canvas, currentFrame, numberOfFrames);

        // Convert canvas to layer and composite
        const resultLayer = await canvas.convertToLayer();

        // Apply post-processing effects
        // ✅ SOLID: SRP - Validate blur constraints per Sharp library requirements
        if (this.data.blurAmount > 0.3) {
            // Sharp requires blur between 0.3 and 1000
            // Only apply blur if amount is meaningful (>= 0.3)
            const validBlurAmount = Math.min(1000, this.data.blurAmount);
            await resultLayer.blur(validBlurAmount);
        }

        await resultLayer.adjustLayerOpacity(this.data.layerOpacity);
        await layer.compositeLayerOver(resultLayer);
    }

    async #renderCircuitElements(canvas, currentFrame, numberOfFrames) {
        const {width, height} = this.data;


        // Draw background based on render mode
        await this.#drawBackground(canvas);

        // Draw background grid if enabled
        if (this.data.showBackgroundGrid) {
            await this.#drawBackgroundGridToCanvas(canvas, currentFrame, numberOfFrames);
        }

        // Draw PCB components first (bottom layer)
        if (this.data.usePCBStyle) {
            // Draw IC footprints first (largest elements)
            if (this.data.showICFootprints && this.data.ics) {
                await this.#drawICFootprintsToCanvas(canvas, currentFrame, numberOfFrames);
            }
            
            // Draw component pads
            if (this.data.showComponentPads && this.data.pads) {
                await this.#drawComponentPadsToCanvas(canvas, currentFrame, numberOfFrames);
            }
        }

        // Draw circuit traces
        await this.#drawTracesToCanvas(canvas, currentFrame, numberOfFrames);

        // Draw vias on top of traces
        if (this.data.usePCBStyle && this.data.showVias && this.data.vias) {
            await this.#drawViasToCanvas(canvas, currentFrame, numberOfFrames);
        }

        // Draw signal waves
        await this.#drawSignalWavesToCanvas(canvas, currentFrame, numberOfFrames);

        // Draw nodes/logic gates
        await this.#drawNodesToCanvas(canvas, currentFrame, numberOfFrames);

        // Draw data packets
        await this.#drawDataPacketsToCanvas(canvas, currentFrame, numberOfFrames);
    }

    async #drawBackground(canvas) {
        // Don't draw any background - keep it transparent
        // The effect should overlay on existing layers
        // Remove this method call if you want complete transparency
    }

    // Implementation using Canvas2d API with proper paths
    async #drawBackgroundGridToCanvas(canvas, currentFrame, numberOfFrames) {
        const {grid, backgroundGridColor} = this.data;

        // Draw vertical lines with animated opacity
        for (let col = 0; col <= grid.gridColumns; col++) {
            const x = col * grid.cellWidth;

            // Simple sine wave for smooth pulsing
            const phaseOffset = (col / grid.gridColumns) * Math.PI * 2;
            const progress = (currentFrame / numberOfFrames) * Math.PI * 2;
            const opacity = 0.15 + Math.sin(progress + phaseOffset) * 0.1; // 0.05 to 0.25

            const gridColor = this.#applyOpacityToColor(backgroundGridColor, opacity);

            await canvas.drawLine2d(
                {x: x, y: 0},
                {x: x, y: this.data.height},
                0.5, gridColor, 0, null, 1
            );
        }

        // Draw horizontal lines with animated opacity
        for (let row = 0; row <= grid.gridRows; row++) {
            const y = row * grid.cellHeight;

            // Simple sine wave for smooth pulsing
            const phaseOffset = (row / grid.gridRows) * Math.PI * 2;
            const progress = (currentFrame / numberOfFrames) * Math.PI * 2;
            const opacity = 0.15 + Math.sin(progress + phaseOffset) * 0.1; // 0.05 to 0.25

            const gridColor = this.#applyOpacityToColor(backgroundGridColor, opacity);

            await canvas.drawLine2d(
                {x: 0, y: y},
                {x: this.data.width, y: y},
                0.5, gridColor, 0, null, 1
            );
        }
    }

    async #drawTracesToCanvas(canvas, currentFrame, numberOfFrames) {
        const {traces, traceColor, activeTraceColor, perfectLoop} = this.data;

        for (const trace of traces) {
            // ✅ FIXED: Calculate pulse animation for active traces with perfect looping
            let pulseIntensity = 0;
            if (trace.isActive) {
                let progress;
                if (perfectLoop) {
                    // Perfect loop: ensure sine wave completes full cycles
                    // Round pulseSpeed to integer for perfect loops
                    const pulseCycles = Math.round(trace.pulseSpeed);
                    // Use (numberOfFrames - 1) so last frame matches first frame
                    const normalizedFrame = currentFrame / Math.max(1, numberOfFrames - 1);
                    progress = (normalizedFrame * pulseCycles + trace.pulseOffset) * Math.PI * 2;
                } else {
                    // Original behavior
                    progress = ((currentFrame + trace.pulseOffset * numberOfFrames) / numberOfFrames) * trace.pulseSpeed * Math.PI * 2;
                }
                pulseIntensity = (Math.sin(progress) + 1) / 2; // 0 to 1
            }

            const color = trace.isActive ?
                this.#blendColors(traceColor, activeTraceColor, pulseIntensity) :
                traceColor;

            // Use trace-specific width (varies for PCB style)
            const traceWidth = trace.width || this.data.traceWidth;

            // Use drawPath with the entire trace path array (like QuantumField does)
            await canvas.drawPath(
                trace.path,
                traceWidth * 2, // innerStroke - make thicker for visibility
                color || '#00FF00', // innerColor - green fallback
                trace.isActive ? this.data.glowSpread : 0, // outerStroke for glow
                trace.isActive ? activeTraceColor : null // outerColor for glow
            );
        }
    }

    async #drawSignalWavesToCanvas(canvas, currentFrame, numberOfFrames) {
        const {signalWaves, signalColor, width, height, perfectLoop} = this.data;
        const maxRadius = Math.max(width, height);

        for (const wave of signalWaves) {
            // ✅ FIXED: Calculate wave expansion with perfect looping
            let progress;
            if (perfectLoop) {
                // Perfect loop: waves complete full expansion cycles
                // Round speed to integer cycles for perfect loop
                const waveCycles = Math.round(wave.speed);
                // Use (numberOfFrames - 1) so last frame matches first frame
                const normalizedFrame = currentFrame / Math.max(1, numberOfFrames - 1);
                progress = ((normalizedFrame * waveCycles) + wave.phaseOffset) % 1.0;
            } else {
                // Original behavior
                const adjustedFrame = currentFrame + wave.phaseOffset * numberOfFrames;
                progress = (adjustedFrame % numberOfFrames) / numberOfFrames;
            }
            const waveProgress = progress * maxRadius * wave.speed;

            // Calculate opacity based on decay
            const opacity = Math.max(0, 1 - (waveProgress / maxRadius) * wave.decayRate);

            if (opacity > 0.01) {
                // Draw expanding circle wave using path
                const circlePath = this.#createCirclePath(wave.originX, wave.originY, waveProgress);
                await canvas.drawPath(
                    circlePath,
                    Math.max(1, 2 - waveProgress / maxRadius * 2), // innerStroke
                    signalColor, // innerColor
                    0, // outerStroke
                    null // outerColor
                );
            }
        }
    }

    async #drawNodesToCanvas(canvas, currentFrame, numberOfFrames) {
        const {nodes, nodeColor, nodeCoreColor, perfectLoop} = this.data;

        for (const node of nodes) {
            // ✅ FIXED: Calculate charge/discharge cycle with perfect looping
            let progress;
            if (perfectLoop) {
                // Perfect loop: ensure sine wave completes integer cycles
                // Round blinkFrequency to integer for perfect loops
                const blinkCycles = Math.round(node.blinkFrequency);
                // Use (numberOfFrames - 1) so last frame matches first frame
                const normalizedFrame = currentFrame / Math.max(1, numberOfFrames - 1);
                progress = (normalizedFrame * blinkCycles + node.pulseOffset) * Math.PI * 2;
            } else {
                // Original behavior
                const cycleDuration = node.chargeTime + node.dischargeTime;
                progress = ((currentFrame + node.pulseOffset * cycleDuration) / cycleDuration) * Math.PI * 2;
            }
            const chargeLevel = (Math.sin(progress) + 1) / 2; // 0 to 1

            // Draw node based on type
            await this.#drawNodeByTypeToCanvas(canvas, node, chargeLevel);
        }
    }

    async #drawNodeByTypeToCanvas(canvas, node, chargeLevel) {
        const {nodeColor, nodeCoreColor} = this.data;

        // Ensure colors are valid
        const validNodeColor = nodeColor || '#00FF00';
        const validCoreColor = nodeCoreColor || '#FFFF00';

        switch (node.type) {
            case 'junction':
                // Draw filled circle for better visibility
                const junctionPath = this.#createCirclePath(node.x, node.y, node.radius);
                await canvas.drawPath(junctionPath, 2, validNodeColor, 0, null);

                // Inner core with charge level
                const corePath = this.#createCirclePath(node.x, node.y, node.radius * 0.5);
                await canvas.drawPath(corePath, 1, validCoreColor,
                    this.data.glowIntensity * chargeLevel, validCoreColor);
                break;

            case 'processor':
                // CPU-like square using path
                const squarePath = this.#createSquarePath(node.x, node.y, node.radius);
                await canvas.drawPath(squarePath, 2, validNodeColor, 0, null);
                break;

            default:
                // Default junction - filled circle
                const defaultPath = this.#createCirclePath(node.x, node.y, node.radius);
                await canvas.drawPath(defaultPath, 2, validNodeColor, 0, null);
        }
    }

    async #drawDataPacketsToCanvas(canvas, currentFrame, numberOfFrames) {
        const {packets, traces, dataPacketColor, perfectLoop} = this.data;

        for (const packet of packets) {
            // Find the trace this packet belongs to
            const trace = traces.find(t => t.id === packet.traceId);
            if (!trace || trace.path.length < 2) continue;

            // ✅ FIXED: Calculate progress to ensure perfect loops
            let progress;
            if (perfectLoop) {
                // Perfect loop: packets complete integer number of cycles to return to start
                // Round speed to nearest integer for perfect looping
                const speedCycles = Math.round(packet.speed);
                // Use currentFrame directly, not modulo, for smooth transition
                // Divide by (numberOfFrames - 1) so last frame matches first frame position
                const normalizedFrame = currentFrame / Math.max(1, numberOfFrames - 1);
                // Calculate progress with integer cycles for perfect loop
                progress = ((normalizedFrame * speedCycles) + packet.startOffset) % 1.0;
            } else {
                // Original behavior: may not loop perfectly but allows fractional cycles
                const cycleFrames = numberOfFrames / packet.speed;
                progress = ((currentFrame + packet.startOffset * numberOfFrames) % cycleFrames) / cycleFrames;
            }

            // Get position on trace path
            const position = this.#getPositionOnPath(trace.path, progress, packet.direction);

            // Draw packet as glowing dot using path
            const packetPath = this.#createCirclePath(position.x, position.y, packet.size);
            await canvas.drawPath(
                packetPath,
                packet.size, // innerStroke - filled appearance
                dataPacketColor || '#00FFFF', // innerColor - cyan fallback
                packet.glowRadius, // outerStroke for glow
                dataPacketColor || '#00FFFF' // outerColor for glow
            );
        }
    }

    // PCB Component Drawing Methods

    async #drawComponentPadsToCanvas(canvas, currentFrame, numberOfFrames) {
        const {pads, padColor, perfectLoop} = this.data;

        for (const pad of pads) {
            // Subtle pulse animation for pads
            let pulseIntensity = 0;
            if (pad.hasTrace) {
                let progress;
                if (perfectLoop) {
                    const normalizedFrame = currentFrame / Math.max(1, numberOfFrames - 1);
                    progress = (normalizedFrame + pad.pulseOffset) * Math.PI * 2;
                } else {
                    progress = ((currentFrame + pad.pulseOffset * numberOfFrames) / numberOfFrames) * Math.PI * 2;
                }
                pulseIntensity = (Math.sin(progress) + 1) / 2 * 0.3; // 0 to 0.3
            }

            const opacity = 0.7 + pulseIntensity;
            const color = this.#applyOpacityToColor(padColor, opacity);

            // Draw pad based on shape
            if (pad.shape === 'circle') {
                const padPath = this.#createCirclePath(pad.x, pad.y, pad.radius);
                await canvas.drawPath(padPath, pad.radius * 1.5, color, 0, null);
            } else if (pad.shape === 'square') {
                const padPath = this.#createSquarePath(pad.x, pad.y, pad.radius);
                await canvas.drawPath(padPath, 2, color, 0, null);
            } else if (pad.shape === 'rounded-square') {
                const padPath = this.#createRoundedSquarePath(pad.x, pad.y, pad.radius, pad.radius * 0.3);
                await canvas.drawPath(padPath, 2, color, 0, null);
            }
        }
    }

    async #drawViasToCanvas(canvas, currentFrame, numberOfFrames) {
        const {vias, viaColor} = this.data;

        for (const via of vias) {
            // Draw outer ring
            const outerPath = this.#createCirclePath(via.x, via.y, via.radius);
            await canvas.drawPath(outerPath, 1.5, viaColor, 0, null);

            // Draw inner hole (darker)
            const innerPath = this.#createCirclePath(via.x, via.y, via.innerRadius);
            const darkerColor = this.#applyOpacityToColor(viaColor, 0.3);
            await canvas.drawPath(innerPath, via.innerRadius, darkerColor, 0, null);
        }
    }

    async #drawICFootprintsToCanvas(canvas, currentFrame, numberOfFrames) {
        const {ics, icColor, perfectLoop} = this.data;

        for (const ic of ics) {
            // Draw IC body
            const bodyPath = this.#createRoundedSquarePath(ic.x, ic.y, ic.width / 2, ic.height / 2, 3);
            const bodyColor = this.#applyOpacityToColor(icColor, 0.4);
            await canvas.drawPath(bodyPath, 2, bodyColor, 0, null);

            // Draw pins based on IC type
            const pinsPerSide = ic.pinCount / 2;
            const pinSpacing = (ic.type === 'DIP' ? ic.height : ic.width) / (pinsPerSide + 1);

            for (let i = 0; i < pinsPerSide; i++) {
                // Left side pins
                const leftY = ic.y - ic.height / 2 + pinSpacing * (i + 1);
                const leftPinPath = this.#createSquarePath(
                    ic.x - ic.width / 2 - ic.pinSize,
                    leftY,
                    ic.pinSize
                );
                await canvas.drawPath(leftPinPath, 1, icColor, 0, null);

                // Right side pins
                const rightY = ic.y - ic.height / 2 + pinSpacing * (i + 1);
                const rightPinPath = this.#createSquarePath(
                    ic.x + ic.width / 2 + ic.pinSize,
                    rightY,
                    ic.pinSize
                );
                await canvas.drawPath(rightPinPath, 1, icColor, 0, null);
            }

            // Draw pin 1 indicator (small circle)
            const pin1Path = this.#createCirclePath(
                ic.x - ic.width / 2 + 5,
                ic.y - ic.height / 2 + 5,
                2
            );
            await canvas.drawPath(pin1Path, 2, icColor, 0, null);
        }
    }

    // Keep utility methods only

    #createCirclePath(centerX, centerY, radius) {
        const path = [];
        const steps = 32; // Smooth circle
        for (let i = 0; i <= steps; i++) {
            const angle = (i / steps) * Math.PI * 2;
            path.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            });
        }
        return path;
    }

    #createSquarePath(centerX, centerY, size) {
        return [
            {x: centerX - size, y: centerY - size},
            {x: centerX + size, y: centerY - size},
            {x: centerX + size, y: centerY + size},
            {x: centerX - size, y: centerY + size},
            {x: centerX - size, y: centerY - size}, // Close the path
        ];
    }

    #createRoundedSquarePath(centerX, centerY, halfWidth, halfHeight, cornerRadius = 3) {
        const path = [];
        const x1 = centerX - halfWidth;
        const x2 = centerX + halfWidth;
        const y1 = centerY - halfHeight;
        const y2 = centerY + halfHeight;
        const r = Math.min(cornerRadius, halfWidth * 0.3, halfHeight * 0.3);

        // Start from top-left corner, going clockwise
        // Top edge
        path.push({x: x1 + r, y: y1});
        path.push({x: x2 - r, y: y1});
        // Top-right corner
        path.push({x: x2, y: y1 + r});
        // Right edge
        path.push({x: x2, y: y2 - r});
        // Bottom-right corner
        path.push({x: x2 - r, y: y2});
        // Bottom edge
        path.push({x: x1 + r, y: y2});
        // Bottom-left corner
        path.push({x: x1, y: y2 - r});
        // Left edge
        path.push({x: x1, y: y1 + r});
        // Close path
        path.push({x: x1 + r, y: y1});

        return path;
    }

    #getPositionOnPath(path, progress, direction) {
        if (path.length < 2) {
            return path[0] || {x: 0, y: 0};
        }

        // Adjust progress based on direction
        // Don't double-ease - findValue already handles easing
        const adjustedProgress = direction > 0 ? progress : 1 - progress;

        // Calculate total path length
        let totalLength = 0;
        const segments = [];

        for (let i = 0; i < path.length - 1; i++) {
            const dx = path[i + 1].x - path[i].x;
            const dy = path[i + 1].y - path[i].y;
            const length = Math.sqrt(dx * dx + dy * dy);
            segments.push({
                start: path[i],
                end: path[i + 1],
                length: length,
                accumulated: totalLength,
            });
            totalLength += length;
        }

        // Find position along path - linear interpolation since easing is in findValue
        const targetLength = adjustedProgress * totalLength;

        for (const segment of segments) {
            if (targetLength <= segment.accumulated + segment.length) {
                const segmentProgress = (targetLength - segment.accumulated) / segment.length;
                return {
                    x: segment.start.x + (segment.end.x - segment.start.x) * segmentProgress,
                    y: segment.start.y + (segment.end.y - segment.start.y) * segmentProgress,
                };
            }
        }

        // Return last point if beyond path
        return path[path.length - 1];
    }

    #blendColors(color1, color2, ratio) {
        // Parse hex colors
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);

        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);

        // Blend colors
        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);

        // Return hex color
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    #applyOpacityToColor(hexColor, opacity) {
        // Delegate to the proper color opacity adjustment method
        return this.#adjustColorOpacity(hexColor, opacity);
    }

    /**
     * Adjust color opacity by modifying the alpha channel
     * @param {string} color - Color in hex format (e.g., "#FF0000")
     * @param {number} opacity - Opacity value between 0 and 1
     * @returns {string} Color with adjusted opacity
     */
    #adjustColorOpacity(color, opacity) {
        // Handle hex colors
        if (color.startsWith('#')) {
            const hex = color.slice(1);
            let r, g, b;
            
            if (hex.length === 3) {
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else if (hex.length === 6) {
                r = parseInt(hex.slice(0, 2), 16);
                g = parseInt(hex.slice(2, 4), 16);
                b = parseInt(hex.slice(4, 6), 16);
            } else {
                return color; // Return original if format is unexpected
            }
            
            // Clamp opacity between 0 and 1
            const alpha = Math.max(0, Math.min(1, opacity));
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        
        // Handle rgba colors
        if (color.startsWith('rgba(')) {
            const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
            if (match) {
                const [, r, g, b] = match;
                const alpha = Math.max(0, Math.min(1, opacity));
                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }
        }
        
        // Handle rgb colors
        if (color.startsWith('rgb(')) {
            const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
                const [, r, g, b] = match;
                const alpha = Math.max(0, Math.min(1, opacity));
                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }
        }
        
        // Return original color if format is not recognized
        return color;
    }
}

// Set the config class reference for serialization
CircuitStreamEffect._configClass_ = CircuitStreamConfig;