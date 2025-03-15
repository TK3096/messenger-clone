import { z } from 'zod'

export const chatSchema = z.object({
  message: z.string().nonempty(),
})

export const groupChatSchema = z.object({
  name: z.string().nonempty(),
  members: z.array(z.string().nonempty()).min(2),
})
