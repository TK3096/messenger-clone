'use server'

import { prisma } from '@/prisma'
import { auth } from '@/auth'

export const getUsers = async () => {
  try {
    const session = await auth()

    if (!session) {
      return []
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user?.email,
        },
      },
    })

    return users
  } catch {
    return []
  }
}
