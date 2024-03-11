import { isAdmin } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import sendInviteEmail from "./email";

export async function POST(request: Request) {
    if (!(await isAdmin())) {
        return new NextResponse(null, { status: 401 });
    }
    const { email } = await request.json();
    if (!email) {
        return new NextResponse(
            JSON.stringify({ error: "No email provided for invitation!" }),
            { status: 400 }
        );
    }
    const user = await prisma.user.findFirst({
        where: {
        email: email,
        },
    });
    if (user) {
        return new NextResponse(
        JSON.stringify({ error: "User already exists with the provided email." }),
        { status: 400 }
        );
    }
    const invite = await prisma.invite.create({
        data: {
            email: email,
            code: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        },
    });
    sendInviteEmail(email, invite.code);
    return new NextResponse(JSON.stringify(invite), { status: 200 });
}