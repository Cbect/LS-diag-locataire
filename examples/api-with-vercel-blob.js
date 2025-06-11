// Exemple d'intégration avec Vercel Blob Storage
// Remplacez le contenu de app/api/diagnostic/route.js par ce code
// après avoir ajouté Vercel Blob à votre projet

import { NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Créer un nom de fichier unique avec timestamp
    const timestamp = new Date().toISOString().replace(/[:]/g, '-').split('.')[0];
    const filename = `diagnostics/${timestamp}.json`;
    
    // Sauvegarder dans Vercel Blob Storage
    const blob = await put(filename, JSON.stringify(data, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
    
    // Optionnel : Envoyer une notification par email
    // await sendEmailNotification(data);
    
    console.log('Diagnostic sauvegardé:', blob.url);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Diagnostic enregistré avec succès',
      url: blob.url,
      filename: filename 
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du diagnostic:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'enregistrement' },
      { status: 500 }
    );
  }
}

// Endpoint pour récupérer tous les diagnostics
export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'diagnostics/',
      limit: 1000,
    });
    
    // Formatter la liste des diagnostics
    const diagnostics = blobs.map(blob => ({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    }));
    
    return NextResponse.json({ 
      success: true,
      count: diagnostics.length,
      diagnostics: diagnostics
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des diagnostics:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération' },
      { status: 500 }
    );
  }
}

// Fonction helper pour envoyer des notifications par email (exemple avec Resend)
async function sendEmailNotification(data) {
  // Nécessite d'installer: npm install resend
  // Et de configurer RESEND_API_KEY dans les variables d'environnement
  
  /*
  import { Resend } from 'resend';
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  const totalScore = data.totalScore;
  const diagnostic = data.diagnostic;
  
  await resend.emails.send({
    from: 'Diagnostic LocService <diagnostic@locservice.fr>',
    to: ['admin@locservice.fr'],
    subject: `Nouveau diagnostic - Score: ${totalScore}/15`,
    html: `
      <h2>Nouveau diagnostic reçu</h2>
      <p><strong>Date:</strong> ${new Date(data.timestamp).toLocaleString('fr-FR')}</p>
      <p><strong>Ville:</strong> ${data.situation.city}</p>
      <p><strong>Loyer:</strong> ${data.situation.currentRent}</p>
      <p><strong>Type:</strong> ${data.situation.propertyType}</p>
      <p><strong>Score total:</strong> ${totalScore}/15</p>
      <p><strong>Diagnostic:</strong> ${diagnostic}</p>
      <hr>
      <p>Voir tous les détails dans le fichier JSON joint.</p>
    `,
    attachments: [
      {
        filename: 'diagnostic.json',
        content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
      }
    ]
  });
  */
}
