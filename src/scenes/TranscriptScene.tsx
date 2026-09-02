import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const lines = [
  "What if your biggest productivity problem is not effort, but attention leakage?",
  "Every notification, unfinished task, and unresolved decision steals a little more focus.",
  "Franklin's system is about recovery, structure, and compounding over time.",
  "The quieter your environment, the louder your thinking becomes.",
];

export const TranscriptScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20, 150], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#10141b",
        color: "#f3efe8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity,
          width: "68%",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e3b65e",
            fontWeight: 700,
          }}
        >
          Transcript
        </div>

        {lines.map((line, index) => (
          <div
            key={line}
            style={{
              fontSize: 32,
              lineHeight: 1.45,
              opacity: 0.82 + index * 0.05,
              transform: `translateX(${index * 3}px)`,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default TranscriptScene;
