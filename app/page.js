'use client';

import React, { useState } from 'react';
import { Check, X, AlertCircle, Download, Send } from 'lucide-react';

export default function DiagnosticApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1
    departureDate: '',
    city: '',
    currentRent: '',
    propertyType: '',
    relocationDelay: '',
    // Étape 2
    titleClarity: 0,
    photoQuality: 0,
    filteringDescription: 0,
    rentLevel: 0,
    candidateProfiles: 0
  });

  const evaluationCriteria = [
    { key: 'titleClarity', label: 'Clarté du titre', description: 'Est-ce que votre titre est clair et attrayant ?' },
    { key: 'photoQuality', label: 'Qualité des photos', description: 'Vos photos sont-elles lumineuses et professionnelles ?' },
    { key: 'filteringDescription', label: 'Description filtrante', description: 'Les critères de sélection sont-ils bien définis ?' },
    { key: 'rentLevel', label: 'Niveau du loyer', description: 'Votre loyer est-il aligné avec le marché ?' },
    { key: 'candidateProfiles', label: 'Profils candidats reçus', description: 'Recevez-vous des candidats qualifiés ?' }
  ];

  const getScoreColor = (score) => {
    if (score === 3) return 'bg-green-500';
    if (score === 2) return 'bg-yellow-500';
    if (score === 1) return 'bg-red-500';
    return 'bg-gray-300';
  };

  const getScoreEmoji = (score) => {
    if (score === 3) return '🟢';
    if (score === 2) return '🟡';
    if (score === 1) return '🔴';
    return '⚪';
  };

  const calculateTotalScore = () => {
    return evaluationCriteria.reduce((total, criteria) => total + (formData[criteria.key] || 0), 0);
  };

  const getDiagnostic = (score) => {
    if (score <= 8) return { level: 'Risque élevé', color: 'text-red-600', message: 'Votre annonce n\'attire pas les bons profils.' };
    if (score <= 12) return { level: 'Moyennement optimisée', color: 'text-yellow-600', message: 'Quelques améliorations peuvent tout changer.' };
    return { level: 'Prête à louer rapidement', color: 'text-green-600', message: 'Bravo ! Vous êtes prêt à relouer rapidement !' };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScoreChange = (field, score) => {
    setFormData(prev => ({ ...prev, [field]: score }));
  };

  const generateReport = () => {
    const totalScore = calculateTotalScore();
    const diagnostic = getDiagnostic(totalScore);
    
    const report = {
      timestamp: new Date().toISOString(),
      situation: {
        departureDate: formData.departureDate,
        city: formData.city,
        currentRent: formData.currentRent,
        propertyType: formData.propertyType,
        relocationDelay: formData.relocationDelay
      },
      evaluation: evaluationCriteria.map(criteria => ({
        criteria: criteria.label,
        score: formData[criteria.key],
        status: getScoreEmoji(formData[criteria.key])
      })),
      totalScore,
      maxScore: 15,
      diagnostic: diagnostic.level,
      recommendations: getRecommendations(totalScore)
    };

    return report;
  };

  const getRecommendations = (score) => {
    if (score < 9) {
      return "Revoir votre annonce, vos photos, et vérifiez votre positionnement de loyer sur LocService.";
    } else if (score <= 12) {
      return "Optimisez 1 ou 2 points faibles : souvent les photos ou le descriptif suffisent à faire la différence.";
    }
    return "Vous êtes prêt à relouer rapidement ! Pensez à utiliser LocService pour filtrer les candidats qualifiés sans passer par une agence.";
  };

  const downloadReport = () => {
    const report = generateReport();
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `diagnostic-locservice-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const submitDiagnostic = async () => {
    const report = generateReport();
    
    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report)
      });
      
      if (response.ok) {
        alert('Diagnostic enregistré avec succès ! Téléchargez votre rapport.');
        downloadReport();
      } else {
        alert('Erreur lors de l\'enregistrement. Téléchargez votre rapport localement.');
        downloadReport();
      }
    } catch (error) {
      alert('Erreur lors de l\'enregistrement. Téléchargez votre rapport localement.');
      downloadReport();
    }
  };

  const totalScore = calculateTotalScore();
  const diagnostic = getDiagnostic(totalScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              📘 Diagnostic Express LocService
            </h1>
            <p className="text-gray-600">
              Scoring Interactif basé sur +6 000 dossiers locatifs réels
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Progression</span>
              <span className="text-sm text-gray-600">Étape {currentStep} sur 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                👣 Étape 1 – Votre situation actuelle
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🗓️ Quand votre locataire est-il parti (ou partira) ?
                </label>
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => handleInputChange('departureDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : 15 mai 2025"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📍 Ville du logement
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : Nantes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏷️ Loyer actuel (hors charges)
                </label>
                <input
                  type="text"
                  value={formData.currentRent}
                  onChange={(e) => handleInputChange('currentRent', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : 720 €"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏢 Type de logement
                </label>
                <input
                  type="text"
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : T2, 45 m², non meublé"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🕐 Délai de relocation habituel
                </label>
                <input
                  type="text"
                  value={formData.relocationDelay}
                  onChange={(e) => handleInputChange('relocationDelay', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex : 3 semaines"
                />
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continuer →
              </button>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                🔍 Étape 2 – Évaluez votre mise en location
              </h2>
              
              {evaluationCriteria.map((criteria) => (
                <div key={criteria.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{criteria.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{criteria.description}</p>
                    </div>
                    <div className="ml-4">
                      <span className="text-2xl">{getScoreEmoji(formData[criteria.key])}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {[1, 2, 3].map((score) => (
                      <button
                        key={score}
                        onClick={() => handleScoreChange(criteria.key, score)}
                        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                          formData[criteria.key] === score
                            ? `${getScoreColor(score)} text-white`
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {score === 1 ? 'Faible' : score === 2 ? 'Moyen' : 'Excellent'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Avez-vous vérifié le bon niveau de loyer sur LocService ?</strong>
                  <br />
                  <a href="https://www.locservice.fr/tensiometre/" className="underline" target="_blank" rel="noopener noreferrer">
                    https://www.locservice.fr/tensiometre/
                  </a>
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  ← Retour
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Voir le diagnostic →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 - Results */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                🧠 Diagnostic final
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-center mb-6">
                  <p className="text-4xl font-bold text-gray-800 mb-2">
                    {totalScore} / 15
                  </p>
                  <p className={`text-xl font-semibold ${diagnostic.color}`}>
                    {diagnostic.level}
                  </p>
                  <p className="text-gray-600 mt-2">{diagnostic.message}</p>
                </div>

                <div className="space-y-2">
                  {evaluationCriteria.map((criteria) => (
                    <div key={criteria.key} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">{criteria.label}</span>
                      <span className="font-medium">
                        {getScoreEmoji(formData[criteria.key])} {formData[criteria.key]}/3
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">🛠 Recommandations personnalisées</h3>
                <p className="text-gray-700">{getRecommendations(totalScore)}</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={downloadReport}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Télécharger le rapport (JSON)
                </button>
                
                <button
                  onClick={submitDiagnostic}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Enregistrer et envoyer le diagnostic
                </button>

                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setFormData({
                      departureDate: '',
                      city: '',
                      currentRent: '',
                      propertyType: '',
                      relocationDelay: '',
                      titleClarity: 0,
                      photoQuality: 0,
                      filteringDescription: 0,
                      rentLevel: 0,
                      candidateProfiles: 0
                    });
                  }}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Refaire un diagnostic
                </button>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-blue-800 mb-2">
                  🚀 Prêt à relouer sans stress ?
                </p>
                <a
                  href="https://www.locservice.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-medium"
                >
                  ➡️ Testez LocService gratuitement
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
