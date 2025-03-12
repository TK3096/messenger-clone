import { DesktopSidebar } from '@/components/navigation/DesktopSidebar'
import { Sidebar } from '@/components/navigation/Sidebar'

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='h-full'>
      <DesktopSidebar />
      <Sidebar />
      <div className='h-full lg:pl-20'>{children}</div>
    </div>
  )
}

export default Layout
