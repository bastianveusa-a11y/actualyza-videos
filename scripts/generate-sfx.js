import { AudioContext } from "web-audio-api";
import { FileWriter } from "wav";
import { createWriteStream } from "fs";

const SAMPLE_RATE = 44100;

function renderOffline(durationSec, buildFn) {
  return new Promise((resolve) => {
    const ctx = new AudioContext();
    const samples = Math.ceil(durationSec * SAMPLE_RATE);
    const buffer = ctx.createBuffer(1, samples, SAMPLE_RATE);
    const data = buffer.getChannelData(0);
    buildFn(data, SAMPLE_RATE, durationSec);
    resolve(data);
  });
}

function saveWav(filepath, data) {
  return new Promise((resolve) => {
    const writer = new FileWriter(filepath, { channels: 1, sampleRate: SAMPLE_RATE, bitDepth: 16 });
    const int16 = new Int16Array(data.length);
    for (let i = 0; i < data.length; i++) {
      int16[i] = Math.max(-32768, Math.min(32767, data[i] * 32767));
    }
    writer.write(Buffer.from(int16.buffer));
    writer.end();
    writer.on("finish", resolve);
  });
}

// ── Whoosh: filtered white noise with frequency sweep ──
function buildWhoosh(data, sr, dur) {
  let lp = 0;
  for (let i = 0; i < data.length; i++) {
    const t = i / sr;
    const progress = t / dur;
    const noise = (Math.random() * 2 - 1);
    const cutoff = 0.02 + progress * 0.25;
    lp = lp + cutoff * (noise - lp);
    const env = Math.sin(Math.PI * progress) * Math.pow(1 - progress, 0.5);
    data[i] = lp * env * 0.7;
  }
}

// ── Phone ring: classic dual-tone (425Hz + 480Hz bursts) ──
function buildPhoneRing(data, sr, dur) {
  for (let i = 0; i < data.length; i++) {
    const t = i / sr;
    const cycle = t % 4.0;
    const ringing = cycle < 2.0;
    if (ringing) {
      const tone = Math.sin(2 * Math.PI * 425 * t) * 0.5
                 + Math.sin(2 * Math.PI * 480 * t) * 0.5;
      const env = Math.min(1, cycle / 0.05) * Math.min(1, (2.0 - cycle) / 0.05);
      data[i] = tone * env * 0.4;
    } else {
      data[i] = 0;
    }
  }
}

// ── Notification ping: sine burst with quick decay ──
function buildNotification(data, sr, dur) {
  const freq1 = 880;
  const freq2 = 1108;
  for (let i = 0; i < data.length; i++) {
    const t = i / sr;
    const phase2Start = 0.12;
    let val = 0;
    if (t < phase2Start + 0.1) {
      val = Math.sin(2 * Math.PI * freq1 * t) * Math.exp(-t * 8);
    }
    if (t >= phase2Start) {
      const t2 = t - phase2Start;
      val += Math.sin(2 * Math.PI * freq2 * t2) * Math.exp(-t2 * 6);
    }
    data[i] = val * 0.5;
  }
}

// ── Success chime: ascending triad ──
function buildSuccess(data, sr, dur) {
  const notes = [523, 659, 784, 1046]; // C E G C
  const noteLen = dur / notes.length;
  for (let i = 0; i < data.length; i++) {
    const t = i / sr;
    const noteIdx = Math.min(notes.length - 1, Math.floor(t / noteLen));
    const noteT = t - noteIdx * noteLen;
    const freq = notes[noteIdx];
    const env = Math.exp(-noteT * 4) * Math.min(1, noteT / 0.01);
    data[i] = Math.sin(2 * Math.PI * freq * t) * env * 0.45;
  }
}

// ── Keyboard tap: short click ──
function buildKeyTap(data, sr, dur) {
  for (let i = 0; i < data.length; i++) {
    const t = i / sr;
    const noise = (Math.random() * 2 - 1);
    const env = Math.exp(-t * 80);
    data[i] = noise * env * 0.6;
  }
}

// ── Ambient pad: detuned sine drones for tension ──
function buildAmbient(data, sr, dur) {
  const freqs = [55, 55.3, 82.4, 110, 110.5];
  for (let i = 0; i < data.length; i++) {
    const t = i / sr;
    const envIn  = Math.min(1, t / 3);
    const envOut = Math.min(1, (dur - t) / 3);
    let val = 0;
    for (const f of freqs) {
      val += Math.sin(2 * Math.PI * f * t) / freqs.length;
    }
    // slow tremolo
    const tremolo = 0.85 + 0.15 * Math.sin(2 * Math.PI * 0.25 * t);
    data[i] = val * envIn * envOut * tremolo * 0.35;
  }
}

const sfx = [
  { name: "whoosh",       fn: buildWhoosh,       dur: 0.6  },
  { name: "phone-ring",   fn: buildPhoneRing,    dur: 6.0  },
  { name: "notification", fn: buildNotification, dur: 0.5  },
  { name: "success",      fn: buildSuccess,      dur: 1.2  },
  { name: "key-tap",      fn: buildKeyTap,       dur: 0.05 },
  { name: "ambient",      fn: buildAmbient,      dur: 31   },
];

for (const sfxItem of sfx) {
  const data = await renderOffline(sfxItem.dur, sfxItem.fn);
  const path = `public/audio/${sfxItem.name}.wav`;
  await saveWav(path, data);
  console.log(`✅ ${path}`);
}

console.log("\nAll sound effects generated.");
