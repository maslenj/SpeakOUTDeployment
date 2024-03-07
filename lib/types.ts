import { Prisma } from "@prisma/client"

export type EngagementWithSpeakers = Prisma.EngagementGetPayload<{
    include: { pendingSpeakers: true, confirmedSpeakers: true }
}>

export type SpeakerStatus = "unmarked" | "pending" | "confirmed"