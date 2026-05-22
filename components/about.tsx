import { Play } from "lucide-react";
import { getTranslations } from "next-intl/server";

import Image from "next/image";

export default async function About() {
  const t = await getTranslations("Home");

  return (
    <section
      id="about"
      className="flex items-center pt-25 pb-14 px-6 sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* ── Container ── */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">
          {/* ── Top row: image + bio ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            {/* Developer image + socials */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-full lg:max-w-sm rounded-full overflow-hidden border border-border/40 shadow-md">
                <Image
                  src="/myImage.svg"
                  alt="Muheddin Tellawi — developer portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3">
                {[
                  {
                    href: "https://github.com/mohyaldeentellawi1",
                    src: "/github.svg",
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/mohyaldeentellawi",
                    src: "/linkedin.svg",
                    label: "LinkedIn",
                  },
                  {
                    href: "https://t.me/MohyaldeenT",
                    src: "/telegram.svg",
                    label: "Telegram",
                  },
                  {
                    href: "https://www.instagram.com/MohyaldeenT",
                    src: "/instagram.svg",
                    label: "Instagram",
                  },
                ].map(({ href, src, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded border border-border bg-background
                               transition-colors duration-200 hover:bg-muted hover:border-border/80
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Image
                      src={src}
                      alt={label}
                      width={18}
                      height={18}
                      className={label === "GitHub" ? "dark:invert" : ""}
                      loading="eager"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Bio text */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground leading-snug">
                  {t("IdontjustwritecodeIcraftsoftware")}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("AboutBio1")}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("AboutBio2")}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("AboutBio3")}
                </p>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border/40">
                {[
                  { value: "4+", label: t("YearsExp") },
                  { value: "20+", label: t("Projects") },
                  { value: "100%", label: t("Dedication") },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col gap-0.5 pt-4">
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                      {value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="my-10 border-t border-border/40" />

          {/* ── Video placeholder ── */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {t("Introduction")}
              </span>
              <p className="text-sm text-muted-foreground">
                {t("AShortWalkthroughOfWhoIAmAndWhatIBuild")}
              </p>
            </div>

            <div className="group relative w-full mx-auto aspect-video overflow-hidden rounded-2xl border border-border bg-muted cursor-pointer">
              {/* Centered play button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-transform duration-300 group-hover:scale-105">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full
                             bg-primary/10 border border-primary/20
                             transition-colors duration-200 group-hover:bg-primary/20"
                >
                  <Play className="text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {t("WatchIntroduction")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
