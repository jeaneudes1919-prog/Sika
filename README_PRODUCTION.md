# Pour plus tard — mise en production (rien n'est implémenté)

- **Hébergement statique** : Netlify, Vercel, Cloudflare Pages ou GitHub Pages (`npm run build`, dossier `dist`). Prévoir une règle de réécriture vers `index.html` (routes React Router).
- **Docker** : image Nginx servant `dist` avec fallback SPA.
- **CI/CD** : GitHub Actions — `npm ci`, `npm run lint`, `npm run test`, `npm run build`, déploiement.
- **Variables d'environnement** : aucune aujourd'hui ; si un backend apparaît, utiliser `VITE_API_URL`.
- **Optimisation** : découpage du bundle (`React.lazy` par page, `manualChunks` pour Recharts), audit Lighthouse, PWA hors ligne.
