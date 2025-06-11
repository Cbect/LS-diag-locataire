import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const diagnosticsDir = path.join(process.cwd(), 'diagnostics')
    const csvFilepath = path.join(diagnosticsDir, 'all-diagnostics.csv')

    // Vérifier si le fichier existe
    try {
      await fs.access(csvFilepath)
    } catch {
      return res.status(404).json({ message: 'No diagnostics found' })
    }

    // Lire le fichier
    const csvContent = await fs.readFile(csvFilepath, 'utf-8')

    // Définir les headers pour forcer le téléchargement
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="diagnostics-locservice.csv"')
    
    res.status(200).send(csvContent)
  } catch (error) {
    console.error('Error downloading diagnostics:', error)
    res.status(500).json({ message: 'Error downloading diagnostics' })
  }
}