import Link from "next/link";
import { CheckCircle2, ClipboardList, Warehouse } from "lucide-react";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowBookingWorks from "@/components/home/HowBookingWorks";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "How It Works",
  description:
    "See how creators book studios by the hour and how hosts list and manage their spaces on StudioSpace.",
};

const HOST_STEPS = [
  {
    icon: Warehouse,
    title: "List Your Space",
    text: "Add photos, your hourly rate, security deposit, capacity and amenities.",
  },
  {
    icon: ClipboardList,
    title: "Review Requests",
    text: "New reservations arrive as Pending in your Booking Requests list.",
  },
  {
    icon: CheckCircle2,
    title: "Confirm the Booking",
    text: "Confirm a request and that time is blocked for everyone else.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 pt-12 text-center sm:px-6 lg:pt-16">
        <h1 className="text-4xl font-bold sm:text-5xl">How It Works</h1>
        <p className="mt-4 leading-relaxed text-base-content/70">
          StudioSpace connects creators who need a room with hosts who have one.
          Here is how each side of a booking works.
        </p>
      </section>

      <HowBookingWorks />

      <section className="bg-base-200 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="For Hosts"
            title="Share Your Space in Three Steps"
            subtitle="Turn your quiet hours into income, and stay in control of who books your space and when."
          />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {HOST_STEPS.map(({ icon: Icon, title, text }) => (
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
          </ol>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/studios" className="btn btn-primary">
              Explore Studios
            </Link>
            <Link href="/add-studio" className="btn btn-outline">
              Add New Studio
            </Link>
          </div>
        </div>
      </section>

      <HostGuarantee />
    </>
  );
}
