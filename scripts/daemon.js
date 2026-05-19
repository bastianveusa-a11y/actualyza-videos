/**
 * Actualyza Video Daemon
 * Runs on your Mac in the background.
 * Polls the dashboard for new videos → renders → uploads to Cloudinary → Buffer auto-schedules.
 *
 * Start:  node scripts/daemon.js
 * Stop:   Ctrl+C
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createReadStream, statSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const DASHBOARD_URL = process.env.DASHBOARD_URL || "https://actualyza-prospecting-production.up.railway.app";
const DAEMON_SECRET = process.env.DAEMON_SECRET || "";
const POLL_MS = 60_000; // check every 60 seconds

const headers = { "X-Daemon-Key": DAEMON_SECRET };

function log(msg) {
  console.log(`[${new Date().toISOString().slice(0,19)}] ${msg}`);
}

// ── Fetch pending videos from dashboard ───────────────────────────
async function getPending() {
  const r = await fetch(`${DASHBOARD_URL}/api/pending-renders`, { headers });
  if (!r.ok) throw new Error(`API error ${r.status}`);
  return r.json(); // [{ id, slug, lang, config, concept }]
}

// ── Render a single video ─────────────────────────────────────────
function render(slug, lang, config, concept) {
  const outFile = resolve(ROOT, "out", `${slug}-${lang}.mp4`);
  mkdirSync(resolve(ROOT, "out"), { recursive: true });

  const propsFile = resolve(ROOT, `render-props-${lang}.json`);
  writeFileSync(propsFile, JSON.stringify(config));

  // Write render-latest.json so generate-audio.js can find the concept
  writeFileSync(
    resolve(ROOT, "render-latest.json"),
    JSON.stringify({ slug, concept, [lang]: config })
  );

  log(`🎙  Generating ${lang.toUpperCase()} voiceover…`);
  execSync(`LANG_TARGET=${lang} node scripts/generate-audio.js`, {
    cwd: ROOT, stdio: "inherit",
  });

  log(`🖥  Rendering ${slug}-${lang}.mp4…`);
  execSync(
    `npx remotion render src/index.ts AmyReel-${lang.toUpperCase()} ${outFile} --props=${propsFile}`,
    { cwd: ROOT, stdio: "inherit" }
  );

  return outFile;
}

// ── Upload rendered video to dashboard (→ Cloudinary → Buffer) ───
async function upload(videoId, filePath) {
  const stats = statSync(filePath);
  log(`☁️  Uploading ${(stats.size / 1024 / 1024).toFixed(1)}MB to Cloudinary…`);

  const formData = new FormData();
  const blob = new Blob([readFileSync(filePath)], { type: "video/mp4" });
  formData.append("file", blob, `video-${videoId}.mp4`);

  const r = await fetch(`${DASHBOARD_URL}/publish/upload/${videoId}`, {
    method: "POST",
    headers,   // X-Daemon-Key (no Content-Type — FormData sets it automatically)
    body: formData,
  });

  const data = await r.json();
  if (!r.ok || data.error) throw new Error(data.error || `Upload failed ${r.status}`);
  return data;
}

// ── Main loop ─────────────────────────────────────────────────────
async function loop() {
  log("🔍 Checking for pending videos…");

  try {
    const pending = await getPending();

    if (!pending.length) {
      log("✓ Nothing to render.");
    } else {
      log(`📋 Found ${pending.length} video(s) to render.`);

      for (const v of pending) {
        log(`▶️  ${v.slug}-${v.lang}`);
        try {
          const outFile = render(v.slug, v.lang, v.config, v.concept);
          const result  = await upload(v.id, outFile);
          log(`✅ Done — ${result.scheduled ? `📅 Scheduled ${result.slot_display}` : "uploaded"}`);
        } catch (err) {
          log(`❌ Error on ${v.slug}-${v.lang}: ${err.message}`);
        }
      }
    }
  } catch (err) {
    log(`❌ Poll error: ${err.message}`);
  }

  setTimeout(loop, POLL_MS);
}

// ── Start ─────────────────────────────────────────────────────────
log("🚀 Actualyza Daemon started");
log(`   Dashboard: ${DASHBOARD_URL}`);
log(`   Polling every ${POLL_MS / 1000}s`);
if (!DAEMON_SECRET) log("   ⚠️  DAEMON_SECRET not set — set it in Railway + local env");
loop();
