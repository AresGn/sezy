# Checklist de tests manuels SEZY (Module Logistique)

## 1. Interface & Design (DOC 09)
- [ ] **Hero Section** : Titre "Logistique & Transport Europe ↔ Afrique", bouton "Calculer mon tarif" scrolle vers l'ancre `#calculator`.
- [ ] **Comment ça marche** : 3 étapes claires (Dépôt, Expédition, Récupération) avec icônes `Package`, `Plane`, `CheckCircle`.
- [ ] **Tarifs officiels** : Tableau affichant 20€/kg (Paris) et 10 000 FCFA/kg (Cotonou). Note sur l'arrondi visible.
- [ ] **Responsive** : Pas de débordement horizontal sur mobile (375px). Stepper et cartes empilés verticalement si besoin.

## 2. Simulateur de Tarifs (PriceCalculator)
- [ ] **Direction** : Le changement de direction (Paris ➜ Cotonou / Cotonou ➜ Paris) met à jour les prix instantanément.
- [ ] **Poids (Arrondi DM-003)** : 
  - [ ] Saisie `4.2` kg → affiche un poids facturé de `5` kg.
  - [ ] Saisie `0.5` kg → affiche un poids facturé de `1` kg (minimum).
- [ ] **Calcul double devise** : Affiche le montant en € et ≈ FCFA avec la police `font-mono`.
- [ ] **Bouton WhatsApp** : Ouvre le lien avec le message contextuel `logistics` pré-rempli.

## 3. Calendrier des Vols (FlightCalendar)
- [ ] **Données réelles** : Affiche les vols `SCHEDULED` récupérés depuis la DB (via le seed).
- [ ] **Tri** : Vols triés du plus proche au plus lointain.
- [ ] **Bannière "Prochain vol"** : Affiche la date exacte du vol le plus proche en haut de page.
- [ ] **État vide** : Si aucun vol en DB, affiche le message "Aucun vol programmé...".

## 4. Technique & Performance (DOC 08)
- [ ] **SEO** : Balise `<title>` correcte : "Logistique Paris Cotonou | Envoi colis 20€/kg...".
- [ ] **Console F12** : Aucune erreur d'hydratation ou d'import.
- [ ] **Vitesse** : Pas de CLS (Cumulative Layout Shift) lors du chargement des composants serveur.

## Checklist Finale Avant Déploiement
- [ ] `npm run type-check` → OK
- [ ] `npm run lint` → OK
- [ ] `npm run test` → OK
- [ ] `npm run build` → OK
