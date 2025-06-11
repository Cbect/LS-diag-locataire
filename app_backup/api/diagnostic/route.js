import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Créer un nom de fichier unique avec timestamp
    const timestamp = new Date().toISOString().replace(/[:]/g, '-').split('.')[0];
    const filename = `diagnostic-${timestamp}.json`;
    
    // Dans un environnement Vercel, vous devriez utiliser une base de données
    // ou un service de stockage cloud comme Vercel Blob ou AWS S3
    // Pour cet exemple, on retourne juste une réponse de succès
    
    // En production, vous pourriez faire quelque chose comme :
    // await saveToDatabase(data);
    // await sendToS3(data);
    // await sendEmailNotification(data);
    
    console.log('Diagnostic reçu:', data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Diagnostic enregistré avec succès',
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

export async function GET() {
  return NextResponse.json({ 
    message: 'API Diagnostic LocService - Utilisez POST pour soumettre un diagnostic' 
  });
}
