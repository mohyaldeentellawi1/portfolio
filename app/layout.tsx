import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import Providers from "./providers";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Mohyaldeen Portfolio - Full Stack Developer",
  description:
    "Welcome to my portfolio! I'm Mohyaldeen, a passionate Full Stack Developer with expertise in React, Next.js, Node.js, and more. Explore my projects, skills, and experience in web development. Let's build something amazing together!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? "ar";

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        "h-full scroll-smooth antialiased",
        inter.variable,
        cairo.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Nav />
            {children}
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
