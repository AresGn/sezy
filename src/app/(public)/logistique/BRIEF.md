
# Feature Brief : logistique-page

## 1. Identité
Nom          : logistique-page
Priorité     : Critique (page n°1 du client)
Estimé       : 5-6 heures
Date début   : Aujourd’hui

## 2. Description
Page publique complète "Logistique & Transport" qui présente le pôle, le calculateur de prix, le calendrier vols et les tarifs. Objectif : conversion immédiate via WhatsApp.

## 3. Qui est concerné ?
| Rôle   | Action autorisée                          | Action interdite |
|--------|-------------------------------------------|------------------|
| PUBLIC | Voir tarifs, utiliser calculateur, voir vols, réserver via WhatsApp | Modifier données |
| ADMIN  | (via back-office séparé)                  | - |

## 4. Données impliquées
Entités lues      : Flight (via features/flights) + calcul pur (features/calculator)
Entités créées    : aucune
Entités modifiées : aucune

## 5. Règles métier
- Calculateur : arrondi au kg supérieur (DOC 04)
- Vols : uniquement SCHEDULED + departureDate futur
- WhatsApp : message pré-rempli "logistics" (lib/whatsapp.ts)

## 6. Composants nécessaires
| Composant              | Type   | Emplacement |
|------------------------|--------|-------------|
| PriceCalculator        | Client | features/calculator/components/ |
| FlightCalendar         | Server | features/flights/components/ |
| NextFlightBanner       | Server | features/flights/components/ |
| HowItWorksSteps        | Server | page locale |
| TarifTable             | Server | page locale |

## 7. Effets de bord
- Bouton WhatsApp contextuel "logistics"
- revalidatePath automatique via les features

## 8. Definition of Done
- [ ] BRIEF validé
- [ ] Page /logistique/page.tsx avec metadata SEO
- [ ] Assemble features/flights + features/calculator
- [ ] Design System DOC 09 100 % respecté (couleurs logistics partout)
- [ ] PageSpeed mobile > 85
- [ ] Testé avec calculateur + vols du seed
EOF