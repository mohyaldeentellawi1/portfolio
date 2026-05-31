"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Plus, Trash2, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useGetAllTags } from "@/lib/helpers/use-get-all-tags";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CardSection from "../../components/Card-Section-Component";
import { MediaEditor } from "../../components/Media-Componenet";
import { useEditProject } from "@/lib/helpers/use-add-new-project";

const TECH_TYPES = [
  "WEB_FRONTEND",
  "WEB_BACKEND",
  "WEB_FULLSTACK",
  "MOBILE",
  "TOOL",
  "OTHER",
] as const;

const PROJECT_TYPES = [
  "MARKETPLACE",
  "ECOMMERCE",
  "BLOG",
  "COMMUNITY",
  "PORTFOLIO",
  "SOCIALMEDIA",
  "TRADING",
  "PRODUCTIVITY",
  "BUSINESS",
  "UTILITY",
  "STREAMING",
  "MEDIA",
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

export default function DashboardProjectsEditPage() {
  const params = useParams<{ id: string }>();

  const { tags, getAllTags } = useGetAllTags();

  const {
    project,
    router,
    isLoading,
    isPending,
    title,
    setTitle,
    titleEn,
    setTitleEn,
    description,
    setDescription,
    descriptionEn,
    setDescriptionEn,
    liveUrl,
    setLiveUrl,
    githubUrl,
    setGithubUrl,
    techType,
    setTechType,
    projectTypes,
    toggleProjectType,
    tagIds,
    toggleTag,
    media,
    setMedia,
    sections,
    addSection,
    removeSection,
    updateSection,
    toggleSectionCollapse,
    handleSubmit,
  } = useEditProject(Number(params.id));

  useEffect(() => {
    getAllTags();
  }, [getAllTags]);

  const pillCls = (active: boolean) =>
    [
      "h-7 px-3 rounded text-xs font-medium transition-colors duration-200 cursor-pointer select-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      active
        ? "bg-primary text-primary-foreground"
        : "border border-border text-muted-foreground hover:text-foreground hover:bg-muted",
    ].join(" ");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={20} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isLoading && !project) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-175">
        <p className="text-sm text-muted-foreground">Project not found.</p>
        <Button onClick={() => router.back()}>Back to projects</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full w-full">
      {/* ── Header ── */}
      <div className="sticky top-20 z-10 flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-base font-semibold tracking-tight text-foreground">
              Edit Project
            </h1>
            <p className="text-xs text-muted-foreground">
              #{project?.id} — {project?.titleEn}
            </p>
          </div>
        </div>

        <Button size="sm" onClick={handleSubmit} disabled={isPending}>
          {isPending ? <Loader2 size={14} className="animate-spin" /> : null}
          {isPending ? "Saving…" : "Save Changes"}
        </Button>
      </div>

      {/* ── Form ── */}
      <div className="flex-1 p-6 flex flex-col gap-5 max-w-6xl">
        {/* Basic info */}
        <CardSection title="Basic Information">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title (AR) *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="اسم المشروع"
                  className={inputCls}
                />
              </div>
              <div dir="ltr">
                <label className={labelCls}>Title (EN) *</label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="Project name"
                  className={inputCls}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Description (AR) *</label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف المشروع"
                  className={textareaCls}
                />
              </div>
              <div dir="ltr">
                <label className={labelCls}>Description (EN) *</label>
                <textarea
                  rows={5}
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="Project description"
                  className={textareaCls}
                />
              </div>
            </div>

            <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Live URL</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://example.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>GitHub URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className={inputCls}
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Tech Type *</label>
              <Select
                value={techType || "OTHER"}
                onValueChange={(value) => {
                  setTechType(value || "OTHER");
                }}
              >
                <SelectTrigger
                  className="h-12 rounded border border-input bg-background px-3 text-sm text-foreground
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                           transition-shadow duration-200"
                  style={{ borderRadius: "5px" }}
                >
                  <SelectValue placeholder="Select tech type" />
                </SelectTrigger>
                <SelectContent>
                  {TECH_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.replace(/_/g, " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className={labelCls}>
                Project Types * (select all that apply)
              </label>
              <div className="flex flex-wrap gap-2 mt-1">
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleProjectType(t)}
                    className={pillCls(projectTypes.includes(t))}
                  >
                    {t.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardSection>

        {/* Tags */}
        <CardSection title="Tags">
          {tags.length === 0 ? (
            <p className="text-xs text-muted-foreground">No tags available.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={pillCls(tagIds.includes(tag.id))}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
        </CardSection>

        {/* Project-level media */}
        <CardSection title="Project Media (no section)">
          <MediaEditor items={media} onChange={setMedia} />
        </CardSection>

        {/* Sections */}
        <CardSection title="Sections">
          <div className="flex flex-col gap-3">
            {sections.map((sec, i) => (
              <div
                key={sec._key}
                className="rounded border border-border overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40">
                  <button
                    type="button"
                    onClick={() => toggleSectionCollapse(sec._key)}
                    className="flex items-center gap-2 text-sm font-medium text-foreground
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {sec.collapsed ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronUp size={14} />
                    )}
                    Section {i + 1}
                    {sec.titleEn ? ` — ${sec.titleEn}` : ""}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(sec._key)}
                    className="text-muted-foreground hover:text-destructive transition-colors duration-200
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {!sec.collapsed && (
                  <div className="p-4 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Title (AR) *</label>
                        <input
                          type="text"
                          value={sec.title}
                          placeholder="عنوان القسم"
                          className={inputCls}
                          onChange={(e) =>
                            updateSection(sec._key, { title: e.target.value })
                          }
                        />
                      </div>
                      <div dir="ltr">
                        <label className={labelCls}>Title (EN)</label>
                        <input
                          type="text"
                          value={sec.titleEn}
                          placeholder="Section title"
                          className={inputCls}
                          onChange={(e) =>
                            updateSection(sec._key, { titleEn: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Description (AR) *</label>
                        <textarea
                          rows={3}
                          value={sec.description}
                          placeholder="وصف القسم"
                          className={textareaCls}
                          onChange={(e) =>
                            updateSection(sec._key, {
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div dir="ltr">
                        <label className={labelCls}>Description (EN)</label>
                        <textarea
                          rows={3}
                          value={sec.descriptionEn}
                          placeholder="Section description"
                          className={textareaCls}
                          onChange={(e) =>
                            updateSection(sec._key, {
                              descriptionEn: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="number"
                          min={0}
                          value={sec.order}
                          onChange={(e) =>
                            updateSection(sec._key, {
                              order: Number(e.target.value),
                            })
                          }
                          className="w-16 h-7 rounded border border-input bg-background px-2 text-xs
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <span className={labelCls + " mb-0"}>Order</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={sec.imageRight}
                          onChange={(e) =>
                            updateSection(sec._key, {
                              imageRight: e.target.checked,
                            })
                          }
                        />
                        <span className={labelCls + " mb-0"}>
                          Image on right
                        </span>
                      </label>
                    </div>

                    <div>
                      <p className={labelCls + " mb-2"}>Section Media</p>
                      <MediaEditor
                        items={sec.media}
                        onChange={(m) => updateSection(sec._key, { media: m })}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded border border-dashed border-border
                         text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border/80
                         transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                         self-start"
            >
              <Plus size={13} />
              Add section
            </button>
          </div>
        </CardSection>
      </div>
    </div>
  );
}
