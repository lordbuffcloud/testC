import { NextResponse } from 'next/server'
import { ensureSchema, seedDecks } from '@/lib/db'

export async function GET() {
  try {
    await ensureSchema()
    await seedDecks()
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Database initialization failed:', error)
    return NextResponse.json({ error: 'Database initialization failed' }, { status: 500 })
  }
}
