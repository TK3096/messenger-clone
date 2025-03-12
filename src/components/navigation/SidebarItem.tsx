import React from 'react'

import { cn } from '@/lib/utils'

interface Props {
  selected?: boolean
  icon: React.ReactNode
}

export const SidebarItem: React.FC<Props> = (props: Props) => {
  const { selected, icon } = props

  return (
    <div
      className={cn(
        'cursor-pointer h-full flex justify-center items-center hover:bg-gray-100/50 transition-colors',
        selected && 'bg-gray-100/50',
      )}
    >
      {icon}
    </div>
  )
}
