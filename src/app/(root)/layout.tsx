import { SessionProvider } from 'next-auth/react'

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SessionProvider>
      <main className='h-screen'>{children}</main>
    </SessionProvider>
  )
}

export default Layout
