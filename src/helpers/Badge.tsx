// helpers/Badge.tsx
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { EASINGS } from "./constants";
import { Interactive } from "remotion";
export const Badge: React.FC<{
  text: string;
  icon?: string;
  color?: string; // border/text color, background derived at low opacity
  startFrame?: number;
  endFrame?: number;
}> = ({
  text,
  icon = "⚡",
  color = "#ff2d78",
  startFrame = 0,
  endFrame = 150000,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;
  const opacity = interpolate(t, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const parentOpacity = frame >= endFrame ? 0 : opacity;
  const y = interpolate(t, [0, 10], [10, 0], {
    easing: EASINGS.heavyOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Interactive.Div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 20,
        border: `1px solid ${color}`,
        background: `${color}22`,
        color,
        fontFamily: "sans-serif",
        fontWeight: 700,
        fontSize: 42,
        letterSpacing: 1,
        whiteSpace: "nowrap",
        textTransform: "uppercase",
        opacity: parentOpacity,
        transform: `translateY(${y}px)`,
        width: 850,
        height: 100,
        translate: "535px -490px",
      }}
    >
      <span>{text}</span>
    </Interactive.Div>
  );
};
