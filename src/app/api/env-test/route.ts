import { NextResponse } from 'next/server'

export async function GET() {
  // This is a temporary debug endpoint - remove after fixing
  return NextResponse.json({
    appPassword: process.env.APP_PASSWORD,
    appSecret: process.env.APP_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    postgresUrl: process.env.POSTGRES_URL,
    hermestrisDatabaseUrl: process.env.hermestris_DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV
  })
}
