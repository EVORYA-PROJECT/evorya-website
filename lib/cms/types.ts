// Formes des contenus administrables depuis /admin/contenu. Chaque section
// correspond à une ligne de la table Supabase `site_content` (colonne jsonb).
// Les éléments purement structurels (numéros de section, ordre des blocs,
// classes CSS...) restent dans le code : seul le texte métier est ici.

export type HeroContent = {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export type StudioContent = {
  lead: string;
  body: string;
  tag: string;
};

export type ServiceItemContent = {
  index: string;
  title: string;
  description: string;
};

export type ServicesContent = {
  heading: string;
  items: ServiceItemContent[];
};

export type TransparencyPointContent = {
  index: string;
  title: string;
  description: string;
};

export type TransparencyContent = {
  heading: string;
  subheading: string;
  points: TransparencyPointContent[];
  footnote: string;
};

export type ProcessStepContent = {
  index: string;
  title: string;
  description: string;
};

export type ProcessContent = {
  heading: string;
  steps: ProcessStepContent[];
};

export type ContactContent = {
  heading: string;
  subheading: string;
  directLine: string;
  email: string;
};

export type FooterContent = {
  tagline: string;
  location: string;
};

export type First10Status = "open" | "closed";

export type First10Content = {
  title: string;
  text1: string;
  text2: string;
  feesNote1: string;
  feesNote2: string;
  current: number;
  total: number;
  status: First10Status;
};

export type SiteContentMap = {
  hero: HeroContent;
  studio: StudioContent;
  services: ServicesContent;
  transparency: TransparencyContent;
  process: ProcessContent;
  contact: ContactContent;
  footer: FooterContent;
  first10: First10Content;
};

export type SiteContentSection = keyof SiteContentMap;

export const SITE_CONTENT_SECTIONS: SiteContentSection[] = [
  "hero",
  "studio",
  "services",
  "transparency",
  "process",
  "contact",
  "footer",
  "first10",
];

export type OfferRow = {
  id: string;
  name: string;
  price: string;
  price_note: string | null;
  tagline: string;
  features: string[];
  cta: string;
  featured: boolean;
  sort_order: number;
  updated_at: string;
};

export type OfferUpdate = Partial<
  Omit<OfferRow, "id" | "updated_at">
>;

export type ProjectRow = {
  id: string;
  name: string;
  company: string | null;
  sector: string | null;
  description: string | null;
  image_path: string | null;
  link: string | null;
  project_date: string | null;
  founding_project: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = Omit<
  ProjectRow,
  "id" | "created_at" | "updated_at" | "sort_order"
> & { sort_order?: number };

export type ProjectUpdate = Partial<Omit<ProjectRow, "id" | "created_at" | "updated_at">>;

// Emplacement affiché dans la grille du portfolio public : soit une
// réalisation publiée, soit un emplacement encore vide ("à venir") parmi les
// N premiers projets (N = first10.total).
export type PortfolioEntry =
  | { kind: "project"; index: string; project: ProjectRow }
  | { kind: "placeholder"; index: string };
