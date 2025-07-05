# Booking AI - Frontend

Ce projet utilise [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [Tailwind CSS](https://tailwindcss.com/) + [Supabase](https://supabase.com/).

## 🚀 Technologies utilisées

- **React 19** - Framework JavaScript moderne
- **Vite** - Outil de build ultra-rapide
- **Tailwind CSS v4** - Framework CSS utilitaire moderne
- **Supabase** - Backend-as-a-Service (BaaS)

## 🛠️ Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer Supabase :
   - Créer un fichier `.env` à la racine du projet
   - Ajouter vos variables d'environnement Supabase (voir `SUPABASE_SETUP.md`)

3. Lancer le serveur de développement :
```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur pour voir le résultat.

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   └── SupabaseExample.jsx
├── lib/                # Configuration et utilitaires
│   └── supabase.js     # Configuration Supabase
├── assets/             # Assets statiques
├── App.jsx             # Composant principal
└── index.css           # Styles Tailwind CSS
```

## 🎨 Tailwind CSS

Le projet utilise Tailwind CSS v4 avec une configuration moderne. Les classes utilitaires sont disponibles dans tous les composants.

## 🔥 Supabase

- Configuration dans `src/lib/supabase.js`
- Exemple d'utilisation dans `src/components/SupabaseExample.jsx`
- Documentation complète dans `SUPABASE_SETUP.md`

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build pour la production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Lance ESLint

## 🚀 Déploiement

Le projet peut être déployé sur Vercel, Netlify, ou tout autre plateforme supportant les applications Vite + React.
