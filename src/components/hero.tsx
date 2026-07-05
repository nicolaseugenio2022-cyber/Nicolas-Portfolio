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
        <div className="max-w-3xl">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-100">
            <Sparkles className="size-4" aria-hidden="true" />
            Available for entry-level developer roles
          </p>

          <h1 className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Hey, I&apos;m{" "}
            <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-cyan-200 bg-clip-text text-transparent">
              {profile.shortName}
            </span>
          </h1>

          <p className="mt-5 font-heading text-2xl font-semibold text-zinc-200 sm:text-3xl">
            {profile.role}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 outline-none transition hover:bg-violet-400 focus-visible:ring-3 focus-visible:ring-violet-300/70"
            >
              View Projects
              <ArrowDown className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-violet-400/40 px-5 py-3 text-sm font-semibold text-violet-100 outline-none transition hover:bg-violet-500/10 focus-visible:ring-3 focus-visible:ring-violet-300/70"
            >
              Email Me
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-300">
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <MapPin className="size-4 text-violet-200" aria-hidden="true" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <Mail className="size-4 text-violet-200" aria-hidden="true" />
              {profile.email}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-500/20 to-cyan-400/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111116] p-6 shadow-2xl shadow-black/40">
            <div className="mb-5 flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-yellow-300" />
              <span className="size-3 rounded-full bg-green-400" />
            </div>
            <div className="rounded-xl border border-white/10 bg-black/35 p-5 font-mono text-sm leading-7 text-zinc-200">
              <p>
                <span className="text-violet-300">const</span>{" "}
                <span className="text-cyan-200">developer</span> = {"{"}
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
                  className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-3 py-4 text-center text-sm font-semibold text-violet-100"
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
