import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
	CallControls,
	CallingState,
	CallParticipantsList,
	CallStatsButton,
	PaginatedGridLayout,
	SpeakerLayout,
	useCallStateHooks,
} from '@stream-io/video-react-sdk'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutList, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

const MeetingRoom = () => {
	const searchParams = useSearchParams()
	const isPersonalRoom = !!searchParams.get('personal')
	const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
	const [showParticipantsBar, setShowParticipantsBar] = useState(false)
	const { useCallCallingState } = useCallStateHooks()
	const callCallingState = useCallCallingState()

	if (callCallingState !== CallingState.JOINED) return <Loader />

	const CallLayout = () => {
		switch (layout) {
			case 'grid':
				return <PaginatedGridLayout />
			case 'speaker-left':
				return <SpeakerLayout participantsBarPosition="right" />
			case 'speaker-right':
				return <SpeakerLayout participantsBarPosition="left" />
		}
	}

	return (
		<section className="relative h-screen w-full overflow-hidden pt-4 text-white">
			<div className="relative flex size-full items-center justify-center">
				<div className="flex size-full max-w-[1000px] items-center">
					<CallLayout />
				</div>
				<div
					className={cn('h-[calc(100vh-86px)] ml-2 hidden', {
						showParticipantsBar: 'show-block',
					})}
				>
					<CallParticipantsList onClose={() => setShowParticipantsBar(false)} />
				</div>
			</div>

			<div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
				<CallControls />

				<DropdownMenu>
					<div className="flex items-center">
						<DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-2 py-2 hover:bg-[#4c535b]">
							<LayoutList size={20} className="text-white" />
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
						{['Grid', 'Speaker-Left', 'Speaker-Right'].map((layout, index) => (
							<DropdownMenuItem
								key={index}
								className="cursor-pointer"
								onClick={() => setLayout(layout.toLowerCase() as CallLayoutType)}
							>
								{layout}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<CallStatsButton />
				<button
					onClick={() => {
						setShowParticipantsBar(prev => !prev)
					}}
				>
					<div
						className={cn(
							'cursor-pointer rounded-2xl px-2 py-2',
							showParticipantsBar && 'bg-[#19232d] hover:bg-[#4c535b]',
							!showParticipantsBar && 'bg-[#dc433b] hover:bg-[#ff7878]'
						)}
					>
						<Users size={20} />
					</div>
				</button>
				{!isPersonalRoom && <EndCallButton />}
			</div>
		</section>
	)
}

export default MeetingRoom
