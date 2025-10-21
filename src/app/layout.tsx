import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flash Decks',
  description: 'A minimal flash-card web app for studying',
  icons: {
    icon: '/favicon.svg',
  },
}

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
