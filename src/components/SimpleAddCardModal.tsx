'use client'

import { useState } from 'react'

interface SimpleAddCardModalProps {
  deckKey: string
  onClose: () => void
  onCardAdded: () => void
}

export default function SimpleAddCardModal({ deckKey, onClose, onCardAdded }: SimpleAddCardModalProps) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simple test - just log the data
      console.log('Adding card:', { deckKey, question, answer })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert(`Card added!\nQuestion: ${question}\nAnswer: ${answer}`)
      onCardAdded()
      onClose()
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px'
      }}>
        <h2>Add New Card (Test Version)</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="question" style={{ display: 'block', marginBottom: '5px' }}>
              Question *
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minHeight: '80px'
              }}
              placeholder="Enter your question..."
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="answer" style={{ display: 'block', marginBottom: '5px' }}>
              Answer (Optional)
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minHeight: '80px'
              }}
              placeholder="Enter the answer (optional)..."
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !question.trim()}
              style={{
                padding: '10px 20px',
                backgroundColor: loading ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Adding...' : 'Add Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
