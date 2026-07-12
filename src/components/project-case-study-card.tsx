"use client";

import Image, { type StaticImageData } from "next/image";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Images,
  Maximize2,
  Minimize2,
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

type TouchPoint = {
  x: number;
  y: number;
  startX: number;
  startY: number;
};

type ExpandedGesture = {
  mode: "idle" | "swipe" | "pan" | "pinch";
  moved: boolean;
  startDistance: number;
  startScale: number;
  startPan: { x: number; y: number };
  lastPoint: { x: number; y: number };
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
  showMobileHint: boolean;
};

export function ProjectCaseStudyCard(props: ProjectCaseStudyCardProps) {
  const gallerySections = props.gallerySections ?? [
    { label: "Gallery", images: props.images },
  ];
  const [activeSection, setActiveSection] = useState(0);
  const [selectedImages, setSelectedImages] = useState(() =>
    gallerySections.map(() => 0),
  );
  const triggerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
  } | null>(null);
  const controlsTimerRef = useRef(0);
  const hasShownGalleryHintRef = useRef(false);
  const expandedPointersRef = useRef(new Map<number, TouchPoint>());
  const expandedGestureRef = useRef<ExpandedGesture>({
    mode: "idle",
    moved: false,
    startDistance: 0,
    startScale: 1,
    startPan: { x: 0, y: 0 },
    lastPoint: { x: 0, y: 0 },
  });
  const zoomScaleRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const [galleryControlsVisible, setGalleryControlsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const { isOpen, onClose } = props;
  const activeGallery = gallerySections[activeSection];
  const activeImage = selectedImages[activeSection] ?? 0;

  function selectImage(index: number) {
    if (isExpanded) resetExpandedView();
    setSelectedImages((current) =>
      current.map((selected, section) =>
        section === activeSection ? index : selected,
      ),
    );
  }

  function closeDialog() {
    resetExpandedView();
    setIsExpanded(false);
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

  function revealGalleryControls(duration = 1400) {
    window.clearTimeout(controlsTimerRef.current);
    setGalleryControlsVisible(true);
    controlsTimerRef.current = window.setTimeout(
      () => setGalleryControlsVisible(false),
      duration,
    );
  }

  function toggleGalleryControls() {
    if (galleryControlsVisible) {
      window.clearTimeout(controlsTimerRef.current);
      setGalleryControlsVisible(false);
    } else {
      revealGalleryControls(1800);
    }
  }

  function setZoom(nextScale: number, nextPan = panRef.current) {
    zoomScaleRef.current = nextScale;
    panRef.current = nextPan;
    setZoomScale(nextScale);
    setPan(nextPan);
  }

  function resetExpandedView() {
    expandedPointersRef.current.clear();
    expandedGestureRef.current.mode = "idle";
    setZoom(1, { x: 0, y: 0 });
  }

  function distanceBetween(points: TouchPoint[]) {
    return Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  }

  function clampPan(
    nextPan: { x: number; y: number },
    scale: number,
    bounds: DOMRect,
  ) {
    const maxX = Math.max(0, ((scale - 1) * bounds.width) / 2);
    const maxY = Math.max(0, ((scale - 1) * bounds.height) / 2);
    return {
      x: Math.min(Math.max(nextPan.x, -maxX), maxX),
      y: Math.min(Math.max(nextPan.y, -maxY), maxY),
    };
  }

  function handleExpandedPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    expandedPointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
    });
    const points = Array.from(expandedPointersRef.current.values());
    if (points.length >= 2) {
      expandedGestureRef.current = {
        mode: "pinch",
        moved: true,
        startDistance: distanceBetween(points),
        startScale: zoomScaleRef.current,
        startPan: panRef.current,
        lastPoint: { x: event.clientX, y: event.clientY },
      };
    } else {
      expandedGestureRef.current = {
        mode: zoomScaleRef.current > 1 ? "pan" : "swipe",
        moved: false,
        startDistance: 0,
        startScale: zoomScaleRef.current,
        startPan: panRef.current,
        lastPoint: { x: event.clientX, y: event.clientY },
      };
    }
  }

  function handleExpandedPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const point = expandedPointersRef.current.get(event.pointerId);
    if (!point) return;
    revealGalleryControls();
    point.x = event.clientX;
    point.y = event.clientY;

    const points = Array.from(expandedPointersRef.current.values());
    const gesture = expandedGestureRef.current;
    if (points.length >= 2) {
      event.preventDefault();
      const ratio = distanceBetween(points) / Math.max(gesture.startDistance, 1);
      const nextScale = Math.min(Math.max(gesture.startScale * ratio, 1), 4);
      const nextPan =
        nextScale === 1
          ? { x: 0, y: 0 }
          : clampPan(panRef.current, nextScale, event.currentTarget.getBoundingClientRect());
      setZoom(nextScale, nextPan);
      gesture.mode = "pinch";
      gesture.moved = true;
      return;
    }

    if (gesture.mode === "pan" && zoomScaleRef.current > 1) {
      event.preventDefault();
      const deltaX = event.clientX - gesture.lastPoint.x;
      const deltaY = event.clientY - gesture.lastPoint.y;
      if (Math.abs(deltaX) + Math.abs(deltaY) > 2) gesture.moved = true;
      const nextPan = clampPan(
        { x: panRef.current.x + deltaX, y: panRef.current.y + deltaY },
        zoomScaleRef.current,
        event.currentTarget.getBoundingClientRect(),
      );
      setZoom(zoomScaleRef.current, nextPan);
      gesture.lastPoint = { x: event.clientX, y: event.clientY };
    } else if (
      Math.hypot(event.clientX - point.startX, event.clientY - point.startY) > 6
    ) {
      gesture.moved = true;
    }
  }

  function handleExpandedPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const point = expandedPointersRef.current.get(event.pointerId);
    if (!point) return;
    const gesture = expandedGestureRef.current;
    expandedPointersRef.current.delete(event.pointerId);

    if ((event.target as HTMLElement).closest("button")) {
      expandedGestureRef.current.mode = "idle";
      return;
    }

    if (expandedPointersRef.current.size > 0) {
      const remaining = Array.from(expandedPointersRef.current.values())[0];
      expandedGestureRef.current = {
        ...gesture,
        mode: zoomScaleRef.current > 1 ? "pan" : "swipe",
        moved: true,
        lastPoint: { x: remaining.x, y: remaining.y },
      };
      return;
    }

    const deltaX = event.clientX - point.startX;
    const deltaY = event.clientY - point.startY;
    if (zoomScaleRef.current > 1) {
      if (!gesture.moved && Math.abs(deltaX) < 12 && Math.abs(deltaY) < 12) {
        toggleGalleryControls();
      }
      return;
    }

    if (Math.abs(deltaX) >= 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) showNext();
      else showPrevious();
      revealGalleryControls();
    } else if (!gesture.moved && Math.abs(deltaX) < 12 && Math.abs(deltaY) < 12) {
      toggleGalleryControls();
    }
  }

  function handleStagePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" || activeGallery.images.length < 2) return;
    touchStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    revealGalleryControls();
  }

  function handleStagePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || start.pointerId !== event.pointerId) return;
    if ((event.target as HTMLElement).closest("button")) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const horizontalDistance = Math.abs(deltaX);
    const verticalDistance = Math.abs(deltaY);

    if (horizontalDistance >= 44 && horizontalDistance > verticalDistance * 1.2) {
      if (deltaX < 0) showNext();
      else showPrevious();
      revealGalleryControls();
      return;
    }

    if (horizontalDistance <= 12 && verticalDistance <= 12) {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.clientX < bounds.left + bounds.width / 2) showPrevious();
      else showNext();
      revealGalleryControls();
    }
  }

  function openProject() {
    setActiveSection(0);
    setSelectedImages(gallerySections.map(() => 0));
    setIsExpanded(false);
    props.onOpen();
  }

  function handleCardKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProject();
  }

  useEffect(() => {
    if (!isOpen) return;
    if (!hasShownGalleryHintRef.current) {
      hasShownGalleryHintRef.current = true;
      revealGalleryControls(1800);
    }
    return () => window.clearTimeout(controlsTimerRef.current);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isExpanded) {
          expandedPointersRef.current.clear();
          expandedGestureRef.current.mode = "idle";
          zoomScaleRef.current = 1;
          panRef.current = { x: 0, y: 0 };
          setZoomScale(1);
          setPan({ x: 0, y: 0 });
          setIsExpanded(false);
          return;
        }
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
  }, [activeGallery.images.length, activeSection, isExpanded, isOpen, onClose]);

  const active = activeGallery.images[activeImage];
  const titleId = `${props.title.replaceAll(" ", "-")}-dialog-title`;

  return (
    <>
      <article
        ref={triggerRef}
        role="button"
        tabIndex={0}
        onClick={openProject}
        onKeyDown={handleCardKeyDown}
        aria-label={`Open ${props.title} project showcase`}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-violet-400/30 bg-card text-left text-card-foreground outline-none transition duration-300 ease-out hover:-translate-y-1 hover:border-violet-500/60 hover:shadow-2xl hover:shadow-violet-950/10 focus-visible:ring-4 focus-visible:ring-violet-400/60 dark:border-violet-300/30 dark:hover:border-violet-300/60 dark:hover:shadow-violet-950/30"
      >
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
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className={`flex min-h-11 items-center gap-2 rounded-full border border-white/30 bg-white px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-xl transition duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100 ${
                props.showMobileHint ? "opacity-100" : "opacity-0"
              }`}
            >
              View Details
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </div>
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
            className="relative flex h-[calc(100dvh-1rem)] w-full max-w-[80rem] flex-col overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl shadow-black/45 sm:h-[min(calc(100dvh-2rem),48rem)]"
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
                className="flex shrink-0 items-center gap-1.5 overflow-x-auto overscroll-x-contain border-b border-border bg-[var(--surface-inset)] p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:gap-2 lg:overflow-visible lg:px-5 lg:py-3"
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
                    className={`min-h-11 shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-400/60 lg:min-w-32 ${
                      activeSection === index
                        ? "border-violet-300 bg-violet-100 text-violet-800 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-200 lg:border-transparent lg:bg-violet-600 lg:text-white lg:shadow-lg lg:shadow-violet-950/20"
                        : "border-transparent text-muted-foreground hover:bg-card hover:text-foreground"
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
                className="flex h-fit flex-col bg-[var(--surface-inset)] p-2 sm:p-4 lg:h-auto lg:min-h-0 lg:border-r lg:border-border lg:p-5"
              >
                <div
                  className="group relative flex aspect-[1.935/1] flex-none touch-pan-y items-center justify-center overflow-hidden rounded-xl border border-border bg-zinc-100 shadow-2xl shadow-black/20 dark:bg-zinc-950 lg:aspect-auto lg:min-h-0 lg:flex-1"
                  onPointerDown={handleStagePointerDown}
                  onPointerUp={handleStagePointerUp}
                  onPointerCancel={() => {
                    touchStartRef.current = null;
                  }}
                >
                  <div className="absolute inset-0">
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
                        data-visible={galleryControlsVisible}
                        className="absolute left-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/65 text-white opacity-100 shadow-xl backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-black/80 active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-300/80 sm:left-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(pointer:coarse)]:data-[visible=false]:opacity-0 [@media(pointer:coarse)]:data-[visible=true]:opacity-100"
                        aria-label="Show previous screenshot"
                      >
                        <ArrowLeft className="size-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        data-visible={galleryControlsVisible}
                        className="absolute right-2 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/65 text-white opacity-100 shadow-xl backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-black/80 active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-300/80 sm:right-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(pointer:coarse)]:data-[visible=false]:opacity-0 [@media(pointer:coarse)]:data-[visible=true]:opacity-100"
                        aria-label="Show next screenshot"
                      >
                        <ArrowRight className="size-5" aria-hidden="true" />
                      </button>
                    </>
                  ) : null}

                  <div
                    className="absolute bottom-2 left-2 z-10 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-center text-white/85 backdrop-blur-sm"
                    aria-live="polite"
                  >
                    <p className="text-[0.65rem] font-semibold tabular-nums sm:text-xs">
                      {activeImage + 1} / {activeGallery.images.length}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      resetExpandedView();
                      setIsExpanded(true);
                      revealGalleryControls(1800);
                    }}
                    className="absolute bottom-1 right-1 z-10 grid size-11 place-items-center rounded-full text-white transition active:scale-95 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-300/80 sm:hidden"
                    aria-label="Expand screenshot"
                  >
                    <span className="grid size-8 place-items-center rounded-full border border-white/15 bg-black/55 backdrop-blur-sm">
                      <Maximize2 className="size-3" aria-hidden="true" />
                    </span>
                  </button>
                </div>

                <div
                  className="mt-2 flex shrink-0 flex-wrap items-center gap-1.5 sm:mt-3 sm:gap-2"
                  role="group"
                  aria-label={`${activeGallery.label} screenshots`}
                >
                  {activeGallery.images.map((image, index) => (
                    <button
                      key={image.label}
                      type="button"
                      onClick={() => selectImage(index)}
                      className={`group relative h-11 w-20 shrink-0 overflow-hidden rounded-lg border bg-zinc-950 transition duration-300 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-400/60 sm:aspect-[1.935/1] sm:h-auto sm:w-28 lg:w-32 ${
                        index === activeImage
                          ? "border-violet-500 ring-2 ring-violet-500/30"
                          : "border-border opacity-70 hover:border-violet-400 hover:opacity-100"
                      }`}
                      aria-label={`Show ${image.label} screenshot`}
                      aria-current={index === activeImage ? "true" : undefined}
                    >
                      <span className="absolute inset-1 overflow-hidden rounded-md">
                        <Image
                          src={image.image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 12rem, 33vw"
                          className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                        />
                      </span>
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

            {isExpanded ? (
              <div
                className="absolute inset-0 z-40 bg-black text-white"
                role="region"
                aria-label="Expanded screenshot viewer"
              >
                <div
                  className="absolute inset-0 touch-none overflow-hidden"
                  onPointerDown={handleExpandedPointerDown}
                  onPointerMove={handleExpandedPointerMove}
                  onPointerUp={handleExpandedPointerUp}
                  onPointerCancel={(event) => {
                    expandedPointersRef.current.delete(event.pointerId);
                  }}
                >
                  <Image
                    key={`expanded-${active.image.src}`}
                    src={active.image}
                    alt={`${props.title}: ${active.label} screen`}
                    fill
                    placeholder="blur"
                    sizes="100vw"
                    className="animate-in fade-in object-contain duration-300"
                    style={{
                      transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
                      transformOrigin: "center",
                      transition:
                        expandedPointersRef.current.size > 0
                          ? "none"
                          : "transform 180ms ease-out",
                    }}
                  />

                  <div
                    data-visible={galleryControlsVisible}
                    className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/75 to-transparent px-4 pb-10 pt-3 transition duration-300 data-[visible=false]:-translate-y-2 data-[visible=false]:opacity-0"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">
                      {activeGallery.label}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-white/65">{active.label}</p>
                  </div>

                  <button
                    type="button"
                    autoFocus
                    onClick={() => {
                      resetExpandedView();
                      setIsExpanded(false);
                    }}
                    className="absolute right-3 top-3 z-30 grid size-11 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition active:scale-95 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-300/80"
                    aria-label="Exit expanded screenshot"
                  >
                    <Minimize2 className="size-5" aria-hidden="true" />
                  </button>

                  {activeGallery.images.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={showPrevious}
                        data-visible={galleryControlsVisible}
                        className="absolute left-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/60 backdrop-blur-sm transition duration-300 active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-300/80 data-[visible=false]:opacity-0"
                        aria-label="Show previous screenshot"
                      >
                        <ArrowLeft className="size-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        data-visible={galleryControlsVisible}
                        className="absolute right-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/60 backdrop-blur-sm transition duration-300 active:scale-95 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-violet-300/80 data-[visible=false]:opacity-0"
                        aria-label="Show next screenshot"
                      >
                        <ArrowRight className="size-5" aria-hidden="true" />
                      </button>
                    </>
                  ) : null}
                  <div
                    className="absolute bottom-3 left-3 z-20 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[0.65rem] font-semibold tabular-nums text-white/75 backdrop-blur-sm"
                    aria-live="polite"
                  >
                    {activeImage + 1} / {activeGallery.images.length}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>,
        document.body,
          )
        : null}
    </>
  );
}
