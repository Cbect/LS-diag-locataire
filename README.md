# Diagnostic LocService

Application web de diagnostic pour la mise en location de biens immobiliers, basée sur l'expérience de +6000 dossiers locatifs réels.

## 🎯 Objectif

En moyenne, un bien met 42 jours à être reloué. Plus de 50% des bailleurs n'optimisent ni leur annonce, ni leur loyer. Ce diagnostic gratuit et anonyme aide à identifier ce qui freine la mise en location et comment y remédier.

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
│   │   └── health.ts              # Endpoint de santé
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx                  # Page principale du diagnostic
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
   - Framework Preset : **Next.js**
   - Laisser les autres paramètres par défaut
   - Cliquer sur "Deploy"

## 📊 Fonctionnalités

- **Diagnostic en 2 étapes** : 
  - Étape 1 : Collecte d'informations sur la situation actuelle
  - Étape 2 : Évaluation de la mise en location (5 critères notés)
  
- **Scoring interactif** : 
  - Système de notation sur 15 points
  - Recommandations personnalisées selon le score
  - Visualisation avec pastilles colorées (🔴🟡🟢)

- **Génération PDF** : 
  - Téléchargement du diagnostic en PDF
  - Récapitulatif complet avec recommandations
  - Format professionnel prêt à imprimer

- **100% Gratuit et Anonyme** : 
  - Aucune inscription requise
  - Aucune donnée personnelle collectée
  - Résultats immédiats

## 🎨 Design

- Interface moderne et responsive (Tailwind CSS)
- Expérience utilisateur optimisée mobile et desktop
- Animations fluides et feedback visuel
- Accessibilité garantie

## 📈 Scores et Recommandations

- **🔴 5 à 8 points** : Risque élevé - L'annonce n'attire pas les bons profils
- **🟡 9 à 12 points** : Moyennement optimisée - Quelques améliorations peuvent tout changer
- **🟢 13 à 15 points** : Prête à louer rapidement !

## 🔧 Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## 📝 License

MIT