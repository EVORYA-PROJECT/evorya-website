"use client";

import { useLayoutEffect } from "react";
import { HOME_HASH_INTENT_KEY } from "@/components/ui/HomeHashNavigationIntent";

let allowInitialPositionInDocument = false;
let initialHashInDocument: string | undefined;
let previousRestorationInDocument: ScrollRestoration | undefined;

/**
 * Mounted once by the root layout. Direct loads always begin at the top of
 * their current page; user-initiated cross-route hashes keep native behavior.
 */
export default function HomeInitialScroll() {
  useLayoutEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (
      navigation?.type === "back_forward" &&
      location.pathname === "/" &&
      location.hash === "#templates"
    ) {
      allowInitialPositionInDocument = true;
    }
    const currentTarget = `${location.pathname}${location.search}${location.hash}`;
    const intendedTarget = sessionStorage.getItem(HOME_HASH_INTENT_KEY);
    if (intendedTarget && intendedTarget === currentTarget) {
      sessionStorage.removeItem(HOME_HASH_INTENT_KEY);
      allowInitialPositionInDocument = true;
    }
    if (allowInitialPositionInDocument) return;

    if (initialHashInDocument === undefined) {
      initialHashInDocument = sessionStorage.getItem("evorya.initial-page-hash") ?? window.location.hash;
      previousRestorationInDocument = (
        sessionStorage.getItem("evorya.initial-scroll-restoration") as ScrollRestoration | null
      ) ?? "auto";
    }
    const initialHash = initialHashInDocument;
    history.scrollRestoration = "manual";
    if (window.location.hash) {
      history.replaceState(history.state, "", `${location.pathname}${location.search}`);
    }
    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    reset();
    const frame = requestAnimationFrame(() => requestAnimationFrame(reset));
    const afterLayout = window.setTimeout(reset, 180);
    const restore = window.setTimeout(() => {
      if (initialHash) {
        history.replaceState(
          history.state,
          "",
          `${location.pathname}${location.search}${initialHash}`,
        );
        reset();
      }
      sessionStorage.removeItem("evorya.initial-page-hash");
      sessionStorage.removeItem("evorya.initial-scroll-restoration");
      history.scrollRestoration = previousRestorationInDocument ?? "auto";
    }, 500);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(afterLayout);
      clearTimeout(restore);
      history.scrollRestoration = previousRestorationInDocument ?? "auto";
    };
  }, []);

  return null;
}
