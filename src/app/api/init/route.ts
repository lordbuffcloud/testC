import { NextResponse } from 'next/server'
import { getDecks } from '@/lib/data'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Test blob storage connection by getting decks
    const decks = await getDecks()
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Blob storage initialized successfully',
      deckCount: decks.length,
      decks: decks.map(d => d.key),
      storage: 'vercel-blob'
    })
  } catch (error) {
    console.error('Blob storage initialization failed:', error)
    return NextResponse.json({ 
      error: 'Blob storage initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
