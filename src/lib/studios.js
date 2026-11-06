import { cache } from "react";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

// For Server Components only. The browser reaches Express through /api/server.
async function fetchJson(path, label) {
  const response = await fetch(`${SERVER_URL}/api/studios${path}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Could not load ${label} (${response.status})`);
  }
  return response.json();
}

export function getFeaturedStudios() {
  return fetchJson("/featured", "featured studios");
}

export function getStudios({ category, search } = {}) {
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (search) query.set("search", search);
  const suffix = query.size ? `?${query}` : "";
  return fetchJson(suffix, "studios");
}

// Returns null when the id is invalid or no such studio exists. cache() lets
// the page and its metadata share one request.
export const getStudio = cache(async (id) => {
  const response = await fetch(
    `${SERVER_URL}/api/studios/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );
  if (response.status === 400 || response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Could not load the studio (${response.status})`);
  }
  return response.json();
});
