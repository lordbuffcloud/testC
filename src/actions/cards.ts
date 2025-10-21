'use server'

import { getCards, createCard as createCardData, updateCard as updateCardData } from '@/lib/data'

export async function listCards(deckKey: string) {
  try {
    const cards = await getCards(deckKey)
    return cards.map(card => ({
      id: card.id,
      deckKey: card.deckKey,
      question: card.question,
      answer: card.answer,
      createdAt: new Date(card.createdAt),
      updatedAt: new Date(card.updatedAt),
      deletedAt: null
    }))
  } catch (error) {
    console.error('Error listing cards:', error)
    return []
  }
}

export async function createCard(deckKey: string, question: string, answer: string = '') {
  try {
    const card = await createCardData(deckKey, question.trim(), answer.trim() || '')
    return {
      id: card.id,
      deckKey: card.deckKey,
      question: card.question,
      answer: card.answer,
      createdAt: new Date(card.createdAt),
      updatedAt: new Date(card.updatedAt),
      deletedAt: null
    }
  } catch (error) {
    console.error('Error creating card:', error)
    throw new Error('Failed to create card')
  }
}

export async function updateCard(id: string, fields: { question?: string; answer?: string }) {
  try {
    const card = await updateCardData(id, fields)
    if (!card) throw new Error('Card not found')
    
    return {
      id: card.id,
      deckKey: card.deckKey,
      question: card.question,
      answer: card.answer,
      createdAt: new Date(card.createdAt),
      updatedAt: new Date(card.updatedAt),
      deletedAt: null
    }
  } catch (error) {
    console.error('Error updating card:', error)
    throw new Error('Failed to update card')
  }
}