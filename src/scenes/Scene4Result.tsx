import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VideoConfig } from "../types";
import { DashboardMockup } from "../components/DashboardMockup";

export const Scene4Result: React.FC<{ result: VideoConfig["result"] }> = ({ result }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enterOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [170, 210], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 80 } });

  const target = parseFloat(result.mainStat) || 3;

  const dashStats = [
    { label: "Calls Answered", value: 47, suffix: "", color: "#4C8EFF" },
    { label: "Appts Booked", value: 23, suffix: "", color: "#10b981" },
    { label: "Revenue", value: 18400, prefix: "$", color: "#f59e0b" },
  ];

  const dashLeads = [
    { name: "Dr. Martinez Clinic", score: 94, temp: "hot" as const },
    { name: "Smile Care Miami",    score: 78, temp: "warm" as const },
    { name: "Orlando Dental Co.",  score: 61, temp: "warm" as const },
  ];

  return (
    <AbsoluteFill style={{
      opacity: enterOpacity * exitOpacity,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 56px",
      gap: 28,
    }}>

      {/* Main stat headline */}
      <div style={{
        textAlign: "center",
        opacity: labelSpring,
        transform: `translateY(${interpolate(labelSpring, [0, 1], [-20, 0])}px)`,
      }}>
        <p style={{
          margin: 0,
          fontSize: 100,
          fontWeight: 900,
          fontFamily: "'Inter', sans-serif",
          lineHeight: 0.9,
          letterSpacing: "-3px",
          background: "linear-gradient(135deg, #4C8EFF, #7B3FE8)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          {result.mainStat}
        </p>
        <p style={{
          margin: "12px 0 0",
          fontSize: 28,
          fontWeight: 400,
          fontStyle: "italic",
          fontFamily: "'Playfair Display', Georgia, serif",
          color: "#fff",
          letterSpacing: "0.02em",
        }}>
          {result.mainLabel}
        </p>
      </div>

      {/* Dashboard mockup */}
      <DashboardMockup stats={dashStats} leads={dashLeads} width={960} />
    </AbsoluteFill>
  );
};
