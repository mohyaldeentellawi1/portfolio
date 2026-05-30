"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "dash_token";

export async function dashboardLoginAction(
  password: string,
): Promise<{ error: string } | never> {
  const expectedPassword = process.env.DASHBOARD_PASSWORD;
  const token = process.env.DASHBOARD_TOKEN;

  if (!expectedPassword || !token) {
    return { error: "Server not configured." };
  }

  if (password.trim() !== expectedPassword.trim()) {
    return { error: "Invalid password." };
  }

  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/dashboard");
}

export async function dashboardLogoutAction() {
  const store = await cookies();
  store.delete(COOKIE);
  redirect("/");
}
