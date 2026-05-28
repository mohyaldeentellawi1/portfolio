import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import SendMessageForm from "./Send-Message-Form";

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

export default async function Contact() {
  const t = await getTranslations("Home");
  return (
    <section
      id="contact"
      className="flex items-center pt-25 py-14 px-6 sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* ── Start column — contact info ── */}
            <div className="flex flex-col gap-8">
              {/* Heading */}
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground leading-relaxed">
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

              <SendMessageForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
