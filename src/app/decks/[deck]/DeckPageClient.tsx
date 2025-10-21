'use client'

import { useState } from 'react'
import Link from 'next/link'
import AddCardModal from '../../../components/AddCardModal'
import EditCardModal from '../../../components/EditCardModal'

interface Card {
  id: string
  question: string
  answer: string
  createdAt: Date
  updatedAt: Date
}

interface DeckData {
  id: string
  key: string
  name: string
  cards: Card[]
}

interface DeckPageClientProps {
  deckData: DeckData
}

export default function DeckPageClient({ deckData }: DeckPageClientProps) {
  const [cards, setCards] = useState(deckData.cards)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingCard, setEditingCard] = useState<Card | null>(null)

  const handleCardAdded = () => {
    // Refresh the page to get updated cards
    window.location.reload()
  }

  const handleCardUpdated = () => {
    // Refresh the page to get updated cards
    window.location.reload()
  }

  return (
    <div>
      <h1>{deckData.name} Deck</h1>
      <p>Manage cards in the {deckData.name} deck.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <Link href="/decks" className="btn btn-secondary">
          ← Back to Decks
        </Link>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn" 
          style={{ marginRight: '10px' }}
        >
          Add Card
        </button>
        <Link href={`/decks/${deckData.key}/study`} className="btn btn-primary">
          Study Cards ({cards.length})
        </Link>
      </div>
      
      <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📚 Cards in {deckData.name} Deck ({cards.length})</h3>
        
        {cards.length === 0 ? (
          <p>No cards yet. Click "Add Card" to create your first card!</p>
        ) : (
          <div>
            {cards.map((card) => (
              <div key={card.id} style={{ 
                marginBottom: '15px', 
                padding: '15px', 
                backgroundColor: 'white', 
                borderRadius: '8px',
                border: '1px solid #ddd',
                position: 'relative'
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Q:</strong> {card.question}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>A:</strong> {card.answer || <em style={{ color: '#666' }}>No answer yet</em>}
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: '10px', 
                  justifyContent: 'flex-end',
                  marginTop: '10px'
                }}>
                  <button
                    onClick={() => setEditingCard(card)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#666', 
                  marginTop: '5px',
                  borderTop: '1px solid #eee',
                  paddingTop: '5px'
                }}>
                  Created: {new Date(card.createdAt).toLocaleDateString()}
                  {card.updatedAt.getTime() !== card.createdAt.getTime() && (
                    <span> • Updated: {new Date(card.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          <p><strong>Database Status:</strong> ✅ Connected</p>
          <p><strong>Cards Loaded:</strong> {cards.length}</p>
        </div>
      </div>

      {showAddModal && (
        <AddCardModal
          deckKey={deckData.key}
          onClose={() => setShowAddModal(false)}
          onCardAdded={handleCardAdded}
        />
      )}

      {editingCard && (
        <EditCardModal
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onCardUpdated={handleCardUpdated}
        />
      )}
    </div>
  )
}