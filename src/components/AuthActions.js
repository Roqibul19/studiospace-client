"use client";

import Link from "next/link";
import UserMenu from "@/components/UserMenu";
import { authClient } from "@/lib/auth-client";

export default function AuthActions() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <span
        className="skeleton size-10 rounded-full"
        aria-label="Loading account"
      />
    );
  }

  if (session?.user) return <UserMenu user={session.user} />;

  return (
    <>
      <Link href="/login" className="btn btn-ghost hidden sm:inline-flex">
        Login
      </Link>
      <Link href="/register" className="btn btn-primary hidden sm:inline-flex">
        Register
      </Link>
    </>
  );
}
