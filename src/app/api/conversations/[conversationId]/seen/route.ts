import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { prisma } from '@/prisma'

export const POST = async (
  req: Request,
  {
    params,
  }: {
    params: { conversationId: string }
  },
) => {
  try {
    const session = await auth()
    const conversationId = (await params).conversationId

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    })

    if (!conversation) {
      return new NextResponse('Not found conversation', { status: 404 })
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if (!lastMessage) {
      return NextResponse.json(conversation)
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      data: {
        seen: {
          connect: {
            id: session.user?.id,
          },
        },
      },
      include: {
        sender: true,
        seen: true,
      },
    })

    return NextResponse.json(updatedMessage)
  } catch (error) {
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
