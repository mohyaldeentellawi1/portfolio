"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

const LINKS = [
  { label: "About Me", href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

type Href = (typeof LINKS)[number]["href"];

export default function Nav() {
  const t = useTranslations("Home");

  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<Href>("#about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleLinkClick(href: Href) {
    setActiveHref(href);
    setMenuOpen(false);
  }

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "backdrop-blur-md bg-background/75 border-b border-border/60 shadow-sm"
          : "",
      ].join(" ")}
    >
      {/* ── Desktop & Mobile bar ── */}
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        {/* LEFT — Brand */}
        <Link
          href="#"
          className="shrink-0 text-xl font-bold tracking-tight text-foreground transition-opacity duration-200 hover:opacity-80"
        >
          {t("Name")}
        </Link>

        {/* CENTER — Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {LINKS.map(({ label, href }) => {
            const isActive = activeHref === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => handleLinkClick(href)}
                  className={[
                    "relative text-sm font-medium transition-colors duration-200",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-primary",
                    "after:transition-transform after:duration-200",
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground after:scale-x-0 hover:after:scale-x-100",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT — Desktop CTA + Theme toggle + Mobile hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <Button
            className="hidden md:inline-flex items-center bg-primary px-4 text-sm font-medium
                       text-primary-foreground transition-colors duration-200 hover:bg-primary/85 active:scale-[0.97]"
          >
            Download CV
          </Button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-border
                       text-foreground transition-colors duration-200 hover:bg-muted
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Sun size={16} className="hidden dark:block" />
            <Moon size={16} className="dark:hidden" />
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-md
                       text-foreground transition-colors duration-200 hover:bg-muted focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-ring"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <div className="border-t border-border/60 px-6 sm:px-8 pb-6 pt-4 flex flex-col gap-1">
          {LINKS.map(({ label, href }) => {
            const isActive = activeHref === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => handleLinkClick(href)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "block py-3 text-sm font-medium transition-colors duration-200",
                  "border-b border-border/40 last:border-0",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}

          <Button className="w-full mt-4">Download CV</Button>
        </div>
      </div>
    </header>
  );
}
