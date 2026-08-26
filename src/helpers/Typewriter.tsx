import React from "react";
import { COLORS } from "./constants";
import { Interactive, useCurrentFrame } from "remotion";
interface AnimatedTextProps {
  frame?: number;
  text: string;
  startFrame?: number;
  endFrame?: number;
  speed?: number; // frames per character (old Typewriter used 3)
  fontSize?: number;
  color?: string;
  cursorColor?: string;
  highlight?: string[]; // exact substrings to color in accent
  highlightColor?: string;
  align?: "left" | "center" | "right";
  pauseAfter?: string[];
}

export function Typewriter({
  frame: frameProp,
  text,
  startFrame = 0,
  endFrame = 150000,
  speed = 2,
  fontSize = 24,
  color = COLORS.text,
  cursorColor = COLORS.accent,
  highlight = [],
  highlightColor = COLORS.accent,
  align = "left",
  pauseAfter = [],
}: AnimatedTextProps): React.ReactNode {
  function findPausePositions(text: string, pauseAfter: string[]): Set<number> {
    const positions = new Set<number>();
    for (const word of pauseAfter) {
      let idx = text.indexOf(word);
      while (idx !== -1) {
        positions.add(idx + word.length - 1); // pause after last char of word
        idx = text.indexOf(word, idx + 1);
      }
    }
    return positions;
  }

  const pausePositions =
    pauseAfter.length > 0
      ? findPausePositions(text, pauseAfter)
      : new Set<number>();

  let frameOffset = 0;
  const charFrames: number[] = [];
  for (let i = 0; i < text.length; i++) {
    charFrames.push(frameOffset);
    frameOffset += speed;
    if (pausePositions.has(i)) {
      frameOffset += 30;
    }
  }

  const frameFromHook = useCurrentFrame();
  const frame = frameProp ?? frameFromHook;
  const parentOpacity = frame >= endFrame ? 0 : 1;
  const localFrame = Math.max(0, frame - startFrame);
  //const charsShown = Math.floor(localFrame / speed);
  const charsShown =
    frame === 0
      ? text.length
      : charFrames.filter((f) => f <= localFrame).length - 1;
  const start = Number(Math.floor(charsShown / 120).toFixed(0));
  const textToShow =
    frame === 0
      ? text
      : text.slice(start * 120, start * 120 + (charsShown % 120));
  const done = frame === 0 ? true : textToShow.length === text.length;
  const cursorShown =
    localFrame <= 0
      ? false
      : done
        ? Math.floor(localFrame / 10) % 2 === 1
        : true;

  const segments = splitWithHighlights(textToShow, highlight);
  return (
    <>
      <Interactive.Div
        style={{
          fontFamily: "sans-serif",
          fontSize,
          color,
          textAlign: align,
          translate: "129px 151.3px",
          scale: 1.152,
          opacity: parentOpacity,
          rotate: "-0.2deg",
          height: "100px",
          width: "600px",
        }}
        from={-2}
      >
        {segments.map((seg, i) => (
          <span
            key={i}
            style={{
              color: seg.highlighted ? highlightColor : color,
              fontWeight: seg.highlighted ? 700 : 400,
            }}
          >
            {seg.text}
          </span>
        ))}
        <span
          style={{
            display: "inline-block",
            width: 3,
            height: fontSize * 1.15,
            backgroundColor: cursorColor, // was hardcoded "black" — invisible on dark bg
            verticalAlign: "middle",
            marginLeft: 4,
            opacity: Number(cursorShown),
          }}
        />
      </Interactive.Div>
    </>
  );
}

function splitWithHighlights(text: string, highlights: string[]) {
  if (highlights.length === 0) return [{ text, highlighted: false }];
  const pattern = new RegExp(`(${highlights.map(escapeRegex).join("|")})`, "g");
  return text
    .split(pattern)
    .filter(Boolean)
    .map((p) => ({ text: p, highlighted: highlights.includes(p) }));
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
