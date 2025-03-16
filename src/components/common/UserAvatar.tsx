import React from 'react'

import { FaUserAlt } from 'react-icons/fa'

import { useActiveList } from '@/features/user/hooks/useAcitveList'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  userId?: string
  image?: string
  hideStatus?: boolean
}

export const UserAvatar: React.FC<Props> = (props: Props) => {
  const { image, hideStatus, userId } = props

  const { members } = useActiveList()
  const isActive = members.indexOf(userId!) !== -1

  return (
    <div className='relative w-fit'>
      <Avatar className='w-10 h-10'>
        <AvatarImage src={image} />
        <AvatarFallback className='bg-gray-200'>
          <FaUserAlt className='size-6 text-white' />
        </AvatarFallback>
      </Avatar>

      {!hideStatus && isActive && (
        <div className='absolute -top-0.25 right-0 w-3 h-3 bg-green-400 rounded-full border-[1px] border-white'></div>
      )}
    </div>
  )
}
