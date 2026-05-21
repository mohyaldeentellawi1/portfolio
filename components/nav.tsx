"use client";

import { useEffect, useRef, useSyncExternalStore, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { setLocale } from "@/app/actions";

const SECTION_IDS = ["about", "project", "reviews", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

type NavLink =
  | { label: string; sectionId: SectionId }
  | { label: string; href: string };

// ── Active-section store ─────────────────────────────────────────────────────
// Lives outside React so useSyncExternalStore can subscribe to it.
// sessionStorage is the backing store; listeners notify React of changes.
const STORAGE_KEY = "nav-active-section";
const PENDING_KEY = "nav-pending-scroll";
const _listeners = new Set<() => void>();

function _getSection(): SectionId {
  return (sessionStorage.getItem(STORAGE_KEY) as SectionId) ?? "about";
}
function _setSection(id: SectionId) {
  sessionStorage.setItem(STORAGE_KEY, id);
  _listeners.forEach((fn) => fn());
}
function _subscribe(cb: () => void) {
  _listeners.add(cb);
  return () => _listeners.delete(cb);
}

export default function Nav() {
  const t = useTranslations("Home");

  const LINKS: NavLink[] = [
    { label: t("AboutMe"), sectionId: "about" },
    { label: t("Project"), sectionId: "project" },
    { label: t("Reviews"), sectionId: "reviews" },
    { label: t("Contact"), sectionId: "contact" },
    { label: t("TechBlog"), href: "/tech-blog" },
  ];

  const locale = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isProgrammaticScroll = useRef(false);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout>>(null);

  // Server snapshot → "about" (matches SSR, no hydration mismatch).
  // Client snapshot → reads sessionStorage (correct persisted value).
  const activeId = useSyncExternalStore(
    _subscribe,
    _getSection,
    () => "about" as SectionId,
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Only run scroll-spy when sections are present on this page
      if (!document.getElementById(SECTION_IDS[0])) return;

      // Suppress scroll-spy while a programmatic scroll is in progress
      if (isProgrammaticScroll.current) {
        if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
        scrollEndTimer.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 150);
        return;
      }

      let current: SectionId = "about";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) current = id;
      }
      _setSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When arriving at home, execute any pending section scroll
  useEffect(() => {
    if (pathname !== "/") return;

    // Suppress scroll-spy immediately so the browser's scroll restoration
    // (back navigation) doesn't overwrite the stored active section.
    isProgrammaticScroll.current = true;

    const pending = sessionStorage.getItem(PENDING_KEY) as SectionId | null;

    if (pending) {
      sessionStorage.removeItem(PENDING_KEY);
      const timer = setTimeout(() => {
        document
          .getElementById(pending)
          ?.scrollIntoView({ behavior: "smooth" });
        _setSection(pending);
        // isProgrammaticScroll stays true; the scroll-end debounce clears it.
      }, 100);
      return () => clearTimeout(timer);
    }

    // No pending scroll (e.g. browser back) — wait for scroll to settle,
    // then sync activeId to the actual visible section.
    const timer = setTimeout(() => {
      let current: SectionId = "about";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) current = id;
      }
      _setSection(current);
      isProgrammaticScroll.current = false;
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function scrollTo(id: SectionId) {
    setMenuOpen(false);
    _setSection(id);
    if (document.getElementById(id)) {
      isProgrammaticScroll.current = true;
      document.getElementById(id)!.scrollIntoView({ behavior: "smooth" });
    } else {
      isProgrammaticScroll.current = true;
      sessionStorage.setItem(PENDING_KEY, id);
      router.push("/");
    }
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
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        {/* LEFT — Brand */}
        <Link
          href="#"
          className="shrink-0 text-xl font-bold tracking-tight text-foreground transition-opacity duration-200 hover:opacity-80"
        >
          {t("Name")}
        </Link>

        {/* CENTER — Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {LINKS.map((link) => {
            const isActive =
              "sectionId" in link
                ? pathname === "/" && activeId === link.sectionId
                : pathname === link.href;
            const className = [
              "relative text-sm font-medium transition-colors duration-200",
              "after:absolute after:inset-x-0 after:-bottom-2 after:h-px after:bg-primary",
              isActive
                ? "text-foreground after:opacity-100"
                : "text-muted-foreground hover:text-foreground after:opacity-0",
            ].join(" ");
            return (
              <li key={link.label}>
                {"sectionId" in link ? (
                  <button
                    onClick={() => scrollTo(link.sectionId)}
                    className={className}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={className}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* RIGHT — Desktop CTA + Theme toggle + Mobile hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <Button
            render={<Link href="/auth" />}
            nativeButton={false}
            className="hidden md:inline-flex items-center bg-primary px-4 text-sm font-medium
                       text-primary-foreground transition-colors duration-200 hover:bg-primary/85 active:scale-[0.97]"
          >
            {t("LogIn")}
          </Button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle theme"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-border
                       text-foreground transition-colors duration-200 hover:bg-muted
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Sun size={16} className="hidden dark:block" />
            <Moon size={16} className="dark:hidden" />
          </button>

          {/* Locale toggle */}
          <button
            type="button"
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            aria-label="Toggle language"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-border
                       text-foreground text-xs font-semibold transition-colors duration-200 hover:bg-muted
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {locale === "en" ? "AR" : "EN"}
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
          {LINKS.map((link) => {
            const isActive =
              "sectionId" in link
                ? pathname === "/" && activeId === link.sectionId
                : pathname === link.href;
            const className = [
              "block w-full text-start py-3 text-sm font-medium transition-colors duration-200",
              "border-b border-border/40 last:border-0",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ");
            return "sectionId" in link ? (
              <button
                key={link.label}
                type="button"
                onClick={() => scrollTo(link.sectionId)}
                aria-current={isActive ? "page" : undefined}
                className={className}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={className}
              >
                {link.label}
              </Link>
            );
          })}

          <Button
            render={<Link href="/auth" />}
            onClick={() => setMenuOpen(false)}
            nativeButton={false}
            className="w-full mt-4"
          >
            {t("LogIn")}
          </Button>
        </div>
      </div>
    </header>
  );
}
