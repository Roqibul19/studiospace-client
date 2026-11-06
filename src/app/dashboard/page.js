import Dashboard from "@/components/Dashboard";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-4xl font-bold sm:text-5xl">Dashboard</h1>
      <Dashboard />
    </section>
  );
}
