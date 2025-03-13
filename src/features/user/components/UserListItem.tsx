'use client'

import type { User } from '@prisma/client'

import React from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { createConversation } from '@/features/conversation/actions'

import { UserAvatar } from '@/components/common/UserAvatar'

interface Props {
  user: User
}

export const UserListItem: React.FC<Props> = (props: Props) => {
  const { user } = props

  const router = useRouter()

  const handleClick = async () => {
    try {
      const conversation = await createConversation({ userId: user.id })

      if (conversation.status === 'SUCCESS') {
        const conversationId = conversation.data?.id

        router.push(`/conversations/${conversationId}`)
      } else {
        toast.error(conversation.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  return (
    <div
      key={user.id}
      className='rounded-sm p-2 flex items-center gap-2 hover:bg-gray-100/50 transition-colors cursor-pointer'
      onClick={handleClick}
    >
      <UserAvatar image={user.image!} />

      <p className='text-sm font-medium'>{user.name}</p>
    </div>
  )
}
