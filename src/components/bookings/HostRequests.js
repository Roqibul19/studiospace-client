"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { toast } from "sonner";
import BookingCard, {
  BookingListSkeleton,
} from "@/components/bookings/BookingCard";
import { apiFetch } from "@/lib/api";

export default function HostRequests() {
  const [bookings, setBookings] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    let ignore = false;

    apiFetch("/bookings/host")
      .then((result) => {
        if (ignore) return;
        setBookings(result);
        setLoadError(false);
      })
      .catch(() => {
        if (!ignore) setLoadError(true);
      });

    return () => {
      ignore = true;
    };
  }, []);

  async function respond(booking, action, successMessage) {
    setBusyId(booking._id);
    try {
      const updated = await apiFetch(`/bookings/${booking._id}/${action}`, {
        method: "PATCH",
      });
      setBookings((current) =>
        current.map((item) => (item._id === updated._id ? updated : item)),
      );
      toast.success(successMessage);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold">Booking Requests</h2>
      <p className="mt-2 leading-relaxed text-base-content/70">
        Reservations creators have made for your studios. A confirmed booking
        blocks that time for everyone else.
      </p>

      {loadError && (
        <p role="alert" className="mt-6 text-error">
          We could not load your booking requests. Please try again in a moment.
        </p>
      )}

      {!loadError && !bookings && (
        <BookingListSkeleton label="Loading booking requests" />
      )}

      {bookings?.length === 0 && (
        <p className="mt-6 rounded-box border border-dashed border-base-300 px-6 py-10 text-center text-base-content/70">
          No booking requests yet. They will appear here as soon as a creator
          books one of your studios.
        </p>
      )}

      {bookings?.length > 0 && (
        <div className="mt-8 space-y-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              extra={
                <p className="mt-1 flex items-start gap-1.5 text-sm text-base-content/70">
                  <User className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 break-words">
                    {booking.renterName} ({booking.renterEmail})
                  </span>
                </p>
              }
            >
              {booking.status === "Pending" && (
                <>
                  <button
                    type="button"
                    disabled={busyId === booking._id}
                    onClick={() =>
                      respond(booking, "confirm", "Booking confirmed.")
                    }
                    className="btn btn-primary"
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    disabled={busyId === booking._id}
                    onClick={() =>
                      respond(booking, "decline", "Booking declined.")
                    }
                    className="btn btn-outline btn-error"
                  >
                    Decline
                  </button>
                </>
              )}
            </BookingCard>
          ))}
        </div>
      )}
    </section>
  );
}
