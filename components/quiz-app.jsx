"use client";

import { startTransition, useEffect, useRef, useState, useTransition } from "react";
import { track } from "@vercel/analytics";

import { quizSteps } from "@/lib/quiz-data";
import { Illustration } from "@/components/illustrations";

const STORAGE_KEY = "zanesbestlife-quiz-state";
const ANSWER_STEP_IDS = quizSteps
  .filter((step) => step.kind !== "email")
  .map((step) => step.id);
const FINAL_ANSWER_STEP_ID = ANSWER_STEP_IDS[ANSWER_STEP_IDS.length - 1];
const PROCESSING_DELAY_MS = 1200;

function getStoredState() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function ProgressBar({ currentStep }) {
  return (
    <div className="progress-bar" aria-hidden="true">
      {quizSteps.map((step, index) => {
        const isActive = index <= currentStep;
        return <span key={step.id} className={`progress-segment${isActive ? " is-active" : ""}`} />;
      })}
    </div>
  );
}

function AnswerCard({ option, selected, onSelect, scoreStyle = false }) {
  const hasImage = Boolean(option.imageSrc);
  const imageFitClass = option.imageFit === "cover" ? " fit-cover" : " fit-contain";
  const imageClass = option.imageClass ? ` ${option.imageClass}` : "";

  return (
    <button
      aria-pressed={selected}
      className={`answer-card${scoreStyle ? " is-score-card" : ""}${hasImage ? " has-image" : ""}${imageFitClass}`}
      onClick={() => onSelect(option.id)}
      type="button"
    >
      <div className="answer-art-frame">
        {hasImage ? (
          <img
            alt=""
            aria-hidden="true"
            className={`answer-image${imageClass}`}
            loading="eager"
            src={option.imageSrc}
          />
        ) : (
          <Illustration art={option.art} />
        )}
      </div>
      <span className={`answer-label${scoreStyle ? " is-score-label" : ""}`}>{option.label}</span>
    </button>
  );
}

function PillOption({ option, selected, onSelect }) {
  return (
    <button
      aria-pressed={selected}
      className="pill-option"
      onClick={() => onSelect(option.id)}
      type="button"
    >
      {option.label}
    </button>
  );
}

function FinalStep({
  email,
  onEmailChange,
  onRestart,
  onSubmit,
  error,
  isPending,
  website,
  onWebsiteChange
}) {
  return (
    <section className="quiz-stage quiz-stage--email" key="lead-capture">
      <img
        alt=""
        aria-hidden="true"
        className="email-background-image"
        loading="eager"
        src="/quiz-assets/art/final-email-background.png"
      />

      <div className="question-meta">
        <button className="restart-quiz-button" onClick={onRestart} type="button">
          Restart quiz
        </button>
        <div className="question-meta-center">
          <span className="step-counter">8 of 8</span>
          <ProgressBar currentStep={7} />
        </div>
        <span />
      </div>

      <h1 className="question-title question-title--email">We&rsquo;ll Email You Your Results</h1>
      <p className="question-subtext question-subtext--email">
        Enter your email to get your personalized plan.
      </p>

      <form className="lead-form" onSubmit={onSubmit}>
        <label className="field-label" htmlFor="email">
          Email address
        </label>
        <div className="input-row">
          <input
            autoComplete="email"
            className="email-input"
            id="email"
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="Enter your email address"
            required
            type="email"
            value={email}
          />
          <button className="primary-button" disabled={isPending} type="submit">
            {isPending ? "Saving..." : "Get My Plan"}
          </button>
        </div>

        <input
          aria-hidden="true"
          autoComplete="off"
          className="honeypot"
          onChange={(event) => onWebsiteChange(event.target.value)}
          tabIndex={-1}
          type="text"
          value={website}
        />

        <p className="privacy-note">
          <span className="privacy-lock" aria-hidden="true" />
          We respect your privacy. No spam, ever.
        </p>
        {error ? <p className="form-error">{error}</p> : null}
      </form>
    </section>
  );
}

function ProcessingStep() {
  return (
    <section className="quiz-stage quiz-stage--processing" key="processing">
      <div className="question-meta">
        <span />
        <div className="question-meta-center">
          <span className="step-counter">Preparing your plan</span>
          <ProgressBar currentStep={6} />
        </div>
        <span />
      </div>

      <div className="processing-shell" aria-live="polite" role="status">
        <span className="processing-spinner" aria-hidden="true" />
        <h1 className="question-title question-title--processing">Building your personalized plan</h1>
        <p className="question-subtext question-subtext--processing">
          Analyzing your answers and getting your results ready.
        </p>
      </div>
    </section>
  );
}

function SuccessState({ profile, email, emailDelivery, onRestart }) {
  return (
    <section className="quiz-stage quiz-stage--success">
      <div className="question-meta">
        <span className="step-counter">Saved</span>
      </div>

      <div className="success-shell">
        <div className="success-score">
          <span className="success-score-label">Reset score</span>
          <strong>{profile.score}</strong>
          <span>{profile.scoreLabel}</span>
        </div>

        <div className="success-copy">
          <h1 className="question-title question-title--success">Your reset plan is saved.</h1>
          <p className="question-subtext">
            {emailDelivery?.ok
              ? `Your full report was emailed to ${email}.`
              : `${email} is now tied to your quiz answers, priorities, blockers, and custom reset plan.`}
          </p>

          <div className="success-panels">
            <div className="success-panel">
              <span className="success-panel-label">Biggest priorities</span>
              <strong>{profile.priorities.filter(Boolean).join(" + ")}</strong>
            </div>
            <div className="success-panel">
              <span className="success-panel-label">Main blocker</span>
              <strong>{profile.blocker || "Needs more data"}</strong>
            </div>
          </div>

          <div className="plan-list">
            {profile.plan.map((item) => (
              <div className="plan-item" key={item}>
                <span className="plan-bullet" />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <button className="secondary-button" onClick={onRestart} type="button">
            Take the quiz again
          </button>
        </div>
      </div>
    </section>
  );
}

export function QuizApp() {
  const [answers, setAnswers] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [submittedProfile, setSubmittedProfile] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isProcessingFinal, setIsProcessingFinal] = useState(false);
  const [isPending, startSubmitTransition] = useTransition();
  const processingTimeoutRef = useRef(null);

  useEffect(() => {
    const stored = getStoredState();

    if (stored) {
      setAnswers(stored.answers || {});
      setStepIndex(
        Number.isInteger(stored.stepIndex)
          ? Math.min(Math.max(stored.stepIndex, 0), quizSteps.length - 1)
          : 0
      );
      setEmail(stored.email || "");
    }

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) {
        window.clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasLoaded || submittedProfile || isProcessingFinal) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        answers,
        email,
        stepIndex
      })
    );
  }, [answers, email, hasLoaded, isProcessingFinal, stepIndex, submittedProfile]);

  const currentStep = quizSteps[stepIndex];
  const isEmailStep = currentStep.kind === "email";
  const isQuizComplete = ANSWER_STEP_IDS.every((id) => answers[id]);

  const cardOptions = currentStep.options?.filter((option) => option.emphasis !== "pill") || [];
  const pillOptions = currentStep.options?.filter((option) => option.emphasis === "pill") || [];

  useEffect(() => {
    if (!hasLoaded || submittedProfile || isProcessingFinal) {
      return;
    }

    track("Quiz Step Viewed", {
      step: currentStep.stepNumber,
      stepId: currentStep.id
    });
  }, [currentStep.id, currentStep.stepNumber, hasLoaded, isProcessingFinal, submittedProfile]);

  function handleSelect(optionId) {
    if (isProcessingFinal) {
      return;
    }

    setError("");
    track("Quiz Answer Selected", {
      optionId,
      step: currentStep.stepNumber,
      stepId: currentStep.id
    });

    const isFinalAnswerStep = currentStep.id === FINAL_ANSWER_STEP_ID;

    startTransition(() => {
      setAnswers((previous) => ({
        ...previous,
        [currentStep.id]: optionId
      }));

      if (!isFinalAnswerStep) {
        setStepIndex((previous) => Math.min(previous + 1, quizSteps.length - 1));
      }
    });

    if (isFinalAnswerStep) {
      setIsProcessingFinal(true);

      if (processingTimeoutRef.current) {
        window.clearTimeout(processingTimeoutRef.current);
      }

      processingTimeoutRef.current = window.setTimeout(() => {
        startTransition(() => {
          setStepIndex((previous) => Math.min(previous + 1, quizSteps.length - 1));
          setIsProcessingFinal(false);
        });
        processingTimeoutRef.current = null;
      }, PROCESSING_DELAY_MS);
    }
  }

  function handleBack() {
    if (submittedProfile || isProcessingFinal || stepIndex === 0) {
      return;
    }

    setError("");

    startTransition(() => {
      setStepIndex((previous) => Math.max(previous - 1, 0));
    });
  }

  function handleRestart() {
    if (processingTimeoutRef.current) {
      window.clearTimeout(processingTimeoutRef.current);
      processingTimeoutRef.current = null;
    }

    setAnswers({});
    setStepIndex(0);
    setEmail("");
    setWebsite("");
    setError("");
    setSubmittedProfile(null);
    setIsProcessingFinal(false);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isQuizComplete) {
      setError("Please finish the quiz before saving your reset plan.");
      return;
    }

    setError("");
    track("Lead Form Submitted", {
      completedSteps: ANSWER_STEP_IDS.length
    });

    startSubmitTransition(async () => {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            answers,
            website
          })
        });

        const result = await response.json();

        if (!response.ok || !result.ok) {
          throw new Error(result.error || "Unable to save your reset plan.");
        }

        setSubmittedProfile({
          ...result.profile,
          emailDelivery: result.emailDelivery
        });
        track("Lead Saved", {
          emailSent: Boolean(result.emailDelivery?.ok),
          storageMode: result.storage?.mode || "unknown"
        });
        window.localStorage.removeItem(STORAGE_KEY);
      } catch (submissionError) {
        setError(
          submissionError instanceof Error
            ? submissionError.message
            : "Unable to save your reset plan."
        );
      }
    });
  }

  return (
    <div className="site-shell">
      <header className="brand-bar">
        <div className="brand-mark">zanesbestlife</div>
      </header>

      <main className="page-shell">
        {submittedProfile ? (
          <SuccessState
            email={email}
            emailDelivery={submittedProfile.emailDelivery}
            onRestart={handleRestart}
            profile={submittedProfile}
          />
        ) : isProcessingFinal ? (
          <ProcessingStep />
        ) : isEmailStep ? (
          <FinalStep
            email={email}
            error={error}
            isPending={isPending}
            onEmailChange={setEmail}
            onRestart={handleRestart}
            onSubmit={handleSubmit}
            onWebsiteChange={setWebsite}
            website={website}
          />
        ) : (
          <section className="quiz-stage" key={currentStep.id}>
            <div className="question-meta">
              {stepIndex > 0 ? (
                <button className="back-button" onClick={handleBack} type="button">
                  Back
                </button>
              ) : (
                <span />
              )}
              <div className="question-meta-center">
                <span className="step-counter">
                  {currentStep.stepNumber} of {currentStep.totalSteps}
                </span>
                <ProgressBar currentStep={stepIndex} />
              </div>
              <span />
            </div>

            <h1 className="question-title">{currentStep.question}</h1>

            <div
              className="answer-grid"
              style={{
                "--grid-columns": currentStep.columns || 3,
                "--grid-columns-mobile": currentStep.mobileColumns || 2,
                "--card-min-height": `${currentStep.cardMinHeight || (currentStep.cardStyle === "score" ? 300 : 360)}px`,
                "--card-min-height-mobile": `${currentStep.cardMinHeightMobile || 170}px`,
                "--art-min-height": `${currentStep.artMinHeight || (currentStep.cardStyle === "score" ? 190 : 240)}px`,
                "--art-min-height-mobile": `${currentStep.artMinHeightMobile || 96}px`
              }}
            >
              {cardOptions.map((option) => (
                <AnswerCard
                  key={option.id}
                  onSelect={handleSelect}
                  option={option}
                  scoreStyle={currentStep.cardStyle === "score"}
                  selected={answers[currentStep.id] === option.id}
                />
              ))}
            </div>

            {pillOptions.length ? (
              <div className="pill-option-row">
                {pillOptions.map((option) => (
                  <PillOption
                    key={option.id}
                    onSelect={handleSelect}
                    option={option}
                    selected={answers[currentStep.id] === option.id}
                  />
                ))}
              </div>
            ) : null}
          </section>
        )}
      </main>
    </div>
  );
}
