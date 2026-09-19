"use client";

import { useEffect, useRef } from "react";
import { getScrollDirection, useScrollDirection } from "@/app/templates/useScrollDirection";

/** Mobile entrances enhance already-visible content. No hidden resting state,
 * no fill mode, and one observer for the page, including newly filtered cards. */
export default function MobileExperience() {
  const marker = useRef<HTMLSpanElement>(null);
  useScrollDirection();

  useEffect(() => {
    const root = marker.current?.closest("main");
    if (!root) return;
    const mobile = window.matchMedia("(max-width: 639px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};

    function listen(query: MediaQueryList, listener: () => void) {
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", listener);
        return () => query.removeEventListener("change", listener);
      }

      // Older physical iPhones expose the legacy MediaQueryList API.
      const legacy = query as MediaQueryList & {
        addListener: (callback: () => void) => void;
        removeListener: (callback: () => void) => void;
      };
      legacy.addListener(listener);
      return () => legacy.removeListener(listener);
    }

    function setup() {
      cleanup();
      if (!root || !mobile.matches || reduced.matches) return;
      const observed = new Set<Element>();
      const animations = new Map<Element, Animation[]>();
      const present = new Set<Element>();
      const sober = root.dataset.mobilePage === "cabinet";
      const evorya = root.dataset.mobilePage === "evorya";

      function isOutside(element: Element) {
        const rect = element.getBoundingClientRect();
        return rect.bottom < -32 || rect.top > window.innerHeight + 32;
      }

      const observer = new IntersectionObserver((entries) => {
        let index = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            // An entrance moves its own box slightly. Ignore observer noise
            // during that motion; only a real departure arms the next replay.
            if (!animations.has(entry.target) && isOutside(entry.target)) {
              present.delete(entry.target);
            }
            continue;
          }
          if (present.has(entry.target)) continue;
          if (entry.boundingClientRect.height > window.innerHeight * 1.4) continue;
          const element = entry.target;
          present.add(element);
          const photo = !!element.querySelector("img");
          const scrollDirection = getScrollDirection();
          const offset = (scrollDirection === "up" ? -1 : 1) * (sober ? 10 : photo ? 14 : 22);
          const motionTarget = evorya && element.firstElementChild instanceof HTMLElement
            ? element.firstElementChild
            : element;
          const animation = motionTarget.animate([
            { transform: `translate3d(0, ${offset}px, 0) scale(${photo && !sober ? 1.018 : 1})` },
            { transform: "translate3d(0, 0, 0) scale(1)" },
          ], { duration: sober ? 360 : photo ? 520 : 420, delay: Math.min(index++ * 35, 105), easing: "cubic-bezier(.16,1,.3,1)" });
          const active = [animation];
          const image = element.querySelector("img");
          if (image && !sober) {
            active.push(image.animate([
              { clipPath: scrollDirection === "up" ? "inset(0 0 9% 0)" : "inset(9% 0 0 0)", opacity: .82 },
              { clipPath: "inset(0)", opacity: 1 },
            ], { duration: 520, easing: "cubic-bezier(.16,1,.3,1)" }));
          }
          animations.set(element, active);

          // The physical-iPhone diagnostic made these WAAPI effects reliable.
          // Its only animation-relevant side effect was this style resolution,
          // retained without UI, logging, listeners or React state.
          void getComputedStyle(motionTarget).transform;

          active[active.length - 1].onfinish = () => {
            animations.delete(element);
            if (isOutside(element)) present.delete(element);
          };
        }
      }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

      function refresh() {
        for (const element of observed) {
          if (!root?.contains(element)) {
            observer.unobserve(element);
            animations.get(element)?.forEach(animation => animation.cancel());
            animations.delete(element);
            present.delete(element);
            observed.delete(element);
          }
        }
        root?.querySelectorAll<HTMLElement>("[data-reveal], [data-mobile-reveal]").forEach(element => {
          // Animate a single layer, never an SVG pivot or a parent and child.
          if (observed.has(element) || element.namespaceURI !== "http://www.w3.org/1999/xhtml" || element.getAttribute("aria-hidden") === "true" || element.querySelector("[data-reveal], [data-mobile-reveal]")) return;
          element.dataset.mobileMotion = "true";
          observed.add(element);
          observer.observe(element);
        });
      }
      refresh();
      const mutations = new MutationObserver(records => {
        // Counter text changes every frame; only structural changes can add
        // reveal targets. Avoid rescanning the page for those text updates.
        if (records.some(record => [...record.addedNodes, ...record.removedNodes].some(node => node.nodeType === Node.ELEMENT_NODE))) refresh();
      });
      mutations.observe(root, { childList: true, subtree: true });
      cleanup = () => {
        observer.disconnect();
        mutations.disconnect();
        animations.forEach(group => group.forEach(animation => animation.cancel()));
        observed.forEach(element => {
          if (element instanceof HTMLElement) delete element.dataset.mobileMotion;
        });
        animations.clear();
        present.clear();
      };
    }
    setup();
    const stopMobile = listen(mobile, setup);
    const stopReduced = listen(reduced, setup);
    return () => {
      cleanup();
      stopMobile();
      stopReduced();
    };
  }, []);

  return <span ref={marker} hidden />;
}
