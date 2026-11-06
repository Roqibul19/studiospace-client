const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

// For Server Components only. The browser reaches Express through /api/server.
export async function getFeaturedStudios() {
  const response = await fetch(`${SERVER_URL}/api/studios/featured`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Could not load featured studios (${response.status})`);
  }
  return response.json();
}
