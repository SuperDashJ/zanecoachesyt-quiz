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
  "Balanced change": "/quiz-assets/art/change-balanced.png"
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

function blockerPhrase(blocker) {
  switch (blocker) {
    case "Screens":
      return "screens are";
    case "Junk food":
      return "junk food is";
    case "Lack of motivation":
      return "low motivation is";
    default:
      return `${blocker} is`;
  }
}

function cutFriction(blocker) {
  switch (blocker) {
    case "Screens":
      return "Put your phone in another room for the first work block.";
    case "Junk food":
      return "Remove the easiest junk food from your space today.";
    case "Lack of motivation":
      return "Set out the first step before you need motivation.";
    default:
      return "Remove the easiest thing that pulls you off track.";
  }
}

function smallAction(priority, time) {
  switch (priority) {
    case "Money":
      return `Use ${time} for one money move: send outreach, pitch, sell, or build one useful skill.`;
    case "Fitness":
      return `Use ${time} for one fitness move: walk, train, prep food, or track one meal.`;
    case "Social":
      return `Use ${time} for one social move: message first, start one talk, or make one plan.`;
    default:
      return `Use ${time} for one useful action tied to your priority.`;
  }
}

function repeatDaily(style) {
  switch (style) {
    case "Huge reset":
      return "Repeat the same action at the same time each day. Do not add more rules.";
    case "Small habits":
      return "Repeat the smallest version at the same time each day.";
    case "Balanced change":
      return "Repeat one balanced action at the same time each day.";
    default:
      return "Repeat one clear action at the same time each day.";
  }
}

function keepStreak(style) {
  switch (style) {
    case "Huge reset":
      return "Keep the streak alive. Keep the rules simple.";
    case "Small habits":
      return "Keep the streak alive. Make the action small enough to repeat.";
    case "Balanced change":
      return "Keep the streak alive. Keep the action steady.";
    default:
      return "Keep the streak alive.";
  }
}

function makeAutomatic(priority) {
  switch (priority) {
    case "Money":
      return "Make it automatic: same money block, same time, every day.";
    case "Fitness":
      return "Make it automatic: same training block, same time, every day.";
    case "Social":
      return "Make it automatic: same social rep, same time, every day.";
    default:
      return "Make it automatic: same time, same place, every day.";
  }
}

function buildEmailPlan(profile) {
  const priority = profile.biggestPriority || "your priority";
  const blocker = profile.painPoint || profile.blocker || "your blocker";
  const style = profile.changeStyle || "simple";
  const time = profile.timeBudget || "5 minutes";

  return {
    score: scoreOutOfFive(profile),
    priority,
    blocker,
    blockerPhrase: blockerPhrase(blocker),
    style,
    time,
    actions: [
      cutFriction(blocker),
      smallAction(priority, time),
      repeatDaily(style)
    ],
    reset: {
      days1To2: cutFriction(blocker),
      days3To4: smallAction(priority, time),
      days5To7: [keepStreak(style), makeAutomatic(priority)]
    }
  };
}

function metricCard(label, value) {
  return `
    <td style="width:50%; padding:6px; vertical-align:top;">
      <div style="min-height:72px; padding:16px 18px; border-radius:16px; background:#fbfaf7; border:1px solid #ded7cc;">
        <div style="font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6f7784; margin-bottom:7px;">${escapeHtml(label)}</div>
        <div style="font-size:17px; line-height:1.35; font-weight:800; color:#111825;">${escapeHtml(value)}</div>
      </div>
    </td>`;
}

function wideMetricCard(label, value) {
  return `
    <td colspan="2" style="padding:6px; vertical-align:top;">
      <div style="min-height:72px; padding:16px 18px; border-radius:16px; background:#fbfaf7; border:1px solid #ded7cc;">
        <div style="font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#6f7784; margin-bottom:7px;">${escapeHtml(label)}</div>
        <div style="font-size:17px; line-height:1.35; font-weight:800; color:#111825;">${escapeHtml(value)}</div>
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
      <div style="border-radius:18px; overflow:hidden; border:1px solid #ded7cc; background:#ffffff;">
        <img src="${assetUrl(image)}" width="196" alt="" style="display:block; width:100%; height:132px; object-fit:contain; background:#ffffff;" />
        <div style="padding:10px 12px 12px; text-align:center;">
          <div style="font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:#6f7784; margin-bottom:4px;">${escapeHtml(label)}</div>
          <div style="font-size:15px; line-height:1.25; font-weight:800; color:#111825;">${escapeHtml(value)}</div>
        </div>
      </div>
    </td>`;
}

function numberedRows(items) {
  return items
    .map(
      (item, index) =>
        `<tr><td style="width:30px; padding:0 0 10px; vertical-align:top;"><div style="width:22px; height:22px; border-radius:999px; background:#111825; color:#ffffff; font-size:12px; line-height:22px; text-align:center; font-weight:800;">${index + 1}</div></td><td style="padding:0 0 10px; color:#2b3340; font-size:16px; line-height:1.6;">${escapeHtml(item)}</td></tr>`
    )
    .join("");
}

function resetBlock(title, content) {
  const lines = Array.isArray(content) ? content : [content];

  return `
    <div style="padding:17px 19px; border-radius:16px; background:#fbfaf7; border:1px solid #ded7cc; margin-bottom:10px;">
      <div style="font-size:13px; font-weight:800; color:#111825; margin-bottom:6px;">${escapeHtml(title)}</div>
      ${lines
        .map(
          (line) =>
            `<div style="font-size:16px; line-height:1.6; color:#2b3340;">${escapeHtml(line)}</div>`
        )
        .join("")}
    </div>`;
}

export function buildEmailReport(profile) {
  const subject = "Your reset plan";
  const plan = buildEmailPlan(profile);
  const preview = `Here’s where you are. Score: ${plan.score}/5. Priority: ${plan.priority}.`;
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
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:700px; background:#ffffff; border-radius:24px; overflow:hidden; border:1px solid #ded7cc; box-shadow:0 24px 58px rgba(20, 26, 36, 0.08);">
            <tr>
              <td style="padding:34px 34px 8px;">
                <h1 style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:42px; line-height:1.08; font-weight:500; color:#111825;">Here&rsquo;s where you are.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 28px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    ${metricCard("Score", `${plan.score}/5`)}
                    ${metricCard("Priority", plan.priority)}
                  </tr>
                  <tr>
                    ${metricCard("Blocker", plan.blocker)}
                    ${metricCard("Style", plan.style)}
                  </tr>
                  <tr>
                    ${wideMetricCard("Time", plan.time)}
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
              <td style="padding:22px 34px 2px;">
                <h2 style="margin:0 0 12px; font-size:22px; color:#111825;">The problem</h2>
                <p style="margin:0 0 12px; color:#2b3340; font-size:16px; line-height:1.7;">You care about <strong>${escapeHtml(plan.priority)}</strong>.<br />But <strong>${escapeHtml(plan.blockerPhrase)}</strong> beating your current system.</p>
                <p style="margin:0; color:#2b3340; font-size:16px; line-height:1.7;">The move is not more motivation.<br />The move is a <strong>${escapeHtml(plan.style)}</strong> plan you can do in <strong>${escapeHtml(plan.time)}</strong> a day.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 34px 2px;">
                <h2 style="margin:0 0 14px; font-size:22px; color:#111825;">Do these first</h2>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${numberedRows(plan.actions)}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 34px 2px;">
                <h2 style="margin:0 0 14px; font-size:22px; color:#111825;">Your 7-day reset</h2>
                ${resetBlock("Days 1 to 2", plan.reset.days1To2)}
                ${resetBlock("Days 3 to 4", plan.reset.days3To4)}
                ${resetBlock("Days 5 to 7", plan.reset.days5To7)}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 34px 2px;">
                <div style="padding:22px 24px; border-radius:22px; background:#111825;">
                  <h2 style="margin:0 0 10px; font-size:22px; color:#ffffff;">Bad-day rule</h2>
                  <p style="margin:0 0 10px; color:rgba(255,255,255,0.78); font-size:16px; line-height:1.6;">If the day is bad:</p>
                  <ul style="margin:0; padding-left:22px;">
                    <li style="margin:0 0 8px; color:#ffffff; font-size:16px; line-height:1.55;">do the 5-minute version</li>
                    <li style="margin:0 0 8px; color:#ffffff; font-size:16px; line-height:1.55;">do it before scrolling</li>
                    <li style="margin:0; color:#ffffff; font-size:16px; line-height:1.55;">do not miss twice</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 34px 2px;">
                <h2 style="margin:0 0 12px; font-size:22px; color:#111825;">What happens if you do this</h2>
                <p style="margin:0; color:#2b3340; font-size:16px; line-height:1.7;">You get momentum back.<br />You stop guessing.<br />You start moving in the area that matters most.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 34px 34px;">
                <div style="padding:19px 21px; border-radius:18px; background:#fbfaf7; border:1px solid #ded7cc;">
                  <h2 style="margin:0 0 10px; font-size:22px; color:#111825;">Pro tip</h2>
                  <p style="margin:0; color:#2b3340; font-size:16px; line-height:1.7;">Paste this email into AI and say:<br />Hold me accountable to this plan.<br />Check in with me every day.<br />Help me adjust if I fall off.</p>
                </div>
                <p style="margin:20px 0 0; color:#111825; font-size:16px; line-height:1.5;">- Zane</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "Here’s where you are.",
    "",
    `Score: ${plan.score}/5`,
    `Priority: ${plan.priority}`,
    `Blocker: ${plan.blocker}`,
    `Style: ${plan.style}`,
    `Time: ${plan.time}`,
    "",
    "The problem",
    "",
    `You care about ${plan.priority}.`,
    `But ${plan.blockerPhrase} beating your current system.`,
    "",
    "The move is not more motivation.",
    `The move is a ${plan.style} plan you can do in ${plan.time} a day.`,
    "",
    "Do these first",
    "",
    ...plan.actions.map((action, index) => `${index + 1}. ${action}`),
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
    ...plan.reset.days5To7,
    "",
    "Bad-day rule",
    "",
    "If the day is bad:",
    "- do the 5-minute version",
    "- do it before scrolling",
    "- do not miss twice",
    "",
    "What happens if you do this",
    "",
    "You get momentum back.",
    "You stop guessing.",
    "You start moving in the area that matters most.",
    "",
    "Pro tip",
    "",
    "Paste this email into AI and say:",
    "Hold me accountable to this plan.",
    "Check in with me every day.",
    "Help me adjust if I fall off.",
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
