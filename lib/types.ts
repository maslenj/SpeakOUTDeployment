import { Prisma } from "@prisma/client"

export type EngagementWithSpeakers = Prisma.EngagementGetPayload<{
    include: { pendingSpeakers: true, confirmedSpeakers: true }
}>

export const userNoPasswordFields = { 
    id: true, 
    email: true, 
    firstname: true, 
    lastname: true, 
    role: true, 
    tags: true, 
    image: true, 
    about: true, 
    pronouns: true,
    phonenum: true
}

export type UserNoPassword = Prisma.UserGetPayload<{
    select: typeof userNoPasswordFields
}>

export type SpeakerStatus = "unmarked" | "pending" | "confirmed"