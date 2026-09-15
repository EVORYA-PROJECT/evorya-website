"use client";

import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useProjectMatch } from "@/lib/project-match/context";
import {
  MATCHER_QUESTIONS,
  computeRecommendation,
  summarizeAnswers,
  type MatcherAnswers,
  type MatcherOfferId,
} from "@/lib/project-match/data";
import type { OfferRow } from "@/lib/cms/types";

type Phase = "idle" | "quiz" | "result";

const JUSTIFICATIONS: Record<MatcherOfferId, string> = {
  essentiel:
    "Votre projet reste simple et direct : Essentiel offre une présence digitale professionnelle, sans complexité inutile.",
  signature:
    "Votre projet demande davantage de personnalisation et de travail sur l'expérience. Signature semble être le meilleur point de départ.",
  "sur-mesure":
    "Votre projet a des besoins spécifiques et une architecture particulière : Sur Mesure permet de construire une expérience entièrement adaptée.",
};

const optionButtonClass =
  "flex min-h-[52px] w-full items-center justify-between gap-4 border border-line px-5 py-3 text-left text-sm text-paper-dim transition-colors hover:border-paper aria-pressed:border-paper aria-pressed:bg-paper/[0.06] aria-pressed:text-paper";

export default function ProjectMatcher({
  offers,
  heading,
  ctaLabel,
}: {
  offers: OfferRow[];
  heading: string;
  ctaLabel: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<MatcherAnswers>({});
  const { selectOffer } = useProjectMatch();

  const total = MATCHER_QUESTIONS.length;
  const question = MATCHER_QUESTIONS[stepIndex];
  const recommendedId = computeRecommendation(answers);
  const recommendedOffer = offers.find((o) => o.id === recommendedId) ?? offers[0];

  function handleStart() {
    setAnswers({});
    setStepIndex(0);
    setPhase("quiz");
  }

  function handleSelectOption(optionIndex: number) {
    const nextAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(nextAnswers);
    if (stepIndex >= total - 1) {
      setPhase("result");
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function handleBack() {
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function handleModifyAnswers() {
    setStepIndex(total - 1);
    setPhase("quiz");
  }

  function handleReset() {
    setAnswers({});
    setStepIndex(0);
    setPhase("quiz");
  }

  function handleGoToContact() {
    const summary = summarizeAnswers(answers);
    const prefillMessage =
      summary.length > 0
        ? `Configuration Project Matcher :\n${summary.map((line) => `- ${line}`).join("\n")}`
        : undefined;
    selectOffer(recommendedId, prefillMessage);
  }

  function handleViewOfferDetail() {
    selectOffer(recommendedId);
  }

  if (!recommendedOffer) return null;

  return (
    <div className="relative z-10 border border-line-strong p-7 sm:p-8">
      {phase === "idle" && (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div>
            <h3 className="text-lg font-medium text-paper sm:text-xl">{heading}</h3>
            <p className="mt-2 text-sm text-mist-dim">
              5 questions rapides, aucune donnée enregistrée — juste une recommandation indicative.
            </p>
          </div>
          <MagneticButton
            as="button"
            onClick={handleStart}
            className="inline-flex h-14 shrink-0 items-center justify-center bg-paper px-8 font-display text-xs uppercase tracking-[0.25em] text-ink"
          >
            {ctaLabel}
          </MagneticButton>
        </div>
      )}

      {phase === "quiz" && question && (
        <div>
          <div className="flex items-center justify-between">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
              {String(stepIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="font-display text-[11px] uppercase tracking-[0.2em] text-mist-dim transition-colors hover:text-paper"
              >
                ← Retour
              </button>
            )}
          </div>

          <div className="mt-4 h-1 w-full overflow-hidden border border-line-strong">
            <div
              className="h-full bg-paper transition-[width] duration-500 ease-out"
              style={{ width: `${(stepIndex / total) * 100}%` }}
            />
          </div>

          <h3 className="mt-6 text-lg font-medium text-paper sm:text-xl">{question.question}</h3>

          <div className="mt-6 flex flex-col gap-3">
            {question.options.map((option, i) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={answers[question.id] === i}
                onClick={() => handleSelectOption(i)}
                className={optionButtonClass}
              >
                {option.label}
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "result" && (
        <div>
          <span className="font-display text-xs uppercase tracking-[0.25em] text-mist-dim">
            Offre recommandée
          </span>
          <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.1em] text-paper sm:text-3xl">
            {recommendedOffer.name}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-mist">
            {JUSTIFICATIONS[recommendedId]}
          </p>

          <div className="mt-6 flex items-baseline gap-2 font-display text-paper">
            <span className="text-2xl">{recommendedOffer.price}</span>
            {recommendedOffer.price_note && (
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-mist-dim">
                {recommendedOffer.price_note}
              </span>
            )}
          </div>

          <ul className="mt-4 space-y-2">
            {recommendedOffer.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-paper-dim/90">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mist" />
                {feature}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs leading-relaxed text-mist-dim">
            Recommandation indicative. Le périmètre final est confirmé ensemble avant le démarrage
            du projet.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticButton
              as="a"
              href="#contact"
              onClick={handleGoToContact}
              className="inline-flex h-14 items-center justify-center bg-paper px-8 font-display text-xs uppercase tracking-[0.25em] text-ink sm:w-auto"
            >
              Démarrer ce projet
            </MagneticButton>
            <a
              href="#offres"
              onClick={handleViewOfferDetail}
              className="inline-flex h-11 items-center font-display text-[11px] uppercase tracking-[0.2em] text-mist underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
            >
              Voir l&rsquo;offre en détail
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5">
            <button
              type="button"
              onClick={handleModifyAnswers}
              className="font-display text-[11px] uppercase tracking-[0.2em] text-mist-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
            >
              Modifier mes réponses
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="font-display text-[11px] uppercase tracking-[0.2em] text-mist-dim underline decoration-line-strong underline-offset-4 transition-colors hover:text-paper hover:decoration-paper"
            >
              Recommencer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
