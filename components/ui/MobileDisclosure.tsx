"use client";

import { useId, useState, useSyncExternalStore, type ReactNode } from "react";

function subscribe(change: () => void) {
  const query = window.matchMedia("(max-width: 639px)");
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
}
const snapshot = () => window.matchMedia("(max-width: 639px)").matches;
const serverSnapshot = () => false;

/** Same content and DOM on every screen; disclosure only on phones. */
export default function MobileDisclosure({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const mobile = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const id = useId();
  return (
    <div className="mobile-disclosure" data-open={open}>
      <button type="button" aria-expanded={!mobile || open} aria-controls={id} onClick={() => setOpen(!open)}>
        {label}<span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id={id} className="mobile-disclosure-panel" inert={mobile && !open}>
        <div>{children}</div>
      </div>
    </div>
  );
}
