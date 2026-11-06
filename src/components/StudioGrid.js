import StudioCard, { StudioCardSkeleton } from "@/components/StudioCard";

const GRID_CLASS = "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

export default function StudioGrid({ studios }) {
  return (
    <div className={GRID_CLASS}>
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}

export function StudioGridSkeleton({ label = "Loading studios" }) {
  return (
    <div className={GRID_CLASS} aria-label={label}>
      {Array.from({ length: 6 }, (_, index) => (
        <StudioCardSkeleton key={index} />
      ))}
    </div>
  );
}
