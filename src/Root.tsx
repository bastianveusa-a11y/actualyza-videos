import { Composition } from "remotion";
import { AmyReel } from "./AmyReel";
import { DEFAULT_CONFIG, CONFIG_ES } from "./types";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AmyReel-EN"
        component={AmyReel}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={DEFAULT_CONFIG}
      />
      <Composition
        id="AmyReel-ES"
        component={AmyReel}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={CONFIG_ES}
      />
    </>
  );
};
