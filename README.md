# Diagnostic LocService

Application web de diagnostic pour la mise en location de biens immobiliers, basée sur l'expérience de +6000 dossiers locatifs.

## 🚀 Installation

1. Cloner le repository
```bash
git clone [votre-repo]
cd locservice-diagnostic
```

2. Installer les dépendances
```bash
npm install
```

3. Lancer le serveur de développement
```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

## 📁 Structure du projet

```
locservice-diagnostic/
├── pages/
│   ├── api/
│   │   ├── save-diagnostic.ts      # Sauvegarde des diagnostics
│   │   ├── get-diagnostics.ts      # Récupération des diagnostics
│   │   └── download-diagnostics.ts # Téléchargement CSV
│   ├── admin/
│   │   └── index.tsx              # Page d'administration
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx                  # Page principale du diagnostic
├── diagnostics/                   # Dossier créé automatiquement pour stocker les données
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## 🌐 Déploiement sur Vercel

1. Pusher votre code sur GitHub

2. Connecter votre repository à Vercel
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer sur "Import Project"
   - Sélectionner votre repository GitHub
   - Laisser les paramètres par défaut
   - Cliquer sur "Deploy"

3. Configuration importante pour Vercel
   - Les fichiers seront stockés temporairement sur Vercel (les fonctions serverless ont un stockage éphémère)
   - Pour une solution de stockage permanent, vous devrez intégrer une base de données ou un service de stockage cloud

## 💾 Stockage des données

### En développement local
- Les diagnostics sont sauvegardés dans le dossier `/diagnostics`
- Chaque diagnostic est enregistré en JSON individuel
- Un fichier CSV consolidé `all-diagnostics.csv` est maintenu

### En production (Vercel)
⚠️ **Important** : Vercel utilise des fonctions serverless avec un système de fichiers éphémère. Les options recommandées pour la persistance des données sont :

1. **Base de données** (Recommandé)
   - PostgreSQL avec Vercel Postgres
   - MongoDB Atlas
   - Supabase

2. **Stockage cloud**
   - AWS S3
   - Cloudinary
   - Firebase Storage

## 📊 Fonctionnalités

- **Diagnostic en 2 étapes** : Collecte d'informations sur la situation et évaluation de la mise en location
- **Scoring interactif** : Système de notation sur 15 points avec recommandations personnalisées
- **Sauvegarde automatique** : Enregistrement JSON et CSV des diagnostics
- **Interface d'administration** : Visualisation et téléchargement des diagnostics sur `/admin`
- **Design responsive** : Interface adaptée mobile et desktop

## 🔐 Sécurité

Pour sécuriser la page d'administration en production, vous pouvez :
- Ajouter une authentification (NextAuth.js)
- Protéger l'endpoint avec une clé API
- Restreindre l'accès par IP

## 📝 License

MIT