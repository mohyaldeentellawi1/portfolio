"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { useTranslations } from "next-intl";

export default function BackButton({ fallback = "/" }: { fallback?: string }) {
  const router = useRouter();
  const { isArabic } = useArabicText();
  const t = useTranslations("Home");

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      style={{
        borderRadius: "4px",
      }}
      onClick={handleBack}
      className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {t("back")}
      {isArabic ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
    </Button>
  );
}
