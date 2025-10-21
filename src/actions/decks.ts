'use server'

import { query } from '@/lib/db'

export interface Deck {
  id: string
  key: string
  name: string
  created_at: string
}

export async function listDecks(): Promise<Deck[]> {
  const decks = await query<Deck>('SELECT * FROM decks ORDER BY key')
  return decks
}

export async function getDeck(key: string): Promise<Deck | null> {
  const decks = await query<Deck>('SELECT * FROM decks WHERE key = $1', [key])
  return decks[0] || null
}
