import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  
  // Redirect to the main page after authentication
  return NextResponse.redirect(requestUrl.origin)
}
