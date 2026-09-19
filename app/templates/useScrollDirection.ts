"use client";

import { useSyncExternalStore } from "react";

export type ScrollDirection = "down" | "up";

let direction: ScrollDirection = "down";
let lastY = 0;
let listening = false;
const listeners = new Set<() => void>();

function onScroll() {
  const nextY = window.scrollY;
  const delta = nextY - lastY;
  lastY = nextY;

  if (nextY <= 1) {
    if (direction !== "down") {
      direction = "down";
      listeners.forEach((listener) => listener());
    }
    return;
  }

  if (Math.abs(delta) < 3) return;
  const nextDirection: ScrollDirection = delta > 0 ? "down" : "up";
  if (nextDirection === direction) return;

  direction = nextDirection;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!listening) {
    lastY = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    listening = true;
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && listening) {
      window.removeEventListener("scroll", onScroll);
      listening = false;
    }
  };
}

function getSnapshot() {
  return direction;
}

function getServerSnapshot(): ScrollDirection {
  return "down";
}

export function useScrollDirection(): ScrollDirection {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Synchronous snapshot for observer callbacks fired in the same scroll frame. */
export function getScrollDirection(): ScrollDirection {
  return direction;
}

export function directionalOffset(direction: ScrollDirection, distance: number) {
  return direction === "down" ? Math.abs(distance) : -Math.abs(distance);
}
