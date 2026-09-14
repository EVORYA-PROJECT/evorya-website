"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import StatusBadge from "@/components/admin/StatusBadge";
import RequestDetail from "@/components/admin/RequestDetail";
import { deleteRequest, updateRequestStatus } from "@/app/admin/actions";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  REQUEST_STATUSES,
  STATUS_LABELS,
  type ContactRequest,
  type RequestStatus,
} from "@/types/database";

type FilterValue = "all" | RequestStatus;

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
});

export default function AdminDashboard({
  initialRequests,
}: {
  initialRequests: ContactRequest[];
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const base: Record<FilterValue, number> = {
      all: requests.length,
      new: 0,
      in_progress: 0,
      replied: 0,
      archived: 0,
    };
    requests.forEach((r) => {
      base[r.status] += 1;
    });
    return base;
  }, [requests]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return requests.filter((r) => {
      const matchesStatus = filter === "all" || r.status === filter;
      const matchesQuery =
        query.length === 0 ||
        r.name.toLowerCase().includes(query) ||
        (r.company ?? "").toLowerCase().includes(query) ||
        r.email.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [requests, search, filter]);

  const selectedRequest = requests.find((r) => r.id === selectedId) ?? null;

  // Supabase est la seule source de vérité : toute demande créée, modifiée ou
  // supprimée ailleurs (autre onglet, autre appareil) doit se refléter ici
  // sans refresh manuel. Requiert que la table `contact_requests` soit
  // ajoutée à la publication Realtime (voir le script SQL fourni).
  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("admin-contact-requests")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_requests" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const row = payload.new as ContactRequest;
            setRequests((prev) => (prev.some((r) => r.id === row.id) ? prev : [row, ...prev]));
          } else if (payload.eventType === "UPDATE") {
            const row = payload.new as ContactRequest;
            setRequests((prev) => prev.map((r) => (r.id === row.id ? row : r)));
          } else if (payload.eventType === "DELETE") {
            const oldId = (payload.old as Partial<ContactRequest>).id;
            if (oldId) {
              setRequests((prev) => prev.filter((r) => r.id !== oldId));
              setSelectedId((prev) => (prev === oldId ? null : prev));
            }
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleStatusChange(id: string, status: RequestStatus) {
    await updateRequestStatus(id, status);
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  async function handleDelete(id: string) {
    await deleteRequest(id);
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setSelectedId(null);
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-5">
        {(
          [
            ["all", "Total"],
            ["new", STATUS_LABELS.new],
            ["in_progress", STATUS_LABELS.in_progress],
            ["replied", STATUS_LABELS.replied],
            ["archived", STATUS_LABELS.archived],
          ] as [FilterValue, string][]
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`bg-ink px-4 py-5 text-left transition-colors hover:bg-paper/[0.04] ${
              filter === value ? "bg-paper/[0.06]" : ""
            }`}
          >
            <span className="block font-display text-3xl text-paper">{stats[value]}</span>
            <span className="mt-1 block font-display text-[10px] uppercase tracking-[0.2em] text-mist-dim">
              {label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom, entreprise ou email…"
          className="w-full border-0 border-b border-line bg-transparent py-3 text-base text-paper outline-none placeholder:text-mist-dim focus:border-paper sm:max-w-sm"
        />

        <div className="flex flex-wrap gap-2">
          {(["all", ...REQUEST_STATUSES] as FilterValue[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`border px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] transition-colors ${
                filter === value
                  ? "border-paper bg-paper text-ink"
                  : "border-line-strong text-mist hover:border-paper hover:text-paper"
              }`}
            >
              {value === "all" ? "Toutes" : STATUS_LABELS[value]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {requests.length === 0 ? (
          <div className="border border-line py-24 text-center">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-mist-dim">
              Aucune demande pour le moment
            </p>
            <p className="mt-2 text-sm text-mist">
              Les nouvelles demandes envoyées depuis le site apparaîtront ici.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="border border-line py-24 text-center">
            <p className="font-display text-sm uppercase tracking-[0.2em] text-mist-dim">
              Aucun résultat
            </p>
            <p className="mt-2 text-sm text-mist">
              Essayez une autre recherche ou un autre filtre.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop : table */}
            <div className="hidden overflow-x-auto border border-line md:block">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line font-display text-[11px] uppercase tracking-[0.2em] text-mist-dim">
                    <th className="px-4 py-3 font-normal">Nom</th>
                    <th className="px-4 py-3 font-normal">Entreprise</th>
                    <th className="px-4 py-3 font-normal">Email</th>
                    <th className="px-4 py-3 font-normal">Offre</th>
                    <th className="px-4 py-3 font-normal">Date</th>
                    <th className="px-4 py-3 font-normal">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setSelectedId(r.id)}
                      className="cursor-pointer border-b border-line last:border-b-0 text-paper-dim transition-colors hover:bg-paper/[0.04]"
                    >
                      <td className="px-4 py-4 text-paper">{r.name}</td>
                      <td className="px-4 py-4">{r.company || "—"}</td>
                      <td className="px-4 py-4">{r.email}</td>
                      <td className="px-4 py-4">{r.offer || "—"}</td>
                      <td className="px-4 py-4">{dateFormatter.format(new Date(r.created_at))}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status={r.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile : cartes */}
            <div className="flex flex-col gap-3 md:hidden">
              {filtered.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedId(r.id)}
                  className="flex flex-col gap-3 border border-line p-5 text-left transition-colors active:bg-paper/[0.04]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-medium text-paper">{r.name}</p>
                      {r.company && <p className="mt-0.5 text-sm text-mist">{r.company}</p>}
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-mist-dim">
                    <span>{r.email}</span>
                    <span>{dateFormatter.format(new Date(r.created_at))}</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedRequest && (
          <RequestDetail
            request={selectedRequest}
            onClose={() => setSelectedId(null)}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
