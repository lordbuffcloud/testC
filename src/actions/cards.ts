import { prisma } from '@/lib/prisma'

export async function listCards(deckKey: string) {
  try {
    const cards = await prisma.card.findMany({
      where: {
        deckKey,
        deletedAt: null
      },
      orderBy: { createdAt: 'asc' }
    })
    return cards
  } catch (error) {
    console.error('Error listing cards:', error)
    return []
  }
}

export async function createCard(deckKey: string, question: string, answer: string) {
  try {
    const card = await prisma.card.create({
      data: {
        deckKey,
        question: question.trim(),
        answer: answer.trim()
      }
    })
    return card
  } catch (error) {
    console.error('Error creating card:', error)
    throw new Error('Failed to create card')
  }
}

export async function updateCard(id: string, fields: { question?: string; answer?: string }) {
  try {
    const card = await prisma.card.update({
      where: { id },
      data: {
        ...fields,
        question: fields.question?.trim(),
        answer: fields.answer?.trim()
      }
    })
    return card
  } catch (error) {
    console.error('Error updating card:', error)
    throw new Error('Failed to update card')
  }
}