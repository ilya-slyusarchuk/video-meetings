'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'
import { toast } from 'sonner'

interface CallListProps {
	type: 'upcoming' | 'recording' | 'past'
}

const CallList = ({ type }: CallListProps) => {
	const { pastCalls, upcomingCalls, recordings: callRecordings, isLoading } = useGetCalls()
	const router = useRouter()
	const [recordings, setRecordings] = useState<CallRecording[]>([])

	const getCalls = () => {
		switch (type) {
			case 'upcoming':
				return upcomingCalls
			case 'past':
				return pastCalls
			case 'recording':
				return recordings
			default:
				return []
		}
	}

	const getNoCallsMessage = () => {
		switch (type) {
			case 'upcoming':
				return 'No upcoming calls'
			case 'past':
				return 'No past calls'
			case 'recording':
				return 'No recordings found'
			default:
				return 'No calls found'
		}
	}

	useEffect(() => {
		const fetchRecordings = async () => {
			try {
				const callData = await Promise.all(
					callRecordings?.map(meeting => meeting.queryRecordings()) ?? []
				)

				const recordings = callData
					.filter(call => call.recordings.length > 0)
					.flatMap(call => call.recordings)

				setRecordings(recordings)
			} catch (error) {
				console.error(error)
				toast.error('Error fetching recordings')
			}
		}

		if (type === 'recording') {
			fetchRecordings()
		}
	}, [type, callRecordings])

	if (isLoading) return <Loader />

	const calls = getCalls()
	const noCallsMessage = getNoCallsMessage()

	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
			{calls && calls.length > 0 ? (
				calls.map((meeting: Call | CallRecording) => (
					<MeetingCard
						key={(meeting as Call).id}
						icon={
							type === 'past'
								? '/icons/previous.svg'
								: type === 'upcoming'
								? '/icons/upcoming.svg'
								: '/icons/recordings.svg'
						}
						title={
							(meeting as Call).state?.custom?.description ||
							(meeting as CallRecording).filename?.substring(0, 20) ||
							'No Description'
						}
						date={
							(meeting as Call).state?.startsAt?.toLocaleString() ||
							(meeting as CallRecording).start_time?.toLocaleString()
						}
						isPreviousMeeting={type === 'past'}
						link={
							type === 'recording'
								? (meeting as CallRecording).url
								: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
										(meeting as Call).id
								  }`
						}
						buttonIcon={type === 'recording' ? '/icons/play.svg' : undefined}
						buttonText={type === 'recording' ? 'Play' : 'Start'}
						handleClick={
							type === 'recording'
								? () => router.push(`${(meeting as CallRecording).url}`)
								: () => router.push(`/meeting/${(meeting as Call).id}`)
						}
					/>
				))
			) : (
				<h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
			)}
		</div>
	)
}

export default CallList
