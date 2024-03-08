import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Role } from "@prisma/client";

/* Get an Existing User and its Notifications */
export async function GET(request: Request) {
    const url = new URL(request.url);
    const user_Id = url.searchParams.get("id");
    if (!user_Id) {
        return new NextResponse(
            JSON.stringify({ error: "No id provided for retrieval of a user." }),
            { status: 400, }
        );
    }

    const session = await getServerSession(authOptions)
    const sessionUser: any = session?.user;
    if (!session || !session.user || !(sessionUser.role === Role.ADMIN || sessionUser.id === user_Id)) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: parseInt(user_Id),
            },
        });
        if (!findUser) {
            return new NextResponse(
                JSON.stringify({ error: "User not found with the provided ID" }),
                { status: 404, }
            );
        }
        return new NextResponse(
            JSON.stringify(findUser),
            { status: 200, }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: "An unknown error occurred while attempting to retrieve the user." }),
            { status: 500, }
        );
    }
}
