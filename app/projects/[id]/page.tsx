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
              <div className="flex flex-wrap items-center gap-3">
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
                  <span className="inline-flex items-center gap-2 rounded border border-border bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed opacity-60 whitespace-nowrap">
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
                            loading="eager"
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
        {data?.sections && data.sections.length > 0 && (
          <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm flex flex-col gap-16">
            {[...data.sections]
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                const isPortrait = data.techType === "MOBILE";
                const aspectClass = isPortrait ? "aspect-9/19" : "aspect-video";
                const images = [...(section.media ?? [])].sort(
                  (a, b) => a.order - b.order,
                );
                return (
                  <div
                    key={section.id}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center"
                  >
                    {/* Text */}
                    <FadeIn
                      className={`flex flex-col gap-3${!section.imageRight ? " lg:order-2" : ""}`}
                    >
                      <span className="text-5xl font-bold tracking-tight text-border select-none">
                        {String(section.order).padStart(2, "0")}
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">
                        {getLocalizedText(section.titleEn ?? "", section.title)}
                      </h2>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {getLocalizedText(
                          section.descriptionEn ?? "",
                          section.description,
                        )}
                      </p>
                    </FadeIn>

                    {/* Images */}
                    <FadeIn
                      delay={150}
                      className={`flex items-end justify-center gap-4${!section.imageRight ? " lg:order-1" : ""}`}
                    >
                      {images.length > 0 ? (
                        images.map((img) => (
                          <div
                            key={img.id}
                            className={`w-48 ${aspectClass} relative`}
                          >
                            {img.url && (
                              <Image
                                src={img.thumbnailUrl ?? img.url}
                                alt=""
                                fill
                                className="object-contain"
                                sizes="192px"
                              />
                            )}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className={`w-48 ${aspectClass} rounded-lg bg-muted`} />
                          <div className={`w-48 ${aspectClass} rounded-lg bg-muted`} />
                        </>
                      )}
                    </FadeIn>
                  </div>
                );
              })}
          </div>
        )}

        {/* ── Tech stack ── */}
        {/* <div className="bg-card border border-border rounded-lg p-8 md:p-10 shadow-sm">
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
        </div> */}
      </div>
    </main>
  );
}
