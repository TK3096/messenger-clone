'use client'

import React from 'react'
import { signIn } from 'next-auth/react'

import { FaGithub } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

export const SocialAuth: React.FC = () => {
  const handleSignIn = () => {
    signIn('github', { redirectTo: '/users' })
  }

  return (
    <div>
      <Button
        variant='secondary'
        className='w-full font-bold relative'
        onClick={handleSignIn}
      >
        <FaGithub className='size-5 absolute left-2.5 top-1/2 -translate-y-1/2' />
        Github
      </Button>
    </div>
  )
}
