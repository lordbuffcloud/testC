# Flash Decks - Acceptance Criteria

This document defines the "definition of done" for the Flash Decks MVP. All items must be verified before considering the project complete.

## Authentication ✅

### Login Flow
- [ ] Wrong password shows error message, no session cookie is set
- [ ] Correct password sets httpOnly, Secure signed cookie `__session` and redirects to `/decks`
- [ ] Session persists across browser refreshes for 24 hours
- [ ] Logout clears session cookie and redirects to `/login`

### Security
- [ ] Password comparison happens server-side only
- [ ] Session cookie is signed with HMAC-SHA256
- [ ] Cookie settings: httpOnly, Secure, SameSite=Lax
- [ ] No password exposure in client-side code

## Deck Selection ✅

### Decks Page (`/decks`)
- [ ] Shows exactly three deck cards: Patrol, EC, BDOC
- [ ] Each deck card navigates to `/decks/{key}` when clicked
- [ ] Deck names display correctly: "Patrol", "EC", "BDOC"
- [ ] Page loads without authentication errors

## Deck Management ✅

### Deck Detail Page (`/decks/{key}`)
- [ ] Lists existing cards from database for the selected deck
- [ ] Shows deck name in page header
- [ ] Displays "Study" button that navigates to study mode
- [ ] Shows "+ Add Card" button that opens modal

### Card Creation
- [ ] "+ Add Card" opens modal with question and answer fields
- [ ] Saving persists question and answer to database
- [ ] List refreshes optimistically after successful creation
- [ ] Modal closes after successful save
- [ ] Empty question or answer shows validation error

### Card Editing
- [ ] Inline edit works for both question and answer fields
- [ ] Save on blur updates database immediately
- [ ] Save on Enter key updates database immediately
- [ ] Cancel on Escape key reverts changes
- [ ] Shows "Saved" indicator after successful update
- [ ] Updates `updated_at` timestamp in database

## Study Mode ✅

### Study Page (`/decks/{key}/study`)
- [ ] Shows one card at a time from selected deck
- [ ] Cards are shuffled once on page load
- [ ] Flip button toggles between question and answer
- [ ] Next button advances to next card
- [ ] Previous button goes to previous card
- [ ] Navigation wraps around (last → first, first → last)
- [ ] Shows current card position (e.g., "3 of 10")

### Keyboard Shortcuts
- [ ] Space bar flips current card
- [ ] Left arrow goes to previous card
- [ ] Right arrow goes to next card
- [ ] Escape returns to deck page

### Study State
- [ ] Shuffle order persists during session
- [ ] Card flip state resets when navigating between cards
- [ ] Empty deck shows appropriate message

## Data Management ✅

### Database Schema
- [ ] `decks` table exists with correct structure
- [ ] `cards` table exists with correct structure
- [ ] Foreign key relationship between cards and decks
- [ ] Soft delete column (`deleted_at`) present but unused

### Data Seeding
- [ ] Three decks are seeded on first run (idempotent)
- [ ] Deck keys are exactly: "patrol", "ec", "bdoc"
- [ ] Deck names are exactly: "Patrol", "EC", "BDOC"
- [ ] Seeding can be run multiple times safely

### Data Operations
- [ ] Card creation generates unique IDs
- [ ] Card updates modify `updated_at` timestamp
- [ ] Soft delete functionality reserved for future
- [ ] Database queries use parameterized statements

## Development Experience ✅

### Testing
- [ ] `npm test` using vitest passes all tests
- [ ] Unit tests cover core utilities (crypto, session, shuffle)
- [ ] Integration tests cover server actions
- [ ] Test coverage includes error cases

### Build Process
- [ ] `npm run build` succeeds without errors
- [ ] TypeScript compilation passes
- [ ] No linting errors
- [ ] Production build is optimized

### Code Quality
- [ ] All functions have proper TypeScript types
- [ ] Server actions include input validation
- [ ] Error handling is comprehensive
- [ ] Code follows established patterns

## Deployment ✅

### Vercel Integration
- [ ] Vercel build completes successfully
- [ ] App works with Vercel Postgres integration
- [ ] Environment variables are properly configured
- [ ] Database initialization runs on first deploy

### Environment Configuration
- [ ] `APP_PASSWORD` is set and working
- [ ] `APP_SECRET` is set and working
- [ ] `POSTGRES_URL` is provided by Vercel Postgres
- [ ] `/api/init` endpoint initializes database

### Production Readiness
- [ ] App loads without errors in production
- [ ] Authentication works in production
- [ ] Database operations work in production
- [ ] All user flows work end-to-end

## User Experience ✅

### Accessibility
- [ ] Form fields have proper labels
- [ ] Buttons have descriptive text or aria-labels
- [ ] Keyboard navigation works throughout app
- [ ] Focus management is appropriate

### Performance
- [ ] Page loads are fast (< 2 seconds)
- [ ] Database queries are efficient
- [ ] No unnecessary re-renders
- [ ] Optimistic updates provide good UX

### Error Handling
- [ ] Invalid deck keys show 404 page
- [ ] Database errors show user-friendly messages
- [ ] Network errors are handled gracefully
- [ ] Form validation provides clear feedback

## Verification Steps

### Manual Testing Checklist
1. [ ] Set up environment variables
2. [ ] Run `npm run dev`
3. [ ] Visit `/api/init` to initialize database
4. [ ] Visit `/login` and test authentication
5. [ ] Navigate to `/decks` and verify three decks
6. [ ] Add a card to Patrol deck
7. [ ] Edit the card inline
8. [ ] Enter study mode and test all features
9. [ ] Test keyboard shortcuts
10. [ ] Verify logout functionality

### Automated Testing
- [ ] All unit tests pass
- [ ] Integration tests pass
- [ ] Build process completes
- [ ] Type checking passes
- [ ] Linting passes

## Success Criteria

The project is considered complete when:
- [ ] All acceptance criteria are met
- [ ] Manual testing checklist passes
- [ ] Automated tests pass
- [ ] App deploys successfully to Vercel
- [ ] All user flows work end-to-end in production
- [ ] Code quality standards are met
- [ ] Documentation is complete and accurate
