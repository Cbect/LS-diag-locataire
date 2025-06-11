import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const data = req.body
    
    // Créer le dossier diagnostics s'il n'existe pas
    const diagnosticsDir = path.join(process.cwd(), 'diagnostics')
    try {
      await fs.access(diagnosticsDir)
    } catch {
      await fs.mkdir(diagnosticsDir, { recursive: true })
    }

    // Créer un nom de fichier unique basé sur la date et l'heure
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `diagnostic-${timestamp}.json`
    const filepath = path.join(diagnosticsDir, filename)

    // Sauvegarder les données
    await fs.writeFile(filepath, JSON.stringify(data, null, 2))

    // Aussi maintenir un fichier CSV pour faciliter l'analyse
    const csvFilepath = path.join(diagnosticsDir, 'all-diagnostics.csv')
    
    // Créer l'en-tête CSV si le fichier n'existe pas
    let csvExists = true
    try {
      await fs.access(csvFilepath)
    } catch {
      csvExists = false
    }

    if (!csvExists) {
      const headers = [
        'Timestamp',
        'Date Départ Locataire',
        'Ville',
        'Loyer',
        'Type Logement',
        'Délai Relocation',
        'Clarté Titre',
        'Qualité Photos',
        'Description Filtrante',
        'Niveau Loyer',
        'Profils Candidats',
        'Score Total',
        'Diagnostic'
      ].join(',')
      await fs.writeFile(csvFilepath, headers + '\n')
    }

    // Ajouter la ligne de données
    const csvLine = [
      data.timestamp,
      data.dateDepartLocataire,
      data.villeLogement,
      data.loyerActuel,
      data.typeLogement,
      data.delaiRelocation,
      data.clarteTitre,
      data.qualitePhotos,
      data.descriptionFiltrante,
      data.niveauLoyer,
      data.profilsCandidats,
      data.totalScore,
      data.diagnostic
    ].map(field => `"${field}"`).join(',')

    await fs.appendFile(csvFilepath, csvLine + '\n')

    res.status(200).json({ message: 'Diagnostic saved successfully', filename })
  } catch (error) {
    console.error('Error saving diagnostic:', error)
    res.status(500).json({ message: 'Error saving diagnostic' })
  }
}