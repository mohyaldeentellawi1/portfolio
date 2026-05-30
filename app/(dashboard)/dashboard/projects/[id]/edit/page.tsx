"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useGetAllTags } from "@/lib/helpers/use-get-all-tags";
import { getProjectByIdAction } from "@/lib/actions/projects/action";
import { updateProjectAction } from "@/lib/actions/projects/action";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/interfaces/project.interface";

// ── Constants (same as new page) ─────────────────────────────────────────────

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

// ── Types ─────────────────────────────────────────────────────────────────────

interface MediaItem {
  _key: string;
  url: string;
  cloudId: string;
  type: "IMAGE" | "VIDEO";
  fileName: string;
  thumbnailUrl: string;
  order: number;
  isMain: boolean;
}

interface SectionItem {
  _key: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  imageRight: boolean;
  order: number;
  media: MediaItem[];
  collapsed: boolean;
}

function uid() {
  return Math.random().toString(36).slice(2);
}

function toMediaItem(m: {
  url: string;
  cloudId: string;
  type: string;
  fileName?: string;
  thumbnailUrl?: string;
  order: number;
  isMain: boolean;
}): MediaItem {
  return {
    _key: uid(),
    url: m.url,
    cloudId: m.cloudId,
    type: m.type === "VIDEO" ? "VIDEO" : "IMAGE",
    fileName: m.fileName ?? "",
    thumbnailUrl: m.thumbnailUrl ?? "",
    order: m.order,
    isMain: m.isMain,
  };
}

function emptyMedia(order = 0): MediaItem {
  return {
    _key: uid(),
    url: "",
    cloudId: "",
    type: "IMAGE",
    fileName: "",
    thumbnailUrl: "",
    order,
    isMain: false,
  };
}

function emptySection(order = 0): SectionItem {
  return {
    _key: uid(),
    title: "",
    titleEn: "",
    description: "",
    descriptionEn: "",
    imageRight: true,
    order,
    media: [],
    collapsed: false,
  };
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const inputCls =
  "w-full h-9 rounded border border-input bg-background px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-shadow duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const textareaCls =
  "w-full rounded border border-input bg-background px-3 py-2 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-shadow duration-200 resize-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const labelCls = "block text-xs font-medium text-muted-foreground mb-1";

// ── Sub-components ────────────────────────────────────────────────────────────

function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-5 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function MediaEditor({
  items,
  onChange,
}: {
  items: MediaItem[];
  onChange: (items: MediaItem[]) => void;
}) {
  function add() {
    onChange([...items, emptyMedia(items.length)]);
  }
  function remove(key: string) {
    onChange(items.filter((m) => m._key !== key));
  }
  function update(key: string, patch: Partial<MediaItem>) {
    onChange(items.map((m) => (m._key === key ? { ...m, ...patch } : m)));
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((m, i) => (
        <div
          key={m._key}
          className="rounded border border-border bg-muted/30 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground">
              Media {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(m._key)}
              className="text-muted-foreground hover:text-destructive transition-colors duration-200
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              <Trash2 size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>URL *</label>
              <input
                type="url"
                value={m.url}
                placeholder="https://..."
                className={inputCls}
                onChange={(e) =>
                  update(m._key, {
                    url: e.target.value,
                    cloudId: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className={labelCls}>Cloud ID *</label>
              <input
                type="text"
                value={m.cloudId}
                placeholder="storage/id/..."
                className={inputCls}
                onChange={(e) => update(m._key, { cloudId: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>File name</label>
              <input
                type="text"
                value={m.fileName}
                placeholder="image.jpg"
                className={inputCls}
                onChange={(e) => update(m._key, { fileName: e.target.value })}
              />
            </div>
            <div>
              <label className={labelCls}>Thumbnail URL</label>
              <input
                type="url"
                value={m.thumbnailUrl}
                placeholder="https://..."
                className={inputCls}
                onChange={(e) =>
                  update(m._key, { thumbnailUrl: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-6 mt-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className={labelCls + " mb-0"}>Type</span>
              <select
                value={m.type}
                onChange={(e) =>
                  update(m._key, { type: e.target.value as "IMAGE" | "VIDEO" })
                }
                className="h-7 rounded border border-input bg-background px-2 text-xs text-foreground
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="IMAGE">Image</option>
                <option value="VIDEO">Video</option>
              </select>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="number"
                min={0}
                value={m.order}
                onChange={(e) =>
                  update(m._key, { order: Number(e.target.value) })
                }
                className="w-16 h-7 rounded border border-input bg-background px-2 text-xs
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span className={labelCls + " mb-0"}>Order</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={m.isMain}
                onChange={(e) => update(m._key, { isMain: e.target.checked })}
              />
              <span className={labelCls + " mb-0"}>Main image</span>
            </label>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="inline-flex items-center gap-1.5 h-8 px-3 rounded border border-dashed border-border
                   text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border/80
                   transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                   self-start"
      >
        <Plus size={13} />
        Add media
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function DashboardProjectsEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { tags, getAllTags } = useGetAllTags();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  // ── Form state ──
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [techType, setTechType] = useState("OTHER");
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [sections, setSections] = useState<SectionItem[]>([]);

  // ── Load project + tags ──
  useEffect(() => {
    getAllTags();
  }, [getAllTags]);

  useEffect(() => {
    if (!params.id) return;
    setIsLoading(true);
    getProjectByIdAction({ id: Number(params.id) }).then(({ data }) => {
      if (!data) {
        setIsLoading(false);
        return;
      }
      setProject(data);

      // Pre-fill basic fields
      setTitle(data.title);
      setTitleEn(data.titleEn);
      setDescription(data.description);
      setDescriptionEn(data.descriptionEn);
      setLiveUrl(data.liveUrl ?? "");
      setGithubUrl(data.githubUrl ?? "");
      setTechType(data.techType);
      setProjectTypes(data.projectTypes);
      setTagIds((data.tags ?? []).map((pt) => pt.tagId));

      // Project-level media (no section)
      const sectionMediaIds = new Set(
        (data.sections ?? []).flatMap((s) => s.media.map((m) => m.id)),
      );
      setMedia(
        (data.media ?? [])
          .filter((m) => !sectionMediaIds.has(m.id))
          .map(toMediaItem),
      );

      // Sections
      setSections(
        (data.sections ?? []).map((s) => ({
          _key: uid(),
          title: s.title,
          titleEn: s.titleEn ?? "",
          description: s.description,
          descriptionEn: s.descriptionEn ?? "",
          imageRight: s.imageRight,
          order: s.order,
          media: s.media.map(toMediaItem),
          collapsed: true,
        })),
      );

      setIsLoading(false);
    });
  }, [params.id]);

  // ── Handlers ──

  function toggleProjectType(type: string) {
    setProjectTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  function toggleTag(id: number) {
    setTagIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  function addSection() {
    setSections((prev) => [...prev, emptySection(prev.length)]);
  }
  function removeSection(key: string) {
    setSections((prev) => prev.filter((s) => s._key !== key));
  }
  function updateSection(key: string, patch: Partial<SectionItem>) {
    setSections((prev) =>
      prev.map((s) => (s._key === key ? { ...s, ...patch } : s)),
    );
  }
  function toggleSectionCollapse(key: string) {
    setSections((prev) =>
      prev.map((s) => (s._key === key ? { ...s, collapsed: !s.collapsed } : s)),
    );
  }

  async function handleSubmit() {
    if (!title || !titleEn || !description || !descriptionEn) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (projectTypes.length === 0) {
      toast.error("Select at least one project type.");
      return;
    }

    startTransition(async () => {
      const result = await updateProjectAction(Number(params.id), {
        title,
        titleEn,
        description,
        descriptionEn,
        liveUrl: liveUrl || undefined,
        githubUrl: githubUrl || undefined,
        techType: techType as never,
        projectTypes: projectTypes as never,
        tagIds,
        media: media.map((m) => ({
          url: m.url,
          cloudId: m.cloudId,
          type: m.type,
          fileName: m.fileName || undefined,
          thumbnailUrl: m.thumbnailUrl || undefined,
          order: m.order,
          isMain: m.isMain,
        })),
        sections: sections.map((s) => ({
          title: s.title,
          titleEn: s.titleEn || undefined,
          description: s.description,
          descriptionEn: s.descriptionEn || undefined,
          imageRight: s.imageRight,
          order: s.order,
          media: s.media.map((m) => ({
            url: m.url,
            cloudId: m.cloudId,
            type: m.type,
            fileName: m.fileName || undefined,
            thumbnailUrl: m.thumbnailUrl || undefined,
            order: m.order,
            isMain: m.isMain,
          })),
        })),
      });

      if (result.success) {
        toast.success(result.message ?? "Project updated.");
        router.push("/dashboard/projects");
      } else {
        toast.error(result.message ?? "Something went wrong.");
      }
    });
  }

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

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-64">
        <p className="text-sm text-muted-foreground">Project not found.</p>
        <Link
          href="/dashboard/projects"
          className="text-xs text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center justify-center h-8 w-8 rounded text-muted-foreground
                       hover:text-foreground hover:bg-muted transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft size={15} />
          </Link>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-foreground">
              Edit Project
            </h1>
            <p className="text-xs text-muted-foreground">
              #{project.id} — {project.titleEn}
            </p>
          </div>
        </div>

        <Button size="sm" onClick={handleSubmit} disabled={isPending}>
          {isPending ? <Loader2 size={14} className="animate-spin" /> : null}
          {isPending ? "Saving…" : "Save Changes"}
        </Button>
      </div>

      {/* ── Form ── */}
      <div className="flex-1 p-6 flex flex-col gap-5 max-w-4xl">
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
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف المشروع"
                  className={textareaCls}
                />
              </div>
              <div dir="ltr">
                <label className={labelCls}>Description (EN) *</label>
                <textarea
                  rows={6}
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
              <select
                value={techType}
                onChange={(e) => setTechType(e.target.value)}
                className="h-9 rounded border border-input bg-background px-3 text-sm text-foreground
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                           transition-shadow duration-200"
              >
                {TECH_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
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
                      <div>
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
                          rows={2}
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
                      <div>
                        <label className={labelCls}>Description (EN)</label>
                        <textarea
                          rows={2}
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
