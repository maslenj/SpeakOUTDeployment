import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

    const body = await request.json();
    const { engagementId, userId } = body;

    if (!engagementId || !userId) {
        return new NextResponse(JSON.stringify({ error: "Missing engagementId or userId!" }), { status: 400 })
    }

    // If the user is already a pending or confirmed speaker, return an error message.
    // const engagement = await prisma.engagement.findUnique({
    //     where: { id: engagementId },
    //     include: {
    //         pendingSpeakers: {
    //             where: { id: userId },
    //         },
    //         confirmedSpeakers: {
    //             where: { id: userId },
    //         },
    //     },
    // });

    try {
        // add the user to pending speakers
        await prisma.engagement.update({
            where: { id: engagementId },
            data: {
                pendingSpeakers: {
                    connect: [{ id: userId }],
                },
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "An unknown error occurred while signing up the user." }), { status: 400 })
    }

    // Fetch the user who opted out
    // const user = await prisma.user.findUnique({
    //     where: {
    //         id: userId,
    //     },
    // });

    // Fetch an Admin User
    // const adminUser = await prisma.user.findFirst({
    //     where: {
    //         role: 'ADMIN',
    //     },
    // });

    // if (!adminUser) {
    //     return new NextResponse(JSON.stringify({ error: "No admin user found." }), { status: 404 });
    // }

    // Send a notification for the Admin user    
    // const newNotification = await prisma.notification.create({
    //     data: {
    //         title: `${user.firstname} ${user.lastname} signed up for ${engagement.title}.`,
    //         user: {
    //             connect: {
    //                 id: adminUser.id,
    //             },
    //         },
    //     },
    // });

    return new NextResponse(JSON.stringify({ status: "pending" }), { status: 200 });
}