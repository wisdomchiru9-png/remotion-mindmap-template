import React from "react";
import { Composition, Folder } from "remotion";
import { AdditionalScenes } from "./scenes/AdditionalScenes";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Franklin-Audit">
      <Composition
        id="FranklinAuditVideo"
        component={AdditionalScenes}
        durationInFrames={10569}
        fps={30}
        width={1920}
        height={1080}
      />
    </Folder>
  );
};
