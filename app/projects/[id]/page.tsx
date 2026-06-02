import Image from "next/image";
import { ArrowUpRight, Code2, Calendar, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";
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
  const { getLocalizedText } = await getArabicTextServer();

  const { data } = await getProjectByIdAction({
    id: Number(id),
  });

  return (
    <main className="pt-24 pb-14 px-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        {/* ── Hero ── */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">
          <div className="flex justify-end mb-6">
            <BackButton />
          </div>
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

            {/* Right — main logo */}
            {(() => {
              const main = (data?.media ?? []).find((m) => m.isMain);
              if (!main) return null;
              return (
                <div className="flex items-center justify-center py-6">
                  <div className="relative flex flex-col items-center gap-4">
                    {/* Ambient glow */}
                    <div
                      aria-hidden
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                 w-56 h-56 rounded-full bg-primary/15 blur-3xl pointer-events-none"
                    />

                    {/* Logo card */}
                    <div
                      className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-lg border border-border/50
                                    bg-card shadow-lg overflow-hidden flex items-center justify-center p-6"
                    >
                      <Image
                        src={main.thumbnailUrl ?? main.url}
                        alt={getLocalizedText(
                          data?.titleEn ?? "",
                          data?.title ?? "",
                        )}
                        fill
                        className="object-contain p-5"
                        sizes="(max-width: 640px) 208px, 256px"
                        priority
                      />
                    </div>
                  </div>
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
                      className={`${isPortrait ? "flex items-end justify-center gap-4" : "flex flex-col w-full gap-3"}${!section.imageRight ? " lg:order-1" : ""}`}
                    >
                      {isPortrait ? (
                        /* Portrait (mobile) — side-by-side phone screens */
                        images.length > 0 ? (
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
                                  loading="eager"
                                />
                              )}
                            </div>
                          ))
                        ) : (
                          <>
                            <div className={`w-48 ${aspectClass}  bg-muted`} />
                            <div className={`w-48 ${aspectClass}  bg-muted`} />
                          </>
                        )
                      ) : images.length > 0 ? (
                        /* Landscape (web/desktop) — browser-framed screenshots side by side */
                        <div className="flex gap-3 w-full items-start">
                          {images.map((img, index) => (
                            <div
                              key={img.id}
                              className="flex-1 rounded-sm border border-border overflow-hidden shadow-lg"
                            >
                              <div className="bg-muted/80 px-3 py-2 flex items-center gap-2 border-b border-border">
                                <div className="flex gap-1.5">
                                  <div className="w-2 h-2 rounded-full bg-destructive/60" />
                                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                                </div>
                                {index === 0 && (
                                  <div className="flex-1 mx-1 px-2 py-0.5 text-xs text-muted-foreground truncate select-none">
                                    {data?.liveUrl ?? "https://app.example.com"}
                                  </div>
                                )}
                              </div>
                              <div className="relative aspect-video w-full bg-muted">
                                {img.url && (
                                  <Image
                                    src={img.thumbnailUrl ?? img.url}
                                    alt=""
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 1024px) 50vw, 25vw"
                                    loading="eager"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Landscape empty state */
                        <div className="w-full rounded-xl border border-border overflow-hidden shadow-lg">
                          <div className="bg-muted/80 px-3 py-2 flex items-center gap-2 border-b border-border">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                            </div>
                            <div className="flex-1 mx-2 px-2 py-0.5 text-xs text-muted-foreground truncate select-none">
                              https://app.example.com
                            </div>
                          </div>
                          <div className="aspect-video w-full bg-muted" />
                        </div>
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
