import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { formatTimeRange } from "@/lib/format";

const STATUS_CLASS = {
  Pending: "badge-warning",
  Confirmed: "badge-success",
  Completed: "badge-info",
  Cancelled: "badge-error",
};

export function BookingListSkeleton({ label }) {
  return (
    <div className="mt-8 space-y-4" aria-label={label}>
      <div className="skeleton h-40 w-full" />
      <div className="skeleton h-40 w-full" />
    </div>
  );
}

export default function BookingCard({ booking, extra, children }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-box border border-base-300 bg-base-100 sm:flex-row">
      <div className="relative aspect-[16/9] shrink-0 bg-base-300 sm:aspect-auto sm:w-52">
        <Image
          src={booking.studioImage}
          alt={booking.studioTitle}
          fill
          unoptimized
          sizes="(min-width: 640px) 208px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">
              <Link
                href={`/studios/${booking.studioId}`}
                className="hover:text-primary"
              >
                {booking.studioTitle}
              </Link>
            </h3>
            <span className={`badge font-medium ${STATUS_CLASS[booking.status]}`}>
              {booking.status}
            </span>
          </div>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-base-content/70">
            <CalendarDays className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {formatTimeRange(booking.startTime, booking.endTime)}
          </p>
          <p className="mt-1 flex items-start gap-1.5 text-sm text-base-content/70">
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {booking.studioLocation}
          </p>
          {extra}
          <p className="mt-2 font-bold">
            ${booking.totalCost}
            <span className="text-sm font-normal text-base-content/70">
              {" "}
              total for {booking.hours} {booking.hours === 1 ? "hour" : "hours"},
              including ${booking.securityDeposit} deposit
            </span>
          </p>
        </div>
        {children && (
          <div className="flex shrink-0 flex-wrap gap-2">{children}</div>
        )}
      </div>
    </article>
  );
}
