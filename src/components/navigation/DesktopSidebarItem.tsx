import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
  selected?: boolean
  icon: React.ReactNode
}

export const DesktopSidebarItem: React.FC<Props> = (props: Props) => {
  const { selected, icon } = props

  return (
    <div
      className={cn(
        'cursor-pointer mb-2 py-2 flex justify-center items-center hover:bg-gray-100/50 rounded-md transition-colors',
        selected && 'bg-gray-100/50',
      )}
    >
      {icon}
    </div>
  )
}
