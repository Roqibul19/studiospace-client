"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CloudOff, MapPin, Pencil, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmModal from "@/components/ConfirmModal";
import Notice from "@/components/Notice";
import { StudioGridSkeleton } from "@/components/StudioGrid";
import { apiFetch } from "@/lib/api";

function ListingCard({ studio, onDelete }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="relative aspect-[4/3] bg-base-300">
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="badge absolute left-3 top-3 border-0 bg-base-100 font-medium text-base-content shadow">
          {studio.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-2 min-h-14 text-lg font-semibold leading-7">
          <Link href={`/studios/${studio._id}`} className="hover:text-primary">
            {studio.title}
          </Link>
        </h2>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-base-content/70">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{studio.location}</span>
        </p>
        <p className="mt-3 text-lg font-bold">
          ${studio.hourlyRate}
          <span className="text-sm font-normal text-base-content/70"> / hr</span>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link
            href={`/studios/edit/${studio._id}`}
            aria-label={`Update ${studio.title}`}
            className="btn btn-outline"
          >
            <Pencil className="size-4" aria-hidden="true" />
            Update
          </Link>
          <button
            type="button"
            onClick={() => onDelete(studio)}
            aria-label={`Delete ${studio.title}`}
            className="btn btn-outline btn-error"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default function MyListings() {
  const router = useRouter();
  const [studios, setStudios] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let ignore = false;

    apiFetch("/studios/mine")
      .then((result) => {
        if (ignore) return;
        setStudios(result);
        setLoadError(false);
      })
      .catch(() => {
        if (!ignore) setLoadError(true);
      });

    return () => {
      ignore = true;
    };
  }, []);

  async function confirmDelete() {
    setDeleting(true);
    try {
      await apiFetch(`/studios/${toDelete._id}`, { method: "DELETE" });
      setStudios((current) =>
        current.filter((studio) => studio._id !== toDelete._id),
      );
      toast.success(`"${toDelete.title}" has been deleted.`);
      setToDelete(null);
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(false);
    }
  }

  if (loadError) {
    return (
      <Notice
        icon={CloudOff}
        title="We could not load your listings"
        text="Something went wrong on our side. Please try again in a moment."
        href="/"
        action="Back to Home"
      />
    );
  }

  if (!studios) return <StudioGridSkeleton label="Loading your listings" />;

  if (studios.length === 0) {
    return (
      <Notice
        icon={Sparkles}
        title="You have not listed a studio yet"
        text="Add your first space and start welcoming creators."
        href="/add-studio"
        action="Add New Studio"
      />
    );
  }

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.map((studio) => (
          <ListingCard key={studio._id} studio={studio} onDelete={setToDelete} />
        ))}
      </div>
      <ConfirmModal
        open={Boolean(toDelete)}
        title="Delete this studio?"
        message={`"${toDelete?.title ?? ""}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete Studio"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
