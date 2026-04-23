function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatList(items) {
  return items
    .map(
      (item) =>
        `<li style="margin:0 0 12px; color:#2b3340; font-size:16px; line-height:1.65;">${escapeHtml(item)}</li>`
    )
    .join("");
}

export function buildEmailReport(profile) {
  const subject = `Your ZANESBESTLIFE reset plan: ${profile.score}/100`;
  const preview = `${profile.summary} Priority: ${profile.biggestPriority}. Blocker: ${profile.blocker}.`;

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0; padding:0; background:#f5f1ea; font-family:Arial, Helvetica, sans-serif; color:#151c27;">
    <div style="display:none; max-height:0; overflow:hidden;">${escapeHtml(preview)}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f1ea; padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:720px; background:#ffffff; border-radius:28px; overflow:hidden; box-shadow:0 20px 60px rgba(17, 24, 37, 0.08);">
            <tr>
              <td style="padding:26px 34px; background:#fbfaf7; border-bottom:1px solid #e7e0d5; text-align:center;">
                <div style="font-family:Georgia, 'Times New Roman', serif; letter-spacing:0.28em; font-size:18px; color:#222b36;">ZANESBESTLIFE</div>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 34px 18px;">
                <div style="display:inline-block; padding:8px 14px; border-radius:999px; background:#edf3ff; color:#2957cc; font-size:13px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase;">${escapeHtml(profile.resetPhase)}</div>
                <h1 style="margin:18px 0 12px; font-family:Georgia, 'Times New Roman', serif; font-size:42px; line-height:1.08; font-weight:500; color:#121926;">Your personalized reset plan</h1>
                <p style="margin:0; color:#616b78; font-size:18px; line-height:1.7;">${escapeHtml(profile.summary)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 34px 6px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="padding:0 0 18px;">
                      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="width:33.33%; padding:0 8px 0 0;">
                            <div style="padding:20px; border-radius:22px; background:#f8f4ee; border:1px solid #ede4d7;">
                              <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#6f7784; margin-bottom:8px;">Reset score</div>
                              <div style="font-size:38px; font-weight:800; color:#111825;">${escapeHtml(profile.score)}</div>
                              <div style="font-size:15px; color:#4f5864;">${escapeHtml(profile.scoreLabel)}</div>
                            </div>
                          </td>
                          <td style="width:33.33%; padding:0 4px;">
                            <div style="padding:20px; border-radius:22px; background:#f8f4ee; border:1px solid #ede4d7;">
                              <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#6f7784; margin-bottom:8px;">Priority</div>
                              <div style="font-size:20px; font-weight:700; color:#111825; line-height:1.35;">${escapeHtml(profile.biggestPriority || "Not set")}</div>
                            </div>
                          </td>
                          <td style="width:33.33%; padding:0 0 0 8px;">
                            <div style="padding:20px; border-radius:22px; background:#f8f4ee; border:1px solid #ede4d7;">
                              <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#6f7784; margin-bottom:8px;">Main blocker</div>
                              <div style="font-size:20px; font-weight:700; color:#111825; line-height:1.35;">${escapeHtml(profile.blocker || "Not set")}</div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 34px 6px;">
                <h2 style="margin:0 0 10px; font-size:22px; color:#121926;">What this means</h2>
                <p style="margin:0 0 14px; color:#2b3340; font-size:16px; line-height:1.75;"><strong>${escapeHtml(profile.focusTrack)}</strong> is your best path right now.</p>
                <p style="margin:0 0 14px; color:#2b3340; font-size:16px; line-height:1.75;">${escapeHtml(profile.coreProblem)}</p>
                <p style="margin:0; color:#2b3340; font-size:16px; line-height:1.75;">${escapeHtml(profile.fastestWin)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 34px 6px;">
                <div style="padding:26px; border-radius:24px; background:#111825;">
                  <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.66); margin-bottom:10px;">Identity shift</div>
                  <div style="font-size:22px; line-height:1.55; color:#ffffff;">${escapeHtml(profile.identityShift)}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 34px 4px;">
                <h2 style="margin:0 0 10px; font-size:22px; color:#121926;">Your next 72 hours</h2>
                <ul style="padding-left:22px; margin:0;">${formatList(profile.next72Hours)}</ul>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 34px 4px;">
                <h2 style="margin:0 0 10px; font-size:22px; color:#121926;">Week one checklist</h2>
                <ul style="padding-left:22px; margin:0;">${formatList(profile.weekOneChecklist)}</ul>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 34px 6px;">
                <h2 style="margin:0 0 10px; font-size:22px; color:#121926;">Your custom action plan</h2>
                <ul style="padding-left:22px; margin:0;">${formatList(profile.plan)}</ul>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 34px 34px;">
                <div style="padding:18px 22px; border-radius:20px; background:#f8f4ee; border:1px solid #ede4d7;">
                  <div style="font-size:12px; letter-spacing:0.08em; text-transform:uppercase; color:#6f7784; margin-bottom:10px;">Biggest priorities</div>
                  <div style="font-size:18px; line-height:1.6; color:#121926;">${escapeHtml(profile.priorities.filter(Boolean).join(" + ") || "Keep it simple and follow through.")}</div>
                </div>
                <p style="margin:18px 0 0; color:#6f7784; font-size:14px; line-height:1.7;">This report was generated from your ZANESBESTLIFE quiz answers so you can come back to a clear plan instead of guessing what to do next.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "ZANESBESTLIFE - Your personalized reset plan",
    "",
    `Reset score: ${profile.score} (${profile.scoreLabel})`,
    `Priority: ${profile.biggestPriority || "Not set"}`,
    `Main blocker: ${profile.blocker || "Not set"}`,
    `Time budget: ${profile.timeBudget || "Not set"}`,
    "",
    profile.summary,
    "",
    `What this means: ${profile.coreProblem}`,
    `Fastest win: ${profile.fastestWin}`,
    `Identity shift: ${profile.identityShift}`,
    "",
    "Next 72 hours:",
    ...profile.next72Hours.map((item) => `- ${item}`),
    "",
    "Week one checklist:",
    ...profile.weekOneChecklist.map((item) => `- ${item}`),
    "",
    "Custom action plan:",
    ...profile.plan.map((item) => `- ${item}`)
  ].join("\n");

  return {
    subject,
    preview,
    html,
    text
  };
}

export async function sendReportEmail({ email, profile }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "zanesbestlife <onboarding@resend.dev>";
  const replyTo = process.env.RESEND_REPLY_TO;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      return {
        ok: false,
        skipped: true,
        reason: "RESEND_API_KEY is not configured in local development."
      };
    }

    throw new Error("Email sending is not configured. Set RESEND_API_KEY before deploying.");
  }

  const report = buildEmailReport(profile);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: report.subject,
      html: report.html,
      text: report.text,
      ...(replyTo ? { reply_to: replyTo } : {})
    }),
    cache: "no-store"
  });

  const result = await response.json();

  if (!response.ok) {
    const message =
      typeof result?.message === "string"
        ? result.message
        : typeof result?.error === "string"
          ? result.error
          : "Unable to send the reset report email.";
    throw new Error(message);
  }

  return {
    ok: true,
    id: result?.id || null,
    subject: report.subject,
    preview: report.preview
  };
}
