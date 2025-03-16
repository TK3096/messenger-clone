'use client'

import { useActiveChannel } from '@/features/user/hooks/useActiveChannel'

export const ActiveStatus = () => {
  useActiveChannel()

  return null
}
