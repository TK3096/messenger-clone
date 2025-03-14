'use client'

import type { FullMessage } from '@/features/conversation/types'

import React, { useState, useRef, useEffect } from 'react'

import { MessageItem } from '@/features/conversation/components/MessageItem'

interface Props {
  initialMessages: FullMessage[]
  conversationId: string
}

export const ChatBox: React.FC<Props> = (props: Props) => {
  const { initialMessages, conversationId } = props

  const [messages, setMessages] = useState<FullMessage[]>(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateSeen = async () => {
      await fetch(`/api/conversations/${conversationId}/seen`, {
        method: 'POST',
      })
    }

    if (conversationId) {
      updateSeen()
    }
  }, [conversationId])

  return (
    <div className='flex-1 overflow-y-scroll'>
      {messages.map((message, index) => (
        <MessageItem
          key={message.id}
          data={message}
          isLast={messages.length - 1 === index}
        />
      ))}

      <div ref={bottomRef} className='pt-24' />
    </div>
  )
}
