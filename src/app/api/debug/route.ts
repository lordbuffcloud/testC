import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    appPasswordSet: !!process.env.APP_PASSWORD,
    appPasswordLength: process.env.APP_PASSWORD?.length || 0,
    appSecretSet: !!process.env.APP_SECRET,
    databaseUrlSet: !!process.env.DATABASE_URL,
    postgresUrlSet: !!process.env.POSTGRES_URL,
    hermestrisDatabaseUrlSet: !!process.env.hermestris_DATABASE_URL,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('DATABASE') || key.includes('POSTGRES') || key.includes('APP_')
    )
  })
}
