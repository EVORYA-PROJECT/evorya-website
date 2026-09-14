"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";

type ConfirmDeleteModalProps = {
  open: boolean;
  requestName: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

export default function ConfirmDeleteModal({
  open,
  requestName,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setDeleting(true);
    setError(null);
    try {
      await onConfirm();
    } catch {
      setError("La suppression a échoué. Merci de réessayer.");
      setDeleting(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={deleting ? () => {} : onCancel}
      title="Supprimer la demande"
      closeOnOverlayClick={!deleting}
    >
      <p className="text-sm leading-relaxed text-mist">
        Vous êtes sur le point de supprimer définitivement la demande de{" "}
        <span className="text-paper-dim">{requestName}</span>.
      </p>
      <p className="mt-3 text-sm font-medium leading-relaxed text-paper-dim">
        Cette action est irréversible : la demande sera immédiatement et
        définitivement supprimée.
      </p>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={deleting}
          className="inline-flex h-12 items-center justify-center border border-line-strong px-6 font-display text-xs uppercase tracking-[0.2em] text-paper-dim transition-colors hover:border-paper hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={deleting}
          className="inline-flex h-12 items-center justify-center border border-danger px-6 font-display text-xs uppercase tracking-[0.2em] text-danger transition-colors hover:bg-danger hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? "Suppression…" : "Supprimer définitivement"}
        </button>
      </div>
    </Modal>
  );
}
