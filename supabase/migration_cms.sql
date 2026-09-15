-- =====================================================================
-- Evorya Project — migration CMS + demandes + realtime
-- A exécuter dans Supabase Dashboard > SQL Editor.
-- Idempotent : peut être exécuté plusieurs fois sans casser de données
-- existantes (ON CONFLICT DO NOTHING sur les seeds, IF NOT EXISTS partout
-- où c'est supporté). Ne supprime jamais de ligne existante.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. contact_requests — colonne "conditions acceptées" + suppression admin
-- ---------------------------------------------------------------------

alter table contact_requests
  add column if not exists terms_accepted boolean not null default false;

-- Si cette policy existe déjà (migration déjà exécutée précédemment),
-- l'erreur "policy already exists" peut être ignorée sans risque.
create policy "Authenticated users can delete contact_requests"
  on contact_requests
  for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- 2. site_content — textes administrables (Hero, Studio, Services,
--    Transparence, Processus, Contact, Footer, Evorya First 10)
-- ---------------------------------------------------------------------

create table if not exists site_content (
  section text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table site_content enable row level security;

create policy "Public can read site_content"
  on site_content
  for select
  to public
  using (true);

create policy "Authenticated can write site_content"
  on site_content
  for all
  to authenticated
  using (true)
  with check (true);

-- Contenu initial = exactement ce qui est affiché aujourd'hui sur le site
-- (voir lib/cms/defaults.ts). ON CONFLICT DO NOTHING : n'écrase jamais un
-- contenu déjà modifié depuis /admin/contenu.
insert into site_content (section, content) values
  ('hero', '{"title":"Votre présence digitale mérite mieux qu''un simple site.","subtitle":"Evorya imagine et développe des expériences web modernes pour les entreprises qui veulent marquer les esprits dès le premier regard.","ctaPrimary":"Démarrer un projet","ctaSecondary":"Découvrir nos offres"}'::jsonb),
  ('studio', '{"lead":"Evorya accompagne les entreprises dans la création d''une présence digitale qui leur ressemble et qui inspire confiance dès le premier regard.","body":"Nous ne créons pas simplement des pages web. Nous construisons une expérience pensée autour de votre entreprise, de votre clientèle et de votre identité.","tag":"PROJECT 001 — EVORYA"}'::jsonb),
  ('services', '{"heading":"Nos services","items":[{"index":"01","title":"Création de sites web","description":"Sites vitrines modernes, rapides et entièrement adaptés à votre activité."},{"index":"02","title":"Design & expérience","description":"Interfaces uniques pensées pour valoriser votre entreprise et améliorer l''expérience de vos visiteurs."},{"index":"03","title":"Responsive Design","description":"Une expérience spécifiquement optimisée pour ordinateur, tablette et smartphone."},{"index":"04","title":"Performance","description":"Sites rapides, optimisés et construits avec des technologies modernes."},{"index":"05","title":"SEO","description":"Structure technique permettant aux moteurs de recherche de comprendre et référencer correctement votre site."},{"index":"06","title":"Accompagnement","description":"Evorya vous accompagne de la conception jusqu''à la mise en ligne."}]}'::jsonb),
  ('transparency', '{"heading":"Transparence avant tout.","subheading":"Un système simple, pensé pour qu''aucune surprise ne s''invite entre le premier échange et la mise en ligne.","points":[{"index":"01","title":"Prix clair","description":"Le prix de création est défini avant le début du projet."},{"index":"02","title":"Frais externes","description":"Domaine, hébergement et éventuels services externes sont expliqués séparément."},{"index":"03","title":"Aucun coût surprise","description":"Les dépenses nécessaires sont communiquées et convenues avant le lancement."},{"index":"04","title":"Paiement","description":"Pour les prestations payantes, le règlement intervient selon les conditions convenues avec Evorya."}],"footnote":"Aucun frais supplémentaire sans votre accord préalable."}'::jsonb),
  ('process', '{"heading":"Une méthode claire, du premier échange à la mise en ligne","steps":[{"index":"01","title":"Échange","description":"Nous découvrons votre entreprise, vos objectifs et votre vision."},{"index":"02","title":"Direction","description":"Nous définissons l''identité, la structure et l''expérience du futur site."},{"index":"03","title":"Création","description":"Nous concevons et développons votre expérience digitale."},{"index":"04","title":"Livraison","description":"Après validation, votre nouveau site est optimisé et mis en ligne."}]}'::jsonb),
  ('contact', '{"heading":"Construisons quelque chose qui vous ressemble.","subheading":"Parlez-nous de votre entreprise et de votre projet. Nous reviendrons vers vous pour discuter de la meilleure solution.","directLine":"Vous préférez nous écrire directement ?","email":"evoryaproject@gmail.com"}'::jsonb),
  ('footer', '{"tagline":"Création d''expériences digitales.","location":"Casablanca, Maroc"}'::jsonb),
  ('first10', '{"title":"Evorya First 10","text1":"Nous sélectionnons les 10 premiers projets qui lanceront le portfolio Evorya.","text2":"Pour ces 10 premiers projets, la création du site est offerte.","feesNote1":"Les éventuels frais nécessaires à la mise en ligne — notamment le nom de domaine, l''hébergement ou certains services tiers — peuvent rester à la charge du client.","feesNote2":"Ces frais sont toujours définis ensemble et communiqués avant le début du projet.","current":0,"total":10,"status":"open"}'::jsonb)
on conflict (section) do nothing;

-- ---------------------------------------------------------------------
-- 3. offers — Essentiel / Signature / Sur Mesure
-- ---------------------------------------------------------------------

create table if not exists offers (
  id text primary key,
  name text not null,
  price text not null,
  price_note text,
  tagline text not null,
  features jsonb not null default '[]'::jsonb,
  cta text not null,
  featured boolean not null default false,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table offers enable row level security;

create policy "Public can read offers"
  on offers
  for select
  to public
  using (true);

create policy "Authenticated can write offers"
  on offers
  for all
  to authenticated
  using (true)
  with check (true);

insert into offers (id, name, price, price_note, tagline, features, cta, featured, sort_order) values
  ('essentiel', 'Essentiel', '1 990 MAD', 'Prix de lancement', 'Pour construire une présence digitale professionnelle.',
   '["Site vitrine premium","3 à 5 pages","Design responsive","Formulaire de contact","Intégration WhatsApp","Google Maps","SEO de base","Mise en ligne"]'::jsonb,
   'Choisir Essentiel', false, 0),
  ('signature', 'Signature', '2 990 MAD', 'Prix de lancement', 'Pour les entreprises qui souhaitent réellement se démarquer.',
   '["Tout le contenu de l''offre Essentiel","Design davantage personnalisé","Animations premium","Galerie ou portfolio","Sections avancées","SEO renforcé","Optimisation des performances","Travail approfondi sur l''identité digitale"]'::jsonb,
   'Choisir Signature', true, 1),
  ('sur-mesure', 'Sur Mesure', 'À partir de 4 490 MAD', null, 'Pour créer une expérience digitale entièrement personnalisée.',
   '["Architecture personnalisée","Design sur mesure","Animations avancées","Fonctionnalités spécifiques","Intégrations externes","Accompagnement renforcé"]'::jsonb,
   'Parler de mon projet', false, 2)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- 4. projects — Réalisations (aucune donnée existante à préserver, le
--    portfolio actuel est vide : pas de seed nécessaire)
-- ---------------------------------------------------------------------

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  sector text,
  description text,
  image_path text,
  link text,
  project_date text,
  founding_project boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table projects enable row level security;

-- Un visiteur public ne voit jamais un brouillon.
create policy "Public can read published projects"
  on projects
  for select
  to public
  using (published = true);

-- Le propriétaire connecté voit aussi les brouillons.
create policy "Authenticated can read all projects"
  on projects
  for select
  to authenticated
  using (true);

create policy "Authenticated can write projects"
  on projects
  for insert
  to authenticated
  with check (true);

create policy "Authenticated can update projects"
  on projects
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated can delete projects"
  on projects
  for delete
  to authenticated
  using (true);

-- ---------------------------------------------------------------------
-- 5. Storage — policies du bucket "project-images"
--    Le bucket lui-même doit être créé manuellement (voir rapport final,
--    Dashboard > Storage > New bucket) : ceci ne fait qu'autoriser la
--    lecture publique et l'écriture par le propriétaire connecté une fois
--    le bucket créé.
-- ---------------------------------------------------------------------

create policy "Public can read project images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'project-images');

create policy "Authenticated can manage project images"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'project-images')
  with check (bucket_id = 'project-images');

-- ---------------------------------------------------------------------
-- 6. Realtime — synchronisation entre appareils (admin)
-- ---------------------------------------------------------------------

do $$
begin
  alter publication supabase_realtime add table public.contact_requests;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.site_content;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.offers;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.projects;
exception when duplicate_object then null;
end $$;
