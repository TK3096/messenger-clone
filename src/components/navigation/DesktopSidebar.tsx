'use client'

import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import { PiSignOutBold } from 'react-icons/pi'

import { UserAvatar } from '@/components/common/UserAvatar'
import { DesktopSidebarItem } from '@/components/navigation/DesktopSidebarItem'
import { EditProfileModal } from '@/features/user/components/EditProfileModal'

import { menu } from '@/components/navigation/menu'

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname()

  return (
    <aside className='hidden lg:block fixed z-50 h-full w-20 border-r-2 border-gray-100/20'>
      <div className='p-3 h-full flex flex-col items-center'>
        <div className='flex-1 w-full overflow-y-scroll'>
          {menu.map((item) => {
            const { href, icon: Icon } = item

            return (
              <Link href={href} key={href}>
                <DesktopSidebarItem
                  selected={pathname.includes(href)}
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
          <EditProfileModal>
            <div role='button' className='cursor-pointer'>
              <UserAvatar />
            </div>
          </EditProfileModal>
        </div>
      </div>
    </aside>
  )
}
