import { Suspense } from "react";
import AuthActions from "@/components/AuthActions";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import NavLinks, { NavLinkList } from "@/components/NavLinks";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        <div className="hidden lg:block">
          <Suspense fallback={<NavLinkList />}>
            <NavLinks />
          </Suspense>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <AuthActions />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
