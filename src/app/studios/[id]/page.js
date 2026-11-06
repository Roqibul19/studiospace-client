import { Suspense } from "react";
import Link from "next/link";
import { notFound, unstable_rethrow } from "next/navigation";
import {
  ArrowLeft,
  Check,
  CloudOff,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Notice from "@/components/Notice";
import UserAvatar from "@/components/UserAvatar";
import BookWorkspaceButton from "@/components/studios/BookWorkspaceButton";
import StudioGallery from "@/components/studios/StudioGallery";
import { getStudio } from "@/lib/studios";

export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const studio = await getStudio(id);
    if (!studio) return { title: "Studio Not Found" };
    return { title: studio.title, description: studio.overview };
  } catch (error) {
    unstable_rethrow(error);
    return { title: "Studio Details" };
  }
}

function RatingText({ rating, reviewCount }) {
  if (!rating) return <span>New listing</span>;
  return (
    <span>
      {rating.toFixed(1)} ({reviewCount}{" "}
      {reviewCount === 1 ? "review" : "reviews"})
    </span>
  );
}

function FactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="flex items-center gap-2 text-sm text-base-content/70">
        <Icon className="size-4 shrink-0" aria-hidden="true" />
        {label}
      </dt>
      <dd className="text-right text-sm font-semibold">{value}</dd>
    </div>
  );
}

function Reviews({ reviews }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="mt-3 text-base-content/70">
          No reviews yet. Book this space and be the first to share your
          experience.
        </p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <li
              key={`${review.name}-${review.comment}`}
              className="flex h-full flex-col rounded-box border border-base-300 p-5"
            >
              <div className="flex items-center gap-3">
                <UserAvatar name={review.name} size={36} />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{review.name}</p>
                  <p className="flex items-center gap-1 text-sm text-base-content/70">
                    <Star
                      className="size-3.5 fill-accent text-accent"
                      aria-hidden="true"
                    />
                    {Number(review.rating).toFixed(1)}
                    <span className="sr-only">out of 5</span>
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-base-content/80">
                {review.comment}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

async function StudioDetails({ params }) {
  const { id } = await params;

  let studio;
  try {
    studio = await getStudio(id);
  } catch (error) {
    // Next.js uses thrown errors for its own rendering signals. Pass those on.
    unstable_rethrow(error);
    console.error(error);
    return (
      <Notice
        icon={CloudOff}
        title="We could not load this studio"
        text="Something went wrong on our side. Please try again in a moment."
        href="/studios"
        action="Back to Studios"
      />
    );
  }

  if (!studio) notFound();

  const images = [...new Set([studio.image, ...(studio.gallery ?? [])])];
  const amenities = studio.amenities ?? [];
  const reviews = studio.reviews ?? [];
  const rating = Number(studio.rating) || 0;

  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-3">
      <div className="min-w-0 lg:col-span-2">
        <StudioGallery images={images} title={studio.title} />

        <span className="badge badge-primary mt-6 font-medium">
          {studio.category}
        </span>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{studio.title}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-base-content/70">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {studio.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Star
              className="size-4 fill-accent text-accent"
              aria-hidden="true"
            />
            <RatingText rating={rating} reviewCount={reviews.length} />
          </span>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-base-content/80">
            {studio.overview}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Amenities</h2>
          {amenities.length === 0 ? (
            <p className="mt-3 text-base-content/70">
              The host has not listed any amenities yet.
            </p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-2">
                  <Check
                    className="size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {amenity}
                </li>
              ))}
            </ul>
          )}
        </section>

        <Reviews reviews={reviews} />
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-box border border-base-300 bg-base-200 p-6">
          <p className="text-3xl font-bold">
            ${studio.hourlyRate}
            <span className="text-base font-normal text-base-content/70">
              {" "}
              / hr
            </span>
          </p>
          <dl className="mt-4 divide-y divide-base-300 border-y border-base-300">
            <FactRow
              icon={ShieldCheck}
              label="Security Deposit"
              value={`$${studio.securityDeposit}`}
            />
            <FactRow
              icon={Users}
              label="Max Capacity"
              value={`${studio.maxCapacity} ${
                studio.maxCapacity === 1 ? "person" : "people"
              }`}
            />
            <FactRow icon={MapPin} label="Location" value={studio.location} />
          </dl>
          <BookWorkspaceButton
            studio={{
              _id: studio._id,
              title: studio.title,
              hourlyRate: studio.hourlyRate,
              securityDeposit: studio.securityDeposit,
              ownerEmail: studio.ownerEmail,
            }}
          />
        </div>

        <div className="mt-6 rounded-box border border-base-300 p-6">
          <h2 className="text-lg font-bold">Your Host</h2>
          <div className="mt-4 flex items-center gap-3">
            <UserAvatar name={studio.ownerName} image={studio.ownerImage} size={48} />
            <div className="min-w-0">
              <p className="truncate font-semibold">{studio.ownerName}</p>
              <p className="truncate text-sm text-base-content/70">
                {studio.ownerEmail}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-3" aria-label="Loading studio">
      <div className="lg:col-span-2">
        <div className="skeleton aspect-[16/10] w-full" />
        <div className="skeleton mt-6 h-6 w-28" />
        <div className="skeleton mt-3 h-10 w-3/4" />
        <div className="skeleton mt-3 h-5 w-1/2" />
        <div className="skeleton mt-8 h-32 w-full" />
      </div>
      <div className="skeleton h-80 w-full" />
    </div>
  );
}

export default function StudioDetailsPage({ params }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/studios"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-base-content/70 hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Studios
      </Link>
      <Suspense fallback={<DetailsSkeleton />}>
        <StudioDetails params={params} />
      </Suspense>
    </div>
  );
}
