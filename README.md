# Sika — Suivi de budget personnel

Application de finances personnelles, claire et très visuelle, 100 % frontend. Suivez vos revenus et dépenses en FCFA, fixez des budgets par catégorie et atteignez vos objectifs d'épargne.

## Fonctionnalités

- **Tableau de bord** : carte de solde animée, revenus/dépenses du mois avec variation, anneau par catégorie (légende interactive), barres sur 6 mois, courbe du solde, 5 dernières transactions.
- **Transactions** : ajout/modification via modale, suppression avec « Annuler », liste groupée par date, recherche, filtres (type, catégorie, période), tri (date, montant), export CSV.
- **Budgets** : un budget mensuel par catégorie, anneau de progression, orange à 80 %, rouge au dépassement, montant restant.
- **Objectifs d'épargne** : création, contributions, progression animée, estimation de la date d'atteinte, confettis à 100 %.
- **Paramètres** : thème sombre/clair mémorisé, affichage FCFA/EUR (taux fixe 655,957), réinitialisation des données de démonstration.
- Données de démonstration sur 3 mois, persistance `localStorage`, skeletons au chargement.

## Stack technique

React 18 · Vite 5 · Tailwind CSS 3.4 · Framer Motion · Recharts · React Router 6 · Lucide · Inter Variable (@fontsource) · Vitest + Testing Library.

## Installation

```bash
npm install
npm run dev      # serveur de développement
npm run test     # tests unitaires
npm run lint     # ESLint
npm run build    # build de production
```

## Structure

```
src/
  components/{ui,layout,dashboard,transactions,budgets,goals}
  pages/        Dashboard, Transactions, Budgets, Goals, Settings, NotFound
  context/      Finance (useReducer + persistance), Theme, Toast
  lib/          logique métier pure et testée (totaux, filtres, budgets, objectifs, CSV, formats)
  data/         catégories et générateur de données de démonstration
  hooks/        useCountUp
  test/         tests Vitest
```

## Captures d'écran

- `docs/dashboard.png` — tableau de bord (thème sombre)
- `docs/transactions.png` — liste et filtres
- `docs/budgets.png` — anneaux de budgets
- `docs/objectifs.png` — objectifs et confettis
- `docs/mobile.png` — barre d'onglets mobile

## Ce que ce projet démontre

- Séparation nette entre logique métier pure (`src/lib`, testée) et affichage.
- Gestion d'état sans dépendance externe (reducer + Context) avec persistance.
- Design system à base de variables CSS, thème clair/sombre, animations sur transform/opacity, `prefers-reduced-motion` respecté.
- Accessibilité : navigation clavier, modales avec piège de focus et Échap, aria-labels, contrastes AA.
- Responsive mobile first : barre latérale sur ordinateur, onglets fixes sur mobile.
