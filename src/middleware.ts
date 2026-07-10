import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Check if it is a request for admin or admin API, excluding login endpoints
  const isAdminPath = url.pathname.startsWith('/admin')
  const isAdminApiPath = url.pathname.startsWith('/api/admin')
  const isLoginPath = url.pathname === '/admin/login'
  const isLoginApiPath = url.pathname === '/api/admin/login'

  if ((isAdminPath || isAdminApiPath) && !isLoginPath && !isLoginApiPath) {
    const sessionCookie = request.cookies.get('admin_session')
    const isValidSession = sessionCookie?.value === 'surveilab-admin-session-token-2026'

    if (!isValidSession) {
      if (isAdminApiPath) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized. Silakan login.' },
          { status: 401 }
        )
      } else {
        // Redirect to login page
        const loginUrl = new URL('/admin/login', request.url)
        return NextResponse.redirect(loginUrl)
      }
    }
  }

  // Simple CORS handling for other API routes
  const response = NextResponse.next()
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/admin',
    '/api/admin/:path*',
    '/api/:path*',
  ],
}
