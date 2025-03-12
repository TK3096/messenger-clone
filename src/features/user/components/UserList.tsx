import React from 'react'

interface Props {
  data: any[]
}

export const UserList: React.FC<Props> = (props: Props) => {
  const { data } = props

  return (
    <div className='px-4 py-2 h-full'>
      <h1 className='font-bold text-lg'>Users</h1>

      <div className='mt-3 space-y-3'>
        <div className='rounded-sm p-2 hover:bg-gray-100/50 transition-colors cursor-pointer'>
          item 1
        </div>
      </div>
    </div>
  )
}
