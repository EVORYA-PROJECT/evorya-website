-- =====================================================================
-- Migration : inspiration Templates dans contact_requests
-- =====================================================================
-- Un prospect peut désormais choisir une démo sectorielle sur /templates
-- ("Cette direction m'intéresse") avant de remplir le formulaire Contact.
-- Cette migration ajoute la colonne nécessaire pour la conserver avec la
-- demande — voir lib/templates/registry.ts pour le format de la valeur
-- ("Restaurant — Brasserie Argan").
--
-- Idempotente (add column if not exists) — peut être exécutée plusieurs
-- fois sans risque. Ne touche à aucune donnée existante : nullable, les
-- demandes déjà enregistrées restent valides sans cette information.
--
-- À exécuter dans l'éditeur SQL du tableau de bord Supabase.
-- =====================================================================

alter table contact_requests
  add column if not exists template_interest text;
