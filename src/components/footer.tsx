import { SocialLinks } from "@/components/social-links";
import { portfolioStack, profile } from "@/data/profile";

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

        <SocialLinks ariaLabel="Footer social profiles" />
      </div>
    </footer>
  );
}
