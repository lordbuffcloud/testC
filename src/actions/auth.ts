'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createSession, clearSession } from '@/lib/session'

export async function login(formData: FormData) {
  try {
    const password = formData.get('password') as string
    const appPassword = process.env.APP_PASSWORD
    
    if (!appPassword) {
      throw new Error('APP_PASSWORD environment variable not set')
    }
    
    if (!password || password !== appPassword) {
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
  } catch (error) {
    console.error('Login error:', error)
    // Redirect back to login with error
    redirect('/login?error=1')
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('__session')
    redirect('/login')
  } catch (error) {
    console.error('Logout error:', error)
    redirect('/login')
  }
}
