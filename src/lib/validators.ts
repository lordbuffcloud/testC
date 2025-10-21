const MAX_TEXT_LENGTH = 1000

export function normalizeText(input: string): string {
  return input.trim()
}

export interface CardValidationErrors {
  q?: string
  a?: string
}

export interface CardValidationResult {
  ok: boolean
  errors?: CardValidationErrors
}

export function validateCard(card: { question: string; answer: string }): CardValidationResult {
  const normalizedQuestion = normalizeText(card.question)
  const normalizedAnswer = normalizeText(card.answer)
  
  const errors: CardValidationErrors = {}
  
  if (!normalizedQuestion) {
    errors.q = 'Question cannot be empty'
  } else if (normalizedQuestion.length > MAX_TEXT_LENGTH) {
    errors.q = 'Question must be 1000 characters or less'
  }
  
  if (!normalizedAnswer) {
    errors.a = 'Answer cannot be empty'
  } else if (normalizedAnswer.length > MAX_TEXT_LENGTH) {
    errors.a = 'Answer must be 1000 characters or less'
  }
  
  return {
    ok: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  }
}
