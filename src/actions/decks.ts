'use server'

import { getDecks, getDeck as getDeckData } from '@/lib/data'

export async function listDecks() {
  try {
    const decks = await getDecks()
    return decks.map(deck => ({
      id: deck.id,
      key: deck.key,
      name: deck.name,
      createdAt: new Date(deck.createdAt)
    }))
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
    const deck = await getDeckData(key)
    if (!deck) return null
    
    return {
      id: deck.id,
      key: deck.key,
      name: deck.name,
      createdAt: new Date(deck.createdAt),
      cards: deck.cards.map(card => ({
        id: card.id,
        deckKey: card.deckKey,
        question: card.question,
        answer: card.answer,
        createdAt: new Date(card.createdAt),
        updatedAt: new Date(card.updatedAt),
        deletedAt: null
      }))
    }
  } catch (error) {
    console.error('Error getting deck:', error)
    // Return fallback deck data
    const deckNames: Record<string, string> = {
      patrol: 'Patrol',
      ec: 'EC',
      bdoc: 'BDOC',
      alarms: 'Alarms',
      armory: 'Armory'
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