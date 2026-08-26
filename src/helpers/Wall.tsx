import React from "react";
import { interpolate } from "remotion";
import { COLORS, EASINGS } from "../helpers/constants";

type Side = "top" | "bottom" | "left" | "right";

export const Wall: React.FC<{
  side: Side;
  progress: number; // 0 = open, 1 = fully closed
  thickness?: number;
  maxGap?: number;
  color?: string;
  borderColor?: string;
}> = ({
  side,
  progress,
  thickness = 120,
  maxGap = 280,
  color = COLORS.wall,
  borderColor = COLORS.wallBorder,
}) => {
  const gap = maxGap * (1 - progress);
  const vertical = side === "top" || side === "bottom";

  const base: React.CSSProperties = {
    position: "absolute",
    background: `linear-gradient(${vertical ? "180deg" : "90deg"}, ${color}, ${borderColor})`,
    borderRadius: vertical ? "0 0 8px 8px" : "8px 0 0 8px",
    boxShadow: `0 0 40px ${borderColor}33`,
  };

  const bySide: Record<Side, React.CSSProperties> = {
    top: {
      top: -thickness,
      left: 0,
      width: "100%",
      height: thickness + gap,
      translate: `0 ${gap}px`,
    },
    bottom: {
      bottom: -thickness,
      left: 0,
      width: "100%",
      height: thickness + gap,
      translate: `0 -${gap}px`,
    },
    left: {
      left: -thickness,
      top: 0,
      width: thickness + gap,
      height: "100%",
      translate: `${gap}px 0`,
    },
    right: {
      right: -thickness,
      top: 0,
      width: thickness + gap,
      height: "100%",
      translate: `-${gap}px 0`,
    },
  };

  return <div style={{ ...base, ...bySide[side] }} />;
};

// Bundles the 4-wall stagger so scenes don't repeat the .map/interpolate logic
export const ClosingWalls: React.FC<{
  frame: number;
  fps: number;
  target?: number;
  duration?: number;
  stagger?: number;
}> = ({ frame, fps, target = 0.85, duration = 4, stagger = 12 }) => {
  const overall = interpolate(frame, [0, duration * fps], [0, target], {
    easing: EASINGS.heavyOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <>
      {(["top", "bottom", "left", "right"] as const).map((side, i) => (
        <Wall
          key={side}
          side={side}
          progress={interpolate(
            frame,
            [i * stagger, i * stagger + duration * fps],
            [0, overall],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASINGS.heavyOut,
            },
          )}
        />
      ))}
    </>
  );
};
