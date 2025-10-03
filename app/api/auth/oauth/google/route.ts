import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return NextResponse.json({ success: false, error: { code: 'config_missing', message: 'Supabase URL missing' } }, { status: 500 })
  const redirectTo = encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/auth/callback`)
  const authorize = `${url}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`
  return NextResponse.json({ success: true, data: { authorizeUrl: authorize } })
}
