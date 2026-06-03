"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Clock, Eye } from "lucide-react";
import { useGetBlogById } from "@/lib/helpers/use-get-blog-by-id";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { ContentRenderer } from "@/components/Content-Renderer";
import { incrementReaderCountAction } from "@/lib/actions/blog/action";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function TechBlogPostPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const t = useTranslations("Home");
  const { getLocalizedText, isArabic } = useArabicText();

  const { isLoading, blog } = useGetBlogById(Number(params.id));

  useEffect(() => {
    if (blog?.id) {
      incrementReaderCountAction({ id: blog.id });
    }
  }, [blog?.id]);

  const content = blog
    ? getLocalizedText(blog.contentEn ?? "", blog.content)
    : "";
  const title = blog ? getLocalizedText(blog.titleEn ?? "", blog.title) : "";
  const readMin = blog ? blog.readingTime : 0;

  if (isLoading) {
    return (
      <PageShell>
        <LoadingSkeleton />
      </PageShell>
    );
  }

  if (!blog) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <p className="text-base font-semibold text-foreground">
            {t("Articlenotfound")}
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-sm text-primary
                       transition-colors duration-200 hover:text-primary/80
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft size={14} />
            {t("Backtoblog")}
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* Back */}
      <Button
        variant="outline"
        type="button"
        onClick={() => router.back()}
        className="bg-white dark:bg-card inline-flex self-end items-center gap-1.5 text-xs font-medium text-muted-foreground
                   transition-colors duration-200 hover:text-foreground
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {t("Backtoblog")}
        {isArabic ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
      </Button>

      <div className="bg-card border rounded-sm shadow-2xl shadow-slate-400 dark:shadow-slate-800 p-8 md:p-10 lg:p-14">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border  pb-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            {blog.type}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-snug">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {readMin} {t("minread")}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {blog.readerCount} {t("readers")}
            </span>
          </div>
        </div>

        {/* Body */}
        <article className="mt-8">
          <ContentRenderer content={content} />
        </article>
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-24 pb-14 px-6 sm:px-8 lg:px-10 min-h-screen">
      <div className="mx-auto max-w-6xl flex flex-col gap-8">{children}</div>
    </main>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Back button */}
      <Skeleton className="h-8 w-28 rounded self-end" />

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-border pb-8">
        <Skeleton className="h-3 w-20 rounded" />
        <Skeleton className="h-8 w-3/4 rounded" />
        <div className="flex items-center gap-5">
          <Skeleton className="h-3 w-28 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>

      {/* Body lines */}
      <div className="flex flex-col gap-3">
        {[75, 90, 85, 60, 95, 80, 70, 88].map((w, i) => (
          <Skeleton
            key={i}
            className="h-3 rounded"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  );
}
