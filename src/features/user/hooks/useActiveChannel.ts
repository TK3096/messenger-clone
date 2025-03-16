import type { Channel, Members } from 'pusher-js'

import { useEffect, useState } from 'react'

import { useActiveList } from '@/features/user/hooks/useAcitveList'
import { pusherClient } from '@/lib/pusher'

export const useActiveChannel = () => {
  const { set, add, remove } = useActiveList()
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)

  useEffect(() => {
    let channel = activeChannel

    if (!channel) {
      channel = pusherClient.subscribe('presence-messenger')
      setActiveChannel(channel)
    }

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMember: string[] = []

      members.each((member: Record<string, any>) =>
        initialMember.push(member.id),
      )
      set(initialMember)
    })

    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      add(member.id)
    })

    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      remove(member.id)
    })

    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe('presence-messenger')
        setActiveChannel(null)
      }
    }
  }, [activeChannel, add, remove, set])
}
