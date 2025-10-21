'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCard } from '@/actions/cards'
import { validateCard } from '@/lib/validators'

interface AddCardModalProps {
  deckKey: string
  isOpen: boolean
  onClose: () => void
}

export default function AddCardModal({ deckKey, isOpen, onClose }: AddCardModalProps) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Validate input
      const validation = validateCard({ question, answer })
      if (!validation.ok) {
        const errors = Object.values(validation.errors || {}).join(', ')
        setError(errors)
        return
      }

      await createCard(deckKey, question, answer)
      
      // Reset form and close modal
      setQuestion('')
      setAnswer('')
      onClose()
      
      // Refresh the page to show new card
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create card')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setQuestion('')
    setAnswer('')
    setError('')
    onClose()
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Card</h2>
          <button type="button" className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="question">Question</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="form-control"
              rows={3}
              placeholder="Enter your question..."
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="answer">Answer</label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              rows={4}
              placeholder="Enter the answer..."
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
