// helpers/StatCounter.tsx
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EASINGS } from "./constants";

export const StatCounter: React.FC<{
  value: string; // e.g. "22s"
  label: string; // e.g. "AVG. TIME BETWEEN HOOKS"
  color?: string;
  startFrame?: number;
  endFrame?: number;
}> = ({ value, label, color = "#ff5c7c", startFrame = 0, endFrame = 150000 }) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;
  const opacity = interpolate(t, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const parentOpacity = frame >= endFrame ? 0 : opacity;
  const scale = interpolate(t, [0, 12], [0.7, 1], {
    easing: EASINGS.heavyOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        opacity: parentOpacity,
        transform: `scale(${scale})`,
        fontFamily: "sans-serif",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 1.5,
          color: "rgba(255,255,255,0.6)",
          textTransform: "uppercase",
          maxWidth: 90,
          textAlign: "right",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 64, fontWeight: 900, color }}>{value}</span>
    </div>
  );
};
