import Link from "next/link";
import { Handshake, Lightbulb, Scale } from "lucide-react";
import BrowseCategories from "@/components/home/BrowseCategories";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "About Us",
  description:
    "StudioSpace helps creators find the right room and helps studio owners share their spaces.",
};

const VALUES = [
  {
    icon: Lightbulb,
    title: "Creators First",
    text: "Great work needs the right room. We make that room easy to find, compare and book.",
  },
  {
    icon: Scale,
    title: "Clear Pricing",
    text: "Hourly rates and security deposits are shown up front, before you send a request.",
  },
  {
    icon: Handshake,
    title: "Fair for Hosts",
    text: "Hosts decide which requests to confirm, and a confirmed time stays theirs to honour.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:py-16">
        <h1 className="text-4xl font-bold sm:text-5xl">About StudioSpace</h1>
        <p className="mt-4 text-lg leading-relaxed text-base-content/70">
          Many creative spaces sit empty for hours, while photographers, film
          makers, podcasters and musicians struggle to find a room they can
          afford. StudioSpace brings them together, so a space can be shared by
          the hour instead of rented by the month.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <SectionHeading eyebrow="What We Believe" title="Our Values" />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex h-full flex-col rounded-box border border-base-300 bg-base-100 p-6"
            >
              <Icon className="size-8 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70">
                {text}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link href="/studios" className="btn btn-primary">
            Explore Studios
          </Link>
        </div>
      </section>

      <BrowseCategories />
    </>
  );
}
