import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Test the exact same logic as the login action
    const formData = await request.formData()
    const password = formData.get('password') as string
    const hardcodedPassword = 'clasby'
    
    console.log('API Test - Login attempt:', {
      password: password,
      hardcodedPassword: hardcodedPassword,
      match: password === hardcodedPassword,
      passwordLength: password?.length,
      formDataKeys: Array.from(formData.keys())
    })
    
    if (!password) {
      return NextResponse.json({
        success: false,
        error: 'No password provided',
        debug: { password, hardcodedPassword }
      }, { status: 400 })
    }
    
    if (password !== hardcodedPassword) {
      return NextResponse.json({
        success: false,
        error: 'Invalid password',
        debug: {
          provided: password,
          expected: hardcodedPassword,
          providedLength: password.length,
          expectedLength: hardcodedPassword.length
        }
      }, { status: 400 })
    }
    
    // Test session creation
    try {
      const { createSession } = await import('@/lib/session')
      const cookie = createSession()
      
      return NextResponse.json({
        success: true,
        message: 'Login would succeed',
        debug: {
          password: password,
          hardcodedPassword: hardcodedPassword,
          match: password === hardcodedPassword,
          sessionCookie: cookie.substring(0, 50) + '...'
        }
      })
    } catch (sessionError) {
      return NextResponse.json({
        success: false,
        error: 'Session creation failed',
        sessionError: sessionError instanceof Error ? sessionError.message : 'Unknown session error',
        debug: { password, hardcodedPassword }
      }, { status: 500 })
    }
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
