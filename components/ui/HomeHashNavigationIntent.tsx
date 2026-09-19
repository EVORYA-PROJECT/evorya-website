"use client";

import { useEffect } from "react";

export const HOME_HASH_INTENT_KEY = "evorya.page-hash-navigation";

/** Records a real user click to an anchor on another same-origin route. */
export default function HomeHashNavigationIntent() {
  useEffect(() => {
    function recordIntent(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const target = new URL(anchor.href, window.location.href);
      if (target.origin !== location.origin) return;

      // Make the homepage history entry explicit before opening any of its
      // six demos. Back then targets the Templates section, independently of
      // the scroll depth reached inside the demo route.
      if (
        location.pathname === "/" &&
        anchor.closest("#templates") &&
        /^\/templates\/[^/]+\/?$/.test(target.pathname)
      ) {
        history.replaceState(history.state, "", `${location.pathname}${location.search}#templates`);
        return;
      }

      if (!target.hash) return;
      const currentDocument = `${location.pathname}${location.search}`;
      const targetDocument = `${target.pathname}${target.search}`;
      if (currentDocument === targetDocument) return;
      const intent = `${targetDocument}${target.hash}`;
      sessionStorage.setItem(HOME_HASH_INTENT_KEY, intent);
      // A client-side App Router transition keeps this document alive and
      // does not need the marker. A full navigation cancels this timer and
      // lets the destination consume it before applying its initial reset.
      window.setTimeout(() => {
        if (sessionStorage.getItem(HOME_HASH_INTENT_KEY) === intent) {
          sessionStorage.removeItem(HOME_HASH_INTENT_KEY);
        }
      }, 1_000);
    }

    document.addEventListener("click", recordIntent, true);
    return () => document.removeEventListener("click", recordIntent, true);
  }, []);

  return null;
}
