import { getSelf } from "@/lib/db/utils";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// self only
export async function PATCH(request: Request) {
    const self = await getSelf();
    if (self == null) {
        return new Response(JSON.stringify(
            { error: "User not found" }), 
            { status: 404 }
        );
    }
    const body = await request.json();
    delete body.password;
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;
    delete body.role;
    const updatedUser = await prisma.user.update({
        where: {
            id: self.id,
        },
        data: body,
    });
    return new NextResponse(
        JSON.stringify(updatedUser), 
        { status: 200 }
    );
}