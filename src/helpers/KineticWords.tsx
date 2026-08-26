import React from "react";
import { interpolate } from "remotion";
import { COLORS, EASINGS } from "./constants";
import { useCurrentFrame } from "remotion";
import { Interactive } from "remotion";
//pops each word in with scale/bounce instead of typing char-by-char. Good for hooks where you want impact in under a second rather than a slow reveal.
export const KineticWords: React.FC<{
  text: string;
  startFrame?: number;
  endFrame?: number;
  wordDelay?: number;
  fontSize?: number;
  color?: string;
  highlight?: string[];
  highlightColor?: string;
}> = ({
  text,
  startFrame = 0,
  endFrame = 150000,
  wordDelay = 6,
  fontSize = 30,
  color = "#8f8f8f",
  highlight = [],
  highlightColor = COLORS.accent,
}) => {
  const frame = useCurrentFrame();
  const parentOpacity = frame >= endFrame ? 0 : 1;
  const words = text.split(" ");
  const localFrame = frame - startFrame;

  return (
    <Interactive.Div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0 14px",
        color: "#8f8f8f",
        fontFamily: "'Courier New', monospace",
        fontSize,
        fontWeight: 800,
        translate: "991.3px -166.1px",
        scale: 1.375,
        letterSpacing: "0.3rem",
        opacity: parentOpacity,
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
    </Interactive.Div>
  );
};
