# Crédits photographiques — démos Templates

Toutes les photos ci-dessous viennent de Wikimedia Commons, sous licence libre.
Elles sont hébergées localement (téléchargées une fois, jamais de hotlink) —
voir `next.config.ts` (aucun domaine externe autorisé pour `next/image`).

Une mention de crédit doit rester visible dans le footer de chaque démo
concernée (licences CC BY / CC BY-SA) — voir `SiteFooter.tsx` de chaque
template.

## restaurant/ — « KRUSH » (fast-food)

Vingt photographies, toutes téléchargées une fois depuis Wikimedia Commons et
hébergées localement en 1920 px de large. L'attribution CC BY / CC BY-SA est
**obligatoire** et reste affichée dans le pied de page de la démo
(`PHOTO_CREDIT` dans `app/templates/restaurant/data.ts`) ; les images CC0 y
sont créditées par courtoisie.

Deux contraintes de sélection, appliquées image par image :

- **zéro alcool** — aucune bière, aucun vin, aucun cocktail, aucune bouteille
  ni aucun verre d'alcool, y compris en arrière-plan flou. Plusieurs clichés
  par ailleurs excellents (frites chargées en poêle, table vue de dessus) ont
  été écartés pour ce seul motif ;
- **aucune enseigne réelle lisible** — ni logo, ni gobelet de marque, ni
  devanture identifiable, l'enseigne « KRUSH » étant fictive et ne devant
  suggérer aucun lien avec une chaîne existante. Aucun visage identifiable non
  plus : les personnes n'apparaissent que par les mains (spatule, gobelet).

Série « DFC » de **PattayaPatrol** (CC BY-SA 4.0), sept images d'une même
campagne — c'est elle qui donne son unité d'étalonnage à la page :

- `signature-double-cheddar.jpg` — « DFC 2394 Double cheeseburger… ». Produit
  signature (section 02) et première vignette des best-sellers.
- `burger-macro-fondu.jpg` — « DFC 0744 Juicy melted-cheese burger… ». Geste
  n° 3 de « Monté à la commande ».
- `burger-frites-assiette.jpg` — « DFC 5014 Juicy bacon cheeseburger… ».
  Best-seller n° 03 et image plein cadre de l'appel final.
- `burger-planche-sauces.jpg` — « DFC 2284 A juicy sesame-topped burger… ».
  Onglet « Burgers » de la carte.
- `plancha-bacon-spatule.jpg` — « DFC 4101 Stacked and sizzling crispy
  bacon… ». Geste n° 1 de « Monté à la commande ».
- `chicken-burger-cheddar.jpg` — « DFC 1186 Crispy chicken burger… ». Onglet
  « Chicken » et troisième plan de la section crème.
- `shake-verse-glace.jpg` — « DFC 0816 …chocolatey smoothie is poured over
  ice… ». Onglet « Shakes » et contrepoint des frites chargées.
- `sundae-fraise.jpg` — « DFC 1244 Decadent strawberry sundae… ». Onglet
  « Desserts » et case du mur photo.

Autres images sous licence exigeant l'attribution :

- `loaded-frites-boites.jpg` — « Smashburger and poutine from Two Dads One
  Truck.jpg » par **The Bushranger**, CC BY-SA 4.0. Photo collante de la
  section « Loaded Frites ».
- `tenders-frites-ketchup.jpg` — « Chicken tenders and french fries - June
  2023 - Sarah Stierch.jpg » par **Missvain**, CC BY 4.0. Best-seller n° 04 et
  bandeau de la section crème.

Images CC0 (domaine public — attribution non requise, conservée par
courtoisie) :

- `hero-smash-trio.jpg` — « Bacon Burgers (Unsplash).jpg » par
  **Niklas Rhöse**. Photo du hero (seule image en `priority`) et vignette de
  couverture dans la galerie `/templates`.
- `chicken-slaw-portrait.jpg` — « Chicken Sandwich (Unsplash).jpg » par
  **Eaters Collective**. Best-seller n° 02 et grande verticale de « Crispy ».
- `burger-bokeh-soir.jpg` — « Gourmet Hamburger (Unsplash).jpg » par
  **Eaters Collective**. Grande case du mur photo.
- `burger-ardoise-noire.jpg` — « Single Hamburger (Unsplash).jpg » par
  **Markus Spiske**. Case « vue de dessus » du mur photo.
- `chicken-friture-paniers.jpg` — « Fried Chicken (Unsplash).jpg » par
  **Brian Chan**. Geste n° 2 et case du mur photo.
- `frites-bol-persil.jpg` — « Truffle Fries (Unsplash).jpg » par
  **Stephanie McCabe**. Onglet « Sides », section « Loaded » et mur photo.
- `cornet-glace-crepuscule.jpg` — « Ice Cream Dessert (Unsplash).jpg » par
  **Alex Jones**. Dernière case du mur photo.
- `plateau-rouge-emporter.jpg` — « Fast Food for Lunch (Unsplash).jpg » par
  **Christopher Flowers**. Onglet « Boissons » et spot Aïn Diab.
- `boite-emporter-cuir.jpg` — « Burger in a car (Unsplash).jpg » par
  **Oliur Rahman**. Mur photo et spot Agdal.
- `salle-vitrine-urbaine.jpg` — « A Window on Urban Dining (Unsplash).jpg »
  par **Jerry Kiesewetter**. Spot Maarif (panneau par défaut).

## immobilier/

Vingt-cinq photographies au total (démo « ATRIUM »), toutes téléchargées
depuis Wikimedia Commons et hébergées localement. Les dessins architecturaux
(SVG au trait, `visuals.tsx`) restent le langage secondaire — plan, coupe,
élévation — jamais un substitut à une photographie manquante : les six biens
portent désormais chacun au moins une photo. Attribution CC BY-SA / CC BY
**obligatoire** pour les images concernées, affichée dans `SiteFooter.tsx`
(liste `PHOTO_CREDITS` dans `data.ts`) ; les CC0 y sont créditées par
courtoisie.

- `villa-blanche.jpg` — « White house (Unsplash).jpg » par **Frøy Hamstad**, CC0.
  Grande photographie du hero derrière la fiche « Villa Ombrière ».
- `interieur-piece-vie.jpg` — « Modern luxury living room with kitchen
  interior.jpg » par **Nenad Stojković (Shixart1985)**, CC BY 2.0. Vignette « Intérieur — cuisine
  & matières » des fiches de biens.
- `escalier-volumes.jpg` — « Staircase and mirror walls (Unsplash).jpg » par
  **Dmitri Popov**, CC0. Vignette « Architecture — escalier & volumes » des fiches.
- `facade-lignes-blanches.jpg` — « Minimal white facade edge (Unsplash).jpg »
  par **Adam Birkett**, CC0. Planche R.03 du carnet de visite.
- `patio-arche-meknes.jpg` — « Bou Inania - courtyard through arch.jpg » par
  **Ariel Gera**, CC BY-SA 4.0. Grande photographie de la section « L'agence ».

- `architecture-zellige.jpg` — « Riad Laksiba-open-air-courtyard
  Marrakech.jpg » par **Maverickhawkesley**, CC0. Bloc « L'agence » et étape
  05 du carnet de visite.
- `architecture-patio.jpg` — « Riad Leila - Marrakech - Maroc - Mai 2005.jpg »,
  Flickr user **sdbj**, CC BY 2.0. Résolution native limitée (390×306) — à
  utiliser en petit panneau, jamais en grand hero. Photo d'appoint du Riad
  Nassim et étape 04 du carnet (« Plan — mesures »).
- `architecture-terrasse.jpg` — « Café Hafa, Tangier.jpg » par
  **Ideophagous**, CC BY-SA 4.0. Photo principale de la Villa Ombrière,
  panneau « Achat » des Services et diptyque du carnet de visite.
- `facade-blanche.jpg` — « White apartment building (Unsplash).jpg » par
  **Joel Filipe**, CC0. Hero (seule image en `priority`) et étape 01 du
  carnet (« Arrivée — extérieur »).
- `immeuble-balcons.jpg` — « Modern apartment building (Unsplash).jpg » par
  **Grant Lemons**, CC0. Photo principale de l'Appartement Cèdre et grande
  image d'ouverture de la Galerie architecturale (case G.01).
- `plateau-bureaux.jpg` — « White minimal interior (Unsplash).jpg » par
  **Breather**, CC0. Photo principale du Plateau Horizon.
- `interieur-cuisine.jpg` — « Kitchen (Unsplash).jpg » par **Naomi Hébert**,
  CC0. Photo principale du Duplex Sérac.
- `detail-escalier-beton.jpg` — « Level D1 Concrete Staircase (Unsplash).jpg »
  par **Tobias van Schneider**, CC0. Grande image du carnet de visite.
- `detail-ombre-portee.jpg` — « Wall shadow (Unsplash).jpg » par
  **rawpixel.com**, CC0. Bandeau de matière entre « L'agence » et
  « Services ».
- `salon-lumiere.jpg` — « Living room (Unsplash).jpg » par **Jarosław
  Ceborski**, CC0. Photo d'appoint de l'Appartement Cèdre et panneau
  « Location » des Services.
- `salon-loft.jpg` — « Furnished living room. (Unsplash).jpg » par
  **Stephen Di Donato**, CC0. Galerie architecturale, case G.05.
- `chambre-loft.jpg` — « NY loft bedroom (Unsplash).jpg » par **Gabriel
  Beaudry**, CC0. Photo principale du Loft Atelier Nord.
- `chambre-lumiere.jpg` — « Bedroom window (Unsplash).jpg » par **Viktoria
  Hall-Waldhauser**, CC0. Galerie architecturale (case G.04) et étape 02 du
  carnet de visite (« Lumière — orientation »).
- `escalier-blanc.jpg` — « White staircase (Unsplash).jpg » par **Todd
  Quackenbush**, CC0. Photo d'appoint du Duplex Sérac (« escalier central en
  béton ciré »).
- `galerie-arches.jpg` — « Hallway of marble arches (Unsplash).jpg » par
  **Alex Holyoake**, CC0. Galerie architecturale (case G.02, grande
  verticale) et bandeau photographique du bloc « L'agence ».
- `detail-bois.jpg` — « Geometric wood pattern (Unsplash).jpg » par **Teo
  Duldulao**, CC0. Photo d'appoint du Loft Atelier Nord.
- `facade-vitree.jpg` — « Regular glass facade (Unsplash).jpg » par **Joel
  Filipe**, CC0. Photo d'appoint du Plateau Horizon (« façade vitrée
  continue »).
- `terrasse-piscine.jpg` — « Drone pool and deck chairs (Unsplash).jpg » par
  **Tim Gouw**, CC0. Photo d'appoint de la Villa Ombrière et moment
  cinématique de clôture de la Galerie architecturale (case G.06, image qui
  s'agrandit au scroll).
- `detail-pierre.jpg` — « Rectangle stone wall (Unsplash).jpg » par **Reiner
  Knudsen**, CC0. Galerie architecturale (case G.03), étape 03 du carnet
  (« Matières — détails ») et panneau « Gestion » des Services.
- `patio-bahia.jpg` — « Small Courtyard Bahia Palace (31363670054).jpg » par
  **George Rex** (Images George Rex), CC BY-SA 2.0. Photo principale du Riad
  Nassim.

## cabinet/

Toutes en CC0 (domaine public — attribution non requise, conservée par
courtoisie). Architecture, matière et lieux de travail uniquement : aucun
portrait, afin qu'aucune personne réelle ne puisse être prise pour un associé
du cabinet fictif « Verdon & Associés ». Les bâtiments photographiés n'ont
évidemment aucun lien avec ce cabinet, ce que rappelle la mention du footer.

- `facade-grille.jpg` — « Gray office building facade (Unsplash).jpg » par
  **Echo Grid** (Blaak, Rotterdam), CC0. Hero, sous la trame tracée.
- `architecture-blanche.jpg` — « Austere white marble facade (Unsplash).jpg »
  par **Adam Birkett** (Londres), CC0. Diptyque de « Le cabinet ».
- `tour-symetrie.jpg` — « Gray skyscraper facade (Unsplash).jpg » par
  **Mike Wilson**, CC0. Bande pleine largeur entre Domaines et Méthode.
- `archives-dossiers.jpg` — « Archive storage (Unsplash).jpg » par
  **Samuel Zeller**, CC0. Plaque « Méthode ».
- `galerie-bureaux.jpg` — « Outdoor corporate hallway (Unsplash).jpg » par
  **Simon Launay**, CC0. Plaque « Méthode ».
- `volumes-blancs.jpg` — « White Bauhaus architecture (Unsplash).jpg » par
  **Samuel Zeller** (Bauhaus-Archiv, Berlin), CC0. Marge du cas A.
- `escalier-courbe.jpg` — « Curve in white marble stairs (Unsplash).jpg » par
  **Daniel von Appen** (Cologne), CC0. Marge du cas B.
- `salle-reunion.jpg` — « Minimalist meeting room (Unsplash).jpg » par
  **Breather**, CC0. Colonne de gauche de « Prendre rendez-vous ».

## hotel/

Toutes sous licence CC BY-SA : l'attribution est **obligatoire** et reste
affichée dans le pied de page de la démo (`PHOTO_CREDIT` dans
`app/templates/hotel/data.ts`). Ce sont des images d'ambiance de maisons
d'hôtes marocaines réelles ; le « Riad Zellige » étant fictif, les `alt`
décrivent la scène et n'affirment jamais documenter cet établissement.

- `cour-nuit.jpg` — « Riad Papillon patio at night.jpg » par
  **Marrakechriads**, CC BY-SA 3.0. Hero plein écran (seule image en
  `priority`).
- `cour-lumiere.jpg` — « Riad Cinnamon patio.jpg » par **Marrakechriads**,
  CC BY-SA 3.0. Grande image en arche de la section « Le riad ».
- `chambre-safran.jpg` — « The romantic Fez suite at riad Cinnamon.jpg » par
  **Marrakechriads**, CC BY-SA 3.0. Chambre Safran.
- `suite-bahia.jpg` — « The luxurious Meknes suite at riad Cinnamon.jpg » par
  **Marrakechriads**, CC BY-SA 3.0. Suite Bahia.
- `terrasse-suite.jpg` — « Magical Dar Habiba Marrakech.JPG » par
  **Marrakechriads**, CC BY-SA 3.0. Suite Terrasse + case « 17 h 20 » de la
  galerie (deux cadrages différents).
- `terrasse-crepuscule.jpg` — « Riad Cinnamon roof terrace at night.jpg » par
  **Marrakechriads**, CC BY-SA 3.0. Bande plein écran « L'heure bleue »
  (parallaxe lente).
- `table-du-soir.jpg` — « RIAD DAR ATTA MARRAKECH MOROCCO APRIL 2013
  (8700305314).jpg » par **calflier001**, CC BY-SA 2.0. Grande case de la
  galerie.
- `bassin-zellige.jpg` — « Riad Maroc 034.JPG » par **Arnaud 25**,
  CC BY-SA 3.0. Plan de matière de la colonne « Sur place ».
- `bassin-patio-riad.jpg` — « 11 Terrace pool 11.jpg » par **Dutch Morocco
  Investments SARL**, CC BY-SA 4.0. Case « 14 h 10 — Le bassin » de la galerie.
- `chambre-menthe.jpg` — « Riad in Fes (5364068679).jpg » par **Michal
  Osmenda**, CC BY-SA 2.0. Chambre Menthe.
- `hammam-marrakech.jpg` — « Marrakesh museum DSCF9258.jpg » par **R
  Prazeres**, CC BY-SA 4.0. Case « Le hammam » de la galerie.
- `ruelle-medina-marrakech.jpg` — « Marrakesh Medina Alley west of Zawiya of
  Sidi Muhammad Ben Slimane.jpg » par **Ymblanter**, CC BY-SA 4.0. Section
  « Le lieu ».

## beaute/

Les photographies d'architecture Wikimedia sont sous CC BY-SA 4.0. Les
photographies Pexels sont utilisées selon la licence Pexels. Les crédits
restent affichés dans le pied de page de la démo (`PHOTO_CREDIT` dans
`app/templates/beaute/data.ts`). Les `alt` décrivent la scène et n'affirment
jamais documenter l'institut fictif.

- `cabine-lumiere.jpg` — « YHI Spa treatment room at Paradisus by Meliá
  Bali.jpg » par **Paradisus Bali**, CC BY-SA 4.0. Photo d'ouverture (seule
  image en `priority`).
- `coupole-platre.jpg` — « Hammam Saffarin DSCF6572.jpg » par **R Prazeres**
  (hammam Saffarin, Fès), CC BY-SA 4.0. Photo éditoriale de « L'institut »,
  parallaxe lente.
- `hammam-pierre.jpg` — « Alaaddin Hamamı, Avanos - hot room with göbek
  taşı.jpg » par **DiliyaKhazigalievaGul**, CC BY-SA 4.0. Bande pleine largeur
  « Le rituel hammam » entre le déroulé et la carte.
- `sol-marbre.jpg` — « Hammam Saffarin 20260705 115112.jpg » par
  **R Prazeres**, CC BY-SA 4.0. Colonne « matière » collante de la section
  « Le déroulé ».
- `salle-arcades.jpg` — « Hammam Saffarin 20260705 114042.jpg » par
  **R Prazeres**, CC BY-SA 4.0. Grande case de la mosaïque « Le lieu ».
- `mur-stuc-bois.jpg` — « Hammam Saffarin DSCF6585.jpg » par **R Prazeres**,
  CC BY-SA 4.0. Seconde case photographique de la mosaïque « Le lieu ».
- `preparation-huiles-spa.jpg` — « Beauty Treatment Oils » par **Tuğba ÖZTÜRK**,
  licence Pexels. Case « Préparation » de la mosaïque « Le lieu ».
- `cabine-spa-lumiere-chaude.jpg` — « Massage Table in the Room » par
  **KoolShooters**, licence Pexels. Case « Cabine 2 » de la mosaïque « Le lieu ».
- `soin-visage-massage.jpg` — « Aesthetician Doing a Facial Massage » par
  **Ivan S**, licence Pexels. Hero et soin signature visage. Source :
  <https://www.pexels.com/photo/aesthetician-doing-a-facial-massage-5659010/>.
- `massage-huile-dos.jpg` — « A Masseuse with Massage Oil on Her Hands » par
  **Kaboompics / Karolina Grabowska**, licence Pexels. Soin signature corps et
  mosaïque éditoriale. Source :
  <https://www.pexels.com/photo/a-masseuse-with-massage-oil-on-her-hands-6629609/>.
- `serum-pipette.jpg` — « Close-up of Woman Applying a Cosmetic Product with a
  Pipette on Her Hand » par **PNW Production**, licence Pexels. Détail matière
  et mosaïque éditoriale. Source :
  <https://www.pexels.com/photo/close-up-of-woman-applying-a-cosmetic-product-with-a-pipette-on-her-hand-9219014/>.

## automobile/

Neuf photographies de gestes et de matière d'atelier (pas de plan d'ensemble
de véhicule). Choix délibéré : aucun cliché où un logo de constructeur réel
serait lisible au premier plan — le « Garage Vortex » est fictif et ne doit
suggérer aucun partenariat officiel avec une marque. Les `alt` décrivent la
scène photographiée, jamais l'établissement fictif. L'attribution CC BY est
**obligatoire** et reste affichée dans le pied de page (`PHOTO_CREDIT` dans
`app/templates/automobile/data.ts`).

- `atelier-pont-suspension.jpg` — « Car mechanic worker repairing suspension
  of lifted automobile at auto repair garage shop.jpg » par **Shixart1985**,
  CC BY 2.0. Panneau du héros (seule image en `priority`), surmontée du profil
  coté SVG.
- `commande-pont-elevateur.jpg` — « Old car raised on car lift for diagnostics
  in workshop.jpg » par **Shixart1985**, CC BY 2.0. Colonne gauche de la
  section « Accès & horaires » (parallaxe).
- `mur-outillage.jpg` — « Garage tools collection - 51362112332.jpg » par
  **Nenad Stojkovic**, CC BY 2.0. Grand panneau de la bande « Matière &
  outillage ».
- `detail-papillon-admission.jpg` — « Car engine part shows details of
  throttle body and surrounding components during a repair in a garage.jpg »
  par **Shixart1985**, CC BY 2.0. Premier détail de la mosaïque « Matière ».
- `gomme-pneumatiques.jpg` — « Dirty car tires stacked in front of
  mechanic.jpg » par **PheobeLongneck**, CC0 (attribution non requise,
  conservée par courtoisie). Second détail de la mosaïque « Matière ».
- `collecteur-admission.jpg` — « Engine components displayed in a red car
  during a mechanical inspection process at a garage.jpg » par
  **Shixart1985**, CC BY 2.0. Fiche d'intervention VX-2417.
- `bougie-allumage.jpg` — « Car engine maintenance involves a mechanic
  inspecting and adjusting parts under the hood.jpg » par **Shixart1985**,
  CC BY 2.0. Fiche d'intervention VX-2388.
- `freinage-disque-atelier.jpg` — « Rusty brake disc seen on a car located in
  a garage during the afternoon hours on a well-worn gravel surface.jpg » par
  **Shixart1985**, CC BY 2.0. Fiche d'intervention VX-2402.
- `geometrie-banc-atelier.jpg` — « Machine is used for checking tire alignment
  at a garage in a busy city.jpg » par **Shixart1985**, CC BY 2.0. Fiche
  d'intervention VX-2371.
