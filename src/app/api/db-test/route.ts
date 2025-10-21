import { NextResponse } from 'next/server'
import { getDecks } from '@/lib/data'
import { env } from '@/lib/env'

export async function GET() {
  const result = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
    },
    tests: {
      blobImport: { status: 'pending', error: null as string | null },
      blobConnection: { status: 'pending', error: null as string | null },
      blobQuery: { status: 'pending', error: null as string | null, data: undefined as any },
    }
  }

  // Test 1: Import Blob Storage
  try {
    const { put, list } = await import('@vercel/blob')
    result.tests.blobImport.status = 'success'
  } catch (error) {
    result.tests.blobImport.status = 'error'
    result.tests.blobImport.error = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(result, { status: 500 })
  }

  // Test 2: Blob Storage Connection
  try {
    const { list } = await import('@vercel/blob')
    await list({ prefix: 'test/', token: env.BLOB_READ_WRITE_TOKEN })
    result.tests.blobConnection.status = 'success'
  } catch (error) {
    result.tests.blobConnection.status = 'error'
    result.tests.blobConnection.error = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(result, { status: 500 })
  }

  // Test 3: Data Query
  try {
    const decks = await getDecks()
    result.tests.blobQuery.status = 'success'
    result.tests.blobQuery.error = null
    result.tests.blobQuery.data = { deckCount: decks.length }
  } catch (error) {
    result.tests.blobQuery.status = 'error'
    result.tests.blobQuery.error = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(result, { status: 500 })
  }

  return NextResponse.json(result, { status: 200 })
}
