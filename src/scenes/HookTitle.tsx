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

  // Fade-in effect for title entrance
  const titleFadeIn = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 40px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Subtle accent gradient for visual interest */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 20% 50%, ${COLORS.accent}15 0%, transparent 50%)`,
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />
      
      <UiChrome section="OPENING SIGNAL" index="01-10" />
      <div style={{ position: "relative", zIndex: 2, maxWidth: "100%", width: "100%", margin: "0 auto", opacity: titleFadeIn, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxSizing: "border-box" }}>
        {eyebrow ? (
          <div
            style={{
              width: "100%",
              color: COLORS.accentLight,
              fontFamily: "monospace",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 4,
              marginBottom: 32,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <div style={{ width: 40, height: 2, background: COLORS.accent, flexShrink: 0 }} />
            <span style={{ wordBreak: "keep-all" }}>{eyebrow}</span>
          </div>
        ) : null}
        <div style={{ marginBottom: 32 }}>
          <KineticWords
            text={title}
            startFrame={startFrame}
            endFrame={endFrame}
            fontSize={82}
            color={COLORS.text}
            highlight={highlight}
            highlightColor={COLORS.accent}
            wordDelay={5}
            style={{
              letterSpacing: "-0.02em",
              maxWidth: "100%",
              wordBreak: "normal",
              overflowWrap: "break-word",
              justifyContent: "center",
            }}
          />
        </div>
        {subtitle ? (
          <div
            style={{
              color: "rgba(240,236,228,0.88)",
              fontFamily: FONT_FAMILY,
              fontSize: 30,
              lineHeight: 1.6,
              maxWidth: 1100,
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
              paddingLeft: 30,
              borderLeft: `4px solid ${COLORS.accent}`,
              fontWeight: 400,
              wordBreak: "keep-all",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};