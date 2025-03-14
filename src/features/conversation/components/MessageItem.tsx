import type { FullMessage } from '@/features/conversation/types'

import React from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { UserAvatar } from '@/components/common/UserAvatar'

import { cn, formatDate } from '@/lib/utils'

interface Props {
  isLast?: boolean
  data: FullMessage
}

export const MessageItem: React.FC<Props> = (props: Props) => {
  const { isLast, data } = props

  const { data: session } = useSession()

  if (!session) {
    return null
  }

  const isOwner = session?.user?.id === data.sender.id
  const seenList = (data.seen || [])
    .filter((user) => user.email !== session?.user?.email)
    .map((user) => user.name)
    .join(', ')

  return (
    <div
      className={cn(
        'p-4 flex gap-3',
        isOwner ? 'justify-end' : 'justify-start',
      )}
    >
      <div className={cn(isOwner && 'order-2')}>
        <UserAvatar image={data.sender.image!} />
      </div>
      <div className={cn('flex flex-col gap-1', isOwner && 'items-end')}>
        <div className='flex items-center gap-1'>
          <p className='text-sm text-gray-500'>{data.sender.name}</p>
          <p className='text-xs text-gray-400'>{formatDate(data.createdAt)}</p>
        </div>

        <div
          className={cn(
            'text-sm w-fit overflow-hidden',
            isOwner ? 'bg-sky-500 text-white' : 'bg-gray-100',
            data.image ? 'rounded-md p-0' : 'rounded-full px-3 py-1.5',
          )}
        >
          {data.image ? (
            <Image
              src={data.image}
              height={288}
              width={288}
              alt='image'
              className='hover:scale-110 transition object-cover cursor-pointer'
            />
          ) : (
            <p>{data.body}</p>
          )}
        </div>
        {isLast && isOwner && seenList.length > 0 && (
          <div className='text-xs font-light text-gray-500'>
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  )
}
