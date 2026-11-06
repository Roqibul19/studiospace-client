"use client";

import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GallerySlide from "@/components/studios/GallerySlide";

export default function GallerySwiper({ images, title }) {
  return (
    <Swiper
      modules={[A11y, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
    >
      {images.map((src, index) => (
        <SwiperSlide key={src}>
          <GallerySlide
            src={src}
            alt={`${title}, photo ${index + 1} of ${images.length}`}
            priority={index === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
