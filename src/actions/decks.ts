'use server'

import { prisma } from '@/lib/prisma'

export async function listDecks() {
  try {
    const decks = await prisma.deck.findMany({
      orderBy: { createdAt: 'asc' }
    })
    return decks
  } catch (error) {
    console.error('Error listing decks:', error)
    // Return static decks as fallback
    return [
      { id: 'patrol', key: 'patrol', name: 'Patrol', createdAt: new Date() },
      { id: 'ec', key: 'ec', name: 'EC', createdAt: new Date() },
      { id: 'bdoc', key: 'bdoc', name: 'BDOC', createdAt: new Date() }
    ]
  }
}

export async function getDeck(key: string) {
  try {
    const deck = await prisma.deck.findUnique({
      where: { key },
      include: {
        cards: {
          where: { deletedAt: null },
          orderBy: { createdAt: 'asc' }
        }
      }
    })
    return deck
  } catch (error) {
    console.error('Error getting deck:', error)
    // Return fallback deck data
    const deckNames: Record<string, string> = {
      patrol: 'Patrol',
      ec: 'EC',
      bdoc: 'BDOC'
    }
    
    if (deckNames[key]) {
      return {
        id: key,
        key: key,
        name: deckNames[key],
        createdAt: new Date(),
        cards: []
      }
    }
    
    return null
  }
}