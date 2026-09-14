export type NavLink = {
  label: string;
  href: string;
};

export type ServiceItem = {
  index: string;
  title: string;
  description: string;
};

export type OfferId = "essentiel" | "signature" | "sur-mesure";

export type Offer = {
  id: OfferId;
  name: string;
  price: string;
  priceNote?: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

// Les réalisations (portfolio) sont administrées depuis /admin/realisations
// et stockées dans Supabase — voir lib/cms/types.ts (ProjectRow) et
// lib/data/projects.ts (buildPortfolioEntries) pour le type PortfolioEntry.

export type ContactFormField =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "offer"
  | "budget"
  | "projectType"
  | "message";
