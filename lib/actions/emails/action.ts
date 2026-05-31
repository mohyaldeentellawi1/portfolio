"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// THIS ACTION TO SEND EMAILS AFTER SOME REQUESTS IN THE BACKEND
export async function sendEmailAction({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Email service configuration error");
    }

    const { error } = await resend.emails.send({
      from: "MOHYALDEEN TELLAWI <no-reply@mohyaldeen-tellawi.com>",
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
