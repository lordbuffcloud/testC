import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Environment Test',
    appPassword: process.env.APP_PASSWORD || 'NOT_SET',
    appSecret: process.env.APP_SECRET ? 'SET' : 'NOT_SET',
    databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
    postgresUrl: process.env.POSTGRES_URL ? 'SET' : 'NOT_SET',
    hermestrisDatabaseUrl: process.env.hermestris_DATABASE_URL ? 'SET' : 'NOT_SET',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    timestamp: new Date().toISOString()
  })
}
