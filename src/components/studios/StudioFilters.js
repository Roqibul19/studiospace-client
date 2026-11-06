"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { STUDIO_CATEGORIES } from "@/lib/navigation";

const chipClass = (active) => `btn btn-sm ${active ? "btn-primary" : "btn-outline"}`;

// Without props this renders the filters with nothing selected. The page uses
// that as the Suspense fallback before the URL is known.
export function FilterControls({ category = "", search = "", pending, onChange }) {
  function handleSearch(event) {
    event.preventDefault();
    onChange?.({ category, search: new FormData(event.target).get("search") });
  }

  return (
    <div className="mt-8 space-y-4">
      <form onSubmit={handleSearch} role="search" className="flex gap-2">
        <label htmlFor="studio-search" className="sr-only">
          Search by studio name or location
        </label>
        <input
          key={search}
          id="studio-search"
          name="search"
          type="search"
          defaultValue={search}
          placeholder="Search by studio name or location"
          className="input min-w-0 flex-1"
        />
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <Search className="size-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          type="button"
          aria-pressed={!category}
          onClick={() => onChange?.({ category: "", search })}
          className={chipClass(!category)}
        >
          All Studios
        </button>
        {STUDIO_CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            aria-pressed={category === value}
            onClick={() => onChange?.({ category: value, search })}
            className={chipClass(category === value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function StudioFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function handleChange({ category, search }) {
    const query = new URLSearchParams();
    if (category) query.set("category", category);
    if (search?.trim()) query.set("search", search.trim());
    const suffix = query.size ? `?${query}` : "";

    startTransition(() => {
      router.replace(`/studios${suffix}`, { scroll: false });
    });
  }

  return (
    <FilterControls
      category={searchParams.get("category") ?? ""}
      search={searchParams.get("search") ?? ""}
      pending={pending}
      onChange={handleChange}
    />
  );
}
