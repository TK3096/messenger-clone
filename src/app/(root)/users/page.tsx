'use client'

import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const Page: React.FC = () => {
  const { data: session } = useSession()

  console.log(session)

  return (
    <div>
      <h1>User Page</h1>
      <p>{session?.user?.id}</p>

      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default Page
