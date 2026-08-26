// helpers/HookCard.tsx
import React from "react";
import { Interactive, interpolate, useCurrentFrame } from "remotion";
import { EASINGS } from "./constants";
import { NewImg } from "./NewImg";
export interface HookCardData {
  index: number; // display index, e.g. 1
  total: number; // total count, e.g. 6
  label: string;
  icon: string; // emoji
  accentColor: string; // underline + active border color
}

export const HookCard: React.FC<{
  card: HookCardData;
  isActive?: boolean;
  startFrame?: number; // when this card's entrance begins
  endFrame?: number;
  entranceDuration?: number;
}> = ({
  card,
  isActive = false,
  startFrame = 0,
  endFrame = 150000,
  entranceDuration = 14,
}) => {
  const frame = useCurrentFrame();
  const t = frame - startFrame;

  const opacity = interpolate(t, [0, entranceDuration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const parentOpacity = frame >= endFrame ? 0 : opacity;
  const y = interpolate(t, [0, entranceDuration], [24, 0], {
    easing: EASINGS.heavyOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(t, [0, entranceDuration], [0.94, 1], {
    easing: EASINGS.heavyOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // underline draws in shortly after the card lands
  const underlineProgress = interpolate(
    t,
    [entranceDuration, entranceDuration + 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASINGS.editorial,
    },
  );

  // active card gets a slow pulsing glow
  const pulse = isActive ? 0.5 + 0.5 * Math.sin(frame / 10) : 0;

  return (
    <Interactive.Div
      style={{
        position: "relative",
        opacity: parentOpacity,
        transform: `translateY(${y}px) scale(${scale})`,
        borderRadius: 16,
        padding: 20,
        background: "rgba(255,255,255,0.04)",

        border: isActive
          ? `1.5px solid ${card.accentColor}`
          : "1.5px solid rgba(255,255,255,0.08)",

        boxShadow: isActive
          ? `0 0 ${20 + pulse * 20}px ${card.accentColor}66`
          : "none",

        minHeight: 140,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
        translate: "557.5px -153.4px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: 400,
          height: 400,
        }}
      >
        <Interactive.Div>
          <NewImg
            src={card.icon}
            startFrame={0 * 30}
            style={{
              display: "block",

              opacity: 0.5,
            }}
          />
        </Interactive.Div>
      </div>
      <div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 800,
            color: "#fff",
            marginBottom: 10,
          }}
        >
          {card.label}
        </div>
        <div
          style={{
            height: 3,
            width: `${underlineProgress * 60}px`,
            background: card.accentColor,
            borderRadius: 2,
          }}
        />
      </div>
    </Interactive.Div>
  );
};
