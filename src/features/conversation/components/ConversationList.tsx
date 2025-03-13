'use client'

import type { FullConversation } from '@/features/conversation/types'

import React from 'react'
import { useParams } from 'next/navigation'

import { MdOutlineGroupAdd } from 'react-icons/md'

import { ConversationListItem } from '@/features/conversation/components/ConversationListItem'

interface Props {
  data: FullConversation[]
}

export const Conversationlist: React.FC<Props> = (props: Props) => {
  const { data } = props

  const params = useParams()
  const { conversationId } = params

  return (
    <aside className='px-4 py-2 h-full'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>Messages</h1>

        <div className='rounded-full p-1.5 cursor-pointer bg-gray-100 hover:opacity-75 transition'>
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
  )
}
