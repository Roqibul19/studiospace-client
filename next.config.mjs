/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The browser only ever talks to this site, so the HTTPOnly JWT cookie is
  // first-party and still reaches Express when the two are hosted separately.
  async rewrites() {
    const serverUrl = process.env.SERVER_URL || "http://localhost:5000";
    return [
      {
        source: "/api/server/:path*",
        destination: `${serverUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
