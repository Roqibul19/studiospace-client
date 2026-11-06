import Link from "next/link";
import Logo from "@/components/Logo";
import NewsletterForm from "@/components/NewsletterForm";
import {
  NAV_LINKS,
  STUDIO_CATEGORIES,
  categoryHref,
} from "@/lib/navigation";

const SOCIAL_LINKS = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: (
      <path
        fillRule="evenodd"
        d="M7 1h10a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6V7a6 6 0 0 1 6-6Zm0 2a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7Zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.75 5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
      />
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
];

function FooterHeading({ children }) {
  return <h2 className="mb-4 text-base font-semibold">{children}</h2>;
}

const footerLinkClass =
  "text-sm text-base-content/70 transition-colors hover:text-primary";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-base-300 bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-base-content/70">
            Our mission is to give every creator a place to make their best
            work, and every studio owner a simple way to share their space.
          </p>
          <ul className="mt-5 flex gap-2">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="btn btn-ghost btn-square btn-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                    aria-hidden="true"
                  >
                    {icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="space-y-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className={footerLinkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Popular Categories</FooterHeading>
          <ul className="space-y-2">
            {STUDIO_CATEGORIES.map(({ label, value }) => (
              <li key={value}>
                <Link href={categoryHref(value)} className={footerLinkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <FooterHeading>Stay in the Loop</FooterHeading>
          <p className="mb-4 text-sm leading-relaxed text-base-content/70">
            New studios and creator tips, sent to your inbox once a month.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-base-300">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs leading-relaxed text-base-content/60 sm:px-6 lg:px-8">
          <p>
            &copy; 2026 StudioSpace. All rights reserved. Each booking is an
            agreement between the host and the creator. Please read our{" "}
            <Link href="/privacy" className="link hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
