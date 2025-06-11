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
    
    // Vérifier si le dossier existe
    try {
      await fs.access(diagnosticsDir)
    } catch {
      return res.status(200).json([])
    }

    // Lire tous les fichiers JSON du dossier
    const files = await fs.readdir(diagnosticsDir)
    const jsonFiles = files.filter(file => file.endsWith('.json'))
    
    const diagnostics = []
    
    for (const file of jsonFiles) {
      try {
        const content = await fs.readFile(path.join(diagnosticsDir, file), 'utf-8')
        const data = JSON.parse(content)
        diagnostics.push(data)
      } catch (error) {
        console.error(`Error reading file ${file}:`, error)
      }
    }
    
    // Trier par date décroissante
    diagnostics.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    res.status(200).json(diagnostics)
  } catch (error) {
    console.error('Error getting diagnostics:', error)
    res.status(500).json({ message: 'Error getting diagnostics' })
  }
}