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

const CHANNEL_URL = "https://www.youtube.com/@zanesbestlife";
const HEADSHOT_URL =
  "https://yt3.googleusercontent.com/u4hDFTkryZlSfEEWcUQTpepCjNJHMsqzrV80CRCRP5FnmSTipR0Ktir52Wj7uXRchflJivyQ=s200-c-k-c0x00ffffff-no-rj";

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

function addUnique(items, item) {
  if (item && !items.includes(item)) {
    items.push(item);
  }
}

function priorityDailyActions(priority) {
  switch (priority) {
    case "Money":
      return ["Send one outreach message.", "Track every dollar you spend today."];
    case "Fitness":
      return ["Track your meals with AI.", "Do a 10 minute workout."];
    case "Social":
      return ["Message one person first.", "Start one short conversation."];
    default:
      return ["Do one small action tied to your priority."];
  }
}

function blockerDailyAction(blocker) {
  switch (blocker) {
    case "Screens":
      return "Set a 15 minute social media limit.";
    case "Junk food":
      return "Track your meals with AI.";
    case "Lack of motivation":
      return "Set a 5 minute timer and start.";
    default:
      return "Remove one thing that pulls you off track.";
  }
}

function styleDailyAction(style) {
  switch (style) {
    case "Huge reset":
      return "Clear one distraction before bed.";
    case "Small habits":
      return "Check off one tiny win.";
    case "Balanced change":
      return "Do the same action at the same time.";
    default:
      return "Keep the action small enough to repeat.";
  }
}

function timeDailyAction(time) {
  switch (time) {
    case "5 minutes":
      return "Do the 5 minute version.";
    case "15 minutes":
      return "Set a 15 minute timer and finish one task.";
    case "30+ minutes":
      return "Do one 30 minute focus block.";
    default:
      return "Set a timer and do the smallest useful version.";
  }
}

function buildBareMinimumActions(priority, blocker, style, time) {
  const actions = [];

  addUnique(actions, blockerDailyAction(blocker));
  for (const action of priorityDailyActions(priority)) {
    addUnique(actions, action);
  }
  addUnique(actions, timeDailyAction(time));
  addUnique(actions, styleDailyAction(style));

  return actions.slice(0, 4);
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
    bareMinimumActions: buildBareMinimumActions(priority, blocker, style, time)
  };
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

function actionBullets(items) {
  return items
    .map(
      (item) =>
        `<li style="margin:0 0 9px; color:#ffffff; font-size:16px; line-height:1.55;">${escapeHtml(item)}</li>`
    )
    .join("");
}

export function buildEmailReport(profile) {
  const subject = "Your reset plan";
  const plan = buildEmailPlan(profile);
  const preview = "Here’s where you are. Your bare minimum daily actions are inside.";
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
            ${
              visualCards
                ? `<tr><td style="padding:12px 28px 18px;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>${visualCards}</tr></table></td></tr>`
                : ""
            }
            <tr>
              <td style="padding:22px 34px 2px;">
                <h2 style="margin:0 0 14px; font-size:22px; color:#111825;">Do these first</h2>
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${numberedRows(plan.actions)}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 34px 2px;">
                <div style="padding:22px 24px 16px; border-radius:22px; background:#111825;">
                  <h2 style="margin:0 0 12px; font-size:22px; color:#ffffff;">Bare minimum daily actions</h2>
                  <ul style="margin:0; padding-left:22px;">
                    ${actionBullets(plan.bareMinimumActions)}
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
                <div style="margin:18px 0 0; padding:18px 20px; border-radius:18px; background:#111825; text-align:center;">
                  <p style="margin:0 0 12px; color:#ffffff; font-size:16px; line-height:1.5; font-weight:800;">Click for more self improvement videos 👉</p>
                  <a href="${CHANNEL_URL}" style="display:inline-block; text-decoration:none;">
                    <img src="${HEADSHOT_URL}" width="112" height="112" alt="Zane" style="display:block; width:112px; height:112px; border-radius:999px; border:3px solid #ffffff; object-fit:cover; margin:0 auto;" />
                  </a>
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
    "Do these first",
    "",
    ...plan.actions.map((action, index) => `${index + 1}. ${action}`),
    "",
    "Bare minimum daily actions",
    "",
    ...plan.bareMinimumActions.map((action) => `- ${action}`),
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
    "Click for more self improvement videos 👉",
    CHANNEL_URL,
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
