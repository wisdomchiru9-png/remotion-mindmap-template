import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { KineticWords } from "../helpers/KineticWords";
import { COLORS, EASINGS, FONT_FAMILY } from "../helpers/constants";
import { UiChrome } from "../helpers/UiChrome";

export interface HookTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  highlight?: string[];
  startFrame?: number;
  endFrame?: number;
}

export const HookTitle: React.FC<HookTitleProps> = ({
  eyebrow,
  title,
  subtitle,
  highlight = [],
  startFrame = 0,
  endFrame = 150000,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;
  const subtitleOpacity = interpolate(localFrame, [18, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(localFrame, [18, 32], [18, 0], {
    easing: EASINGS.crispEntrance,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const visible = frame < endFrame;

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        justifyContent: "center",
        padding: "0 150px",
        opacity: visible ? 1 : 0,
      }}
    >
      <UiChrome section="OPENING SIGNAL" index="01-10" />
      {eyebrow ? (
        <div
          style={{
            color: COLORS.accentLight,
            fontFamily: "monospace",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 4,
            marginBottom: 22,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </div>
      ) : null}
      <KineticWords
        text={title}
        startFrame={startFrame}
        endFrame={endFrame}
        fontSize={92}
        color={COLORS.text}
        highlight={highlight}
        highlightColor={COLORS.accent}
        wordDelay={5}
        style={{
          alignSelf: "flex-start",
          letterSpacing: 0,
          maxWidth: 1320,
          scale: 1,
          translate: "0 0",
        }}
      />
      {subtitle ? (
        <div
          style={{
            color: "rgba(240,236,228,0.68)",
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            lineHeight: 1.3,
            marginTop: 34,
            maxWidth: 1050,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};