import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    services: {
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      voyage: !!process.env.VOYAGE_API_KEY,
      supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    },
  };

  const allHealthy = Object.values(checks.services).every(Boolean);

  return NextResponse.json(checks, {
    status: allHealthy ? 200 : 503,
  });
}
