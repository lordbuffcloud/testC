import Link from 'next/link'

interface DeckPageProps {
  params: Promise<{ deck: string }>
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { deck } = await params
  
  const deckNames: Record<string, string> = {
    patrol: 'Patrol',
    ec: 'EC', 
    bdoc: 'BDOC'
  }
  
  const deckName = deckNames[deck] || deck

  return (
    <div>
      <h1>{deckName} Deck</h1>
      <p>Manage cards in the {deckName} deck.</p>
      
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
          Study Cards
        </Link>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📚 Cards in {deckName} Deck</h3>
        <p>No cards yet. Click "Add Card" to create your first card!</p>
        
        <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          <p><strong>Coming Soon:</strong></p>
          <ul>
            <li>Add new cards</li>
            <li>Edit existing cards</li>
            <li>Delete cards</li>
            <li>Study mode with flip functionality</li>
          </ul>
        </div>
      </div>
    </div>
  )
}