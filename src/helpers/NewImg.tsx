import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Transition } from "./Transitions";
export const NewImg: React.FC<{
  src: string;
  startFrame?: number;
  name?: string;
  style?: React.CSSProperties;
  endFrame?: number;
  animation?: Parameters<typeof Transition>[0]["animation"];
  transitionDuration?: number;
}> = ({
  src,
  startFrame = 0,
  name,
  style,
  endFrame = 150000,
  animation = "fade",
  transitionDuration = 18,
}) => {
  const frame = useCurrentFrame();
  const opacity = frame >= startFrame && frame < endFrame ? 1 : 0;
  const transitionStyle = Transition({
    animation,
    startFrame,
    endFrame,
    duration: transitionDuration,
    finalOpacity: 0,
  });
  const transitionOpacity =
    typeof transitionStyle.opacity === "number" ? transitionStyle.opacity : 1;
  return (
    <Img
      name={name}
      src={src.startsWith("http") ? src : staticFile(src)}
      style={{
        ...style,
        ...transitionStyle,
        opacity: opacity * transitionOpacity,
        translate: "-192px 29.2px",
        scale: 1.245,
      }}
    />
  );
};
