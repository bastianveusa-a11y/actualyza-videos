import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { VideoConfig } from "../types";
import { useTheme } from "../theme";

export const Scene5Cta: React.FC<{ cta: VideoConfig["cta"] }> = ({ cta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();
  const logoSpring = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const ctaSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 85 } });
  const subSpring = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 14, stiffness: 75 } });
  const pulse = 1 + interpolate(Math.sin(frame * 0.08), [-1, 1], [-0.015, 0.015]);
  const grad = `linear-gradient(${theme.gradientAngle}deg, ${theme.accent1}, ${theme.accent2})`;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 80px" }}>
      <div style={{ marginBottom: 56, opacity: logoSpring, transform: `scale(${interpolate(logoSpring, [0, 1], [0.85, 1])})` }}>
        <Img src={staticFile("brand/logo-vertical-white.svg")} width={220} />
      </div>

      <div style={{ textAlign: "center", opacity: ctaSpring, transform: `translateY(${interpolate(ctaSpring, [0, 1], [36, 0])}px)` }}>
        <div style={{ display: "inline-block", padding: "30px 56px", borderRadius: 64, background: grad, marginBottom: 28, transform: `scale(${pulse})`, boxShadow: `0 0 60px ${theme.accent1}40` }}>
          <p style={{ margin: 0, fontSize: 34, fontWeight: 800, fontFamily: "'Inter', sans-serif", color: "#fff", letterSpacing: "-0.5px" }}>
            {cta.button}
          </p>
        </div>
        <p style={{ margin: 0, fontSize: 28, fontWeight: 400, fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif", color: "rgba(255,255,255,0.45)", opacity: subSpring, letterSpacing: "0.04em" }}>
          {cta.url}
        </p>
      </div>
    </AbsoluteFill>
  );
};
