// scenes/PatternInterrupts.tsx
import React from "react";
import { AbsoluteFill } from "remotion";
import { Video, Interactive, staticFile } from "remotion";
import { HookCardData } from "../helpers/Card";
import { NewImg } from "../helpers/NewImg";

export interface PatternInterruptsProps {
  badgeText: string;
  headlineLines?: string[]; // e.g. ["before", "your", "brain", "can"]
  highlightLine?: string; // e.g. "settle." — rendered with gradient
  highlightGradient?: string; // CSS gradient string
  subtext?: string;
  cards: HookCardData[];
  activeCardIndex?: number;
  statValue?: string;
  statLabel?: string;
  badgeColor?: string;
}

export const Intro: React.FC<PatternInterruptsProps> = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0510", padding: "60px 70px" }}>
      <Interactive.Div
        style={{
          translate: "-611px 475.9px",
          scale: 0.504,
          zIndex: 10,
          borderRadius: 8,
        }}
        durationInFrames={1030}
      >
        <Video
          src={staticFile("intro-simpsons-standard-testing.mp4")}
          style={{
            height: "100%",
            clipPath: "inset(100px 210px 0 210px)",
            borderRadius: 8,
          }}
        />
      </Interactive.Div>
      <AbsoluteFill style={{ flexDirection: "row" }}>
        {/* Left column */}
        <div
          style={{
            width: "42%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {/* <Badge text={badgeText} color={badgeColor} startFrame={0} /> */}
        </div>

        {/* Right column */}
        {/* <div
          style={{
            width: "58%",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CardGrid cards={cards} startFrame={3 * 30} stagger={8} />
        </div> */}
        <Interactive.Div>
          <NewImg
            src={"/Intro-books-read-b4-die.png"}
            startFrame={0 * 30}
            style={{
              display: "block",
              translate: "316.1px 893.5px",
              scale: 3.455,
            }}
            endFrame={3 * 30}
          />
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
