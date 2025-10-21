'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { shuffle } from '@/lib/shuffle'

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

interface StudyPageClientProps {
  deckData: DeckData
}

export default function StudyPageClient({ deckData }: StudyPageClientProps) {
  const [cards, setCards] = useState<Card[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)

  useEffect(() => {
    setCards(deckData.cards)
  }, [deckData.cards])

  const currentCard = cards[currentIndex]
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0

  const handleShuffle = () => {
    const shuffledCards = shuffle([...cards])
    setCards(shuffledCards)
    setCurrentIndex(0)
    setShowAnswer(false)
    setIsShuffled(true)
  }

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setShowAnswer(false)
    }
  }

  const handleFlip = () => {
    setShowAnswer(!showAnswer)
  }

  const handleReset = () => {
    setCards(deckData.cards)
    setCurrentIndex(0)
    setShowAnswer(false)
    setIsShuffled(false)
  }

  if (cards.length === 0) {
    return (
      <div>
        <h1>Study {deckData.name} Deck</h1>
        <p>Study cards in the {deckData.name} deck.</p>
        
        <div style={{ marginBottom: '20px' }}>
          <Link href={`/decks/${deckData.key}`} className="btn btn-secondary">
            ← Back to Deck
          </Link>
        </div>
        
        <div style={{ 
          padding: '40px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>🎓 Study Mode</h3>
          <p>No cards to study yet.</p>
          <p>Add some cards to the {deckData.name} deck first!</p>
          
          <div style={{ marginTop: '20px' }}>
            <Link href={`/decks/${deckData.key}`} className="btn btn-primary">
              Add Cards
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Study {deckData.name} Deck</h1>
      <p>Study cards in the {deckData.name} deck.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <Link href={`/decks/${deckData.key}`} className="btn btn-secondary">
          ← Back to Deck
        </Link>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div style={{ 
          width: '100%', 
          height: '8px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${progress}%`, 
            height: '100%', 
            backgroundColor: '#007bff',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Study Controls */}
      <div style={{ 
        marginBottom: '20px', 
        display: 'flex', 
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={handleShuffle}
          className="btn"
          style={{ backgroundColor: '#6c757d', color: 'white' }}
        >
          🔀 Shuffle Deck
        </button>
        {isShuffled && (
          <button 
            onClick={handleReset}
            className="btn"
            style={{ backgroundColor: '#dc3545', color: 'white' }}
          >
            ↺ Reset Order
          </button>
        )}
      </div>

      {/* Study Card */}
      <div style={{ 
        padding: '40px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        textAlign: 'center',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {currentCard && (
          <>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '20px',
                color: '#495057'
              }}>
                {showAnswer ? 'Answer' : 'Question'}
              </h3>
              <div style={{ 
                fontSize: '16px', 
                lineHeight: '1.6',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {showAnswer ? currentCard.answer : currentCard.question}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <button 
                onClick={handleFlip}
                className="btn btn-primary"
                style={{ fontSize: '16px', padding: '12px 24px' }}
              >
                {showAnswer ? '👁️ Show Question' : '👁️ Show Answer'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <div style={{ 
        marginTop: '20px', 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button 
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="btn"
          style={{ 
            backgroundColor: currentIndex === 0 ? '#e9ecef' : '#17a2b8',
            color: currentIndex === 0 ? '#6c757d' : 'white',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
          }}
        >
          ← Previous
        </button>

        <div style={{ fontSize: '14px', color: '#666' }}>
          {currentIndex > 0 && (
            <span>← {currentIndex} cards studied</span>
          )}
          {currentIndex < cards.length - 1 && (
            <span style={{ marginLeft: '20px' }}>
              {cards.length - currentIndex - 1} cards remaining →
            </span>
          )}
        </div>

        <button 
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          className="btn"
          style={{ 
            backgroundColor: currentIndex === cards.length - 1 ? '#e9ecef' : '#28a745',
            color: currentIndex === cards.length - 1 ? '#6c757d' : 'white',
            cursor: currentIndex === cards.length - 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Next →
        </button>
      </div>

      {/* Study Tips */}
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4 style={{ marginBottom: '10px', color: '#0056b3' }}>💡 Study Tips:</h4>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Try to answer the question before revealing the answer</li>
          <li>Use the shuffle feature to randomize card order</li>
          <li>Review cards multiple times for better retention</li>
          <li>Focus on cards you find difficult</li>
        </ul>
      </div>
    </div>
  )
}
