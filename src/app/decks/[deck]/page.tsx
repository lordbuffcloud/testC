import { notFound } from 'next/navigation'
import { getDeck } from '@/actions/decks'
import { listCards } from '@/actions/cards'
import DeckPageClient from './DeckPageClient'

export const dynamic = 'force-dynamic'

interface DeckPageProps {
  params: Promise<{
    deck: string
  }>
}

export default async function DeckPage({ params }: DeckPageProps) {
  const { deck } = await params
  const deckData = await getDeck(deck)
  
  if (!deckData) {
    notFound()
  }
  
  const cards = await listCards(deck)

  return <DeckPageClient deck={deckData} cards={cards} deckKey={deck} />
}
