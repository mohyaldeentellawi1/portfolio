type Locale = "ar" | "en";

// Design system colors (converted from oklch for email client compatibility)
const C = {
  background: "#ffffff",
  foreground: "#191919",
  primary: "#3b6fd4", // oklch(0.5 0.134 242.749)
  primaryFg: "#f0f7ff", // oklch(0.977 0.013 236.62)
  muted: "#f7f7f7", // oklch(0.97 0 0)
  mutedFg: "#6b6b6b", // oklch(0.556 0 0)
  border: "#e8e8e8", // oklch(0.922 0 0)
  primaryLight: "#ddeafb", // primary/10 approximation
};

const FONT = "Inter,system-ui,-apple-system,Arial,sans-serif";

const copy = {
  en: {
    title: "You're subscribed!",
    body: "Thank you for subscribing. You'll receive updates about my latest projects and the newest trends in technology — straight to your inbox.",
    cta: "Visit Portfolio",
    footer:
      "You received this email because you subscribed at mohyaldeen-tellawi.com. To unsubscribe, reply to this email.",
  },
  ar: {
    title: "تم اشتراكك بنجاح!",
    body: "شكراً لاشتراكك. ستتلقى تحديثات حول أحدث مشاريعي وأحدث التوجهات في مجال التكنولوجيا — مباشرةً إلى بريدك الإلكتروني.",
    cta: "زيارة الموقع",
    footer:
      "لقد تلقيت هذا البريد لأنك اشتركت في mohyaldeen-tellawi.com. للإلغاء، أرد على هذا البريد.",
  },
};

export function subscriptionConfirmationEmail({
  locale,
}: {
  locale: Locale;
}): string {
  const t = copy[locale];
  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";
  const align = isRtl ? "right" : "left";

  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>${t.title}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.muted};font-family:${FONT};">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
    style="background-color:${C.muted};padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:580px;background-color:${C.background};border:1px solid ${C.border};border-radius:10px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color:${C.primary};padding:28px 32px;text-align:center;">
              <span style="font-size:20px;font-weight:700;color:${C.primaryFg};letter-spacing:-0.025em;font-family:${FONT};">
                Mohyaldeen Tellawi
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px 28px;direction:${dir};">

              <!-- Success icon -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="width:56px;height:56px;border-radius:50%;background-color:${C.primaryLight};border:1px solid #b8d4f7;text-align:center;vertical-align:middle;">
                          <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.525.0/icons/check.svg"
                            width="22" height="22" alt="" aria-hidden="true"
                            style="display:block;margin:17px auto;filter:invert(29%) sepia(80%) saturate(600%) hue-rotate(200deg);" />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Title -->
              <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:${C.foreground};letter-spacing:-0.025em;text-align:center;font-family:${FONT};">
                ${t.title}
              </h1>

              <!-- Body text -->
              <p style="margin:0 0 28px;font-size:16px;line-height:1.65;color:${C.mutedFg};text-align:center;font-family:${FONT};">
                ${t.body}
              </p>

              <!-- Divider -->
              <div style="border-top:1px solid ${C.border};margin-bottom:28px;"></div>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center">
                    <a href="https://www.mohyaldeen-tellawi.com/"
                      style="display:inline-block;background-color:${C.primary};color:${C.primaryFg};text-decoration:none;font-size:14px;font-weight:500;padding:0 16px;line-height:36px;border-radius:4px;font-family:${FONT};">
                      ${t.cta}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:${C.muted};border-top:1px solid ${C.border};padding:20px 32px;text-align:${align};direction:${dir};">
              <p style="margin:0;font-size:12px;color:${C.mutedFg};line-height:1.5;font-family:${FONT};">
                ${t.footer}
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
