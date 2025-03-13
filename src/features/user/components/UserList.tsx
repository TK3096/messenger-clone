import type { User } from '@prisma/client'

import React from 'react'

import { UserListItem } from '@/features/user/components/UserListItem'

interface Props {
  data: User[]
}

export const UserList: React.FC<Props> = (props: Props) => {
  const { data } = props

  return (
    <aside className='px-4 py-2 h-full'>
      <h1 className='font-bold text-lg'>People</h1>

      <div className='mt-3 space-y-3'>
        {data.map((user) => (
          <UserListItem key={user.id} user={user} />
        ))}
      </div>
    </aside>
  )
}
