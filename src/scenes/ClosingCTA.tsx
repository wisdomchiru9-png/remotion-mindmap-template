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

  // Fade-in effect for title
  const titleFadeIn = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: COLORS.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", boxSizing: "border-box" }}>
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: Math.min(opacity, titleFadeIn),
          padding: "40px",
          textAlign: "center",
          boxSizing: "border-box",
          maxWidth: 1300,
          margin: "0 auto",
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
            wordBreak: "keep-all",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            width: "100%",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              color: COLORS.accentLight,
              fontFamily: "monospace",
              fontSize: 32,
              letterSpacing: 3,
              marginTop: 40,
              maxWidth: 900,
              fontWeight: 700,
              wordBreak: "keep-all",
              overflowWrap: "break-word",
              width: "100%",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};