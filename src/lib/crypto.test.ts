import { describe, it, expect } from 'vitest'
import { sign, verify } from './crypto'

describe('crypto', () => {
  const secret = 'test-secret-key-at-least-32-chars'
  const payload = 'test-payload'

  it('should sign and verify payload correctly', () => {
    const signature = sign(payload, secret)
    expect(signature).toBeDefined()
    expect(typeof signature).toBe('string')
    
    const isValid = verify(payload, signature, secret)
    expect(isValid).toBe(true)
  })

  it('should reject tampered signatures', () => {
    const signature = sign(payload, secret)
    const tamperedSignature = signature.slice(0, -5) + 'xxxxx'
    
    const isValid = verify(payload, tamperedSignature, secret)
    expect(isValid).toBe(false)
  })

  it('should reject signatures for different payloads', () => {
    const signature = sign(payload, secret)
    const differentPayload = 'different-payload'
    
    const isValid = verify(differentPayload, signature, secret)
    expect(isValid).toBe(false)
  })

  it('should reject signatures with different secrets', () => {
    const signature = sign(payload, secret)
    const differentSecret = 'different-secret-key-at-least-32-chars'
    
    const isValid = verify(payload, signature, differentSecret)
    expect(isValid).toBe(false)
  })
})
