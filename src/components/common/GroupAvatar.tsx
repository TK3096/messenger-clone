import React from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Props {
  name: string
}

export const GroupAvatar: React.FC<Props> = (props: Props) => {
  const { name } = props

  return (
    <div className='relative w-fit'>
      <Avatar className='w-10 h-10'>
        <AvatarFallback className='bg-gray-200 text-white font-bold'>
          {name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
