import { UserList } from '@/features/user/components/UserList'

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='h-full'>
      <div className='fixed w-80 h-full shadow-sm'>
        <UserList data={[]} />
      </div>
      <div className='h-full pl-80'>{children}</div>
    </div>
  )
}

export default Layout
