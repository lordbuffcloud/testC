import { NextResponse } from 'next/server'

export async function GET() {
  // Simple test to verify the login logic
  const testPassword = 'clasby'
  const hardcodedPassword = 'clasby'
  
  return NextResponse.json({
    test: 'Login Logic Test',
    hardcodedPassword: hardcodedPassword,
    testPassword: testPassword,
    match: testPassword === hardcodedPassword,
    testPasswordLength: testPassword.length,
    hardcodedPasswordLength: hardcodedPassword.length,
    timestamp: new Date().toISOString()
  })
}
