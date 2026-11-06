import { BadgeCheck, Headphones, ShieldCheck, Wrench } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: "Liability Protection",
    text: "Security deposits and clear booking terms protect hosts and creators on every reservation.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Profiles",
    text: "Every host and creator signs in with a real account, so you know who you are working with.",
  },
  {
    icon: Wrench,
    title: "Equipment Safety",
    text: "Listings state the gear and amenities on site, so everything is accounted for before and after a session.",
  },
  {
    icon: Headphones,
    title: "24/7 Host Support",
    text: "Our support team is on hand day and night whenever a booking needs attention.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-base-200 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Peace of Mind"
          title="Host Guarantee & Creator Support"
          subtitle="Sharing a space takes trust. Here is how StudioSpace looks after both sides of every booking."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCES.map(({ icon: Icon, title, text }) => (
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
      </div>
    </section>
  );
}
