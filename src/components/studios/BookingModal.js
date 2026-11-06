"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarX2 } from "lucide-react";
import { toast } from "sonner";
import { apiFetch } from "@/lib/api";
import { formatTimeRange } from "@/lib/format";

const START_TIMES = Array.from({ length: 17 }, (_, index) => {
  const hour = String(index + 6).padStart(2, "0");
  return `${hour}:00`;
});
const DURATIONS = Array.from({ length: 12 }, (_, index) => index + 1);

function todayInputValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function CostRow({ label, value, strong }) {
  return (
    <div className={`flex justify-between gap-4 py-1.5 ${strong ? "font-bold" : "text-sm"}`}>
      <dt>{label}</dt>
      <dd>${value}</dd>
    </div>
  );
}

export default function BookingModal({ studio, onClose }) {
  const router = useRouter();
  const dialogRef = useRef(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [hours, setHours] = useState(2);
  const [takenSlots, setTakenSlots] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const rentalCost = studio.hourlyRate * hours;
  const totalCost = rentalCost + studio.securityDeposit;

  useEffect(() => {
    dialogRef.current.showModal();

    let ignore = false;
    apiFetch(`/bookings/studio/${studio._id}/confirmed`)
      .then((slots) => {
        if (!ignore) setTakenSlots(slots);
      })
      .catch(() => {
        // The server still checks for clashes, so the list is only a helper.
      });

    return () => {
      ignore = true;
    };
  }, [studio._id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!date) {
      setError("Please choose a date.");
      return;
    }
    const start = new Date(`${date}T${startTime}:00`);
    if (Number.isNaN(start.getTime()) || start <= new Date()) {
      setError("Please choose a date and time in the future.");
      return;
    }

    setSaving(true);
    try {
      await apiFetch("/bookings", {
        method: "POST",
        body: {
          studioId: studio._id,
          startTime: start.toISOString(),
          hours,
        },
      });
      toast.success("Your booking request has been sent to the host.");
      router.push("/my-bookings");
    } catch (submitError) {
      setError(submitError.message);
      toast.error(submitError.message);
      setSaving(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="booking-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!saving) onClose();
      }}
    >
      <div className="modal-box">
        <h2 id="booking-title" className="text-xl font-bold">
          Book {studio.title}
        </h2>
        <p className="mt-1 text-sm text-base-content/70">
          Your request stays Pending until the host confirms it.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          <div>
            <label htmlFor="booking-date" className="mb-1 block text-sm font-medium">
              Date
            </label>
            <input
              id="booking-date"
              type="date"
              min={todayInputValue()}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="input w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="booking-start" className="mb-1 block text-sm font-medium">
                Start Time
              </label>
              <select
                id="booking-start"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="select w-full"
              >
                {START_TIMES.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="booking-hours" className="mb-1 block text-sm font-medium">
                Hours
              </label>
              <select
                id="booking-hours"
                value={hours}
                onChange={(event) => setHours(Number(event.target.value))}
                className="select w-full"
              >
                {DURATIONS.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration} {duration === 1 ? "hour" : "hours"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {takenSlots.length > 0 && (
            <div className="rounded-box bg-base-200 p-3 text-sm">
              <p className="flex items-center gap-1.5 font-semibold">
                <CalendarX2 className="size-4" aria-hidden="true" />
                Already booked
              </p>
              <ul className="mt-1 space-y-0.5 text-base-content/70">
                {takenSlots.map((slot) => (
                  <li key={slot.startTime}>
                    {formatTimeRange(slot.startTime, slot.endTime)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <dl className="border-t border-base-300 pt-2">
            <CostRow
              label={`$${studio.hourlyRate} x ${hours} ${hours === 1 ? "hour" : "hours"}`}
              value={rentalCost}
            />
            <CostRow label="Security deposit" value={studio.securityDeposit} />
            <CostRow label="Total" value={totalCost} strong />
          </dl>

          {error && (
            <p role="alert" className="text-sm text-error">
              {error}
            </p>
          )}

          <div className="modal-action mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving && <span className="loading loading-spinner loading-sm" />}
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
