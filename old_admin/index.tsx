import { useState, useEffect } from 'react'
import type { NextPage } from 'next'

interface Diagnostic {
  timestamp: string
  dateDepartLocataire: string
  villeLogement: string
  loyerActuel: string
  typeLogement: string
  delaiRelocation: string
  clarteTitre: number
  qualitePhotos: number
  descriptionFiltrante: number
  niveauLoyer: number
  profilsCandidats: number
  totalScore: number
  diagnostic: string
}

const AdminPage: NextPage = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDiagnostics()
  }, [])

  const fetchDiagnostics = async () => {
    try {
      const response = await fetch('/api/get-diagnostics')
      if (response.ok) {
        const data = await response.json()
        setDiagnostics(data)
      }
    } catch (error) {
      console.error('Error fetching diagnostics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    window.location.href = '/api/download-diagnostics'
  }

  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100
    if (percentage <= 53) return 'text-red-600'
    if (percentage <= 80) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Administration - Diagnostics LocService
            </h1>
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              📥 Télécharger CSV
            </button>
          </div>

          {loading ? (
            <p className="text-center py-8">Chargement des diagnostics...</p>
          ) : diagnostics.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              Aucun diagnostic enregistré pour le moment.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ville
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loyer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diagnostic
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {diagnostics.map((diag, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(diag.timestamp).toLocaleString('fr-FR')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {diag.villeLogement}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {diag.loyerActuel}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {diag.typeLogement}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold">
                        <span className={getScoreColor(diag.totalScore, 15)}>
                          {diag.totalScore}/15
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          diag.diagnostic === 'Risque élevé' ? 'bg-red-100 text-red-800' :
                          diag.diagnostic === 'Moyennement optimisée' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {diag.diagnostic}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Total des diagnostics</h3>
              <p className="text-2xl font-bold text-gray-900">{diagnostics.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Score moyen</h3>
              <p className="text-2xl font-bold text-gray-900">
                {diagnostics.length > 0
                  ? (diagnostics.reduce((acc, d) => acc + d.totalScore, 0) / diagnostics.length).toFixed(1)
                  : '0'}/15
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Ville la plus fréquente</h3>
              <p className="text-2xl font-bold text-gray-900">
                {diagnostics.length > 0
                  ? Object.entries(
                      diagnostics.reduce((acc, d) => {
                        acc[d.villeLogement] = (acc[d.villeLogement] || 0) + 1
                        return acc
                      }, {} as Record<string, number>)
                    ).sort((a, b) => b[1] - a[1])[0]?.[0] || '-'
                  : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage