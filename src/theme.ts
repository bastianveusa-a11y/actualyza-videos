import React from "react";

export type Theme = {
  accent1: string;
  accent2: string;
  bg: string;
  blob1rgba: string;
  blob2rgba: string;
  chatBubbleBg: string;
  chatBubbleBorder: string;
  gradientAngle: number;
};

export const THEMES: Theme[] = [
  // 0 — Blue/Purple (original)
  {
    accent1: "#4C8EFF", accent2: "#7B3FE8", bg: "#08111F",
    blob1rgba: "rgba(76,142,255,0.10)", blob2rgba: "rgba(123,63,232,0.08)",
    chatBubbleBg: "linear-gradient(135deg,#1e3a5f,#2d1b69)",
    chatBubbleBorder: "rgba(76,142,255,0.3)", gradientAngle: 135,
  },
  // 1 — Green/Teal
  {
    accent1: "#10B981", accent2: "#06B6D4", bg: "#071710",
    blob1rgba: "rgba(16,185,129,0.10)", blob2rgba: "rgba(6,182,212,0.08)",
    chatBubbleBg: "linear-gradient(135deg,#0d3325,#0b2d35)",
    chatBubbleBorder: "rgba(16,185,129,0.3)", gradientAngle: 160,
  },
  // 2 — Red/Orange
  {
    accent1: "#EF4444", accent2: "#F97316", bg: "#140808",
    blob1rgba: "rgba(239,68,68,0.10)", blob2rgba: "rgba(249,115,22,0.08)",
    chatBubbleBg: "linear-gradient(135deg,#3b1111,#2d1500)",
    chatBubbleBorder: "rgba(239,68,68,0.3)", gradientAngle: 120,
  },
  // 3 — Gold/Amber
  {
    accent1: "#F59E0B", accent2: "#D97706", bg: "#141008",
    blob1rgba: "rgba(245,158,11,0.10)", blob2rgba: "rgba(217,119,6,0.08)",
    chatBubbleBg: "linear-gradient(135deg,#2d2400,#1a1500)",
    chatBubbleBorder: "rgba(245,158,11,0.3)", gradientAngle: 150,
  },
  // 4 — Pink/Purple
  {
    accent1: "#EC4899", accent2: "#8B5CF6", bg: "#130810",
    blob1rgba: "rgba(236,72,153,0.10)", blob2rgba: "rgba(139,92,246,0.08)",
    chatBubbleBg: "linear-gradient(135deg,#3b0a25,#1e0d3b)",
    chatBubbleBorder: "rgba(236,72,153,0.3)", gradientAngle: 125,
  },
];

export const ThemeContext = React.createContext<Theme>(THEMES[0]);
export const useTheme = () => React.useContext(ThemeContext);

export function getTheme(index?: number): Theme {
  return THEMES[(index ?? 0) % THEMES.length];
}

/** Seeded timing offset: returns a small integer offset for animation delays */
export function seedOffset(seed: number, slot: number, range: number): number {
  const hash = ((seed * 2654435761 + slot * 40503) >>> 0) % range;
  return Math.floor(hash - range / 2);
}
