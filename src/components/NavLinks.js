"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/navigation";

function isActive(pathname, href) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Without a pathname no link is marked active. Navbar uses this as the
// Suspense fallback for pages where the URL is not known during prerendering.
export function NavLinkList({ pathname, mobile = false, onNavigate }) {
  return (
    <ul className={mobile ? "flex flex-col gap-1" : "flex items-center gap-1"}>
      {NAV_LINKS.map(({ label, href }) => {
        const active = isActive(pathname, href);
        const desktopClass = `relative block px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full ${
          active
            ? "text-primary after:bg-primary"
            : "text-base-content/70 after:bg-transparent hover:text-base-content"
        }`;
        const mobileClass = `block rounded-lg border-l-4 px-3 py-3 font-medium ${
          active
            ? "border-primary bg-base-200 text-primary"
            : "border-transparent hover:bg-base-200"
        }`;

        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={mobile ? mobileClass : desktopClass}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function NavLinks(props) {
  const pathname = usePathname();
  return <NavLinkList pathname={pathname} {...props} />;
}
