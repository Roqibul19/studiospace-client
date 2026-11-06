import Image from "next/image";
import Link from "next/link";

const photo = (id) =>
  `https://images.unsplash.com/photo-${id}?w=1920&q=75&auto=format&fit=crop`;

export const SLIDES = [
  {
    image: photo("1527011046414-4781f1f94f8c"),
    alt: "A white photo studio with softbox lights and plants",
    eyebrow: "Photo Studios & Film Stages",
    title: "Find the perfect light for your next shoot.",
    text: "Book cyc walls, portrait lofts and full sound stages by the hour, with prices you can see up front.",
  },
  {
    image: photo("1598488035139-bdbb2231ce04"),
    alt: "A recording studio with a mixing desk and guitars on the wall",
    eyebrow: "Music Suites",
    title: "Your next record starts in a room like this.",
    text: "Step into tuned rooms with pro consoles, vocal booths and instruments that are ready to play.",
  },
  {
    image: photo("1590602847861-f357a9332bbc"),
    alt: "A broadcast microphone on an arm in a podcast studio",
    eyebrow: "Podcast Lounges",
    title: "Sound great from your very first episode.",
    text: "Sit down in a treated lounge with broadcast microphones and cameras already set up for you.",
  },
];

export default function HeroSlide({ slide, isFirst = false }) {
  const Heading = isFirst ? "h1" : "h2";

  return (
    <div className="relative flex min-h-[32rem] items-center bg-neutral lg:min-h-[38rem]">
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        unoptimized
        priority={isFirst}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-16">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-300">
            {slide.eyebrow}
          </p>
          <Heading className="mt-3 text-4xl font-bold leading-tight sm:text-6xl">
            {slide.title}
          </Heading>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            {slide.text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/studios" className="btn btn-primary">
              Explore Studios
            </Link>
            <Link
              href="/studios"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-neutral"
            >
              Host Your Space
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
