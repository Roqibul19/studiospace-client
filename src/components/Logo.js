import Link from "next/link";
import { Aperture } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="StudioSpace home"
      className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight"
    >
      <Aperture className="size-7 text-primary" aria-hidden="true" />
      <span>StudioSpace</span>
    </Link>
  );
}
