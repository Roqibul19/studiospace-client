import Image from "next/image";

export default function GallerySlide({ src, alt, priority = false }) {
  return (
    <div className="relative aspect-[16/10] bg-base-300">
      {/* Hosts can use any image address, so this skips Next.js optimisation. */}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}
