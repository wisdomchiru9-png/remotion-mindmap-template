import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ClosingWalls } from "../helpers/Wall";
import { COLORS, EASINGS, FONT_FAMILY } from "../helpers/constants";
import { UiChrome } from "../helpers/UiChrome";

export interface ClosingCTAProps {
  title: string;
  subtitle?: string;
  startFrame?: number;
  wallTarget?: number;
  wallDuration?: number;
  wallStagger?: number;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({
  title,
  subtitle,
  startFrame = 0,
  wallTarget = 0.85,
  wallDuration = 4,
  wallStagger = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;
  const opacity = interpolate(localFrame, [wallDuration * fps * 0.55, wallDuration * fps], [0, 1], {
    easing: EASINGS.crispEntrance,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, alignItems: "center", justifyContent: "center" }}>
      <UiChrome section="FINAL COMMIT" index="10-10" />
      <ClosingWalls
        frame={localFrame}
        fps={fps}
        target={wallTarget}
        duration={wallDuration}
        stagger={wallStagger}
      />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          opacity,
          padding: 80,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: COLORS.text,
            fontFamily: FONT_FAMILY,
            fontSize: 82,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 1300,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              color: COLORS.accentLight,
              fontFamily: "monospace",
              fontSize: 28,
              letterSpacing: 2,
              marginTop: 30,
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};