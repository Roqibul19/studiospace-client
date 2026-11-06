"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CloudOff, SearchX, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import FormSkeleton from "@/components/FormSkeleton";
import Notice from "@/components/Notice";
import StudioForm from "@/components/studios/StudioForm";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function EditStudioForm({ id }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [studio, setStudio] = useState(null);
  const [failure, setFailure] = useState(null);

  useEffect(() => {
    let ignore = false;

    apiFetch(`/studios/${encodeURIComponent(id)}`)
      .then((result) => {
        if (ignore) return;
        setStudio(result);
        setFailure(null);
      })
      .catch((error) => {
        if (ignore) return;
        setFailure(
          error.status === 400 || error.status === 404 ? "missing" : "error",
        );
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (failure === "missing") {
    return (
      <Notice
        icon={SearchX}
        title="We could not find this studio"
        text="It may have been deleted, or the link may be wrong."
        href="/my-listings"
        action="Back to My Listings"
      />
    );
  }

  if (failure === "error") {
    return (
      <Notice
        icon={CloudOff}
        title="We could not load this studio"
        text="Something went wrong on our side. Please try again in a moment."
        href="/my-listings"
        action="Back to My Listings"
      />
    );
  }

  if (isPending || !studio) return <FormSkeleton />;

  if (session?.user?.email !== studio.ownerEmail) {
    return (
      <Notice
        icon={ShieldAlert}
        title="This studio belongs to another host"
        text="You can only update the studios you have listed yourself."
        href="/my-listings"
        action="Back to My Listings"
      />
    );
  }

  async function handleSubmit(values) {
    await apiFetch(`/studios/${studio._id}`, { method: "PATCH", body: values });
    toast.success("Your studio has been updated.");
    router.push("/my-listings");
    router.refresh();
  }

  return (
    <StudioForm
      initial={{
        title: studio.title,
        category: studio.category,
        hourlyRate: studio.hourlyRate,
        securityDeposit: studio.securityDeposit,
        maxCapacity: studio.maxCapacity,
        location: studio.location,
        image: studio.image,
        amenities: studio.amenities ?? [],
        overview: studio.overview,
      }}
      owner={{ name: studio.ownerName, email: studio.ownerEmail }}
      submitLabel="Update Studio"
      onSubmit={handleSubmit}
    />
  );
}
