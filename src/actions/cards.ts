'use server'

import { query } from '@/lib/db'
import { randomUUID } from 'crypto'
import { validateCard } from '@/lib/validators'

export interface Card {
  id: string
  deck_key: string
  question: string
  answer: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export async function listCards(deckKey: string): Promise<Card[]> {
  const cards = await query<Card>(
    'SELECT * FROM cards WHERE deck_key = $1 AND deleted_at IS NULL ORDER BY created_at',
    [deckKey]
  )
  return cards
}

export async function createCard(deckKey: string, question: string, answer: string): Promise<Card> {
  const id = randomUUID()
  
  // Validate input
  const validation = validateCard({ question, answer })
  if (!validation.ok) {
    const errors = Object.values(validation.errors || {}).join(', ')
    throw new Error(errors)
  }
  
  await query(
    'INSERT INTO cards (id, deck_key, question, answer) VALUES ($1, $2, $3, $4)',
    [id, deckKey, question.trim(), answer.trim()]
  )
  
  const cards = await query<Card>('SELECT * FROM cards WHERE id = $1', [id])
  return cards[0]
}

export async function updateCard(id: string, fields: { question?: string; answer?: string }): Promise<Card> {
  const updates: string[] = []
  const params: any[] = []
  let paramIndex = 1
  
  if (fields.question !== undefined) {
    const trimmedQuestion = fields.question.trim()
    updates.push(`question = $${paramIndex}`)
    params.push(trimmedQuestion)
    paramIndex++
  }
  
  if (fields.answer !== undefined) {
    const trimmedAnswer = fields.answer.trim()
    updates.push(`answer = $${paramIndex}`)
    params.push(trimmedAnswer)
    paramIndex++
  }
  
  if (updates.length === 0) {
    throw new Error('No fields to update')
  }
  
  // Validate the complete card if both fields are provided
  if (fields.question !== undefined && fields.answer !== undefined) {
    const validation = validateCard({ question: fields.question, answer: fields.answer })
    if (!validation.ok) {
      const errors = Object.values(validation.errors || {}).join(', ')
      throw new Error(errors)
    }
  }
  
  updates.push(`updated_at = now()`)
  params.push(id)
  
  await query(
    `UPDATE cards SET ${updates.join(', ')} WHERE id = $${paramIndex}`,
    params
  )
  
  const cards = await query<Card>('SELECT * FROM cards WHERE id = $1', [id])
  return cards[0]
}
