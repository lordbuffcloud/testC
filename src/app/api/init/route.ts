import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        error: 'DATABASE_URL not configured. Please set up Vercel Postgres integration.' 
      }, { status: 400 })
    }

    // Test database connection
    await prisma.$connect()
    
    // Seed the three decks
    await prisma.deck.upsert({
      where: { key: 'patrol' },
      update: {},
      create: { key: 'patrol', name: 'Patrol' }
    })
    
    await prisma.deck.upsert({
      where: { key: 'ec' },
      update: {},
      create: { key: 'ec', name: 'EC' }
    })
    
    await prisma.deck.upsert({
      where: { key: 'bdoc' },
      update: {},
      create: { key: 'bdoc', name: 'BDOC' }
    })
    
    // Test query
    const deckCount = await prisma.deck.count()
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Database initialized successfully',
      deckCount,
      decks: ['patrol', 'ec', 'bdoc']
    })
  } catch (error) {
    console.error('Database initialization failed:', error)
    return NextResponse.json({ 
      error: 'Database initialization failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
