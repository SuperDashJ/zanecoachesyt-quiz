export const quizSteps = [
  {
    id: "priority",
    stepNumber: 1,
    totalSteps: 8,
    question: "What is your biggest YouTube goal right now?",
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 320,
    cardMinHeightMobile: 170,
    artMinHeight: 220,
    artMinHeightMobile: 84,
    options: [
      {
        id: "unlocking-monetization",
        label: "Unlocking monetization",
        imageFit: "contain",
        imageClass: "priority-product",
        imageSrc: "/quiz-assets/art/creator-unlock.png"
      },
      {
        id: "making-money",
        label: "Making money from content",
        imageFit: "contain",
        imageClass: "priority-product",
        imageSrc: "/quiz-assets/art/creator-revenue.png"
      },
      {
        id: "growing-income",
        label: "Growing creator income",
        imageFit: "contain",
        imageClass: "priority-product",
        imageSrc: "/quiz-assets/art/creator-money.png"
      }
    ]
  },
  {
    id: "status",
    stepNumber: 2,
    totalSteps: 8,
    question: "How well are you doing right now?",
    columns: 5,
    mobileColumns: 3,
    cardMinHeight: 280,
    cardMinHeightMobile: 150,
    artMinHeight: 210,
    artMinHeightMobile: 84,
    cardStyle: "score",
    options: [
      { id: "1", label: "1", imageSrc: "/quiz-assets/art/status-1.png" },
      { id: "2", label: "2", imageSrc: "/quiz-assets/art/status-2.png" },
      { id: "3", label: "3", imageSrc: "/quiz-assets/art/status-3.png" },
      { id: "4", label: "4", imageSrc: "/quiz-assets/art/status-4.png" },
      { id: "5", label: "5", imageSrc: "/quiz-assets/art/status-5.png" }
    ]
  },
  {
    id: "blocker",
    stepNumber: 3,
    totalSteps: 8,
    question: "What is screwing you up the most?",
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 320,
    cardMinHeightMobile: 164,
    artMinHeight: 220,
    artMinHeightMobile: 92,
    options: [
      {
        id: "inconsistent",
        label: "I'm not consistent",
        imageSrc: "/quiz-assets/art/blocker-quitting.png"
      },
      {
        id: "unclear-direction",
        label: "I don't have a clear content direction",
        imageSrc: "/quiz-assets/art/blocker-no-main-thing.png"
      },
      {
        id: "still-failing",
        label: "I'm doing a lot but still failing",
        imageSrc: "/quiz-assets/art/blocker-too-much.png"
      }
    ]
  },
  {
    id: "pain",
    stepNumber: 4,
    totalSteps: 8,
    question: "What is hurting your channel the most right now?",
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 340,
    cardMinHeightMobile: 170,
    artMinHeight: 240,
    artMinHeightMobile: 100,
    options: [
      {
        id: "analytics",
        label: "I spend too much time on analytics.",
        imageFit: "contain",
        imageSrc: "/quiz-assets/art/creator-analytics.png"
      },
      {
        id: "algorithm",
        label: "I feel like the algorithm is against me.",
        imageFit: "contain",
        imageSrc: "/quiz-assets/art/creator-algorithm.png"
      },
      {
        id: "overthinking",
        label: "I overthink and don't post enough.",
        imageFit: "contain",
        imageSrc: "/quiz-assets/art/creator-overthinking.png"
      }
    ]
  },
  {
    id: "change-style",
    stepNumber: 5,
    totalSteps: 8,
    question: "What kind of change would you actually follow?",
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 320,
    cardMinHeightMobile: 170,
    artMinHeight: 220,
    artMinHeightMobile: 96,
    options: [
      { id: "huge-reset", label: "Huge reset", imageSrc: "/quiz-assets/art/change-huge-reset.png" },
      { id: "small-habits", label: "Small habits", imageSrc: "/quiz-assets/art/change-small-habits.png" },
      { id: "balanced-change", label: "Balanced change", imageSrc: "/quiz-assets/art/change-balanced.png" }
    ]
  },
  {
    id: "time-budget",
    stepNumber: 6,
    totalSteps: 8,
    question: "How much can you do each day?",
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 310,
    cardMinHeightMobile: 166,
    artMinHeight: 210,
    artMinHeightMobile: 92,
    options: [
      { id: "5-minutes", label: "5 minutes", imageSrc: "/quiz-assets/art/time-5.png" },
      { id: "15-minutes", label: "15 minutes", imageSrc: "/quiz-assets/art/time-15.png" },
      { id: "30-plus-minutes", label: "30+ minutes", imageSrc: "/quiz-assets/art/time-30.png" }
    ]
  },
  {
    id: "fastest-improvement",
    stepNumber: 7,
    totalSteps: 8,
    question: "What would improve your channel the fastest right now?",
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 340,
    cardMinHeightMobile: 170,
    artMinHeight: 240,
    artMinHeightMobile: 100,
    options: [
      {
        id: "getting-clicks",
        label: "Getting people to click",
        imageClass: "feature-art",
        imageSrc: "/quiz-assets/art/creator-clicks.png"
      },
      {
        id: "keeping-watch",
        label: "Keeping people watching",
        imageClass: "feature-art",
        imageSrc: "/quiz-assets/art/creator-retention.png"
      },
      {
        id: "publishing-enough",
        label: "Publishing enough to learn",
        imageClass: "feature-art",
        imageSrc: "/quiz-assets/art/creator-publishing.png"
      }
    ]
  },
  {
    id: "lead-capture",
    stepNumber: 8,
    totalSteps: 8,
    kind: "email",
    question: "We Will Email You Your Results",
    subtext:
      "We'll send your score, your biggest priorities, what's holding you back, and your custom-tailored plan to grow your channel."
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
