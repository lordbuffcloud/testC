# Vercel Deployment Setup Guide

## Environment Variables Required

Your Flash Decks application requires the following environment variables to be set in Vercel:

### Required Variables

1. **DATABASE_URL** (Required)
   - PostgreSQL connection string
   - Format: `postgresql://username:password@host:port/database`
   - Example: `postgresql://user:pass@db.example.com:5432/flashdecks`

2. **APP_PASSWORD** (Required)
   - Password for application authentication
   - Can be any string (no minimum length requirement)

3. **APP_SECRET** (Required)
   - Secret key for signing cookies
   - Must be at least 32 characters long
   - Generate with: `openssl rand -base64 32`

### Setting Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable:
   - Name: `DATABASE_URL`
   - Value: Your PostgreSQL connection string
   - Environment: Production, Preview, Development (select all)

### Database Setup

You need a PostgreSQL database. Options:

1. **Vercel Postgres** (Recommended)
   - Go to Vercel dashboard → Storage → Create Database
   - Select "Postgres"
   - Copy the connection string to `DATABASE_URL`

2. **External PostgreSQL**
   - Use services like Supabase, Railway, or Neon
   - Get connection string and set as `DATABASE_URL`

### Testing Your Setup

After setting environment variables, test with these endpoints:

- `/api/health` - Overall health check with environment status
- `/api/env-test` - Environment variable validation
- `/api/db-test` - Database connection test

### Common Issues

1. **"Environment variable not found: DATABASE_URL"**
   - Check that `DATABASE_URL` is set in Vercel
   - Ensure it's enabled for the correct environment (Production/Preview)

2. **Database connection errors**
   - Verify the connection string format
   - Check database server is accessible
   - Ensure database exists and is running

3. **APP_SECRET too short**
   - Generate a new secret: `openssl rand -base64 32`
   - Update in Vercel environment variables

### Deployment Checklist

- [ ] DATABASE_URL set in Vercel
- [ ] APP_PASSWORD set in Vercel  
- [ ] APP_SECRET set in Vercel (32+ characters)
- [ ] Database is running and accessible
- [ ] Environment variables enabled for Production environment
- [ ] Test endpoints return 200 status codes
