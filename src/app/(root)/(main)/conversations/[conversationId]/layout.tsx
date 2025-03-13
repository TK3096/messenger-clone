const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='bg-white z-50 lg:static absolute left-0 top-0 w-full h-full'>
      {children}
    </div>
  )
}

export default Layout
