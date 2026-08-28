import React from "react";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { ClosingCTA } from "./ClosingCTA";
import { HookTitle } from "./HookTitle";
import { MindmapPin, Target } from "./MindmapPin";
import { TranscriptScene } from "./TranscriptScene";

const FPS = 30;
const STANDARD_SCENE_FRAMES = 6 * FPS;

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

type TextScene = {
  kind: "text";
  section: string;
  title: string;
  body: string;
  warm?: boolean;
  align?: "left" | "center";
};

type SceneDefinition = TextScene | { kind: "hook" } | { kind: "map" } | { kind: "close" };

const scenes: SceneDefinition[] = [
  { kind: "hook" },
  { kind: "text", section: "THE FEAR", title: "What if starting over is not the real problem?", body: "Most people fear becoming distracted, dependent, and unable to build a better life. Franklin's story points to a different explanation: what enters your attention shapes what you can become.", align: "center" },
  { kind: "text", section: "THE HIDDEN ENEMY", title: "Your environment can spend your attention before you do.", body: "Notifications, feeds, and passive habits scatter the mind. That is why more motivation and more productivity apps keep treating the symptom instead of the system.", warm: true },
  { kind: "map" },
  { kind: "text", section: "THE FRAMEWORK", title: "The Three Engines of Self-Invention", body: "Franklin's transformation was not one lucky breakthrough. It was a repeatable process: control your inputs, build skills deliberately, and influence without unnecessary resistance.", align: "center" },
  { kind: "text", section: "A BETTER INTERPRETATION", title: "Productivity begins before the work.", body: "The issue is not simply procrastination. Your attention is being spent before you decide what it is for. The first decision is what you permit to enter your mind." },
  { kind: "text", section: "THE METHOD", title: "Deliberate practice means reconstructing, not rereading.", body: "Franklin took essays apart, set the original aside, rebuilt the argument from memory, and compared his version with the source. That is how information becomes capability.", warm: true },
  { kind: "text", section: "DOMINO 01 / 02", title: "Uncontrolled attention becomes scattered thinking.", body: "Whatever your environment provides becomes the next thought. Passive consumption then weakens the focus needed for deep learning." },
  { kind: "text", section: "DOMINO 03 / 04", title: "Scattered thinking prevents useful skill.", body: "Without deliberate practice, you remain dependent on other people's knowledge, decisions, and opportunities. What shapes your thinking shapes your options.", align: "center" },
  { kind: "text", section: "DOMINO 05", title: "The deeper cost is an identity shaped by circumstances.", body: "Over weeks, months, and years, weak skills create fewer opportunities. Fewer opportunities reduce confidence, making deliberate action even less likely.", warm: true },
  { kind: "text", section: "MODERN MIRROR", title: "Doomscrolling is an old pattern in a new costume.", body: "The technology changed, but the chain did not: attention is captured, thought becomes fragmented, and the time needed for meaningful development disappears." },
  { kind: "text", section: "THE WRONG SOLUTION", title: "Willpower cannot repair an environment built to interrupt you.", body: "Another app, another burst of inspiration, or the excuse that there is no time leaves the deeper chain untouched. The system must change first.", align: "center" },
  { kind: "text", section: "REVERSE THE CHAIN", title: "A predictable problem can be reversed predictably.", body: "Protected attention creates clarity. Reconstruction creates skill. Thoughtful inquiry turns skill into cooperation and influence.", warm: true },
  { kind: "text", section: "ENGINE 01 / TEMPERANCE", title: "Protect the first hour of tomorrow.", body: "Remove one distraction, eat and spend more deliberately, and study something useful. Franklin said temperance creates greater clearness of head and quicker apprehension." },
  { kind: "text", section: "ENGINE 02 / RECONSTRUCTION", title: "Turn protected attention into a skill.", body: "Rebuild one idea from memory, compare it with the source, and close the gaps. Franklin's writing practice turned self-education into opportunity.", warm: true },
  { kind: "text", section: "ENGINE 03 / INQUIRY", title: "Replace immediate assertions with questions.", body: "Let people explain their reasoning and arrive at better conclusions without turning every disagreement into a contest. Influence works better without unnecessary resistance." },
  { kind: "map" },
  { kind: "close" },
];

const sceneFrames = scenes.map(() => STANDARD_SCENE_FRAMES);

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
      {scenes.map((scene, index) => {
        const durationInFrames = sceneFrames[index];
        const content =
          scene.kind === "hook" ? (
            <HookTitle
              eyebrow="ATTENTION IS A CHOICE"
              title="What gets your attention gets your life."
              subtitle="A two-minute experiment in focus, drawn from Benjamin Franklin."
              highlight={["attention", "life"]}
            />
          ) : scene.kind === "map" ? (
            <MindmapPin {...mapProps} />
          ) : scene.kind === "close" ? (
            <ClosingCTA
              title="Choose what deserves your attention."
              subtitle="START WITH ONE VIRTUE TODAY"
            />
          ) : (
            <TranscriptScene {...scene} index={`${String(index + 1).padStart(2, "0")}-18`} />
          );

        return (
          <Sequence
            key={`${scene.kind}-${index}`}
            from={next(durationInFrames)}
            durationInFrames={durationInFrames}
          >
            {content}
          </Sequence>
        );
      })}
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
