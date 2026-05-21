import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VideoConfig } from "../types";
import { DashboardMockup } from "../components/DashboardMockup";
import { useTheme } from "../theme";

export const Scene4Result: React.FC<{ result: VideoConfig["result"] }> = ({ result }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();
  const enterOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [170, 210], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 80 } });
  const grad = `linear-gradient(${theme.gradientAngle}deg, ${theme.accent1}, ${theme.accent2})`;

  const dashStats = [
    { label: "Calls Answered", value: 47, suffix: "", color: theme.accent1 },
    { label: "Appts Booked", value: 23, suffix: "", color: "#10b981" },
    { label: "Revenue", value: 18400, prefix: "$", color: "#f59e0b" },
  ];

  const dashLeads = [
    { name: "Dr. Martinez Clinic", score: 94, temp: "hot" as const },
    { name: "Smile Care Miami",    score: 78, temp: "warm" as const },
    { name: "Orlando Dental Co.",  score: 61, temp: "warm" as const },
  ];

  return (
    <AbsoluteFill style={{ opacity: enterOpacity * exitOpacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 56px", gap: 28 }}>
      <div style={{ textAlign: "center", opacity: labelSpring, transform: `translateY(${interpolate(labelSpring, [0, 1], [-20, 0])}px)` }}>
        <p style={{ margin: 0, fontSize: 100, fontWeight: 900, fontFamily: "'Inter', sans-serif", lineHeight: 0.9, letterSpacing: "-3px", background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {result.mainStat}
        </p>
        <p style={{ margin: "12px 0 0", fontSize: 28, fontWeight: 400, fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", letterSpacing: "0.02em" }}>
          {result.mainLabel}
        </p>
      </div>
      <DashboardMockup stats={dashStats} leads={dashLeads} width={960} />
    </AbsoluteFill>
  );
};
