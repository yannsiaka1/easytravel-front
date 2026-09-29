# EasyTravel Frontend

Interface React/Vite de l'application académique **EasyTravel**.

## Fonctionnalités

- site vitrine responsive ;
- inscription et connexion ;
- espace client protégé ;
- recherche et sélection de voyages ;
- réservation, simulation de paiement et historique ;
- espace agent pour les voyages et les utilisateurs ;
- navigation responsive sur mobile et desktop.

## Installation locale

```bash
npm install
cp .env.example .env
npm run dev
```

Le backend Laravel doit être disponible et `VITE_API_URL` doit pointer vers son préfixe `/api`.

## Vérifications

```bash
npm run lint
npm run build
```

## Déploiement

Voir [`DEPLOYMENT.md`](DEPLOYMENT.md) pour Vercel et la connexion à l'API Railway.
