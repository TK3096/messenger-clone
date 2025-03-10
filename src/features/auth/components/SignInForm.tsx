'use client'

import type { AuthFormType } from '@/features/auth/types'

import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'

import { loginSchema as schema } from '@/features/auth/schemas'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SocialAuth } from '@/features/auth/components/AuthSocial'

interface Props {
  setVariant: React.Dispatch<React.SetStateAction<AuthFormType>>
}

export const SignInForm: React.FC<Props> = (props: Props) => {
  const { setVariant } = props

  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmitForm = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true)

      const user = await signIn('credentials', {
        ...values,
        redirectTo: '/users',
      })

      if (user?.error) {
        toast.error('Invalid credentials')
      }

      if (user?.ok && !user.error) {
        toast.success('Signed in successfully')
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-5'>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className='space-y-3'
      >
        <div>
          <label htmlFor='email' className='font-bold text-sm text-gray-700'>
            Email
          </label>
          <Input
            {...form.register('email')}
            type='email'
            id='email'
            placeholder='Email'
          />
          {form.formState.errors.email && (
            <span className='text-xs text-destructive'>
              {form.formState.errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor='password' className='font-bold text-sm text-gray-700'>
            Password
          </label>
          <Input
            {...form.register('password')}
            type='password'
            id='password'
            placeholder='Password'
          />
          {form.formState.errors.password && (
            <span className='text-xs text-destructive'>
              {form.formState.errors.password.message}
            </span>
          )}
        </div>

        <Button
          variant='primary'
          className='w-full'
          type='submit'
          disabled={!form.formState.isDirty || loading}
        >
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
