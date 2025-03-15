'use client'

import type { FullConversation } from '@/features/conversation/types'
import type { User } from '@prisma/client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'

import { MdOutlineGroupAdd } from 'react-icons/md'

import { ConversationListItem } from '@/features/conversation/components/ConversationListItem'
import { GroupChatModal } from './GroupChatModal'

interface Props {
  data: FullConversation[]
  users: User[]
}

export const Conversationlist: React.FC<Props> = (props: Props) => {
  const { data, users } = props

  const params = useParams()
  const { conversationId } = params as { conversationId: string }

  const [open, setOpen] = useState(false)

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
          {data.map((conversation) => (
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
