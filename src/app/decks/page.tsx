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
          <Link key={deck.id} href={`/decks/${deck.key}`} className="deck-card">
            <h2>{deck.name}</h2>
            <p>Click to view and manage cards</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
