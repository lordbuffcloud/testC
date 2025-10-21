'use server'

import { redirect } from 'next/navigation'
import { createSession, clearSession } from '@/lib/session'
import { env } from '@/lib/env'

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  
  if (!password || password !== env.APP_PASSWORD) {
    throw new Error('Invalid password')
  }
  
  const cookie = createSession()
  
  // Set cookie and redirect
  redirect('/decks')
}

export async function logout() {
  const cookie = clearSession()
  
  // Clear cookie and redirect
  redirect('/login')
}
