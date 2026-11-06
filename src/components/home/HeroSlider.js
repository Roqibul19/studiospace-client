"use client";

import dynamic from "next/dynamic";
import HeroSlide, { SLIDES } from "@/components/home/HeroSlide";

// Swiper reads the current time when it starts, so it only runs in the browser.
// The first slide shows until the slider is ready, so the page does not jump.
const HeroSwiper = dynamic(() => import("@/components/home/HeroSwiper"), {
  ssr: false,
  loading: () => <HeroSlide slide={SLIDES[0]} isFirst />,
});

export default function HeroSlider() {
  return (
    <section aria-label="Featured spaces" className="hero-slider">
      <HeroSwiper />
    </section>
  );
}
