import AddStudioForm from "@/components/studios/AddStudioForm";

export const metadata = { title: "Add New Studio" };

export default function AddStudioPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-4xl font-bold">Add New Studio</h1>
      <p className="mt-3 leading-relaxed text-base-content/70">
        Share your space with the creative community. Tell creators what makes
        it special and what is included.
      </p>
      <AddStudioForm />
    </section>
  );
}
