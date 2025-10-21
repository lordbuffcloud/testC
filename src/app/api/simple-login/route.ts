import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const password = formData.get('password') as string
    
    // Simple hardcoded password check
    if (password === 'clasby') {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        redirect: '/decks'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid password',
        provided: password,
        expected: 'clasby'
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Login API Test',
    instructions: 'Send POST request with form data containing password field',
    testPassword: 'clasby'
  })
}
