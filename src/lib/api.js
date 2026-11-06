// For Client Components. Requests go through this site's /api/server rewrite, so
// the browser sends the HTTPOnly JWT cookie automatically.
export async function apiFetch(path, { method = "GET", body } = {}) {
  const response = await fetch(`/api/server${path}`, {
    method,
    cache: "no-store",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // The server was unreachable or did not send JSON.
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || "Something went wrong. Please try again.",
    );
    error.status = response.status;
    throw error;
  }
  return data;
}
