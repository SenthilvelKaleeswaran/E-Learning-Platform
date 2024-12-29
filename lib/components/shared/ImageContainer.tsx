"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PreviewFallback from "@/public/no-preview.png";
import NoImageFallback from "@/public/no-image.jpg";

export default function ImageContainer({ className, src, ...rest }: any) {
  const [imageSrc, setImageSrc] = useState(src || NoImageFallback);

  const handleImageError = () => {
    setImageSrc(PreviewFallback);
  };

  useEffect(()=>{setImageSrc(src)},[src])

  return (
    <Image
      alt="Image preview"
      width={500}
      height={500}
      className={`w-48 h-48 object-fill rounded-md border flex ${className}`}
      {...rest}
      src={imageSrc}
      onError={handleImageError}
    />
  );
}
