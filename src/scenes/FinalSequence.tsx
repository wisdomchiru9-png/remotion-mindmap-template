import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { ClosingCTA } from "./ClosingCTA";
import { HookTitle } from "./HookTitle";
import MindmapZoom from "../helpers/MindmapZoom";
import { TranscriptScene } from "./TranscriptScene";
import { Transition } from "../helpers/Transitions";

const FPS = 30;
const STANDARD_SCENE_FRAMES = 100 * FPS;
const NARRATION_DURATION_IN_FRAMES = 54139;

type TextScene = {
  kind: "text";
  section: string;
  title: string;
  body: string;
  warm?: boolean;
  align?: "left" | "center";
};

type SceneDefinition =
  | TextScene
  | { kind: "hook" }
  | { kind: "map" }
  | { kind: "close" };

const scenes: SceneDefinition[] = [
  { kind: "hook" },
  {
    kind: "text",
    section: "THE FEAR",
    title: "What if starting over is not the real problem?",
    body: "Most people fear becoming distracted, dependent, and unable to build a better life. Franklin's story points to a different explanation: what enters your attention shapes what you can become.",
    align: "center",
  },
  {
    kind: "text",
    section: "THE HIDDEN ENEMY",
    title: "Your environment can spend your attention before you do.",
    body: "Notifications, feeds, and passive habits scatter the mind. That is why more motivation and more productivity apps keep treating the symptom instead of the system.",
    warm: true,
  },
  { kind: "map" },
  {
    kind: "text",
    section: "THE FRAMEWORK",
    title: "The Three Engines of Self-Invention",
    body: "Franklin's transformation was not one lucky breakthrough. It was a repeatable process: control your inputs, build skills deliberately, and influence without unnecessary resistance.",
    align: "center",
  },
  {
    kind: "text",
    section: "A BETTER INTERPRETATION",
    title: "Productivity begins before the work.",
    body: "The issue is not simply procrastination. Your attention is being spent before you decide what it is for. The first decision is what you permit to enter your mind.",
  },
  {
    kind: "text",
    section: "THE METHOD",
    title: "Deliberate practice means reconstructing, not rereading.",
    body: "Franklin took essays apart, set the original aside, rebuilt the argument from memory, and compared his version with the source. That is how information becomes capability.",
    warm: true,
  },
  {
    kind: "text",
    section: "DOMINO 01 / 02",
    title: "Uncontrolled attention becomes scattered thinking.",
    body: "Whatever your environment provides becomes the next thought. Passive consumption then weakens the focus needed for deep learning.",
  },
  {
    kind: "text",
    section: "DOMINO 03 / 04",
    title: "Scattered thinking prevents useful skill.",
    body: "Without deliberate practice, you remain dependent on other people's knowledge, decisions, and opportunities. What shapes your thinking shapes your options.",
    align: "center",
  },
  {
    kind: "text",
    section: "DOMINO 05",
    title: "The deeper cost is an identity shaped by circumstances.",
    body: "Over weeks, months, and years, weak skills create fewer opportunities. Fewer opportunities reduce confidence, making deliberate action even less likely.",
    warm: true,
  },
  {
    kind: "text",
    section: "MODERN MIRROR",
    title: "Doomscrolling is an old pattern in a new costume.",
    body: "The technology changed, but the chain did not: attention is captured, thought becomes fragmented, and the time needed for meaningful development disappears.",
  },
  {
    kind: "text",
    section: "THE WRONG SOLUTION",
    title: "Willpower cannot repair an environment built to interrupt you.",
    body: "Another app, another burst of inspiration, or the excuse that there is no time leaves the deeper chain untouched. The system must change first.",
    align: "center",
  },
  {
    kind: "text",
    section: "REVERSE THE CHAIN",
    title: "A predictable problem can be reversed predictably.",
    body: "Protected attention creates clarity. Reconstruction creates skill. Thoughtful inquiry turns skill into cooperation and influence.",
    warm: true,
  },
  {
    kind: "text",
    section: "ENGINE 01 / TEMPERANCE",
    title: "Protect the first hour of tomorrow.",
    body: "Remove one distraction, eat and spend more deliberately, and study something useful. Franklin said temperance creates greater clearness of head and quicker apprehension.",
  },
  {
    kind: "text",
    section: "ENGINE 02 / RECONSTRUCTION",
    title: "Turn protected attention into a skill.",
    body: "Rebuild one idea from memory, compare it with the source, and close the gaps. Franklin's writing practice turned self-education into opportunity.",
    warm: true,
  },
  {
    kind: "text",
    section: "ENGINE 03 / INQUIRY",
    title: "Replace immediate assertions with questions.",
    body: "Let people explain their reasoning and arrive at better conclusions without turning every disagreement into a contest. Influence works better without unnecessary resistance.",
  },
  { kind: "map" },
  { kind: "close" },
];

const sceneFrames = scenes.map((_, index) => {
  if (index === scenes.length - 1) {
    // Ensure the final scene has at least the standard duration (don't cut it short)
    const remainingFrames = NARRATION_DURATION_IN_FRAMES - STANDARD_SCENE_FRAMES * (scenes.length - 1);
    return Math.max(remainingFrames, STANDARD_SCENE_FRAMES);
  }
  return STANDARD_SCENE_FRAMES;
});

const sceneAnimations = [
  "fadeSlideUp",
  "fadeSlideLeft",
  "fade",
  "zoomIn",
  "fadeSlideRight",
] as const;

const SceneTransition: React.FC<{
  children: React.ReactNode;
  index: number;
}> = ({ children, index }) => (
  <div
    style={Transition({
      animation: sceneAnimations[index % sceneAnimations.length],
      duration: 18,
      endFrame: 30,
      finalOpacity: 1,
    })}
  >
    {children}
  </div>
);

export const FINAL_SEQUENCE_DURATION = Object.values(sceneFrames).reduce(
  (total, frames) => total + frames,
  0,
);

export const FinalSequence: React.FC = () => {
  let from = 0;
  const next = (durationInFrames: number) => {
    const start = from;
    from += durationInFrames;
    return start;
  };

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      <Audio src={staticFile("voiceover.wav")} volume={1} />
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
            <MindmapZoom />
          ) : scene.kind === "close" ? (
            <ClosingCTA
              title="Choose what deserves your attention."
              subtitle="START WITH ONE VIRTUE TODAY"
            />
          ) : (
            <TranscriptScene
              {...scene}
              index={`${String(index + 1).padStart(2, "0")}-18`}
            />
          );

        return (
          <Sequence
            key={`${scene.kind}-${index}`}
            from={next(durationInFrames)}
            durationInFrames={durationInFrames}
            style={{
              scale: 0.997,
            }}
          >
            <SceneTransition index={index}>{content}</SceneTransition>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
