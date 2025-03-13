import type { Conversation, Message, User } from '@prisma/client'

export type CreateConversation = {
  userId?: string
  isGroup?: boolean
  members?: { value: string }[]
  name?: string
}

export type FullMessage = Message & { sender: User; seen: User[] }

export type FullConversation = Conversation & {
  messages: FullMessage[]
  users: User[]
}
