import { Suspense } from "react";
import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import { CloudOff, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import StudioCard, { StudioCardSkeleton } from "@/components/StudioCard";
import { getFeaturedStudios } from "@/lib/studios";

const GRID_CLASS = "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

function Notice({ icon: Icon, title, text, href, action }) {
  return (
    <div className="mt-10 rounded-box border border-dashed border-base-300 px-6 py-14 text-center">
      <Icon className="mx-auto size-10 text-primary" aria-hidden="true" />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-base-content/70">{text}</p>
      <Link href={href} className="btn btn-primary mt-6">
        {action}
      </Link>
    </div>
  );
}

async function FeaturedList() {
  let studios;
  try {
    studios = await getFeaturedStudios();
  } catch (error) {
    // Next.js uses thrown errors for its own rendering signals. Pass those on.
    unstable_rethrow(error);
    console.error(error);
    return (
      <Notice
        icon={CloudOff}
        title="We could not load the studios"
        text="Something went wrong on our side. Please try again in a moment."
        href="/studios"
        action="Explore Studios"
      />
    );
  }

  if (studios.length === 0) {
    return (
      <Notice
        icon={Sparkles}
        title="No studios yet"
        text="Be the first host on StudioSpace and share your creative space with the community."
        href="/add-studio"
        action="Add New Studio"
      />
    );
  }

  return (
    <div className={GRID_CLASS}>
      {studios.map((studio) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className={GRID_CLASS} aria-label="Loading featured studios">
      {Array.from({ length: 6 }, (_, index) => (
        <StudioCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default function FeaturedStudios() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Top Rated"
        title="Featured Studios"
        subtitle="The spaces creators love most right now, from sunlit cyc walls to fully equipped sound stages."
      />
      <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedList />
      </Suspense>
    </section>
  );
}
