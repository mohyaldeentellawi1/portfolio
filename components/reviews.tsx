"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

const REVIEWS = [
  {
    id: 1,
    name: "Alex Johnson",
    quote:
      "Working with Muheddin was a pleasure from start to finish. Pixel-perfect UI, clean architecture, and exceptional attention to detail at every step.",
  },
  {
    id: 2,
    name: "Sarah Miller",
    quote:
      "Delivered the full dashboard ahead of schedule without compromising quality. The code is clean, well-structured, and incredibly easy to maintain.",
  },
  {
    id: 3,
    name: "James Wilson",
    quote:
      "The UI components are incredibly polished. Great communication throughout, strong design sensibility, and excellent performance at every layer.",
  },
  {
    id: 4,
    name: "Emily Chen",
    quote:
      "Transformed rough wireframes into a stunning, fully responsive product. Elegant, fast, and built to scale — exactly what we needed.",
  },
] as const;

function ReviewCard({
  review,
  position,
}: {
  review: (typeof REVIEWS)[number];
  position: "left" | "center" | "right";
}) {
  const isCenter = position === "center";
  const rotation = position === "left" ? 7.35 : -7.35;

  return (
    <div
      className={cn(
        "relative shrink-0 w-80 transition-all duration-500 ease-in-out",
        isCenter ? "z-10 scale-100 opacity-100" : "z-0 scale-90 opacity-50",
      )}
    >
      {/* Primary accent layer — side cards only */}
      {!isCenter && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-primary"
          style={{
            borderRadius: "2.5rem",
            transform: `rotate(${rotation}deg)`,
          }}
        />
      )}

      {/* Card body */}
      <div
        className="relative flex flex-col justify-center gap-6 border border-border bg-card p-8 h-80"
        style={{ borderRadius: "2.5rem" }}
      >
        {/* Quote text with inline opening and closing marks */}
        <p
          className={cn(
            "flex-1 leading-relaxed text-foreground",
            isCenter ? "text-base line-clamp-6" : "line-clamp-6 text-sm",
          )}
        >
          <span aria-hidden="true" className="font-serif text-primary">
            &ldquo;
          </span>
          {review.quote}
          <span aria-hidden="true" className="font-serif text-primary">
            &rdquo;
          </span>
        </p>

        {/* Author name */}
        <p className="text-sm font-semibold text-primary">— {review.name}</p>
      </div>
    </div>
  );
}

export default function Reviews() {
  const t = useTranslations("Home");
  const [active, setActive] = useState(1);
  const total = REVIEWS.length;

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  const leftIdx = (active - 1 + total) % total;
  const rightIdx = (active + 1) % total;

  const navBtn =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border " +
    "text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <section
      id="reviews"
      className="flex items-center pt-25 py-14 px-6 sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">
          {/* ── Top bar: Add Review ── */}
          <div className="flex justify-end mb-6">
            <Button
              render={<Link href="/review" />}
              nativeButton={false}
              variant="default"
              size="sm"
            >
              {t("AddReview")}
            </Button>
          </div>

          {/* ── Header: [prev] | title + dots | [next] ── */}
          <div className="flex items-start justify-between gap-4 mb-16">
            <button
              onClick={prev}
              aria-label="Previous review"
              className={navBtn}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  {t("WhatClientsSay")}
                </h2>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={cn(
                      "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      i === active
                        ? "h-2 w-5 bg-primary"
                        : "h-2 w-2 bg-border hover:bg-muted-foreground",
                    )}
                  />
                ))}
              </div>
            </div>

            <button onClick={next} aria-label="Next review" className={navBtn}>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* ── Cards ── */}
          <div className="flex items-center justify-center gap-8 overflow-hidden">
            <div className="hidden md:block">
              <ReviewCard review={REVIEWS[leftIdx]} position="left" />
            </div>

            <ReviewCard review={REVIEWS[active]} position="center" />

            <div className="hidden md:block">
              <ReviewCard review={REVIEWS[rightIdx]} position="right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
