import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Calendar,
  Clock,
  ArrowRight,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FadeIn from "@/components/fade-in";
import { getTranslations } from "next-intl/server";
import { getArabicTextServer } from "@/lib/utils/arabic-helper-server";
import { getProjectByIdAction } from "@/lib/actions/projects/action";

const PROJECT = {
  title: "UrbanNest",
  label: "Mobile App",
  tags: ["React Native", "Expo", "Node.js", "PostgreSQL"],
  description:
    "A modern real estate platform that connects buyers, sellers, and renters through intelligent property matching and immersive virtual tours — built for speed, clarity, and delight.",
  liveUrl: "https://example.com",
  githubUrl: "https://github.com",
  year: "2024",
  duration: "4 months",
  role: "Full-Stack Developer",
  sections: [
    {
      step: "01",
      title: "The Problem",
      description:
        "Finding the right property was overwhelming. Users drowned in endless listings with no context, no narrative, and no way to feel a space before visiting it in person. We set out to change that entirely — starting from how people search.",
      imageRight: false,
    },
    {
      step: "02",
      title: "Smart Search & Filters",
      description:
        "We built an intelligent filter system that learns from user behavior. The more you interact, the better the results — surfacing properties that match your lifestyle, budget, and commute, not just square footage.",
      imageRight: true,
    },
    {
      step: "03",
      title: "Immersive Virtual Tours",
      description:
        "Before booking a visit, users walk through any property via an interactive 3D tour. Built with a custom renderer, each tour loads in under two seconds — even on a mid-range mobile connection.",
      imageRight: false,
    },
    {
      step: "04",
      title: "The Result",
      description:
        "Within 3 months of launch, UrbanNest reached 12,000 active users with a 4.8-star rating. Booking conversion improved by 340% compared to the client's previous platform, validated by an independent audit.",
      imageRight: true,
    },
  ],
  tech: [
    "React Native",
    "Expo",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "Prisma",
    "Cloudinary",
    "Google Maps API",
    "Stripe",
  ],
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("Home");
  const { isArabic, getLocalizedText } = await getArabicTextServer();

  const { data } = await getProjectByIdAction({
    id: Number(id),
  });

  return (
    <main className="pt-24 pb-14 px-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        {/* ── Back link ── */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground self-end
                     transition-colors duration-200 hover:text-foreground w-fit rounded
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("Projects")}
          {isArabic ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
        </Link>

        {/* ── Hero ── */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            {/* Left — info */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {data?.techType}
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                  {getLocalizedText(data?.titleEn ?? "", data?.title ?? "")}
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {getLocalizedText(
                    data?.descriptionEn ?? "",
                    data?.description ?? "",
                  )}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {data &&
                  data?.tags?.map((tag) => (
                    <span
                      key={tag.tag.id}
                      className="inline-flex items-center rounded border border-border
                               bg-muted px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {tag.tag.name}
                    </span>
                  ))}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-border/40 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {data?.createdAt
                    ? new Date(data.createdAt).getFullYear()
                    : "Year Unavailable"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {data?.createdAt
                    ? `${Math.ceil(
                        (new Date().getTime() -
                          new Date(data.createdAt).getTime()) /
                          (1000 * 60 * 60 * 24 * 30),
                      )} ${t("months")}`
                    : "Duration Unavailable"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button
                  render={
                    <a
                      href={data?.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                  nativeButton={false}
                >
                  {t("ViewLive")}
                  <ArrowUpRight size={15} />
                </Button>
                {data?.githubUrl ? (
                  <Button
                    render={
                      <a
                        href={data.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    nativeButton={false}
                    variant="outline"
                  >
                    <Code2 size={15} />
                    {t("SourceCode")}
                  </Button>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-60">
                    <Lock size={15} />
                    {t("Proprietary")} — {t("SourceNotPublic")}
                  </span>
                )}
              </div>
            </div>

            {/* Right — hero screenshots */}
            {(() => {
              const heroImages = [...(data?.media ?? [])]
                .sort((a, b) => a.order - b.order)
                .slice(0, 3);
              const isPortrait = data?.techType === "MOBILE";
              const aspectClass = isPortrait ? "aspect-9/19" : "aspect-video";
              const items =
                heroImages.length > 0 ? heroImages : [null, null, null];
              return (
                <div className="flex items-end justify-center gap-4 py-4">
                  {items.map((img, i) => {
                    const isCenter = items.length === 3 && i === 1;
                    return (
                      <div
                        key={img?.id ?? i}
                        className={`${isCenter ? "w-36" : "w-28"} ${aspectClass} relative`}
                      >
                        {img?.url && (
                          <Image
                            src={img.thumbnailUrl ?? img.url}
                            alt=""
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 112px, 144px"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>

        {/* ── Story sections ── */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm flex flex-col gap-16">
          {PROJECT.sections.map((section) => (
            <div
              key={section.step}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center"
            >
              {/* Text — always first in DOM (top on mobile) */}
              <FadeIn
                className={`flex flex-col gap-3${!section.imageRight ? " lg:order-2" : ""}`}
              >
                <span className="text-5xl font-bold tracking-tight text-border select-none">
                  {section.step}
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {section.description}
                </p>
              </FadeIn>

              {/* 2 portrait screenshots */}
              <FadeIn
                delay={150}
                className={`flex items-end justify-center gap-4${!section.imageRight ? " lg:order-1" : ""}`}
              >
                <div className="w-32 aspect-9/19 rounded-lg overflow-hidden border border-border bg-linear-to-br from-primary/10 via-muted to-muted/60 shadow-sm" />
                <div className="w-32 aspect-9/19 rounded-lg overflow-hidden border border-border bg-linear-to-br from-muted via-primary/5 to-primary/15 shadow-sm" />
              </FadeIn>
            </div>
          ))}
        </div>

        {/* ── Tech stack ── */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 shadow-sm">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {PROJECT.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded border border-border
                             bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
