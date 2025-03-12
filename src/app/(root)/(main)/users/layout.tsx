import { getUsers } from '@/features/user/actions'

import { UserList } from '@/features/user/components/UserList'

const Layout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const users = await getUsers()

  return (
    <div className='h-full'>
      <div className='fixed w-full lg:w-80 h-full shadow-sm'>
        <UserList data={users} />
      </div>
      <div className='h-full pl-80'>{children}</div>
    </div>
  )
}

export default Layout
