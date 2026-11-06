import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold sm:text-6xl">
        Creative spaces, ready when you are.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-base-content/70">
        Find a photo studio, film stage, podcast lounge or music suite near you
        and book it by the hour.
      </p>
      <Link href="/studios" className="btn btn-primary mt-8">
        Explore Studios
      </Link>
    </section>
  );
}
