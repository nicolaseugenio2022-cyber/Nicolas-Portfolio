import {
  ArrowDown,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-6 top-40 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:min-h-[calc(100dvh-96px)] lg:grid-cols-[1.08fr_0.92fr]">
        <div className="hero-open max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-300 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-900 shadow-lg shadow-violet-950/10 transition duration-300 ease-out hover:border-violet-500 hover:bg-violet-100 dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-100 dark:shadow-violet-950/15 dark:hover:border-violet-300/40 dark:hover:bg-violet-500/15">
            <Sparkles className="size-4" aria-hidden="true" />
            Available for entry-level developer roles
          </p>

          <h1 className="font-heading text-5xl font-bold leading-tight text-foreground sm:text-6xl lg:text-7xl">
            Hey, I&apos;m{" "}
            <span className="bg-gradient-to-r from-violet-700 via-purple-500 to-cyan-600 bg-clip-text text-transparent dark:from-violet-300 dark:via-purple-400 dark:to-cyan-200">
              {profile.shortName}
            </span>
          </h1>

          <p className="mt-5 font-heading text-2xl font-semibold text-foreground/85 sm:text-3xl">
            {profile.role}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 outline-none transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-violet-400 active:translate-y-0 active:scale-[0.98] focus-visible:ring-3 focus-visible:ring-violet-300/70"
            >
              View Projects
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-violet-500/60 bg-card px-5 py-3 text-sm font-semibold text-violet-800 outline-none transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-violet-100 active:translate-y-0 active:scale-[0.98] focus-visible:ring-3 focus-visible:ring-violet-400/70 dark:border-violet-400/40 dark:bg-transparent dark:text-violet-100 dark:hover:bg-violet-500/10 dark:focus-visible:ring-violet-300/70"
            >
              Email Me
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 transition duration-300 hover:border-violet-400/40 hover:bg-muted/60">
              <MapPin className="size-4 text-violet-700 dark:text-violet-200" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 transition duration-300 hover:border-violet-400/40 hover:bg-muted/60">
              <Mail className="size-4 text-violet-700 dark:text-violet-200" aria-hidden="true" />
              {profile.email}
            </span>
          </div>
        </div>

        <div className="hero-panel-open relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/20 to-cyan-400/10 blur-2xl transition duration-500 ease-out" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card p-6 shadow-2xl shadow-black/10 transition duration-500 ease-out hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-violet-950/15">
            <div className="mb-5 flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-yellow-300" />
              <span className="size-3 rounded-full bg-green-400" />
            </div>
            <div className="rounded-xl border border-border bg-[var(--surface-inset)] p-5 font-mono text-sm leading-7 text-foreground/85">
              <p>
                <span className="text-violet-700 dark:text-violet-300">const</span>{" "}
                <span className="text-cyan-700 dark:text-cyan-200">developer</span> = {"{"}
              </p>
              <p className="pl-5">name: &quot;Nicolas B. Eugenio&quot;,</p>
              <p className="pl-5">focus: &quot;Software Development&quot;,</p>
              <p className="pl-5">support: &quot;IT Operations&quot;,</p>
              <p className="pl-5">database: true,</p>
              <p>{"};"}</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Laravel", "React", "MySQL"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-violet-300 bg-violet-50 px-3 py-4 text-center text-sm font-semibold text-violet-900 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-violet-500 hover:bg-violet-100 active:translate-y-0 active:scale-[0.98] dark:border-violet-400/20 dark:bg-violet-500/10 dark:text-violet-100 dark:hover:border-violet-300/45 dark:hover:bg-violet-500/20"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
