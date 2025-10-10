// Generic Primary Effect Test Runner
// - Discovers effects by calling the plugin's register() with a simple in-memory registry
// - Runs any PRIMARY effect by name and optionally writes an output PNG
// - Keeps dependencies injected (DIP) and avoids hardcoding any specific effect (OCP)

import { Canvas2dFactory } from 'my-nft-gen/src/core/factory/canvas/Canvas2dFactory.js';
import { Settings } from 'my-nft-gen/src/core/Settings.js';
import { EffectCategories } from 'my-nft-gen/src/core/registry/EffectCategories.js';
import { register as registerPlugin } from './plugin.js';
import fs from 'node:fs/promises';
import path from 'node:path';

// Small CLI args parser
function parseArgs(argv) {
  const args = {
    effect: null,
    width: 1080,
    height: 1920,
    frames: 120,
    out: null,
    configPath: null,
    allFrames: false,
    list: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--effect') args.effect = argv[++i];
    else if (a === '--width') args.width = parseInt(argv[++i], 10);
    else if (a === '--height') args.height = parseInt(argv[++i], 10);
    else if (a === '--frames') args.frames = parseInt(argv[++i], 10);
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--config') args.configPath = argv[++i];
    else if (a === '--all-frames') args.allFrames = true;
    else if (a === '--list') args.list = true;
  }
  return args;
}

// Minimal in-memory EffectRegistry for plugin registration
class SimpleEffectRegistry {
  constructor() {
    this.global = {}; // name -> { EffectClass, meta, category }
    this.categories = {}; // category -> { name: entry }
  }
  hasGlobal = (name) => Boolean(this.global[name]);
  registerGlobal = (EffectClass, category, meta) => {
    const name = EffectClass._name_ || EffectClass.name;
    const entry = { EffectClass, meta, category };
    this.global[name] = entry;
    if (!this.categories[category]) this.categories[category] = {};
    this.categories[category][name] = entry;
  };
  getByCategoryGlobal = (category) => this.categories[category] || {};
}

// Dummy PositionRegistry (not used by tests)
class SimplePositionRegistry {}

function printUsage(availableNames) {
  console.log('Usage: node test-runner-primary.js --effect <name> [options]');
  console.log('Options:');
  console.log('  --width <n>         Canvas width (default: 1024)');
  console.log('  --height <n>        Canvas height (default: 1024)');
  console.log('  --frames <n>        Total frames for testing loop (default: 120)');
  console.log('  --all-frames        Render all frames instead of sampled ones');
  console.log('  --out <file>        Output PNG file path (optional)');
  console.log('  --config <file>     JSON config overrides (optional)');
  console.log('  --list              List available PRIMARY effect names');
  if (availableNames?.length) {
    console.log('\nAvailable PRIMARY effects:');
    for (const n of availableNames) console.log(`  - ${n}`);
  }
}

async function createLayer(settings, canvas) {
  // Try to get a 2D context, with fallbacks
  const ctx = canvas?.ctx || canvas?.context || canvas?.getContext?.('2d') || {
    canvas: { width: settings.width, height: settings.height },
    // Minimal noop 2D API to avoid crashes if context isn't available
    save: () => {}, restore: () => {},
    globalCompositeOperation: 'normal', globalAlpha: 1,
    fillStyle: '#000000', strokeStyle: '#000000', lineWidth: 1,
    shadowColor: 'rgba(0,0,0,0)', shadowBlur: 0, shadowOffsetX: 0, shadowOffsetY: 0,
    filter: 'none',
    beginPath: () => {}, closePath: () => {}, moveTo: () => {}, lineTo: () => {},
    quadraticCurveTo: () => {}, arc: () => {}, rect: () => {}, fill: () => {}, stroke: () => {},
    fillRect: () => {}, strokeRect: () => {}, clearRect: () => {},
    fillText: () => {}, strokeText: () => {}, setLineDash: () => {},
    createRadialGradient: () => ({ addColorStop: () => {} }),
    createLinearGradient: () => ({ addColorStop: () => {} }),
    font: '10px sans-serif', textAlign: 'left', textBaseline: 'alphabetic',
    translate: () => {}, rotate: () => {}, scale: () => {}, transform: () => {},
    setTransform: () => {}, resetTransform: () => {},
  };

  // Layer stub that captures last composited layer for export
  const layer = {
    ctx,
    canvas,
    width: settings.width,
    height: settings.height,
    _captured: null,
    compositeLayerOver: async (otherLayer) => {
      layer._captured = otherLayer;
    },
    blur: async () => {},
    adjustLayerOpacity: async () => {},
  };

  return layer;
}

async function exportPNGFromLayer(layer, outPath) {
  if (!outPath) return;
  let buffer = null;
  try {
    // Prefer the composited layer's buffer if available (sharp-based layers)
    const captured = layer?._captured;
    if (captured?.toBuffer && typeof captured.toBuffer === 'function') {
      buffer = await captured.toBuffer('image/png');
    } else if (captured?.imageBuffer) {
      buffer = captured.imageBuffer; // some LayerFactory outputs expose raw buffer
    } else if (layer?.canvas?.toBuffer) {
      buffer = layer.canvas.toBuffer('image/png');
    } else if (layer?.canvas?.canvas?.toBuffer) {
      buffer = layer.canvas.canvas.toBuffer('image/png');
    }
  } catch (e) {
    console.warn('⚠️ Could not produce PNG buffer:', e.message);
  }
  if (buffer) {
    const dir = path.dirname(outPath);
    try { await fs.mkdir(dir, { recursive: true }); } catch {}
    await fs.writeFile(outPath, buffer);
    console.log(`💾 Saved: ${outPath}`);
  } else {
    console.warn('⚠️ Skipping file export: no buffer available');
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const effectRegistry = new SimpleEffectRegistry();
  const positionRegistry = new SimplePositionRegistry();

  // Register effects from the plugin (injecting our simple registries)
  await registerPlugin(effectRegistry, positionRegistry);

  const primary = effectRegistry.getByCategoryGlobal(EffectCategories.PRIMARY);
  const availableNames = Object.keys(primary);

  if (args.list) {
    printUsage(availableNames);
    return;
  }

  if (!args.effect) {
    console.log('❌ Missing --effect');
    printUsage(availableNames);
    process.exit(1);
  }

  const entry = effectRegistry.global[args.effect];
  if (!entry) {
    console.log(`❌ Effect '${args.effect}' not found in PRIMARY registry`);
    printUsage(availableNames);
    process.exit(1);
  }

  const { EffectClass } = entry;
  const ConfigClass = EffectClass._configClass_ || null;

  const settings = new Settings({
    // Some effects compute their own final size from settings; provide hints if supported
    width: args.width,
    height: args.height,
    totalSupply: 1,
    startIndex: 0,
  });

  let configInstance = ConfigClass ? new ConfigClass({}) : undefined;
  if (args.configPath && ConfigClass) {
    try {
      const raw = await fs.readFile(args.configPath, 'utf-8');
      const json = JSON.parse(raw);
      configInstance = new ConfigClass(json);
    } catch (e) {
      console.warn(`⚠️ Failed to load config from ${args.configPath}: ${e.message}. Using defaults.`);
      configInstance = new ConfigClass({});
    }
  }

  const effect = new EffectClass({
    name: args.effect,
    config: configInstance,
    settings,
  });

  const canvas = await Canvas2dFactory.getNewCanvas(settings.width, settings.height);
  const layer = await createLayer(settings, canvas);

  const totalFrames = Math.max(1, args.frames | 0);
  const framesToRender = args.allFrames
    ? Array.from({ length: totalFrames }, (_, i) => i)
    : [0, Math.floor(totalFrames / 4), Math.floor(totalFrames / 2), totalFrames - 1];

  console.log(`🚀 Running PRIMARY effect: ${args.effect}`);
  console.log(`🖼️ ${settings.width}x${settings.height}, frames=${totalFrames} (${args.allFrames ? 'all' : 'sampled'})`);

  for (const f of framesToRender) {
    await effect.invoke(layer, f, totalFrames);
    console.log(`  ✅ Frame ${String(f).padStart(3, '0')} rendered`);
  }

  if (args.out) {
    await exportPNGFromLayer(layer, args.out);
  }

  console.log('🎉 Done');
}

main().catch((err) => {
  console.error('❌ Test runner failed:', err);
  process.exit(1);
});