"use client";

import { Post } from "@/app/tech-blog/page";
import { Bookmark, Clock, Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

export default function BlogItem({ post }: { post: Post }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  function toggleLike() {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  return (
    <article className="group flex flex-col bg-card border border-border rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md overflow-hidden">
      {/* ── Top: category + read time ── */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <span className="inline-flex items-center rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
          {post.category}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={12} />
          {post.readTime}
        </span>
      </div>

      {/* ── Content ── */}
      <div className="px-6 pb-4 flex flex-col gap-2 flex-1">
        <h2 className="text-base font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      {/* ── Tags ── */}
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── Author ── */}
      <div className="flex items-center gap-2.5 px-6 pb-4 border-t border-border/40 pt-4">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span className="text-[11px] font-bold text-primary">
            {post.author.initials}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {post.author.name}
          </span>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>
      </div>

      {/* ── Interaction bar ── */}
      <div className="flex items-center justify-between border-t border-border px-4 py-2">
        {/* Left: like + comment */}
        <div className="flex items-center">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              ${liked ? "text-destructive bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
          >
            <Heart size={15} className={liked ? "fill-current" : ""} />
            <span>{likeCount}</span>
          </button>

          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium text-muted-foreground
              transition-colors duration-200 hover:text-foreground hover:bg-muted
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MessageCircle size={15} />
            <span>{post.comments}</span>
          </button>
        </div>

        {/* Right: bookmark + share */}
        <div className="flex items-center">
          <button
            onClick={() => setBookmarked((prev) => !prev)}
            className={`p-2 rounded transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              ${bookmarked ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
          >
            <Bookmark size={15} className={bookmarked ? "fill-current" : ""} />
          </button>

          <button
            className="p-2 rounded text-muted-foreground transition-colors duration-200
              hover:text-foreground hover:bg-muted
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Share2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
