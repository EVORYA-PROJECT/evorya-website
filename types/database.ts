export type RequestStatus = "new" | "in_progress" | "replied" | "archived";

export const REQUEST_STATUSES: RequestStatus[] = [
  "new",
  "in_progress",
  "replied",
  "archived",
];

export const STATUS_LABELS: Record<RequestStatus, string> = {
  new: "Nouveau",
  in_progress: "En cours",
  replied: "Répondu",
  archived: "Archivé",
};

export type ContactRequest = {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  offer: string | null;
  budget: string | null;
  website_type: string | null;
  message: string;
  // Nécessite la migration SQL "terms_accepted" (voir instructions de
  // configuration). Optionnel côté insertion tant qu'elle n'a pas été exécutée.
  terms_accepted: boolean;
  status: RequestStatus;
};

export type ContactRequestInsert = Omit<
  ContactRequest,
  "id" | "created_at" | "status" | "terms_accepted"
> & {
  status?: RequestStatus;
  terms_accepted?: boolean;
};

// CMS — contenu textuel administrable (voir lib/cms/types.ts pour la forme
// détaillée de la colonne `content` selon la section).
export type SiteContentRow = {
  section: string;
  content: Record<string, unknown>;
  updated_at: string;
};

export type SiteContentInsert = SiteContentRow;
export type SiteContentUpdate = Partial<SiteContentRow>;

export type OfferDbRow = {
  id: string;
  name: string;
  price: string;
  price_note: string | null;
  tagline: string;
  features: unknown;
  cta: string;
  featured: boolean;
  sort_order: number;
  updated_at: string;
};

export type OfferDbInsert = OfferDbRow;
export type OfferDbUpdate = Partial<Omit<OfferDbRow, "id">>;

export type ProjectDbRow = {
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

export type ProjectDbInsert = Omit<ProjectDbRow, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};
export type ProjectDbUpdate = Partial<Omit<ProjectDbRow, "id" | "created_at">>;

// Schéma de la base Supabase — étendre ce type si de nouvelles tables sont ajoutées.
export type Database = {
  public: {
    Tables: {
      contact_requests: {
        Row: ContactRequest;
        Insert: ContactRequestInsert;
        Update: Partial<ContactRequestInsert>;
        Relationships: [];
      };
      site_content: {
        Row: SiteContentRow;
        Insert: SiteContentInsert;
        Update: SiteContentUpdate;
        Relationships: [];
      };
      offers: {
        Row: OfferDbRow;
        Insert: OfferDbInsert;
        Update: OfferDbUpdate;
        Relationships: [];
      };
      projects: {
        Row: ProjectDbRow;
        Insert: ProjectDbInsert;
        Update: ProjectDbUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
