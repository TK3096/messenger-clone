import React from 'react'

import { FaRegUser } from 'react-icons/fa6'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  image?: string
}

export const UserAvatar: React.FC<Props> = (props: Props) => {
  const { image } = props

  return (
    <div className='relative w-fit'>
      <Avatar className='w-10 h-10'>
        <AvatarImage src={image} />
        <AvatarFallback>
          <FaRegUser className='size-6 text-gray-600' />
        </AvatarFallback>
      </Avatar>

      <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full'></div>
    </div>
  )
}
