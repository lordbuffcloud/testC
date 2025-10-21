import Link from 'next/link'
import { getDeck } from '@/actions/decks'
import StudyPageClient from './StudyPageClient'

interface StudyPageProps {
  params: Promise<{ deck: string }>
}

export const dynamic = 'force-dynamic'

export default async function StudyPage({ params }: StudyPageProps) {
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

  return <StudyPageClient deckData={deckData} />
}