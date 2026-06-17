"use client";

import { useParams } from "next/navigation";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardSection from "../../../projects/components/Card-Section-Component";
import { useEditBlog, BlogMediaItem } from "@/lib/helpers/use-add-new-blog";
import { useTranslations } from "next-intl";

const BLOG_TYPES = [
  "FRONTEND",
  "BACKEND",
  "SOFTWARE_ENGINEERING",
  "AI",
  "DEVOPS",
  "FLUTTER",
  "MOBILE",
  "PRODUCT_DEVELOPMENT",
  "CAREER",
  "CASE_STUDY",
  "OTHER",
] as const;

const inputCls =
  "w-full h-9 rounded border border-input bg-background px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-shadow duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const textareaCls =
  "w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-shadow duration-200 resize-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const labelCls = "block text-xs font-medium text-muted-foreground mb-1";

function MarkdownField({
  label,
  value,
  onChange,
  placeholder,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div dir={dir}>
      <label className={labelCls}>{label}</label>
      <textarea
        rows={12}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={textareaCls}
      />
    </div>
  );
}

function BlogMediaEditor({
  items,
  onAdd,
  onRemove,
  onUpdate,
}: {
  items: BlogMediaItem[];
  onAdd: () => void;
  onRemove: (key: string) => void;
  onUpdate: (key: string, patch: Partial<BlogMediaItem>) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((m, i) => (
        <div
          key={m._key}
          className="rounded border border-border bg-muted/30 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">
              Image {i + 1}
            </span>
            <button
              type="button"
              onClick={() => onRemove(m._key)}
              className="text-muted-foreground hover:text-destructive transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <Trash2 size={13} />
            </button>
          </div>

          <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>URL *</label>
              <input
                type="url"
                value={m.url}
                placeholder="https://res.cloudinary.com/..."
                className={inputCls}
                onChange={(e) => {
                  const url = e.target.value;
                  const match = url.match(
                    /\/upload\/(?:v\d+\/)?(.+?)(\.[^.]+)?$/,
                  );
                  const cloudId = match ? match[1] : url;
                  onUpdate(m._key, { url, cloudId });
                }}
              />
            </div>
            <div>
              <label className={labelCls}>Cloud ID *</label>
              <input
                type="text"
                value={m.cloudId}
                placeholder="folder/image-id"
                className={inputCls}
                onChange={(e) => onUpdate(m._key, { cloudId: e.target.value })}
              />
            </div>
          </div>

          <div dir="ltr" className="flex items-center gap-4 mt-3">
            <div>
              <label className={labelCls}>Mode</label>
              <select
                value={m.mode}
                onChange={(e) =>
                  onUpdate(m._key, { mode: e.target.value as "DARK" | "LIGHT" })
                }
                className="h-8 rounded border border-input bg-background px-2 text-xs text-foreground
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="LIGHT">Light</option>
                <option value="DARK">Dark</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Order</label>
              <input
                type="number"
                min={0}
                value={m.order}
                onChange={(e) =>
                  onUpdate(m._key, { order: Number(e.target.value) })
                }
                className="w-16 h-8 rounded border border-input bg-background px-2 text-xs
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded border border-dashed border-border
                   text-xs font-medium text-muted-foreground hover:text-foreground
                   transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                   self-start"
      >
        <Plus size={13} />
        Add image
      </button>
    </div>
  );
}

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();

  const t = useTranslations("Dashboard");

  const {
    blog,
    isLoading,
    isPending,
    type,
    setType,
    title,
    setTitle,
    titleEn,
    setTitleEn,
    excerpt,
    setExcerpt,
    excerptEn,
    setExcerptEn,
    content,
    setContent,
    contentEn,
    setContentEn,
    readingTime,
    setReadingTime,
    media,
    addMedia,
    removeMedia,
    updateMedia,
    handleSubmit,
  } = useEditBlog(Number(params.id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={18} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-64">
        <p className="text-sm text-muted-foreground">Blog post not found.</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.history.back()}
        >
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full w-full">
      {/* ── Header ── */}
      <div className="sticky top-20 z-10 flex items-center justify-between gap-4 px-6 py-4 border-t border-b bg-background">
        <div>
          <h1 className="text-base font-semibold tracking-tight text-foreground">
            {t("EditBlogPost")}
          </h1>
        </div>
        <Button size="sm" onClick={handleSubmit} disabled={isPending}>
          {isPending && <Loader2 size={14} className="animate-spin" />}
          {isPending ? t("Saving") : t("SaveChanges")}
        </Button>
      </div>

      {/* ── Form ── */}
      <div className="flex-1 p-6 flex flex-col gap-5 max-w-4xl">
        <CardSection title="Basic Information">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title (AR) *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="عنوان المقالة"
                  className={inputCls}
                />
              </div>
              <div dir="ltr">
                <label className={labelCls}>Title (EN)</label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="Article title"
                  className={inputCls}
                />
              </div>
            </div>

            <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Type *</label>
                <Select value={type} onValueChange={(v) => v && setType(v)}>
                  <SelectTrigger className={inputCls + " flex items-center"}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOG_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className={labelCls}>Reading time (min) *</label>
                <input
                  type="number"
                  min={1}
                  value={readingTime}
                  onChange={(e) => setReadingTime(Number(e.target.value))}
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Excerpt (AR)</label>
                <input
                  type="text"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="ملخص المقالة"
                  className={inputCls}
                />
              </div>
              <div dir="ltr">
                <label className={labelCls}>Excerpt (EN)</label>
                <input
                  type="text"
                  value={excerptEn}
                  onChange={(e) => setExcerptEn(e.target.value)}
                  placeholder="Article excerpt"
                  className={inputCls}
                />
              </div>
            </div>
          </div>
        </CardSection>

        <CardSection title="Content">
          <div className="flex flex-col gap-5">
            <MarkdownField
              label="Content (AR) *"
              value={content}
              onChange={setContent}
              placeholder="اكتب المقالة هنا بصيغة Markdown…"
              dir="rtl"
            />
            <MarkdownField
              label="Content (EN)"
              value={contentEn}
              onChange={setContentEn}
              placeholder="Write your article here in Markdown…"
              dir="ltr"
            />
          </div>
        </CardSection>

        <CardSection title="Cover Images">
          <BlogMediaEditor
            items={media}
            onAdd={addMedia}
            onRemove={removeMedia}
            onUpdate={updateMedia}
          />
        </CardSection>
      </div>
    </div>
  );
}
