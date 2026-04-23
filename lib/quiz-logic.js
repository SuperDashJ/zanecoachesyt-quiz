import { getAnswerLabel } from "@/lib/quiz-data";

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function pickTimeLabel(answer) {
  switch (answer) {
    case "5-minutes":
      return "5-minute daily reset";
    case "15-minutes":
      return "15-minute daily reset";
    case "30-plus-minutes":
      return "30-minute+ daily reset";
    default:
      return "flexible daily reset";
  }
}

function buildPrimaryAction(priority, timeBudget) {
  const pace = pickTimeLabel(timeBudget);

  switch (priority) {
    case "money":
      return `Run one focused money move every day with a ${pace}: outreach, selling, pitching, or building one skill that compounds.`;
    case "fitness":
      return `Turn your ${pace} into a training block: move daily, track protein, and keep your environment pointed at better choices.`;
    case "social":
      return `Use your ${pace} for deliberate reps: message first, start conversations, and make social momentum your daily standard.`;
    default:
      return `Use your ${pace} for one non-negotiable action that moves your life forward.`;
  }
}

function buildBlockerAction(blocker, pain) {
  if (blocker === "screen" || pain === "screens") {
    return "Cut screen drag first: charge your phone away from your bed, set one app limit, and create a nightly no-scroll window.";
  }

  if (pain === "junk-food") {
    return "Remove junk-food friction: pre-plan one easy meal, keep water visible, and stop relying on willpower when you are tired.";
  }

  if (pain === "lack-of-motivation") {
    return "Treat motivation like energy management: make the first step tiny, lower setup time, and keep your plan visible.";
  }

  if (blocker === "quitting") {
    return "Shrink the habit until it is hard to fail, then stack streaks before chasing intensity.";
  }

  if (blocker === "too-much") {
    return "Cut the list down to one main battle for the next 14 days so your effort stops leaking everywhere.";
  }

  if (blocker === "no-main-thing") {
    return "Define one outcome that matters most right now and let everything else become secondary until it moves.";
  }

  return "Keep your system simple enough that you can still follow it on low-energy days.";
}

function buildChangeAction(changeStyle, fastestImprovement) {
  if (changeStyle === "huge-reset") {
    return "Use tonight as the line in the sand: clean your space, plan tomorrow, and make your standards obvious before motivation fades.";
  }

  if (changeStyle === "small-habits") {
    return "Build momentum with tiny wins: one promise, one checkmark, one repeatable action that proves you can trust yourself again.";
  }

  if (fastestImprovement === "choosing-one-focus") {
    return "A single focus is your accelerator right now. Drop extra goals and organize the week around the one result you care about most.";
  }

  if (fastestImprovement === "fixing-discipline") {
    return "Discipline improves fastest when your environment does more of the work. Set cues, defaults, and a fixed daily window.";
  }

  return "Aim for balanced consistency instead of random intensity so the plan still works next week, not just tonight.";
}

function buildScore(status, blocker, pain, changeStyle, timeBudget) {
  const statusScore = Number(status);
  const base = Number.isFinite(statusScore) ? statusScore * 18 : 54;
  let adjustment = 0;

  if (blocker === "screen" || pain === "screens") {
    adjustment -= 8;
  }

  if (pain === "junk-food" || pain === "lack-of-motivation") {
    adjustment -= 6;
  }

  if (changeStyle === "small-habits" || changeStyle === "balanced-change") {
    adjustment += 8;
  }

  if (timeBudget === "15-minutes" || timeBudget === "30-plus-minutes") {
    adjustment += 6;
  }

  if (blocker === "too-much" || blocker === "no-main-thing") {
    adjustment -= 4;
  }

  return clamp(Math.round(base + adjustment), 1, 100);
}

export function buildLeadProfile(answers) {
  const score = buildScore(
    answers.status,
    answers.blocker,
    answers.pain,
    answers["change-style"],
    answers["time-budget"]
  );

  const biggestPriority = getAnswerLabel("priority", answers.priority);
  const fastestImprovement = getAnswerLabel(
    "fastest-improvement",
    answers["fastest-improvement"]
  );
  const blocker = getAnswerLabel("blocker", answers.blocker);
  const painPoint = getAnswerLabel("pain", answers.pain);
  const changeStyle = getAnswerLabel("change-style", answers["change-style"]);
  const timeBudget = getAnswerLabel("time-budget", answers["time-budget"]);

  return {
    score,
    scoreLabel:
      score >= 80
        ? "Strong momentum"
        : score >= 60
          ? "Solid reset potential"
          : score >= 40
            ? "Needs a cleaner system"
            : "Needs a hard reset",
    biggestPriority,
    fastestImprovement,
    blocker,
    painPoint,
    changeStyle,
    timeBudget,
    priorities: [biggestPriority, fastestImprovement].filter(Boolean),
    plan: [
      buildPrimaryAction(answers.priority, answers["time-budget"]),
      buildBlockerAction(answers.blocker, answers.pain),
      buildChangeAction(answers["change-style"], answers["fastest-improvement"])
    ]
  };
}
