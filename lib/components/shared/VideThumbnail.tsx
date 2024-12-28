"use client";
import ImageContainer from "./ImageContainer";

const getYouTubeThumbnail = (videoUrl: any) => {
  const videoId = videoUrl.split("v=")[1]?.split("&")[0];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export const VideoThumbnail = ({ videoUrl,className }: any) => {
  const thumbnailUrl = getYouTubeThumbnail(videoUrl);

  return (
    <ImageContainer
      alt="Video Thumbnail"
      className={`w-64 h-48 object-cover rounded-md border ${className}`}
      src={thumbnailUrl}
    />
  );
};
