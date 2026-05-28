"use server";

import prisma from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

const messageSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  subject: z.string().min(1),
  content: z.string().min(1),
});

// THIS ACTION TO SEND A MESSAGE IN CONTACT ME SECTION
export async function sendMessageAction({
  name,
  email,
  subject,
  content,
}: {
  name: string;
  email: string;
  subject: string;
  content: string;
}): Promise<{
  success: boolean;
  message?: string;
}> {
  const t = await getTranslations("Actions");
  try {
    const data = messageSchema.parse({
      name,
      email,
      subject,
      content: content.replace(/\n/g, "<br>"),
    });

    const parsedData = messageSchema.safeParse({
      name: data.name,
      email: data.email,
      subject: data.subject,
      content: data.content,
    });

    if (!parsedData.success) {
      return {
        success: false,
      };
    }

    const res = prisma.message.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject.trim(),
        content: data.content,
      },
    });

    if (!res) {
      return {
        success: false,
        message: `${t("Failedtosendmessage")}`,
      };
    }

    return {
      success: true,
      message: `${t("Messagesentsuccessfully")}`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : `${t("Anerroroccurred")}`,
    };
  }
}
