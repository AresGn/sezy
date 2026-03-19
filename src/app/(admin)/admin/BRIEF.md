# Feature Brief : admin-dashboard

## 1. Identité
Nom          : admin-dashboard
Priorité     : Critique (autonomie SEZY)
Estimé       : 6-7 heures
Date début   : Aujourd’hui

## 2. Description
Page principale /admin avec stats en temps réel + sidebar de navigation vers Vols, Colis, Produits et Messages. Seul accès ADMIN.

## 3. Qui est concerné ?
| Rôle  | Action autorisée                          | Action interdite |
|-------|-------------------------------------------|------------------|
| ADMIN | Voir stats, naviguer vers les CRUD        | -                |
| PUBLIC| Accéder à /admin                          | Interdit (middleware) |

## 4. Données impliquées
Entités lues : Flight, Parcel, Product, ContactMessage (via getAdminDashboardStats)

## 5. Règles métier
- Protection middleware + session (DOC 07)
- Stats : upcoming flights, parcels in transit, unread messages, etc. (DOC 04 section 9)

## 6. Composants nécessaires
| Composant               | Type   | Fichier |
|-------------------------|--------|--------|
| AdminSidebar            | Client | components/layout/AdminSidebar.tsx |
| DashboardStats          | Server | app/admin/page.tsx + cards |
| StatCard                | Server | réutilisable |

## 7. Effets de bord
- markMessageAsRead action
- revalidatePath sur toutes les pages admin

## 8. Definition of Done
- [ ] Protection /admin/* (middleware)
- [ ] Login page déjà existante
- [ ] Dashboard avec 4 cards stats (DOC 04)
- [ ] Sidebar navigation (Vols, Colis, Produits, Messages)
- [ ] Design System admin (gray-100 cards, sezy-navy accents)
- [ ] Testé avec seed data
EOF

