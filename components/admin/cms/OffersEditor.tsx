"use client";

import { useState } from "react";
import SectionEditorShell from "@/components/admin/cms/SectionEditorShell";
import { fieldInputClass, fieldLabelClass } from "@/components/admin/cms/shared";
import { saveOffer, type OfferSaveInput } from "@/lib/cms/actions";
import type { OfferRow } from "@/lib/cms/types";
import type { SaveState } from "@/components/admin/cms/useSectionEditor";

type OfferState = OfferRow & { dirty: boolean };

export default function OffersEditor({ initial }: { initial: OfferRow[] }) {
  const [offers, setOffers] = useState<OfferState[]>(initial.map((o) => ({ ...o, dirty: false })));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dirty = offers.some((o) => o.dirty);

  function patchOffer(id: string, patch: Partial<OfferRow>) {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch, dirty: true } : o)));
    setSaveState("idle");
  }

  function updateFeature(id: string, i: number, value: string) {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, dirty: true, features: o.features.map((f, idx) => (idx === i ? value : f)) }
          : o,
      ),
    );
    setSaveState("idle");
  }

  function addFeature(id: string) {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, dirty: true, features: [...o.features, "Nouvelle fonctionnalité"] } : o,
      ),
    );
    setSaveState("idle");
  }

  function removeFeature(id: string, i: number) {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, dirty: true, features: o.features.filter((_, idx) => idx !== i) } : o,
      ),
    );
    setSaveState("idle");
  }

  function moveFeature(id: string, i: number, dir: -1 | 1) {
    setOffers((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const j = i + dir;
        if (j < 0 || j >= o.features.length) return o;
        const features = [...o.features];
        [features[i], features[j]] = [features[j], features[i]];
        return { ...o, dirty: true, features };
      }),
    );
    setSaveState("idle");
  }

  async function handleSave() {
    setSaveState("saving");
    setErrorMessage(null);

    for (const offer of offers) {
      if (!offer.dirty) continue;
      const payload: OfferSaveInput = {
        name: offer.name,
        price: offer.price,
        price_note: offer.price_note,
        tagline: offer.tagline,
        features: offer.features,
        cta: offer.cta,
        featured: offer.featured,
        sort_order: offer.sort_order,
      };
      const result = await saveOffer(offer.id, payload, offer.updated_at || null);
      if (!result.ok) {
        setSaveState("error");
        setErrorMessage(`${offer.name} : ${result.error}`);
        return;
      }
      setOffers((prev) =>
        prev.map((o) =>
          o.id === offer.id ? { ...o, dirty: false, updated_at: result.updatedAt ?? o.updated_at } : o,
        ),
      );
    }

    setSaveState("saved");
  }

  return (
    <SectionEditorShell
      title="Offres"
      description="Essentiel, Signature, Sur Mesure."
      dirty={dirty}
      saveState={saveState}
      errorMessage={errorMessage}
      onSave={handleSave}
    >
      <div className="flex flex-col gap-8">
        {offers.map((offer) => (
          <div key={offer.id} className="border border-line p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-paper">
                {offer.name}
              </h3>
              <label className="flex items-center gap-2 text-xs text-mist">
                <input
                  type="checkbox"
                  checked={offer.featured}
                  onChange={(e) => patchOffer(offer.id, { featured: e.target.checked })}
                  className="h-4 w-4 border border-line-strong bg-transparent accent-paper"
                />
                Offre recommandée
              </label>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label className={fieldLabelClass}>
                Nom
                <input
                  value={offer.name}
                  onChange={(e) => patchOffer(offer.id, { name: e.target.value })}
                  className={fieldInputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                Prix
                <input
                  value={offer.price}
                  onChange={(e) => patchOffer(offer.id, { price: e.target.value })}
                  className={fieldInputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                Mention (optionnelle)
                <input
                  value={offer.price_note ?? ""}
                  onChange={(e) => patchOffer(offer.id, { price_note: e.target.value })}
                  placeholder="Prix de lancement"
                  className={fieldInputClass}
                />
              </label>
              <label className={fieldLabelClass}>
                Texte du bouton
                <input
                  value={offer.cta}
                  onChange={(e) => patchOffer(offer.id, { cta: e.target.value })}
                  className={fieldInputClass}
                />
              </label>
            </div>

            <label className={`${fieldLabelClass} mt-6`}>
              Accroche
              <textarea
                rows={2}
                value={offer.tagline}
                onChange={(e) => patchOffer(offer.id, { tagline: e.target.value })}
                className={`${fieldInputClass} resize-none`}
              />
            </label>

            <div className="mt-6">
              <span className="font-display text-xs uppercase tracking-[0.2em] text-mist-dim">
                Fonctionnalités incluses
              </span>
              <div className="mt-3 flex flex-col divide-y divide-line border border-line">
                {offer.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <input
                      value={feature}
                      onChange={(e) => updateFeature(offer.id, i, e.target.value)}
                      className={`${fieldInputClass} py-1`}
                    />
                    <button
                      type="button"
                      onClick={() => moveFeature(offer.id, i, -1)}
                      disabled={i === 0}
                      className="text-xs text-mist-dim transition-colors hover:text-paper disabled:opacity-30"
                      aria-label="Monter"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveFeature(offer.id, i, 1)}
                      disabled={i === offer.features.length - 1}
                      className="text-xs text-mist-dim transition-colors hover:text-paper disabled:opacity-30"
                      aria-label="Descendre"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFeature(offer.id, i)}
                      className="text-xs text-mist-dim transition-colors hover:text-danger"
                      aria-label="Supprimer cette fonctionnalité"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addFeature(offer.id)}
                className="mt-3 inline-flex items-center border border-line-strong px-4 py-2 font-display text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-paper"
              >
                + Ajouter une fonctionnalité
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionEditorShell>
  );
}
