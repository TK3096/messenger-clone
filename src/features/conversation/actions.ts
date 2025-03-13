'use server'

import type { CreateConversation } from '@/features/conversation/types'

import { prisma } from '@/prisma'
import { auth } from '@/auth'

import { parseServerActionResponse } from '@/lib/utils'

export const createConversation = async (payload: CreateConversation) => {
  try {
    const session = await auth()
    const { isGroup, name, userId, members } = payload

    if (!session) {
      return parseServerActionResponse({
        status: 'ERROR',
        data: null,
        message: 'Unauthorized',
      })
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return parseServerActionResponse({
        status: 'ERROR',
        data: null,
        message: 'Invalid group conversation data',
      })
    }

    if (isGroup) {
      const newGroupConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...(members as { value: string }[]).map(
                (member: { value: string }) => ({
                  id: member.value,
                }),
              ),
              {
                id: session.user?.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      })

      return parseServerActionResponse({
        status: 'SUCCESS',
        data: newGroupConversation,
      })
    }

    if (!userId) {
      return parseServerActionResponse({
        status: 'ERROR',
        data: null,
        message: 'Invalid user conversation data',
      })
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [session.user?.id as string, userId],
            },
          },
          {
            userIds: {
              equals: [userId, session.user?.id as string],
            },
          },
        ],
      },
    })

    const conversation = existingConversations[0]

    if (conversation) {
      return parseServerActionResponse({
        status: 'SUCCESS',
        data: conversation,
      })
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: session.user?.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    })

    return parseServerActionResponse({
      status: 'SUCCESS',
      data: newConversation,
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      status: 'ERROR',
      data: null,
      message: 'Failed to create conversation',
    })
  }
}
