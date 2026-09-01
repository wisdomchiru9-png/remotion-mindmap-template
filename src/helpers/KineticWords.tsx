import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, EASINGS, FONT_FAMILY } from "./constants";
export const KineticWords: React.FC<{
  text: string;
  startFrame?: number;
  endFrame?: number;
  wordDelay?: number;
  fontSize?: number;
  color?: string;
  highlight?: string[];
  highlightColor?: string;
  style?: React.CSSProperties;
}> = ({
  text,
  startFrame = 0,
  endFrame = 150000,
  wordDelay = 6,
  fontSize = 30,
  color = "#8f8f8f",
  highlight = [],
  highlightColor = COLORS.accent,
  style,
}) => {
  const frame = useCurrentFrame();
  const parentOpacity = frame >= endFrame ? 0 : 1;
  const words = text.split(" ");
  const localFrame = frame - startFrame;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0 14px",
        color: "#8f8f8f",
        fontFamily: FONT_FAMILY,
        fontSize,
        fontWeight: 800,
        letterSpacing: "0.3rem",
        opacity: parentOpacity,
        lineHeight: 1.2,
        maxWidth: "100%",
        width: "100%",
        ...style,
      }}
    >
      {words.map((word, i) => {
        const t = localFrame - i * wordDelay;

        const opacity =
          frame === 0
            ? 1
            : interpolate(t, [0, 8], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
        const scale =
          frame === 0
            ? 1
            : interpolate(t, [0, 8], [1.6, 1], {
                easing: EASINGS.heavyOut,
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
        const y =
          frame === 0
            ? 0
            : interpolate(t, [0, 8], [20, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
        const isHighlighted = highlight.includes(word.replace(/[.,!?]/g, ""));

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              transform: `translateY(${y}px) scale(${scale})`,
              color: isHighlighted ? highlightColor : color,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
