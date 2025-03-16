'use client'

import type { FullConversation } from '@/features/conversation/types'
import type { User } from '@prisma/client'

import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { find } from 'lodash'
import { useRouter } from 'next/navigation'

import { MdOutlineGroupAdd } from 'react-icons/md'

import { ConversationListItem } from '@/features/conversation/components/ConversationListItem'
import { GroupChatModal } from '@/features/conversation/components/GroupChatModal'

import { pusherClient } from '@/lib/pusher'

interface Props {
  data: FullConversation[]
  users: User[]
}

export const Conversationlist: React.FC<Props> = (props: Props) => {
  const { data, users } = props

  const params = useParams()
  const { conversationId } = params as { conversationId: string }

  const { data: session } = useSession()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [conversations, setConversations] = useState<FullConversation[]>(data)

  const pusherKey = useMemo(() => {
    return session?.user?.email
  }, [session?.user?.email])

  useEffect(() => {
    if (!pusherKey) return

    const handleNew = (conversation: FullConversation) => {
      setConversations((prev) => {
        if (find(prev, { id: conversation.id })) {
          return prev
        }

        return [conversation, ...prev]
      })
    }

    const handleUpdate = (newConversation: FullConversation) => {
      setConversations((prev) =>
        prev.map((curent) => {
          if (curent.id === newConversation.id) {
            return {
              ...curent,
              messages: newConversation.messages,
            }
          }

          return curent
        }),
      )
    }

    const handleRemove = (conversation: FullConversation) => {
      setConversations((prev) => {
        return [...prev.filter((curent) => curent.id !== conversation.id)]
      })

      if (conversation.id === conversationId) {
        router.push('/conversations')
      }
    }

    pusherClient.subscribe(pusherKey)
    pusherClient.bind('conversation:new', handleNew)
    pusherClient.bind('conversation:update', handleUpdate)
    pusherClient.bind('conversation:remove', handleRemove)

    return () => {
      pusherClient.unsubscribe(pusherKey)
      pusherClient.unbind('conversation:new', handleNew)
      pusherClient.unbind('conversation:update', handleUpdate)
      pusherClient.unbind('conversation:remove', handleRemove)
    }
  }, [pusherKey, conversationId, router])

  return (
    <>
      <GroupChatModal open={open} setOpen={setOpen} users={users} />

      <aside className='px-4 py-2 h-full'>
        <div className='flex items-center justify-between'>
          <h1 className='text-lg font-bold'>Messages</h1>

          <div
            className='rounded-full p-1.5 cursor-pointer bg-gray-100 hover:opacity-75 transition'
            onClick={() => setOpen(true)}
          >
            <MdOutlineGroupAdd className='size-4 text-gray-600' />
          </div>
        </div>

        <div className='mt-3 space-y-3'>
          {conversations.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              data={conversation}
              select={conversation.id === conversationId}
            />
          ))}
        </div>
      </aside>
    </>
  )
}
