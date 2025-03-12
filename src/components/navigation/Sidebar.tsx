'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { PiSignOutBold } from 'react-icons/pi'

import { SidebarItem } from '@/components/navigation/SidebarItem'

import { menu } from '@/components/navigation/menu'

export const Sidebar: React.FC = () => {
  const pathname = usePathname()

  return (
    <aside className='block lg:hidden fixed z-50 bottom-0 bg-white border-t-2 border-t-gray-100/20 left-0 w-full h-10'>
      <div className='grid grid-cols-3 h-full'>
        {menu.map((item) => {
          const { href, icon: Icon } = item

          return (
            <Link key={href} href={href}>
              <SidebarItem
                icon={<Icon className='size-6 text-gray-500' />}
                selected={pathname.includes(href)}
              />
            </Link>
          )
        })}

        <div onClick={() => signOut()}>
          <SidebarItem
            icon={<PiSignOutBold className='size-6 text-gray-500' />}
          />
        </div>
      </div>
    </aside>
  )
}
