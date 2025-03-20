'use client'

import React, { useState } from 'react'
import HomeCard from '@/components/HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {
	const router = useRouter()
	const [meetingState, setMeetingState] = useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
	>()

	const createMeeting = () => {
		console.log('create meeting')
	}

	return (
		<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
			<HomeCard
				img="/icons/add-meeting.svg"
				title="New Meeting"
				description="Start an instant meeting"
				action={() => {
					setMeetingState('isInstantMeeting')
				}}
				className="bg-orange-1"
			/>
			<HomeCard
				img="/icons/join-meeting.svg"
				title="Join Meeting"
				description="via invitation link"
				action={() => {
					setMeetingState('isJoiningMeeting')
				}}
				className="bg-blue-1"
			/>
			<HomeCard
				img="/icons/schedule.svg"
				title="Schedule Meeting"
				description="Plan your meeting in advance"
				action={() => {
					setMeetingState('isScheduleMeeting')
				}}
				className="bg-purple-1"
			/>
			<HomeCard
				img="/icons/recordings.svg"
				title="View Recordings"
				description="Access your meeting recordings"
				action={() => {
					router.push('/recordings')
				}}
				className="bg-yellow-1"
			/>

			<MeetingModal
				isOpen={meetingState === 'isInstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title="Start an Instant Meeting"
				className="text-center"
				buttonText="Start Meeting"
        action={createMeeting}
			/>
		</section>
	)
}

export default MeetingTypeList
