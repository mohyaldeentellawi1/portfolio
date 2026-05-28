"use server";

import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

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
  const t = await getTranslations("Actions");
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

    if (res) {
      return {
        success: true,
        message: `${t("Subscriptionaddedsuccessfully")}`,
      };
    }

    return {
      success: false,
      message: `${t("Failedtoaddsubscription")}`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : `${t("Anerroroccurred")}`,
    };
  }
}
