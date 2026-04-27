export const quizSteps = [
  {
    id: "priority",
    stepNumber: 1,
    totalSteps: 8,
    question: "What is your biggest priority right now?",
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 320,
    cardMinHeightMobile: 170,
    artMinHeight: 220,
    artMinHeightMobile: 84,
    options: [
      {
        id: "money",
        label: "Money",
        imageFit: "contain",
        imageClass: "priority-product priority-product--money",
        imageSrc: "/quiz-assets/art/priority-money-new.png"
      },
      {
        id: "fitness",
        label: "Fitness",
        imageFit: "contain",
        imageClass: "priority-product priority-product--fitness",
        imageSrc: "/quiz-assets/art/priority-fitness-new.png"
      },
      {
        id: "social",
        label: "Social",
        imageFit: "cover",
        imageClass: "priority-photo priority-photo--social",
        imageSrc: "/quiz-assets/art/priority-social.png"
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
      { id: "5", label: "5", imageSrc: "/quiz-assets/art/status-5.png" },
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
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 320,
    cardMinHeightMobile: 164,
    artMinHeight: 220,
    artMinHeightMobile: 92,
    options: [
      { id: "quitting", label: "I keep quitting", imageSrc: "/quiz-assets/art/blocker-quitting.png" },
      {
        id: "no-main-thing",
        label: "I don’t have one main thing",
        imageSrc: "/quiz-assets/art/blocker-no-main-thing.png"
      },
      {
        id: "too-much",
        label: "I’m trying to do too much",
        imageSrc: "/quiz-assets/art/blocker-too-much.png"
      }
    ]
  },
  {
    id: "pain",
    stepNumber: 4,
    totalSteps: 8,
    question: "What is hurting you the most right now?",
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 340,
    cardMinHeightMobile: 170,
    artMinHeight: 240,
    artMinHeightMobile: 100,
    options: [
      { id: "screens", label: "Screens", imageSrc: "/quiz-assets/art/screens.png" },
      { id: "junk-food", label: "Junk food", imageSrc: "/quiz-assets/art/junk-food.png" },
      {
        id: "lack-of-motivation",
        label: "Lack of motivation",
        imageSrc: "/quiz-assets/art/motivation.png"
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
    question: "What would improve your life the fastest right now?",
    columns: 3,
    mobileColumns: 3,
    cardMinHeight: 340,
    cardMinHeightMobile: 170,
    artMinHeight: 240,
    artMinHeightMobile: 100,
    options: [
      {
        id: "building-self-confidence",
        label: "Building self confidence",
        imageClass: "feature-art",
        imageSrc: "/quiz-assets/art/building-self-confidence.png"
      },
      {
        id: "fixing-discipline",
        label: "Fixing my discipline",
        imageClass: "feature-art",
        imageSrc: "/quiz-assets/art/fast-discipline-clean.png"
      },
      {
        id: "choosing-one-focus",
        label: "Choosing one main focus",
        imageClass: "feature-art",
        imageSrc: "/quiz-assets/art/fast-focus.png"
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
