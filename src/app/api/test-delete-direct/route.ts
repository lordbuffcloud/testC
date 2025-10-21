import { NextResponse } from 'next/server'
import { getCards, deleteCard } from '@/lib/data'

export async function GET() {
  try {
    // Get all cards from patrol deck
    const cards = await getCards('patrol')
    
    return NextResponse.json({
      success: true,
      message: 'Cards retrieved successfully',
      cardCount: cards.length,
      cards: cards.map(card => ({
        id: card.id,
        question: card.question.substring(0, 50) + '...',
        answer: card.answer.substring(0, 50) + '...'
      }))
    })
  } catch (error) {
    console.error('Error getting cards:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { cardId } = await request.json()
    
    if (!cardId) {
      return NextResponse.json({ error: 'Card ID is required' }, { status: 400 })
    }
    
    console.log('Direct delete test called with cardId:', cardId)
    
    const success = await deleteCard(cardId)
    
    console.log('Direct delete result:', success)
    
    return NextResponse.json({
      success: true,
      deleted: success,
      message: success ? 'Card deleted successfully' : 'Card not found',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Direct delete test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
