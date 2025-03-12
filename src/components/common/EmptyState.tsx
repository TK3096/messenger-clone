import React from 'react'

export const EmptyState: React.FC = () => {
  return (
    <div className='bg-gray-100/50 h-full flex items-center justify-center'>
      <p className='font-bold text-lg'>
        Select a chat or start a new conversation
      </p>
    </div>
  )
}
