import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const photoAssets = {
  portrait: staticFile("ben-franklin.jpg"),
  mindmap: staticFile("Franklin-Mindmap-1.webp"),
  research: staticFile("Mindmap.png"),
  legacy: staticFile("FSIQ.jpg"),
  progress: staticFile("harvard.webp"),
  finalPortrait: staticFile("ben.jpg"),
  detailOne: staticFile("books.png"),
  detailTwo: staticFile("reality.png"),
  detailThree: staticFile("logo.jpg"),
} as const;

const allIncludedImageAssets = [
  staticFile("ben-franklin.jpg"),
  staticFile("ben.jpg"),
  staticFile("books.png"),
  staticFile("Franklin-Mindmap-1.webp"),
  staticFile("FSIQ.jpg"),
  staticFile("google-scholar.png"),
  staticFile("harvard-removebg-preview.svg"),
  staticFile("harvard.webp"),
  staticFile("illiad (2).jpg"),
  staticFile("illiad.jpg"),
  staticFile("Intro-books-read-b4-die.png"),
  staticFile("logo.jpg"),
  staticFile("logo-removebg-preview.png"),
  staticFile("Mindmap.png"),
  staticFile("reality.png"),
  staticFile("Untitled.jpg"),
  staticFile("youtube-playlist-custom.png"),
] as const;

const finalPortrait = photoAssets.finalPortrait;

const sceneImages: Record<number, string[]> = {
  0: [...allIncludedImageAssets],
  1: [...allIncludedImageAssets],
  2: [...allIncludedImageAssets],
  3: [...allIncludedImageAssets],
  4: [...allIncludedImageAssets],
  5: [...allIncludedImageAssets],
  6: [...allIncludedImageAssets],
  7: [...allIncludedImageAssets],
  8: [...allIncludedImageAssets],
  9: [...allIncludedImageAssets],
  10: [finalPortrait, ...allIncludedImageAssets.slice(0, 8)],
};

const SCENES = [
  {
    eyebrow: "01 / 11",
    title: "The cost of a distracted mind.",
    body: "Every interruption is a small withdrawal from the most valuable asset you own: your ability to think clearly, choose well, and build something durable.",
  },
  {
    eyebrow: "02 / 11",
    title: "The leak is visible once you measure it.",
    body: "Small obligations stack into a quiet tax on your time, energy, and attention. What feels harmless in the moment compounds into lost focus.",
  },
  {
    eyebrow: "03 / 11",
    title: "The first audit begins with a record.",
    body: "For one ordinary day, log where your attention goes. The hidden cost of distraction becomes obvious only when you can see it clearly.",
  },
  {
    eyebrow: "04 / 11",
    title: "Franklin’s method was practical, not preachy.",
    body: "His virtues were not aesthetic rules. They were a disciplined system for restoring attention, order, usefulness, and personal power.",
  },
  {
    eyebrow: "05 / 11",
    title: "Begin by subtracting the noise.",
    body: "You do not need a more intense life. You need enough silence to hear your real priorities and make deliberate decisions again.",
  },
  {
    eyebrow: "06 / 11",
    title: "The 3-pass audit is simple and rigorous.",
    body: "Withdraw what drains you. Systematize what repeats. Compound the attention you protect so each day becomes more valuable than the last.",
  },
  {
    eyebrow: "07 / 11",
    title: "Temperance sharpens judgment.",
    body: "Too much consumption weakens your ability to think. Clarity is not a mood. It is the result of disciplined attention and better boundaries.",
  },
  {
    eyebrow: "08 / 11",
    title: "Silence is not empty. It is productive.",
    body: "Fewer claims on the mind means more room for thought, better decisions, and a calmer, more honest life directed by purpose instead of urgency.",
  },
  {
    eyebrow: "09 / 11",
    title: "Order turns intention into action.",
    body: "When your priorities are pre-decided, your future is no longer hijacked by random demands. Structure gives attention a place to land.",
  },
  {
    eyebrow: "10 / 11",
    title: "Frugality, sincerity, and tranquility are leverage.",
    body: "Spend with intention. Speak honestly. Keep your inner life steady. These habits protect the attention that produces real value.",
  },
  {
    eyebrow: "11 / 11",
    title: "Protect it. Invest it. Let it compound.",
    body: "The Franklin Audit does not promise perfection. It gives you a better method: notice the leaks, restore the system, and protect the focus that builds your future.",
  },
] as const;

// Actual audio runtime is ~352.31s; at 30fps that is 10569 frames.
const SCENE_DURATIONS = [900, 980, 940, 980, 960, 980, 980, 980, 980, 1040, 1070] as const;
const totalFrames = SCENE_DURATIONS.reduce((sum, duration) => sum + duration, 0);
const sceneStartFrames = SCENE_DURATIONS.reduce<number[]>((starts, duration, index) => {
  const previous = starts[index - 1] ?? 0;
  starts.push(previous + (SCENE_DURATIONS[index - 1] ?? 0));
  return starts;
}, []);

const sideLabels = [
  "ATTENTION",
  "SYSTEM",
  "ORDER",
  "TIME",
  "EXPERIMENT",
  "LEVERAGE",
  "COMPOUND",
  "FUTURE",
];

const miniCards = [
  "Withdraw the leaks",
  "Structure beats intensity",
  "Protect your attention",
  "Build daily systems",
  "Use friction wisely",
  "Compound small wins",
  "Design for clarity",
  "Turn effort into leverage",
];

const GraphLayer: React.FC<{ sceneIndex: number }> = ({ sceneIndex }) => {
  const frame = useCurrentFrame();
  const cycle = frame % 180;
  const graphProgress = interpolate(cycle, [0, 60, 150, 180], [0.18, 0.9, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pathPoints = [
    [20, 170],
    [120, 150],
    [220, 185],
    [300, 140],
    [420, 162],
    [540, 110],
    [640, 128],
    [760, 80],
    [900, 115],
    [980, 90],
  ] as const;

  const linePath = pathPoints
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x},${y}`)
    .join(" ");

  const areaPath = `${linePath} L 980,540 L 20,540 Z`;

  const drawOffset = 900 * (1 - graphProgress);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.8,
        transform: `translateY(${(1 - graphProgress) * 20}px)`,
      }}
    >
      <svg
        viewBox="0 0 1000 540"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          height: "62%",
          filter: "drop-shadow(0 20px 24px rgba(255,150,80,0.18))",
        }}
      >
        <defs>
          <linearGradient id={`graphFill-${sceneIndex}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(248, 178, 97, 0.5)" />
            <stop offset="100%" stopColor="rgba(248, 178, 97, 0.02)" />
          </linearGradient>
        </defs>
        <path
          d={areaPath}
          fill={`url(#graphFill-${sceneIndex})`}
          opacity={0.8 * graphProgress}
        />
        <path
          d={linePath}
          fill="none"
          stroke="rgba(255, 174, 102, 0.96)"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={900}
          strokeDashoffset={drawOffset}
        />
        {pathPoints.map(([x, y], index) => (
          <circle
            key={`${sceneIndex}-${x}-${y}`}
            cx={x}
            cy={y}
            r={index === pathPoints.length - 1 ? 6 : 4.5}
            fill={index === pathPoints.length - 1 ? "#f7e8d0" : "rgba(252, 204, 126, 0.9)"}
            opacity={0.9 * graphProgress}
          />
        ))}
        {[0, 1, 2, 3, 4].map((line) => (
          <line
            key={`grid-${sceneIndex}-${line}`}
            x1={60}
            x2={960}
            y1={90 + line * 110}
            y2={90 + line * 110}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
            strokeDasharray="8 10"
            opacity={0.5 * graphProgress}
          />
        ))}
      </svg>
    </div>
  );
};

const HeroLedger: React.FC<{ progress: number }> = ({ progress }) => {
  const visible = interpolate(progress, [0, 0.18, 0.82, 1], [0, 1, 1, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: "7%",
        top: "8%",
        width: 260,
        padding: "18px 20px",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 16,
        background: "rgba(12, 15, 19, 0.48)",
        color: "#f8f2ea",
        boxShadow: "0 16px 32px rgba(0,0,0,0.24)",
        opacity: visible,
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 4,
          color: "#f2c786",
          textTransform: "uppercase",
          fontWeight: 800,
        }}
      >
        Franklin Audit
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 34,
          fontWeight: 900,
          letterSpacing: "-0.06em",
          lineHeight: 0.9,
        }}
      >
        Attention
        <br />
        is capital.
      </div>
    </div>
  );
};

const SceneBlock: React.FC<{
  scene: (typeof SCENES)[number];
  progress: number;
  sceneIndex: number;
}> = ({ scene, progress, sceneIndex }) => {
  const titleOpacity = interpolate(progress, [0, 0.18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bodyOpacity = interpolate(progress, [0.16, 0.52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleShift = interpolate(progress, [0, 0.35], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isFinalScene = sceneIndex === SCENES.length - 1;
  const imageSequence = sceneImages[sceneIndex] ?? allIncludedImageAssets;
  const imagePosition = Math.min(
    imageSequence.length - 1,
    Math.floor(progress * imageSequence.length),
  );
  const activeImage = imageSequence[imagePosition] ?? allIncludedImageAssets[0];
  const imageScale = interpolate(progress, [0, 0.5, 1], [0.96, 1.02, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "visible",
          padding: "28px 40px 40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "7%",
            top: "16%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            transform: "rotate(-90deg)",
            opacity: 0.85,
            fontFamily: "sans-serif",
            fontSize: 20,
            letterSpacing: 4,
            fontWeight: 900,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.76)",
          }}
        >
          <span>FRANKLIN</span>
          <span
            style={{
              width: 120,
              height: 2,
              display: "block",
              background: "rgba(255,157,92,0.8)",
            }}
          />
          <span>ARCHIVE</span>
        </div>

        <HeroLedger progress={progress} />

        <div
          style={{
            position: "absolute",
            right: "4%",
            top: "18%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(90deg)",
            fontSize: 18,
            color: "rgba(255,255,255,0.72)",
            fontFamily: "sans-serif",
            letterSpacing: 4,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          COGNITIVE CAPITAL
        </div>

        <div
          style={{
            position: "absolute",
            top: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            opacity: titleOpacity,
            color: "#0f0d0a",
            fontFamily: "sans-serif",
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 120, height: 3, background: "#c75f2d" }} />
          <span>{scene.eyebrow}</span>
          <div style={{ width: 120, height: 3, background: "#c75f2d" }} />
        </div>

        <div
          style={{
            position: "absolute",
            left: "18%",
            top: "18%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {miniCards.slice(0, 3).map((card, index) => (
            <div
              key={card}
              style={{
                width: 200,
                padding: "12px 16px",
                background:
                  index % 2 === 0
                    ? "rgba(255,255,255,0.18)"
                    : "rgba(19,24,30,0.12)",
                border: "1px solid rgba(40,28,18,0.5)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
                fontSize: 14,
                lineHeight: 1.2,
                color: "#1a120d",
                fontFamily: "sans-serif",
                fontWeight: 700,
                opacity: 0.9,
                transform: `translateY(${index * 8}px) rotate(${index % 2 === 0 ? "-5deg" : "4deg"})`,
              }}
            >
              {card}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            right: "17%",
            bottom: "16%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {miniCards.slice(3, 6).map((card, index) => (
            <div
              key={card}
              style={{
                width: 210,
                padding: "12px 16px",
                background:
                  index % 2 === 0
                    ? "rgba(20, 25, 35, 0.12)"
                    : "rgba(255,255,255,0.18)",
                border: "1px solid rgba(40,28,18,0.5)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
                fontSize: 14,
                lineHeight: 1.2,
                color: "#1a120d",
                fontFamily: "sans-serif",
                fontWeight: 700,
                opacity: 0.9,
                transform: `translateY(${index * 8}px) rotate(${index % 2 === 0 ? "3deg" : "-4deg"})`,
              }}
            >
              {card}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: isFinalScene ? "22%" : "24%",
            transform: "translateX(-50%)",
            width: isFinalScene ? "72%" : "82%",
            height: isFinalScene ? "58%" : "56%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 8px",
            opacity: 0.98,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: 24,
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.18)",
              boxShadow: "0 24px 50px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,197,138,0.14)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <GraphLayer sceneIndex={sceneIndex} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(7,9,12,0.12), rgba(7,9,12,0.72) 100%)",
                pointerEvents: "none",
              }}
            />
            <Img
              key={`${sceneIndex}-${imagePosition}`}
              src={activeImage}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                background: "rgba(5,7,11,0.72)",
                filter: "saturate(1.12) contrast(1.06) brightness(0.96)",
                display: "block",
                transform: `scale(${imageScale})`,
                transition: "transform 0.3s ease-out",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 20,
                bottom: 18,
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(10,12,16,0.44)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.72)",
                fontSize: 11,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontFamily: "sans-serif",
                fontWeight: 700,
              }}
            >
              FRANKLIN ARCHIVE
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: isFinalScene ? "78%" : "60%",
            textAlign: "center",
            opacity: titleOpacity,
            color: "#ffffff",
            fontFamily: "Georgia, serif",
            textShadow: "0 2px 0 rgba(0,0,0,0.25)",
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              fontSize: isFinalScene ? 92 : 70,
              lineHeight: isFinalScene ? 0.86 : 0.96,
              fontWeight: 800,
              letterSpacing: isFinalScene ? "-0.06em" : "-0.05em",
              marginBottom: 18,
              transform: `translateY(${titleShift}px)`,
              color: "#f8f3eb",
              textShadow: isFinalScene
                ? "0 0 28px rgba(255, 156, 73, 0.55), 0 3px 0 rgba(0,0,0,0.25)"
                : "0 3px 0 rgba(0,0,0,0.25)",
            }}
          >
            {scene.title}
          </div>
          <div
            style={{
              margin: "0 auto",
              width: "92%",
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(18, 17, 17, 0.9), transparent)",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "13%",
            transform: "translateX(-50%)",
            width: "62%",
            color: "rgba(12, 11, 10, 0.82)",
            fontFamily: "sans-serif",
            fontSize: 26,
            lineHeight: 1.35,
            textAlign: "center",
            opacity: bodyOpacity,
            transformOrigin: "center",
          }}
        >
          {scene.body}
        </div>

        {sideLabels.map((label, index) => (
          <div
            key={label}
            style={{
              position: "absolute",
              left: index % 2 === 0 ? 30 + index * 6 : undefined,
              right: index % 2 === 1 ? 30 + index * 5 : undefined,
              top: 120 + index * 70,
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: 900,
              color: "rgba(22, 17, 12, 0.88)",
              transform: index % 2 === 0 ? "rotate(-90deg)" : "rotate(90deg)",
              opacity: 0.7,
              fontFamily: "sans-serif",
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdditionalScenes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const formatRuntime = (seconds: number) => {
    const totalSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  const totalRuntimeLabel = formatRuntime(totalFrames / fps);

  let sceneIndex = 0;
  let localStart = 0;
  let sceneDuration = Number(SCENE_DURATIONS[0]);

  for (let index = 0; index < SCENE_DURATIONS.length; index += 1) {
    const duration = Number(SCENE_DURATIONS[index]);
    const startFrame = sceneStartFrames[index] ?? 0;

    if (frame < startFrame + duration) {
      sceneIndex = index;
      localStart = startFrame;
      sceneDuration = duration;
      break;
    }
  }

  if (frame >= totalFrames) {
    sceneIndex = SCENES.length - 1;
    localStart = sceneStartFrames[sceneIndex] ?? 0;
    sceneDuration = Number(SCENE_DURATIONS[sceneIndex] ?? 1);
  }

  const progress = (frame - localStart) / sceneDuration;
  const scene = SCENES[sceneIndex];

  const warmTone = interpolate(frame, [0, totalFrames], [0.25, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "#05070b",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("audio.mp3")} volume={0.32} startFrom={0} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, rgba(226,176,108,${0.08 + warmTone * 0.12}) 0%, rgba(11,12,18,0.3) 52%, rgba(5,7,11,0.9) 100%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "5%",
          top: "8%",
          fontSize: 18,
          color: "rgba(255,255,255,0.24)",
          fontFamily: "monospace",
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        {totalRuntimeLabel}
      </div>

      <div
        style={{
          position: "absolute",
          right: "7%",
          top: "7%",
          fontSize: 18,
          color: "rgba(255,255,255,0.22)",
          fontFamily: "monospace",
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        {scene.eyebrow}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SceneBlock scene={scene} progress={progress} sceneIndex={sceneIndex} />
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 28,
          transform: "translateX(-50%)",
          width: "58%",
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(255,214,161,0.9), rgba(255,255,255,0.18), transparent)",
          opacity: 0.75,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 36,
          bottom: 22,
          color: "rgba(255,255,255,0.7)",
          fontFamily: "monospace",
          letterSpacing: 3,
          fontSize: 14,
          textTransform: "uppercase",
        }}
      >
        {`${Math.floor(frame / fps / 60)
          .toString()
          .padStart(2, "0")}:${Math.floor((frame / fps) % 60)
          .toString()
          .padStart(2, "0")}`}
      </div>
    </AbsoluteFill>
  );
};

export default AdditionalScenes;
