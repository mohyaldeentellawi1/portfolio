import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

const INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "mohyaldeentellawi@gmail.com",
    href: "mailto:mohyaldeentellawi@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+90 5550666017",
    href: "tel:+905550666017",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Istanbul, Türkiye",
    href: null,
  },
] as const;

const input =
  "w-full h-10 rounded border border-input bg-background px-3 text-sm text-foreground " +
  "placeholder:text-muted-foreground transition-colors duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default async function Contact() {
  const t = await getTranslations("Home");
  return (
    <section
      id="contact"
      className="flex items-center pt-32 py-14 px-6 sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* ── Start column — contact info ── */}
            <div className="flex flex-col gap-8">
              {/* Heading */}
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground leading-snug">
                  {t("Getintouch")}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {t("Yourideacouldbethenextbigthing")}
                </p>
              </div>

              {/* Info rows */}
              <div className="flex flex-col gap-5">
                {INFO.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4">
                    {/* Icon bubble */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                      <Icon size={18} strokeWidth={1.75} />
                    </div>

                    {/* Value */}
                    {href ? (
                      <a
                        dir="ltr"
                        href={href}
                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {value}
                      </a>
                    ) : (
                      <span dir="ltr" className="text-sm text-muted-foreground">
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── End column — form ── */}
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {t("SendMessage")}
              </h3>

              <form className="flex flex-col gap-4">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    className={input}
                    type="text"
                    placeholder={t("name")}
                  />
                  <input
                    className={input}
                    type="email"
                    placeholder={t("Email")}
                  />
                </div>

                {/* Row 2: Subject */}
                <input
                  className={input}
                  type="text"
                  placeholder={t("Subject")}
                />

                {/* Row 3: Message */}
                <textarea
                  placeholder={t("Message")}
                  rows={6}
                  className={
                    "w-full resize-none rounded border border-input bg-background px-3 py-2.5 " +
                    "text-sm text-foreground placeholder:text-muted-foreground " +
                    "transition-colors duration-200 focus-visible:outline-none " +
                    "focus-visible:ring-2 focus-visible:ring-ring"
                  }
                />

                {/* Submit */}
                <Button type="submit" className="w-full">
                  {t("SendMessage")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
