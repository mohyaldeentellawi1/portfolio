"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useArabicText } from "@/lib/utils/arabic-helper";
import { useTranslations } from "next-intl";

export default function BackButton() {
  const router = useRouter();
  const { isArabic } = useArabicText();
  const t = useTranslations("Home");

  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => router.back()}
      className="bg-white dark:bg-card shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {t("back")}
      {isArabic ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
    </Button>
  );
}
