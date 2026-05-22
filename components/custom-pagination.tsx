"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { PaginationResult } from "@/lib/interfaces/pagination.interface";

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];

  if (current > 3) pages.push("…");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("…");
  pages.push(total);

  return pages;
}

export default function CustomPagination({
  pagination,
  onPageChange,
}: {
  pagination: PaginationResult;
  onPageChange: (page: number) => void;
}) {
  const { currentPage, totalPages, prev, next } = pagination;

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  const btnBase =
    "inline-flex h-9 w-9 items-center justify-center rounded text-sm font-medium " +
    "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const btnActive = "bg-primary text-primary-foreground";
  const btnGhost =
    "text-muted-foreground hover:text-foreground hover:bg-muted border border-border";
  const btnDisabled =
    "opacity-40 cursor-not-allowed pointer-events-none border border-border text-muted-foreground";

  return (
    <nav
      dir="ltr"
      aria-label="Pagination"
      className="flex items-center justify-center gap-1"
    >
      {/* Prev */}
      <button
        type="button"
        onClick={() => prev && onPageChange(prev)}
        disabled={!prev}
        aria-label="Previous page"
        className={`${btnBase} ${prev ? btnGhost : btnDisabled}`}
      >
        <ArrowLeft size={15} strokeWidth={1.8} />
      </button>

      {/* Page numbers */}
      {pages.map((page, i) =>
        page === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground select-none"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => page !== currentPage && onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={`${btnBase} ${page === currentPage ? btnActive : btnGhost}`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => next && onPageChange(next)}
        disabled={!next}
        aria-label="Next page"
        className={`${btnBase} ${next ? btnGhost : btnDisabled}`}
      >
        <ArrowRight size={15} strokeWidth={1.8} />
      </button>
    </nav>
  );
}
