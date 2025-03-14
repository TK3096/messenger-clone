import { getConversationById } from '@/features/conversation/actions'
import { getMessages } from '@/features/message/actions'

import { EmptyState } from '@/components/common/EmptyState'
import { ChatHeader } from '@/features/conversation/components/ChatHeader'
import { ChatBox } from '@/features/conversation/components/ChatBox'
import { ChatForm } from '@/features/conversation/components/ChatForm'

const Page = async ({
  params,
}: {
  params: Promise<{ conversationId: string }>
}) => {
  const conversationId = (await params).conversationId

  const { data: conversation } = await getConversationById(conversationId)
  const { data: messages } = await getMessages(conversationId)

  if (!conversation) {
    return (
      <div className='h-full'>
        <EmptyState />
      </div>
    )
  }

  return (
    <div className='h-full'>
      <div className='h-full flex flex-col'>
        <ChatHeader conversation={conversation} />
        <ChatBox initialMessages={messages} conversationId={conversation.id} />
        <ChatForm conversationId={conversation.id} />
      </div>
    </div>
  )
}

export default Page
