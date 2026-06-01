type Locale = "ar" | "en";

const C = {
  background: "#ffffff",
  foreground: "#191919",
  primary: "#3b6fd4",
  primaryForeground: "#f8fbff",
  muted: "#f8f9fb",
  mutedForeground: "#6b7280",
  border: "#e5e7eb",
  primaryLight: "#eef4ff",
};

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const copy = {
  en: {
    subject: "Welcome to my tech newsletter",
    title: "You're subscribed!",
    subtitle:
      "Thank you for joining my newsletter and project updates community.",

    intro:
      "You'll occasionally receive carefully selected content about software engineering, modern technologies, project launches, and practical development insights.",

    benefitsTitle: "What you'll receive",

    benefits: [
      "New project launches",
      "Technical articles and tutorials",
      "Software architecture insights",
      "Modern tools and technologies",
    ],

    cta: "Explore My Projects",

    footer:
      "You received this email because you subscribed through the website.",
  },

  ar: {
    subject: "مرحباً بك في النشرة التقنية",
    title: "تم اشتراكك بنجاح!",
    subtitle: "شكراً لانضمامك إلى مجتمع المتابعين.",

    intro:
      "ستتلقى بين الحين والآخر محتوى منتقى بعناية حول تطوير البرمجيات، وأحدث المشاريع، والمقالات التقنية، والخبرات العملية في المجال التقني.",

    benefitsTitle: "ما الذي سيصلك؟",

    benefits: [
      "إطلاقات المشاريع الجديدة",
      "مقالات وشروحات تقنية",
      "خبرات وهندسة البرمجيات",
      "أحدث الأدوات والتقنيات",
    ],

    cta: "استعراض المشاريع",

    footer: "لقد تلقيت هذا البريد لأنك اشتركت عبر الموقع.",
  },
};

export function subscriptionConfirmationEmail({ locale }: { locale: Locale }) {
  const t = copy[locale];

  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const align = isArabic ? "right" : "left";

  const benefits = t.benefits
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 0;">
          <table cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td
                style="
                  width:24px;
                  height:24px;
                  border-radius:50%;
                  background:${C.primaryLight};
                  text-align:center;
                  color:${C.primary};
                  font-size:14px;
                  font-weight:bold;
                "
              >
                ✓
              </td>

              <td
                style="
                  padding-${isArabic ? "right" : "left"}:12px;
                  font-size:14px;
                  color:${C.foreground};
                "
              >
                ${item}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${t.subject}</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:${C.muted};
    font-family:${FONT};
  "
>

<table
  role="presentation"
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="padding:40px 16px;"
>
<tr>
<td align="center">

<table
  role="presentation"
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
    max-width:620px;
    background:${C.background};
    border:1px solid ${C.border};
    border-radius:12px;
    overflow:hidden;
  "
>

  <!-- Header -->
  <tr>
    <td
      align="center"
      style="
        background:${C.primary};
        padding:40px 32px;
      "
    >
      <div
        style="
          color:white;
          font-size:26px;
          font-weight:700;
          letter-spacing:-0.02em;
        "
      >
        Mohyaldeen Tellawi
      </div>

      <div
        style="
          color:rgba(255,255,255,.85);
          font-size:14px;
          margin-top:8px;
        "
      >
        Software Engineer
      </div>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td
      style="
        padding:40px 32px;
        direction:${dir};
        text-align:${align};
      "
    >

      <h1
        style="
          margin:0 0 12px;
          color:${C.foreground};
          font-size:28px;
          font-weight:700;
        "
      >
        ${t.title}
      </h1>

      <p
        style="
          margin:0 0 10px;
          color:${C.foreground};
          font-size:16px;
          line-height:1.7;
        "
      >
        ${t.subtitle}
      </p>

      <p
        style="
          margin:0 0 32px;
          color:${C.mutedForeground};
          font-size:15px;
          line-height:1.8;
        "
      >
        ${t.intro}
      </p>

      <!-- Benefits Card -->
      <table
        role="presentation"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="
          background:${C.primaryLight};
          border:1px solid #d9e7ff;
          border-radius:10px;
          padding:24px;
          margin-bottom:32px;
        "
      >
        <tr>
          <td>
            <div
              style="
                font-size:18px;
                font-weight:600;
                color:${C.foreground};
                margin-bottom:12px;
              "
            >
              ${t.benefitsTitle}
            </div>

            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
            >
              ${benefits}
            </table>
          </td>
        </tr>
      </table>

      <!-- CTA -->
      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        align="${isArabic ? "right" : "left"}"
      >
        <tr>
          <td
            bgcolor="${C.primary}"
            style="border-radius:6px;"
          >
            <a
              href="https://www.mohyaldeen-tellawi.com/"
              style="
                display:inline-block;
                padding:14px 24px;
                color:white;
                text-decoration:none;
                font-size:14px;
                font-weight:600;
              "
            >
              ${t.cta}
            </a>
          </td>
        </tr>
      </table>

      <p
        style="
          margin-top:32px;
          color:${C.mutedForeground};
          font-size:14px;
          line-height:1.8;
        "
      />
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td
      style="
        border-top:1px solid ${C.border};
        background:${C.muted};
        padding:24px 32px;
        text-align:${align};
      "
    >
      <p
        style="
          margin:0;
          color:${C.mutedForeground};
          font-size:12px;
          line-height:1.6;
        "
      >
        ${t.footer}
      </p>
    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}
