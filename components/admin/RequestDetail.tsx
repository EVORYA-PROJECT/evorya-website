"use client";

import { useState } from "react";
import { motion } from "motion/react";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import { REQUEST_STATUSES, STATUS_LABELS, type ContactRequest, type RequestStatus } from "@/types/database";

type RequestDetailProps = {
  request: ContactRequest;
  onClose: () => void;
  onStatusChange: (id: string, status: RequestStatus) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "long",
  timeStyle: "short",
});

export default function RequestDetail({
  request,
  onClose,
  onStatusChange,
  onDelete,
}: RequestDetailProps) {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  async function handleStatusChange(status: RequestStatus) {
    if (status === request.status) return;
    setUpdating(true);
    setError(null);
    try {
      await onStatusChange(request.id, status);
    } catch {
      setError("La mise à jour du statut a échoué.");
    } finally {
      setUpdating(false);
    }
  }

  async function handleConfirmDelete() {
    await onDelete(request.id);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <motion.button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-line bg-ink p-6 sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="self-start font-display text-xs uppercase tracking-[0.25em] text-mist transition-colors hover:text-paper"
        >
          ← Retour à la liste
        </button>

        <div className="mt-8">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-mist-dim">
            {dateFormatter.format(new Date(request.created_at))}
          </span>
          <h2 className="mt-3 text-2xl font-medium text-paper">{request.name}</h2>
          {request.company && <p className="mt-1 text-sm text-mist">{request.company}</p>}
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <dt className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">Email</dt>
            <dd className="mt-2">
              <a
                href={`mailto:${request.email}`}
                className="text-sm text-paper underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-paper"
              >
                {request.email}
              </a>
            </dd>
          </div>

          <div>
            <dt className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">Téléphone</dt>
            <dd className="mt-2 text-sm text-paper-dim">{request.phone || "—"}</dd>
          </div>

          <div>
            <dt className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">Offre</dt>
            <dd className="mt-2 text-sm text-paper-dim">{request.offer || "—"}</dd>
          </div>

          <div>
            <dt className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">Budget</dt>
            <dd className="mt-2 text-sm text-paper-dim">{request.budget || "—"}</dd>
          </div>

          <div>
            <dt className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">Type de site</dt>
            <dd className="mt-2 text-sm text-paper-dim">{request.website_type || "—"}</dd>
          </div>

          <div>
            <dt className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">
              Conditions acceptées
            </dt>
            <dd className="mt-2 text-sm text-paper-dim">
              {request.terms_accepted ? "Oui" : "Non renseigné"}
            </dd>
          </div>
        </dl>

        <div className="mt-8 border-t border-line pt-6">
          <dt className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">Message</dt>
          <dd className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-paper-dim">
            {request.message}
          </dd>
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <span className="font-display text-[11px] uppercase tracking-[0.25em] text-mist-dim">
            Statut actuel
          </span>
          <div className="mt-3">
            <StatusBadge status={request.status} />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {REQUEST_STATUSES.map((status) => (
              <button
                key={status}
                type="button"
                disabled={updating}
                onClick={() => handleStatusChange(status)}
                className={`border px-4 py-2 font-display text-[11px] uppercase tracking-[0.2em] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  status === request.status
                    ? "border-paper bg-paper text-ink"
                    : "border-line-strong text-paper-dim hover:border-paper"
                }`}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
          </div>

          {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <button
            type="button"
            onClick={() => setConfirmDeleteOpen(true)}
            className="inline-flex h-12 w-full items-center justify-center border border-line-strong px-6 font-display text-xs uppercase tracking-[0.2em] text-mist transition-colors hover:border-danger hover:text-danger sm:w-auto"
          >
            Supprimer la demande
          </button>
        </div>
      </motion.div>

      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        requestName={request.name}
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
