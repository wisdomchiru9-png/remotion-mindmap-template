import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const fade = interpolate(frame, [0, 18, 90], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rise = interpolate(frame, [0, 36, 120], [28, 0, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at center, #20142d 0%, #120b1a 42%, #05060b 100%)",
        color: "#f6efe9",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 0.35,
        }}
      />
      <Img
        src={staticFile("ben-franklin.jpg")}
        style={{
          position: "absolute",
          right: "10%",
          bottom: 0,
          width: "42%",
          height: "75%",
          objectFit: "cover",
          opacity: 0.32,
          filter: "blur(1px) saturate(0.7)",
          transform: `translateY(${rise}px) scale(${1.08 - frame / 1000})`,
          translate: "-183.2px -192.2px",
        }}
        from={-24}
      />
      <div
        style={{
          position: "absolute",
          left: "9%",
          top: "14%",
          opacity: fade,
          transform: `translateY(${rise}px)`,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e7b978",
            fontWeight: 700,
          }}
        >
          Franklin Audit
        </div>

        <div
          style={{
            fontSize: 94,
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            maxWidth: 620,
          }}
        >
          Attention
          <br />
          is capital.
        </div>

        <div
          style={{
            width: 120,
            height: 4,
            background: "linear-gradient(90deg, #f1bc7b, #d16c35)",
            borderRadius: 999,
          }}
        />

        <div
          style={{
            marginTop: 6,
            maxWidth: 560,
            fontSize: 30,
            lineHeight: 1.3,
            color: "rgba(246,239,233,0.78)",
          }}
        >
          Tighten your system before your attention leaks away.
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default Intro;
