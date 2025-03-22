import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

export const useGetCalls = () => {
	const [calls, setCalls] = useState<Call[]>()
	const [isLoading, setIsLoading] = useState(false)
	const { user } = useUser()

	const client = useStreamVideoClient()

	useEffect(() => {
		const fetchCalls = async () => {
			if (!client || !user?.id) return
			setIsLoading(true)

			try {
				const { calls } = await client.queryCalls({
					sort: [{ field: 'starts_at', direction: -1 }],
					filter_conditions: {
						starts_at: { $exists: true },
						$or: [{ created_by_user_id: user.id }, { members: { $in: [user.id] } }],
					},
				})

				console.log(calls)

				setCalls(calls)
			} catch (error) {
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCalls()
	}, [client, user?.id])

	const pastCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
		return (startsAt && new Date(startsAt) < new Date(Date.now())) || !!endedAt
	})
	const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
		return startsAt && new Date(startsAt) > new Date(Date.now())
	})

	return { pastCalls, upcomingCalls, recordings: calls, isLoading }
}
