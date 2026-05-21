import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VideoConfig } from "../types";
import { useTheme } from "../theme";

export const Scene1Hook: React.FC<{ hook: VideoConfig["hook"] }> = ({ hook }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();

  const l1Spring = spring({ frame, fps, config: { damping: 10, stiffness: 200, mass: 0.6 } });
  const l2Spring = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 12, stiffness: 180 } });
  const subOpacity = interpolate(frame, [28, 50], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [60, 75], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const grad = `linear-gradient(${theme.gradientAngle}deg, ${theme.accent1}, ${theme.accent2})`;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exitOpacity, flexDirection: "column" }}>
      {/* Pulse rings */}
      {[1, 0.65, 0.35].map((_s, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 180 + i * 80, height: 180 + i * 80,
          borderRadius: "50%",
          border: `1.5px solid ${theme.accent1}${Math.round((0.4 - i * 0.12) * 255).toString(16).padStart(2,"0")}`,
          transform: `scale(${1 + interpolate((frame + i * 15) % 45, [0, 45], [0, 0.6])})`,
          opacity: interpolate((frame + i * 15) % 45, [0, 45], [0.7, 0]),
        }} />
      ))}

      {/* Phone icon */}
      <div style={{
        width: 88, height: 88, borderRadius: "50%",
        background: grad,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 42,
        transform: `scale(${interpolate(l1Spring, [0, 1], [0.5, 1])}) translateY(${interpolate(l1Spring, [0, 1], [40, 0])}px)`,
        opacity: l1Spring,
        marginBottom: 48,
        boxShadow: `0 0 40px ${theme.accent1}4D`,
      }}>
        📞
      </div>

      {/* Line 1 — Inter Black */}
      <div style={{ transform: `translateY(${interpolate(l1Spring, [0, 1], [60, 0])}px)`, opacity: l1Spring, textAlign: "center", padding: "0 64px" }}>
        <p style={{ fontSize: 68, fontWeight: 900, fontFamily: "'Inter', sans-serif", color: "#FFFFFF", lineHeight: 1.05, margin: 0, letterSpacing: "-2px" }}>
          {hook.line1}
        </p>
      </div>

      {/* Line 2 — Playfair italic, gradient */}
      <div style={{ transform: `translateY(${interpolate(l2Spring, [0, 1], [50, 0])}px)`, opacity: l2Spring, textAlign: "center", padding: "0 64px", marginTop: 8 }}>
        <p style={{ fontSize: 72, fontWeight: 700, fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.0, margin: 0, background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1px" }}>
          {hook.line2}
        </p>
      </div>

      {hook.subline && (
        <div style={{ opacity: subOpacity, marginTop: 28, textAlign: "center" }}>
          <p style={{ fontSize: 34, fontWeight: 300, fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.55)", margin: 0, letterSpacing: "0.02em" }}>
            {hook.subline}
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};
