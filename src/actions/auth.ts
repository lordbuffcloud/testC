'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createSession, clearSession } from '@/lib/session'
import { env } from '@/lib/env'

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  
  if (!password || password !== env.APP_PASSWORD) {
    throw new Error('Invalid password')
  }
  
  const cookie = createSession()
  const cookieStore = await cookies()
  cookieStore.set('__session', cookie.split('=')[1].split(';')[0], {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 // 24 hours
  })
  
  redirect('/decks')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('__session')
  
  redirect('/login')
}
