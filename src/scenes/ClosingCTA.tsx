import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const ClosingCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 18, 80], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(frame, [0, 30], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0d14 0%, #171615 100%)",
        color: "#f6f0e9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: fade,
          transform: `translateY(${rise}px)`,
          textAlign: "center",
          width: "70%",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#f0b06b",
            marginBottom: 18,
          }}
        >
          The audit starts today
        </div>
        <div
          style={{
            fontSize: 96,
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: "-0.07em",
            marginBottom: 24,
          }}
        >
          Protect it.
          <br />
          Invest it.
        </div>
        <div
          style={{
            margin: "0 auto",
            width: 220,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            background: "linear-gradient(90deg, #f0b06b, #d66942)",
            color: "#17120e",
            fontSize: 28,
            fontWeight: 800,
            boxShadow: "0 18px 40px rgba(214, 105, 66, 0.38)",
          }}
        >
          Start the audit
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default ClosingCTA;
