import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

export function StudioCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="skeleton aspect-[4/3] rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="skeleton h-6 w-4/5" />
        <div className="skeleton h-4 w-3/5" />
        <div className="skeleton h-5 w-1/3" />
        <div className="skeleton mt-2 h-10 w-full" />
      </div>
    </div>
  );
}

export default function StudioCard({ studio }) {
  const rating = Number(studio.rating) || 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-base-300">
        {/* Hosts can use any image address, so these skip Next.js optimisation. */}
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="badge absolute left-3 top-3 border-0 bg-base-100 font-medium text-base-content shadow">
          {studio.category}
        </span>
        <span className="badge absolute right-3 top-3 gap-1 border-0 bg-neutral font-medium text-neutral-content shadow">
          <Star className="size-3.5 fill-accent text-accent" aria-hidden="true" />
          {rating > 0 ? rating.toFixed(1) : "New"}
          <span className="sr-only">{rating > 0 ? "out of 5" : "listing"}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-14 text-lg font-semibold leading-7">
          {studio.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-base-content/70">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{studio.location}</span>
        </p>
        <p className="mt-3 text-lg font-bold">
          ${studio.hourlyRate}
          <span className="text-sm font-normal text-base-content/70"> / hr</span>
        </p>
        <Link
          href={`/studios/${studio._id}`}
          aria-label={`View details for ${studio.title}`}
          className="btn btn-primary mt-4 w-full"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
