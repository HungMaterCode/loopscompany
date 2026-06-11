"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinary";

type Props = Omit<ImageProps, "src"> & {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
};

export function CloudinaryImage({
  src,
  width = 1200,
  height = 800,
  quality = 80,
  alt,
  ...props
}: Props) {
  const optimized = cloudinaryUrl(src, { width, height, quality });

  return (
    <Image
      src={optimized}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
