import React from 'react'
import { StreamClientProvider } from '@/providers/StreamClientProvider'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Meeting',
	description: 'Meetings app with Stream & NextJS',
	icons: {
		icon: '/icons/logo.svg',
	},
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main>
			<StreamClientProvider>{children}</StreamClientProvider>
		</main>
	)
}

export default RootLayout
