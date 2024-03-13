import sendEmail from "@/lib/email/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email } = await request.json();
    if (!email) {
        return new NextResponse(
            JSON.stringify({ error: "No email provided for password reset!" }),
            { status: 400 }
        );
    }
    console.log("happens")
    const user = await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!user) {
        return new NextResponse(
            JSON.stringify({ error: "User does not exist with the provided email." }),
            { status: 400 }
        );
    }

    const forgotPassword = await prisma.forgotPassword.create({
        data: {
            email: email,
            code: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        },
    }
    )

    sendEmail(
        email,
        'SpeakOUT Boston Password Reset',
        `To reset your password, visit http://localhost:3000/reset-password?code=${forgotPassword.code}`
    )

    return new NextResponse(JSON.stringify("sucess"), { status: 200 });
}