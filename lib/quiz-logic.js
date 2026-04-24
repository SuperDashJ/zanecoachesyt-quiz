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

  if (fastestImprovement === "building-self-confidence") {
    return "Confidence builds fastest through visible proof. Keep one daily promise, track the win, and let evidence replace overthinking.";
  }

  return "Aim for balanced consistency instead of random intensity so the plan still works next week, not just tonight.";
}

function buildFocusTrack(priority, fastestImprovement) {
  if (priority === "money") {
    return "Money track";
  }

  if (priority === "fitness" || fastestImprovement === "building-self-confidence") {
    return "Body and confidence track";
  }

  if (priority === "social") {
    return "Social momentum track";
  }

  if (fastestImprovement === "fixing-discipline") {
    return "Discipline track";
  }

  return "Focused reset track";
}

function buildCoreProblem(blocker, pain) {
  if (blocker === "screen" || pain === "screens") {
    return "Your attention is being drained before your real priorities ever get a chance.";
  }

  if (blocker === "quitting") {
    return "You are likely relying on bursts of motivation instead of a system you can actually repeat.";
  }

  if (blocker === "no-main-thing") {
    return "Your effort is scattered, which makes progress feel smaller than it really should.";
  }

  if (blocker === "too-much") {
    return "You are trying to improve everything at once, which is killing momentum.";
  }

  if (pain === "junk-food") {
    return "Your environment is set up for quick dopamine, not high energy.";
  }

  if (pain === "lack-of-motivation") {
    return "Low energy and friction are making discipline feel harder than it needs to be.";
  }

  return "Your plan needs more clarity and less friction.";
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
    case "money":
      return "Start seeing yourself as someone who creates value daily instead of waiting for motivation to appear.";
    case "fitness":
      return "Start acting like someone who trains, recovers, and eats on purpose rather than by accident.";
    case "social":
      return "Start identifying as someone who initiates instead of overthinking every interaction.";
    default:
      return "Start identifying as someone who follows through on one meaningful promise each day.";
  }
}

function buildFastestWin(fastestImprovement) {
  switch (fastestImprovement) {
    case "building-self-confidence":
      return "Building self confidence will create fast spillover into energy, standards, posture, and follow-through.";
    case "fixing-discipline":
      return "Discipline is your force multiplier. Once that tightens up, every other area gets easier.";
    case "choosing-one-focus":
      return "Choosing one main focus will stop the leak in your effort and create faster momentum.";
    default:
      return "A tighter system will make the next few weeks feel lighter and more productive.";
  }
}

function buildNext72Hours(answers) {
  const firstAction = buildPrimaryAction(answers.priority, answers["time-budget"]);
  const blockerAction = buildBlockerAction(answers.blocker, answers.pain);

  return [
    `Today: ${firstAction}`,
    `Tonight: ${blockerAction}`,
    "Within 72 hours: lock in one repeatable daily standard and track it with a visible checkmark."
  ];
}

function buildWeekOneChecklist(answers) {
  const items = [];

  if (answers["time-budget"] === "5-minutes") {
    items.push("Protect a 5-minute non-negotiable block every day.");
  } else if (answers["time-budget"] === "15-minutes") {
    items.push("Protect a 15-minute deep-focus block every day.");
  } else {
    items.push("Protect a 30-minute+ performance block every day.");
  }

  if (answers.blocker === "screen" || answers.pain === "screens") {
    items.push("Move your phone out of the room for one key block each day.");
  }

  if (answers.pain === "junk-food") {
    items.push("Pre-decide one default meal or snack so you stop improvising under stress.");
  }

  if (answers["fastest-improvement"] === "building-self-confidence") {
    items.push("Keep one visible promise every day so confidence has proof to build from.");
  } else if (answers["fastest-improvement"] === "fixing-discipline") {
    items.push("Use one visible tracker and do not let two misses happen in a row.");
  } else if (answers["fastest-improvement"] === "choosing-one-focus") {
    items.push("Write down your one main focus and cut one distracting side goal.");
  }

  while (items.length < 3) {
    items.push("Review your progress at the end of the day and tighten tomorrow's plan.");
  }

  return items.slice(0, 4);
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
      ? "You already have enough self-awareness to build momentum fast if you simplify and follow through."
      : "Your next breakthrough is going to come from removing friction and tightening your system, not trying harder.";

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
