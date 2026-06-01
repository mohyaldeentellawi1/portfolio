type Locale = "ar" | "en";

const C = {
  background: "#ffffff",
  foreground: "#191919",
  primary: "#3b6fd4",
  muted: "#f8f9fb",
  mutedForeground: "#6b7280",
  border: "#e5e7eb",
  primaryLight: "#eef4ff",
};

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

// ─── Admin notification ────────────────────────────────────────────────────

export function contactAdminEmail({
  name,
  email,
  subject,
  content,
}: {
  name: string;
  email: string;
  subject: string;
  content: string;
}) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:${C.muted};font-family:${FONT}">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0"
style="max-width:700px;background:${C.background};border:1px solid ${C.border};border-radius:10px">

<tr>
<td style="
background:${C.primary};
padding:28px;
text-align:center;
color:white;
font-size:22px;
font-weight:700;
">
📬 New Contact Message
</td>
</tr>

<tr>
<td style="padding:32px">

<h2 style="margin-top:0">Sender Information</h2>

<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>

<hr style="border:none;border-top:1px solid ${C.border};margin:24px 0">

<h2>Message Details</h2>

<p><strong>Subject:</strong> ${subject}</p>

<hr style="border:none;border-top:1px solid ${C.border};margin:24px 0">

<h2>Content</h2>

<div style="
background:${C.muted};
border:1px solid ${C.border};
padding:16px;
border-radius:8px;
white-space:pre-wrap;
line-height:1.8;
">
${content}
</div>

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

// ─── Customer confirmation ─────────────────────────────────────────────────

const copy = {
  en: {
    subject: "Your message has been received",
    title: "Message Received!",
    subtitle: "Thank you for reaching out.",
    intro:
      "Your message has been received successfully. I will review it and get back to you as soon as possible.",
    summaryTitle: "Message Summary",
    subjectLabel: "Subject",
    closing:
      "I appreciate you taking the time to write. You can expect a reply within 1–2 business days.",
    cta: "Visit Portfolio",
    footer:
      "You received this email because you sent a message through mohyaldeen-tellawi.com.",
  },
  ar: {
    subject: "تم استلام رسالتك",
    title: "تم استلام رسالتك!",
    subtitle: "شكراً للتواصل معي.",
    intro:
      "تم استلام رسالتك بنجاح. سأقوم بمراجعتها والرد عليك في أقرب وقت ممكن.",
    summaryTitle: "ملخص الرسالة",
    subjectLabel: "الموضوع",
    closing:
      "أقدر لك وقتك في الكتابة. يمكنك توقع الرد خلال يوم إلى يومين عمل.",
    cta: "زيارة الموقع",
    footer:
      "لقد تلقيت هذا البريد لأنك أرسلت رسالة عبر mohyaldeen-tellawi.com.",
  },
};

export function contactCustomerEmail({
  locale,
  name,
  subject,
}: {
  locale: Locale;
  name: string;
  subject: string;
}) {
  const t = copy[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";
  const align = locale === "ar" ? "right" : "left";

  return `
<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${t.subject}</title>
</head>

<body style="margin:0;padding:0;background:${C.muted};font-family:${FONT}">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
<tr>
<td align="center">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
style="max-width:620px;background:${C.background};border:1px solid ${C.border};border-radius:12px;overflow:hidden">

  <!-- Header -->
  <tr>
    <td align="center" style="background:${C.primary};padding:40px 32px">
      <div style="color:white;font-size:26px;font-weight:700;letter-spacing:-0.02em">
        Mohyaldeen Tellawi
      </div>
      <div style="color:rgba(255,255,255,.85);font-size:14px;margin-top:8px">
        Software Engineer
      </div>
    </td>
  </tr>

  <!-- Body -->
  <tr>
    <td style="padding:40px 32px;direction:${dir};text-align:${align}">

      <h1 style="margin:0 0 12px;color:${C.foreground};font-size:24px;font-weight:700">
        ${t.title}
      </h1>

      <p style="margin:0 0 8px;color:${C.foreground};font-size:16px;line-height:1.7">
        ${t.subtitle} ${name},
      </p>

      <p style="margin:0 0 28px;color:${C.mutedForeground};font-size:15px;line-height:1.8">
        ${t.intro}
      </p>

      <!-- Summary card -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      style="background:${C.primaryLight};border:1px solid #d9e7ff;border-radius:10px;padding:20px;margin-bottom:28px">
        <tr>
          <td>
            <div style="font-size:16px;font-weight:600;color:${C.foreground};margin-bottom:12px">
              ${t.summaryTitle}
            </div>
            <p style="margin:0 0 6px;color:${C.foreground}">
              <strong>${t.subjectLabel}:</strong> ${subject}
            </p>
          </td>
        </tr>
      </table>

      <p style="color:${C.mutedForeground};font-size:14px;line-height:1.8;margin:0 0 28px">
        ${t.closing}
      </p>

      <!-- CTA -->
      <table role="presentation" cellpadding="0" cellspacing="0" align="${locale === "ar" ? "right" : "left"}">
        <tr>
          <td bgcolor="${C.primary}" style="border-radius:6px">
            <a href="https://www.mohyaldeen-tellawi.com/"
            style="display:inline-block;padding:14px 24px;color:white;text-decoration:none;font-size:14px;font-weight:600">
              ${t.cta}
            </a>
          </td>
        </tr>
      </table>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="border-top:1px solid ${C.border};background:${C.muted};padding:24px 32px;text-align:${align}">
      <p style="margin:0;color:${C.mutedForeground};font-size:12px;line-height:1.6">
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
