"use client";

import { useState } from "react";
import Image from "next/image";
import { isValidHttpUrl } from "@/lib/validation";

// The first letter sits behind the photo, so it shows if the photo cannot load.
export default function UserAvatar({ name, image, size = 40 }) {
  const [broken, setBroken] = useState(false);
  const showPhoto = image && isValidHttpUrl(image) && !broken;

  return (
    <span
      style={{ width: size, height: size }}
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-semibold text-primary-content ring-2 ring-base-300"
    >
      {name?.charAt(0).toUpperCase() || "U"}
      {showPhoto && (
        <Image
          src={image}
          alt=""
          width={size}
          height={size}
          unoptimized
          onError={() => setBroken(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </span>
  );
}
