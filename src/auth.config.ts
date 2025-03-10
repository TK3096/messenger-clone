import type { NextAuthConfig } from 'next-auth'

import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'

import { getUserByEmail } from '@/lib/db'

export default {
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error('Invalid credentials')
        }

        const user = await getUserByEmail(credentials.email as string)

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcryptjs.compare(
          credentials.password as string,
          user.hashedPassword,
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
