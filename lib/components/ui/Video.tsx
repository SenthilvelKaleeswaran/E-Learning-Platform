import { VideoProps } from "@/types";
import React from "react";

export const Video: React.FC<VideoProps> = ({
  src,
  type = "video/mp4",
  width = 30,
  height = 20,
  controls = true,
  preload = "none",
  captions,
  className,
}) => {
  return (
    <div className={`w-full aspect-auto ${className}`}>
      <video
        controls={controls}
        preload={preload}
        className="rounded-md w-full h-auto"
      >
        <source src={src} type={type} />
        {captions && (
          <track
            src={captions.src}
            kind={captions.kind || "subtitles"}
            srcLang={captions.srcLang || "en"}
            label={captions.label || "English"}
          />
        )}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
