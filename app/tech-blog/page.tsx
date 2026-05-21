"use client";

import { useState } from "react";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogItem from "@/components/blog-item";
import { useTranslations } from "next-intl";

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Mobile",
  "AI / ML",
  "DevOps",
  "Open Source",
];

const POSTS = [
  {
    id: 1,
    category: "Frontend",
    title: "Building Accessible React Components from Scratch",
    excerpt:
      "Accessibility is not an afterthought — it is a core part of great UI. We walk through building a fully accessible modal, dropdown, and form with keyboard navigation, ARIA roles, and screen-reader testing.",
    author: { name: "Ali Hassan", initials: "AH" },
    date: "May 20, 2026",
    readTime: "8 min read",
    likes: 142,
    comments: 23,
    tags: ["React", "a11y", "TypeScript"],
  },
  {
    id: 2,
    category: "Backend",
    title: "PostgreSQL Performance Tuning: Index Strategies That Actually Work",
    excerpt:
      "Most developers know indexes speed up queries, but few understand when they hurt. This deep-dive covers covering indexes, partial indexes, and how to read EXPLAIN ANALYZE output.",
    author: { name: "Mohyaldeen T.", initials: "MT" },
    date: "May 18, 2026",
    readTime: "12 min read",
    likes: 89,
    comments: 14,
    tags: ["PostgreSQL", "Performance", "SQL"],
  },
  {
    id: 3,
    category: "Mobile",
    title: "Flutter vs React Native in 2026: An Honest Comparison",
    excerpt:
      "After shipping production apps in both frameworks, here is an unbiased breakdown of performance, DX, ecosystem maturity, and when to pick one over the other.",
    author: { name: "Sara Al-Amin", initials: "SA" },
    date: "May 15, 2026",
    readTime: "10 min read",
    likes: 201,
    comments: 47,
    tags: ["Flutter", "React Native", "Mobile"],
  },
  {
    id: 4,
    category: "AI / ML",
    title: "Integrating Claude API into Your Next.js App",
    excerpt:
      "A practical guide to adding Claude-powered features — streaming responses, tool use, and context management — into a production Next.js application without overengineering it.",
    author: { name: "Kareem Nour", initials: "KN" },
    date: "May 12, 2026",
    readTime: "7 min read",
    likes: 315,
    comments: 61,
    tags: ["AI", "Next.js", "Claude API"],
  },
  {
    id: 5,
    category: "DevOps",
    title: "Zero-Downtime Deployments with Docker and GitHub Actions",
    excerpt:
      "How to set up a CI/CD pipeline that ships updates to production with zero downtime using blue-green deployments, Docker Compose, and a simple Nginx reverse proxy.",
    author: { name: "Lena Müller", initials: "LM" },
    date: "May 10, 2026",
    readTime: "15 min read",
    likes: 73,
    comments: 9,
    tags: ["Docker", "CI/CD", "DevOps"],
  },
  {
    id: 6,
    category: "Open Source",
    title: "Contributing to Open Source: Your First Meaningful PR",
    excerpt:
      "Beyond fixing typos — how to identify impactful issues, understand unfamiliar codebases quickly, write a PR that gets merged, and build a reputation in the OSS community.",
    author: { name: "David Park", initials: "DP" },
    date: "May 8, 2026",
    readTime: "6 min read",
    likes: 167,
    comments: 32,
    tags: ["Open Source", "Git", "Community"],
  },
];

export type Post = (typeof POSTS)[number];

export default function TechBlogPage() {
  const t = useTranslations("Home");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.category === activeCategory);

  return (
    <main className="pt-24 pb-14 px-6 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        {/* ── Hero ── */}
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-xl">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {t("Builtbydevelopersfordevelopers")}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("TechBlogDescription")}
              </p>
            </div>
            <div className="shrink-0 self-start sm:self-center">
              <Button size="sm">
                <Pen size={14} />
                {t("WriteaPost")}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Category filter ── */}
        <div dir="ltr" className="overflow-x-auto scrollbar-none -mx-1 px-1">
          <div className="flex gap-2 w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Posts grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((post) => (
            <BlogItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
