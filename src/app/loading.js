import { Aperture } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-3"
    >
      <Aperture className="size-12 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm font-medium text-base-content/70">
        Setting up the studio...
      </p>
    </div>
  );
}
