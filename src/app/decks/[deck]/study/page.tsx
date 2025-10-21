import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDeck } from '@/actions/decks'
import { listCards } from '@/actions/cards'
import StudyCard from '@/components/StudyCard'

export const dynamic = 'force-dynamic'

interface StudyPageProps {
  params: {
    deck: string
  }
}

export default async function StudyPage({ params }: StudyPageProps) {
  const deck = await getDeck(params.deck)
  
  if (!deck) {
    notFound()
  }
  
  const cards = await listCards(params.deck)

  return (
    <div>
      <div className="study-header">
        <h1>Study {deck.name}</h1>
        <Link href={`/decks/${params.deck}`} className="btn btn-secondary">
          Back to Deck
        </Link>
      </div>
      
      <StudyCard cards={cards} />
    </div>
  )
}
