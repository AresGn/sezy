## 📋 Description
<!-- Décris les changements effectués -->

## 🎯 Type de changement
- [ ] feat — Nouvelle fonctionnalité
- [ ] fix — Correction de bug
- [ ] refactor — Refactoring sans nouvelle feature
- [ ] docs — Documentation uniquement
- [ ] style — Formatage / style (pas de logique)
- [ ] test — Ajout/modification de tests
- [ ] chore — Maintenance, dépendances

## ✅ Checklist Dev Foundation Kit SEZY

### Architecture (DOC 02)
- [ ] Server Component par défaut — 'use client' justifié si présent
- [ ] Aucun import Prisma hors de lib/db.ts et des services
- [ ] Mutations via Server Actions uniquement
- [ ] Aucune logique métier dans les composants UI

### Conventions (DOC 06)
- [ ] TypeScript strict — zéro any
- [ ] Zéro console.log de debug
- [ ] Imports dans le bon ordre
- [ ] Commentaire d'en-tête sur les nouveaux fichiers

### Design System (DOC 09)
- [ ] Bouton WhatsApp = bg-whatsapp (#25D366) uniquement
- [ ] Images = next/image (jamais `<img>`)
- [ ] Pas de framer-motion
- [ ] Couleurs des pôles respectées (logistics/shopping/studies)

### Sécurité (DOC 07)
- [ ] Aucune donnée sensible dans le code
- [ ] Numéros WhatsApp depuis process.env
- [ ] Variables sensibles dans .env.example (valeurs vides)

### Tests (DOC 08)
- [ ] Tests écrits pour la nouvelle logique
- [ ] `npm run test` → ✅ tous les tests passent
- [ ] `npm run type-check` → ✅ 0 erreur

## 📸 Captures d'écran (si UI modifiée)
<!-- Ajouter des screenshots desktop + mobile -->
