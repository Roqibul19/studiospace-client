export default function FormSkeleton() {
  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-2" aria-label="Loading form">
      <div className="skeleton h-14 sm:col-span-2" />
      <div className="skeleton h-14" />
      <div className="skeleton h-14" />
      <div className="skeleton h-14" />
      <div className="skeleton h-14" />
      <div className="skeleton h-36 sm:col-span-2" />
    </div>
  );
}
