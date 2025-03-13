'use client'

import type { FullConversation } from '@/features/conversation/types'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { useOtherUser } from '@/features/conversation/hooks/useOtherUser'

import { UserAvatar } from '@/components/common/UserAvatar'

import { cn, formatDate } from '@/lib/utils'

interface Props {
  select?: boolean
  data: FullConversation
}

export const ConversationListItem: React.FC<Props> = (props: Props) => {
  const { select, data } = props

  const router = useRouter()
  const otherUser = useOtherUser(data)
  const { data: session } = useSession()

  const handleClick = () => {
    router.push(`/conversations/${data.id}`)
  }

  const lastMessage = useMemo(() => {
    const messages = data.messages || []

    return messages[messages.length - 1]
  }, [data])

  const userEmail = useMemo(() => {
    return session?.user?.email
  }, [session?.user?.email])

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false

    const seesList = lastMessage.seen || []

    if (!userEmail) return false

    return seesList.filter((seen) => seen.email === userEmail).length !== 0
  }, [lastMessage, userEmail])

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return 'Sent an image'
    }

    if (lastMessage?.body) {
      return lastMessage.body
    }

    return 'Started a conversation'
  }, [lastMessage])

  return (
    <div
      onClick={handleClick}
      className={cn(
        'w-full flex items-center gap-2 cursor-pointer rounded-sm p-2 hover:bg-neutral-100 transition-colors',
        select ? 'bg-neutral-100' : 'bg-white',
      )}
    >
      <UserAvatar image={otherUser?.image || undefined} />

      <div className='space-y-1 w-full'>
        <p className='font-medium text-sm truncate w-3/4'>{otherUser.name}</p>

        <div className='flex items-center justify-between w-full'>
          <p
            className={cn(
              'text-sm truncate w-3/4 lg:w-[170px]',
              hasSeen ? 'text-gray-500' : 'text-black font-medium',
            )}
          >
            {lastMessageText}
          </p>
          {lastMessage?.createdAt && (
            <p className='text-xs text-gray-400 font-light'>
              {formatDate(lastMessage.createdAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
