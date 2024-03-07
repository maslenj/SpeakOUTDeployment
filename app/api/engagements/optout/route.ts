import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { userId, engagementId } = body;

    // Check for missing parameters
    if (!engagementId || !userId) {
        return new NextResponse("Missing engagementId or userId!", { status: 400 });
    }

    // Find the engagement and determine the user's status (pending or confirmed)
    const engagement = await prisma.engagement.findUnique({
        where: {
            id: engagementId,
        },
        include: {
            pendingSpeakers: {
                where: {
                    id: userId,
                },
            },
            confirmedSpeakers: {
                where: {
                    id: userId,
                },
            },
        },
    });

    // If the user is not a pending or confirmed speaker, return an error
    if (engagement.pendingSpeakers.length === 0 && engagement.confirmedSpeakers.length === 0) {
        return new NextResponse("Not signed up or confirmed for the engagement!", { status: 400 });
    }

    // Determine which list to disconnect the user from
    const disconnectFrom = engagement.pendingSpeakers.length > 0 ? 'pendingSpeakers' : 'confirmedSpeakers';

    // Disconnect the user from the appropriate list
    try {
        await prisma.engagement.update({
            where: { id: engagementId },
            data: {
                [disconnectFrom]: {
                    disconnect: [{ id: userId }],
                },
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error in opting out of the event." }), { status: 401 });
    }

    // Fetch the user who opted out
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    // Fetch an Admin User
    const adminUser = await prisma.user.findFirst({
        where: {
          role: 'ADMIN',
        },
    });

    if (!adminUser) {
        return new NextResponse(JSON.stringify({ error: "No admin user found." }), { status: 404 });
      }
  
    // Send a notification for the Admin user    
    const newNotification = await prisma.notification.create({
    data: {
        title: `${user.firstname} ${user.lastname} opted out of ${engagement.title}.`,
        user: {
            connect: {
                id: adminUser.id,
            },
            },
        },
    });

    return new NextResponse(JSON.stringify("success"), { status: 200 });
}
