import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { ClosingCTA } from "./ClosingCTA";
import {
  DeliberateInputScene,
  ProblemScene,
  ReflectionScene,
  SynthesisScene,
  VirtuePracticeScene,
} from "./AdditionalScenes";
import { HookTitle } from "./HookTitle";
import { MindmapPin, Target } from "./MindmapPin";
import { StatReveal } from "./StatReveal";
import { UiChrome } from "../helpers/UiChrome";

const FPS = 30;
const sceneFrames = {
  hook: 13 * FPS,
  stat: 13 * FPS,
  problem: 15 * FPS,
  mapIntro: 13 * FPS,
  input: 15 * FPS,
  practice: 15 * FPS,
  reflection: 15 * FPS,
  mapDetail: 15 * FPS,
  synthesis: 21 * FPS,
  close: 15 * FPS,
};

const mapTargets: Target[] = [
  { label: "Overview", x: 500, y: 750, scale: 1, holdSeconds: 2 },
  { label: "Self-cultivation", x: 325.8, y: -36.5, scale: 4.2, holdSeconds: 5 },
  { label: "Industry", x: 328.1, y: 255.9, scale: 3.7, holdSeconds: 3 },
  { label: "Overview", x: 500, y: 750, scale: 1, holdSeconds: 1 },
];

const mapProps = {
  MindmapImageSrc: staticFile("Franklin-Mindmap-1.webp"),
  imageSrc: "/ben.jpg",
  targets: mapTargets,
  imgTranslate: "235.6px -583.1px",
  imgScale: 0.982,
};

const SceneFade: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, 24], [0, 0.72, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ background: "#050507", opacity }} />;
};

export const FINAL_SEQUENCE_DURATION = Object.values(sceneFrames).reduce(
  (total, frames) => total + frames,
  0,
);

export const FinalSequence: React.FC = () => {
  let from = 0;
  const boundaries: number[] = [];
  const next = (durationInFrames: number) => {
    const start = from;
    if (start > 0) boundaries.push(start);
    from += durationInFrames;
    return start;
  };

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      <Sequence
        from={next(sceneFrames.hook)}
        durationInFrames={sceneFrames.hook}
      >
        <HookTitle
          eyebrow="ATTENTION IS A CHOICE"
          title="What gets your attention gets your life."
          subtitle="A two-minute experiment in focus, drawn from Benjamin Franklin."
          highlight={["attention", "life"]}
        />
      </Sequence>
      <Sequence
        from={next(sceneFrames.stat)}
        durationInFrames={sceneFrames.stat}
      >
        <StatReveal
          value="13"
          label="VIRTUES"
          context="A small system can make a large life easier to steer."
        />
      </Sequence>
      <Sequence
        from={next(sceneFrames.problem)}
        durationInFrames={sceneFrames.problem}
      >
        <ProblemScene />
      </Sequence>
      <Sequence
        from={next(sceneFrames.mapIntro)}
        durationInFrames={sceneFrames.mapIntro}
      >
        <MindmapPin {...mapProps} />
        <UiChrome section="MAP / ORIENTATION" index="04-10" />
      </Sequence>
      <Sequence
        from={next(sceneFrames.input)}
        durationInFrames={sceneFrames.input}
      >
        <DeliberateInputScene />
      </Sequence>
      <Sequence
        from={next(sceneFrames.practice)}
        durationInFrames={sceneFrames.practice}
      >
        <VirtuePracticeScene />
      </Sequence>
      <Sequence
        from={next(sceneFrames.reflection)}
        durationInFrames={sceneFrames.reflection}
      >
        <ReflectionScene />
      </Sequence>
      <Sequence
        from={next(sceneFrames.mapDetail)}
        durationInFrames={sceneFrames.mapDetail}
      >
        <MindmapPin {...mapProps} />
        <UiChrome section="MAP / PRACTICE" index="08-10" />
      </Sequence>
      <Sequence
        from={next(sceneFrames.synthesis)}
        durationInFrames={sceneFrames.synthesis}
      >
        <SynthesisScene />
      </Sequence>
      <Sequence
        from={next(sceneFrames.close)}
        durationInFrames={sceneFrames.close}
      >
        <ClosingCTA
          title="Choose what deserves your attention."
          subtitle="START WITH ONE VIRTUE TODAY"
        />
      </Sequence>
      {boundaries.map((boundary) => (
        <Sequence
          key={boundary}
          from={boundary - 12}
          durationInFrames={24}
        >
          <SceneFade />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
