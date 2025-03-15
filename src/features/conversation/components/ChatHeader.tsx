'use client'

import type { FullConversation } from '@/features/conversation/types'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'

import { FaChevronLeft } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'

import { useOtherUser } from '@/features/conversation/hooks/useOtherUser'

import { UserAvatar } from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/button'
import { ChatInfoDrawer } from '@/features/conversation/components/ChatInfoDrawer'

interface Props {
  conversation: FullConversation
}

export const ChatHeader: React.FC<Props> = (props: Props) => {
  const { conversation } = props

  const router = useRouter()

  const otherUser = useOtherUser(conversation)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return 'Active'
  }, [conversation])

  const handleBack = () => {
    router.push('/conversations')
  }

  return (
    <div className='bg-white py-2 px-4 border-b border-gray-100 flex justify-between items-center'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='icon'
          className='lg:hidden'
          onClick={handleBack}
        >
          <FaChevronLeft className='size-4 text-fb' />
        </Button>

        <UserAvatar />

        <div>
          <p className=''>{conversation.name || otherUser.name}</p>
          <p className='text-sm font-light text-neutral-500'>{statusText}</p>
        </div>
      </div>

      <ChatInfoDrawer conversation={conversation}>
        <Button variant='ghost' size='icon'>
          <BsThreeDots className='size-6 text-fb' />
        </Button>
      </ChatInfoDrawer>
    </div>
  )
}
