import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VideoConfig } from "../types";
import { useTheme } from "../theme";

export const Scene2Problem: React.FC<{ problem: VideoConfig["problem"] }> = ({ problem }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();
  const enterOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [120, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const grad = `linear-gradient(90deg, ${theme.accent1}, ${theme.accent2})`;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: enterOpacity * exitOpacity, padding: "0 72px" }}>
      <p style={{ fontSize: 32, fontWeight: 400, fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif", color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: 52, letterSpacing: "0.02em" }}>
        {problem.intro}
      </p>

      {problem.stats.map((stat, i) => {
        const delay = i * 14;
        const s = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 16, stiffness: 110 } });
        return (
          <div key={i} style={{ width: "100%", marginBottom: 36, transform: `translateX(${interpolate(s, [0, 1], [-100, 0])}px)`, opacity: s, display: "flex", alignItems: "baseline", gap: 20 }}>
            <span style={{ fontSize: 88, fontWeight: 900, fontFamily: "'Inter', sans-serif", lineHeight: 1, background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", flexShrink: 0, letterSpacing: "-3px" }}>
              {stat.value}
            </span>
            <span style={{ fontSize: 26, fontWeight: 400, fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif", color: "rgba(255,255,255,0.55)", lineHeight: 1.3 }}>
              {stat.label}
            </span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
