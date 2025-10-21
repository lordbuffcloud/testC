import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createSession, getSession, clearSession } from './session'

// Mock the crypto module
vi.mock('./crypto', () => ({
  sign: vi.fn((payload: string) => `${payload}.signature`),
  verify: vi.fn(() => true)
}))

// Mock the env module
vi.mock('./env', () => ({
  env: {
    APP_SECRET: 'test-secret-key-at-least-32-chars'
  }
}))

// Mock Next.js cookies
const mockCookies = {
  get: vi.fn(),
  set: vi.fn()
}

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => mockCookies)
}))

describe('session', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should create session with correct format', () => {
    const cookie = createSession()
    
    expect(cookie).toContain('__session=')
    expect(cookie).toContain('HttpOnly')
    expect(cookie).toContain('Secure')
    expect(cookie).toContain('SameSite=Lax')
    expect(cookie).toContain('Max-Age=86400')
  })

  it('should get valid session', async () => {
    const sessionData = { a: 1, iat: Date.now() }
    const payload = JSON.stringify(sessionData)
    mockCookies.get.mockReturnValue({ value: `${payload}.signature` })
    
    const session = await getSession()
    
    expect(session).toEqual(sessionData)
  })

  it('should return null for missing cookie', async () => {
    mockCookies.get.mockReturnValue(undefined)
    
    const session = await getSession()
    
    expect(session).toBeNull()
  })

  it('should return null for invalid signature', async () => {
    const sessionData = { a: 1, iat: Date.now() }
    const payload = JSON.stringify(sessionData)
    mockCookies.get.mockReturnValue({ value: `${payload}.invalid` })
    
    // Mock verify to return false
    const { verify } = await import('./crypto')
    vi.mocked(verify).mockReturnValue(false)
    
    const session = await getSession()
    
    expect(session).toBeNull()
  })

  it('should clear session', () => {
    const cookie = clearSession()
    
    expect(cookie).toContain('__session=')
    expect(cookie).toContain('Max-Age=0')
    expect(cookie).toContain('HttpOnly')
    expect(cookie).toContain('Secure')
  })
})
