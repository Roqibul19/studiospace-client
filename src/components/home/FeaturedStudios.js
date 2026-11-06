import { Suspense } from "react";
import { unstable_rethrow } from "next/navigation";
import { CloudOff, Sparkles } from "lucide-react";
import Notice from "@/components/Notice";
import SectionHeading from "@/components/SectionHeading";
import StudioGrid, { StudioGridSkeleton } from "@/components/StudioGrid";
import { getFeaturedStudios } from "@/lib/studios";

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

  return <StudioGrid studios={studios} />;
}

export default function FeaturedStudios() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Top Rated"
        title="Featured Studios"
        subtitle="The spaces creators love most right now, from sunlit cyc walls to fully equipped sound stages."
      />
      <Suspense
        fallback={<StudioGridSkeleton label="Loading featured studios" />}
      >
        <FeaturedList />
      </Suspense>
    </section>
  );
}
