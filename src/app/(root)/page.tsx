import React from 'react'

import { FaFacebookMessenger } from 'react-icons/fa'

import { AuthForm } from '@/features/auth/components/AuthForm'

const Page: React.FC = () => {
  return (
    <div className='flex min-h-full flex-col justify-center items-center py-12 px-6 lg:px-8 bg-gray-100 gap-4'>
      <div className='flex flex-col justify-center items-center sm:max-auto sm:w-full sm:max-w-md'>
        <FaFacebookMessenger className='size-32 text-fb' />

        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Sign in to your account
        </h2>
      </div>

      <AuthForm />
    </div>
  )
}

export default Page
