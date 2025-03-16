'use client'

import type { FullMessage } from '@/features/conversation/types'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { find } from 'lodash'

import { MessageItem } from '@/features/conversation/components/MessageItem'

import { pusherClient } from '@/lib/pusher'

interface Props {
  initialMessages: FullMessage[]
  conversationId: string
}

export const ChatBox: React.FC<Props> = (props: Props) => {
  const { initialMessages, conversationId } = props

  const [messages, setMessages] = useState<FullMessage[]>(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)

  const updateSeen = useCallback(async () => {
    await fetch(`/api/conversations/${conversationId}/seen`, {
      method: 'POST',
    })
  }, [conversationId])

  useEffect(() => {
    if (conversationId) {
      updateSeen()
    }
  }, [conversationId, updateSeen])

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })

    const handleMessage = (message: FullMessage) => {
      updateSeen()

      setMessages((prevMessage) => {
        if (find(prevMessage, { id: message.id })) {
          return prevMessage
        }

        return [...prevMessage, message]
      })

      bottomRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleUpdateMessage = (newMessage: FullMessage) => {
      setMessages((prevMessage) =>
        prevMessage.map((msg) => {
          if (msg.id === newMessage.id) {
            return newMessage
          }

          return msg
        }),
      )
    }

    pusherClient.bind('messages:new', handleMessage)
    pusherClient.bind('message:update', handleUpdateMessage)

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', handleMessage)
      pusherClient.unbind('message:update', handleUpdateMessage)
    }
  }, [conversationId, updateSeen])

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
