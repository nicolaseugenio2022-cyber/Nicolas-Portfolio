"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Images,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProjectImage = {
  label: string;
  image: StaticImageData;
};

type ProjectGallerySection = {
  label: string;
  images: ProjectImage[];
};

export type ProjectCaseStudyCardProps = {
  title: string;
  label: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  features: string[];
  accent: "violet" | "cyan";
  images: ProjectImage[];
  gallerySections?: ProjectGallerySection[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function ProjectCaseStudyCard(props: ProjectCaseStudyCardProps) {
  const gallerySections = props.gallerySections ?? [
    { label: "Gallery", images: props.images },
  ];
  const [activeSection, setActiveSection] = useState(0);
  const [selectedImages, setSelectedImages] = useState(() =>
    gallerySections.map(() => 0),
  );
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { isOpen, onClose } = props;
  const activeGallery = gallerySections[activeSection];
  const activeImage = selectedImages[activeSection] ?? 0;

  function selectImage(index: number) {
    setSelectedImages((current) =>
      current.map((selected, section) =>
        section === activeSection ? index : selected,
      ),
    );
  }

  function closeDialog() {
    onClose();
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function showPrevious() {
    selectImage(
      activeImage === 0 ? activeGallery.images.length - 1 : activeImage - 1,
    );
  }

  function showNext() {
    selectImage(
      activeImage === activeGallery.images.length - 1 ? 0 : activeImage + 1,
    );
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
      const isFeatureTab =
        event.target instanceof HTMLElement &&
        event.target.getAttribute("role") === "tab";

      if (event.key === "ArrowLeft" && !isFeatureTab) {
        setSelectedImages((current) =>
          current.map((selected, section) =>
            section === activeSection
              ? selected === 0
                ? activeGallery.images.length - 1
                : selected - 1
              : selected,
          ),
        );
      }
      if (event.key === "ArrowRight" && !isFeatureTab) {
        setSelectedImages((current) =>
          current.map((selected, section) =>
            section === activeSection
              ? selected === activeGallery.images.length - 1
                ? 0
                : selected + 1
              : selected,
          ),
        );
      }

      if (event.key === "Tab" && dialogRef.current) {
        const controls = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeGallery.images.length, activeSection, isOpen, onClose]);

  const active = activeGallery.images[activeImage];
  const titleId = `${props.title.replaceAll(" ", "-")}-dialog-title`;

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-violet-400/30 bg-card text-card-foreground transition duration-300 ease-out hover:-translate-y-1 hover:border-violet-500/60 hover:shadow-2xl hover:shadow-violet-950/10 dark:border-violet-300/30 dark:hover:border-violet-300/60 dark:hover:shadow-violet-950/30">
        <div className="relative aspect-[1.935/1] overflow-hidden bg-zinc-950">
          <Image
            src={props.images[0].image}
            alt={`${props.title} application overview`}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.015]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => {
              setActiveSection(0);
              setSelectedImages(gallerySections.map(() => 0));
              props.onOpen();
            }}
            className="absolute inset-0 flex items-center justify-center outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-violet-300/80"
            aria-label={`Open ${props.title} project showcase`}
          >
            <span className="flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-white px-5 py-2.5 text-sm font-bold text-zinc-950 opacity-100 shadow-xl transition duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
              View Details
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </button>
          <div className="pointer-events-none absolute bottom-4 left-5 flex flex-wrap gap-2">
            {props.stack.slice(0, 3).map((item) => (
              <Badge
                key={item}
                className="border border-white/25 bg-black/65 text-white backdrop-blur-sm"
              >
                {item}
              </Badge>
            ))}
            {props.stack.length > 3 ? (
              <Badge className="border border-white/25 bg-black/65 text-white backdrop-blur-sm">
                +{props.stack.length - 3}
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                {props.role} · {props.label}
              </p>
              <h3 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                {props.title}
              </h3>
            </div>
            <span className="mt-2 h-1 w-10 shrink-0 rounded-full bg-violet-500 dark:bg-violet-400" />
          </div>
          <p className="mt-3 line-clamp-3 max-w-3xl leading-7 text-muted-foreground">
            {props.solution}
          </p>
        </div>
      </article>

      {props.isOpen
        ? createPortal(
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-2 backdrop-blur-sm sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex h-[calc(100dvh-1rem)] w-full max-w-[80rem] flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl shadow-black/45 sm:h-[min(calc(100dvh-2rem),48rem)]"
          >
            <header className="flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-border px-4 sm:min-h-18 sm:px-7">
              <div className="min-w-0">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                  Project case study
                </p>
                <h2
                  id={titleId}
                  className="truncate font-heading text-lg font-bold text-foreground sm:text-xl"
                >
                  {props.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                autoFocus
                className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:border-violet-400 hover:bg-muted active:scale-95 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-400/60"
                aria-label="Close project showcase"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </header>

            {gallerySections.length > 1 ? (
              <div
                className="grid shrink-0 grid-cols-2 gap-1.5 border-b border-border bg-[var(--surface-inset)] p-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2 sm:px-5 sm:py-3"
                role="tablist"
                aria-label={`${props.title} feature areas`}
              >
                {gallerySections.map((section, index) => (
                  <button
                    key={section.label}
                    id={`${titleId}-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={activeSection === index}
                    aria-controls={`${titleId}-gallery`}
                    tabIndex={activeSection === index ? 0 : -1}
                    onClick={() => setActiveSection(index)}
                    onKeyDown={(event) => {
                      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                      event.preventDefault();
                      const direction = event.key === "ArrowRight" ? 1 : -1;
                      const next =
                        (index + direction + gallerySections.length) %
                        gallerySections.length;
                      setActiveSection(next);
                      document.getElementById(`${titleId}-tab-${next}`)?.focus();
                    }}
                    className={`min-h-11 rounded-lg px-4 py-2 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-400/60 sm:min-w-32 ${
                      activeSection === index
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-950/20"
                        : "text-muted-foreground hover:bg-card hover:text-foreground"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_25rem] lg:overflow-hidden">
              <div
                id={`${titleId}-gallery`}
                role="tabpanel"
                aria-labelledby={
                  gallerySections.length > 1
                    ? `${titleId}-tab-${activeSection}`
                    : undefined
                }
                className="flex min-h-[22rem] flex-col bg-[var(--surface-inset)] p-3 sm:p-5 lg:min-h-0 lg:border-r lg:border-border"
              >
                <div className="group relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl border border-border bg-zinc-100 shadow-2xl shadow-black/20 dark:bg-zinc-950">
                  <div className="relative aspect-[1.935/1] w-full">
                    <Image
                      key={active.image.src}
                      src={active.image}
                      alt={`${props.title}: ${active.label} screen`}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 75vw, 100vw"
                      className="animate-in fade-in object-contain duration-300"
                    />
                  </div>
                  {activeGallery.images.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={showPrevious}
                        className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/65 text-white opacity-100 shadow-xl backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-black/80 active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-300/80 sm:left-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(pointer:coarse)]:opacity-100"
                        aria-label="Show previous screenshot"
                      >
                        <ArrowLeft className="size-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/65 text-white opacity-100 shadow-xl backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-black/80 active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-300/80 sm:right-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(pointer:coarse)]:opacity-100"
                        aria-label="Show next screenshot"
                      >
                        <ArrowRight className="size-5" aria-hidden="true" />
                      </button>
                    </>
                  ) : null}

                  <div
                    className="absolute bottom-3 right-3 z-10 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-center text-white shadow-lg backdrop-blur-sm"
                    aria-live="polite"
                  >
                    <p className="text-xs font-bold tabular-nums sm:text-sm">
                      {activeImage + 1} / {activeGallery.images.length}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-3 flex shrink-0 flex-wrap items-center gap-2"
                  role="group"
                  aria-label={`${activeGallery.label} screenshots`}
                >
                  {activeGallery.images.map((image, index) => (
                    <button
                      key={image.label}
                      type="button"
                      onClick={() => selectImage(index)}
                      className={`group relative aspect-[1.935/1] min-h-11 w-24 shrink-0 overflow-hidden rounded-lg border bg-zinc-950 transition duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-400/60 sm:w-28 lg:w-32 ${
                        index === activeImage
                          ? "border-violet-500 ring-2 ring-violet-500/30"
                          : "border-border opacity-70 hover:border-violet-400 hover:opacity-100"
                      }`}
                      aria-label={`Show ${image.label} screenshot`}
                      aria-current={index === activeImage ? "true" : undefined}
                    >
                      <Image
                        src={image.image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 12rem, 33vw"
                        className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <aside className="border-t border-border bg-card p-6 lg:min-h-0 lg:border-t-0">
                <div className="flex items-center gap-2 text-violet-700 dark:text-violet-300">
                  <Images className="size-4" aria-hidden="true" />
                  <p className="text-xs font-bold uppercase tracking-[0.18em]">Overview</p>
                </div>
                <h3 className="mt-3 font-heading text-xl font-bold text-foreground">
                  {props.label}
                </h3>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">{props.problem}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{props.solution}</p>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                  Key features
                </p>
                <ul className="mt-4 space-y-2.5">
                  {props.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-cyan-700 dark:text-cyan-300" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 dark:text-violet-300">
                  Tech stack
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {props.stack.map((item) => (
                    <Badge
                      key={item}
                      variant="outline"
                      className="border-violet-300 bg-violet-50 text-violet-950 dark:border-white/15 dark:bg-white/5 dark:text-zinc-100"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>,
        document.body,
          )
        : null}
    </>
  );
}
