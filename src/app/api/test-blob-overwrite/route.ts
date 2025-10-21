import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { env } from '@/lib/env'

export async function GET() {
  try {
    console.log('Testing blob overwrite...')
    
    // Test if we can overwrite a blob
    await put('test-overwrite.json', JSON.stringify({ test: 'data', timestamp: new Date().toISOString() }), {
      access: 'public',
      contentType: 'application/json',
      token: env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true
    })
    
    console.log('Blob overwrite test successful!')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Blob overwrite test passed',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Blob overwrite test failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
