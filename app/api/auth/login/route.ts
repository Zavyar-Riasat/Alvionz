import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // This route is not needed since we're using NextAuth credentials provider
  return NextResponse.json(
    { error: 'Use the NextAuth signin endpoint instead' },
    { status: 400 }
  );
}