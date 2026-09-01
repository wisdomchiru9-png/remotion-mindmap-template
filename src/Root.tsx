import React from "react";
import { Composition, Folder, staticFile } from "remotion";
import MindmapZoom, { TOTAL_DURATION } from "./helpers/MindmapZoom";
import { HookTitle } from "./scenes/HookTitle";
import { ClosingCTA } from "./scenes/ClosingCTA";
import { FinalSequence, FINAL_SEQUENCE_DURATION } from "./scenes/FinalSequence";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Franklin-Part-1">
      {/* MindmapZoom - Individual composition for testing */}
      <Composition
        id="MindmapZoom-1920x1080"
        component={MindmapZoom}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          MindmapImageSrc: staticFile("Franklin-Mindmap-1.webp"),
        }}
      />

      {/* HookTitle - Individual composition for testing */}
      <Composition
        id="HookTitle"
        component={HookTitle as any}
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

      {/* ClosingCTA - Individual composition for testing */}
      <Composition
        id="ClosingCTA"
        component={ClosingCTA as any}
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
        id="Franklin-Part-1-Session-Video"
        component={FinalSequence}
        durationInFrames={FINAL_SEQUENCE_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
  );
};
