import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDeck } from '@/actions/decks'
import { listCards } from '@/actions/cards'
import DeckPageClient from './DeckPageClient'

export const dynamic = 'force-dynamic'

interface DeckPageProps {
  params: {
    deck: string
  }
}

export default async function DeckPage({ params }: DeckPageProps) {
  const deck = await getDeck(params.deck)
  
  if (!deck) {
    notFound()
  }
  
  const cards = await listCards(params.deck)

  return <DeckPageClient deck={deck} cards={cards} deckKey={params.deck} />
}
