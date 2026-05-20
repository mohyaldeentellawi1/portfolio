import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    value: "+90 5550666016",
    href: "tel:+905550666016",
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

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-24 px-6 sm:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="bg-card border border-border rounded-lg p-8 md:p-10 lg:p-14 shadow-sm">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

            {/* ── Start column — contact info ── */}
            <div className="flex flex-col gap-8">
              {/* Heading */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Contact
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                  Get in touch
                </h2>
                <p className="text-base text-muted-foreground">
                  Have a project in mind or just want to say hello? Drop a
                  message and I&apos;ll get back to you as soon as possible.
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
                        href={href}
                        className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">
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
                Send Message
              </h3>

              <form className="flex flex-col gap-4">
                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input className={input} type="text" placeholder="Name" />
                  <input className={input} type="email" placeholder="Email" />
                </div>

                {/* Row 2: Subject */}
                <input className={input} type="text" placeholder="Subject" />

                {/* Row 3: Message */}
                <textarea
                  placeholder="Message"
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
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
