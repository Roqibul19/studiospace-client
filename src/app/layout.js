import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const headingFont = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "StudioSpace | Book Creative Studios by the Hour",
    template: "%s | StudioSpace",
  },
  description:
    "Discover and book photo studios, film stages, podcast lounges, music suites and art workshops from hosts in your creative community.",
};

// Runs before the first paint so a saved dark theme never flashes light.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

const toasterStyle = {
  "--normal-bg": "var(--color-base-100)",
  "--normal-text": "var(--color-base-content)",
  "--normal-border": "var(--color-base-300)",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${headingFont.variable} ${bodyFont.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-base-100 font-sans text-base-content">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" style={toasterStyle} />
      </body>
    </html>
  );
}
