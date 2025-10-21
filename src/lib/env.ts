export const env = {
  APP_PASSWORD: process.env.APP_PASSWORD,
  APP_SECRET: process.env.APP_SECRET,
  DATABASE_URL: process.env.DATABASE_URL
}

// Validate required environment variables only at runtime
function validateEnv() {
  const required = ['APP_PASSWORD', 'APP_SECRET', 'DATABASE_URL'] as const
  
  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`)
    }
  }
  
  if (env.APP_SECRET!.length < 32) {
    throw new Error('APP_SECRET must be at least 32 characters long')
  }
}

// Only validate on server side and not during build
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production' && process.env.NEXT_PHASE !== 'phase-production-build') {
  validateEnv()
}
