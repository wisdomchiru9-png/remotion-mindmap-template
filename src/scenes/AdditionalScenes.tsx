import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { GlowCard } from "../helpers/GlowCard";
import { NewImg } from "../helpers/NewImg";
import { Typewriter } from "../helpers/Typewriter";
import { COLORS, EASINGS, FONT_FAMILY } from "../helpers/constants";
import { UiChrome } from "../helpers/UiChrome";

const SceneFrame: React.FC<{ children: React.ReactNode; warm?: boolean }> = ({
  children,
  warm = false,
}) => (
  <AbsoluteFill
    style={{
      alignItems: "center",
      background: warm ? COLORS.bgWarm : COLORS.bg,
      justifyContent: "center",
      overflow: "hidden",
      padding: 120,
    }}
  >
    <UiChrome section="FIELD NOTES" index="03-09" />
    {children}
  </AbsoluteFill>
);

export const ProblemScene: React.FC = () => (
  <SceneFrame>
    <GlowCard delayFrames={4}>
      <div
        style={{
          color: COLORS.accentLight,
          fontFamily: "monospace",
          fontSize: 24,
          letterSpacing: 3,
          marginBottom: 26,
        }}
      >
        THE ATTENTION TAX
      </div>
      <div
        style={{
          color: COLORS.text,
          fontFamily: FONT_FAMILY,
          fontSize: 68,
          lineHeight: 1.1,
          maxWidth: 1100,
        }}
      >
        Every interruption leaves a little of your mind behind.
      </div>
      <div
        style={{
          color: "rgba(240,236,228,0.62)",
          fontFamily: FONT_FAMILY,
          fontSize: 30,
          marginTop: 28,
          maxWidth: 850,
        }}
      >
        The answer is not more willpower. It is a better system for choosing what enters.
      </div>
    </GlowCard>
  </SceneFrame>
);

export const DeliberateInputScene: React.FC = () => (
  <SceneFrame warm>
    <div style={{ display: "flex", gap: 80, alignItems: "center" }}>
      <NewImg
        src="books.png"
        style={{ width: 620, height: 620, objectFit: "contain" }}
        startFrame={0}
      />
      <div style={{ maxWidth: 760 }}>
        <div
          style={{
            color: COLORS.accentLight,
            fontFamily: "monospace",
            fontSize: 24,
            letterSpacing: 3,
            marginBottom: 24,
          }}
        >
          INPUT
        </div>
        <Typewriter
          text="Read things that make your future self more capable."
          startFrame={10}
          speed={2}
          fontSize={54}
          color={COLORS.text}
          highlight={["capable"]}
          highlightColor={COLORS.accent}
        />
      </div>
    </div>
  </SceneFrame>
);

export const VirtuePracticeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const practices = ["Temperance", "Order", "Industry"];
  return (
    <SceneFrame>
      <div style={{ width: 1180 }}>
        <div
          style={{
            color: COLORS.text,
            fontFamily: FONT_FAMILY,
            fontSize: 58,
            marginBottom: 48,
          }}
        >
          Make the abstract measurable.
        </div>
        <div style={{ display: "flex", gap: 22 }}>
          {practices.map((practice, index) => {
            const enter = interpolate(frame - index * 10, [0, 18], [0, 1], {
              easing: EASINGS.crispEntrance,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <GlowCard key={practice} delayFrames={index * 10}>
                <div
                  style={{
                    color: COLORS.accentLight,
                    fontFamily: "monospace",
                    fontSize: 22,
                    opacity: enter,
                  }}
                >
                  0{index + 1}
                </div>
                <div
                  style={{
                    color: COLORS.text,
                    fontFamily: FONT_FAMILY,
                    fontSize: 38,
                    marginTop: 30,
                  }}
                >
                  {practice}
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </SceneFrame>
  );
};

export const ReflectionScene: React.FC = () => (
  <SceneFrame warm>
    <Typewriter
      text="What would change if you protected the first hour of tomorrow?"
      startFrame={8}
      speed={2}
      fontSize={64}
      color={COLORS.text}
      highlight={["protected", "first hour"]}
      highlightColor={COLORS.accent}
      align="center"
      pauseAfter={["change", "tomorrow"]}
    />
  </SceneFrame>
);

export const SynthesisScene: React.FC = () => (
  <SceneFrame>
    <GlowCard delayFrames={6}>
      <div
        style={{
          color: COLORS.accentLight,
          fontFamily: "monospace",
          fontSize: 24,
          letterSpacing: 3,
          marginBottom: 24,
        }}
      >
        THE TAKEAWAY
      </div>
      <div
        style={{
          color: COLORS.text,
          fontFamily: FONT_FAMILY,
          fontSize: 72,
          lineHeight: 1.08,
          maxWidth: 1120,
        }}
      >
        Productivity begins before the work: decide what deserves your mind.
      </div>
    </GlowCard>
  </SceneFrame>
);