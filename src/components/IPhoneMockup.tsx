import React from "react";

interface IPhoneMockupProps {
  children: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}

export const IPhoneMockup: React.FC<IPhoneMockupProps> = ({ children, width = 380, style }) => {
  const height = width * 2.16;
  const radius = width * 0.13;

  return (
    <div style={{
      width,
      height,
      borderRadius: radius,
      background: "linear-gradient(160deg, #2a2a2e 0%, #1c1c1e 100%)",
      border: "1.5px solid rgba(255,255,255,0.12)",
      boxShadow: `
        0 0 0 1px rgba(0,0,0,0.8),
        0 40px 80px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(255,255,255,0.08)
      `,
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
      ...style,
    }}>
      {/* Screen */}
      <div style={{
        position: "absolute",
        top: width * 0.04,
        left: width * 0.03,
        right: width * 0.03,
        bottom: width * 0.04,
        borderRadius: radius * 0.85,
        background: "#000",
        overflow: "hidden",
      }}>
        {/* Dynamic island */}
        <div style={{
          position: "absolute",
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          width: width * 0.28,
          height: width * 0.084,
          borderRadius: 999,
          background: "#000",
          border: "1px solid rgba(255,255,255,0.06)",
          zIndex: 10,
        }} />

        {/* Status bar */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0, right: 0,
          height: width * 0.18,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: `0 ${width * 0.09}px ${width * 0.025}px`,
          zIndex: 9,
        }}>
          <span style={{ fontSize: width * 0.072, fontWeight: 600, color: "#fff", fontFamily: "'Inter', sans-serif" }}>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: width * 0.022 }}>
            {/* Signal */}
            <svg width={width * 0.075} height={width * 0.05} viewBox="0 0 17 12">
              {[0,1,2,3].map(i => (
                <rect key={i} x={i*4.5} y={12-(i+1)*3} width={3} height={(i+1)*3} rx={1} fill="white" />
              ))}
            </svg>
            {/* WiFi */}
            <svg width={width * 0.065} height={width * 0.05} viewBox="0 0 16 12">
              <path d="M8 10l1.5-1.5a2.5 2.5 0 00-3 0L8 10z" fill="white"/>
              <path d="M8 7.5l3-3a6 6 0 00-6 0l3 3z" fill="white" opacity="0.7"/>
              <path d="M8 5l4.5-4.5a9.5 9.5 0 00-9 0L8 5z" fill="white" opacity="0.4"/>
            </svg>
            {/* Battery */}
            <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
              <div style={{ width: width * 0.085, height: width * 0.042, borderRadius: 3, border: "1px solid rgba(255,255,255,0.5)", padding: 1 }}>
                <div style={{ width: "78%", height: "100%", background: "#fff", borderRadius: 2 }} />
              </div>
              <div style={{ width: 2, height: width * 0.022, background: "rgba(255,255,255,0.5)", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "absolute", inset: 0, paddingTop: width * 0.18 }}>
          {children}
        </div>

        {/* Home indicator */}
        <div style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: width * 0.32,
          height: 5,
          borderRadius: 999,
          background: "rgba(255,255,255,0.3)",
        }} />
      </div>

      {/* Side buttons */}
      <div style={{ position: "absolute", right: -2, top: "28%", width: 3, height: width * 0.18, background: "#3a3a3c", borderRadius: "0 2px 2px 0" }} />
      <div style={{ position: "absolute", left: -2, top: "20%", width: 3, height: width * 0.1, background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -2, top: "33%", width: 3, height: width * 0.15, background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -2, top: "51%", width: 3, height: width * 0.15, background: "#3a3a3c", borderRadius: "2px 0 0 2px" }} />
    </div>
  );
};
