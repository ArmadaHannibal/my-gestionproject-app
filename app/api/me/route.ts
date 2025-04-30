// app/api/auth/me/route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('Authorization') || '';
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Vérifiez le token JWT
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        await connectToDatabase();

        // Trouvez l'utilisateur par ID
        const user = await User.findById(decoded.userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Répondez avec les informations de l'utilisateur
        return NextResponse.json({
            _id: decoded.userId,
            name: user.name,
            email: user.email,
            role: user.role,
            profilePhoto: user.profilePhoto
        });
    } catch (error) {
        // Gérez les erreurs, par exemple si le token est invalide ou expiré
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }
}
