'use client'

import { tokenProvider } from '@/actions/stream.actions'
import Loader from '@/components/Loader'
import { useUser } from '@clerk/nextjs'
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

export const StreamClientProvider = ({ children }: { children: React.ReactNode }) => {
	const [videoClient, setVideoClient] = useState<StreamVideoClient>()
	const { user, isLoaded } = useUser()

	useEffect(() => {
		const getVideoClient = async () => {
			if (!isLoaded || !user) return
			if (!apiKey) throw new Error('Missing Stream API key')

			const token = await tokenProvider()
			const streamUser: User = {
				id: user?.id,
				name: user?.username || user?.id,
				image: user?.imageUrl,
			}

			const client = new StreamVideoClient({ apiKey, user: streamUser, token })
			setVideoClient(client)
		}

		getVideoClient()
	}, [user, isLoaded])

	if (!videoClient) return <Loader />

	return <StreamVideo client={videoClient}>{children}</StreamVideo>
}
