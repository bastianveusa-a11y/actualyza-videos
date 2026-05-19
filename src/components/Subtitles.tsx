import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { SubtitleChunk } from "../types";

export const Subtitles: React.FC<{ chunks: SubtitleChunk[] }> = ({ chunks }) => {
  const frame = useCurrentFrame();
  const active = chunks.find((c) => frame >= c.start && frame < c.end);
  if (!active) return null;

  const progress = (frame - active.start) / (active.end - active.start);
  const fadeIn = interpolate(frame, [active.start, active.start + 6], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [active.end - 6, active.end], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <div style={{
      position: "absolute",
      bottom: 220,
      left: 0, right: 0,
      display: "flex",
      justifyContent: "center",
      padding: "0 60px",
      opacity: fadeIn * fadeOut,
      zIndex: 100,
    }}>
      <div style={{
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(8px)",
        borderRadius: 12,
        padding: "14px 28px",
        maxWidth: "88%",
        textAlign: "center",
      }}>
        <p style={{
          margin: 0,
          fontSize: 32,
          fontWeight: 600,
          color: "#fff",
          lineHeight: 1.4,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "-0.3px",
        }}>
          {active.text}
        </p>
      </div>
    </div>
  );
};
