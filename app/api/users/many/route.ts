import { NextResponse } from "next/server";
import { getUsers, isAdmin } from "@/lib/db/utils";

export async function GET(request: Request) {
    if (!(await isAdmin()))
        return new Response(JSON.stringify(
            { error: "Unauthorized" }),
            { status: 401 }
        );
    const users = await getUsers();
    return NextResponse.json(users);
}