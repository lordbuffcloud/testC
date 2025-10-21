import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDeck } from '@/actions/decks'
import { listCards } from '@/actions/cards'
import StudyCard from '@/components/StudyCard'

export const dynamic = 'force-dynamic'

interface StudyPageProps {
  params: Promise<{
    deck: string
  }>
}

export default async function StudyPage({ params }: StudyPageProps) {
  const { deck } = await params
  const deckData = await getDeck(deck)
  
  if (!deckData) {
    notFound()
  }
  
  const cards = await listCards(deck)

  return (
    <div>
      <div className="study-header">
        <h1>Study {deckData.name}</h1>
        <Link href={`/decks/${deck}`} className="btn btn-secondary">
          Back to Deck
        </Link>
      </div>
      
      <StudyCard cards={cards} />
    </div>
  )
}
