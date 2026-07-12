"use client";

import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("portfolio-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid size-11 shrink-0 place-items-center rounded-lg border border-border bg-card text-foreground outline-none transition duration-300 hover:bg-muted active:scale-95 focus-visible:ring-3 focus-visible:ring-violet-400/60"
      aria-label="Toggle light and dark theme"
      title="Toggle light and dark theme"
    >
      <Sun className="hidden size-5 dark:block" aria-hidden="true" />
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
    </button>
  );
}
