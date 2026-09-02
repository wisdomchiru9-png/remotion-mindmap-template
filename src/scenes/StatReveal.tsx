import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

type StatRevealProps = {
  label?: string;
  value?: string;
  suffix?: string;
  accent?: string;
};

export const StatReveal: React.FC<StatRevealProps> = ({
  label = "Avg. time between hooks",
  value = "22s",
  suffix = "",
  accent = "#ec9a52",
}) => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 16, 84], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 18, 72], [0.72, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#090b10",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: fade,
          transform: `scale(${scale})`,
          textAlign: "center",
          color: "#f5efe8",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "rgba(245,239,232,0.7)",
            marginBottom: 16,
          }}
        >
          {label}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: 10,
            fontWeight: 900,
          }}
        >
          <span style={{ color: accent, fontSize: 140, lineHeight: 1 }}> {value}</span>
          {suffix ? (
            <span style={{ fontSize: 56, color: "rgba(245,239,232,0.8)" }}>{suffix}</span>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default StatReveal;
