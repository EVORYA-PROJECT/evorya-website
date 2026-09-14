import type { ReactNode } from "react";

type CornerFrameProps = {
  children: ReactNode;
  className?: string;
};

const corner =
  "absolute h-3 w-3 border-paper-dim/50 sm:h-4 sm:w-4";

export default function CornerFrame({ children, className }: CornerFrameProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <span className={`${corner} left-0 top-0 border-l border-t`} aria-hidden="true" />
      <span className={`${corner} right-0 top-0 border-r border-t`} aria-hidden="true" />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} aria-hidden="true" />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} aria-hidden="true" />
      {children}
    </div>
  );
}
