import Link from 'next/link'

export default function DecksPage() {
  const decks = [
    { key: 'patrol', name: 'Patrol' },
    { key: 'ec', name: 'EC' },
    { key: 'bdoc', name: 'BDOC' }
  ]

  return (
    <div>
      <h1>Choose a Deck</h1>
      <p>Select a deck to study or manage cards.</p>
      
      <div className="deck-grid">
        {decks.map((deck) => (
          <Link key={deck.key} href={`/decks/${deck.key}`} className="deck-card">
            <h2>{deck.name}</h2>
            <p>Click to view and manage cards</p>
          </Link>
        ))}
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>🎉 Login Successful!</h3>
        <p>The login is working! You can now access the decks.</p>
        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Click on a deck above to view/manage cards</li>
          <li>Database integration will be added next</li>
          <li>Card management features coming soon</li>
        </ul>
      </div>
    </div>
  )
}