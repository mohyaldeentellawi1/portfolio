"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import ReviewItem from "./review-item";
import { useArabicText } from "@/lib/utils/arabic-helper";
import AddNewReviewDialog from "./Add-New-Review-Dialog";
import { useGetAllReviews } from "@/lib/helpers/use-get-all-reviews";

export default function Reviews() {
  const t = useTranslations("Home");

  const { isArabic } = useArabicText();
  const { isLoading, reviews, getAllReviews } = useGetAllReviews();
  const [active, setActive] = useState(0);
  const total = reviews.length;

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  const navBtn =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border " +
    "text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  useEffect(() => {
    getAllReviews();
  }, [getAllReviews]);

  return (
    <section id="reviews" className="p-8 md:p-10 lg:p-14 scroll-mt-24">
          {/* ── Top bar: Add Review ── */}
          <div className="flex justify-end mb-6">
            <AddNewReviewDialog onSuccess={getAllReviews} />
          </div>

          {/* ── Header: [prev] | title + dots | [next] ── */}
          <div className="flex items-start justify-between gap-4 mb-16">
            <button
              onClick={prev}
              aria-label="Previous review"
              className={navBtn}
            >
              {isArabic ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>

            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  {t("WhatClientsSay")}
                </h2>
              </div>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to review ${i + 1}`}
                    className={cn(
                      "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      i === active
                        ? "h-1 w-5 bg-primary"
                        : "h-1 w-5 bg-border hover:bg-muted-foreground",
                    )}
                  />
                ))}
              </div>
            </div>

            <button onClick={next} aria-label="Next review" className={navBtn}>
              {isArabic ? (
                <ChevronLeft size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          </div>

          {/* ── Cards ── */}
          {isLoading ? (
            <div className="flex items-center justify-center h-80">
              <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : total === 0 ? (
            <div className="flex items-center justify-center h-80">
              <p className="text-sm text-muted-foreground">{t("WhatClientsSay")}</p>
            </div>
          ) : (
            <ReviewItem review={reviews[active]} />
          )}
    </section>
  );
}
