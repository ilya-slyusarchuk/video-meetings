import React from 'react'
import { StreamClientProvider } from '@/providers/StreamClientProvider'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main>
			<StreamClientProvider>{children}</StreamClientProvider>
		</main>
	)
}

export default RootLayout
