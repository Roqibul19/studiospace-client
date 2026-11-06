"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import BookingModal from "@/components/studios/BookingModal";
import { authClient } from "@/lib/auth-client";

export default function BookWorkspaceButton({ studio }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);

  function handleClick() {
    if (!session?.user) {
      toast.info("Please login to book this studio.");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (session.user.email === studio.ownerEmail) {
      toast.info("This is your own studio, so it cannot be booked.");
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="btn btn-primary mt-6 w-full"
      >
        Book Workspace Now
      </button>
      {open && <BookingModal studio={studio} onClose={() => setOpen(false)} />}
    </>
  );
}
