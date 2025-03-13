'use server'

import { prisma } from '@/prisma'
import { auth } from '@/auth'

import { parseServerActionResponse } from '@/lib/utils'

export const getUsers = async () => {
  try {
    const session = await auth()

    if (!session) {
      return parseServerActionResponse({
        status: 'ERROR',
        data: [],
        error: 'Unauthorized',
      })
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          email: session.user?.email,
        },
      },
    })

    return parseServerActionResponse({
      status: 'SUCCESS',
      data: users,
    })
  } catch {
    return parseServerActionResponse({
      status: 'ERROR',
      data: [],
      error: 'Failed to fetch users',
    })
  }
}
