import { emptyMedia, MediaItem } from "@/lib/helpers/use-add-new-project";
import { Plus, Trash2 } from "lucide-react";

const inputCls =
  "w-full h-9 rounded border border-input bg-background px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-shadow duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const labelCls = "block text-xs font-medium text-muted-foreground mb-1";

export function MediaEditor({
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

          <div dir="ltr" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>URL *</label>
              <input
                type="url"
                value={m.url}
                placeholder="https://..."
                className={inputCls}
                onChange={(e) => {
                  const url = e.target.value;
                  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(\.[^.]+)?$/);
                  const cloudId = match ? match[1] : url;
                  update(m._key, { url, cloudId });
                }}
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
