'use client'

import type { User } from 'next-auth'

import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { updateUserSchema as schema } from '@/features/user/schemas'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/common/UserAvatar'

interface Props {
  children: React.ReactNode
  user?: User
}

export const EditProfileModal: React.FC<Props> = (props: Props) => {
  const { children, user } = props

  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      image: user?.image || '',
    },
  })
  const isDirty = form.formState.isDirty

  const image = form.watch('image')

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = async (e) => {
        const image = e.target?.result as string

        form.setValue('image', image, { shouldDirty: true })
      }

      reader.readAsDataURL(file)
    }
  }

  const handleFormSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true)

      // const res = await fetch('/api/user', {
      //   method: 'PATCH',
      //   body: JSON.stringify(values),
      // })

      // if (!res.ok) {
      //   toast.error('Failed to update profile.')

      //   return
      // }

      toast.success('Profile updated successfully.')
    } catch (error) {
      console.error(error)
      toast.error('Failed to update profile.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      form.setValue('name', user.name ?? '')
      form.setValue('image', user.image ?? '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>Edit your profile information.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleFormSubmit)}>
          <div className='space-y-4'>
            <div>
              <label htmlFor='name' className='font-semibold'>
                Name
              </label>
              <Input
                {...form.register('name')}
                type='text'
                id='name'
                className='mt-1'
              />
            </div>

            <div>
              <p className='font-semibold'>Picture</p>
              <div className='mt-1'>
                <label htmlFor='image' className='cursor-pointer'>
                  <UserAvatar image={image} hideStatus />
                </label>
                <input
                  type='file'
                  id='image'
                  className='hidden'
                  onChange={handleUpload}
                />
              </div>
            </div>
          </div>

          <div className='flex justify-end gap-3 mt-6'>
            <DialogClose asChild>
              <Button type='button' variant='outline' disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type='submit'
              variant='primary'
              disabled={!isDirty || loading}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
