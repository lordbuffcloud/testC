import Link from 'next/link'
import { getDeck } from '@/actions/decks'

interface DeckPageProps {
  params: Promise<{ deck: string }>
}

export const dynamic = 'force-dynamic'

export default async function DeckPage({ params }: DeckPageProps) {
  const { deck } = await params
  const deckData = await getDeck(deck)
  
  if (!deckData) {
    return (
      <div>
        <h1>Deck Not Found</h1>
        <p>The requested deck could not be found.</p>
        <Link href="/decks" className="btn btn-secondary">
          ← Back to Decks
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1>{deckData.name} Deck</h1>
      <p>Manage cards in the {deckData.name} deck.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <Link href="/decks" className="btn btn-secondary">
          ← Back to Decks
        </Link>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button className="btn" style={{ marginRight: '10px' }}>
          Add Card
        </button>
        <Link href={`/decks/${deck}/study`} className="btn btn-primary">
          Study Cards ({deckData.cards.length})
        </Link>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📚 Cards in {deckData.name} Deck ({deckData.cards.length})</h3>
        
        {deckData.cards.length === 0 ? (
          <p>No cards yet. Click "Add Card" to create your first card!</p>
        ) : (
          <div>
            {deckData.cards.map((card) => (
              <div key={card.id} style={{ 
                marginBottom: '10px', 
                padding: '10px', 
                backgroundColor: 'white', 
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}>
                <strong>Q:</strong> {card.question}<br/>
                <strong>A:</strong> {card.answer}
              </div>
            ))}
          </div>
        )}
        
        <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          <p><strong>Database Status:</strong> ✅ Connected</p>
          <p><strong>Cards Loaded:</strong> {deckData.cards.length}</p>
        </div>
      </div>
    </div>
  )
}