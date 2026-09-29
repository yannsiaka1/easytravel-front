# Déploiement du frontend EasyTravel

## Vercel

1. Déployer ce dossier comme projet Vite.
2. Ajouter la variable `VITE_API_URL` avec l’URL Railway du backend suivie de `/api`.
3. Redéployer après toute modification de la variable.

Exemple :

```text
VITE_API_URL=https://easytravel-back-production.up.railway.app/api
```

Le fichier `vercel.json` permet à React Router de fonctionner également lors d’un rafraîchissement direct d’une route telle que `/login` ou `/dashboard`.
