"use client";

import { useState } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";
import { cn } from "@/lib/utils";

type SanityImage = { asset?: { _ref?: string; url?: string }; alt?: string } | string | null | undefined;

function resolveImageUrl(source: SanityImage): string | undefined {
  if (!source) return undefined;
  if (typeof source === "string") return source;
  if (source.asset) {
    try {
      return urlForImage(source).url();
    } catch {
      return undefined;
    }
  }
  return undefined;
}

export default function MediaAsset({
  image,
  video,
  alt = "",
  className,
  priority = false,
  controls = false,
  autoPlay = true,
  objectPosition,
}: {
  image?: SanityImage;
  video?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  objectPosition?: string;
}) {
  const imageUrl = resolveImageUrl(image);
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  if (video && !videoFailed) {
    return (
      <video
        src={video}
        poster={imageUrl}
        className={cn("h-full w-full object-cover", className)}
        style={objectPosition ? { objectPosition } : undefined}
        autoPlay={autoPlay}
        loop
        muted
        playsInline
        controls={controls}
        preload={autoPlay ? "auto" : "metadata"}
        aria-label={alt}
        onError={() => setVideoFailed(true)}
      />
    );
  }

  if (imageUrl && !imageFailed) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        priority={priority}
        className={cn("object-cover", className)}
        style={objectPosition ? { objectPosition } : undefined}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return null;
}