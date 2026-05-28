import { getTranslations } from "next-intl/server";
import SubscribeForm from "./Subscribe-Form";

export default async function Footer() {
  const t = await getTranslations("Home");

  return (
    <footer className="border-t border-border bg-card px-6 sm:px-8 lg:px-10 py-12">
      <div className="mx-auto max-w-7xl flex flex-col gap-8">
        {/* ── Copy + Form in same row ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Copy — start side */}
          <div className="flex flex-col gap-1">
            <p className="text-base font-semibold text-foreground">
              {t("Stayintheloop")}
            </p>
            <p className="text-sm text-muted-foreground max-w-s leading-relaxed">
              {t("Getnotifiedaboutmylatestprojects")}
            </p>
          </div>

          {/* Subscribe form — end side, button inside input */}
          <SubscribeForm />
        </div>

        {/* ── Bottom line ── */}
        <div className="border-t border-border/60 pt-6">
          <p dir="ltr" className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Mohyaldeen Tellawi. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
