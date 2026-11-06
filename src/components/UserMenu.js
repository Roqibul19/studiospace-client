"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarCheck,
  LayoutDashboard,
  LayoutList,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { isValidHttpUrl } from "@/lib/validation";

const MENU_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Add New Studio", href: "/add-studio", icon: PlusCircle },
  { label: "My Studio Listings", href: "/my-listings", icon: LayoutList },
  { label: "My Bookings", href: "/my-bookings", icon: CalendarCheck },
];

// The first letter sits behind the photo, so it shows if the photo cannot load.
function Avatar({ user }) {
  const [broken, setBroken] = useState(false);
  const showPhoto = user.image && isValidHttpUrl(user.image) && !broken;

  return (
    <span className="relative flex size-10 items-center justify-center overflow-hidden rounded-full bg-primary font-semibold text-primary-content ring-2 ring-base-300">
      {user.name?.charAt(0).toUpperCase() || "U"}
      {showPhoto && (
        <Image
          src={user.image}
          alt=""
          width={40}
          height={40}
          unoptimized
          onError={() => setBroken(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </span>
  );
}

export default function UserMenu({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event) {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Hover opens the menu for a mouse. Touch screens use the click below.
  function handlePointerEnter(event) {
    if (event.pointerType === "mouse") setOpen(true);
  }
  function handlePointerLeave(event) {
    if (event.pointerType === "mouse") setOpen(false);
  }

  async function handleLogout() {
    setOpen(false);
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "Logout failed. Please try again.");
      return;
    }
    toast.success("You have been logged out.");
    router.push("/");
  }

  return (
    <div
      ref={menuRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open user menu"
        aria-expanded={open}
        aria-haspopup="menu"
        className="block rounded-full"
      >
        <Avatar user={user} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 w-64 pt-2">
          <div className="rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
            <div className="border-b border-base-300 px-3 py-2">
              <p className="truncate font-semibold">{user.name}</p>
              <p className="truncate text-xs text-base-content/60">
                {user.email}
              </p>
            </div>
            <ul className="mt-1">
              {MENU_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-base-200"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-base-300 pt-1">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-error hover:bg-base-200"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
