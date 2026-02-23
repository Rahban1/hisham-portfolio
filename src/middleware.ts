/// <reference types="next" />
/// <reference types="next/image-types/global" />

import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const url = new URL(request.url)
  
  if (url.pathname.startsWith('/media/')) {
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }
  
  return NextResponse.next()
}
