import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// open access
export async function POST(request: Request) {
    const body = await request.json();
    const { email, password, accesscode } = body;

    // Check if the access code is valid.
    const invite = await prisma.invite.findFirst({
        where: {
            code: accesscode,
        },
    });

    if (!invite) {
        return new NextResponse(
            JSON.stringify({error: "Access code is not valid. Please submit a valid access code."}), 
            { status: 400 }
        );
    }

    // Hash the user's password.
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = # salt rounds

    // Create a user in the user db with the provided details.
    try {
        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
            },
        });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return new NextResponse(
                JSON.stringify({ error: "An account with that email already exists. Please sign in or register with different email." }),
                { status: 400 }
            )
        }
        return new NextResponse(
            JSON.stringify({ error: "An unknown error occurred while attempting to create the user. Please try again." }),
            { status: 500 }
        )
    }
    // delete invite
    await prisma.invite.delete({
        where: {
            id: invite.id,
        },
    });
    return new NextResponse(
        JSON.stringify({ message:  "success" }), 
        { status: 200 }
    );
}