import type { CreateMessage } from '@/features/message/types'

import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { pusherServer } from '@/lib/pusher'

export const POST = async (req: Request) => {
  try {
    const session = await auth()
    const body = await req.json()
    const { message, image, conversationId } = body as CreateMessage

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: session.user?.id,
          },
        },
        seen: {
          connect: {
            id: session.user?.id,
          },
        },
      },
      include: {
        seen: true,
        sender: true,
      },
    })

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    })

    await pusherServer.trigger(conversationId, 'messages:new', newMessage)

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1]

    updatedConversation.users.map((user) => {
      pusherServer.trigger(user.email!, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage],
      })
    })

    return NextResponse.json(newMessage)
  } catch (error) {
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
