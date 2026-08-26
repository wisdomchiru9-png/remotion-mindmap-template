import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS, EASINGS } from "./constants";

type GlowCardProps = {
  readonly children: React.ReactNode;
  readonly delayFrames?: number;
  readonly endFrame?: number;
};

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  delayFrames = 0,
  endFrame = 150000,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - delayFrames;

  const opacity = interpolate(localFrame, [0, 1.5 * fps], [0, 1], {
    easing: EASINGS.crispEntrance,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const parentOpacity = frame >= endFrame ? 0 : opacity;

  const scale = interpolate(localFrame, [0, 1.5 * fps], [0.95, 1], {
    easing: EASINGS.crispEntrance,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity: parentOpacity,
        transform: `scale(${scale})`,
        background: COLORS.glass,
        border: `1px solid ${COLORS.glassBorder}`,
        borderRadius: 16,
        padding: "24px 48px",
        boxShadow: `0 0 60px ${COLORS.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {children}
    </div>
  );
};
