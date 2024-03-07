import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    const user : any = session?.user
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
        return new NextResponse(JSON.stringify({error: "No engagement found with the provided id: " + engagement}), { status: 400 })
    }

    if (engagement.pendingSpeakers.some(speaker => (speaker.id == userId))) {
        return new NextResponse(JSON.stringify({status: "pending"}), {status: 200})
    } else if (engagement.confirmedSpeakers.some(speaker => (speaker.id == userId))) {
        return new NextResponse(JSON.stringify({status: "confirmed"}), {status: 200})
    } else {
        return new NextResponse(JSON.stringify({status: "unmarked"}), {status: 200})
    }
}
