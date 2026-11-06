export const metadata = {
  title: "Privacy Policy",
  description: "What information StudioSpace collects and how it is used.",
};

const SECTIONS = [
  {
    title: "About This Site",
    paragraphs: [
      "StudioSpace is a student project built for a web development course. It is not a commercial service, and the sample studios and reviews on the site are examples.",
    ],
  },
  {
    title: "Information We Collect",
    paragraphs: [
      "When you register, we store your name, email address, photo URL and a securely hashed password.",
      "If you sign in with Google, we receive your name, email address and profile photo from Google. We do not receive your Google password.",
      "We also store the studios you list and the bookings you make, including their dates and times.",
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: [
      "We use your information only to run the site: to sign you in, show your listings and bookings, and let hosts see who has requested their studio.",
      "When you book a studio, the host can see your name and email address. When you list a studio, your name, email address and photo are shown on its public page.",
      "We do not sell your information or use it for advertising.",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      "We use cookies that are needed to keep you signed in. We do not use advertising or tracking cookies. Your light or dark theme choice is saved in your browser.",
    ],
  },
  {
    title: "Services We Use",
    paragraphs: [
      "Data is stored with MongoDB Atlas. Images you upload are hosted by imgbb, and those image links can be viewed publicly. Google provides the optional Google sign-in.",
    ],
  },
  {
    title: "Your Choices",
    paragraphs: [
      "You can update or delete your studio listings at any time. To have your account removed, or to ask a question about your data, please use the support email shown on the Google sign-in screen.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="text-4xl font-bold sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-base-content/70">
        Last updated: November 2026
      </p>
      {SECTIONS.map(({ title, paragraphs }) => (
        <div key={title} className="mt-8">
          <h2 className="text-2xl font-bold">{title}</h2>
          {paragraphs.map((text) => (
            <p key={text} className="mt-3 leading-relaxed text-base-content/80">
              {text}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}
