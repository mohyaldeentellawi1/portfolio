import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 sm:px-8 lg:px-10 py-12">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        {/* ── Copy + Form in same row ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Copy — start side */}
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold text-foreground">
              Stay in the loop
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Get notified about the latest projects and the newest
              technological trends — straight to your inbox.
            </p>
          </div>

          {/* Subscribe form — end side, button inside input */}
          <form className="w-full lg:w-auto lg:min-w-100">
            {/* Outer wrapper acts as the visual input container */}
            <div
              className="flex h-13 w-full items-center rounded border border-input
                         bg-background pr-1.5 transition-colors duration-200
                         focus-within:ring-2 focus-within:ring-ring"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="h-full flex-1 bg-transparent px-4 text-sm text-foreground
                           placeholder:text-muted-foreground outline-none"
              />
              <Button type="submit" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </form>
        </div>

        {/* ── Bottom line ── */}
        <div className="border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Muheddin Tellawi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
