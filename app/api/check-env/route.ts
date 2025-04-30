import { NextResponse } from 'next/server';

export async function GET() {
  const mongoUri = process.env.MONGODB_URI;
  const jwtSecret = process.env.JWT_SECRET;

  return NextResponse.json({
    MONGODB_URI: mongoUri || 'MONGODB_URI is not set',
    JWT_SECRET: jwtSecret || 'JWT_SECRET is not set',
  });
}
