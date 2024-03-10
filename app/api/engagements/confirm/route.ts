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
    const engagementWithPendingSpeaker = await prisma.engagement.findFirst({
        where: {
            id: engagementId,
            pendingSpeakers: {
                some: {
                    id: userId,
                },
            },
        },
        include: {
            pendingSpeakers: true,
        }
    });
    if (!engagementWithPendingSpeaker) {
        return new Response(
            JSON.stringify({ error: "The provided user in not a pending speaker for the provided event." }), 
            { status: 400 }
        );
    }

    let engagement = null
    try {
        // remove from pendingSpeakers and add to confirmedSpeakers
        engagement = await prisma.engagement.update({
            where: { id: engagementId },
            data: {
                confirmedSpeakers: {
                    connect: [{ id: userId }],
                },
                pendingSpeakers: {
                    disconnect: [{ id: userId }], // Disconnects the same user from pendingSpeakers
                },
            }
        });

        // Send a new notification to the user
        await prisma.notification.create({
            data: {
                title: `The admin confirmed your request for ${engagement.title}`,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(
            { error: "An unknown error occurred while signing up the user." }), 
            { status: 500 }
        );
    }

    return new NextResponse(JSON.stringify({ updatedEngagement: engagement }), { status: 200 });
}