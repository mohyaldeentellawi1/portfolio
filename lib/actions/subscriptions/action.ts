"use server";

import prisma from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { z } from "zod";
import { sendEmailAction } from "../emails/action";
import { subscriptionConfirmationEmail } from "@/lib/emails/subscription-templates";

const subscriptionSchema = z.object({
  email: z.email(),
});

// THIS ACTION TO ADD NEW SUBSCRIPTION
export async function addSubscriptionAction({
  email,
}: {
  email: string;
}): Promise<{
  success: boolean;
  message: string;
}> {
  const [t, locale] = await Promise.all([
    getTranslations("Actions"),
    getLocale(),
  ]);
  try {
    const parsedData = subscriptionSchema.safeParse({ email });

    if (!parsedData.success) {
      return {
        success: false,
        message: t("Invalidemailaddress"),
      };
    }

    const existingSubscription = await prisma.subscription.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });

    if (existingSubscription) {
      return {
        success: false,
        message: `${t("Thisemailisalreadysubscribed")}`,
      };
    }

    const res = await prisma.subscription.create({
      data: {
        email: parsedData.data.email,
      },
    });

    if (!res) {
      return {
        success: false,
        message: `${t("Failedtoaddsubscription")}`,
      };
    }

    const safeLocale = locale === "ar" ? "ar" : "en";
    await sendEmailAction({
      to: parsedData.data.email,
      subject: safeLocale === "ar" ? "تم اشتراكك بنجاح!" : "You're subscribed!",
      html: subscriptionConfirmationEmail({ locale: safeLocale }),
    });

    return {
      success: true,
      message: `${t("Subscriptionaddedsuccessfully")}`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : `${t("Anerroroccurred")}`,
    };
  }
}
