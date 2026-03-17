# Checklist de tests manuels SEZY (Module Tracking)

- [ ] Code valide (SEZY-2026-0001 du seed) → affiche le stepper avec **RECEIVED_PARIS** en highlight + note + emoji 📦
- [ ] Code invalide format (ABC-123) → erreur Zod claire "Format invalide. Exemple : SEZY-2026-0042"
- [ ] Code inexistant → message "Aucun colis trouvé..." (NOT_FOUND via ActionResult)
- [ ] Bouton WhatsApp contextuel "tracking" s’ouvre avec le bon message pré-rempli
- [ ] Responsive mobile (iPhone SE 375px) → formulaire plein écran, stepper horizontal OK
- [ ] PageSpeed mobile (ouvre https://pagespeed.web.dev) → doit être **> 85/100** (sinon on optimise)
- [ ] Opera Mini + Chrome mobile (simule 3G/4G lente au Bénin)
- [ ] Pas d’erreur console (F12)

## Checklist Finale Avant Déploiement

**TECHNIQUE**
- [ ] npm run type-check → 0 erreur
- [ ] npm run lint → 0 warning
- [ ] npm run test:coverage → coverage ≥ 75%
- [ ] npm run build → succès

**PERFORMANCE**
- [ ] PageSpeed mobile /suivi > 85/100
- [ ] Temps chargement < 3s en 4G simulée

**SÉCURITÉ**
- [ ] senderPhone + recipientPhone jamais visibles côté client
- [ ] /suivi indexée pour le SEO

**FORMATION SEZY**
- [ ] Montrer la page à SEZY en local
