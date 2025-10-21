import { NextResponse } from 'next/server'
import { env } from '@/lib/env'

export async function GET() {
  const result = {
    timestamp: new Date().toISOString(),
    environment: {
      hasDatabaseUrl: !!env.DATABASE_URL,
      databaseUrlPrefix: env.DATABASE_URL?.substring(0, 20) + '...' || 'not set',
      nodeEnv: process.env.NODE_ENV,
    },
    tests: {
      prismaImport: { status: 'pending', error: null as string | null },
      prismaConnection: { status: 'pending', error: null as string | null },
      prismaQuery: { status: 'pending', error: null as string | null },
    }
  }

  // Test 1: Import Prisma
  try {
    const { prisma } = await import('@/lib/prisma')
    result.tests.prismaImport.status = 'success'
  } catch (error) {
    result.tests.prismaImport.status = 'error'
    result.tests.prismaImport.error = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(result, { status: 500 })
  }

  // Test 2: Prisma Connection
  try {
    const { prisma } = await import('@/lib/prisma')
    await prisma.$connect()
    result.tests.prismaConnection.status = 'success'
  } catch (error) {
    result.tests.prismaConnection.status = 'error'
    result.tests.prismaConnection.error = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(result, { status: 500 })
  }

  // Test 3: Simple Query
  try {
    const { prisma } = await import('@/lib/prisma')
    const testResult = await prisma.$queryRaw`SELECT 1 as test`
    result.tests.prismaQuery.status = 'success'
    result.tests.prismaQuery.error = null
  } catch (error) {
    result.tests.prismaQuery.status = 'error'
    result.tests.prismaQuery.error = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(result, { status: 500 })
  }

  return NextResponse.json(result, { status: 200 })
}
