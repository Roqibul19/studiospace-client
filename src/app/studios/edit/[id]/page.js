import { Suspense } from "react";
import FormSkeleton from "@/components/FormSkeleton";
import EditStudioForm from "@/components/studios/EditStudioForm";

export const metadata = { title: "Update Studio" };

async function EditStudioLoader({ params }) {
  const { id } = await params;
  return <EditStudioForm key={id} id={id} />;
}

export default function UpdateStudioPage({ params }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-4xl font-bold">Update Studio</h1>
      <p className="mt-3 leading-relaxed text-base-content/70">
        Change the details of your listing. Your host information stays the
        same.
      </p>
      <Suspense fallback={<FormSkeleton />}>
        <EditStudioLoader params={params} />
      </Suspense>
    </section>
  );
}
