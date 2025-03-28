'use client'

import React, { useState } from 'react'
import HomeCard from '@/components/HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import DatePicker from 'react-datepicker'
import { Input } from '@/components/ui/input'


const MeetingTypeList = () => {
	const router = useRouter()
	const [meetingState, setMeetingState] = useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | undefined
	>()
	const [values, setValues] = useState({
		dateTime: new Date(Date.now()),
		description: '',
		meetingLink: '',
	})
	const [callDetails, setCallDetails] = useState<Call>()
	const { user } = useUser()
	const client = useStreamVideoClient()

	const createMeeting = async () => {
		if (!user || !client) return

		try {
			if (!values.dateTime) {
				toast.error('Please select a date and time')
				return
			}

			const id = crypto.randomUUID()
			const call = client.call('default', id)

			if (!call) throw new Error('Failed to create meeting')

			const startsAt = values.dateTime.toISOString()
			const description = values.description || 'Instant Meeting'

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			})

			setCallDetails(call)

			if (values.dateTime <= new Date(Date.now())) {
				router.push(`/meeting/${call.id}`)
			}

			toast.success('Meeting created successfully!')
		} catch (error) {
			console.error(error)
			toast.error('Failed to create meeting')
		}
	}

	return (
		<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
			<HomeCard
				img="/icons/add-meeting.svg"
				title="New Meeting"
				description="Start an instant meeting"
				action={createMeeting}
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

			{!callDetails ? (
				<MeetingModal
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title="Create Meeting"
					action={createMeeting}
				>
					<div className="flex flex-col gap-2.5">
						<label className="text-base text-normal leading-[22px]">
							Add a description
						</label>
						<Textarea
							className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
							onChange={e => {
								setValues({ ...values, description: e.target.value })
							}}
						/>
					</div>
					<div className="flex flex-col gap-2.5">
						<label className="text-base text-normal leading-[22px]">
							Select a date and time
						</label>
						<DatePicker
							selected={values.dateTime}
							onChange={date => {
								setValues({ ...values, dateTime: date! })
							}}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							timeCaption="Time"
							dateFormat="MMMM d, yyyy h:mm aa"
							className="w-full rounded bg-dark-2 p-2 focus:outline-none"
						/>
					</div>
				</MeetingModal>
			) : (
				<MeetingModal
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title="Meeting Created!"
					className="text-center"
					action={() => {
						navigator.clipboard.writeText(
							`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails.id}`
						)
						toast.success('Meeting link copied to clipboard')
					}}
					image="/icons/checked.svg"
					buttonIcon="/icons/copy.svg"
					buttonText="Copy Meeting Link"
				/>
			)}
			<MeetingModal
				isOpen={meetingState === 'isJoiningMeeting'}
				onClose={() => setMeetingState(undefined)}
				title="Paste the meeting link"
				className="text-center"
				action={() => {
					router.push(values.meetingLink)
				}}
				buttonText="Join Meeting"
			>
				<Input
					placeholder="Paste the meeting link"
					className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
					onChange={e => {
						setValues({ ...values, meetingLink: e.target.value })
					}}
				/>
			</MeetingModal>
		</section>
	)
}

export default MeetingTypeList
