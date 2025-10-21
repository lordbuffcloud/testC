'use client'

import { useEffect, useState } from 'react'

export default function CookieTest() {
  const [cookieValue, setCookieValue] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    // Check if logged in cookie exists
    const cookies = document.cookie.split(';')
    const loggedInCookie = cookies.find(cookie => cookie.trim().startsWith('logged_in='))
    
    if (loggedInCookie) {
      const value = loggedInCookie.split('=')[1]
      setCookieValue(value)
      setIsLoggedIn(value === 'true')
    }
  }, [])

  const clearCookie = () => {
    if (typeof window === 'undefined') return
    document.cookie = 'logged_in=; path=/; max-age=0'
    setCookieValue('')
    setIsLoggedIn(false)
  }

  const setCookie = () => {
    if (typeof window === 'undefined') return
    document.cookie = 'logged_in=true; path=/; max-age=86400'
    setCookieValue('true')
    setIsLoggedIn(true)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Cookie Test Page</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>Cookie Status:</h3>
        <p><strong>Cookie Value:</strong> {cookieValue || 'Not set'}</p>
        <p><strong>Is Logged In:</strong> {isLoggedIn ? 'Yes' : 'No'}</p>
        <p><strong>All Cookies:</strong> {typeof window !== 'undefined' ? document.cookie || 'None' : 'Loading...'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={setCookie} style={{ marginRight: '10px', padding: '10px' }}>
          Set Login Cookie
        </button>
        <button onClick={clearCookie} style={{ padding: '10px' }}>
          Clear Login Cookie
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <a href="/decks" style={{ marginRight: '10px', padding: '10px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Go to Decks
        </a>
        <a href="/simple-login" style={{ padding: '10px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Go to Login
        </a>
      </div>

      <div style={{ fontSize: '14px', color: '#666' }}>
        <p><strong>Instructions:</strong></p>
        <ul>
          <li>Click "Set Login Cookie" to simulate being logged in</li>
          <li>Click "Go to Decks" to test if middleware allows access</li>
          <li>Click "Clear Login Cookie" to simulate logout</li>
          <li>Try accessing protected routes after clearing cookie</li>
        </ul>
      </div>
    </div>
  )
}
