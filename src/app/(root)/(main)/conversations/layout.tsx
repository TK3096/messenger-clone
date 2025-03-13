import { getConversations } from '@/features/conversation/actions'

import { Conversationlist } from '@/features/conversation/components/ConversationList'

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const { data: conversations } = await getConversations()

  return (
    <div className='h-full'>
      <div className='fixed w-full lg:w-80 h-full shadow-sm'>
        <Conversationlist data={conversations} />
      </div>
      <div className='h-full pl-80'>{children}</div>
    </div>
  )
}

export default Layout
