# Flash Decks

A minimal, shippable flash-card web app for studying with three fixed decks: Patrol, EC, and BDOC.

## Features

- Single password authentication
- Three fixed study decks (Patrol, EC, BDOC)
- Create and edit flash cards
- Study mode with flip, navigation, and shuffle
- Vercel Postgres database integration

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Vercel Postgres
- Vitest (testing)

## Getting Started

### Prerequisites

- Node.js 18+
- Vercel account (for deployment)
- Vercel Postgres database

### Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see Environment Variables)
4. Initialize database: Visit `/api/init` once
5. Start development server: `npm run dev`
6. Visit `http://localhost:3000`

### Environment Variables

Create `.env.local` with:

```env
APP_PASSWORD=your-secure-password
APP_SECRET=at-least-32-characters-random-string
POSTGRES_URL=your-vercel-postgres-url
```

### Testing

Run tests: `npm test`

### Building

Build for production: `npm run build`

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Add Vercel Postgres integration
3. Set environment variables in Vercel dashboard:
   - `APP_PASSWORD`
   - `APP_SECRET`
   - `POSTGRES_URL` (auto-provided by Vercel Postgres)
4. Deploy
5. Visit `/api/init` once to initialize database

## Usage

1. Visit the app and enter the password
2. Select a deck (Patrol, EC, or BDOC)
3. Add cards using the "+ Add Card" button
4. Edit cards inline by clicking on question/answer text
5. Click "Study" to enter study mode
6. Use flip, next/previous, and keyboard shortcuts

## License

MIT
