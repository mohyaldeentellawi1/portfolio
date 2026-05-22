import { cn } from "@/lib/utils";
import { REVIEWS } from "./reviews";

export default function ReviewItem({
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
        <p className="text-sm font-semibold text-primary">{review.name}</p>
      </div>
    </div>
  );
}
