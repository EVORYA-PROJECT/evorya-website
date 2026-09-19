-- =====================================================================
-- Migration : mini-brief client dans contact_requests
-- =====================================================================
-- Le formulaire Contact ne demande plus au prospect de choisir lui-même
-- son offre ("offer") : il répond à un court questionnaire qui aide
-- Evorya à qualifier la demande et à recommander l'offre appropriée
-- manuellement. Cette migration ajoute les colonnes nécessaires pour
-- stocker ces réponses.
--
-- Idempotente (add column if not exists) — peut être exécutée plusieurs
-- fois sans risque. Ne touche à aucune donnée existante : la colonne
-- "offer" n'est ni supprimée ni modifiée, elle reste lisible pour les
-- demandes envoyées avant ce changement (voir types/database.ts).
--
-- À exécuter dans l'éditeur SQL du tableau de bord Supabase.
-- =====================================================================

alter table contact_requests
  add column if not exists objective text,
  add column if not exists identity_status text,
  add column if not exists content_status text,
  add column if not exists timeline text,
  add column if not exists features text[] not null default '{}'::text[];
