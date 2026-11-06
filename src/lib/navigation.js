export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
];

// `label` is what visitors read. `value` is what is stored in MongoDB and must
// match the CATEGORIES list in the server's routes/studios.js.
export const STUDIO_CATEGORIES = [
  { label: "Photo Studios", value: "Photo Studio" },
  { label: "Sound Stages", value: "Film Stage" },
  { label: "Podcast Rooms", value: "Podcast Lounge" },
  { label: "Music Suites", value: "Music Suite" },
  { label: "Art Workshops", value: "Workshop" },
];

export function categoryHref(value) {
  return `/studios?category=${encodeURIComponent(value)}`;
}
