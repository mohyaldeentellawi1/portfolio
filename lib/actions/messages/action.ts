"use server";

import prisma from "@/lib/prisma";
import { getLocale, getTranslations } from "next-intl/server";
import { z } from "zod";
import { sendEmailAction } from "../emails/action";
import {
  contactAdminEmail,
  contactCustomerEmail,
} from "@/lib/emails/contact-template";

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
  const [t, locale] = await Promise.all([
    getTranslations("Actions"),
    getLocale(),
  ]);
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

    const savedMessage = await prisma.message.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject.trim(),
        content: data.content,
      },
    });

    if (!savedMessage) {
      return {
        success: false,
        message: `${t("Failedtosendmessage")}`,
      };
    }

    const safeLocale = locale === "ar" ? "ar" : "en";

    try {
      await Promise.all([
        sendEmailAction({
          to: savedMessage.email,
          subject:
            safeLocale === "ar" ? "تم استلام رسالتك" : "Your message has been received",
          html: contactCustomerEmail({
            locale: safeLocale,
            name: savedMessage.name,
            subject: savedMessage.subject,
          }),
        }),
        sendEmailAction({
          to: "mohyaldeentellawi@gmail.com",
          subject: `📬 New Message - ${savedMessage.name}`,
          html: contactAdminEmail({
            name: savedMessage.name,
            email: savedMessage.email,
            subject: savedMessage.subject,
            content: savedMessage.content,
          }),
        }),
      ]);
    } catch (emailError) {
      console.error("[CONTACT_EMAIL_ERROR]", emailError);
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
