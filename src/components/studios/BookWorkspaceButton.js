"use client";

import { toast } from "sonner";

export default function BookWorkspaceButton() {
  return (
    <button
      type="button"
      onClick={() => toast.info("Online booking is opening soon.")}
      className="btn btn-primary mt-6 w-full"
    >
      Book Workspace Now
    </button>
  );
}
