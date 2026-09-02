import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const HookTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 20, 80], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shift = interpolate(frame, [0, 36], [32, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #f3efe9 0%, #e7dac5 100%)",
        color: "#13110f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: fade,
          transform: `translateY(${shift}px)`,
          textAlign: "center",
          width: "70%",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 7,
            textTransform: "uppercase",
            color: "#7d4d2f",
            fontWeight: 800,
            marginBottom: 18,
          }}
        >
          Audit 01 / 11
        </div>
        <div
          style={{
            fontSize: 96,
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: "-0.06em",
          }}
        >
          Your attention
          <br />
          is being taxed.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default HookTitle;
