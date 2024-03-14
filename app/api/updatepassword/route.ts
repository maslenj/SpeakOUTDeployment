import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSelf } from "@/lib/db/utils";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const { oldPassword, newPassword, confirmNewPassword } = await request.json();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
        return new NextResponse(
            JSON.stringify({ error: "Missing required fields." }),
            { status: 400 }
        );
    }
    if (newPassword !== confirmNewPassword) {
        return new NextResponse(
            JSON.stringify({ error: "Passwords do not match." }),
            { status: 400 }
        );
    }
    // check if old password is correct
    const self = await getSelf();
    const selfWithPassword = await prisma.user.findUnique({ where: { id: self?.id }, select: { password: true } });
    if (!selfWithPassword) {
        return new NextResponse(
            JSON.stringify({ error: "User not found." }),
            { status: 400 }
        );
    }
    const validPassword = await bcrypt.compare(oldPassword, selfWithPassword.password);
    if (!validPassword) {
        return new NextResponse(
            JSON.stringify({ error: "Invalid password." }),
            { status: 400 }
        );
    }

    // update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: self?.id },
        data: {
            password: hashedPassword
        }
    });

    return new NextResponse(JSON.stringify("success"), { status: 200 });
}