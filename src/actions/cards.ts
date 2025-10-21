'use server'

import { prisma } from '@/lib/prisma'
import { validateCard } from '@/lib/validators'

export interface Card {
  id: string
  deckKey: string
  question: string
  answer: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export async function listCards(deckKey: string): Promise<Card[]> {
  const cards = await prisma.card.findMany({
    where: {
      deckKey,
      deletedAt: null
    },
    orderBy: { createdAt: 'asc' }
  })
  
  return cards.map(card => ({
    id: card.id,
    deckKey: card.deckKey,
    question: card.question,
    answer: card.answer,
    createdAt: card.createdAt.toISOString(),
    updatedAt: card.updatedAt.toISOString(),
    deletedAt: card.deletedAt?.toISOString() || null
  }))
}

export async function createCard(deckKey: string, question: string, answer: string): Promise<Card> {
  // Validate input
  const validation = validateCard({ question, answer })
  if (!validation.ok) {
    const errors = Object.values(validation.errors || {}).join(', ')
    throw new Error(errors)
  }
  
  const card = await prisma.card.create({
    data: {
      deckKey,
      question: question.trim(),
      answer: answer.trim()
    }
  })
  
  return {
    id: card.id,
    deckKey: card.deckKey,
    question: card.question,
    answer: card.answer,
    createdAt: card.createdAt.toISOString(),
    updatedAt: card.updatedAt.toISOString(),
    deletedAt: card.deletedAt?.toISOString() || null
  }
}

export async function updateCard(id: string, fields: { question?: string; answer?: string }): Promise<Card> {
  const updates: any = {}
  
  if (fields.question !== undefined) {
    updates.question = fields.question.trim()
  }
  
  if (fields.answer !== undefined) {
    updates.answer = fields.answer.trim()
  }
  
  if (Object.keys(updates).length === 0) {
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
  
  const card = await prisma.card.update({
    where: { id },
    data: updates
  })
  
  return {
    id: card.id,
    deckKey: card.deckKey,
    question: card.question,
    answer: card.answer,
    createdAt: card.createdAt.toISOString(),
    updatedAt: card.updatedAt.toISOString(),
    deletedAt: card.deletedAt?.toISOString() || null
  }
}
