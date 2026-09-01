// helpers/AnimatedImg.tsx
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { EASINGS } from "./constants";

type AnimationType =
  | "none"
  | "fade"
  | "fadeSlideUp"
  | "fadeSlideDown"
  | "fadeSlideLeft"
  | "fadeSlideRight"
  | "kenBurnsIn"
  | "kenBurnsOut"
  | "blurIn"
  | "scaleIn"
  | "spinIn"
  | "spinInFull"
  | "tiltIn"
  | "zoomIn"
  | "zoomOut"
  | "punchIn"
  | "wipeLeft"
  | "wipeRight"
  | "wipeUp"
  | "wipeDown"
  | "irisIn"
  | "skewIn"
  | "blurOut"
  | "shakeSettle";

interface TransitionProps {
  animation?: AnimationType;
  startFrame?: number;
  endFrame?: number;
  duration?: number;
  finalOpacity?: number;
  objectPosition?: string;
  slideDistance?: number;
  zoomAmount?: number;
  rotateAmount?: number; // degrees, for spinIn/tiltIn/skewIn
  style?: React.CSSProperties;
}

export const Transition = ({
  animation = "fade",
  startFrame = 0,
  endFrame = 150000,
  duration = 30,
  finalOpacity = 0,
  slideDistance = 60,
  zoomAmount = 1.15,
  rotateAmount = 150,
  style,
}: TransitionProps) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = frame - startFrame;

  const range = (from: number, to: number, easing = EASINGS.editorial) =>
    interpolate(t, [0, endFrame - startFrame], [from, to], {
      easing,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  let transform = "";
  let clipPath: string | undefined;
  let filter = "none";
  const isMasked = animation.startsWith("wipe") || animation === "irisIn";
  const fadeIn = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [Math.max(startFrame, endFrame - duration), endFrame],
    [1, finalOpacity],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  switch (animation) {
    case "fadeSlideUp":
      transform = `translateY(${range(slideDistance, 0)}px)`;
      break;
    case "fadeSlideDown":
      transform = `translateY(${range(-slideDistance, 0)}px)`;
      break;
    case "fadeSlideLeft":
      transform = `translateX(${range(slideDistance, 0)}px)`;
      break;
    case "fadeSlideRight":
      transform = `translateX(${range(-slideDistance, 0)}px)`;
      break;
    case "scaleIn":
      transform = `scale(${range(0.85, 1)})`;
      break;

    case "kenBurnsIn": {
      const s = interpolate(
        frame,
        [startFrame, startFrame + durationInFrames],
        [1, zoomAmount],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      );
      transform = `scale(${s})`;
      break;
    }
    case "kenBurnsOut": {
      const s = interpolate(
        frame,
        [startFrame, startFrame + durationInFrames],
        [zoomAmount, 1],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      );
      transform = `scale(${s})`;
      break;
    }

    case "zoomIn":
      transform = `scale(${range(1.4, 1, EASINGS.heavyOut)})`;
      break;
    case "zoomOut":
      transform = `scale(${range(0.6, 1, EASINGS.heavyOut)})`;
      break;
    case "punchIn": {
      // overshoot: 0 -> 1.15 -> 1, using two interpolate stages
      const s = interpolate(t, [0, duration * 0.6, duration], [0.7, 1.12, 1], {
        easing: EASINGS.heavyOut,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      transform = `scale(${s})`;
      break;
    }

    case "spinIn": {
      const rot = range(-rotateAmount, 0, EASINGS.heavyOut);
      const s = range(0.9, 1, EASINGS.heavyOut);
      transform =
        frame === 0
          ? `rotate(${0}deg) scale(${1})`
          : `rotate(${rot}deg) scale(${s})`;
      break;
    }
    case "spinInFull": {
      const rot = range(-360, 0, EASINGS.heavyOut);
      const s = range(0.4, 1, EASINGS.heavyOut);
      transform = `rotate(${rot}deg) scale(${s})`;
      break;
    }
    case "tiltIn": {
      const rx = range(rotateAmount, 0);
      const ry = range(-rotateAmount, 0);
      transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      break;
    }
    case "skewIn": {
      const sk = range(rotateAmount, 0, EASINGS.heavyOut);
      transform = frame === 0 ? `` : `skewY(${sk}deg)`;
      break;
    }

    case "wipeLeft":
      clipPath = `inset(0 ${range(100, 0)}% 0 0)`;
      break;
    case "wipeRight":
      clipPath = `inset(0 0 0 ${range(100, 0)}%)`;
      break;
    case "wipeUp":
      clipPath = `inset(${range(100, 0)}% 0 0 0)`;
      break;
    case "wipeDown":
      clipPath = `inset(0 0 ${range(100, 0)}% 0)`;
      break;
    case "irisIn": {
      const r = range(0, 75); // radius in %
      clipPath = `circle(${r}% at 50% 50%)`;
      break;
    }

    case "shakeSettle": {
      // decaying oscillation using sine, damped over duration
      const progress = Math.min(t / duration, 1);
      const decay = Math.exp(-4 * progress);
      const wiggle = Math.sin(t * 1.2) * 10 * decay;
      transform = `translateX(${wiggle}px)`;
      break;
    }

    case "blurIn":
      filter = `blur(${range(20, 0)}px)`;
      break;

    case "blurOut":
      filter = `blur(${range(0, 10)}px)`;
      break;

    default:
      transform = "none";
  }

  return {
    ...style,
    transform: transform,
    filter: filter,
    clipPath: clipPath,
    opacity: isMasked
      ? style?.opacity
      : (typeof style?.opacity === "number" ? style.opacity : 1) * fadeIn * fadeOut,
  };
};
