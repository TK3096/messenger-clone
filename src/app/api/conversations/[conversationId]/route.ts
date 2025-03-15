import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { auth } from '@/auth'

export const DELETE = async (
  req: Request,
  { params }: { params: { conversationId: string } },
) => {
  try {
    const session = await auth()
    const conversationId = (await params).conversationId

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    })

    if (!existingConversation) {
      return new NextResponse('Not Found conversation', { status: 404 })
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [session.user?.id as string],
        },
      },
    })

    return NextResponse.json(deletedConversation)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
