import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";


export async function GET(request: Request) {
    const engagements = await prisma.engagement.findMany({
        include: {
            confirmedSpeakers: true, // Include the confirmed speakers in the response
            pendingSpeakers: true, // Include the pending speakers in the response
        },
    });
    return NextResponse.json(engagements);
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    const user = session?.user as any;
    if (user == null || user.role != 'ADMIN') {
        return new NextResponse(null, { status: 401 });
    }

    const body = await request.json();
    await prisma.engagement.create({
        data: body
    })

    return NextResponse.json({});

}

export async function PATCH(request: Request) {

    const session = await getServerSession(authOptions)
    const user = session?.user as any;
    if (user == null || user.role != Role.ADMIN) {
        return new NextResponse(null, { status: 401 });
    }

    // Grabbing the JSON file from the request.
    const body = await request.json();

    // Creating a type URL searchParams variable
    const { searchParams } = new URL(request.url)
    const engagementId = searchParams.get('id')

    if (!engagementId) {
        return new NextResponse(JSON.stringify({ error: "Missing engagementId" }), { status: 400 });
    }


    // // Retrieve current speakers before update
    // const engagement = await prisma.engagement.findUnique({
    //     where: { id: Number(engagementId) },
    //     include: {
    //         pendingSpeakers: true,
    //         confirmedSpeakers: true,
    //     },
    // });

    // if (!engagement) {
    //     return new NextResponse(JSON.stringify({ error: "Engagement not found." }), { status: 404 });
    // }
    try {
        // Update the engagement
        await prisma.engagement.update({
            where: { id: Number(engagementId) },
            data: body,
        });
    } catch {
        return new NextResponse(JSON.stringify({ error: "Error in engagement update." }), { status: 404 });
    }


    // // Function to create notifications for a list of users
    // async function createNotificationsForUsers(users, engagementTitle) {
    //     for (const user of users) {
    //         await prisma.notification.create({
    //             data: {
    //                 title: `Update on engagement: ${engagementTitle}`,
    //                 user: {
    //                     connect: { id: user.id },
    //                 },
    //             },
    //         });
    //     }
    // }

    // try {
    //     // Create notifications for pending and confirmed speakers
    //     await createNotificationsForUsers(engagement.pendingSpeakers, engagement.title);
    //     await createNotificationsForUsers(engagement.confirmedSpeakers, engagement.title);

    // } catch {
    //     return new NextResponse(JSON.stringify({ error: "Error in sending notifcations to the users." }), { status: 404 });
    // }


    return new NextResponse("success!", { status: 200 });

}

export async function DELETE(request: Request) {

    const session = await getServerSession(authOptions)
    const user = session?.user as any;
    if (user == null || user.role != 'ADMIN') {
        return new NextResponse(null, { status: 401 });
    }

    // Creating a type URL searchParams variable
    const { searchParams } = new URL(request.url)
    const engagementID = searchParams.get('engagementID')

    try {
        await prisma.engagement.delete({
            where: { id: Number(engagementID) }
        });

        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response(null, { status: 400 });
    }
}


