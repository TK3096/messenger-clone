import { getConversations } from '@/features/conversation/actions'
import { getUsers } from '@/features/user/actions'

import { Conversationlist } from '@/features/conversation/components/ConversationList'

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { data: conversations } = await getConversations()
  const { data: users } = await getUsers()

  return (
    <div className='h-full'>
      <div className='fixed w-full lg:w-80 h-full shadow-sm'>
        <Conversationlist data={conversations} users={users} />
      </div>
      <div className='h-full pl-80'>{children}</div>
    </div>
  )
}

export default Layout
