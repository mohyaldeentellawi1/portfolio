"use client";

import { Review } from "@/lib/interfaces/review.interface";
import { useArabicText } from "@/lib/utils/arabic-helper";

export default function ReviewItem({ review }: { review: Review }) {
  const { getLocalizedText } = useArabicText();

  const name = getLocalizedText(review.nameEn ?? review.name, review.name);
  const content = getLocalizedText(
    review.contentEn ?? review.content,
    review.content,
  );

  return (
    <div className="relative w-full">
      {/* Stacked depth layers — non-rectangular feel */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl bg-primary/10"
        style={{ transform: "rotate(-2deg) translateY(10px) scale(0.97)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-3xl bg-primary/20"
        style={{ transform: "rotate(-1deg) translateY(5px) scale(0.985)" }}
      />

      {/* Card */}
      <div className="relative bg-card border border-border rounded-3xl px-8 py-10 md:px-14 md:py-12 flex flex-col gap-8 min-h-45">
        {/* Decorative large quote mark */}
        <span
          aria-hidden
          className="absolute top-6 right-10 font-serif text-9xl leading-none text-primary/15 select-none pointer-events-none"
        >
          &rdquo;
        </span>

        {/* Quote text — max 7 lines + scrollable on small screens, full height on md+ */}
        <p className="relative text-foreground leading-relaxed text-base md:text-lg pr-20 max-h-46 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden md:max-h-none md:overflow-visible">
          &ldquo;{content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-4">
          <div className="flex-1 h-px bg-linear-to-r from-transparent to-primary/40" />
          <p className="font-semibold text-sm text-primary tracking-wide shrink-0">
            {name}
          </p>
          <div className="flex-1 h-px bg-linear-to-l from-transparent to-primary/40" />
        </div>
      </div>
    </div>
  );
}
