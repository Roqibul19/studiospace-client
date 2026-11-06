import Link from "next/link";

export default function Notice({ icon: Icon, title, text, href, action }) {
  return (
    <div className="mt-10 rounded-box border border-dashed border-base-300 px-6 py-14 text-center">
      <Icon className="mx-auto size-10 text-primary" aria-hidden="true" />
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-base-content/70">{text}</p>
      <Link href={href} className="btn btn-primary mt-6">
        {action}
      </Link>
    </div>
  );
}
