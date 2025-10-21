import { cookies } from 'next/headers'
import { sign, verify } from './crypto'
import { env } from './env'

const COOKIE_NAME = '__session'
const MAX_AGE = 24 * 60 * 60 // 24 hours

export interface SessionData {
  a: number // authenticated flag
  iat: number // issued at timestamp
}

export function createSession(): string {
  const payload = JSON.stringify({
    a: 1,
    iat: Date.now()
  })
  
  const hardcodedSecret = 'qwertyuiopQWERTYUIOPqwertyuiopQW'
  const signature = sign(payload, hardcodedSecret)
  const token = `${payload}.${signature}`
  
  return `${COOKIE_NAME}=${token}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; Secure; SameSite=Lax`
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  
  if (!cookie?.value) {
    return null
  }
  
  const [payload, signature] = cookie.value.split('.')
  if (!payload || !signature) {
    return null
  }
  
  const hardcodedSecret = 'qwertyuiopQWERTYUIOPqwertyuiopQW'
  if (!verify(payload, signature, hardcodedSecret)) {
    return null
  }
  
  try {
    const data = JSON.parse(payload) as SessionData
    
    // Check if session is expired
    if (Date.now() - data.iat > MAX_AGE * 1000) {
      return null
    }
    
    return data
  } catch {
    return null
  }
}

export function clearSession(): string {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`
}
