"use client";

import { useEffect, useState } from "react";
import { CalendarSearch, CloudOff } from "lucide-react";
import { toast } from "sonner";
import BookingCard, {
  BookingListSkeleton,
} from "@/components/bookings/BookingCard";
import ConfirmModal from "@/components/ConfirmModal";
import Notice from "@/components/Notice";
import { apiFetch } from "@/lib/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [toCancel, setToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    let ignore = false;

    apiFetch("/bookings/mine")
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

  async function confirmCancel() {
    setCancelling(true);
    try {
      const updated = await apiFetch(`/bookings/${toCancel._id}/cancel`, {
        method: "PATCH",
      });
      setBookings((current) =>
        current.map((booking) =>
          booking._id === updated._id ? updated : booking,
        ),
      );
      toast.success("Your booking has been cancelled.");
      setToCancel(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setCancelling(false);
    }
  }

  if (loadError) {
    return (
      <Notice
        icon={CloudOff}
        title="We could not load your bookings"
        text="Something went wrong on our side. Please try again in a moment."
        href="/"
        action="Back to Home"
      />
    );
  }

  if (!bookings) return <BookingListSkeleton label="Loading your bookings" />;

  if (bookings.length === 0) {
    return (
      <Notice
        icon={CalendarSearch}
        title="You have no bookings yet"
        text="Find a space you love and reserve your first session."
        href="/studios"
        action="Explore Studios"
      />
    );
  }

  return (
    <>
      <div className="mt-8 space-y-4">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking}>
            {booking.status === "Pending" && (
              <button
                type="button"
                onClick={() => setToCancel(booking)}
                className="btn btn-outline btn-error"
              >
                Cancel Booking
              </button>
            )}
          </BookingCard>
        ))}
      </div>
      <ConfirmModal
        open={Boolean(toCancel)}
        title="Cancel this booking?"
        message={`Your request for "${toCancel?.studioTitle ?? ""}" will be cancelled. This cannot be undone.`}
        confirmLabel="Cancel Booking"
        cancelLabel="Keep Booking"
        busy={cancelling}
        onConfirm={confirmCancel}
        onCancel={() => setToCancel(null)}
      />
    </>
  );
}
