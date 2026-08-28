import React from "react";
import {
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

/**
 * MindmapZoom
 * ------------
 * Ken-Burns style tour of a mindmap image: starts on a full overview,
 * then smoothly pans/zooms into each labeled node cluster, holds,
 * and moves on to the next — finishing by zooming back out.
 *
 * SETUP:
 * 1. Put the mindmap image in your Remotion project's `public/` folder,
 *    e.g. `public/Mindmap.png`.
 * 2. Register this composition in your Root.tsx, e.g.:
 *
 *    <Composition
 *      id="MindmapZoom"
 *      component={MindmapZoom}
 *      durationInFrames={TOTAL_DURATION}   // see below, or import it
 *      fps={30}
 *      width={1920}
 *      height={1080}
 *    />
 *
 * 3. Adjust IMAGE_NATURAL_WIDTH / HEIGHT and the `targets` array below
 *    to match your image and the nodes you want to highlight.
 */

// ---- Image + node configuration -------------------------------------------------

const IMAGE_SRC = staticFile("FSIQ.jpg");

// Natural pixel dimensions of the source image.

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

// Approximate centers of each major cluster / node in the mindmap.
// Tweak these to taste — they were estimated from the source image.
const targets: Target[] = [
  { label: "Overview", x: 714, y: 428, scale: 1, holdSeconds: 0.25 },
  {
    label: "Benjamin Franklin's Autobiography",
    x: 645,
    y: 425,
    scale: 2.4,
    holdSeconds: 0.25,
  },
  {
    label: "The Runaway Journey to Philadelphia",
    x: 795,
    y: 80,
    scale: 2.6,
    holdSeconds: 0.5,
  },
  {
    label: "The Socratic Method and Rhetoric",
    x: 150,
    y: 215,
    scale: 2.6,
    holdSeconds: 0.5,
  },
  {
    label: "Virtue, Industry, and Self-Cultivation",
    x: 1310,
    y: 320,
    scale: 2.6,
    holdSeconds: 0.5,
  },
  {
    label: "Boston Apprenticeship and Print Trade",
    x: 220,
    y: 765,
    scale: 2.6,
    holdSeconds: 0.5,
  },
  {
    label: "Governor Keith and Patronage Politics",
    x: 600,
    y: 620,
    scale: 2.6,
    holdSeconds: 0.5,
  },
  {
    label: "Early Lineage and Religious Defiance",
    x: 1110,
    y: 620,
    scale: 2.5,
    holdSeconds: 0.5,
  },
  { label: "Overview", x: 714, y: 428, scale: 1, holdSeconds: 0.5 },
];

// How long (in seconds) each transition between targets takes.
const TRANSITION_SECONDS = 1.4;

// ---- Derived frame math -----------------------------------------------------------

const FPS = 30;

/**
 * Build a list of keyframes: at each keyframe we specify the exact frame,
 * plus the x/y/scale the camera should be at. Between keyframes we
 * interpolate with an ease-in-out curve for a smooth Ken Burns motion.
 * Holding on a target is done by repeating its x/y/scale at two frames
 * (arrival frame, and arrival + hold duration).
 */
function buildKeyframes(items: Target[], startFrame: number) {
  const frames: number[] = [];
  const xs: number[] = [];
  const ys: number[] = [];
  const scales: number[] = [];

  let t = startFrame; // running time in frames
  items.forEach((item, i) => {
    if (i > 0) {
      t += TRANSITION_SECONDS * FPS; // time to travel to this target
    }
    const arrivalFrame = Math.round(t);
    frames.push(arrivalFrame);
    xs.push(item.x);
    ys.push(item.y);
    scales.push(item.scale);

    t += item.holdSeconds * FPS; // hold here
    const holdEndFrame = Math.round(t);
    frames.push(holdEndFrame);
    xs.push(item.x);
    ys.push(item.y);
    scales.push(item.scale);
  });

  return { frames, xs, ys, scales, totalFrames: Math.round(t) };
}

// Export this so Root.tsx can set durationInFrames={TOTAL_DURATION} exactly.
const { frames, xs, ys, scales, totalFrames } = buildKeyframes(targets, 0);
export const TOTAL_DURATION = totalFrames;

const easing = Easing.inOut(Easing.cubic);

export const MindmapZoom: React.FC<{
  startFrame?: number;
  endFrame?: number;
}> = ({ startFrame = 0, endFrame = 150000 }) => {
  const frame = useCurrentFrame();
  //const { frames, xs, ys, scales, totalFrames } = buildKeyframes(targets, startFrame);
  //const TOTAL_DURATION = totalFrames;
  const { width: IMAGE_NATURAL_WIDTH, height: IMAGE_NATURAL_HEIGHT } =
    useVideoConfig();
  let opacityValue = 1;
  if (frame >= endFrame) {
    opacityValue = 0;
  }
  if (frame <= startFrame) {
    opacityValue = 0;
  }
  const { width, height } = useVideoConfig();

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

  // Scale so the image's natural size maps onto the composition,
  // "cover" style, then apply the extra Ken Burns zoom on top.
  const baseScale = Math.max(
    width / IMAGE_NATURAL_WIDTH,
    height / IMAGE_NATURAL_HEIGHT,
  );
  const totalScale = baseScale * camScale;

  // Translate so that (camX, camY) in image space lands at the center
  // of the composition.
  const translateX = width / 2 - camX * totalScale;
  const translateY = height / 2 - camY * totalScale;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: IMAGE_NATURAL_WIDTH,
        height: IMAGE_NATURAL_HEIGHT,
        transform: `translate(${translateX}px, ${translateY}px) scale(${totalScale})`,
        transformOrigin: "top left",
        opacity: opacityValue,
      }}
    >
      <Img
        src={IMAGE_SRC}
        style={{
          width: IMAGE_NATURAL_WIDTH,
          height: IMAGE_NATURAL_HEIGHT,
          display: "block",
          scale: 0.997,
          translate: "-246px -110.4px",
        }}
      />
    </div>
  );
};

export default MindmapZoom;
