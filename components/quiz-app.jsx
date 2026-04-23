"use client";

import { startTransition, useEffect, useState, useTransition } from "react";

import { quizSteps } from "@/lib/quiz-data";
import { buildLeadProfile } from "@/lib/quiz-logic";
import { Illustration, LeadHeroIllustration } from "@/components/illustrations";

const STORAGE_KEY = "zanesbestlife-quiz-state";
const ANSWER_STEP_IDS = quizSteps
  .filter((step) => step.kind !== "email")
  .map((step) => step.id);

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
  return (
    <button
      className={`answer-card${selected ? " is-selected" : ""}${scoreStyle ? " is-score-card" : ""}`}
      onClick={() => onSelect(option.id)}
      type="button"
    >
      <div className={`answer-art-frame${scoreStyle ? " is-score-frame" : ""}`}>
        <Illustration art={option.art} />
      </div>
      <span className={`answer-label${scoreStyle ? " is-score-label" : ""}`}>{option.label}</span>
    </button>
  );
}

function PillOption({ option, selected, onSelect }) {
  return (
    <button
      className={`pill-option${selected ? " is-selected" : ""}`}
      onClick={() => onSelect(option.id)}
      type="button"
    >
      {option.label}
    </button>
  );
}

function FinalStep({ email, onEmailChange, onSubmit, preview, error, isPending, website, onWebsiteChange }) {
  return (
    <section className="quiz-stage quiz-stage--email">
      <div className="question-meta">
        <span className="step-counter">8 of 8</span>
        <ProgressBar currentStep={7} />
      </div>

      <div className="email-layout">
        <div className="email-copy">
          <h1 className="question-title question-title--email">Save your reset plan for later</h1>
          <p className="question-subtext">
            We’ll send your score, your biggest priorities, what’s holding you back, and your
            custom-tailored plan to fix your life.
          </p>

          {preview ? (
            <div className="preview-chips">
              <span className="preview-chip">Score: {preview.score}</span>
              {preview.biggestPriority ? <span className="preview-chip">{preview.biggestPriority}</span> : null}
              {preview.blocker ? <span className="preview-chip">{preview.blocker}</span> : null}
              {preview.timeBudget ? <span className="preview-chip">{preview.timeBudget}</span> : null}
            </div>
          ) : null}
        </div>

        <div className="email-visual">
          <LeadHeroIllustration />
        </div>
      </div>

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

        <p className="privacy-note">We respect your privacy. No spam, ever.</p>
        {error ? <p className="form-error">{error}</p> : null}
      </form>
    </section>
  );
}

function SuccessState({ profile, email, onRestart }) {
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
            {email} is now tied to your quiz answers, priorities, blockers, and custom reset plan.
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
  const [isPending, startSubmitTransition] = useTransition();

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
    if (!hasLoaded || submittedProfile) {
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
  }, [answers, email, hasLoaded, stepIndex, submittedProfile]);

  const currentStep = quizSteps[stepIndex];
  const isEmailStep = currentStep.kind === "email";
  const isQuizComplete = ANSWER_STEP_IDS.every((id) => answers[id]);
  const previewProfile = isQuizComplete ? buildLeadProfile(answers) : null;

  const cardOptions = currentStep.options?.filter((option) => option.emphasis !== "pill") || [];
  const pillOptions = currentStep.options?.filter((option) => option.emphasis === "pill") || [];

  function handleSelect(optionId) {
    setError("");

    startTransition(() => {
      setAnswers((previous) => ({
        ...previous,
        [currentStep.id]: optionId
      }));

      setStepIndex((previous) => Math.min(previous + 1, quizSteps.length - 1));
    });
  }

  function handleBack() {
    if (submittedProfile || stepIndex === 0) {
      return;
    }

    setError("");

    startTransition(() => {
      setStepIndex((previous) => Math.max(previous - 1, 0));
    });
  }

  function handleRestart() {
    setAnswers({});
    setStepIndex(0);
    setEmail("");
    setWebsite("");
    setError("");
    setSubmittedProfile(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isQuizComplete) {
      setError("Please finish the quiz before saving your reset plan.");
      return;
    }

    setError("");

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

        setSubmittedProfile(result.profile);
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
        <div className="brand-mark">ZANESBESTLIFE</div>
      </header>

      <main className="page-shell">
        {submittedProfile ? (
          <SuccessState email={email} onRestart={handleRestart} profile={submittedProfile} />
        ) : isEmailStep ? (
          <>
            {stepIndex > 0 ? (
              <button className="back-button" onClick={handleBack} type="button">
                Back
              </button>
            ) : null}
            <FinalStep
              email={email}
              error={error}
              isPending={isPending}
              onEmailChange={setEmail}
              onSubmit={handleSubmit}
              onWebsiteChange={setWebsite}
              preview={previewProfile}
              website={website}
            />
          </>
        ) : (
          <section className="quiz-stage">
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
                "--grid-columns": currentStep.columns || 3
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
