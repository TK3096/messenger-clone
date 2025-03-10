import { prisma } from '@/prisma'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  } catch {
    return null
  }
}
