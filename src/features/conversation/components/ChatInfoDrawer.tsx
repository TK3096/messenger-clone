'use client'

import type { FullConversation } from '@/features/conversation/types'

import React, { useMemo } from 'react'

import { FaTrashAlt } from 'react-icons/fa'

import { useOtherUser } from '@/features/conversation/hooks/useOtherUser'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { UserAvatar } from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/button'
import { DeleteModal } from '@/features/conversation/components/DeleteModal'

import { formatDate } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  conversation: FullConversation
}

export const ChatInfoDrawer: React.FC<Props> = (props: Props) => {
  const { children, conversation } = props

  const otherUser = useOtherUser(conversation)

  const joinedDate = useMemo(() => {
    return formatDate(conversation.createdAt, 'MMMM DD, YYYY')
  }, [conversation.createdAt])

  const title = useMemo(() => {
    return conversation.name || otherUser.name
  }, [otherUser.name, conversation.name])

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return 'Active'
  }, [conversation])

  const handleDelete = () => {}

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='pt-10 px-4 pb-4'>
        <SheetHeader>
          <SheetTitle asChild>
            <div className='flex flex-col items-center gap-3'>
              <UserAvatar image={otherUser.image!} />
              <div className='text-center'>
                <h3>{title}</h3>
                <p className='text-xs font-light'>{statusText}</p>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription asChild className='mt-4'>
            <div className='flex flex-col items-center gap-3'>
              <DeleteModal conversationId={conversation.id}>
                <Button
                  variant='secondary'
                  size='icon'
                  className='rounded-full'
                  onClick={handleDelete}
                >
                  <FaTrashAlt />
                </Button>
              </DeleteModal>
              <p className='font-semibold'>Delete</p>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div>
          {!conversation.isGroup && (
            <>
              <div className='space-y-1 pb-4'>
                <h4 className='font-semibold'>Email</h4>
                <p>{otherUser.email}</p>
              </div>

              <hr />

              <div className='space-y-1 pt-4'>
                <h4 className='font-semibold'>Joined</h4>
                <p>{joinedDate}</p>
              </div>
            </>
          )}
          {conversation.isGroup && (
            <>
              <div className='space-y-1 pb-4'>
                <h4 className='font-semibold'>Emails</h4>
                {conversation.users.map((user) => user.email).join(', ')}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
