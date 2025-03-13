import type { FullConversation } from '@/features/conversation/types'

import { useMemo } from 'react'
import { useSession } from 'next-auth/react'

export const useOtherUser = (conversation: FullConversation) => {
  const { data: session } = useSession()

  const otherUser = useMemo(() => {
    const currentUser = session?.user?.email

    const result = conversation.users.filter(
      (user) => user.email !== currentUser,
    )

    return result[0]
  }, [session?.user?.email, conversation.users])

  return otherUser
}
