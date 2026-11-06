import { CalendarClock, Search, Sparkles, Zap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const STEPS = [
  {
    icon: Search,
    title: "Discover Spaces",
    text: "Filter by category and location to find a room that suits your project.",
  },
  {
    icon: CalendarClock,
    title: "Select Shoot Hours",
    text: "Pick your date and time, and see the full price before you commit.",
  },
  {
    icon: Zap,
    title: "Book Instantly",
    text: "Send your reservation in a few clicks and track it in My Bookings.",
  },
  {
    icon: Sparkles,
    title: "Create & Produce",
    text: "Arrive, set up and make your best work in a space built for it.",
  },
];

export default function HowBookingWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Simple Process"
        title="How Booking Works"
        subtitle="From first search to final take in four easy steps."
      />
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text }, index) => (
          <li
            key={title}
            className="flex h-full flex-col rounded-box border border-base-300 bg-base-100 p-6"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-content">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span
                className="font-display text-4xl font-bold text-base-content/20"
                aria-hidden="true"
              >
                {index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold">
              <span className="sr-only">Step {index + 1}: </span>
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-base-content/70">
              {text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
