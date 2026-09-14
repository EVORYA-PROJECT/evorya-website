type SectionLabelProps = {
  index: string;
  label: string;
  align?: "left" | "center";
};

export default function SectionLabel({
  index,
  label,
  align = "left",
}: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 font-display text-xs tracking-[0.35em] text-mist uppercase ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="text-paper-dim/70">{index}</span>
      <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
