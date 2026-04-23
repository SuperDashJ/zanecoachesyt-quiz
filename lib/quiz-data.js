export const quizSteps = [
  {
    id: "priority",
    stepNumber: 1,
    totalSteps: 8,
    question: "What is your biggest priority right now?",
    columns: 3,
    options: [
      { id: "money", label: "Money", art: "money-scene" },
      { id: "fitness", label: "Fitness", art: "fitness-scene" },
      { id: "social", label: "Social", art: "social-scene" }
    ]
  },
  {
    id: "status",
    stepNumber: 2,
    totalSteps: 8,
    question: "How well are you doing right now?",
    columns: 5,
    cardStyle: "score",
    options: [
      { id: "1", label: "1", art: "face-1" },
      { id: "2", label: "2", art: "face-2" },
      { id: "3", label: "3", art: "face-3" },
      { id: "4", label: "4", art: "face-4" },
      { id: "5", label: "5", art: "face-5" },
      {
        id: "skip",
        label: "I’m not sure. Let’s skip it.",
        art: "question-mark",
        emphasis: "pill"
      }
    ]
  },
  {
    id: "blocker",
    stepNumber: 3,
    totalSteps: 8,
    question: "What is screwing you up the most?",
    columns: 5,
    options: [
      { id: "screen", label: "Screen", art: "screens" },
      { id: "quitting", label: "I keep quitting", art: "quit-cloud" },
      {
        id: "no-main-thing",
        label: "I don’t have one main thing",
        art: "question-focus"
      },
      {
        id: "too-much",
        label: "I’m trying to do too much",
        art: "too-much"
      },
      { id: "no-preference", label: "No preference", art: "neutral-dot" }
    ]
  },
  {
    id: "pain",
    stepNumber: 4,
    totalSteps: 8,
    question: "What is hurting you the most right now?",
    columns: 3,
    options: [
      { id: "screens", label: "Screens", art: "screens" },
      { id: "junk-food", label: "Junk food", art: "junk-food" },
      {
        id: "lack-of-motivation",
        label: "Lack of motivation",
        art: "motivation"
      }
    ]
  },
  {
    id: "change-style",
    stepNumber: 5,
    totalSteps: 8,
    question: "What kind of change would you actually follow?",
    columns: 3,
    options: [
      { id: "huge-reset", label: "Huge reset", art: "mountain-flag" },
      { id: "small-habits", label: "Small habits", art: "target" },
      { id: "balanced-change", label: "Balanced change", art: "balance" }
    ]
  },
  {
    id: "time-budget",
    stepNumber: 6,
    totalSteps: 8,
    question: "How much can you do each day?",
    columns: 4,
    options: [
      { id: "5-minutes", label: "5 minutes", art: "stopwatch" },
      { id: "15-minutes", label: "15 minutes", art: "clock" },
      { id: "30-plus-minutes", label: "30+ minutes", art: "dumbbell" },
      {
        id: "skip",
        label: "I’m not sure. Let’s skip it.",
        art: "question-mark"
      }
    ]
  },
  {
    id: "fastest-improvement",
    stepNumber: 7,
    totalSteps: 8,
    question: "What would improve your life the fastest right now?",
    columns: 4,
    options: [
      {
        id: "making-more-money",
        label: "Making more money",
        art: "money-growth"
      },
      {
        id: "better-shape-social-skills",
        label: "Being in better shape, better social skills",
        art: "better-shape"
      },
      {
        id: "fixing-discipline",
        label: "Fixing my discipline",
        art: "discipline"
      },
      {
        id: "choosing-one-focus",
        label: "Choosing one main focus",
        art: "single-focus"
      }
    ]
  },
  {
    id: "lead-capture",
    stepNumber: 8,
    totalSteps: 8,
    kind: "email",
    question: "Save your reset plan for later",
    subtext:
      "We’ll send your score, your biggest priorities, what’s holding you back, and your custom-tailored plan to fix your life."
  }
];

export const quizStepMap = Object.fromEntries(
  quizSteps.map((step) => [step.id, step])
);

export function getAnswerLabel(stepId, optionId) {
  const step = quizStepMap[stepId];

  if (!step || !step.options) {
    return "";
  }

  return step.options.find((option) => option.id === optionId)?.label ?? "";
}
