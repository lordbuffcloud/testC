'use client'

import type { Metadata } from 'next'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <header className="header">
          <div className="container">
            <h1>Flash Decks</h1>
            <button 
              onClick={() => {
                document.cookie = 'logged_in=; path=/; max-age=0'
                window.location.href = '/simple-login'
              }}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="main">
          <div className="container">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
