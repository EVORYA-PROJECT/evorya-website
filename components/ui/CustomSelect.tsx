"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  ariaLabel?: string;
  className?: string;
};

/**
 * Dropdown accessible et entièrement stylisé, en remplacement d'un <select>
 * natif dont le menu ouvert ne peut pas être fiablement stylisé sous Windows.
 * Combobox "select only" (pattern WAI-ARIA APG) : le focus reste sur le
 * déclencheur, la navigation clavier met à jour aria-activedescendant.
 */
export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  ariaLabel,
  className,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selectedLabel = selectedIndex >= 0 ? options[selectedIndex].label : "";

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (open && activeIndex >= 0) {
      const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [open, activeIndex]);

  function openList() {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function commit(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          openList();
        } else {
          setActiveIndex((i) => Math.min(options.length - 1, (i < 0 ? -1 : i) + 1));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) {
          openList();
        } else {
          setActiveIndex((i) => Math.max(0, (i < 0 ? options.length : i) - 1));
        }
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActiveIndex(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActiveIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) {
          openList();
        } else if (activeIndex >= 0) {
          commit(activeIndex);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        aria-activedescendant={
          open && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
        }
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-3 border-0 border-b bg-transparent py-3 text-left text-base outline-none transition-colors ${
          open ? "border-paper" : "border-line"
        } ${selectedLabel ? "text-paper" : "text-mist-dim"} ${className ?? ""}`}
      >
        <span className="truncate">{selectedLabel || placeholder}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className={`h-2.5 w-3 shrink-0 stroke-mist transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
        >
          <path d="M1 1.5L6 6.5L11 1.5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-auto border border-line-strong bg-ink py-1 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.85)]"
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isActive = index === activeIndex;
              return (
                <li
                  key={option.value || `empty-${index}`}
                  id={`${listboxId}-option-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => commit(index)}
                  className={`cursor-pointer px-4 py-3 text-sm transition-colors ${
                    isActive ? "bg-paper/[0.08] text-paper" : "text-paper-dim"
                  } ${isSelected ? "font-medium text-paper" : ""}`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1 w-1 shrink-0 rounded-full transition-colors ${
                        isSelected ? "bg-paper" : "bg-transparent"
                      }`}
                    />
                    {option.label}
                  </span>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
