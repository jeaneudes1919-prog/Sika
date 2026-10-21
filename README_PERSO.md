# Notes personnelles — Sika

## Idées d'amélioration

**Facile**
- Ajouter une catégorie personnalisée (nom, icône, couleur).
- Afficher le budget restant par jour jusqu'à la fin du mois.
- Ajouter une option « Imprimer / PDF » sur la page Transactions.

**Moyen**
- Transactions récurrentes (loyer, abonnements) générées automatiquement.
- Import CSV (l'inverse de l'export) avec validation ligne par ligne.
- Navigation par mois sur le tableau de bord et les budgets.

**Difficile**
- Synchronisation multi-appareils avec un vrai backend.
- Mode hors ligne complet (PWA, service worker).
- Prévisions de solde basées sur les dépenses récurrentes.

## 5 exercices

1. Ajoutez un filtre « montant minimum / maximum » : modifiez `filterTransactions` (`src/lib/transactions.js`) puis écrivez le test.
2. Ajoutez une devise (USD) : `constants.js`, `format.js`, `Settings.jsx`.
3. Faites du seuil d'alerte (80 %) un réglage dans les Paramètres.
4. Ajoutez une action « Modifier » sur un objectif (nom, cible, date).
5. Remplacez `localStorage` par IndexedDB dans `src/lib/storage.js` sans toucher au reste.

## Concepts clés et où les voir

- **Reducer + Context** : `src/lib/financeReducer.js`, `src/context/FinanceContext.jsx`.
- **Fonctions pures testables** : `src/lib/*.js`, tests dans `src/test/`.
- **Persistance sécurisée** : `src/lib/storage.js` (try/catch).
- **Animation de compteur** : `src/hooks/useCountUp.js`.
- **Piège de focus et Échap** : `src/components/ui/Modal.jsx`.
- **Thème via variables CSS** : `src/index.css` + `tailwind.config.js`.
- **Glow qui suit le curseur** : `src/components/ui/Card.jsx` (variables CSS `--mx`, `--my`).
- **Annuler une suppression** : `Transactions.jsx` + `ToastContext.jsx`.

## Erreurs fréquentes à éviter

- Muter l'état directement au lieu de renvoyer un nouvel objet dans le reducer.
- Utiliser `toISOString()` pour des dates locales : décalage de fuseau possible (voir `toISO` dans `dates.js`).
- Oublier de normaliser les espaces insécables dans les tests de formatage `Intl`.
- Animer `width`/`height` au lieu de `transform` : saccades garanties.

## Décisions techniques

- **Montants stockés en FCFA** et convertis uniquement à l'affichage : une seule source de vérité.
- **`now` injectable** dans les fonctions pures : tests déterministes.
- **Données de démo générées avec un PRNG à graine** (mulberry32) : stables d'un chargement à l'autre.
- **React 18 / Router 6 / Vitest 2** : combinaison stable avec Vite 5.
- **Pas de TypeScript ni de lib d'état** : consigne de simplicité du projet.
