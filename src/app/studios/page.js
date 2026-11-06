import { Suspense } from "react";
import { unstable_rethrow } from "next/navigation";
import { CloudOff, SearchX, Sparkles } from "lucide-react";
import Notice from "@/components/Notice";
import StudioGrid, { StudioGridSkeleton } from "@/components/StudioGrid";
import StudioFilters, { FilterControls } from "@/components/studios/StudioFilters";
import { getStudios } from "@/lib/studios";

export const metadata = {
  title: "Explore Studios",
  description:
    "Browse photo studios, film stages, podcast lounges, music suites and art workshops available to book by the hour.",
};

const firstValue = (value) => (typeof value === "string" ? value : "");

async function StudioResults({ searchParams }) {
  const params = await searchParams;
  const category = firstValue(params.category);
  const search = firstValue(params.search).trim();

  let studios;
  try {
    studios = await getStudios({ category, search });
  } catch (error) {
    // Next.js uses thrown errors for its own rendering signals. Pass those on.
    unstable_rethrow(error);
    console.error(error);
    return (
      <Notice
        icon={CloudOff}
        title="We could not load the studios"
        text="Something went wrong on our side. Please try again in a moment."
        href="/"
        action="Back to Home"
      />
    );
  }

  if (studios.length === 0) {
    return category || search ? (
      <Notice
        icon={SearchX}
        title="No studios match your search"
        text="Try a different name or location, or clear your filters to see every space."
        href="/studios"
        action="Clear Filters"
      />
    ) : (
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
    <>
      <p className="mt-6 text-sm text-base-content/70" role="status">
        {studios.length} {studios.length === 1 ? "studio" : "studios"} found
      </p>
      <StudioGrid studios={studios} />
    </>
  );
}

export default function ExploreStudiosPage({ searchParams }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-4xl font-bold sm:text-5xl">Explore Studios</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-base-content/70">
        Find the right room for your next shoot, session or class, and book it
        by the hour.
      </p>

      <Suspense fallback={<FilterControls />}>
        <StudioFilters />
      </Suspense>

      <Suspense fallback={<StudioGridSkeleton />}>
        <StudioResults searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
