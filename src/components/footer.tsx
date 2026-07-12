import { siFacebook, siGithub, type SimpleIcon } from "simple-icons";
import { portfolioStack, profile, socialLinks } from "@/data/profile";

type SocialIcon = Pick<SimpleIcon, "title" | "path">;

const socialIcons: Record<string, SocialIcon> = {
  GitHub: siGithub,
  Facebook: siFacebook,
  LinkedIn: {
    title: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/65 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-base font-semibold text-foreground">
            © 2026 {profile.name}.
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Built with {portfolioStack.join(", ")}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const icon = socialIcons[link.label];

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="grid size-11 place-items-center rounded-xl border border-border bg-card text-muted-foreground outline-none transition duration-300 ease-out hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-violet-500/15 hover:text-foreground active:translate-y-0 active:scale-95 focus-visible:ring-3 focus-visible:ring-violet-400/60"
              >
                <svg
                  role="img"
                  aria-label={icon.title}
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="currentColor"
                >
                  <path d={icon.path} />
                </svg>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
