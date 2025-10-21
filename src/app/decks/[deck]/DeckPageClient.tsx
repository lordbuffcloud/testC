'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AddCardModal from '../../../components/AddCardModal'
import EditCardModal from '../../../components/EditCardModal'
import { deleteCard } from '@/actions/cards'

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
  const [deletingCard, setDeletingCard] = useState<Card | null>(null)
  const router = useRouter()

  const handleCardAdded = () => {
    // Use router refresh to get fresh data from server
    router.refresh()
    // Also close the modal
    setShowAddModal(false)
  }

  const handleCardUpdated = () => {
    // Use router refresh to get fresh data from server
    router.refresh()
    // Also close the modal
    setEditingCard(null)
  }

  const handleDeleteCard = async (card: Card) => {
    console.log('Delete button clicked for card:', card.id)
    
    if (!confirm(`Are you sure you want to delete this card?\n\nQuestion: ${card.question}\nAnswer: ${card.answer}`)) {
      console.log('User cancelled deletion')
      return
    }

    console.log('User confirmed deletion, proceeding...')
    
    try {
      console.log('Calling deleteCard server action...')
      await deleteCard(card.id)
      console.log('Delete successful, refreshing page...')
      
      // Try multiple refresh methods to ensure we get updated data
      router.refresh()
      
      // Also try a hard refresh as backup
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      
    } catch (error) {
      console.error('Error deleting card:', error)
      alert('Failed to delete card. Please try again.')
    }
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
                  <button
                    onClick={() => handleDeleteCard(card)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
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