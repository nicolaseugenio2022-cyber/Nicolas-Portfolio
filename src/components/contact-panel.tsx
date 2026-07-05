"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { contactDetails } from "@/data/profile";
import { cn } from "@/lib/utils";

const inputClasses =
  "min-h-11 w-full rounded-xl border border-violet-400/45 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-300 focus:ring-3 focus:ring-violet-400/25";

export function ContactPanel() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const usefulDetails = contactDetails.filter((item) =>
    ["Email", "Location"].includes(item.label)
  );
  const [delivery, setDelivery] = useState<{
    status: "idle" | "sending" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setDelivery({
      status: "sending",
      message: "Sending your message...",
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Message delivery failed.");
      }

      setForm({ name: "", email: "", message: "" });
      setDelivery({
        status: "success",
        message: "Delivery status: sent successfully. Thanks for reaching out.",
      });
    } catch (error) {
      setDelivery({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Delivery status: message failed to send.",
      });
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-violet-400/25 bg-black/25 p-6 shadow-2xl shadow-violet-950/20"
      >
        <h3 className="font-heading text-2xl font-bold text-white">
          Send me a message
        </h3>

        <div className="mt-6 grid gap-5">
          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Name
            <input
              required
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className={inputClasses}
              placeholder="Your name"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Email
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={inputClasses}
              placeholder="you@example.com"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-zinc-200">
            Message
            <textarea
              required
              name="message"
              rows={5}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={cn(inputClasses, "resize-y leading-7")}
              placeholder="Tell me about the role, project, or opportunity."
            />
          </label>
        </div>

        {delivery.status !== "idle" ? (
          <div
            className={cn(
              "mt-6 flex gap-3 rounded-xl border p-4 text-sm leading-6",
              delivery.status === "success"
                ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                : delivery.status === "error"
                  ? "border-red-400/30 bg-red-400/10 text-red-100"
                  : "border-violet-400/30 bg-violet-500/10 text-violet-100"
            )}
            role={delivery.status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {delivery.status === "success" ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : delivery.status === "error" ? (
              <XCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : (
              <Loader2
                className="mt-0.5 size-4 shrink-0 animate-spin"
                aria-hidden="true"
              />
            )}
            <span>{delivery.message}</span>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={delivery.status === "sending"}
          className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 outline-none transition hover:bg-violet-400 focus-visible:ring-3 focus-visible:ring-violet-300/70 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {delivery.status === "sending" ? "Sending..." : "Send Message"}
          {delivery.status === "sending" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="size-4" aria-hidden="true" />
          )}
        </button>
      </form>

      <div className="grid gap-6">
        <div className="rounded-xl border border-violet-400/20 bg-white/[0.035] p-6">
          <h3 className="font-heading text-2xl font-bold text-white">
            Let&apos;s work together
          </h3>
          <p className="mt-4 leading-8 text-zinc-300">
            I&apos;m open to entry-level developer roles, practical web systems,
            database-driven projects, and technical support work where clean
            workflows and dependable implementation matter.
          </p>
          <ul className="mt-5 grid gap-2 text-zinc-300">
            {[
              "Web application development",
              "Database-backed systems",
              "Administrative workflow tools",
              "IT support and troubleshooting",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-violet-400/20 bg-[#111116] p-6">
          <h3 className="font-heading text-xl font-bold text-white">
            Quick details
          </h3>
          <div className="mt-5 grid gap-3">
            {usefulDetails.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4"
              >
                <item.icon
                  className="size-5 shrink-0 text-violet-200"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold uppercase text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-400/10 p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="size-5 shrink-0 text-cyan-100"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-cyan-50">
                Open to developer roles and practical web system projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
