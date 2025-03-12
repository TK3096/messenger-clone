import type { User } from '@prisma/client'

import React from 'react'

import { UserAvatar } from '@/components/common/UserAvatar'

interface Props {
  data: User[]
}

export const UserList: React.FC<Props> = (props: Props) => {
  const { data } = props

  return (
    <div className='px-4 py-2 h-full'>
      <h1 className='font-bold text-lg'>Users</h1>

      <div className='mt-3 space-y-3'>
        {data.map((user) => (
          <div
            key={user.id}
            className='rounded-sm p-2 flex items-center gap-2 hover:bg-gray-100/50 transition-colors cursor-pointer'
          >
            <UserAvatar image={user.image!} />

            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
