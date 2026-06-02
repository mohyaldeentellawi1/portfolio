"use client";

import { cn } from "@/lib/utils";
import { Review } from "@/lib/interfaces/review.interface";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { useState } from "react";

export default function ReviewItem({
  review,
  position,
}: {
  review: Review;
  position: "left" | "center" | "right";
}) {
  const { getLocalizedText } = useArabicText();
  const isCenter = position === "center";
  const rotation = position === "left" ? 7.35 : -7.35;

  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "relative shrink-0 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 scale-100 opacity-100 w-full sm:w-80"
          : `z-0 w-80 scale-90 ${hover ? "opacity-100" : "opacity-50"}`,
      )}
    >
      {/* Decorative accent layers — center card on mobile only */}
      {isCenter && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-primary/40 md:hidden"
            style={{ borderRadius: "8px", transform: "rotate(-7.35deg)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-primary/40 md:hidden"
            style={{ borderRadius: "8px", transform: "rotate(7.35deg)" }}
          />
        </>
      )}

      {/* Primary accent layer — side cards only */}
      {!isCenter && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-colors duration-300 ${hover ? "bg-primary" : "bg-primary/50"}`}
          style={{
            borderRadius: "8px",
            transform: `rotate(${rotation}deg)`,
          }}
        />
      )}

      {/* Card body */}
      <div
        className={cn(
          "relative flex flex-col border border-border bg-card h-80",
          isCenter ? "p-6" : "p-5",
        )}
        style={{ borderRadius: "8px" }}
      >
        {/* Decorative opening quote mark */}
        <span
          aria-hidden="true"
          className={cn(
            "font-serif leading-none text-primary/70 mb-3 select-none",
            isCenter ? "text-3xl" : "text-2xl",
          )}
        >
          &ldquo;
        </span>

        {/* Quote body */}
        <p
          className={cn(
            "flex-1 leading-relaxed text-muted-foreground line-clamp-5",
            isCenter ? "text-sm" : "text-xs",
          )}
        >
          {getLocalizedText(review.contentEn ?? review.content, review.content)}
        </p>

        {/* Author */}
        <div className="mt-4 pt-3 border-t border-border/60">
          <p
            className={cn(
              "font-semibold text-foreground truncate",
              isCenter ? "text-sm" : "text-xs",
            )}
          >
            {getLocalizedText(review.nameEn ?? review.name, review.name)}
          </p>
        </div>
      </div>
    </div>
  );
}
