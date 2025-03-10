import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuth = nextUrl.pathname.startsWith('/api/auth')

  if (isApiAuth) {
    return
  }

  if (nextUrl.pathname === '/') {
    if (isLoggedIn) {
      return Response.redirect(new URL('/users', nextUrl))
    }
  }

  if (!isLoggedIn) {
    if (nextUrl.pathname !== '/') {
      return Response.redirect(new URL('/', nextUrl))
    }
  }

  return
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
