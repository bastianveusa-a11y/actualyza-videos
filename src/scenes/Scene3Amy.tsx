import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { VideoConfig } from "../types";
import { IPhoneMockup } from "../components/IPhoneMockup";
import { useTheme } from "../theme";

export const Scene3Amy: React.FC<{ chat: VideoConfig["chat"] }> = ({ chat }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const theme = useTheme();
  const enter = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const exitOpacity = interpolate(frame, [185, 210], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const grad = `linear-gradient(${theme.gradientAngle}deg, ${theme.accent1}, ${theme.accent2})`;

  return (
    <AbsoluteFill style={{ opacity: enter * exitOpacity, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 60px" }}>

      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12, opacity: enter, transform: `translateY(${interpolate(enter, [0, 1], [-16, 0])}px)` }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
        <p style={{ margin: 0, fontSize: 22, fontWeight: 300, fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          {chat.label}
        </p>
      </div>

      <IPhoneMockup width={360} style={{ transform: `translateY(${interpolate(enter, [0, 1], [40, 0])}px)` }}>
        {/* Header */}
        <div style={{ background: "rgba(28,28,30,0.95)", borderBottom: "0.5px solid rgba(255,255,255,0.08)", padding: "10px 16px 14px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: grad, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 14px ${theme.accent1}80`, flexShrink: 0 }}>
            <span style={{ fontSize: 18, fontWeight: 700, fontStyle: "italic", fontFamily: "'Playfair Display', serif", color: "#fff" }}>A</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: "#fff", fontFamily: "'Inter', sans-serif" }}>AMY</p>
            <p style={{ margin: 0, fontSize: 12, color: "#10b981", fontFamily: "'Inter', sans-serif" }}>● Online now</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 10, background: "#000", overflowY: "hidden" }}>
          {chat.messages.map((msg, i) => {
            const s = spring({ frame: Math.max(0, frame - msg.delay), fps, config: { damping: 20, stiffness: 140 } });
            const isAmy = msg.from === "amy";
            return (
              <div key={i} style={{ display: "flex", justifyContent: isAmy ? "flex-start" : "flex-end", opacity: s, transform: `translateY(${interpolate(s, [0, 1], [12, 0])}px)` }}>
                {isAmy && (
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: grad, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>
                    <span style={{ fontSize: 11, fontStyle: "italic", fontFamily: "'Playfair Display', serif", color: "#fff", fontWeight: 700 }}>A</span>
                  </div>
                )}
                <div style={{ maxWidth: "72%", padding: "10px 14px", borderRadius: isAmy ? "4px 18px 18px 18px" : "18px 4px 18px 18px", background: isAmy ? theme.chatBubbleBg : "#2c2c2e", border: isAmy ? `1px solid ${theme.chatBubbleBorder}` : "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: isAmy ? "#e8f0ff" : "rgba(255,255,255,0.8)", fontFamily: isAmy ? "'Playfair Display', serif" : "'Inter', sans-serif", fontStyle: isAmy ? "italic" : "normal", fontWeight: isAmy ? 400 : 300 }}>
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          })}

          {frame > 150 && frame < 185 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: grad, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 11, fontStyle: "italic", fontFamily: "'Playfair Display', serif", color: "#fff" }}>A</span>
              </div>
              <div style={{ background: theme.chatBubbleBg, border: `1px solid ${theme.chatBubbleBorder}`, borderRadius: "4px 18px 18px 18px", padding: "10px 16px", display: "flex", gap: 4, alignItems: "center" }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: theme.accent1, opacity: interpolate((frame + i * 8) % 24, [0, 8, 16, 24], [0.3, 1, 0.3, 0.3], { extrapolateRight: "clamp" }) }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div style={{ background: "rgba(28,28,30,0.98)", borderTop: "0.5px solid rgba(255,255,255,0.08)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, background: "#2c2c2e", borderRadius: 20, padding: "8px 14px", fontSize: 14, color: "rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif" }}>iMessage</div>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>↑</div>
        </div>
      </IPhoneMockup>

      <p style={{ marginTop: 20, fontSize: 18, fontWeight: 200, fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", opacity: interpolate(frame, [120, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        {chat.footer}
      </p>
    </AbsoluteFill>
  );
};
