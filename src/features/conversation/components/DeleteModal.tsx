'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { IoWarningOutline } from 'react-icons/io5'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface Props {
  children: React.ReactNode
  conversationId: string
}

export const DeleteModal: React.FC<Props> = (props: Props) => {
  const { children, conversationId } = props

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const handleConfirmDelete = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/conversations/${conversationId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        toast.error('Failed to delete conversation')

        return
      }

      toast.success('Conversation deleted successfully')
      router.replace('/conversations')
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete conversation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <div className='flex items-center gap-3'>
              <div className='bg-red-100 p-1 rounded-full'>
                <IoWarningOutline className='text-red-500 text-xl' />
              </div>
              <h1>Delete conversation</h1>
            </div>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className='flex justify-end gap-3'>
          <DialogClose asChild>
            <Button variant='outline' type='button' disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant='destructive'
            type='button'
            onClick={handleConfirmDelete}
            disabled={loading}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
