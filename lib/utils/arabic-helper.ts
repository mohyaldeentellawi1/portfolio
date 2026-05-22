"use client";

import { useLocale } from "next-intl";

export function useArabicText() {
  const locale = useLocale();

  const getLocalizedText = (text: string, textArabic: string): string => {
    return locale === "ar" ? textArabic : text;
  };

  return {
    locale,
    isArabic: locale === "ar",
    getLocalizedText,
  };
}
