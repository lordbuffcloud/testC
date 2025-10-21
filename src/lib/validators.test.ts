import { describe, it, expect } from 'vitest'
import { normalizeText, validateCard } from './validators'

describe('validators', () => {
  describe('normalizeText', () => {
    it('should trim whitespace', () => {
      expect(normalizeText('  hello  ')).toBe('hello')
      expect(normalizeText('\n\tworld\t\n')).toBe('world')
    })

    it('should handle empty strings', () => {
      expect(normalizeText('')).toBe('')
      expect(normalizeText('   ')).toBe('')
    })

    it('should preserve content', () => {
      expect(normalizeText('Hello, World!')).toBe('Hello, World!')
      expect(normalizeText('Question with\nmultiple lines')).toBe('Question with\nmultiple lines')
    })
  })

  describe('validateCard', () => {
    it('should validate correct card', () => {
      const result = validateCard({
        question: 'What is the capital of France?',
        answer: 'Paris'
      })
      
      expect(result.ok).toBe(true)
      expect(result.errors).toBeUndefined()
    })

    it('should reject empty question', () => {
      const result = validateCard({
        question: '',
        answer: 'Paris'
      })
      
      expect(result.ok).toBe(false)
      expect(result.errors?.q).toBe('Question cannot be empty')
    })

    it('should reject empty answer', () => {
      const result = validateCard({
        question: 'What is the capital of France?',
        answer: ''
      })
      
      expect(result.ok).toBe(false)
      expect(result.errors?.a).toBe('Answer cannot be empty')
    })

    it('should reject whitespace-only question', () => {
      const result = validateCard({
        question: '   ',
        answer: 'Paris'
      })
      
      expect(result.ok).toBe(false)
      expect(result.errors?.q).toBe('Question cannot be empty')
    })

    it('should reject whitespace-only answer', () => {
      const result = validateCard({
        question: 'What is the capital of France?',
        answer: '\n\t  '
      })
      
      expect(result.ok).toBe(false)
      expect(result.errors?.a).toBe('Answer cannot be empty')
    })

    it('should reject both empty fields', () => {
      const result = validateCard({
        question: '',
        answer: ''
      })
      
      expect(result.ok).toBe(false)
      expect(result.errors?.q).toBe('Question cannot be empty')
      expect(result.errors?.a).toBe('Answer cannot be empty')
    })

    it('should handle long text', () => {
      const longText = 'a'.repeat(1000)
      const result = validateCard({
        question: longText,
        answer: longText
      })
      
      expect(result.ok).toBe(true)
    })

    it('should reject text longer than 1000 characters', () => {
      const tooLongText = 'a'.repeat(1001)
      const result = validateCard({
        question: tooLongText,
        answer: 'Normal answer'
      })
      
      expect(result.ok).toBe(false)
      expect(result.errors?.q).toBe('Question must be 1000 characters or less')
    })
  })
})
