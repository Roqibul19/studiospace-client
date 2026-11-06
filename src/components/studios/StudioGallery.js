"use client";

import dynamic from "next/dynamic";
import GallerySlide from "@/components/studios/GallerySlide";

// Swiper reads the current time when it starts, so it only runs in the browser.
// A skeleton of the same size holds the space until it is ready.
const GallerySwiper = dynamic(
  () => import("@/components/studios/GallerySwiper"),
  {
    ssr: false,
    loading: () => <div className="skeleton aspect-[16/10] rounded-none" />,
  },
);

export default function StudioGallery({ images, title }) {
  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-box">
        <GallerySlide src={images[0]} alt={title} priority />
      </div>
    );
  }

  return (
    <div className="studio-gallery overflow-hidden rounded-box">
      <GallerySwiper images={images} title={title} />
    </div>
  );
}
