"use client";

import { MouseEvent, useRef } from "react";
import { ExternalLink, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";

type LocationMapButtonProps = {
  name: string;
  address: string;
  embedUrl: string;
  mapUrl: string;
  className?: string;
  variant?: "link" | "inline";
};

export function LocationMapButton({
  name,
  address,
  embedUrl,
  mapUrl,
  className,
  variant = "link",
}: LocationMapButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function closeOnBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === dialogRef.current) {
      closeDialog();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-lg text-left text-sm font-medium outline-none transition focus-visible:ring-3 focus-visible:ring-violet-300/70",
          variant === "inline"
            ? "px-1 py-1 text-cyan-100 hover:text-cyan-50"
            : "text-violet-200 hover:text-violet-100",
          className
        )}
        aria-label={`View ${name} on map`}
      >
        <MapPin className="size-4 shrink-0" aria-hidden="true" />
        <span>{variant === "inline" ? address : name}</span>
      </button>

      <dialog
        ref={dialogRef}
        onClick={closeOnBackdrop}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[min(92vw,56rem)] max-w-none overflow-hidden rounded-2xl border border-violet-300/25 bg-[#09090d] p-0 text-white shadow-2xl shadow-black/70 backdrop:bg-black/70 backdrop:backdrop-blur-md"
        aria-labelledby={`map-title-${name.replace(/\s+/g, "-").toLowerCase()}`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-5">
          <div className="flex min-w-0 gap-3">
            <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-xl bg-violet-500/15 text-violet-200">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h3
                id={`map-title-${name.replace(/\s+/g, "-").toLowerCase()}`}
                className="font-heading text-lg font-bold text-white"
              >
                {name}
              </h3>
              <p className="mt-1 text-sm leading-6 text-zinc-300">{address}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDialog}
            className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-200 outline-none transition hover:bg-white/10 hover:text-white focus-visible:ring-3 focus-visible:ring-violet-300/70"
            aria-label="Close map"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 sm:p-5">
          <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
            <iframe
              title={`${name} map`}
              src={embedUrl}
              className="h-[22rem] w-full sm:h-[30rem]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-zinc-400">
              Embedded map preview. Use Google Maps for directions or full details.
            </p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-violet-300/30 bg-violet-500/15 px-4 py-2 text-sm font-semibold text-violet-100 outline-none transition hover:bg-violet-500/25 focus-visible:ring-3 focus-visible:ring-violet-300/70"
            >
              Open in Google Maps
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
