import { SignUp } from '@clerk/nextjs'
import React from 'react'

const RegisterPage = () => {
	return (
		<main className="h-screen w-full flex-center">
			<SignUp />
		</main>
	)
}

export default RegisterPage
