'use server'

import { prisma } from '@/lib/prisma'

export interface Deck {
  id: string
  key: string
  name: string
  createdAt: string
}

export async function listDecks(): Promise<Deck[]> {
  const decks = await prisma.deck.findMany({
    orderBy: { key: 'asc' }
  })
  
  return decks.map(deck => ({
    id: deck.id,
    key: deck.key,
    name: deck.name,
    createdAt: deck.createdAt.toISOString()
  }))
}

export async function getDeck(key: string): Promise<Deck | null> {
  const deck = await prisma.deck.findUnique({
    where: { key }
  })
  
  if (!deck) return null
  
  return {
    id: deck.id,
    key: deck.key,
    name: deck.name,
    createdAt: deck.createdAt.toISOString()
  }
}
