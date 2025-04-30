import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import Membre from '@/models/Membre';

export async function POST(req: NextRequest) {
    await connectToDatabase();
    const { name, prenom, email, password, role } = await req.json();

    try {
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await Membre.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'Membre already exists' }, { status: 400 });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création d'un nouvel utilisateur
        const membre = new Membre({ name, prenom, email, password: hashedPassword, role });
        await membre.save();

        return NextResponse.json({ message: 'Membre created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
