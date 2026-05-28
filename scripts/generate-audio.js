import OpenAI from "openai";
import { writeFileSync, readFileSync } from "fs";
import { resolve } from "path";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const LANG = process.env.LANG_TARGET || "en";

const config = JSON.parse(readFileSync("render-latest.json", "utf8"));
const langConfig = config[LANG] ?? config;

const script = langConfig.voice?.script;
if (!script) throw new Error(`No voice.script found in render-latest.json for lang "${LANG}"`);

const voice = "nova";

console.log(`Generating ${LANG.toUpperCase()} voiceover (${voice})...`);

const response = await client.audio.speech.create({
  model: "tts-1-hd",
  voice,
  input: script,
  speed: 0.93,
});

const buffer = Buffer.from(await response.arrayBuffer());
const outputPath = resolve(`public/audio/voiceover-${LANG}.mp3`);
writeFileSync(outputPath, buffer);

console.log(`✅ ${LANG.toUpperCase()} audio → ${outputPath}`);
