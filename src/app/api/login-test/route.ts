import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const password = formData.get('password') as string
    
    return NextResponse.json({
      success: true,
      password: password,
      hardcodedPassword: 'clasby',
      match: password === 'clasby',
      passwordLength: password?.length,
      formDataKeys: Array.from(formData.keys())
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
