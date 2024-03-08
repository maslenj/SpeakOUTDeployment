import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Role } from "@prisma/client";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    const sessionUser: any = session?.user;
    if (!session || !session.user || sessionUser.role !== Role.ADMIN) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
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
        return new Response(JSON.stringify({ error: "User is either already confirmed or not signed up!" }), { status: 401 });
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
            },
            include: {
                confirmedSpeakers: true,
                pendingSpeakers: true,
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
        return new Response(JSON.stringify({ error: "User in user sign up!" }), { status: 500 });
    }

    return new NextResponse(JSON.stringify({ updatedEngagement: engagement }), { status: 200 });
}





