"use server";

import { getLocale } from "next-intl/server";

// Custom hook for Arabic text detection on the server
export async function getArabicTextServer() {
  const locale = await getLocale();

  const getLocalizedText = (text: string, textArabic: string): string => {
    const isArabic = locale === "ar";
    if (isArabic) {
      return textArabic;
    }
    return text;
  };

  return {
    locale,
    isArabic: locale === "ar",
    getLocalizedText,
  };
}
