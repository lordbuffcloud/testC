import Link from 'next/link'
import { listDecks } from '@/actions/decks'

export const dynamic = 'force-dynamic'

export default async function DecksPage() {
  const decks = await listDecks()

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
        <h3>🎉 Database Connected!</h3>
        <p>The login is working and the database is connected!</p>
        <p><strong>Features Available:</strong></p>
        <ul>
          <li>✅ User authentication</li>
          <li>✅ Database connection</li>
          <li>✅ Deck management</li>
          <li>🔄 Card management (coming next)</li>
        </ul>
      </div>
    </div>
  )
}