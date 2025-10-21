import { NextResponse } from 'next/server'
import { env } from '@/lib/env'

export async function GET() {
  const validation = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelRegion: process.env.VERCEL_REGION,
    },
    variables: {
      APP_PASSWORD: {
        present: !!env.APP_PASSWORD,
        length: env.APP_PASSWORD?.length || 0,
        valid: !!env.APP_PASSWORD && env.APP_PASSWORD.length > 0
      },
      APP_SECRET: {
        present: !!env.APP_SECRET,
        length: env.APP_SECRET?.length || 0,
        valid: !!env.APP_SECRET && env.APP_SECRET.length >= 32
      },
      DATABASE_URL: {
        present: !!env.DATABASE_URL,
        length: env.DATABASE_URL?.length || 0,
        prefix: env.DATABASE_URL?.substring(0, 20) + '...' || 'not set',
        valid: !!env.DATABASE_URL && env.DATABASE_URL.length > 0
      }
    },
    summary: {
      allPresent: false,
      allValid: false,
      missingVariables: [] as string[],
      invalidVariables: [] as string[]
    }
  }

  // Check which variables are missing
  const requiredVars = ['APP_PASSWORD', 'APP_SECRET', 'DATABASE_URL'] as const
  for (const varName of requiredVars) {
    if (!validation.variables[varName].present) {
      validation.summary.missingVariables.push(varName)
    }
    if (!validation.variables[varName].valid) {
      validation.summary.invalidVariables.push(varName)
    }
  }

  validation.summary.allPresent = validation.summary.missingVariables.length === 0
  validation.summary.allValid = validation.summary.invalidVariables.length === 0

  const statusCode = validation.summary.allValid ? 200 : 400

  return NextResponse.json(validation, { status: statusCode })
}