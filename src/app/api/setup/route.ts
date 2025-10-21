import { NextResponse } from 'next/server'

export async function GET() {
  const envStatus = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelRegion: process.env.VERCEL_REGION,
    },
    variables: {
      bro_POSTGRES_URL: {
        present: !!process.env.bro_POSTGRES_URL,
        length: process.env.bro_POSTGRES_URL?.length || 0,
        prefix: process.env.bro_POSTGRES_URL?.substring(0, 20) + '...' || 'not set'
      },
      APP_PASSWORD: {
        present: !!process.env.APP_PASSWORD,
        length: process.env.APP_PASSWORD?.length || 0
      },
      APP_SECRET: {
        present: !!process.env.APP_SECRET,
        length: process.env.APP_SECRET?.length || 0
      }
    },
    instructions: {
      step1: "Go to Vercel Dashboard → Your Project → Settings → Environment Variables",
      step2: "Add DATABASE_URL with your PostgreSQL connection string",
      step3: "Add APP_PASSWORD (any string)",
      step4: "Add APP_SECRET (32+ characters)",
      step5: "Redeploy or trigger a new deployment",
      step6: "Visit /api/seed with POST method to populate database"
    }
  }

  return NextResponse.json(envStatus, { 
    status: envStatus.variables.bro_POSTGRES_URL.present ? 200 : 400 
  })
}
