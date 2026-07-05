import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <a
      href="#home"
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-50 grid size-12 place-items-center rounded-full border border-violet-300/30 bg-violet-500 text-white shadow-2xl shadow-violet-950/50 outline-none transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-violet-400 active:translate-y-0 active:scale-95 focus-visible:ring-3 focus-visible:ring-violet-300/70 sm:bottom-7 sm:right-7"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </a>
  );
}
