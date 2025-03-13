'use server'

import { prisma } from '@/prisma'

import { parseServerActionResponse } from '@/lib/utils'

export const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return parseServerActionResponse({
      status: 'SUCCESS',
      data: messages,
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      status: 'ERROR',
      data: null,
      message: 'Failed to get messages',
    })
  }
}
