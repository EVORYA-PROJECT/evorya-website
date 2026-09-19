import type { ReactNode } from "react";

/** Native scrolling keeps vertical gestures and keyboard focus working. */
export default function MobileRail({ children, className = "", label }: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <>
      <div className={`mobile-rail ${className}`} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <p className="mobile-rail-hint" aria-hidden="true">Faire défiler <span>← &nbsp; →</span></p>
    </>
  );
}
