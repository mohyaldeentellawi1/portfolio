import { Post } from "@/lib/interfaces/blog.interface";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Skeleton } from "./ui/skeleton";
import { Bot, Eye, GitBranch, Mail, Monitor, Server } from "lucide-react";
import { useAddNewSubscription } from "@/lib/helpers/use-add-new-subscription";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const EXPLORE_TOPICS = [
  { key: "BACKEND", label: "Backend", icon: <Server size={18} /> },
  { key: "FRONTEND", label: "Frontend", icon: <Monitor size={18} /> },
  { key: "AI", label: "AI & ML", icon: <Bot size={18} /> },
  { key: "DEVOPS", label: "DevOps", icon: <GitBranch size={18} /> },
];

export function TrendingNow({
  posts,
  isLoading,
  t,
}: {
  posts: Post[];
  isLoading: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const { getLocalizedText } = useArabicText();
  const router = useRouter();

  const trending = useMemo(
    () => [...posts].sort((a, b) => b.readerCount - a.readerCount).slice(0, 3),
    [posts],
  );

  return (
    <div
      style={{ borderRadius: "4px" }}
      className="border border-border bg-card p-6 shadow-sm flex flex-col gap-4"
    >
      <span className="text-sm font-semibold text-foreground">
        {t("TrendingNow")}
      </span>
      <div className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-6 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            ))
          : trending.map((post, i) => (
              <div
                key={post.id}
                onClick={() => router.push(`/tech-blog/${post.id}`)}
                className="group cursor-pointer flex flex-col gap-1"
              >
                <span className="text-xs font-bold text-primary">#{i + 1}</span>
                <p className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                  {getLocalizedText(post.titleEn ?? "", post.title)}
                </p>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye size={11} />
                  {post.readerCount.toLocaleString()} views
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}

export function ExploreByTopic({
  activeCategory,
  onSelect,
  t,
}: {
  activeCategory: string;
  onSelect: (cat: string) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      style={{ borderRadius: "4px" }}
      className="border border-border bg-card p-6 shadow-sm flex flex-col gap-4"
    >
      <span className="text-sm font-semibold text-foreground">
        {t("ExploreByTopic")}
      </span>
      <div className="grid grid-cols-2 gap-3">
        {EXPLORE_TOPICS.map(({ key, label, icon }) => (
          <button
            style={{ borderRadius: "4px" }}
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className={cn(
              "flex flex-col items-center gap-2 border p-4 shadow-sm transition-shadow duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              activeCategory === key
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background hover:border-primary/50 hover:shadow-[0_0_30px_4px] hover:shadow-primary/20 dark:hover:shadow-primary/35",
            )}
          >
            {icon}
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function SubscribeCard({
  t,
}: {
  t: ReturnType<typeof useTranslations>;
}) {
  const { email, handleEmailChange, isAdding, addNewSubscription } =
    useAddNewSubscription();

  return (
    <div className="border border-border bg-card p-6 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary">
          <Mail size={18} />
        </div>
        <span className="text-sm font-semibold text-foreground">
          {t("SubscribetoInsights")}
        </span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {t("GetthelatesttechnicalarticlesdelivereddirectlytoyourinboxNospam")}
        </p>
      </div>

      <form onSubmit={(e) => addNewSubscription({ e })}>
        <div className="flex h-13 w-full items-center rounded border border-input bg-background pr-1.5 transition-colors duration-200 focus-within:ring-2 focus-within:ring-ring">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={t("YourEmailAddress")}
            required
            className="h-full flex-1 bg-transparent px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <Button
            type="submit"
            size="sm"
            disabled={isAdding}
            className="shrink-0 h-9 mx-1.5"
          >
            {isAdding ? "..." : t("Subscribe")}
          </Button>
        </div>
      </form>
    </div>
  );
}
