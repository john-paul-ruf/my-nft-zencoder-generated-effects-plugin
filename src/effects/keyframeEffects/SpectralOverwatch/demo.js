#!/usr/bin/env node

import { SpectralOverwatchEffect, SpectralOverwatchConfig } from './index.js';
import sharp from 'sharp';
import fs from 'fs';

async function main(){
  const width = 512, height = 512;
  const base = await sharp({ create: { width, height, channels: 4, background: { r: 40, g: 40, b: 60, alpha: 1 } } })
    .png().toBuffer();

  const layer = {
    async getInfo(){ return { width, height }; },
    async toBuffer(){ return base; },
    async fromBuffer(buf){ this._buf = buf; },
    async adjustLayerOpacity(_o){},
  };

  const config = new SpectralOverwatchConfig({
    keyFrames: [0, 60, 180],
    glitchFrameCount: [20, 20],
    colorMode: 'prismatic',
    baseHue: 200,
    saturation: 0.9,
    value: 1.0,
  });

  const effect = new SpectralOverwatchEffect({ config, settings: { width, height } });

  const outDir = './output/spectral-overwatch-demo';
  fs.mkdirSync(outDir, { recursive: true });

  for (let f = 0; f < 240; f++){
    const res = await effect.invoke(layer, f, 240);
    const buf = res._buf || base;
    await fs.promises.writeFile(`${outDir}/frame-${String(f).padStart(4,'0')}.png`, buf);
  }

  console.log('✅ Demo frames written to', outDir);
}

main().catch(e=>{ console.error(e); process.exit(1); });