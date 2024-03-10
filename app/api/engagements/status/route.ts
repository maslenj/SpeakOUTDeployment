import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSelf } from "@/lib/db/utils";

// Self only
export async function GET(request: Request) {
    const user = await getSelf()
    if (user == null) {
        return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 })
    }
    const userId = user.id
    const { searchParams } = new URL(request.url)
    const engagementId = searchParams.get('id')
    if (engagementId == null) {
        return new NextResponse(JSON.stringify({error: "Please provide an engagement id"}), { status: 400 })
    }

    const engagement = await prisma.engagement.findUnique({
        where: {
            id: parseInt(engagementId)
        },
        include: {
            pendingSpeakers: true,
            confirmedSpeakers: true
        }
    })

    if (engagement == null) {
        return new NextResponse(
            JSON.stringify({error: "No engagement found with the provided id: " + engagement}), 
            { status: 400 }
        )
    }

    if (engagement.pendingSpeakers.some(speaker => (speaker.id == userId))) {
        return new NextResponse(JSON.stringify({status: "pending"}), {status: 200})
    } else if (engagement.confirmedSpeakers.some(speaker => (speaker.id == userId))) {
        return new NextResponse(JSON.stringify({status: "confirmed"}), {status: 200})
    } else {
        return new NextResponse(JSON.stringify({status: "unmarked"}), {status: 200})
    }
}
