import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface MeetingModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	className?: string
	children?: React.ReactNode
	action?: () => void
	buttonText?: string
	image?: string
	buttonIcon?: string
}

const MeetingModal = ({
	isOpen,
	onClose,
	title,
	image,
	children,
	buttonIcon,
	buttonText,
	className,
	action,
}: MeetingModalProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogTitle hidden></DialogTitle>
			<DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
				<div className="flex flex-col gap-6">
					{image && (
						<div className="flex justify-center">
							<Image src={image} alt={title} width={72} height={72} />
						</div>
					)}

					<h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>

					{children}

					<Button
						onClick={action}
						className="bg-blue-1 cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0"
					>
						{buttonIcon && (
							<Image src={buttonIcon} alt={title} width={13} height={13} />
						)}
						&nbsp;{buttonText || 'Schedule Meeting'}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default MeetingModal
