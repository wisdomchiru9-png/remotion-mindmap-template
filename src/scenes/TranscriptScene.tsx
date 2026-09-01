import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Typewriter } from "../helpers/Typewriter";
import { COLORS, EASINGS, FONT_FAMILY } from "../helpers/constants";
import { UiChrome } from "../helpers/UiChrome";

export type TranscriptSceneProps = {
  readonly section: string;
  readonly title: string;
  readonly body: string;
  readonly index: string;
  readonly warm?: boolean;
  readonly align?: "left" | "center";
};

export const TranscriptScene: React.FC<TranscriptSceneProps> = ({
  section,
  title,
  body,
  index,
  warm = false,
  align = "left",
}) => {
  const frame = useCurrentFrame();
  const bodyOpacity = interpolate(frame, [24, 42], [0, 1], {
    easing: EASINGS.crispEntrance,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyY = interpolate(frame, [24, 42], [20, 0], {
    easing: EASINGS.crispEntrance,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade-in effect for readable text entry
  const contentOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: warm ? COLORS.bgWarm : COLORS.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "100px 80px",
      }}
    >
      {/* Removed distracting grid pattern for cleaner look */}
      
      {/* Left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: `linear-gradient(180deg, ${COLORS.accent} 0%, ${COLORS.accent}33 100%)`,
        }}
      />
      
      <UiChrome section={section} index={index} />
      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2, opacity: contentOpacity, boxSizing: "border-box" }}>
        <div
          style={{
            width: "100%",
            color: COLORS.accentLight,
            fontFamily: "monospace",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 3,
            marginBottom: 40,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: "flex-start",
          }}
        >
          <div style={{ width: 40, height: 2, background: COLORS.accent, flexShrink: 0 }} />
          <span style={{ wordBreak: "keep-all" }}>{section}</span>
        </div>
        <div
          style={{
            width: "100%",
            background: `rgba(255, 107, 43, 0.08)`,
            border: `3px solid ${COLORS.accent}`,
            borderRadius: 16,
            padding: "40px 50px",
            marginBottom: 40,
            boxSizing: "border-box",
          }}
        >
          <Typewriter
            text={title}
            startFrame={4}
            speed={2.2}
            fontSize={56}
            color={COLORS.text}
            highlight={["attention", "capability", "Franklin", "Temperance", "reconstruct", "questions"]}
            highlightColor={COLORS.accent}
            align={align}
            pauseAfter={["attention", "skills", "chain"]}
          />
        </div>
        <div
          style={{
            width: "100%",
            color: "rgba(240,236,228,0.85)",
            fontFamily: FONT_FAMILY,
            fontSize: 26,
            lineHeight: 1.9,
            maxWidth: 1100,
            opacity: bodyOpacity,
            transform: `translateY(${bodyY}px)`,
            wordBreak: "keep-all",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            paddingLeft: 30,
            borderLeft: `4px solid ${COLORS.accent}`,
            boxSizing: "border-box",
          }}
        >
          {body}
        </div>
      </div>
    </AbsoluteFill>
  );
};
