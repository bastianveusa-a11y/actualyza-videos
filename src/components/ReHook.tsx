import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Pattern interrupt between S1 and S2 — big stat, sharp zoom, color flash
export const ReHook: React.FC<{ stat: string; label: string }> = ({ stat, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zoom = spring({ frame, fps, config: { damping: 8, stiffness: 300, mass: 0.4 } });
  const opacity = interpolate(frame, [0, 4, 36, 45], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      justifyContent: "center", alignItems: "center",
      opacity,
      background: "linear-gradient(135deg, rgba(76,142,255,0.08), rgba(123,63,232,0.08))",
    }}>
      <div style={{
        textAlign: "center",
        transform: `scale(${interpolate(zoom, [0, 1], [0.6, 1])})`,
      }}>
        <p style={{
          margin: 0,
          fontSize: 200,
          fontWeight: 900,
          fontFamily: "'Inter', sans-serif",
          lineHeight: 0.9,
          background: "linear-gradient(135deg, #4C8EFF, #7B3FE8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-8px",
        }}>
          {stat}
        </p>
        <p style={{
          margin: "16px 0 0",
          fontSize: 36,
          fontWeight: 200,
          fontStyle: "italic",
          fontFamily: "'Playfair Display', Georgia, serif",
          color: "rgba(255,255,255,0.7)",
          letterSpacing: "0.05em",
        }}>
          {label}
        </p>
      </div>
    </AbsoluteFill>
  );
};
