// Options du mini-brief client intégré au formulaire Contact. Volontairement
// en dur (pas de CMS) : ce sont des choix structurels du formulaire, pas du
// contenu éditorial — voir lib/cms/types.ts::ContactContent pour les textes
// (titre, sous-titre...) qui restent, eux, gérés depuis /admin/contenu.
//
// Convention : `value` est directement la chaîne enregistrée en base et
// affichée telle quelle dans l'admin/l'email (pas de mapping séparé), donc
// toujours déjà rédigée en français lisible.

export type ContactOption = { value: string; label: string };

export const PROJECT_TYPE_OPTIONS: ContactOption[] = [
  { value: "Site vitrine", label: "Site vitrine" },
  { value: "Restaurant / Café", label: "Restaurant / Café" },
  { value: "Immobilier", label: "Immobilier" },
  { value: "Hôtel / Riad / Hébergement", label: "Hôtel / Riad / Hébergement" },
  { value: "Beauté / Spa / Bien-être", label: "Beauté / Spa / Bien-être" },
  { value: "Cabinet / Services professionnels", label: "Cabinet / Services professionnels" },
  { value: "Automobile / Garage", label: "Automobile / Garage" },
  { value: "E-commerce", label: "E-commerce" },
  { value: "Portfolio", label: "Portfolio" },
  { value: "Autre", label: "Autre" },
];

export const OBJECTIVE_OPTIONS: ContactOption[] = [
  { value: "Présenter mon entreprise", label: "Présenter mon entreprise" },
  { value: "Obtenir plus de demandes de contact", label: "Obtenir plus de demandes de contact" },
  { value: "Recevoir des demandes de devis", label: "Recevoir des demandes de devis" },
  { value: "Prendre des réservations / rendez-vous", label: "Prendre des réservations / rendez-vous" },
  { value: "Vendre des produits en ligne", label: "Vendre des produits en ligne" },
  { value: "Présenter mes réalisations", label: "Présenter mes réalisations" },
  { value: "Renforcer mon image de marque", label: "Renforcer mon image de marque" },
  { value: "Autre", label: "Autre" },
];

export const FEATURE_OPTIONS: ContactOption[] = [
  { value: "Formulaire de contact", label: "Formulaire de contact" },
  { value: "Bouton WhatsApp", label: "Bouton WhatsApp" },
  { value: "Demande de devis", label: "Demande de devis" },
  { value: "Prise de rendez-vous", label: "Prise de rendez-vous" },
  { value: "Réservation", label: "Réservation" },
  { value: "Galerie photos / vidéos", label: "Galerie photos / vidéos" },
  { value: "Catalogue de produits ou services", label: "Catalogue de produits ou services" },
  { value: "Paiement en ligne", label: "Paiement en ligne" },
  { value: "Carte / localisation", label: "Carte / localisation" },
  { value: "Liens vers les réseaux sociaux", label: "Liens vers les réseaux sociaux" },
  { value: "Site multilingue", label: "Site multilingue" },
  { value: "Blog / actualités", label: "Blog / actualités" },
  { value: "Espace client / espace privé", label: "Espace client / espace privé" },
  { value: "Je ne sais pas encore", label: "Je ne sais pas encore" },
  { value: "Autre", label: "Autre" },
];

export const IDENTITY_OPTIONS: ContactOption[] = [
  { value: "Oui, j'ai déjà mon identité visuelle", label: "Oui, j'ai déjà mon identité visuelle" },
  { value: "J'ai uniquement un logo", label: "J'ai uniquement un logo" },
  { value: "Non, tout est à définir", label: "Non, tout est à définir" },
];

export const CONTENT_OPTIONS: ContactOption[] = [
  { value: "Oui, textes et visuels sont prêts", label: "Oui, textes et visuels sont prêts" },
  { value: "J'en ai une partie", label: "J'en ai une partie" },
  { value: "Non, j'ai besoin d'accompagnement", label: "Non, j'ai besoin d'accompagnement" },
];

export const TIMELINE_OPTIONS: ContactOption[] = [
  { value: "Dès que possible", label: "Dès que possible" },
  { value: "Moins d'un mois", label: "Moins d'un mois" },
  { value: "1 à 2 mois", label: "1 à 2 mois" },
  { value: "2 à 3 mois", label: "2 à 3 mois" },
  { value: "Je n'ai pas encore de date précise", label: "Je n'ai pas encore de date précise" },
];
