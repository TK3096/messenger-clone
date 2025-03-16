'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { PiSignOutBold } from 'react-icons/pi'

import { UserAvatar } from '@/components/common/UserAvatar'
import { DesktopSidebarItem } from '@/components/navigation/DesktopSidebarItem'
import { EditProfileModal } from '@/features/user/components/EditProfileModal'

import { menu } from '@/components/navigation/menu'

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  const [open, setOpen] = useState(false)

  const user = useMemo(() => {
    return session?.user || null
  }, [session?.user])

  return (
    <>
      <aside className='hidden lg:block fixed z-50 h-full w-20 border-r-2 border-gray-100/20'>
        <div className='p-3 h-full flex flex-col items-center'>
          <div className='flex-1 w-full overflow-y-scroll'>
            {menu.map((item) => {
              const { href, icon: Icon } = item

              return (
                <Link href={href} key={href}>
                  <DesktopSidebarItem
                    selected={pathname?.includes(href)}
                    icon={<Icon className='size-6 text-gray-500' />}
                  />
                </Link>
              )
            })}

            <div onClick={() => signOut()}>
              <DesktopSidebarItem
                icon={<PiSignOutBold className='size-6 text-gray-500' />}
              />
            </div>
          </div>

          <div className='pt-3'>
            <div
              role='button'
              className='cursor-pointer'
              onClick={() => setOpen(true)}
            >
              <UserAvatar image={user?.image || ''} userId={user?.id || ''} />
            </div>
          </div>
        </div>
      </aside>

      <EditProfileModal user={user} open={open} setOpen={setOpen} />
    </>
  )
}
