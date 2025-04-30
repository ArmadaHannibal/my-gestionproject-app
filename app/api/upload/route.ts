// Importer les modules nécessaires 
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

// Définir le gestionnaire POST pour le téléchargement de fichier 
export const POST = async (req) => {
  try {
    // Analyser les données de formulaire entrantes 
    const formData = await req.formData();

    // Obtenir le fichier à partir des données de formulaire 
    const file = formData.get('file');
    const user = formData.get('username');
    const id = formData.get('id');

    // Vérifier si un fichier est reçu 
    if (!file) {
      // Si aucun fichier n'est reçu, renvoyer une réponse JSON avec une erreur et un code d'état 400 
      return NextResponse.json({ error: 'Aucun fichier reçu.' }, { status: 400 });
    }

    // Convertir les données du fichier en tampon 
    const buffer = Buffer.from(await file.arrayBuffer());

    // Remplacer les espaces dans le nom de fichier par des traits de soulignement 
    const filename = file.name.replace(/ /g, '_');
    console.log(filename);

    // Écrire le fichier dans le répertoire spécifié (public/assets) avec le nom de fichier modifié 
    await writeFile(path.join(process.cwd(), 'public/uploads/', 'user='+user+'-id='+id+'-file='+filename), buffer);
    
    // Construire l'URL du fichier
    const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/user=${user}-id=${id}-file=${filename}`;

    // Renvoyer une réponse JSON avec un message de réussite et un code d'état 201 
    return NextResponse.json({ message: 'Success', fileUrl: fileUrl }, { status: 201 });
  } catch (error) {
    // Si une erreur se produit pendant l'écriture du fichier, consigner l'erreur et renvoyer une réponse JSON avec un message d'échec et un code d'état 500 
    console.log('Error happened', error);
    return NextResponse.json({ message: 'Échec', status: 500 });
  }
};
