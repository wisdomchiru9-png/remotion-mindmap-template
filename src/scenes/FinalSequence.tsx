import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from "remotion";

export const FinalSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 18, 120], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at center, #2f1d10 0%, #150d0d 48%, #090b10 100%)",
        color: "#f7f0e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          opacity: 0.3,
        }}
      />

      <div
        style={{
          position: "relative",
          width: "78%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 42,
          opacity: fade,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 420,
            height: 520,
            borderRadius: 24,
            overflow: "hidden",
            border: "2px solid rgba(255,255,255,0.18)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
          }}
        >
          <Img
            src={staticFile("ben.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#ebbf75",
              fontWeight: 700,
            }}
          >
            Closing thought
          </div>
          <div
            style={{
              fontSize: 82,
              lineHeight: 0.92,
              letterSpacing: "-0.06em",
              fontWeight: 900,
            }}
          >
            Preserve your
            <br />
            attention.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(247,240,232,0.8)",
            }}
          >
            Notice the leaks, close the gaps, and build a system that protects your future.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default FinalSequence;
