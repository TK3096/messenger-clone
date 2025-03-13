export type CreateConversation = {
  userId?: string
  isGroup?: boolean
  members?: { value: string }[]
  name?: string
}
