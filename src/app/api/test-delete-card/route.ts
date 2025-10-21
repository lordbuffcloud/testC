import { NextResponse } from 'next/server'
import { deleteCard } from '@/actions/cards'

export async function POST(request: Request) {
  try {
    const { cardId } = await request.json()
    
    if (!cardId) {
      return NextResponse.json({ error: 'Card ID is required' }, { status: 400 })
    }
    
    console.log('Test delete endpoint called with cardId:', cardId)
    
    const result = await deleteCard(cardId)
    
    console.log('Test delete result:', result)
    
    return NextResponse.json({ 
      success: true, 
      result,
      message: 'Delete test completed',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test delete failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
