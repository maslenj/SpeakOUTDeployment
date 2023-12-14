import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

//API route to fetch all notifications for a specific user from the database
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const userID = searchParams.get('userId')

    const notifications = await prisma.notification.findMany({
        where: { userId: Number(userID) }
    })

    return NextResponse.json(notifications)
}