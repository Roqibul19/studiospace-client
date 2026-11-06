import MyBookings from "@/components/bookings/MyBookings";

export const metadata = { title: "My Bookings" };

export default function MyBookingsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-4xl font-bold">My Bookings</h1>
      <p className="mt-3 leading-relaxed text-base-content/70">
        Follow the status of your reservations, or cancel a request while it is
        still pending.
      </p>
      <MyBookings />
    </section>
  );
}
