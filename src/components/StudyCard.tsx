'use client'

import { useState, useEffect, useCallback } from 'react'
import { shuffle } from '@/lib/shuffle'

interface Card {
  id: string
  question: string
  answer: string
}

interface StudyCardProps {
  cards: Card[]
}

export default function StudyCard({ cards }: StudyCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [shuffledCards, setShuffledCards] = useState<Card[]>([])

  // Shuffle cards once on mount
  useEffect(() => {
    if (cards.length > 0) {
      setShuffledCards(shuffle(cards))
    }
  }, [cards])

  const currentCard = shuffledCards[currentIndex]

  const handleFlip = useCallback(() => {
    setShowAnswer(!showAnswer)
  }, [showAnswer])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % shuffledCards.length)
    setShowAnswer(false)
  }, [shuffledCards.length])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length)
    setShowAnswer(false)
  }, [shuffledCards.length])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return // Don't interfere with form inputs
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          handleFlip()
          break
        case 'ArrowLeft':
          e.preventDefault()
          handlePrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          handleNext()
          break
        case 'Escape':
          e.preventDefault()
          window.history.back()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleFlip, handleNext, handlePrevious])

  if (cards.length === 0) {
    return (
      <div className="study-card">
        <div className="study-content">
          <p>No cards to study. Add some cards to the deck first!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="study-card">
      <div className="study-content">
        <div className="card-text">
          {showAnswer ? currentCard.answer : currentCard.question}
        </div>
      </div>
      
      <div className="study-actions">
        <button onClick={handleFlip} className="btn">
          {showAnswer ? 'Show Question' : 'Show Answer'}
        </button>
        <button onClick={handlePrevious} className="btn btn-secondary" disabled={shuffledCards.length <= 1}>
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-secondary" disabled={shuffledCards.length <= 1}>
          Next
        </button>
      </div>
      
      <div className="study-nav">
        <span className="study-position">
          {currentIndex + 1} of {shuffledCards.length}
        </span>
        <span className="study-hints">
          Press Space to flip, Arrow keys to navigate, Escape to go back
        </span>
      </div>
    </div>
  )
}
