import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";

export const NewImg: React.FC<{
  src: string;
  startFrame?: number;
  name?: string;
  style?: React.CSSProperties;
  endFrame?: number;
}> = ({ src, startFrame = 0, name, style, endFrame = 150000 }) => {
  const frame = useCurrentFrame();

  const opacity = frame >= startFrame && frame < endFrame ? 1 : 0;

  return (
    <Img
      name={name}
      src={src.startsWith("http") ? src : staticFile(src)}
      style={{
        opacity,
        ...style,
        translate: "-192px 29.2px",
        scale: 1.057,
      }}
    />
  );
};
