"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Mobile",
  "AI / ML",
  "DevOps",
];

const POSTS = [
  {
    id: 1,
    category: "Frontend",
    title: "Building Accessible React Components from Scratch",
    excerpt:
      "Accessibility is not an afterthought — it is a core part of great UI. We walk through building a fully accessible modal, dropdown, and form with keyboard navigation, ARIA roles, and screen-reader testing.",
    date: "May 20, 2026",
    readTime: "8 min",
  },
  {
    id: 2,
    category: "Backend",
    title: "PostgreSQL Performance Tuning: Index Strategies That Actually Work",
    excerpt:
      "Most developers know indexes speed up queries, but few understand when they hurt. Covering indexes, partial indexes, and how to read EXPLAIN ANALYZE output.",
    date: "May 18, 2026",
    readTime: "12 min",
  },
  {
    id: 3,
    category: "Mobile",
    title: "Flutter vs React Native in 2026: An Honest Comparison",
    excerpt:
      "After shipping production apps in both frameworks — an unbiased breakdown of performance, DX, ecosystem maturity, and when to pick one over the other.",
    date: "May 15, 2026",
    readTime: "10 min",
  },
  {
    id: 4,
    category: "AI / ML",
    title: "Integrating Claude API into Your Next.js App",
    excerpt:
      "A practical guide to adding Claude-powered features — streaming responses, tool use, and context management — into a production Next.js application.",
    date: "May 12, 2026",
    readTime: "7 min",
  },
  {
    id: 5,
    category: "DevOps",
    title: "Zero-Downtime Deployments with Docker and GitHub Actions",
    excerpt:
      "How to set up a CI/CD pipeline that ships updates to production with zero downtime using blue-green deployments, Docker Compose, and Nginx.",
    date: "May 10, 2026",
    readTime: "15 min",
  },
  {
    id: 6,
    category: "Frontend",
    title: "The Complete Guide to CSS Container Queries",
    excerpt:
      "Media queries solve the wrong problem. Container queries let components respond to their own size — here is how to use them effectively today.",
    date: "May 6, 2026",
    readTime: "9 min",
  },
];

export default function TechBlogPage() {
  const t = useTranslations("Home");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-24 pb-14 px-6 sm:px-8 lg:px-10 min-h-screen">
      <div className="mx-auto max-w-5xl flex flex-col gap-12">
        {/* ── Header ── */}
        <div className="flex flex-col gap-6 pt-2">
          {/* Category filter */}
          <div dir="ltr" className="overflow-x-auto scrollbar-none">
            <div className="flex gap-1.5 w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    ${
                      activeCategory === cat
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Articles ── */}
        {filtered.length > 0 ? (
          <div className="flex flex-col">
            {filtered.map((post, i) => (
              <Link
                key={post.id}
                href={`/tech-blog/${post.id}`}
                className={`group flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-10 py-8
                  ${i === 0 ? "border-t border-border/60" : ""}
                  border-b border-border/60
                  transition-colors duration-200 hover:bg-muted/30
                  -mx-4 px-4 rounded
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
              >
                {/* Left — meta */}
                <div className="sm:w-40 shrink-0 flex sm:flex-col gap-3 sm:gap-1.5 flex-wrap">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                {/* Right — content */}
                <div className="flex-1 flex flex-col gap-2.5">
                  <h2 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {t("Readarticle")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center min-h-64">
            <p className="text-sm font-medium text-foreground">
              {t("Noarticlesinthiscategoryyet")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("Checkbacksoon")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
