'use client'

import type { User } from '@prisma/client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { createConversation } from '@/features/conversation/actions'

import { groupChatSchema as schema } from '@/features/conversation/schemas'

import { IoClose } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  users: User[]
}

export const GroupChatModal: React.FC<Props> = (props: Props) => {
  const { open, setOpen, users } = props

  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      members: [],
    },
  })
  const isDirty = form.formState.isDirty

  const members = form.watch('members')

  const handleSelect = (userId: string) => {
    const prevMembers = form.getValues('members')

    let newMembers: string[] = []

    if (prevMembers.includes(userId)) {
      newMembers = prevMembers.filter((member: string) => member !== userId)
    } else {
      newMembers = [...prevMembers, userId]
    }

    form.setValue('members', newMembers, { shouldDirty: true })
  }

  const handleUnSelect = (
    event: React.MouseEvent<HTMLDivElement>,
    userId: string,
  ) => {
    event.stopPropagation()

    const prevMembers = form.getValues('members')
    const newMembers = prevMembers.filter((member: string) => member !== userId)

    form.setValue('members', newMembers, { shouldDirty: true })
  }

  const handleFormSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true)

      const res = await createConversation({
        isGroup: true,
        name: values.name,
        members: values.members.map((member) => ({ value: member })),
      })

      if (res.status !== 'SUCCESS') {
        toast.error(res.message)

        return
      }

      toast.success('Group chat created successfully')
      setOpen(false)
      router.push(`/conversations/${res.data.id}`)
    } catch (error) {
      console.log(error)

      toast.error('Fialed to create group chat')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a group chat</DialogTitle>
          <DialogDescription>
            Create a chat with more than 2 people
          </DialogDescription>
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
              <label htmlFor='members' className='font-semibold'>
                Members
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='flex justify-start w-full hover:bg-inherit px-2'
                  >
                    {members.length !== 0 ? (
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          {members.map((member) => (
                            <Badge key={member} variant='secondary'>
                              {users.find((user) => user.id === member)?.name}
                              <div
                                onClick={(event) =>
                                  handleUnSelect(event, member)
                                }
                              >
                                <IoClose className='size-4' />
                              </div>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className='text-gray-500'>Select members</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='p-0'>
                  <Command>
                    <CommandInput placeholder='Search user...' />
                    <CommandList>
                      <CommandEmpty>No users found</CommandEmpty>
                      <CommandGroup>
                        {users.map((user) => {
                          const isSelected = members.includes(user.id)

                          return (
                            <CommandItem
                              key={user.id}
                              onSelect={() => handleSelect(user.id)}
                              className='cursor-pointer'
                            >
                              <div
                                className={
                                  isSelected ? 'opacity-100' : 'opacity-0'
                                }
                              >
                                <FaCheck className='size-4 pr-1 text-gray-700' />
                              </div>
                              {user.name}
                            </CommandItem>
                          )
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className='flex justify-end gap-3 mt-6'>
            <DialogClose asChild>
              <Button variant='outline' type='button' disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant='primary'
              type='submit'
              disabled={loading || !isDirty}
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
