"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { COUNTRIES, type Country } from "@/lib/data/countries";

type CountrySelectProps = {
  value: string; // code ISO (ex: "MA")
  onChange: (code: string) => void;
  className?: string;
};

/**
 * Sélecteur de pays/indicatif — même pattern combobox que CustomSelect, avec
 * un champ de recherche en plus (liste de ~190 pays). Affiche "Nom — +indicatif"
 * dans la liste, jamais de <select> natif ni de drapeaux.
 */
export default function CountrySelect({ value, onChange, className }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const baseId = useId();
  const listboxId = `${baseId}-country-listbox`;

  const selected = COUNTRIES.find((c) => c.code === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dial.includes(q),
    );
  }, [query]);

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
    if (open) {
      const t = window.setTimeout(() => searchRef.current?.focus(), 10);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (open && activeIndex >= 0) {
      listRef.current
        ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [open, activeIndex]);

  function commit(country: Country) {
    onChange(country.code);
    setOpen(false);
  }

  function openDropdown() {
    setQuery("");
    setActiveIndex(Math.max(0, COUNTRIES.findIndex((c) => c.code === value)));
    setOpen(true);
  }

  function handleTriggerClick() {
    if (open) {
      setOpen(false);
    } else {
      openDropdown();
    }
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      openDropdown();
    }
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setActiveIndex(0);
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[activeIndex]) commit(filtered[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
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
        aria-label={selected ? `Indicatif : ${selected.name}, +${selected.dial}` : "Choisir un pays"}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        className={`flex shrink-0 items-center justify-between gap-2 border-0 border-b bg-transparent py-3 text-left text-base outline-none transition-colors ${
          open ? "border-paper" : "border-line"
        } ${selected ? "text-paper" : "text-mist-dim"} ${className ?? ""}`}
      >
        <span className="whitespace-nowrap">
          {selected ? `+${selected.dial}` : "+"}
        </span>
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
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-30 mt-2 w-72 max-w-[85vw] border border-line-strong bg-ink shadow-[0_24px_48px_-16px_rgba(0,0,0,0.85)]"
          >
            <div className="border-b border-line p-2">
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                placeholder="Rechercher un pays…"
                aria-label="Rechercher un pays"
                className="w-full border-0 bg-transparent px-2 py-2 text-sm text-paper outline-none placeholder:text-mist-dim"
              />
            </div>
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              className="max-h-64 overflow-y-auto py-1"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-4 text-sm text-mist-dim">Aucun pays trouvé.</li>
              ) : (
                filtered.map((country, index) => {
                  const isSelected = country.code === value;
                  const isActive = index === activeIndex;
                  return (
                    <li
                      key={country.code}
                      data-index={index}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => commit(country)}
                      className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                        isActive ? "bg-paper/[0.08] text-paper" : "text-paper-dim"
                      } ${isSelected ? "font-medium text-paper" : ""}`}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="truncate">{country.name}</span>
                        <span className="shrink-0 text-mist-dim">+{country.dial}</span>
                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
