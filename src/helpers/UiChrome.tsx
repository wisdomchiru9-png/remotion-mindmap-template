import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./constants";

export const UiChrome: React.FC<{
  section: string;
  index: string;
}> = ({ section, index }) => (
  <AbsoluteFill
    style={{
      color: "rgba(240,236,228,0.58)",
      fontFamily: "monospace",
      fontSize: 18,
      letterSpacing: 2,
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        backgroundImage: `linear-gradient(${COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        inset: 0,
        opacity: 0.5,
        position: "absolute",
      }}
    />
    <div
      style={{
        alignItems: "center",
        borderBottom: `1px solid ${COLORS.glassBorder}`,
        display: "flex",
        justifyContent: "space-between",
        left: 70,
        padding: "28px 0 18px",
        position: "absolute",
        right: 70,
        top: 0,
      }}
    >
      <span style={{ color: COLORS.accentLight }}>FRANKLIN / FOCUS LAB</span>
      <span>{section}</span>
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
      <span>{index}</span>
      <span style={{ color: COLORS.accent }}>+ LIVE FOCUS</span>
    </div>
  </AbsoluteFill>
);