# Feature Brief : parcel-tracking

## 1. Identité
Nom          : parcel-tracking
Priorité     : Critique
Estimé       : 3 heures
Date début   : Aujourd’hui

## 2. Description (une seule phrase)
Permettre à tout visiteur de saisir son code SEZY-YYYY-NNNN et voir en temps réel les 4 étapes du colis + note actuelle + vol associé (si lié).

## 3. Qui est concerné ?
| Rôle   | Action autorisée                  | Action interdite          |
|--------|-----------------------------------|---------------------------|
| PUBLIC | Rechercher par code + voir statut | Modifier quoi que ce soit |
| ADMIN  | Rechercher + voir phones (back-office) | -                     |

## 4. Données impliquées (référence DOC 03)
Entités lues      : Parcel + ParcelStatusLog + Flight (optionnel)
Entités créées    : aucune
Entités modifiées : aucune

## 5. Règles métier (référence DOC 03)
Aucune règle DM (lecture seule). Masquer senderPhone + recipientPhone (sécurité DOC 07).

## 6. Server Actions nécessaires (référence DOC 04)
| Action                  | Auth   | Schema Zod                          | Effets de bord      |
|-------------------------|--------|-------------------------------------|---------------------|
| searchParcelByCode()    | PUBLIC | TrackingSearchSchema (regex SEZY-YYYY-NNNN) | aucun              |

## 7. Composants nécessaires
| Composant         | Type   | Fichier                                      |
|-------------------|--------|----------------------------------------------|
| TrackingForm      | Client | features/tracking/components/TrackingForm.tsx |
| TrackingStatus    | Client | features/tracking/components/TrackingStatus.tsx |
| TrackingSteps     | Client | features/tracking/components/TrackingSteps.tsx (stepper 4 étapes) |

## 8. Effets de bord
- Aucun (lecture pure)
- Bouton WhatsApp pré-rempli "tracking" via lib/whatsapp.ts

## 9. Definition of Done
- [ ] Types dans types.ts
- [ ] Service + action avec Zod + ActionResult
- [ ] TrackingForm + TrackingStatus + TrackingSteps
- [ ] Page /suivi/page.tsx qui intègre tout
- [ ] Design System DOC 09 respecté (stepper avec couleurs logistics, font-mono pour code, etc.)
- [ ] Testé avec code valide / invalide / inexistant
- [ ] PageSpeed mobile non dégradé