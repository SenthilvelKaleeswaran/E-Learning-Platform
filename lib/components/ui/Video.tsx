import React from "react";

export const Video: React.FC<{
  src: string;
  type?: string;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  captions?: {
    src: string;
    kind?: string;
    srcLang?: string;
    label?: string;
  };
  className?: string;
}> = ({ src, type = "video/mp4", controls = true, preload = "none", captions, className }) => {

  const isYouTubeUrl = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return regex.test(url);
  };

  const getYouTubeVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (isYouTubeUrl(src)) {
    const videoId = getYouTubeVideoId(src);
    if (!videoId) {
      console.error("Invalid YouTube URL:", src);
      return <div className="text-red-500">Invalid YouTube URL</div>;
    }

    return (
      <iframe
        className={`rounded-md w-full h-full ${className}`}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }

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
