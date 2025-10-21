import Link from 'next/link'

interface StudyPageProps {
  params: Promise<{ deck: string }>
}

export default async function StudyPage({ params }: StudyPageProps) {
  const { deck } = await params
  
  const deckNames: Record<string, string> = {
    patrol: 'Patrol',
    ec: 'EC', 
    bdoc: 'BDOC'
  }
  
  const deckName = deckNames[deck] || deck

  return (
    <div>
      <h1>Study {deckName} Deck</h1>
      <p>Study cards in the {deckName} deck.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/decks/${deck}`} className="btn btn-secondary">
          ← Back to Deck
        </Link>
      </div>
      
      <div style={{ 
        padding: '40px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3>🎓 Study Mode</h3>
        <p>No cards to study yet.</p>
        <p>Add some cards to the {deckName} deck first!</p>
        
        <div style={{ marginTop: '20px' }}>
          <Link href={`/decks/${deck}`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
        
        <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
          <p><strong>Study Features Coming Soon:</strong></p>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Flip cards to see answers</li>
            <li>Next/Previous navigation</li>
            <li>Shuffle deck option</li>
            <li>Progress tracking</li>
          </ul>
        </div>
      </div>
    </div>
  )
}