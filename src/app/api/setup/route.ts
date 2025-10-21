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
      APP_PASSWORD: {
        present: !!process.env.APP_PASSWORD,
        length: process.env.APP_PASSWORD?.length || 0,
        valid: !!process.env.APP_PASSWORD && process.env.APP_PASSWORD.length > 0
      },
      APP_SECRET: {
        present: !!process.env.APP_SECRET,
        length: process.env.APP_SECRET?.length || 0,
        valid: !!process.env.APP_SECRET && process.env.APP_SECRET.length >= 32
      }
    },
    storage: {
      type: 'vercel-blob',
      status: 'ready',
      description: 'Using Vercel Blob for data storage - no database required!'
    },
    summary: {
      allPresent: false,
      allValid: false,
      missingVariables: [] as string[],
      invalidVariables: [] as string[]
    },
    instructions: {
      step1: "Go to Vercel Dashboard → Your Project → Settings → Environment Variables",
      step2: "Add APP_PASSWORD (any string)",
      step3: "Add APP_SECRET (32+ characters)",
      step4: "Redeploy or trigger a new deployment",
      step5: "Visit /decks/patrol to see your flash cards!"
    }
  }

  // Check which variables are missing
  const requiredVars = ['APP_PASSWORD', 'APP_SECRET'] as const
  for (const varName of requiredVars) {
    if (!envStatus.variables[varName].present) {
      envStatus.summary.missingVariables.push(varName)
    }
    if (!envStatus.variables[varName].valid) {
      envStatus.summary.invalidVariables.push(varName)
    }
  }

  envStatus.summary.allPresent = envStatus.summary.missingVariables.length === 0
  envStatus.summary.allValid = envStatus.summary.invalidVariables.length === 0

  const statusCode = envStatus.summary.allValid ? 200 : 400

  return NextResponse.json(envStatus, { status: statusCode })
}
