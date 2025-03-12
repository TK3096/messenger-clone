'use client'

import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import { PiSignOutBold } from 'react-icons/pi'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DesktopSidebarItem } from '@/components/navigation/DesktopSidebarItem'

import { menu } from '@/components/navigation/menu'

export const DesktopSidebar: React.FC = () => {
  const pathname = usePathname()

  return (
    <aside className='hidden lg:block fixed h-full w-20 shadow-md'>
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
          <Avatar className='w-10 h-10'>
            <AvatarFallback>TK</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </aside>
  )
}
