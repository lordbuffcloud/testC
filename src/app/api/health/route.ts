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
    },
    storage: {
      type: 'vercel-blob',
      status: 'ready'
    }
  }

  return NextResponse.json(health, { status: 200 })
}
