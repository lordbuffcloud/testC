'use client'

import { useState } from 'react'
import Link from 'next/link'
import AddCardModal from '@/components/AddCardModal'
import CardRow from '@/components/CardRow'

interface DeckPageClientProps {
  deck: {
    id: string
    key: string
    name: string
    createdAt: string
  }
  cards: Array<{
    id: string
    deckKey: string
    question: string
    answer: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
  }>
  deckKey: string
}

export default function DeckPageClient({ deck, cards, deckKey }: DeckPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <div className="deck-header">
        <h1>{deck.name} Deck</h1>
        <div className="deck-actions">
          <button 
            className="btn btn-secondary" 
            onClick={() => setIsModalOpen(true)}
          >
            + Add Card
          </button>
          <Link href={`/decks/${deckKey}/study`} className="btn btn-success">
            Study
          </Link>
        </div>
      </div>
      
      <div className="card-list">
        {cards.length === 0 ? (
          <p>No cards yet. Add your first card to get started!</p>
        ) : (
          cards.map((card) => (
            <CardRow 
              key={card.id} 
              id={card.id}
              question={card.question}
              answer={card.answer}
            />
          ))
        )}
      </div>

      <AddCardModal 
        deckKey={deckKey}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
