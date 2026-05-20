"use server";

import { cookies } from "next/headers";

// Custom hook for Arabic text detection on the server
export async function getArabicTextServer() {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? "ar";

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
