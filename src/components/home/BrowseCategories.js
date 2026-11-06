import Link from "next/link";
import { Camera, Clapperboard, Mic, Music, Palette } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { STUDIO_CATEGORIES, categoryHref } from "@/lib/navigation";

const CATEGORY_DETAILS = {
  "Photo Studio": { icon: Camera, text: "Cyc walls and portrait lofts" },
  "Film Stage": { icon: Clapperboard, text: "Soundproofed shooting stages" },
  "Podcast Lounge": { icon: Mic, text: "Treated rooms and broadcast mics" },
  "Music Suite": { icon: Music, text: "Recording and rehearsal rooms" },
  Workshop: { icon: Palette, text: "Bright spaces to make art" },
};

export default function BrowseCategories() {
  return (
    <section className="bg-base-200 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Browse"
          title="Browse by Studio Category"
          subtitle="Tell us what you are making and we will show you the rooms built for it."
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {STUDIO_CATEGORIES.map(({ label, value }, index) => {
            const { icon: Icon, text } = CATEGORY_DETAILS[value];
            const isLast = index === STUDIO_CATEGORIES.length - 1;
            return (
              <li key={value} className={isLast ? "col-span-2 md:col-span-1" : ""}>
                <Link
                  href={categoryHref(value)}
                  className="group flex h-full flex-col items-center rounded-box border border-base-300 bg-base-100 p-5 text-center transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
                >
                  <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-content">
                    <Icon className="size-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold">{label}</h3>
                  <p className="mt-1 text-sm text-base-content/70">{text}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
