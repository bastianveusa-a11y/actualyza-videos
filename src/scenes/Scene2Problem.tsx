import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VideoConfig } from "../types";

export const Scene2Problem: React.FC<{ problem: VideoConfig["problem"] }> = ({ problem }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [120, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: enterOpacity * exitOpacity, padding: "0 72px" }}>
      {/* Intro — Playfair italic */}
      <p style={{
        fontSize: 32,
        fontWeight: 400,
        fontStyle: "italic",
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "rgba(255,255,255,0.45)",
        textAlign: "center",
        marginBottom: 52,
        letterSpacing: "0.02em",
      }}>
        {problem.intro}
      </p>

      {problem.stats.map((stat, i) => {
        const delay = i * 14;
        const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 16, stiffness: 110 } });
        return (
          <div key={i} style={{
            width: "100%",
            marginBottom: 36,
            transform: `translateX(${interpolate(s, [0, 1], [-100, 0])}px)`,
            opacity: s,
            display: "flex",
            alignItems: "baseline",
            gap: 20,
          }}>
            {/* Big stat — Inter Black */}
            <span style={{
              fontSize: 88,
              fontWeight: 900,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1,
              background: "linear-gradient(90deg, #4C8EFF, #7B3FE8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              flexShrink: 0,
              letterSpacing: "-3px",
            }}>
              {stat.value}
            </span>
            {/* Label — Playfair italic, softer */}
            <span style={{
              fontSize: 26,
              fontWeight: 400,
              fontStyle: "italic",
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.3,
            }}>
              {stat.label}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
