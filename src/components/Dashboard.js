"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BellRing,
  CalendarCheck,
  CalendarClock,
  CloudOff,
  LayoutList,
  PlusCircle,
  Search,
} from "lucide-react";
import Notice from "@/components/Notice";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const QUICK_LINKS = [
  { label: "Add New Studio", href: "/add-studio", icon: PlusCircle },
  { label: "My Studio Listings", href: "/my-listings", icon: LayoutList },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarCheck },
  { label: "Explore Studios", href: "/studios", icon: Search },
];

function StatCard({ icon: Icon, label, value, href }) {
  return (
    <Link
      href={href}
      className="flex h-full items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5 transition-colors hover:border-primary"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <span>
        <span className="block font-display text-3xl font-bold">{value}</span>
        <span className="block text-sm text-base-content/70">{label}</span>
      </span>
    </Link>
  );
}

export default function Dashboard() {
  const { data: session } = authClient.useSession();
  const [stats, setStats] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let ignore = false;

    Promise.all([
      apiFetch("/studios/mine"),
      apiFetch("/bookings/mine"),
      apiFetch("/bookings/host"),
    ])
      .then(([studios, bookings, requests]) => {
        if (ignore) return;
        const active = ["Pending", "Confirmed"];
        setStats({
          listings: studios.length,
          bookings: bookings.length,
          upcoming: bookings.filter((item) => active.includes(item.status))
            .length,
          requests: requests.filter((item) => item.status === "Pending").length,
        });
        setLoadError(false);
      })
      .catch(() => {
        if (!ignore) setLoadError(true);
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loadError) {
    return (
      <Notice
        icon={CloudOff}
        title="We could not load your dashboard"
        text="Something went wrong on our side. Please try again in a moment."
        href="/"
        action="Back to Home"
      />
    );
  }

  return (
    <>
      <p className="mt-3 leading-relaxed text-base-content/70">
        {session?.user?.name ? `Welcome back, ${session.user.name}.` : "Welcome back."}{" "}
        Here is what is happening with your studios and bookings.
      </p>

      {stats ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={LayoutList}
            label="Studio listings"
            value={stats.listings}
            href="/my-listings"
          />
          <StatCard
            icon={BellRing}
            label="Requests to review"
            value={stats.requests}
            href="/my-listings"
          />
          <StatCard
            icon={CalendarCheck}
            label="All my bookings"
            value={stats.bookings}
            href="/my-bookings"
          />
          <StatCard
            icon={CalendarClock}
            label="Active bookings"
            value={stats.upcoming}
            href="/my-bookings"
          />
        </div>
      ) : (
        <div
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Loading your dashboard"
        >
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="skeleton h-24" />
          ))}
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Quick Actions</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className="btn btn-outline w-full">
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
