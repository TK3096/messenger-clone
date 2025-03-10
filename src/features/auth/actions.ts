'use server'

import { prisma } from '@/prisma'
import bcryptjs from 'bcryptjs'

import { parseServerActionResponse } from '@/lib/utils'

export const signUp = async (data: FormData) => {
  const { email, password, name } = Object.fromEntries(data) as {
    name: string
    password: string
    email: string
  }

  if (!email || !password || !name) {
    return parseServerActionResponse({
      status: 'ERROR',
      error: 'Missing required fields',
    })
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return parseServerActionResponse({
        status: 'ERROR',
        error: 'User already exists',
      })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    })

    return parseServerActionResponse({
      status: 'SUCCESS',
      data: user,
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      status: 'ERROR',
      error: JSON.stringify(error),
    })
  }
}
