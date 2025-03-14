'use client'

import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { HiPhoto, HiPaperAirplane } from 'react-icons/hi2'

import { chatSchema as schema } from '@/features/conversation/schemas'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  conversationId: string
}

export const ChatForm: React.FC<Props> = (props: Props) => {
  const { conversationId } = props

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
    },
  })
  const isDirty = form.formState.isDirty

  const handleFormSubmit = async (values: z.infer<typeof schema>) => {
    form.setValue('message', '', { shouldValidate: true })

    await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        ...values,
        conversationId,
      }),
    })
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        const image = e.target?.result as string

        await fetch('/api/messages', {
          method: 'POST',
          body: JSON.stringify({
            image,
            conversationId,
          }),
        })
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='p-4 bg-white border-t flex items-center gap-2 w-full'>
      <label htmlFor='image'>
        <HiPhoto className='size-8 text-fb cursor-pointer' />
      </label>
      <input
        type='file'
        id='image'
        className='hidden'
        onChange={handleUpload}
      />

      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className='w-full flex items-center gap-2'
      >
        <Input
          {...form.register('message')}
          type='text'
          placeholder='Write a message'
        />

        <Button
          disabled={!isDirty}
          type='submit'
          className='rounded-full w-8 h-8 p-2 bg-fb hover:bg-sky-600 transition-colors cursor-pointer'
        >
          <HiPaperAirplane className='text-white size-5' />
        </Button>
      </form>
    </div>
  )
}
