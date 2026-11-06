"use client";

import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroSlide, { SLIDES } from "@/components/home/HeroSlide";

export default function HeroSwiper() {
  return (
    <Swiper
      modules={[A11y, Autoplay, Navigation, Pagination]}
      loop
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
    >
      {SLIDES.map((slide, index) => (
        <SwiperSlide key={slide.title}>
          <HeroSlide slide={slide} isFirst={index === 0} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
