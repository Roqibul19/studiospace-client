"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NavLinks, { NavLinkList } from "@/components/NavLinks";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="btn btn-ghost btn-square"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <Menu className="size-6" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-base-300 bg-base-100 px-4 py-3 shadow-lg"
        >
          <Suspense
            fallback={<NavLinkList mobile onNavigate={close} />}
          >
            <NavLinks mobile onNavigate={close} />
          </Suspense>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-base-300 pt-3 sm:hidden">
            <Link href="/login" onClick={close} className="btn btn-outline">
              Login
            </Link>
            <Link href="/register" onClick={close} className="btn btn-primary">
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
