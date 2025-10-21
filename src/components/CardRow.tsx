'use client'

import { useState, useRef, useEffect } from 'react'
import { updateCard } from '@/actions/cards'
import { validateCard } from '@/lib/validators'

interface CardRowProps {
  id: string
  question: string
  answer: string
}

export default function CardRow({ id, question, answer }: CardRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editQuestion, setEditQuestion] = useState(question)
  const [editAnswer, setEditAnswer] = useState(answer)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [error, setError] = useState('')
  
  const questionRef = useRef<HTMLTextAreaElement>(null)
  const answerRef = useRef<HTMLTextAreaElement>(null)

  const handleSave = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      // Validate input
      const validation = validateCard({ question: editQuestion, answer: editAnswer })
      if (!validation.ok) {
        const errors = Object.values(validation.errors || {}).join(', ')
        setError(errors)
        return
      }

      await updateCard(id, { question: editQuestion, answer: editAnswer })
      
      setIsEditing(false)
      setShowSaved(true)
      
      // Hide saved indicator after 2 seconds
      setTimeout(() => setShowSaved(false), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update card')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setEditQuestion(question)
    setEditAnswer(answer)
    setError('')
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  const handleBlur = () => {
    // Only save if content has changed
    if (editQuestion !== question || editAnswer !== answer) {
      handleSave()
    }
  }

  useEffect(() => {
    if (isEditing && questionRef.current) {
      questionRef.current.focus()
    }
  }, [isEditing])

  if (isEditing) {
    return (
      <div className="card-item">
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label>Question</label>
          <textarea
            ref={questionRef}
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="form-control"
            rows={2}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label>Answer</label>
          <textarea
            ref={answerRef}
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="form-control"
            rows={3}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="card-actions">
          <button onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button onClick={handleSave} className="btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card-item">
      <div className="form-group">
        <label>Question</label>
        <div 
          className="card-content"
          onClick={() => setIsEditing(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsEditing(true)
            }
          }}
        >
          {question}
        </div>
      </div>
      
      <div className="form-group">
        <label>Answer</label>
        <div 
          className="card-content"
          onClick={() => setIsEditing(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsEditing(true)
            }
          }}
        >
          {answer}
        </div>
      </div>
      
      {showSaved && <span className="saved-indicator">✓ Saved</span>}
    </div>
  )
}
