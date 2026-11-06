import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
};

function EmptyStageIllustration() {
  return (
    <svg
      viewBox="0 0 320 220"
      className="mx-auto w-full max-w-sm"
      role="img"
      aria-label="A spotlight shining on an empty stool on a studio stage"
    >
      {/* The spotlight beam */}
      <path d="M150 42 40 186h200L170 42Z" className="fill-accent/25" />
      {/* The stage floor */}
      <ellipse cx="140" cy="186" rx="104" ry="14" className="fill-accent/40" />
      <rect x="10" y="199" width="300" height="5" rx="2.5" className="fill-base-300" />
      {/* The light on its rig */}
      <rect x="60" y="8" width="200" height="6" rx="3" className="fill-base-content/70" />
      <rect x="156" y="14" width="8" height="12" className="fill-base-content/70" />
      <path d="M142 26h36l6 18h-48Z" className="fill-base-content" />
      {/* The empty stool */}
      <ellipse cx="140" cy="128" rx="30" ry="7" className="fill-primary" />
      <path
        d="m118 133-12 54M162 133l12 54M140 135v52M113 162h54"
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-base-content/80"
      />
      {/* A clapperboard resting by the stool */}
      <g transform="translate(232 148)">
        <rect y="10" width="52" height="34" rx="3" className="fill-base-content" />
        <rect y="0" width="52" height="9" rx="2" className="fill-primary" />
        <text
          x="26"
          y="33"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          className="fill-base-100"
        >
          404
        </text>
      </g>
    </svg>
  );
}

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <EmptyStageIllustration />
      <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-primary">
        Error 404
      </p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
        This set is empty
      </h1>
      <p className="mt-4 leading-relaxed text-base-content/70">
        The page you are looking for has wrapped, moved or never made it past
        the first take.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Return to Home
      </Link>
    </section>
  );
}
