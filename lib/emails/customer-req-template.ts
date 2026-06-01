type Locale = "ar" | "en";

const copy = {
  en: {
    title: "Your Project Request Has Been Received 🚀",

    intro:
      "Thank you for submitting your project request. Your request has been received successfully and is currently under review.",

    summary: "Project Summary",

    projectType: "Project Type",
    budget: "Budget",
    timeline: "Timeline",
    mvp: "MVP",

    yes: "Yes",
    no: "No",

    closing:
      "I will carefully review your requirements and get back to you as soon as possible to discuss the next steps.",

    cta: "Visit Portfolio",

    footer:
      "You received this email because you submitted a project request through mohyaldeen-tellawi.com.",
  },

  ar: {
    title: "تم استلام طلب مشروعك بنجاح 🚀",

    intro:
      "شكراً لتقديم طلب مشروع جديد. تم استلام طلبك بنجاح وهو الآن قيد المراجعة.",

    summary: "ملخص الطلب",

    projectType: "نوع المشروع",
    budget: "الميزانية",
    timeline: "المدة المتوقعة",
    mvp: "نسخة MVP",

    yes: "نعم",
    no: "لا",

    closing:
      "سأقوم بمراجعة تفاصيل المشروع والتواصل معك في أقرب وقت ممكن لمناقشة المتطلبات والخطوات التالية.",

    cta: "زيارة الموقع",

    footer:
      "لقد تلقيت هذا البريد لأنك قمت بإرسال طلب مشروع عبر mohyaldeen-tellawi.com.",
  },
};

export function projectRequestCustomerEmail({
  locale,
  projectType,
  budget,
  timeLine,
  isMvp,
}: {
  locale: Locale;
  projectType: string;
  budget: string;
  timeLine: string;
  isMvp: boolean;
}) {
  const t = copy[locale];

  const dir = locale === "ar" ? "rtl" : "ltr";
  const align = locale === "ar" ? "right" : "left";

  return `
<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<body style="margin:0;padding:0;background:#f7f7f7;font-family:Inter,Arial,sans-serif">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0"
style="max-width:600px;background:#fff;border:1px solid #e8e8e8;border-radius:10px">

<tr>
<td style="background:#3b6fd4;padding:32px;text-align:center">
<span style="color:#fff;font-size:22px;font-weight:700">
Mohyaldeen Tellawi
</span>
</td>
</tr>

<tr>
<td style="padding:32px;direction:${dir};text-align:${align}">

<h1 style="margin:0 0 16px;color:#191919;font-size:24px">
${t.title}
</h1>

<p style="margin:0 0 24px;color:#6b6b6b;line-height:1.8">
${t.intro}
</p>

<table width="100%" cellpadding="0" cellspacing="0"
style="background:#eef4ff;border:1px solid #d9e7ff;border-radius:8px;padding:20px;margin-bottom:24px">

<tr>
<td>

<h3 style="margin:0 0 16px;color:#191919">
${t.summary}
</h3>

<p><strong>${t.projectType}:</strong> ${projectType}</p>

<p><strong>${t.budget}:</strong> ${budget}</p>

<p><strong>${t.timeline}:</strong> ${timeLine}</p>

<p><strong>${t.mvp}:</strong> ${isMvp ? t.yes : t.no}</p>

</td>
</tr>
</table>

<p style="color:#6b6b6b;line-height:1.8">
${t.closing}
</p>

<div style="margin-top:32px">
<a href="https://www.mohyaldeen-tellawi.com/"
style="
background:#3b6fd4;
color:white;
text-decoration:none;
padding:12px 20px;
display:inline-block;
border-radius:4px;
">
${t.cta}
</a>
</div>

</td>
</tr>

<tr>
<td style="
background:#f7f7f7;
padding:20px 32px;
border-top:1px solid #e8e8e8;
color:#6b6b6b;
font-size:12px;
text-align:${align};
">
${t.footer}
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
