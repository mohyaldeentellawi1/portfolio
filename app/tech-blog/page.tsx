"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { useGetAllBlogs } from "@/lib/helpers/use-get-all-blogs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import CustomPagination from "@/components/custom-pagination";
import BackButton from "@/components/back-button";
import { getCategoryCountsAction } from "@/lib/actions/blog/action";
import { BlogItem, FeaturedPost, TYPE_LABELS } from "@/components/Blog-Item";
import {
  ExploreByTopic,
  SubscribeCard,
  TrendingNow,
} from "@/components/blogs-components";

const CATEGORIES = [
  "All",
  "FRONTEND",
  "BACKEND",
  "SOFTWARE_ENGINEERING",
  "AI",
  "DEVOPS",
  "FLUTTER",
  "MOBILE",
  "PRODUCT_DEVELOPMENT",
  "CAREER",
  "CASE_STUDY",
];

export default function TechBlogPage() {
  const t = useTranslations("Home");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {},
  );
  const searchRef = useRef<HTMLInputElement>(null);

  const {
    isLoading,
    isPending,
    blogs: POSTS,
    pagination,
    fetchBlogs,
    handlePageChange,
  } = useGetAllBlogs();

  useEffect(() => {
    fetchBlogs(1, 5, activeCategory === "All" ? undefined : activeCategory);
  }, [fetchBlogs, activeCategory]);

  useEffect(() => {
    getCategoryCountsAction().then(({ success, data }) => {
      if (success) setCategoryCounts(data);
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return POSTS;
    const q = searchQuery.toLowerCase();
    return POSTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.titleEn ?? "").toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.contentEn ?? "").toLowerCase().includes(q),
    );
  }, [POSTS, searchQuery]);

  const [featured, ...rest] = filtered;

  return (
    <main className="pt-25 pb-14 px-6 sm:px-8 lg:px-10 min-h-screen">
      <div className="mx-auto max-w-7xl w-full flex flex-col gap-8">
        {/* ── Header ── */}
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex justify-end w-full">
            <BackButton />
          </div>

          <div className="flex flex-col items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {t("TechnicalInsights")}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
              {t("Deepdivesintosoftwareengineering")}
            </p>
          </div>

          <div className="flex h-10 w-full max-w-md items-center gap-3 rounded border border-input bg-card px-4 transition-colors duration-200 focus-within:ring-2 focus-within:ring-ring">
            <Search size={14} className="shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("Searcharticles")}
              className="h-full flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
        </div>

        {/* ── Category tabs ─ */}
        <div
          dir="ltr"
          className="border-y border-border py-2 overflow-x-auto scrollbar-none"
        >
          <div className="flex items-center gap-1 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                }}
                className={cn(
                  "px-3 py-1.5 rounded text-sm font-semibold whitespace-nowrap transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {TYPE_LABELS[cat] ?? cat.replace(/_/g, " ")}
                {categoryCounts[cat] !== undefined && (
                  <span
                    className={cn(
                      "ml-1.5 text-xs font-normal",
                      activeCategory === cat
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground/60",
                    )}
                  >
                    {categoryCounts[cat]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content + Sidebar ─ */}
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-3 gap-6 transition-opacity duration-200",
            isPending && "opacity-40 pointer-events-none",
          )}
        >
          {/* Main column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {isLoading ? (
              <>
                <Skeleton className="h-44 w-full rounded-lg" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-56 w-full rounded-lg" />
                  ))}
                </div>
              </>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-2 text-center rounded-lg border border-border bg-card p-14 min-h-64">
                <p className="text-sm font-medium text-foreground">
                  {t("Noarticlesinthiscategoryyet")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("Checkbacksoon")}
                </p>
              </div>
            ) : (
              <>
                {featured && <FeaturedPost post={featured} />}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {rest.map((post) => (
                      <BlogItem key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <TrendingNow posts={POSTS} isLoading={isLoading} t={t} />
            <ExploreByTopic
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
              t={t}
            />
            <SubscribeCard t={t} />
          </div>
        </div>

        {/* ── Pagination ─ */}
        {pagination && !isLoading && (
          <CustomPagination
            pagination={pagination}
            onPageChange={(page) => handlePageChange(page, 5)}
          />
        )}
      </div>
    </main>
  );
}
