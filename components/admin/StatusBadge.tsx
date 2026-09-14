import { STATUS_LABELS, type RequestStatus } from "@/types/database";

const DOT_CLASS: Record<RequestStatus, string> = {
  new: "bg-paper",
  in_progress: "border border-paper bg-transparent",
  replied: "bg-mist",
  archived: "bg-mist-dim",
};

export default function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <span className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-paper-dim">
      <span className={`h-2 w-2 shrink-0 rounded-full ${DOT_CLASS[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}
