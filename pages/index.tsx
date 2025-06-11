import { useState } from 'react'
import type { NextPage } from 'next'

interface FormData {
  // Étape 1
  dateDepartLocataire: string
  villeLogement: string
  loyerActuel: string
  typeLogement: string
  delaiRelocation: string
  
  // Étape 2
  clarteTitre: number
  qualitePhotos: number
  descriptionFiltrante: number
  niveauLoyer: number
  profilsCandidats: number
}

const Home: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    dateDepartLocataire: '',
    villeLogement: '',
    loyerActuel: '',
    typeLogement: '',
    delaiRelocation: '',
    clarteTitre: 1,
    qualitePhotos: 1,
    descriptionFiltrante: 1,
    niveauLoyer: 1,
    profilsCandidats: 1,
  })

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const totalScore = formData.clarteTitre + formData.qualitePhotos + 
                    formData.descriptionFiltrante + formData.niveauLoyer + 
                    formData.profilsCandidats

  const getScoreColor = (score: number) => {
    if (score === 1) return 'bg-red-500'
    if (score === 2) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getScoreEmoji = (score: number) => {
    if (score === 1) return '🔴'
    if (score === 2) return '🟡'
    return '🟢'
  }

  const getDiagnosticLevel = () => {
    if (totalScore <= 8) return { level: 'Risque élevé', color: 'text-red-600', emoji: '🔴' }
    if (totalScore <= 12) return { level: 'Moyennement optimisée', color: 'text-yellow-600', emoji: '🟡' }
    return { level: 'Prête à louer rapidement', color: 'text-green-600', emoji: '🟢' }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitSuccess(false)
    
    const submissionData = {
      ...formData,
      totalScore,
      diagnostic: getDiagnosticLevel().level,
      timestamp: new Date().toISOString()
    }

    try {
      const response = await fetch('/api/save-diagnostic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setSubmitSuccess(true)
      } else {
        alert('Erreur lors de la sauvegarde du diagnostic')
      }
    } catch (error) {
      alert('Erreur lors de la sauvegarde du diagnostic')
    } finally {
      setIsSubmitting(false)
    }
  }

  const diagnosis = getDiagnosticLevel()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-blue-900">
            📘 Diagnostic Express LocService
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Scoring Interactif basé sur +6 000 dossiers locatifs réels
          </p>

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                👣 Étape 1 – Votre situation actuelle
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🗓️ Quand votre locataire est-il parti (ou partira) ?
                </label>
                <input
                  type="date"
                  value={formData.dateDepartLocataire}
                  onChange={(e) => updateFormData('dateDepartLocataire', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : 15 mai 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📍 Ville du logement :
                </label>
                <input
                  type="text"
                  value={formData.villeLogement}
                  onChange={(e) => updateFormData('villeLogement', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : Nantes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏷️ Loyer actuel (hors charges) :
                </label>
                <input
                  type="text"
                  value={formData.loyerActuel}
                  onChange={(e) => updateFormData('loyerActuel', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : 720 €"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏢 Type de logement :
                </label>
                <input
                  type="text"
                  value={formData.typeLogement}
                  onChange={(e) => updateFormData('typeLogement', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : T2, 45 m2, non meublé"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🕐 Délai de relocation habituel :
                </label>
                <input
                  type="text"
                  value={formData.delaiRelocation}
                  onChange={(e) => updateFormData('delaiRelocation', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : 3 semaines"
                />
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continuer vers l'étape 2 →
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                🔍 Étape 2 – Évaluez votre mise en location
              </h2>

              <div className="space-y-4">
                {[
                  { field: 'clarteTitre', label: 'Clarté du titre', desc: ['Peu clair, trop générique', 'Moyen, pourrait être amélioré', 'Clair et accrocheur'] },
                  { field: 'qualitePhotos', label: 'Qualité des photos', desc: ['Peu nombreuses, peu lumineuses', 'Moyennes, correctes', 'Excellentes, lumineuses'] },
                  { field: 'descriptionFiltrante', label: 'Description filtrante ?', desc: ['Non, peu de détails', 'Partiellement', 'Oui, critères bien posés'] },
                  { field: 'niveauLoyer', label: 'Niveau du loyer', desc: ['Au-dessus du marché', 'Légèrement élevé', 'Aligné avec le marché'] },
                  { field: 'profilsCandidats', label: 'Profils candidats reçus', desc: ['Peu qualifiés', 'Moyennement qualifiés', 'Très qualifiés'] },
                ].map((criteria) => (
                  <div key={criteria.field} className="border rounded-lg p-4 bg-gray-50">
                    <p className="font-medium text-gray-800 mb-3">{criteria.label}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((score) => (
                        <button
                          key={score}
                          onClick={() => updateFormData(criteria.field as keyof FormData, score)}
                          className={`p-3 rounded-lg text-sm transition-all ${
                            formData[criteria.field as keyof FormData] === score
                              ? `${getScoreColor(score)} text-white font-semibold`
                              : 'bg-white border border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <span className="block text-lg mb-1">{getScoreEmoji(score)}</span>
                          {criteria.desc[score - 1]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  📊 Score total : {totalScore}/15
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      totalScore <= 8 ? 'bg-red-500' : totalScore <= 12 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(totalScore / 15) * 100}%` }}
                  />
                </div>
                <p className={`text-lg font-medium ${diagnosis.color}`}>
                  {diagnosis.emoji} {diagnosis.level}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  🛠 Recommandations personnalisées
                </h3>
                {totalScore <= 8 && (
                  <p className="text-gray-700">
                    👉 Revoir votre annonce, vos photos, et vérifiez votre positionnement de loyer sur LocService.
                  </p>
                )}
                {totalScore > 8 && totalScore <= 12 && (
                  <p className="text-gray-700">
                    👉 Optimisez 1 ou 2 points faibles : souvent les photos ou le descriptif suffisent à faire la différence.
                  </p>
                )}
                {totalScore > 12 && (
                  <p className="text-gray-700">
                    🎉 Vous êtes prêt à relouer rapidement ! Pensez à utiliser LocService pour filtrer les candidats qualifiés.
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Valider le diagnostic'}
                </button>
              </div>

              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mt-4">
                  ✅ Diagnostic enregistré avec succès !
                </div>
              )}
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>💡 Avez-vous vérifié le bon niveau de loyer sur LocService ?</p>
            <a href="https://www.locservice.fr/tensiometre/" target="_blank" rel="noopener noreferrer" 
               className="text-blue-600 hover:underline">
              https://www.locservice.fr/tensiometre/
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home