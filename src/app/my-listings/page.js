import Link from "next/link";
import { Plus } from "lucide-react";
import MyListings from "@/components/studios/MyListings";

export const metadata = { title: "My Studio Listings" };

export default function MyListingsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">My Studio Listings</h1>
          <p className="mt-3 leading-relaxed text-base-content/70">
            Update the details of your spaces or remove the ones you no longer
            host.
          </p>
        </div>
        <Link href="/add-studio" className="btn btn-primary">
          <Plus className="size-4" aria-hidden="true" />
          Add New Studio
        </Link>
      </div>
      <MyListings />
    </section>
  );
}
