import type { SettingUser } from '@/features/user/types'

import { prisma } from '@/prisma'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const session = await auth()
    const body = (await req.json()) as SettingUser

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        name: body.name,
        // image: body.image, // enbale this line if you can find a free storage for image
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.log(error)

    return new NextResponse('Internal Error', { status: 500 })
  }
}
