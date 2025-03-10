'use client'

import type { AuthFormType } from '@/features/auth/types'

import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { registerSchema as schema } from '@/features/auth/schemas'
import { signUp } from '@/features/auth/actions'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SocialAuth } from '@/features/auth/components/AuthSocial'

interface Props {
  setVariant: React.Dispatch<React.SetStateAction<AuthFormType>>
}

export const SignUpForm: React.FC<Props> = (props: Props) => {
  const { setVariant } = props

  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const handleFormSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('password', values.password)

      const result = await signUp(formData)

      if (result.status === 'SUCCESS') {
        form.reset()
        toast.success('Account created successfully')
        setVariant('sign-in')
      } else {
        toast.error(result.error)
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
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='space-y-3'
      >
        <div>
          <label htmlFor='name' className='font-bold text-sm text-gray-700'>
            Name
          </label>
          <Input
            {...form.register('name')}
            type='text'
            id='name'
            placeholder='Name'
          />
          {form.formState.errors.name && (
            <span className='text-xs text-destructive'>
              {form.formState.errors.name.message}
            </span>
          )}
        </div>

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
          Sign up
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
        <span className='text-sm'>Already have an account?</span>
        <span
          className='ml-1 text-sm underline cursor-pointer hover:text-fb'
          onClick={() => setVariant('sign-in')}
        >
          Login
        </span>
      </div>
    </div>
  )
}
