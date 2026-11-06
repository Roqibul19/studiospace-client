"use client";

import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import FormSkeleton from "@/components/FormSkeleton";
import Notice from "@/components/Notice";
import StudioForm from "@/components/studios/StudioForm";
import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function AddStudioForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return <FormSkeleton />;

  if (!session?.user) {
    return (
      <Notice
        icon={LogIn}
        title="Please login first"
        text="You need an account to list a studio."
        href="/login?redirect=/add-studio"
        action="Login"
      />
    );
  }

  async function handleSubmit(values) {
    await apiFetch("/studios", { method: "POST", body: values });
    toast.success("Your studio has been added.");
    router.push("/my-listings");
    router.refresh();
  }

  return (
    <StudioForm
      owner={session.user}
      submitLabel="Add Studio"
      onSubmit={handleSubmit}
    />
  );
}
