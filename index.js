import { SpiralWaveEffect } from './src/effects/primaryEffects/SpiralWave/SpiralWaveEffect.js';
import { SpiralWaveConfig } from './src/effects/primaryEffects/SpiralWave/SpiralWaveConfig.js';
import { createCanvas } from 'canvas';
import fs from 'fs';

const width = 800;
const height = 800;
const numberOfFrames = 60;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

const config = new SpiralWaveConfig({
    spiralCount: 2,
    armCount: 6,
    waveAmplitude: { lower: 20, upper: 40 },
    waveFrequency: { lower: 3, upper: 6 },
    waveSpeed: { lower: 1.0, upper: 2.0 },
    lineWidth: { lower: 3, upper: 6 },
    rotationSpeed: { lower: 1.0, upper: 2.5 },
    pulseIntensity: { lower: 0.2, upper: 0.4 },
    renderMode: ['gradient', 'pulse'],
    blendMode: ['overlay', 'screen'],
    layerOpacity: 0.85,
    glow: { lower: 1, upper: 3 }
});

const effect = new SpiralWaveEffect({ config });

console.log('🎨 SpiralWave Effect Plugin Demo');
console.log('=================================');
console.log(effect.getInfo());
console.log('');
console.log('Configuration:');
console.log(JSON.stringify(config, null, 2));
console.log('');

const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
gradient.addColorStop(0, '#FF6B6B');
gradient.addColorStop(0.5, '#4ECDC4');
gradient.addColorStop(1, '#45B7D1');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

const layer = {
    canvas,
    width,
    height
};

async function generateFrame(frameNumber) {
    const tempCanvas = createCanvas(width, height);
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);

    const tempLayer = {
        canvas: tempCanvas,
        width,
        height
    };

    await effect.invoke(tempLayer, frameNumber, numberOfFrames);

    const buffer = tempCanvas.toBuffer('image/png');
    const fileName = `output/frame_${String(frameNumber).padStart(3, '0')}.png`;

    if (!fs.existsSync('output')) {
        fs.mkdirSync('output');
    }

    fs.writeFileSync(fileName, buffer);
    console.log(`✅ Generated frame ${frameNumber}/${numberOfFrames}`);
}

console.log('🚀 Generating frames...\n');

(async () => {
    for (let i = 0; i < numberOfFrames; i++) {
        await generateFrame(i);
    }
    console.log('\n🎉 Animation complete! Check the output/ directory for frames.');
    console.log('💡 Tip: Use ffmpeg to create a video from the frames:');
    console.log('   ffmpeg -r 30 -i output/frame_%03d.png -c:v libx264 -pix_fmt yuv420p output.mp4');
})();
