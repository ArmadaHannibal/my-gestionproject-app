import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await connectToDatabase();

    const userId = params.id;
    const { name, email, profilePhoto } = await req.json();

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { name, email, profilePhoto },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
    }
}
