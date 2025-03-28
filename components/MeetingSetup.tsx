'use client'

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

interface MeetingSetupProps {
	setIsSetupComplete: (isSetupComplete: boolean) => void
}

const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
	const [disableMicAndCamera, setDisableMicAndCamera] = useState(false)
	const call = useCall()

	if (!call) throw new Error('useCall must be used within StreamCall component')

	useEffect(() => {
		if (disableMicAndCamera) {
			call?.camera.disable()
			call?.microphone.disable()
		} else {
			call?.camera.enable()
			call?.microphone.enable()
		}
	}, [disableMicAndCamera, call?.camera, call?.microphone])
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
			<h1 className="text-2xl font-extrabold">Setup</h1>
			<VideoPreview />
			<div className="flex h-16 items-center justify-center gap-3">
				<label className="flex items-center justify-center gap-2 font-medium cursor-pointer">
					<input
						type="checkbox"
						checked={disableMicAndCamera}
						onChange={e => {
							setDisableMicAndCamera(e.target.checked)
						}}
					/>
					Join with mic and camera off
				</label>
				<DeviceSettings />
			</div>
			<Button
				className="rounded-md bg-green-500 px-4 py-2.5 text-white cursor-pointer"
				onClick={() => {
					call.join()
					setIsSetupComplete(true)
				}}
			>
				Join
			</Button>
		</div>
	)
}

export default MeetingSetup
