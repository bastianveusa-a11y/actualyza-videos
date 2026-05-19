import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface StatItem { label: string; value: number; prefix?: string; suffix?: string; color?: string; }

interface DashboardMockupProps {
  stats: StatItem[];
  leads?: { name: string; score: number; temp: "hot" | "warm" | "cold" }[];
  width?: number;
}

const TEMP_COLORS = { hot: "#ef4444", warm: "#f59e0b", cold: "#6b7280" };
const TEMP_LABELS = { hot: "🔥 Hot", warm: "🌡️ Warm", cold: "❄️ Cold" };

function AnimatedCounter({ target, prefix = "", suffix = "", frame, delay = 0, color = "#4C8EFF", fontSize = 48 }: {
  target: number; prefix?: string; suffix?: string; frame: number; delay?: number; color?: string; fontSize?: number;
}) {
  const progress = interpolate(frame - delay, [0, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eased = Math.pow(progress, 0.4);
  const current = Math.round(eased * target);

  return (
    <span style={{ color, fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize, lineHeight: 1 }}>
      {prefix}{current.toLocaleString()}{suffix}
    </span>
  );
}

export const DashboardMockup: React.FC<DashboardMockupProps> = ({
  stats,
  leads = [],
  width = 900,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });
  const browserH = width * 0.72;

  return (
    <div style={{
      width,
      opacity: enter,
      transform: `scale(${interpolate(enter, [0, 1], [0.92, 1])}) translateY(${interpolate(enter, [0, 1], [30, 0])}px)`,
    }}>
      {/* Browser chrome */}
      <div style={{
        background: "#1a1a2e",
        borderRadius: "16px 16px 0 0",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10,
        border: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "none",
      }}>
        <div style={{ display: "flex", gap: 7 }}>
          {["#ef4444","#f59e0b","#22c55e"].map((c, i) => (
            <div key={i} style={{ width: 13, height: 13, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 8,
          padding: "6px 14px",
          fontSize: 15,
          color: "rgba(255,255,255,0.35)",
          fontFamily: "'Inter', sans-serif",
        }}>
          actualyza.com/dashboard
        </div>
      </div>

      {/* Dashboard content */}
      <div style={{
        background: "#0a0f1a",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "0 0 16px 16px",
        padding: 28,
        height: browserH,
        overflow: "hidden",
      }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <p style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Inter', sans-serif" }}>Live Dashboard</p>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>Today · Real-time</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            <span style={{ fontSize: 13, color: "#10b981", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>AMY Active</span>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`, gap: 14, marginBottom: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "18px 20px",
              opacity: interpolate(frame, [i * 8, i * 8 + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <p style={{ margin: "0 0 6px 0", fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</p>
              <AnimatedCounter target={s.value} prefix={s.prefix} suffix={s.suffix} frame={frame} delay={i * 8} color={s.color || "#4C8EFF"} fontSize={36} />
            </div>
          ))}
        </div>

        {/* Hot leads */}
        {leads.length > 0 && (
          <div>
            <p style={{ margin: "0 0 12px 0", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Hot Leads
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {leads.slice(0, 3).map((l, i) => {
                const s = spring({ frame: Math.max(0, frame - 30 - i * 12), fps, config: { damping: 18, stiffness: 120 } });
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10, padding: "12px 16px",
                    opacity: s,
                    transform: `translateX(${interpolate(s, [0, 1], [-20, 0])}px)`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: "50%",
                        background: `rgba(${l.temp === "hot" ? "239,68,68" : l.temp === "warm" ? "245,158,11" : "107,114,128"},0.15)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16,
                      }}>
                        {l.temp === "hot" ? "🔥" : l.temp === "warm" ? "🌡️" : "❄️"}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "'Inter', sans-serif" }}>{l.name}</p>
                        <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>{TEMP_LABELS[l.temp]}</p>
                      </div>
                    </div>
                    <div style={{
                      background: `rgba(${l.temp === "hot" ? "239,68,68" : l.temp === "warm" ? "245,158,11" : "107,114,128"},0.15)`,
                      borderRadius: 8, padding: "4px 12px",
                    }}>
                      <span style={{ fontSize: 16, fontWeight: 900, color: TEMP_COLORS[l.temp], fontFamily: "'Inter', sans-serif" }}>{l.score}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
