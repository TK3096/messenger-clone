'use client'

import type { AuthFormType } from '@/features/auth/types'

import React, { useState } from 'react'

import { SignInForm } from '@/features/auth/components/SignInForm'
import { SignUpForm } from '@/features/auth/components/SignUpForm'

export const AuthForm: React.FC = () => {
  const [variant, setVariant] = useState<AuthFormType>('sign-in')

  return (
    <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-sm'>
      {variant === 'sign-in' && <SignInForm setVariant={setVariant} />}
      {variant === 'sign-up' && <SignUpForm setVariant={setVariant} />}
    </div>
  )
}
