import { getAnswerLabel } from "@/lib/quiz-data";

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function pickTimeLabel(answer) {
  switch (answer) {
    case "5-minutes":
      return "5-minute creator block";
    case "15-minutes":
      return "15-minute creator block";
    case "30-plus-minutes":
      return "30-minute+ creator block";
    default:
      return "flexible creator block";
  }
}

function buildPrimaryAction(priority, timeBudget) {
  const pace = pickTimeLabel(timeBudget);

  switch (priority) {
    case "unlocking-monetization":
      return `Use your ${pace} to move toward monetization: improve one video idea, package one upload better, or make one audience-building move.`;
    case "making-money":
      return `Use your ${pace} for one creator money move: sharpen an offer, make one useful video, or build one path from attention to income.`;
    case "growing-income":
      return `Use your ${pace} to turn views into income: improve the content promise, call to action, or next step for viewers.`;
    default:
      return `Use your ${pace} for one non-negotiable creator action.`;
  }
}

function buildBlockerAction(blocker, pain) {
  if (pain === "analytics") {
    return "Check analytics once, choose one lesson, then stop looking and make the next video.";
  }

  if (pain === "algorithm") {
    return "Treat the algorithm like feedback, not a verdict: change one title, hook, or format variable at a time.";
  }

  if (pain === "overthinking") {
    return "Lower the posting bar today: publish the smallest finished version and let the result teach you.";
  }

  if (blocker === "inconsistent") {
    return "Shrink the creator rep until it is hard to skip, then stack uploads before chasing perfection.";
  }

  if (blocker === "still-failing") {
    return "Stop changing everything at once. Pick one lever to test in the next three uploads.";
  }

  if (blocker === "unclear-direction") {
    return "Pick one viewer, one promise, and one content lane so your effort stops scattering.";
  }

  return "Keep your creator system simple enough that you can still follow it on low-energy days.";
}

function buildChangeAction(changeStyle, fastestImprovement) {
  if (changeStyle === "huge-reset") {
    return "Use tonight as the line in the sand: clean your space, plan tomorrow, and make your standards obvious before motivation fades.";
  }

  if (changeStyle === "small-habits") {
    return "Build momentum with tiny wins: one promise, one checkmark, one repeatable action that proves you can trust yourself again.";
  }

  if (fastestImprovement === "getting-clicks") {
    return "Your next unlock is packaging. Make the title, thumbnail, and first promise impossible to ignore.";
  }

  if (fastestImprovement === "keeping-watch") {
    return "Your next unlock is retention. Tighten the opening, cut filler, and make each moment earn the next.";
  }

  if (fastestImprovement === "publishing-enough") {
    return "Your next unlock is reps. Publish enough to get real feedback instead of guessing in private.";
  }

  return "Aim for balanced consistency so your channel gets cleaner with each upload.";
}

function buildFocusTrack(priority, fastestImprovement) {
  if (priority === "unlocking-monetization" || priority === "making-money" || priority === "growing-income") {
    return "Creator income track";
  }

  if (fastestImprovement === "getting-clicks") {
    return "Click-through track";
  }

  if (fastestImprovement === "keeping-watch") {
    return "Retention track";
  }

  if (fastestImprovement === "publishing-enough") {
    return "Publishing reps track";
  }

  return "Focused creator track";
}

function buildCoreProblem(blocker, pain) {
  if (pain === "analytics") {
    return "You are spending too much time judging the numbers and not enough time making the next upload better.";
  }

  if (pain === "algorithm") {
    return "The algorithm feels personal because your feedback loop is too messy to read clearly yet.";
  }

  if (pain === "overthinking") {
    return "Overthinking is delaying the reps you need to actually learn what works.";
  }

  if (blocker === "inconsistent") {
    return "Your channel is not getting enough consistent reps to teach you what works.";
  }

  if (blocker === "unclear-direction") {
    return "Your content direction is too blurry, so every upload has to work too hard.";
  }

  if (blocker === "still-failing") {
    return "You may be doing a lot, but the channel needs clearer tests instead of more random effort.";
  }

  return "Your channel plan needs more clarity and less friction.";
}

function buildResetPhase(score) {
  if (score >= 80) {
    return "Acceleration phase";
  }

  if (score >= 60) {
    return "Momentum phase";
  }

  if (score >= 40) {
    return "Rebuild phase";
  }

  return "Reset phase";
}

function buildIdentityShift(priority) {
  switch (priority) {
    case "unlocking-monetization":
      return "Start acting like someone building a channel that earns trust before it earns money.";
    case "making-money":
      return "Start seeing content as a value engine, not just uploads.";
    case "growing-income":
      return "Start building a clear bridge from attention to the next useful step for viewers.";
    default:
      return "Start identifying as a creator who improves through reps.";
  }
}

function buildFastestWin(fastestImprovement) {
  switch (fastestImprovement) {
    case "getting-clicks":
      return "Getting people to click will give your videos more chances to prove themselves.";
    case "keeping-watch":
      return "Keeping people watching will make every view more valuable and reveal what your audience actually cares about.";
    case "publishing-enough":
      return "Publishing enough to learn will replace guessing with real channel feedback.";
    default:
      return "A tighter creator system will make the next few weeks clearer and more productive.";
  }
}

function buildNext72Hours(answers) {
  const firstAction = buildPrimaryAction(answers.priority, answers["time-budget"]);
  const blockerAction = buildBlockerAction(answers.blocker, answers.pain);

  return [
    `Today: ${firstAction}`,
    `Tonight: ${blockerAction}`,
    "Within 72 hours: lock in one repeatable creator standard and track the rep."
  ];
}

function buildWeekOneChecklist(answers) {
  const items = [];

  if (answers["time-budget"] === "5-minutes") {
    items.push("Protect a 5-minute creator rep every day.");
  } else if (answers["time-budget"] === "15-minutes") {
    items.push("Protect a 15-minute creator sprint every day.");
  } else {
    items.push("Protect a 30-minute+ production block every day.");
  }

  if (answers.pain === "analytics") {
    items.push("Check analytics once, write down one lesson, then close it.");
  }

  if (answers.pain === "algorithm") {
    items.push("Change one variable per upload so feedback becomes readable.");
  }

  if (answers.pain === "overthinking") {
    items.push("Publish the smallest finished version before adding more ideas.");
  }

  if (answers["fastest-improvement"] === "getting-clicks") {
    items.push("Write three title angles before choosing the video package.");
  } else if (answers["fastest-improvement"] === "keeping-watch") {
    items.push("Cut one boring section from every script or edit.");
  } else if (answers["fastest-improvement"] === "publishing-enough") {
    items.push("Track uploads completed, not ideas imagined.");
  }

  while (items.length < 3) {
    items.push("Review one creator lesson at the end of the day and tighten tomorrow's upload.");
  }

  return items.slice(0, 4);
}

function buildScore(status, blocker, pain, changeStyle, timeBudget) {
  const statusScore = Number(status);
  const base = Number.isFinite(statusScore) ? statusScore * 18 : 54;
  let adjustment = 0;

  if (pain === "analytics" || pain === "algorithm" || pain === "overthinking") {
    adjustment -= 8;
  }

  if (changeStyle === "small-habits" || changeStyle === "balanced-change") {
    adjustment += 8;
  }

  if (timeBudget === "15-minutes" || timeBudget === "30-plus-minutes") {
    adjustment += 6;
  }

  if (blocker === "inconsistent" || blocker === "unclear-direction" || blocker === "still-failing") {
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
  const focusTrack = buildFocusTrack(answers.priority, answers["fastest-improvement"]);
  const resetPhase = buildResetPhase(score);
  const coreProblem = buildCoreProblem(answers.blocker, answers.pain);
  const identityShift = buildIdentityShift(answers.priority);
  const fastestWin = buildFastestWin(answers["fastest-improvement"]);
  const next72Hours = buildNext72Hours(answers);
  const weekOneChecklist = buildWeekOneChecklist(answers);
  const headline = `${focusTrack}: ${score}/100`;
  const summary =
    score >= 60
      ? "You already have enough creator awareness to build momentum fast if you simplify and follow through."
      : "Your next breakthrough is going to come from removing friction and tightening your creator system, not trying harder.";

  return {
    score,
    statusScore: Number.isFinite(Number(answers.status)) ? Number(answers.status) : null,
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
    focusTrack,
    resetPhase,
    coreProblem,
    identityShift,
    fastestWin,
    next72Hours,
    weekOneChecklist,
    headline,
    summary,
    priorities: [biggestPriority, fastestImprovement].filter(Boolean),
    plan: [
      buildPrimaryAction(answers.priority, answers["time-budget"]),
      buildBlockerAction(answers.blocker, answers.pain),
      buildChangeAction(answers["change-style"], answers["fastest-improvement"])
    ]
  };
}
