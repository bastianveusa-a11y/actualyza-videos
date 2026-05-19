import React from "react";
import { AbsoluteFill, Audio, interpolate, useCurrentFrame, staticFile, Sequence } from "remotion";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Amy } from "./scenes/Scene3Amy";
import { Scene4Result } from "./scenes/Scene4Result";
import { Scene5Cta } from "./scenes/Scene5Cta";
import { ReHook } from "./components/ReHook";
import { Subtitles } from "./components/Subtitles";
import { VideoConfig, DEFAULT_CONFIG } from "./types";

// Timing (frames @ 30fps):
// S1 Hook:    0   – 75   (2.5s)
// ReHook:     75  – 120  (1.5s)  ← pattern interrupt
// S2 Problem: 120 – 270  (5s)
// S3 AMY:     270 – 480  (7s)
// S4 Result:  480 – 690  (7s)
// S5 CTA:     690 – 900  (7s)
// TOTAL: 900 frames = 30s

export const AmyReel: React.FC<Partial<VideoConfig>> = (props) => {
  const config: VideoConfig = { ...DEFAULT_CONFIG, ...props };
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#08111F", fontFamily: "'Inter', sans-serif" }}>
      {/* Background blobs */}
      <AbsoluteFill style={{ opacity: bgOpacity }}>
        <div style={{ position: "absolute", top: -200, left: -200, width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(76,142,255,0.10) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -200, right: -200, width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(123,63,232,0.08) 0%, transparent 70%)" }} />
      </AbsoluteFill>

      {/* Scenes */}
      <Sequence from={0}   durationInFrames={75}><Scene1Hook  hook={config.hook} /></Sequence>
      <Sequence from={75}  durationInFrames={45}><ReHook stat="62%" label={config.lang === "es" ? "nunca vuelven a llamar" : "never call back"} /></Sequence>
      <Sequence from={120} durationInFrames={150}><Scene2Problem problem={config.problem} /></Sequence>
      <Sequence from={270} durationInFrames={210}><Scene3Amy   chat={config.chat} /></Sequence>
      <Sequence from={480} durationInFrames={210}><Scene4Result result={config.result} /></Sequence>
      <Sequence from={690} durationInFrames={210}><Scene5Cta   cta={config.cta} /></Sequence>

      {/* Burned-in subtitles */}
      <Subtitles chunks={config.subtitles} />

      {/* Audio */}
      <Audio src={staticFile(`audio/voiceover-${config.lang}.mp3`)} />
      <Audio src={staticFile("audio/ambient.wav")} volume={0.18} />

      {/* SFX */}
      <Sequence from={0}   durationInFrames={75}><Audio src={staticFile("audio/phone-ring.wav")} volume={0.3} /></Sequence>
      <Sequence from={68}  durationInFrames={18}><Audio src={staticFile("audio/whoosh.wav")} volume={0.55} /></Sequence>
      <Sequence from={113} durationInFrames={18}><Audio src={staticFile("audio/whoosh.wav")} volume={0.45} /></Sequence>
      {config.chat.messages.map((msg, i) => (
        <Sequence key={i} from={270 + msg.delay} durationInFrames={3}>
          <Audio src={staticFile("audio/key-tap.wav")} volume={0.35} />
        </Sequence>
      ))}
      <Sequence from={270 + 95} durationInFrames={15}><Audio src={staticFile("audio/notification.wav")} volume={0.6} /></Sequence>
      <Sequence from={463} durationInFrames={18}><Audio src={staticFile("audio/whoosh.wav")} volume={0.45} /></Sequence>
      <Sequence from={490} durationInFrames={36}><Audio src={staticFile("audio/success.wav")} volume={0.4} /></Sequence>
      <Sequence from={683} durationInFrames={18}><Audio src={staticFile("audio/whoosh.wav")} volume={0.38} /></Sequence>
    </AbsoluteFill>
  );
};
