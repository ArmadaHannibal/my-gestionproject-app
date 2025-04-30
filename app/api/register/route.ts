import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '@/models/User';

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connexion à la base de données réussie');
    } catch (error) {
        console.error('Erreur de connexion à la base de données:', error);
        throw new Error('Erreur de connexion à la base de données');
    }
};

export async function POST(request: Request) {
  try {
      await connectToDatabase();
      const { name, email, password, role } = await request.json();

      // Validation des champs
      if (!name || !email || !password || !role) {
          console.error('Champs manquants', { name, email, password, role });
          return NextResponse.json({ message: 'Tous les champs sont requis' }, { status: 400 });
      }

      // Vérification si l'utilisateur existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          console.error('Utilisateur déjà enregistré', email);
          return NextResponse.json({ message: 'Utilisateur déjà enregistré' }, { status: 400 });
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, role });

      // Sauvegarde de l'utilisateur
      await user.save();

      return NextResponse.json({ message: 'Utilisateur enregistré avec succès' }, { status: 201 });
  } catch (error) {
      console.error('Erreur dans la requête POST:', error);
      return NextResponse.json({ message: 'Erreur interne du serveur', error: error.message }, { status: 500 });
  }
}

