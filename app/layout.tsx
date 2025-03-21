import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

import '@stream-io/video-react-sdk/dist/css/styles.css'

const inter = Inter({
	variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meeting",
  description: "Meetings app with Stream & NextJS",
	icons: {
		icon: '/icons/logo.svg',
	}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en">
			<ClerkProvider
				appearance={{
					layout: {
						logoImageUrl: '/icons/logo.svg',
						socialButtonsVariant: 'iconButton',
					},
					variables: {
						colorText: '#fff',
						colorPrimary: '#0E78F9',
						colorBackground: '#1C1F2E',
						colorInputBackground: '#252A41',
						colorInputText: '#fff',
					},
				}}
			>
				<body
					className={`${inter.variable} antialiased bg-dark-2`}
				>
					{children}
					<div id="clerk-captcha" />
					<Toaster theme="dark" />
				</body>
			</ClerkProvider>
		</html>
  )
}
