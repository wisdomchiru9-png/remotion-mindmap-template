import React from "react";
import {
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";
// Adjust this import to wherever your editor's "Interactive.Div" wrapper lives.
// It's the draggable/resizable wrapper your visual editor uses to let you
// nudge translate/scale by hand.
import { Interactive } from "remotion";
import { NewImg } from "./../helpers/NewImg";
import { KineticWords } from "./../helpers/KineticWords";
import { Typewriter } from "./../helpers/Typewriter";
import { COLORS } from "./../helpers/constants";
/**
 * MindmapZoom (templatized)
 * -------------------------
 * Ken-Burns style tour of ANY mindmap image: starts on a full overview,
 * pans/zooms into each labeled node cluster, holds, and finishes by
 * zooming back out. Everything that used to be hardcoded (image, node
 * positions, labels, timings) is now a prop, so this component can be
 * reused for many different mindmap graphics.
 *
 * USAGE (Root.tsx):
 *
 *   const franklinTargets: Target[] = [
 *     { label: "Overview", x: 714, y: 428, scale: 1, holdSeconds: 0.25 },
 *     { label: "Benjamin Franklin's Autobiography", x: 645, y: 425, scale: 2.4, holdSeconds: 0.25 },
 *     ...
 *   ];
 *
 *   <Composition
 *     id="MindmapZoom-Franklin"
 *     component={MindmapZoom}
 *     durationInFrames={calculateMindmapDuration(franklinTargets)}
 *     fps={30}
 *     width={1920}
 *     height={1080}
 *     defaultProps={{
 *       imageSrc: staticFile("FSIQ.jpg"),
 *       targets: franklinTargets,
 *       imgTranslate: "235.6px -583.1px",
 *       imgScale: 0.982,
 *     }}
 *   />
 *
 * Swap imageSrc / targets / imgTranslate / imgScale for a new mindmap and
 * you get a new video with zero code changes.
 *
 * Caption styling defaults (light gray box, thin dark border, serif text)
 * are tuned to match a plain, monochrome/grayscale mindmap graphic — the
 * kind with gray boxes, black borders, and serif body text on a pale
 * background. Pass `labelStyle` to override for a different-looking source
 * image, or `showLabels={false}` to drop captions entirely.
 */

// ---- Types --------------------------------------------------------------

export type Target = {
  label: string;
  // Center point of the node, in the image's natural pixel coordinates.
  x: number;
  y: number;
  // How "zoomed in" the camera should be on this node. 1 = full image fits.
  scale: number;
  // How long (in seconds) to hold on this node once arrived.
  holdSeconds: number;
};

export type MindmapZoomProps = {
  // Path/URL to the mindmap graphic (e.g. staticFile("MyMindmap.png")).
  MindmapImageSrc: string;
  imageSrc: string;
  durationInFrames?: number;
  // Natural pixel dimensions of imageSrc. Target x/y values are expressed
  // in this coordinate space, so this must match the actual source image
  // (or the pixel grid you eyeballed the target coordinates against).
  imageNaturalWidth?: number;
  imageNaturalHeight?: number;
  // Ordered list of nodes the camera visits. Include an "Overview" node
  // at the start (scale ~1) and usually another at the end to zoom back out.
  targets: Target[];
  // Seconds spent traveling between two targets. Default 1.4s.
  transitionSeconds?: number;
  fps?: number;
  // Frame range this composition is visible for (fade in/out at the edges).
  startFrame?: number;
  endFrame?: number;
  // Manual fine-alignment of the raw image inside the frame — this is the
  // "Interactive.Div" adjustment layer, independent of the Ken Burns pan/
  // zoom, so you can nudge crop/offset live in the editor.
  imgTranslate?: string;
  imgScale?: number;
  // Whether to render the fading caption label for the current node.
  showLabels?: boolean;
  labelFadeFrames?: number;
  labelStyle?: React.CSSProperties;
  numberedHeadlineText?: string;
  boldHeadlineText?: string;
  clickbaitHeadlineText?: string;
};

// ---- Keyframe helpers -----------------------------------------------------

type Keyframes = {
  frames: number[];
  xs: number[];
  ys: number[];
  scales: number[];
  totalFrames: number;
};

function buildKeyframes(
  items: Target[],
  transitionSeconds: number,
  fps: number,
  startFrame = 0,
): Keyframes {
  const frames: number[] = [];
  const xs: number[] = [];
  const ys: number[] = [];
  const scales: number[] = [];

  let t = startFrame;
  items.forEach((item, i) => {
    if (i > 0) {
      t += transitionSeconds * fps;
    }
    const arrivalFrame = Math.round(t);
    frames.push(arrivalFrame);
    xs.push(item.x);
    ys.push(item.y);
    scales.push(item.scale);

    t += item.holdSeconds * fps;
    const holdEndFrame = Math.round(t);
    frames.push(holdEndFrame);
    xs.push(item.x);
    ys.push(item.y);
    scales.push(item.scale);
  });

  return { frames, xs, ys, scales, totalFrames: Math.round(t) };
}

/**
 * Compute the total durationInFrames for a given set of targets/timings.
 * Use this in Root.tsx: durationInFrames={calculateMindmapDuration(targets)}
 */
export function calculateMindmapDuration(
  targets: Target[],
  transitionSeconds = 1.4,
  fps = 30,
): number {
  return buildKeyframes(targets, transitionSeconds, fps).totalFrames;
}

const easing = Easing.inOut(Easing.cubic);

// ---- Component --------------------------------------------------------------

export const MindmapPin: React.FC<MindmapZoomProps> = ({
  MindmapImageSrc,
  imageSrc,
  imageNaturalWidth,
  imageNaturalHeight,
  targets,
  transitionSeconds = 1.4,
  fps = 30,
  imgTranslate = "235.6px -583.1px",
  imgScale = 0.982,
  numberedHeadlineText = "Do More With Less",
  boldHeadlineText = "Cognitive Economy: Turn Attention into Wealth",
  clickbaitHeadlineText = "Before Deep Work, \nGTD & Atomic Habits, \nThere Was Benjamin Franklin.",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const { frames, xs, ys, scales } = buildKeyframes(
    targets,
    transitionSeconds,
    fps,
  );

  const camX = interpolate(frame, frames, xs, {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camY = interpolate(frame, frames, ys, {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const camScale = interpolate(frame, frames, scales, {
    easing,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Cover" the composition with the image at its natural size, then apply
  // the extra Ken Burns zoom on top. Target x/y/scale values stay in real
  // image-pixel-space, so they transfer cleanly between differently sized
  // compositions as long as imageNaturalWidth/Height are set correctly.

  const totalScale = camScale;
  const translateX = width / 2 - camX * totalScale;
  const translateY = height / 2 - camY * totalScale;
  //transform: `translate(${translateX}px, ${translateY}px) scale(${totalScale})`,

  return (
    <div
      style={{
        transform: `translate(${translateX}px, ${translateY}px) scale(${totalScale})`,
      }}
    >
      <Interactive.Div
        style={{
          position: "relative",
          width,
          height,
          overflow: "hidden",
          background: "#000000",
          translate: "-460px 210px",
        }}
      >
        <Interactive.Div>
          <div
            style={{
              height: 3,
              width: 50,
              background: COLORS.accent,
              rotate: "135deg",
              translate: "-19.2px 224.9px",
              scale: 13.831,
            }}
          />

          <div
            style={{
              height: 3,
              width: 200,
              rotate: "315deg",
              translate: "36px 71.6px",
              scale: 1.856,
              fontWeight: 900,
              fontFamily: "'Courier New', monospace",
              textTransform: "uppercase",
              color: "#000000",
            }}
          >
            {" "}
            <span className="font-bold ">Harvard Classics</span>
          </div>
        </Interactive.Div>
        {/*Header*/}
        <Interactive.Div
          style={{
            height: 4,
            width: 1000,
            background: "#ffffff",

            translate: "452.2px 1469.1px",
            scale: 2.094,
          }}
        />

        {/* Portrait */}

        <Interactive.Div
          style={{
            translate: imgTranslate,
            scale: imgScale,
          }}
        >
          <NewImg
            src={imageSrc}
            startFrame={0 * 30}
            style={{
              display: "block",
              translate: "316.1px 893.5px",
              scale: 3.455,
              opacity: 0.5,
            }}
          />
        </Interactive.Div>
        {/* Numbered Headline */}

        <Interactive.Div
          style={{
            position: "absolute",
            top: "13%",
            left: "8%",
            right: "8%",
            fontFamily: "'Courier New', monospace",
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.05,

            color: "#8f8f8f",
            textTransform: "uppercase",
            whiteSpace: "pre-line",
            translate: "-75.6px 40.7px",
            scale: 0.939,
          }}
        >
          <KineticWords text={numberedHeadlineText} startFrame={0 * 30} />
        </Interactive.Div>

        {/* Bold Text */}
        <Interactive.Div
          style={{
            position: "absolute",
            top: "13%",
            left: "8%",
            right: "8%",
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: -1,
            color: "#f5f5f5",
            whiteSpace: "pre-line",
            translate: "149.9px -101.5px",
            scale: 0.939,
          }}
        >
          {boldHeadlineText}
        </Interactive.Div>
        <Interactive.Div>
          <div
            style={{
              height: 3,
              width: 400,
              background: COLORS.accent,
              translate: "36.1px 230.4px",
            }}
          />
          <div
            style={{
              height: 80,
              width: 3,
              background: COLORS.accent,
              translate: "36.1px 229.3px",
            }}
          />
        </Interactive.Div>
        {/* Clickbait */}
        <Interactive.Div
          style={{
            position: "absolute",
            top: "44%",
            left: "8%",
            right: "8%",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 26,
            fontStyle: "italic",
            fontWeight: 400,
            color: "#c9c9c9",
            translate: "161.2px -158.5px",
            scale: 1.479,
            whiteSpace: "pre-line",
          }}
        >
          <Typewriter
            text={clickbaitHeadlineText}
            startFrame={1 * 30}
            highlight={["Benjamin", "Franklin"]}
          />
        </Interactive.Div>
      </Interactive.Div>
      {/* Mindmap */}
      <Interactive.Div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: imageNaturalWidth,
          height: imageNaturalHeight,
          transformOrigin: "top left",
          opacity: 1,
          zIndex: 40,

          // the Ken Burns move — now on the same node as the manual offset below

          // the manual editor-authored crop offset
          translate: imgTranslate,
          scale: imgScale,
        }}
      >
        <Img
          src={MindmapImageSrc}
          style={{
            width: imageNaturalWidth,
            height: imageNaturalHeight,
            display: "block",
            translate: "70.3px 1026.7px",
            scale: 1.134,
            border: "12px double #ffffff",
            zIndex: 40,
          }}
          from={-46}
        />
        {/* RGB */}
        {/* <Interactive.Div
          style={{
            background: "#2d3436",
            height: 10,
            width: 10,
            translate: "-147.9px 551.2px",
            zIndex: 50,
            border: "1px double #ffffff",
            scale: 2.278,
          }}
        />
        <Interactive.Div
          style={{
            background: "#636e72",
            height: 10,
            width: 10,
            translate: "-121.8px 541.5px",
            zIndex: 50,
            border: "1px double #ffffff",
            scale: 2.278,
          }}
        />
        <Interactive.Div
          style={{
            background: "#b2bec3 ",
            height: 10,
            width: 10,
            translate: "-95.6px 531.1px",
            zIndex: 50,
            border: "1px double #ffffff",
            scale: 2.278,
          }}
        /> */}
      </Interactive.Div>
      {/* Logo */}
      <Interactive.Div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: imageNaturalWidth,
          height: imageNaturalHeight,
          transformOrigin: "top left",
          opacity: 1,
          zIndex: 40,

          // the Ken Burns move — now on the same node as the manual offset below

          // the manual editor-authored crop offset
          translate: imgTranslate,
          scale: imgScale,
        }}
      >
        <Img
          src={staticFile("logo-removebg-preview.png")}
          style={{
            width: imageNaturalWidth,
            height: imageNaturalHeight,
            display: "block",
            translate: "-47.9px 1002.8px",
            scale: 0.335,
            border: "12px double #ffffff",
            zIndex: 40,
          }}
          from={-46}
        />
      </Interactive.Div>
    </div>
  );
};

export default MindmapPin;

//Use in dev tools to get mindmap coords
// const SEARCH = [
//   ["Section 1", "1791"],
//   ["Section 2", "2011"],
//   ["Section 3", "1999"],
//   ["Section 4", "2020"],
//   ["Section 5", "2006"],
//   ["Section 6", "2016"],
// ];

// const iframe = document.getElementById("mindmapView");
// const doc = iframe.contentDocument || iframe.contentWindow.document;

// const targets = [];

// for (const [label, year] of SEARCH) {
//   const text = [...doc.querySelectorAll("text")].find(t =>
//     t.textContent.includes(year)
//   );

//   if (!text) {
//     console.warn(year, "not found");
//     continue;
//   }

//   const node = text.closest("g.mindmap-node");

//   const outer = node.getAttribute("transform")
//     .match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);

// const inner = node.querySelector("g[transform]")
//     .getAttribute("transform")
//     .match(/translate\(([-\d.]+),\s*([-\d.]+)\)/);

// const x = parseFloat(outer[1]) + parseFloat(inner[1]);
// const y = parseFloat(outer[2]) + parseFloat(inner[2]);

//   targets.push({
//     label,
//     x: (parseFloat(x) * 1.134 + 70.3) -1020,
//     y: (parseFloat(y) * 1.134 + 1026.7) -1440,
//     scale: 4.4,
//     holdSeconds: 0.5,
//   });
// }

// console.log(targets);
