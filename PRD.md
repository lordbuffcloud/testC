# Flash Decks - Product Requirements Document

## Summary
A minimal, shippable flash-card web app for studying with three fixed decks: Patrol, EC, and BDOC. Features single password authentication, deck selection, card management (create/edit), and study mode with flip/next/prev/shuffle functionality.

## Target Users
- Students and professionals needing to memorize information
- Users requiring simple, focused study tools without complexity

## User Flows

### 1. Authentication Flow
- User visits app → redirected to `/login`
- Enter password → server validates against `APP_PASSWORD`
- Success: signed cookie set, redirect to `/decks`
- Failure: error message displayed

### 2. Deck Selection Flow
- `/decks` page shows three deck cards: Patrol, EC, BDOC
- Click deck → navigate to `/decks/{key}`

### 3. Deck Management Flow
- Deck detail page shows list of existing cards
- "+ Add Card" button opens modal for new card creation
- Inline editing: click question/answer fields to edit
- Save on blur or Enter key
- Cancel on Escape key

### 4. Study Mode Flow
- "Study" button from deck page → `/decks/{key}/study`
- Cards shuffled once on page load
- Flip button toggles between question and answer
- Next/Previous navigation
- Keyboard shortcuts: Space=Flip, Arrow keys=Navigate

## MVP Features

### Core Features
- **Authentication**: Single password gate with session management
- **Deck Selection**: Three fixed decks (Patrol, EC, BDOC)
- **Card Management**: Create new cards, edit existing cards inline
- **Study Mode**: Flip cards, navigate, shuffle functionality
- **Data Persistence**: Vercel Postgres integration

### Fixed Decks
- `patrol` → "Patrol"
- `ec` → "EC" 
- `bdoc` → "BDOC"

### Study Mode Features
- Default shuffle enabled
- Flip to reveal answer
- Next/Previous navigation
- Persistent order per session (client-side state)
- Keyboard shortcuts support

## Non-Functional Requirements

### Browser Support
- Latest Chrome, Edge, Safari, Firefox (desktop)
- Responsive design for tablet/desktop

### Hosting & Database
- Vercel hosting platform
- Vercel Postgres database
- Environment-based configuration

### Performance
- Simple rate limiting omitted for v1
- Optimistic UI updates for better UX

## Authentication

### Implementation
- Single password stored in `APP_PASSWORD` environment variable
- Cookie signed with `APP_SECRET` using HMAC-SHA256
- 24-hour session duration
- Lockout mechanism not required for v1

### Security
- Server-side password comparison only
- Signed session cookies prevent tampering
- httpOnly, Secure, SameSite=Lax cookie settings

## Data Model

### Cards Table
```sql
cards(
  id text primary key,
  deck_key text not null references decks(key),
  question text not null,
  answer text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz null
)
```

### Decks Table
```sql
decks(
  id text primary key,
  key text unique not null,
  name text not null,
  created_at timestamptz default now()
)
```

## Study Mode Behavior

### Default Settings
- Shuffle enabled by default
- Show question first, flip to reveal answer
- Navigation: Previous/Next buttons
- Persistent order maintained during session

### User Experience
- Smooth transitions between cards
- Clear visual feedback for flip state
- Intuitive navigation controls

## Out of Scope (v1)

### Features Not Included
- Mobile PWA/offline functionality
- Card deletion (soft delete reserved)
- Import/export functionality
- Spaced repetition algorithms
- User accounts/multiple users
- Card categories/tags
- Study statistics/analytics

### Future Considerations
- Mobile responsiveness improvements
- Advanced study algorithms
- Bulk operations
- Data export capabilities

## User Experience Design

### Interface Principles
- Clean, minimal design
- Focus on content, not decoration
- Fast, responsive interactions
- Clear visual hierarchy

### Interaction Patterns
- Inline editing for quick modifications
- Modal for new card creation
- Immediate feedback for user actions
- Keyboard shortcuts for power users

## Risks & Mitigations

### Technical Risks
- **DB Schema Initialization**: Ensure idempotent schema creation
- **Deck Seeding**: Verify three decks are created on first run
- **Cookie Security**: Proper HMAC signing implementation
- **Password Security**: Server-only password comparison

### Mitigation Strategies
- Automated database initialization via `/api/init`
- Comprehensive testing for auth flows
- Input validation and sanitization
- Error handling and user feedback

## Dependencies

### Approved Dependencies
- `@vercel/postgres` - Database integration
- `vitest` - Testing framework
- `typescript` - Type safety
- `@types/node` - Node.js types

### Explicitly Excluded
- UI component libraries
- Additional testing frameworks
- Authentication providers
- State management libraries
