// helpers/CardGrid.tsx
import React from "react";
import { HookCard, HookCardData } from "./Card";
import { useCurrentFrame } from "remotion";
export const CardGrid: React.FC<{
  cards: HookCardData[];
  activeIndex?: number; // 0-based index of the highlighted card
  columns?: number;
  gap?: number;
  startFrame?: number; // when the first card begins entering
  endFrame?: number;
  stagger?: number; // frames between each card's entrance start
}> = ({ cards, columns = 2, gap = 20, startFrame = 0, endFrame = 150000, stagger = 8 }) => {
  const frame = useCurrentFrame();
  const parentOpacity = frame >= endFrame ? 0 : 1;
  const computedActiveIndex =
    Math.floor(Math.max(0, frame - startFrame) / 20) % cards.length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
        opacity: parentOpacity,
      }}
    >
      {cards.map((card, i) => {
        return (
          <HookCard
            key={i}
            card={card}
            isActive={i === computedActiveIndex}
            startFrame={startFrame + 2 * i * stagger}
          />
        );
      })}
    </div>
  );
};
