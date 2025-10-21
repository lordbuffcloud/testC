import { NextResponse } from 'next/server'
import { env } from '@/lib/env'

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelRegion: process.env.VERCEL_REGION,
    },
    environmentVariables: {
      hasAppPassword: !!env.APP_PASSWORD,
      hasAppSecret: !!env.APP_SECRET,
      hasDatabaseUrl: !!env.DATABASE_URL,
      databaseUrlLength: env.DATABASE_URL?.length || 0,
    },
    database: {
      status: 'unknown',
      error: null as string | null
    }
  }

  // Test database connection if DATABASE_URL is available
  if (env.DATABASE_URL) {
    try {
      const { prisma } = await import('@/lib/prisma')
      await prisma.$queryRaw`SELECT 1`
      health.database.status = 'connected'
    } catch (error) {
      health.database.status = 'error'
      health.database.error = error instanceof Error ? error.message : 'Unknown error'
    }
  } else {
    health.database.status = 'no_url'
    health.database.error = 'DATABASE_URL not found'
  }

  return NextResponse.json(health, { 
    status: health.database.status === 'connected' ? 200 : 503 
  })
}
