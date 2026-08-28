//npx remotion still MindmapPin-1920x1080 thumbnail.png --frame=0
import { Composition, Folder, staticFile } from "remotion";
import { MindmapPin, calculateMindmapDuration } from "./scenes/MindmapPin";
import { HookCardData } from "./helpers/Card";
import { Intro } from "./scenes/Intro";
import { HookTitle } from "./scenes/HookTitle";
import { StatReveal } from "./scenes/StatReveal";
import { ClosingCTA } from "./scenes/ClosingCTA";
import { FinalSequence, FINAL_SEQUENCE_DURATION } from "./scenes/FinalSequence";

export const RemotionRoot: React.FC = () => {
  type Target = {
    label: string;
    // Center point of the node, in the image's natural pixel coordinates.
    x: number;
    y: number;
    // How "zoomed in" the camera should be on this node. 1 = full image fits.
    scale: number;
    // How long (in seconds) to hold on this node once arrived.
    holdSeconds: number;
  };
  const cards: HookCardData[] = [
    {
      index: 1,
      total: 6,
      label: "The Iliad",
      icon: "/illiad.jpg",
      accentColor: "#ff6b6b",
    },
    {
      index: 2,
      total: 6,
      label: "Why Homer",
      icon: "/illiad (2).jpg",
      accentColor: "#4ecdc4",
    },
  ];
  const targets: Target[] = [
    { label: "Overview", x: 500, y: 750, scale: 1, holdSeconds: 7 },
    {
      label: "Top Left: Visual learning 1",
      x: -400,
      y: -40,
      scale: 4.4,
      holdSeconds: 5,
    },
    {
      label: "Bottom Mid: Visual Learning 2",
      x: 0,
      y: 600,
      scale: 4.4,
      holdSeconds: 5,
    },

    {
      label: "Section 1",
      x: 325.8037357621911,
      y: -36.50496279684853,
      scale: 4.2,
      holdSeconds: 5,
    },
    {
      label: "Section 2",
      x: 328.07260125996936,
      y: 255.851636360283,
      scale: 3.7,
      holdSeconds: 5,
    },
    {
      label: "Section 3",
      x: -150.9116877146223,
      y: 258.44046177309133,
      scale: 3.3,
      holdSeconds: 5,
    },
    {
      label: "Section 4",
      x: 128.72730238397514,
      y: 436.233240809265,
      scale: 4.1,
      holdSeconds: 5,
    },
    {
      label: "Section 5",
      x: 1.54345894056712,
      y: -65.45466974497594,
      scale: 4.4,
      holdSeconds: 5,
    },
    {
      label: "Section 6",
      x: 101.54345894056712,
      y: 204.3405103097257,
      scale: 3.9,
      holdSeconds: 5,
    },

    { label: "Overview", x: 500, y: 750, scale: 1, holdSeconds: 5 },
  ];
  return (
    <Folder name="Franklin-Part-1">
      {/* Individual Franklin scenes — iterate on one without scrubbing the full video */}

      <Composition
        id="MindmapPin-1920x1080"
        component={MindmapPin}
        durationInFrames={calculateMindmapDuration(targets)}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          MindmapImageSrc: staticFile("Franklin-Mindmap-1.webp"),
          targets: targets,
          imgTranslate: "235.6px -583.1px",
          imgScale: 0.982,
          imageSrc: "/ben.jpg",
        }}
      />

      <Composition
        id="Intro"
        // @ts-expect-error it works lol
        component={Intro}
        durationInFrames={1030}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          badgeText: "SELF EDUCATION IS A RABBIT HOLE",

          highlightLine: "But why?",
          subtext:
            "Not all classics teach the same thing. Some entertain. Some preserve culture. A rare few change how you think.",
          cards,
          statValue: "51",
          statLabel: "Harvard Classics",
          badgeColor: "#ff2d78",
        }}
      />

      <Composition
        id="HookTitle"
        // @ts-expect-error Remotion's Composition props are broader than the scene props.
        component={HookTitle}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          eyebrow: "ATTENTION IS A CHOICE",
          title: "What gets your attention gets your life.",
          subtitle: "A two-minute experiment in focus, drawn from Benjamin Franklin.",
          highlight: ["attention", "life"],
        }}
      />

      <Composition
        id="StatReveal"
        // @ts-expect-error Remotion's Composition props are broader than the scene props.
        component={StatReveal}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          value: "51",
          label: "FRANKLIN'S VIRTUES",
          context: "A small system can make a large life easier to steer.",
        }}
      />

      <Composition
        id="ClosingCTA"
        // @ts-expect-error Remotion's Composition props are broader than the scene props.
        component={ClosingCTA}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Choose what deserves your attention.",
          subtitle: "START WITH ONE VIRTUE TODAY",
        }}
      />

      <Composition
        id="Franklin-Attention-Full"
        component={FinalSequence}
        durationInFrames={FINAL_SEQUENCE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
  );
};
