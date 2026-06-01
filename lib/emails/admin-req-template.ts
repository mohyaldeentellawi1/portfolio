export function projectRequestAdminEmail({
  name,
  email,
  projectType,
  vision,
  budget,
  timeLine,
  isMvp,
  note,
}: {
  name: string;
  email: string;
  projectType: string;
  vision: string;
  budget: string;
  timeLine: string;
  isMvp: boolean;
  note?: string | null;
}) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:Inter,Arial,sans-serif">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0"
style="max-width:700px;background:#fff;border:1px solid #e8e8e8;border-radius:10px">

<tr>
<td style="
background:#3b6fd4;
padding:28px;
text-align:center;
color:white;
font-size:22px;
font-weight:700;
">
🚀 New Project Request
</td>
</tr>

<tr>
<td style="padding:32px">

<h2 style="margin-top:0">
Client Information
</h2>

<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>

<hr style="border:none;border-top:1px solid #e8e8e8;margin:24px 0">

<h2>
Project Details
</h2>

<p><strong>Project Type:</strong> ${projectType}</p>

<p><strong>Budget:</strong> ${budget}</p>

<p><strong>Timeline:</strong> ${timeLine}</p>

<p><strong>MVP:</strong> ${isMvp ? "Yes" : "No"}</p>

<hr style="border:none;border-top:1px solid #e8e8e8;margin:24px 0">

<h2>
Project Vision
</h2>

<div style="
background:#f7f7f7;
border:1px solid #e8e8e8;
padding:16px;
border-radius:8px;
white-space:pre-wrap;
line-height:1.8;
">
${vision}
</div>

${
  note
    ? `
<hr style="border:none;border-top:1px solid #e8e8e8;margin:24px 0">

<h2>
Additional Notes
</h2>

<div style="
background:#f7f7f7;
border:1px solid #e8e8e8;
padding:16px;
border-radius:8px;
white-space:pre-wrap;
line-height:1.8;
">
${note}
</div>
`
    : ""
}

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
