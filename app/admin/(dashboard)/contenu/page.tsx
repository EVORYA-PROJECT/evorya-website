import Link from "next/link";

const SECTIONS = [
  { href: "/admin/contenu/hero", label: "Hero", description: "Titre, sous-titre, boutons." },
  { href: "/admin/contenu/studio", label: "Studio", description: "Présentation d'Evorya." },
  { href: "/admin/contenu/services", label: "Services", description: "Liste des services proposés." },
  { href: "/admin/contenu/offres", label: "Offres", description: "Essentiel, Signature, Sur Mesure." },
  { href: "/admin/contenu/transparence", label: "Transparence", description: "Les 4 points de transparence." },
  { href: "/admin/contenu/processus", label: "Processus", description: "Les 4 étapes de la méthode Evorya." },
  { href: "/admin/contenu/pourquoi-evorya", label: "Pourquoi Evorya", description: "Les points de la section de conversion." },
  { href: "/admin/contenu/faq", label: "FAQ", description: "Questions/réponses affichées avant Contact." },
  { href: "/admin/contenu/scanner", label: "Project Scanner", description: "Les 5 étapes et le texte final avant Contact." },
  { href: "/admin/contenu/contact", label: "Contact", description: "Textes d'introduction du formulaire." },
  { href: "/admin/contenu/footer", label: "Footer", description: "Textes du pied de page." },
];

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="text-2xl font-medium text-paper sm:text-3xl">Contenu du site</h1>
      <p className="mt-2 text-sm text-mist">
        Modifiez les textes et données métier publiés sur le site — la mise en
        page et les animations restent gérées dans le code.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex flex-col gap-2 bg-ink p-6 transition-colors hover:bg-paper/[0.04]"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm uppercase tracking-[0.2em] text-paper">
                {section.label}
              </span>
              <span className="font-display text-xs uppercase tracking-[0.2em] text-mist-dim transition-colors group-hover:text-paper">
                Modifier →
              </span>
            </div>
            <p className="text-sm text-mist">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
