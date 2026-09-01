import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./constants";

export const UiChrome: React.FC<{
  section: string;
  index: string;
}> = ({ section, index }) => (
  <AbsoluteFill
    style={{
      color: "rgba(240,236,228,0.72)",
      fontFamily: "monospace",
      fontSize: 16,
      letterSpacing: 2,
      pointerEvents: "none",
    }}
  >
    {/* Removed distracting grid background */}
    <div
      style={{
        alignItems: "center",
        borderBottom: `2px solid ${COLORS.accent}44`,
        display: "flex",
        justifyContent: "space-between",
        left: 70,
        padding: "32px 0 20px",
        position: "absolute",
        right: 70,
        top: 0,
      }}
    >
      <span style={{ color: COLORS.accentLight, fontWeight: 700 }}>FRANKLIN / FOCUS LAB</span>
      <span style={{ fontWeight: 600 }}>{section}</span>
    </div>
    <div
      style={{
        alignItems: "center",
        bottom: 34,
        display: "flex",
        justifyContent: "space-between",
        left: 70,
        position: "absolute",
        right: 70,
      }}
    >
      <span style={{ fontWeight: 600 }}>{index}</span>
      <span style={{ color: COLORS.accent, fontWeight: 700 }}>+ LIVE FOCUS</span>
    </div>
  </AbsoluteFill>
);