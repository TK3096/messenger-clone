import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { pusherServer } from '@/lib/pusher'

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json('Unauthorized', { status: 401 })
    }

    let socket_id: string
    let channel_name: string

    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      // Parse JSON body
      const body = (await req.json()) as {
        socket_id: string
        channel_name: string
      }
      socket_id = body.socket_id
      channel_name = body.channel_name
    } else {
      // Handle URL-encoded form data
      const formData = new URLSearchParams(await req.text())
      socket_id = formData.get('socket_id') || ''
      channel_name = formData.get('channel_name') || ''
    }

    if (!socket_id || !channel_name) {
      return NextResponse.json('Invalid request body', { status: 400 })
    }

    const data = {
      user_id: session.user?.id ?? '',
    }

    const authResponse = pusherServer.authorizeChannel(
      socket_id,
      channel_name,
      data,
    )
    return NextResponse.json(authResponse)
  } catch (error) {
    console.error('Pusher Auth Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
