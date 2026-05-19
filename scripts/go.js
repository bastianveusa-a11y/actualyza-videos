import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";

const lang = process.argv[2] || "en";
if (!["en", "es"].includes(lang)) {
  console.error("Usage: node scripts/go.js [en|es]");
  process.exit(1);
}

const configPath = resolve("render-latest.json");
if (!existsSync(configPath)) {
  console.error("❌ render-latest.json not found. Generate a video from the dashboard first.");
  process.exit(1);
}

const data = JSON.parse(readFileSync(configPath, "utf8"));
const slug = data.slug || "video-" + Date.now();
const config = data[lang];

if (!config) {
  console.error(`❌ No '${lang}' config in render-latest.json`);
  process.exit(1);
}

const outFile = `out/${slug}-${lang}.mp4`;
const propsFile = `render-props-${lang}.json`;

console.log(`\n🎬  ${lang.toUpperCase()} → ${outFile}`);
console.log(`📋  Concept: ${data.concept?.slice(0, 80) || "—"}\n`);

// 1. Voiceover
console.log("🎙  Generating voiceover...");
execSync(`LANG_TARGET=${lang} node scripts/generate-audio.js`, { stdio: "inherit" });

// 2. Write props file (avoids shell escaping issues)
writeFileSync(propsFile, JSON.stringify(config));

// 3. Render
console.log("\n🖥  Rendering...");
execSync(
  `npx remotion render src/index.ts AmyReel-${lang.toUpperCase()} ${outFile} --props=${propsFile}`,
  { stdio: "inherit" }
);

console.log(`\n✅ Done → ${outFile}`);
