import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { isAdmin } from "@/lib/db/utils";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

// admin only
export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    const body = await request.json();
    let newEngagement = null;
    try {
        newEngagement = await prisma.engagement.create({
            data: body
        })
    } catch (error) {
        if (error instanceof PrismaClientValidationError || error instanceof PrismaClientKnownRequestError) {
            return new NextResponse(
                JSON.stringify({ error: "Invalid data format." }),
                { status: 400 }
            );
        }
        return new NextResponse(
            JSON.stringify({ error: "An unknown error occurred while creating the user." }), 
            {status: 500}
        );
    }
    return new NextResponse(JSON.stringify(newEngagement), { status: 200 });
}

// admin only
export async function PATCH(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    const { searchParams } = new URL(request.url)
    const engagementId = searchParams.get('id')
    if (!engagementId) {
        return new NextResponse(
            JSON.stringify({ error: "Missing engagementId" }), 
            { status: 400 }
        );
    }
    const body = await request.json();

    let newEngagement = null;
    try {
        newEngagement = await prisma.engagement.update({
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

    return new NextResponse(JSON.stringify(newEngagement), { status: 200 });

}

// admin only
export async function DELETE(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }

    // Creating a type URL searchParams variable
    const { searchParams } = new URL(request.url)
    const engagementID = searchParams.get('id')

    try {
        const deletedEngagement = await prisma.engagement.delete({
            where: { id: Number(engagementID) }
        });
        return new Response(JSON.stringify(deletedEngagement), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(
            { error: "An unknown error occurred while trying to delete the user." }), 
            { status: 400 }
        );
    }
}


