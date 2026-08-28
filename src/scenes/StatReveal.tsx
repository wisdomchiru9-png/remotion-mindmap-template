import React from "react";
import { AbsoluteFill } from "remotion";
import { StatCounter } from "../helpers/StatCounter";
import { COLORS, FONT_FAMILY } from "../helpers/constants";
import { UiChrome } from "../helpers/UiChrome";

export interface StatRevealProps {
  value: string;
  label: string;
  context?: string;
  color?: string;
  startFrame?: number;
  endFrame?: number;
}

export const StatReveal: React.FC<StatRevealProps> = ({
  value,
  label,
  context,
  color = COLORS.accent,
  startFrame = 0,
  endFrame = 150000,
}) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: COLORS.bgWarm,
        justifyContent: "center",
      }}
    >
      <UiChrome section="MEASURE THE MIND" index="02-10" />
      <StatCounter
        value={value}
        label={label}
        color={color}
        startFrame={startFrame}
        endFrame={endFrame}
      />
      {context ? (
        <div
          style={{
            color: "rgba(240,236,228,0.66)",
            fontFamily: FONT_FAMILY,
            fontSize: 30,
            marginTop: 28,
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          {context}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};