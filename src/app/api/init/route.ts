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

    // Push the schema to the database
    // This will create tables if they don't exist
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "decks" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "key" TEXT NOT NULL UNIQUE,
      "name" TEXT NOT NULL,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`
    
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS "cards" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "deck_key" TEXT NOT NULL,
      "question" TEXT NOT NULL,
      "answer" TEXT NOT NULL,
      "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" TIMESTAMP(3) NOT NULL,
      "deleted_at" TIMESTAMP(3)
    )`
    
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
    
    return NextResponse.json({ ok: true, message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Database initialization failed:', error)
    return NextResponse.json({ error: 'Database initialization failed' }, { status: 500 })
  }
}
