const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://zanesquiz.com");

const IMAGE_BY_LABEL = {
  Money: "/quiz-assets/art/priority-money-new.png",
  Fitness: "/quiz-assets/art/priority-fitness-new.png",
  Social: "/quiz-assets/art/priority-social.png",
  Screens: "/quiz-assets/art/screens.png",
  "Junk food": "/quiz-assets/art/junk-food.png",
  "Lack of motivation": "/quiz-assets/art/motivation.png",
  "Huge reset": "/quiz-assets/art/change-huge-reset.png",
  "Small habits": "/quiz-assets/art/change-small-habits.png",
  "Balanced change": "/quiz-assets/art/change-balanced.png",
  "5 minutes": "/quiz-assets/art/time-5.png",
  "15 minutes": "/quiz-assets/art/time-15.png",
  "30+ minutes": "/quiz-assets/art/time-30.png"
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function assetUrl(path) {
  return new URL(path, SITE_URL).toString();
}

function scoreOutOfFive(profile) {
  if (Number.isFinite(profile.statusScore)) {
    return profile.statusScore;
  }

  return Math.min(Math.max(Math.round((profile.score || 0) / 20), 1), 5);
}

function frictionMove(blocker) {
  switch (blocker) {
    case "Screens":
      return "Move your phone out of reach, set one app limit, and create a no-scroll window.";
    case "Junk food":
      return "Remove the easiest junk-food option and pre-pick one simple meal or snack.";
    case "Lack of motivation":
      return "Lower the starting point until it feels almost too easy to begin.";
    default:
      return "Remove the easiest source of friction before you try to add more effort.";
  }
}

function smallestAction(priority, time) {
  switch (priority) {
    case "Money":
      return `Use ${time} for one money move: outreach, selling, pitching, or building one useful skill.`;
    case "Fitness":
      return `Use ${time} for one body move: walk, train, prep food, or track one health choice.`;
    case "Social":
      return `Use ${time} for one social rep: message first, start one conversation, or make one plan.`;
    default:
      return `Use ${time} for one useful action you can actually repeat.`;
  }
}

function repeatAction(style) {
  switch (style) {
    case "Huge reset":
      return "Keep the reset visible, repeat the same core action daily, and do not add extra rules yet.";
    case "Small habits":
      return "Repeat the tiny version daily and let consistency matter more than intensity.";
    case "Balanced change":
      return "Repeat one balanced daily standard and keep the plan simple enough to survive a busy day.";
    default:
      return "Repeat one daily standard and keep the plan simple.";
  }
}

function oneRule(style) {
  switch (style) {
    case "Huge reset":
      return "Reset the day quickly, but do not restart the whole plan from zero.";
    case "Small habits":
      return "Never let two misses happen in a row.";
    case "Balanced change":
      return "Do the smallest version before the day ends.";
    default:
      return "Keep one promise today, even if it is tiny.";
  }
}

function thingToAvoid(blocker) {
  switch (blocker) {
    case "Screens":
      return "Do not open the app that usually eats the first 20 minutes.";
    case "Junk food":
      return "Do not negotiate with food when you are tired or already hungry.";
    case "Lack of motivation":
      return "Do not wait to feel ready before starting.";
    default:
      return "Do not make the plan bigger on a bad day.";
  }
}

function buildEmailPlan(profile) {
  const priority = profile.biggestPriority || "your main priority";
  const blocker = profile.painPoint || profile.blocker || "your biggest blocker";
  const style = profile.changeStyle || "simple";
  const time = profile.timeBudget || "a few minutes";
  const moves = profile.plan?.length
    ? profile.plan.slice(0, 3)
    : [
        smallestAction(priority, time),
        frictionMove(blocker),
        repeatAction(style)
      ];

  return {
    score: scoreOutOfFive(profile),
    priority,
    blocker,
    blockerInSentence:
      blocker === "Screens"
        ? "screens are"
        : blocker === "Junk food"
          ? "junk food is"
          : blocker === "Lack of motivation"
            ? "lack of motivation is"
            : `${blocker} is`,
    style,
    time,
    moves,
    reset: {
      days1To2: frictionMove(blocker),
      days3To4: smallestAction(priority, time),
      days5To7: repeatAction(style)
    },
    badDay: {
      fiveMinuteVersion: `Do 5 minutes of the ${time} plan, then stop if you need to.`,
      oneRule: oneRule(style),
      avoid: thingToAvoid(blocker)
    }
  };
}

function metricCard(label, value) {
  return `
    <td style="width:50%; padding:6px;">
      <div style="min-height:82px; padding:18px; border-radius:18px; background:#fbfaf7; border:1px solid #ded7cc;">
        <div style="font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:#6f7784; margin-bottom:8px;">${escapeHtml(label)}</div>
        <div style="font-size:18px; line-height:1.35; font-weight:800; color:#111825;">${escapeHtml(value)}</div>
      </div>
    </td>`;
}

function imageCard(label, value) {
  const image = IMAGE_BY_LABEL[value];

  if (!image) {
    return "";
  }

  return `
    <td style="width:33.33%; padding:6px; vertical-align:top;">
      <div style="border-radius:20px; overflow:hidden; border:1px solid #ded7cc; background:#ffffff;">
        <img src="${assetUrl(image)}" width="196" alt="" style="display:block; width:100%; height:150px; object-fit:contain; background:#ffffff;" />
        <div style="padding:12px 14px 14px; text-align:center;">
          <div style="font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:#6f7784; margin-bottom:5px;">${escapeHtml(label)}</div>
          <div style="font-size:16px; line-height:1.25; font-weight:800; color:#111825;">${escapeHtml(value)}</div>
        </div>
      </div>
    </td>`;
}

function numberedList(items) {
  return items
    .map(
      (item, index) =>
        `<tr><td style="width:34px; padding:0 0 12px; vertical-align:top;"><div style="width:24px; height:24px; border-radius:999px; background:#111825; color:#ffffff; font-size:13px; line-height:24px; text-align:center; font-weight:800;">${index + 1}</div></td><td style="padding:0 0 12px; color:#2b3340; font-size:16px; line-height:1.65;">${escapeHtml(item)}</td></tr>`
    )
    .join("");
}

function resetBlock(title, body) {
  return `
    <div style="padding:18px 20px; border-radius:18px; background:#fbfaf7; border:1px solid #ded7cc; margin-bottom:12px;">
      <div style="font-size:13px; font-weight:800; color:#111825; margin-bottom:6px;">${escapeHtml(title)}</div>
      <div style="font-size:16px; line-height:1.65; color:#2b3340;">${escapeHtml(body)}</div>
    </div>`;
}

export function buildEmailReport(profile) {
  const subject = "Your reset plan";
  const plan = buildEmailPlan(profile);
  const preview = `Here’s your result. Score: ${plan.score}/5. Biggest priority: ${plan.priority}.`;
  const visualCards = [
    imageCard("Priority", plan.priority),
    imageCard("Blocker", plan.blocker),
    imageCard("Style", plan.style)
  ]
    .filter(Boolean)
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0; padding:0; background:#f7f4ee; font-family:Arial, Helvetica, sans-serif; color:#151c27;">
    <div style="display:none; max-height:0; overflow:hidden;">${escapeHtml(preview)}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f7f4ee; padding:26px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:720px; background:#ffffff; border-radius:28px; overflow:hidden; border:1px solid #ded7cc; box-shadow:0 24px 60px rgba(20, 26, 36, 0.08);">
            <tr>
              <td style="padding:26px 30px; background:#fbfaf7; border-bottom:1px solid #ded7cc; text-align:center;">
                <div style="font-family:Georgia, 'Times New Roman', serif; letter-spacing:0.24em; font-size:21px; line-height:1; color:#111825;">zanesbestlife</div>
              </td>
            </tr>
            <tr>
              <td style="padding:38px 34px 12px;">
                <h1 style="margin:0 0 10px; font-family:Georgia, 'Times New Roman', serif; font-size:46px; line-height:1.05; font-weight:500; color:#111825;">Here&rsquo;s your result.</h1>
                <p style="margin:0; color:#6f7784; font-size:17px; line-height:1.65;">Your plan is simple on purpose. Follow it for the next 7 to 14 days.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    ${metricCard("Score", `${plan.score}/5`)}
                    ${metricCard("Biggest priority", plan.priority)}
                  </tr>
                  <tr>
                    ${metricCard("Biggest blocker", plan.blocker)}
                    ${metricCard("Best-fit change style", plan.style)}
                  </tr>
                  <tr>
                    ${metricCard("Daily capacity", plan.time)}
                    ${metricCard("Track", profile.focusTrack || "Reset plan")}
                  </tr>
                </table>
              </td>
            </tr>
            ${
              visualCards
                ? `<tr><td style="padding:4px 28px 18px;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>${visualCards}</tr></table></td></tr>`
                : ""
            }
            <tr>
              <td style="padding:24px 34px 4px;">
                <h2 style="margin:0 0 12px; font-size:23px; color:#111825;">What this means</h2>
                <p style="margin:0 0 14px; color:#2b3340; font-size:16px; line-height:1.75;">Right now, you do not need more advice.<br />You need a simple plan you will actually follow.</p>
                <p style="margin:0 0 14px; color:#2b3340; font-size:16px; line-height:1.75;">Your biggest priority is <strong>${escapeHtml(plan.priority)}</strong>, but <strong>${escapeHtml(plan.blockerInSentence)}</strong> getting in the way.</p>
                <p style="margin:0; color:#2b3340; font-size:16px; line-height:1.75;">The best move is a <strong>${escapeHtml(plan.style)}</strong> plan built around <strong>${escapeHtml(plan.time)}</strong> a day.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 34px 4px;">
                <h2 style="margin:0 0 14px; font-size:23px; color:#111825;">Your first 3 moves</h2>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${numberedList(plan.moves)}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 34px 4px;">
                <h2 style="margin:0 0 14px; font-size:23px; color:#111825;">Your 7-day reset</h2>
                ${resetBlock("Days 1 to 2", plan.reset.days1To2)}
                ${resetBlock("Days 3 to 4", plan.reset.days3To4)}
                ${resetBlock("Days 5 to 7", plan.reset.days5To7)}
              </td>
            </tr>
            <tr>
              <td style="padding:24px 34px 4px;">
                <div style="padding:24px; border-radius:24px; background:#111825;">
                  <h2 style="margin:0 0 10px; font-size:23px; color:#ffffff;">Bad-day version</h2>
                  <p style="margin:0 0 12px; color:rgba(255,255,255,0.78); font-size:16px; line-height:1.65;">If the day feels off, do this instead:</p>
                  <ul style="margin:0; padding-left:22px;">
                    <li style="margin:0 0 9px; color:#ffffff; font-size:16px; line-height:1.6;">${escapeHtml(plan.badDay.fiveMinuteVersion)}</li>
                    <li style="margin:0 0 9px; color:#ffffff; font-size:16px; line-height:1.6;">${escapeHtml(plan.badDay.oneRule)}</li>
                    <li style="margin:0; color:#ffffff; font-size:16px; line-height:1.6;">${escapeHtml(plan.badDay.avoid)}</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 34px 8px;">
                <p style="margin:0; color:#2b3340; font-size:16px; line-height:1.75;">If you follow this for the next 7 to 14 days, you should feel more in control, less scattered, and more consistent in the part of life that matters most right now.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 34px 34px;">
                <div style="padding:20px 22px; border-radius:20px; background:#fbfaf7; border:1px solid #ded7cc;">
                  <div style="font-size:12px; letter-spacing:0.1em; text-transform:uppercase; color:#6f7784; margin-bottom:8px;">Pro tip</div>
                  <p style="margin:0; color:#2b3340; font-size:16px; line-height:1.7;">Paste this email into AI and ask it to hold you accountable, check in with you every day, and help you stick to the plan.</p>
                </div>
                <p style="margin:22px 0 0; color:#111825; font-size:16px; line-height:1.6;">- Zane</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "Here’s your result.",
    "",
    `Score: ${plan.score}/5`,
    `Biggest priority: ${plan.priority}`,
    `Biggest blocker: ${plan.blocker}`,
    `Best-fit change style: ${plan.style}`,
    `Daily capacity: ${plan.time}`,
    "",
    "What this means",
    "",
    "Right now, you do not need more advice.",
    "You need a simple plan you will actually follow.",
    "",
    `Your biggest priority is ${plan.priority}, but ${plan.blockerInSentence} getting in the way.`,
    `The best move is a ${plan.style} plan built around ${plan.time} a day.`,
    "",
    "Your first 3 moves",
    "",
    ...plan.moves.map((item, index) => `${index + 1}. ${item}`),
    "",
    "Your 7-day reset",
    "",
    "Days 1 to 2",
    plan.reset.days1To2,
    "",
    "Days 3 to 4",
    plan.reset.days3To4,
    "",
    "Days 5 to 7",
    plan.reset.days5To7,
    "",
    "Bad-day version",
    "",
    "If the day feels off, do this instead:",
    `- ${plan.badDay.fiveMinuteVersion}`,
    `- ${plan.badDay.oneRule}`,
    `- ${plan.badDay.avoid}`,
    "",
    "If you follow this for the next 7 to 14 days, you should feel more in control, less scattered, and more consistent in the part of life that matters most right now.",
    "",
    "Pro tip",
    "",
    "Paste this email into AI and ask it to hold you accountable, check in with you every day, and help you stick to the plan.",
    "",
    "- Zane"
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
  const configuredFrom = process.env.RESEND_FROM_EMAIL;
  const from =
    !configuredFrom || configuredFrom.includes("onboarding@resend.dev")
      ? "ZanesBestLife <results@zanesquiz.com>"
      : configuredFrom;
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
      "Content-Type": "application/json",
      "User-Agent": "zanesbestlife-quiz/1.0"
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
