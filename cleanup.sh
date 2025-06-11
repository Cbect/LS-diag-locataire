#!/bin/bash

# Script pour nettoyer le projet et préparer le déploiement

echo "🧹 Nettoyage du projet pour Vercel..."

# Supprimer le dossier app s'il existe
if [ -d "app" ]; then
    echo "Suppression du dossier app..."
    rm -rf app
fi

# Supprimer le dossier app_backup s'il existe
if [ -d "app_backup" ]; then
    echo "Suppression du dossier app_backup..."
    rm -rf app_backup
fi

echo "✅ Nettoyage terminé!"
echo ""
echo "📝 Prochaines étapes:"
echo "1. git add ."
echo "2. git commit -m 'Remove app directory to fix Next.js routing conflict'"
echo "3. git push"
echo ""
echo "Vercel devrait maintenant pouvoir builder le projet sans erreur."