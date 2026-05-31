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
        "relative shrink-0 w-80 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 scale-100 opacity-100"
          : `z-0 scale-90 ${hover ? "opacity-100" : "opacity-50"}`,
      )}
    >
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
        className="relative flex flex-col justify-center gap-6 border border-border bg-card p-8 h-80"
        style={{ borderRadius: "8px" }}
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
          {getLocalizedText(review.contentEn ?? review.content, review.content)}
          <span aria-hidden="true" className="font-serif text-primary">
            &rdquo;
          </span>
        </p>

        {/* Author name */}
        <p className={`text-sm font-semibold text-primary`}>
          {getLocalizedText(review.nameEn ?? review.name, review.name)}
        </p>
      </div>
    </div>
  );
}
