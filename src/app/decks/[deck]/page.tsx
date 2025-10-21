import Link from 'next/link'
import { getDeck } from '@/actions/decks'
import DeckPageClient from './DeckPageClient'

interface DeckPageProps {
  params: Promise<{ deck: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'
export const runtime = 'nodejs'

export default async function DeckPage({ params }: DeckPageProps) {
  const { deck } = await params
  // Add cache busting to ensure fresh data
  console.log('DeckPage rendering at:', new Date().toISOString())
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

  return <DeckPageClient deckData={deckData} />
}