"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamClient } from "@stream-io/node-sdk"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const secret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
  const user = await currentUser()
  if (!user) throw new Error('User is not authenticated')
  if (!apiKey || !secret) throw new Error('Missing Stream API key')

  const streamClient = new StreamClient(apiKey, secret)
  const exp = Math.floor(Date.now() / 1000) + 60 * 60
  const iat = Math.floor(Date.now() / 1000) - 60

  const token = streamClient.generateUserToken({
    user_id: user.id,
    exp,
    iat,
  })

  return token
}