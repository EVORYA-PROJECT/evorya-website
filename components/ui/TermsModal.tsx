"use client";

import Modal from "@/components/ui/Modal";
import { TERMS_DISCLAIMER, TERMS_INTRO, TERMS_SECTIONS } from "@/lib/data/terms";

type TermsModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function TermsModal({ open, onClose }: TermsModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Conditions du projet">
      <p className="text-sm leading-relaxed text-mist">{TERMS_INTRO}</p>

      <div className="mt-8 flex flex-col divide-y divide-line">
        {TERMS_SECTIONS.map((section) => (
          <div key={section.index} className="py-5 first:pt-0 last:pb-0">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-xs text-mist-dim">{section.index}</span>
              <h3 className="font-display text-sm uppercase tracking-[0.1em] text-paper">
                {section.title}
              </h3>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-mist">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 border-t border-line pt-6 text-xs leading-relaxed text-mist-dim">
        {TERMS_DISCLAIMER}
      </p>
    </Modal>
  );
}
