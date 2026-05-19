import OpenAI from "openai";
import { writeFileSync } from "fs";
import { resolve } from "path";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const LANG = process.env.LANG_TARGET || "en";

const scripts = {
  en: `3 patients called. 3 hung up. That's $540 gone — today alone. 62% of callers who don't get an answer never call back. Meet AMY. Your AI voice agent that answers every call, books the appointment, and follows up — automatically. 24 hours. 7 days. Zero staff. Clinics using AMY book 3 times more appointments. Start your free 14-day trial at actualyza.com.`,
  es: `3 pacientes llamaron. 3 colgaron. Eso son 540 dólares perdidos, solo hoy. El 62% de quienes no reciben respuesta nunca vuelven a llamar. Conoce a AMY. Tu agente de voz con inteligencia artificial que atiende cada llamada, agenda la cita y hace seguimiento, automáticamente. Las 24 horas. Los 7 días. Sin personal. Las clínicas que usan AMY agendan 3 veces más citas. Empieza tu prueba gratuita de 14 días en actualyza.com.`,
};

const voices = { en: "nova", es: "nova" };

const script = scripts[LANG];
const voice  = voices[LANG];

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
