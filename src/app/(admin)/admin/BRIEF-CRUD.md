# Feature Brief : admin-crud

## 1. Identité
Nom          : admin-crud
Priorité     : Critique
Estimé       : 8-10 heures
Date début   : Aujourd’hui

## 2. Description
Création des 4 sections CRUD du back-office : Vols, Colis, Produits, Messages. SEZY doit tout gérer en autonomie.

## 3. Qui est concerné ?
| Rôle  | Action autorisée                          |
|-------|-------------------------------------------|
| ADMIN | CRUD complet sur vols, colis, produits, messages |

## 4. Données impliquées
- Flights (features/flights)
- Parcel + ParcelStatusLog (features/tracking)
- Product (features/products)
- ContactMessage (features/contact)

## 5. Server Actions à réutiliser / créer
- createFlightAction / updateFlightAction
- createParcel / updateParcelStatus
- createProduct / updateProduct
- markMessageAsRead

## 6. Pages à générer
app/admin/
├── vols/
│   ├── page.tsx          ← Liste vols + bouton "Nouveau"
│   └── nouveau/page.tsx  ← Formulaire création/modification
├── colis/
│   ├── page.tsx          ← Liste colis
│   └── [id]/page.tsx     ← Mise à jour statut
├── produits/
│   ├── page.tsx          ← Liste produits
│   └── nouveau/page.tsx
└── messages/
    └── page.tsx          ← Liste messages + badge non lus

## 7. Definition of Done
- [ ] Protection ADMIN partout
- [ ] Forms avec Zod + ActionResult
- [ ] revalidatePath sur toutes les pages
- [ ] Design admin (gray cards, sezy-navy)
- [ ] Testé avec seed data
EOF