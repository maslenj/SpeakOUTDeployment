import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/db/utils";

// admin only
export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }
    const { userId, engagementId } = await request.json();

    // check if the user is a pending speaker
    const engagementWithSpeaker = await prisma.engagement.findFirst({
        where: {
            id: engagementId,
            OR: [
                {
                    pendingSpeakers: {
                        some: {
                            id: userId,
                        },
                    },
                },
                {
                    confirmedSpeakers: {
                        some: {
                            id: userId,
                        },
                    },
                }
            ]
            
        },
        include: {
            pendingSpeakers: true,
            confirmedSpeakers: true,
        }
    });
    if (!engagementWithSpeaker) {
        return new Response(
            JSON.stringify({ error: "The provided user in not a pending or confirmed speaker for the provided event." }), 
            { status: 400 }
        );
    }

    let engagement = null
    try {
        // remove from pendingSpeakers and confirmedSpeakers
        engagement = await prisma.engagement.update({
            where: { id: engagementId },
            data: {
                confirmedSpeakers: {
                    disconnect: [{ id: userId }],
                },
                pendingSpeakers: {
                    disconnect: [{ id: userId }], // Disconnects the same user from pendingSpeakers
                },
            },
            include: {
                confirmedSpeakers: true,
                pendingSpeakers: true,
            },
        });
        // Send a new notification to the user
        await prisma.notification.create({
            data: {
                title: `The admin removed you from ${engagement.title}`,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ error: "An unknown error occurred while removing the user." }), 
            { status: 500 }
        );
    }

    return new NextResponse(JSON.stringify({ updatedEngagement: engagement }), { status: 200 });
}