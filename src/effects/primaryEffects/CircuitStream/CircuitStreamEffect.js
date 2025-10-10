import {LayerEffect} from 'my-nft-gen/src/core/layer/LayerEffect.js';
import {findOneWayValue} from 'my-nft-gen/src/core/math/findOneWayValue.js';
import {LayerFactory} from 'my-nft-gen/src/core/factory/layer/LayerFactory.js';
import {Canvas2dFactory} from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import {
    getRandomFromArray,
    getRandomIntExclusive,
    getRandomIntInclusive,
    randomId,
    randomNumber,
} from 'my-nft-gen/src/core/math/random.js';
import {findValue, FindValueAlgorithm} from 'my-nft-gen/src/core/math/findValue.js';
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
        const width = settings.width;
        const height = settings.height;
        
        // Store all pre-generated data for pure function rendering
        this.data = {
            width,
            height,
            gridColumns: this.config.gridColumns,
            gridRows: this.config.gridRows,
            traceWidth: this.config.traceWidth,
            perfectLoop: this.config.perfectLoop,
            renderMode: getRandomFromArray(this.config.renderMode),
            showBackgroundGrid: this.config.showBackgroundGrid,
            showDataBits: this.config.showDataBits,
            useOrthogonalTraces: this.config.useOrthogonalTraces,
            layerOpacity: this.config.layerOpacity,
            layerBlendMode: this.config.layerBlendMode,
            
            // Animation algorithms
            interpolationAlgorithm: getRandomFromArray(this.config.interpolationAlgorithm),
            pulseAlgorithm: getRandomFromArray(this.config.pulseAlgorithm),
            waveAlgorithm: getRandomFromArray(this.config.waveAlgorithm),
            flowAlgorithm: getRandomFromArray(this.config.flowAlgorithm),
            
            // Colors (resolved from ColorPicker)
            traceColor: this.config.traceColor.getColor(settings),
            activeTraceColor: this.config.activeTraceColor.getColor(settings),
            dataPacketColor: this.config.dataPacketColor.getColor(settings),
            nodeColor: this.config.nodeColor.getColor(settings),
            nodeCoreColor: this.config.nodeCoreColor.getColor(settings),
            signalColor: this.config.signalColor.getColor(settings),
            backgroundGridColor: this.config.backgroundGridColor.getColor(settings),
            
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
            
            // Store random values for consistent animation
            glowIntensity: randomNumber(this.config.glowIntensityMin, this.config.glowIntensityMax),
            glowSpread: randomNumber(this.config.glowSpreadMin, this.config.glowSpreadMax),
            blurAmount: randomNumber(this.config.blurAmountMin, this.config.blurAmountMax),
        };
        
        // Now generate components in order
        this.data.grid = this.#generateGrid(width, height);
        this.data.traces = this.#generateTraces(width, height, this.data.grid);
        this.data.nodes = this.#generateNodes(width, height, this.data.grid);
        this.data.packets = this.#generateDataPackets(width, height, this.data.traces);
        this.data.signalWaves = this.#generateSignalWaves(width, height, this.data.nodes);
    }

    #generateGrid(width, height) {
        const cellWidth = width / this.config.gridColumns;
        const cellHeight = height / this.config.gridRows;
        const grid = [];
        
        for (let row = 0; row < this.config.gridRows; row++) {
            for (let col = 0; col < this.config.gridColumns; col++) {
                grid.push({
                    x: col * cellWidth + cellWidth / 2,
                    y: row * cellHeight + cellHeight / 2,
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
        };
    }

    #generateTraces(width, height, grid) {
        const traces = [];
        const traceCount = Math.floor(grid.points.filter(p => p.hasTrace).length / 2);
        
        for (let i = 0; i < traceCount; i++) {
            const startPoint = getRandomFromArray(grid.points.filter(p => p.hasTrace));
            const endPoint = getRandomFromArray(grid.points.filter(p => p.hasTrace && p !== startPoint));
            
            // Generate path (orthogonal or direct)
            const path = this.#generateTracePath(startPoint, endPoint);
            
            traces.push({
                id: randomId(),
                startPoint,
                endPoint,
                path,
                opacity: randomNumber(this.config.traceOpacityMin, this.config.traceOpacityMax),
                pulseOffset: randomNumber(0, 100),
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
                path.push({x: end.x, y: start.y});
            } else {
                // Vertical first
                path.push({x: start.x, y: end.y});
            }
        }
        
        path.push({x: end.x, y: end.y});
        return path;
    }

    #generateNodes(width, height, grid) {
        const nodes = [];
        const nodeCount = this.config.nodeCount;
        
        for (let i = 0; i < nodeCount; i++) {
            // Place nodes at grid intersections or random positions
            const useGridPosition = Math.random() > 0.3;
            let x, y;
            
            if (useGridPosition && grid.points.length > 0) {
                const gridPoint = getRandomFromArray(grid.points);
                x = gridPoint.x;
                y = gridPoint.y;
            } else {
                x = randomNumber(50, width - 50);
                y = randomNumber(50, height - 50);
            }
            
            nodes.push({
                id: randomId(),
                x,
                y,
                radius: randomNumber(this.config.nodeRadiusMin, this.config.nodeRadiusMax),
                pulseIntensity: randomNumber(this.config.nodePulseIntensityMin, this.config.nodePulseIntensityMax),
                pulseOffset: randomNumber(0, 100),
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
        const packetCount = this.config.packetCount;
        
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
                startOffset: randomNumber(0, 100),
                direction: Math.random() > 0.5 ? 1 : -1,
                dataBit: Math.random() > 0.5 ? '1' : '0',
                colorOffset: randomNumber(0, 50),
            });
        }
        
        return packets;
    }

    #generateSignalWaves(width, height, nodes) {
        const waves = [];
        const waveCount = this.config.signalWaveCount;
        
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
                phaseOffset: randomNumber(0, Math.PI * 2),
                frequency: randomNumber(0.5, 2),
                originX,
                originY,
            });
        }
        
        return waves;
    }

    #findValueWithAlgorithm(min, max, period, totalFrames, currentFrame, algorithm) {
        return findValue(min, max, period, totalFrames, currentFrame, algorithm);
    }

    async invoke(layer, currentFrame, numberOfFrames) {
        const {ctx} = layer;
        const {width, height} = this.data;

        // Clear and set blend mode
        ctx.save();
        ctx.globalCompositeOperation = this.data.layerBlendMode;
        ctx.globalAlpha = this.data.layerOpacity;

        // Apply render mode styling
        this.#applyRenderMode(ctx);

        // Draw background grid if enabled
        if (this.data.showBackgroundGrid) {
            this.#drawBackgroundGrid(ctx, currentFrame, numberOfFrames);
        }

        // Draw circuit traces
        this.#drawTraces(ctx, currentFrame, numberOfFrames);

        // Draw signal waves
        this.#drawSignalWaves(ctx, currentFrame, numberOfFrames);

        // Draw nodes/logic gates
        this.#drawNodes(ctx, currentFrame, numberOfFrames);

        // Draw data packets
        this.#drawDataPackets(ctx, currentFrame, numberOfFrames);

        ctx.restore();

        // Apply post-processing effects
        if (this.data.blurAmount > 0) {
            ctx.filter = `blur(${this.data.blurAmount}px)`;
        }

        return layer;
    }

    #applyRenderMode(ctx) {
        switch (this.data.renderMode) {
            case 'digital':
                // Classic green terminal look
                ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
                ctx.fillRect(0, 0, this.data.width, this.data.height);
                break;
            case 'matrix':
                // Dark background for matrix effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
                ctx.fillRect(0, 0, this.data.width, this.data.height);
                break;
            case 'neon':
                // Dark background for neon glow
                ctx.fillStyle = 'rgba(10, 10, 20, 0.9)';
                ctx.fillRect(0, 0, this.data.width, this.data.height);
                break;
            case 'blueprint':
                // Blueprint style background
                ctx.fillStyle = 'rgba(0, 20, 60, 0.9)';
                ctx.fillRect(0, 0, this.data.width, this.data.height);
                break;
            case 'hologram':
                // Holographic effect
                ctx.fillStyle = 'rgba(0, 10, 30, 0.85)';
                ctx.fillRect(0, 0, this.data.width, this.data.height);
                break;
        }
    }

    #drawBackgroundGrid(ctx, currentFrame, numberOfFrames) {
        const {grid, backgroundGridColor} = this.data;
        
        ctx.strokeStyle = backgroundGridColor + '20'; // 20% opacity
        ctx.lineWidth = 0.5;
        
        // Draw vertical lines
        for (let col = 0; col <= this.data.gridColumns; col++) {
            const x = col * grid.cellWidth;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.data.height);
            ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let row = 0; row <= this.data.gridRows; row++) {
            const y = row * grid.cellHeight;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.data.width, y);
            ctx.stroke();
        }
    }

    #drawTraces(ctx, currentFrame, numberOfFrames) {
        const {traces, traceColor, activeTraceColor, traceWidth} = this.data;
        
        traces.forEach(trace => {
            // Calculate pulse animation for active traces
            let pulseIntensity = 0;
            if (trace.isActive && this.data.perfectLoop) {
                pulseIntensity = this.#findValueWithAlgorithm(
                    0, 1,
                    numberOfFrames, numberOfFrames,
                    currentFrame + trace.pulseOffset,
                    this.data.pulseAlgorithm
                );
            }
            
            // Draw trace path
            ctx.beginPath();
            ctx.strokeStyle = trace.isActive ? 
                this.#blendColors(traceColor, activeTraceColor, pulseIntensity) : 
                traceColor + Math.floor(trace.opacity * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = traceWidth;
            ctx.lineCap = 'square';
            ctx.lineJoin = 'miter';
            
            trace.path.forEach((point, index) => {
                if (index === 0) {
                    ctx.moveTo(point.x, point.y);
                } else {
                    ctx.lineTo(point.x, point.y);
                }
            });
            
            ctx.stroke();
            
            // Add glow effect for active traces
            if (trace.isActive && this.data.glowIntensity > 0) {
                ctx.save();
                ctx.shadowBlur = this.data.glowSpread + pulseIntensity * 10;
                ctx.shadowColor = activeTraceColor;
                ctx.stroke();
                ctx.restore();
            }
        });
    }

    #drawNodes(ctx, currentFrame, numberOfFrames) {
        const {nodes, nodeColor, nodeCoreColor} = this.data;
        
        nodes.forEach(node => {
            // Calculate pulse/charge animation
            const chargeLevel = this.data.perfectLoop ? 
                this.#findValueWithAlgorithm(
                    0, 1,
                    node.chargeTime + node.dischargeTime,
                    numberOfFrames,
                    currentFrame + node.pulseOffset,
                    this.data.pulseAlgorithm
                ) : 0.5;
            
            // Draw node based on type
            this.#drawNodeByType(ctx, node, chargeLevel);
            
            // Add glow effect
            if (this.data.glowIntensity > 0) {
                ctx.save();
                ctx.shadowBlur = this.data.glowSpread * (0.5 + chargeLevel * 0.5);
                ctx.shadowColor = nodeCoreColor;
                ctx.fillStyle = nodeCoreColor + Math.floor(chargeLevel * 255).toString(16).padStart(2, '0');
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 0.3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        });
    }

    #drawNodeByType(ctx, node, chargeLevel) {
        const {nodeColor, nodeCoreColor} = this.data;
        
        switch (node.type) {
            case 'junction':
                // Simple circle junction
                ctx.fillStyle = nodeColor;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
                
                // Inner core
                ctx.fillStyle = nodeCoreColor + Math.floor(chargeLevel * 255).toString(16).padStart(2, '0');
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
                ctx.fill();
                break;
                
            case 'and':
                // AND gate shape
                this.#drawAndGate(ctx, node.x, node.y, node.radius, nodeColor, chargeLevel);
                break;
                
            case 'or':
                // OR gate shape
                this.#drawOrGate(ctx, node.x, node.y, node.radius, nodeColor, chargeLevel);
                break;
                
            case 'capacitor':
                // Capacitor symbol
                this.#drawCapacitor(ctx, node.x, node.y, node.radius, nodeColor, chargeLevel);
                break;
                
            case 'processor':
                // CPU-like square with grid
                this.#drawProcessor(ctx, node.x, node.y, node.radius, nodeColor, chargeLevel);
                break;
                
            default:
                // Default junction
                ctx.fillStyle = nodeColor;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
        }
    }

    #drawAndGate(ctx, x, y, size, color, chargeLevel) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        
        // Draw AND gate shape (D-shape)
        ctx.beginPath();
        ctx.moveTo(-size, -size);
        ctx.lineTo(0, -size);
        ctx.arc(0, 0, size, -Math.PI/2, Math.PI/2);
        ctx.lineTo(-size, size);
        ctx.lineTo(-size, -size);
        ctx.stroke();
        
        // Fill with charge level
        ctx.fillStyle = color + Math.floor(chargeLevel * 100).toString(16).padStart(2, '0');
        ctx.fill();
        
        ctx.restore();
    }

    #drawOrGate(ctx, x, y, size, color, chargeLevel) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        
        // Draw OR gate shape (shield-like)
        ctx.beginPath();
        ctx.moveTo(-size, -size);
        ctx.quadraticCurveTo(0, -size * 0.5, size, 0);
        ctx.quadraticCurveTo(0, size * 0.5, -size, size);
        ctx.quadraticCurveTo(-size * 0.5, 0, -size, -size);
        ctx.stroke();
        
        // Fill with charge level
        ctx.fillStyle = color + Math.floor(chargeLevel * 100).toString(16).padStart(2, '0');
        ctx.fill();
        
        ctx.restore();
    }

    #drawCapacitor(ctx, x, y, size, color, chargeLevel) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        
        // Draw capacitor symbol (two parallel lines)
        const gap = size * 0.4;
        ctx.beginPath();
        ctx.moveTo(x - gap, y - size);
        ctx.lineTo(x - gap, y + size);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + gap, y - size);
        ctx.lineTo(x + gap, y + size);
        ctx.stroke();
        
        // Show charge between plates
        if (chargeLevel > 0.1) {
            ctx.strokeStyle = this.data.signalColor + Math.floor(chargeLevel * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 1;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(x - gap + 2, y - size/2 + i * size/2);
                ctx.lineTo(x + gap - 2, y - size/2 + i * size/2);
                ctx.stroke();
            }
        }
        
        ctx.restore();
    }

    #drawProcessor(ctx, x, y, size, color, chargeLevel) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color + '40';
        ctx.lineWidth = 2;
        
        // Draw processor square
        const halfSize = size;
        ctx.fillRect(x - halfSize, y - halfSize, halfSize * 2, halfSize * 2);
        ctx.strokeRect(x - halfSize, y - halfSize, halfSize * 2, halfSize * 2);
        
        // Draw internal grid
        ctx.strokeStyle = color + Math.floor(chargeLevel * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 1;
        const gridSize = 3;
        const cellSize = (halfSize * 2) / gridSize;
        
        for (let i = 1; i < gridSize; i++) {
            // Vertical lines
            ctx.beginPath();
            ctx.moveTo(x - halfSize + i * cellSize, y - halfSize);
            ctx.lineTo(x - halfSize + i * cellSize, y + halfSize);
            ctx.stroke();
            
            // Horizontal lines
            ctx.beginPath();
            ctx.moveTo(x - halfSize, y - halfSize + i * cellSize);
            ctx.lineTo(x + halfSize, y - halfSize + i * cellSize);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    #drawDataPackets(ctx, currentFrame, numberOfFrames) {
        const {packets, traces, dataPacketColor} = this.data;
        
        packets.forEach(packet => {
            // Find the trace this packet belongs to
            const trace = traces.find(t => t.id === packet.traceId);
            if (!trace || trace.path.length < 2) return;
            
            // Calculate packet position along trace path
            const progress = this.data.perfectLoop ?
                this.#findValueWithAlgorithm(
                    0, 1,
                    numberOfFrames / packet.speed,
                    numberOfFrames,
                    currentFrame + packet.startOffset,
                    this.data.flowAlgorithm
                ) : 0.5;
            
            // Get position on trace path
            const position = this.#getPositionOnPath(trace.path, progress, packet.direction);
            
            // Draw packet
            ctx.save();
            
            // Add glow
            if (this.data.glowIntensity > 0) {
                ctx.shadowBlur = packet.glowRadius;
                ctx.shadowColor = dataPacketColor;
            }
            
            // Draw packet as glowing dot
            ctx.fillStyle = dataPacketColor;
            ctx.beginPath();
            ctx.arc(position.x, position.y, packet.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw data bit if enabled
            if (this.data.showDataBits) {
                ctx.fillStyle = '#FFFFFF';
                ctx.font = `bold ${packet.size * 2}px monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(packet.dataBit, position.x, position.y);
            }
            
            ctx.restore();
        });
    }

    #drawSignalWaves(ctx, currentFrame, numberOfFrames) {
        const {signalWaves, signalColor, width, height} = this.data;
        
        signalWaves.forEach(wave => {
            // Calculate wave expansion
            const waveProgress = this.data.perfectLoop ?
                this.#findValueWithAlgorithm(
                    0, Math.max(width, height),
                    numberOfFrames / wave.speed,
                    numberOfFrames,
                    currentFrame + wave.phaseOffset * 10,
                    this.data.waveAlgorithm
                ) : 100;
            
            // Calculate opacity based on decay
            const opacity = Math.max(0, 1 - (waveProgress / Math.max(width, height)) * wave.decayRate);
            
            if (opacity > 0.01) {
                ctx.save();
                ctx.strokeStyle = signalColor + Math.floor(opacity * 100).toString(16).padStart(2, '0');
                ctx.lineWidth = 2 - waveProgress / Math.max(width, height);
                ctx.setLineDash([5, 10]);
                
                // Draw expanding circle wave
                ctx.beginPath();
                ctx.arc(wave.originX, wave.originY, waveProgress, 0, Math.PI * 2);
                ctx.stroke();
                
                ctx.restore();
            }
        });
    }

    #getPositionOnPath(path, progress, direction) {
        if (path.length < 2) {
            return path[0] || {x: 0, y: 0};
        }
        
        // Adjust progress based on direction
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
        
        // Find position along path
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
}

// Set the config class reference for serialization
CircuitStreamEffect._configClass_ = CircuitStreamConfig;