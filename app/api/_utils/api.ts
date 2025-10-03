import { NextRequest, NextResponse } from 'next/server'

export const json = (data: unknown, init?: number | ResponseInit) => {
  const status = typeof init === 'number' ? init : (init as ResponseInit | undefined)?.status || 200
  const respInit = typeof init === 'number' ? { status: init } : init
  return NextResponse.json({ success: status < 400, data: status < 400 ? data : undefined, error: status >= 400 ? data : undefined }, respInit)
}

export const getIp = (req: NextRequest) => req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '0.0.0.0'
