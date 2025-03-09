'use client'

import type { AuthFormType } from '@/features/auth/types'

import React from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SocialAuth } from '@/features/auth/components/AuthSocial'

interface Props {
  setVariant: React.Dispatch<React.SetStateAction<AuthFormType>>
}

export const SignInForm: React.FC<Props> = (props: Props) => {
  const { setVariant } = props

  return (
    <div className='space-y-5'>
      <form className='space-y-3'>
        <div>
          <label htmlFor='email' className='font-bold text-sm text-gray-700'>
            Email
          </label>
          <Input
            type='email'
            id='email'
            name='email'
            required
            placeholder='Email'
          />
        </div>

        <div>
          <label htmlFor='password' className='font-bold text-sm text-gray-700'>
            Password
          </label>
          <Input
            type='password'
            id='password'
            name='Password'
            required
            placeholder='Password'
          />
        </div>

        <Button variant='primary' className='w-full' type='submit'>
          Sign in
        </Button>
      </form>

      <div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>

          <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>
      </div>

      <SocialAuth />

      <div className='text-center text-gray-500'>
        <span className='text-sm'>New to Messenger?</span>
        <span
          className='ml-1 text-sm underline cursor-pointer hover:text-fb'
          onClick={() => setVariant('sign-up')}
        >
          Create an account
        </span>
      </div>
    </div>
  )
}
