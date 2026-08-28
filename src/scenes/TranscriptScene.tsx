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

  return (
    <AbsoluteFill
      style={{
        alignItems: align === "center" ? "center" : "flex-start",
        background: warm ? COLORS.bgWarm : COLORS.bg,
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 150px",
        textAlign: align,
      }}
    >
      <UiChrome section={section} index={index} />
      <div style={{ maxWidth: 1250 }}>
        <div
          style={{
            color: COLORS.accentLight,
            fontFamily: "monospace",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            marginBottom: 28,
          }}
        >
          {section}
        </div>
        <Typewriter
          text={title}
          startFrame={4}
          speed={2.2}
          fontSize={70}
          color={COLORS.text}
          highlight={["attention", "capability", "Franklin", "Temperance", "reconstruct", "questions"]}
          highlightColor={COLORS.accent}
          align={align}
          pauseAfter={["attention", "skills", "chain"]}
        />
        <div
          style={{
            color: "rgba(240,236,228,0.68)",
            fontFamily: FONT_FAMILY,
            fontSize: 30,
            lineHeight: 1.35,
            marginTop: 34,
            maxWidth: 1020,
            opacity: bodyOpacity,
            transform: `translateY(${bodyY}px)`,
          }}
        >
          {body}
        </div>
      </div>
    </AbsoluteFill>
  );
};
