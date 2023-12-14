import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function GET(request: Request) {
    const engagements = await prisma.engagement.findMany()
    return NextResponse.json(engagements)
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
    if (user == null || user.role != 'ADMIN') {
        return new NextResponse(null, { status: 401 });
    }

    // Grabbing the JSON file from the request.
    const body = await request.json();

    // Creating a type URL searchParams variable
    const { searchParams } = new URL(request.url)
    const engagementID = searchParams.get('engagementID')
    
    await prisma.engagement.update({
        where: {
           id : Number(engagementID),
        },
        data: body
    })

    console.log(NextResponse.json({}));
    return NextResponse.json({});

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
        console.error('Error deleting engagement:', error);
        return new Response (null , {status: 400});
    }
}


